/*
 * DnD5e plugin for RPG Paper Maker.
 * Spells: casting resolution, damage/healing, saves, spell lookup.
 * SRD game mechanics under OGL 1.0a.
 */
window.DnD5E = window.DnD5E || {};

(function (DnD5E) {
	'use strict';

	// Look up a spell by name from the SRD data.
	function findSpell(name) {
		if (!DnD5E.SRD || !DnD5E.SRD.spells) return null;
		return DnD5E.SRD.spells.byName(name);
	}

	// Resolve a spell cast by a caster at a given slot level.
	// Returns { ok, message, damage?, heal?, rolls? }.
	function castSpell(caster, target, spellName, slotLevel) {
		const spell = findSpell(spellName);
		if (!spell) return { ok: false, message: `Unknown spell: ${spellName}` };

		const level = slotLevel && slotLevel >= spell.level ? slotLevel : spell.level;

		if (spell.level > 0) {
			if (!caster.spellSlotsAvailable) {
				return { ok: false, message: `${caster.name} has no spell slots.` };
			}
			if (caster.spellSlotsAvailable(level) <= 0) {
				return { ok: false, message: `${caster.name} has no ${level}nd-level spell slots available.` };
			}
			caster.expendSpellSlot(level);
		}

		const result = { ok: true, spell: spell.name, level, message: '' };
		let damage = 0;
		let healing = 0;
		let saveResult = null;

		// Damage dice at base level.
		const baseDamage = spell.damage ? spell.damage[0] : null;
		if (baseDamage) {
			let times = 1;
			// Level scaling for damage cantrips and spells.
			if (spell.scaling && spell.scaling.mode === 'dice') {
				const step = spell.scaling.step || 1;
				if (spell.level === 0) {
					// Cantrips: dice double at 5th, 11th, 17th level.
					const casterLevel = caster.level || 1;
					times = 1 + Math.max(0, Math.floor((casterLevel + 1) / 6));
				} else {
					times = Math.max(1, 1 + Math.floor((level - spell.level) / (spell.scaling.step || 1)));
				}
			}
			const roll = DnD5E.Dice.rollDamage(baseDamage.dice, times);
			damage = roll.total;
			if (target) {
				// Apply damage type, then check for save.
				if (spell.save && target.savingThrowModifier) {
					const saveRoll = DnD5E.Rules.savingThrow(target, spell.save);
					const dc = caster.spellSaveDC;
					saveResult = {
						ability: spell.save,
						dc,
						roll: saveRoll.total,
						success: saveRoll.total >= dc,
					};
					if (saveResult.success && spell.halfOnSave) {
						damage = Math.floor(damage / 2);
					}
				}
				const applied = applyDamageTo(target, damage, spell.damage[0].type || 'force', caster);
				result.applied = applied;
			}
			result.damage = damage;
			result.rolls = roll;
			result.save = saveResult;
		}

		// Healing.
		if (spell.heal) {
			const roll = DnD5E.Dice.rollDamage(spell.heal.dice);
			healing = roll.total;
			if (spell.heal.modifier === 'spellAbility') {
				healing += caster.abilityModifier(caster.spellAbility || 'Wisdom') || 0;
			}
			if (target && target.heal) {
				target.heal(healing);
				result.healedTo = target.hp;
			}
			result.heal = healing;
			result.healRolls = roll;
		}

		result.message = `${caster.name} casts ${spell.name} (${spell.level === 0 ? 'cantrip' : spell.level + 'nd-level'}).`;
		DnD5E.history?.push({ kind: 'spell', label: spell.name, level, at: Date.now() });
		return result;
	}

	// Apply typed damage to a target, accounting for resistance/vulnerability/immunity and conditions.
	function applyDamageTo(target, amount, type, source) {
		if (!target) return { amount, hp: 0, type, mitigated: 0 };
		const effects = DnD5E.Conditions.aggregate(target);
		let mitigated = 0;
		if (target.hasCondition && target.hasCondition('Petrified')) {
			mitigated += Math.floor(amount / 2);
		}
		const immunity = (target.damageImmunities || []).includes(type);
		const resistance = (target.damageResistances || []).includes(type);
		const vulnerability = (target.damageVulnerabilities || []).includes(type);
		if (immunity) {
			mitigated += amount;
			amount = 0;
		}
		if (resistance && amount > 0) {
			const half = Math.floor(amount / 2);
			mitigated += half;
			amount -= half;
		}
		if (vulnerability && amount > 0) {
			amount *= 2;
		}
		const applied = target.takeDamage(amount);
		if (applied.hp === 0 && target.hp <= 0 && source && source.addCondition) {
			// Death by damage: no stabilization tracking beyond HP 0.
		}
		DnD5E.history?.push({
			kind: 'damage',
			target: target.name,
			amount,
			type,
			mitigated,
			hp: applied.hp,
			at: Date.now(),
		});
		return { amount, hp: applied.hp, tempHP: applied.tempHP, type, mitigated };
	}

	// Roll a spell attack.
	function spellAttack(caster, target, spell) {
		const attack = DnD5E.Dice.rollD20({
			modifier: caster.spellAttackModifier || 0,
		});
		const ac = target ? target.ac : 10;
		const hit = attack.total >= ac;
		return { attack, hit, ac, target: target ? target.name : null };
	}

	const DnD5e = {
		findSpell,
		castSpell,
		applyDamageTo,
		spellAttack,
	};
	Object.assign(DnD5E, { Spells: DnD5e });
})(window.DnD5E);

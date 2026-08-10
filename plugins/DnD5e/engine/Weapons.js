/*
 * DnD5e plugin for RPG Paper Maker.
 * Weapons: SRD weapon lookup, attack resolution (attack roll, damage, crits).
 * SRD game mechanics under OGL 1.0a.
 */
window.DnD5E = window.DnD5E || {};

(function (DnD5E) {
	'use strict';

	// Find a weapon in the SRD weapons list.
	function findWeapon(name) {
		if (!DnD5E.SRD || !DnD5E.SRD.weapons) return null;
		return DnD5E.SRD.weapons.byName(name);
	}

	// Determine the attack modifier for a weapon on a creature.
	function attackModifier(creature, weapon) {
		if (!weapon) return 0;
		const ranged = weapon.range && weapon.range.normal > 0 && weapon.properties && weapon.properties.includes('thrown') === false
			? weapon.type === 'ranged'
			: weapon.type === 'ranged';
		const ability = weapon.finesse
			? Math.max(
					DnD5E.Rules.modifier(creature.abilityScores.Strength ?? 10),
					DnD5E.Rules.modifier(creature.abilityScores.Dexterity ?? 10),
				)
			: DnD5E.Rules.modifier(creature.abilityScores[ranged ? 'Dexterity' : 'Strength'] ?? 10);
		const prof = creature.weaponProficiencies.includes(weapon.name) ? creature.proficiencyBonus() : 0;
		return ability + prof;
	}

	// Roll an attack with a weapon. Handles advantage, disadvantage, and critical hits.
	// Returns { attack, hit, crit, damage, ac, target }.
	function makeAttack(attacker, target, weapon, opts = {}) {
		const def = typeof weapon === 'string' ? findWeapon(weapon) : weapon;
		if (!def) return { ok: false, message: `Unknown weapon: ${weapon}` };

		const mod = attackModifier(attacker, def);
		const attack = DnD5E.Dice.rollD20({
			advantage: !!opts.advantage,
			disadvantage: !!opts.disadvantage,
			modifier: mod,
		});

		const crit = attack.raw === 20;
		const ac = target ? target.ac : 10;
		const hit = crit || attack.total >= ac;

		let damage = 0;
		let damageRolls = null;
		let type = null;
		if (hit) {
			type = def.damage.type || 'bludgeoning';
			const dice = crit ? `2*(${def.damage.dice})` : def.damage.dice;
			const roll = DnD5E.Dice.rollDamage(def.damage.dice, crit ? 2 : 1);
			damageRolls = roll;
			damage = roll.total;
			// Damage modifier only added once (not doubled on a crit).
			damage += mod;
			if (target) {
				const applied = DnD5E.Spells.applyDamageTo(target, damage, type, attacker);
				return {
					ok: true,
					attack,
					hit,
					crit,
					ac,
					damage,
					damageRolls,
					type,
					applied,
					target: target.name,
					attacker: attacker.name,
				};
			}
		}

		DnD5E.history?.push({
			kind: 'attack',
			attacker: attacker.name,
			target: target ? target.name : null,
			roll: attack.raw,
			modifier: mod,
			total: attack.total,
			hit,
			crit,
			at: Date.now(),
		});

		return {
			ok: true,
			attack,
			hit,
			crit,
			ac,
			damage,
			damageRolls,
			type,
			target: target ? target.name : null,
			attacker: attacker.name,
		};
	}

	const DnD5e = {
		findWeapon,
		attackModifier,
		makeAttack,
	};
	Object.assign(DnD5E, { Weapons: DnD5e });
})(window.DnD5E);

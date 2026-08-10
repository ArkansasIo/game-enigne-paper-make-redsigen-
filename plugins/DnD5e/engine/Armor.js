/*
 * DnD5e plugin for RPG Paper Maker.
 * Armor: SRD armor lookup and AC calculation rules.
 * SRD game mechanics under OGL 1.0a.
 */
window.DnD5E = window.DnD5E || {};

(function (DnD5E) {
	'use strict';

	// Find armor in the SRD armor list.
	function findArmor(name) {
		if (!DnD5E.SRD || !DnD5E.SRD.armor) return null;
		return DnD5E.SRD.armor.byName(name);
	}

	// Compute a creature's AC based on equipped armor, plus Dex mod, shields and bonuses.
	// If the creature has no armor proficiency, it cannot use the armor (disadvantage on
	// ability checks and attack rolls; simplified here by granting no AC benefit).
	function computeAC(creature) {
		const dexMod = DnD5E.Rules.modifier(creature.abilityScores.Dexterity ?? 10);
		let base = 10;
		let shieldBonus = 0;
		let equippedArmor = null;

		for (const itemName of creature.equipped || []) {
			const armor = findArmor(itemName);
			if (armor) {
				if (armor.category === 'shield') {
					shieldBonus = armor.ac.base;
					continue;
				}
				equippedArmor = armor;
			}
		}

		if (equippedArmor) {
			const proficient = creature.armorProficiencies.includes(equippedArmor.category);
			if (proficient) {
				base = equippedArmor.ac.base;
				if (equippedArmor.ac.dexBonus === 'full') {
					base += dexMod;
				} else if (equippedArmor.ac.dexBonus === 'max2') {
					base += Math.min(dexMod, 2);
				}
				// Heavy armor ignores Dex entirely (base only).
			} else {
				// Not proficient: no benefit from the armor.
				base = 10 + dexMod;
			}
		} else {
			base = 10 + dexMod;
		}

		let ac = base + shieldBonus + (creature.acBonus || 0);
		// Monks / barbarians natural armor handled by setting baseAC higher.
		if (creature.baseAC && creature.baseAC > 10) {
			ac = Math.max(ac, creature.baseAC + dexMod + (creature.acBonus || 0));
		}
		creature.computedAC = ac;
		return ac;
	}

	// Apply armor to a creature: set equipped list, add proficiency if needed, recompute AC.
	function equipArmor(creature, armorName) {
		const armor = typeof armorName === 'string' ? findArmor(armorName) : armorName;
		if (!armor) return false;
		if (!creature.equipped.includes(armor.name)) creature.equipped.push(armor.name);
		if (!creature.armorProficiencies.includes(armor.category)) {
			// Automatic proficiency only for shields.
			if (armor.category === 'shield') creature.armorProficiencies.push('shield');
		}
		creature.ac = computeAC(creature);
		return true;
	}

	const DnD5e = {
		findArmor,
		computeAC,
		equipArmor,
	};
	Object.assign(DnD5E, { Armor: DnD5e });
})(window.DnD5E);

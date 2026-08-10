/*
 * DnD5e plugin for RPG Paper Maker.
 * Core rules: ability scores, modifiers, skills, saving throws, proficiency, DCs.
 * SRD game mechanics under OGL 1.0a.
 */
window.DnD5E = window.DnD5E || {};

(function (DnD5E) {
	'use strict';

	const ABILITY_NAMES = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
	const ABILITY_ABBREV = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' };

	const SKILLS = {
		Acrobatics: 'Dexterity',
		Athletics: 'Strength',
		Deception: 'Charisma',
		History: 'Intelligence',
		Insight: 'Wisdom',
		Intimidation: 'Charisma',
		Investigation: 'Intelligence',
		Medicine: 'Wisdom',
		Nature: 'Intelligence',
		Perception: 'Wisdom',
		Performance: 'Charisma',
		Persuasion: 'Charisma',
		Religion: 'Intelligence',
		Sleight_of_Hand: 'Dexterity',
		Stealth: 'Dexterity',
		Survival: 'Wisdom',
	};
	const SKILL_LABELS = {
		Sleight_of_Hand: 'Sleight of Hand',
	};

	const SAVING_THROW_ABILITIES = ABILITY_NAMES;

	const modifier = (score) => Math.floor((score - 10) / 2);

	const proficiencyBonus = (level) => Math.ceil(level / 4) + 1;

	const setDifficultyClass = (base) => 8 + base;

	const spellSaveDC = ({ proficiency, abilityModifier }) => 8 + proficiency + abilityModifier;

	const skillModifier = (creature, skill) => {
		const ability = SKILLS[skill];
		if (!ability) return 0;
		const prof = creature.proficiencyFor(skill, 'skill') ? creature.proficiencyBonus() : 0;
		const expert = creature.expertiseFor(skill) ? prof : 0;
		return modifier(creature.abilityScores[ability] ?? 10) + prof + expert;
	};

	const savingThrowModifier = (creature, ability) => {
		const prof = creature.proficiencyFor(ability, 'savingThrow') ? creature.proficiencyBonus() : 0;
		return modifier(creature.abilityScores[ability] ?? 10) + prof;
	};

	const abilityCheck = (creature, ability, { advantage, disadvantage, bonus = 0 } = {}) => {
		const res = DnD5E.Dice.rollD20({ advantage, disadvantage, modifier: modifier(creature.abilityScores[ability] ?? 10) + bonus });
		res.ability = ability;
		res.label = ability;
		res.totalLabel = `${ability} check`;
		DnD5E.history?.push({ kind: 'check', label: res.totalLabel, total: res.total, rolls: res.rolls, at: Date.now() });
		return res;
	};

	const skillCheck = (creature, skill, { advantage, disadvantage, bonus = 0 } = {}) => {
		const mod = skillModifier(creature, skill);
		const res = DnD5E.Dice.rollD20({ advantage, disadvantage, modifier: mod + bonus });
		res.ability = SKILLS[skill];
		res.skill = skill;
		res.label = SKILL_LABELS[skill] || skill;
		res.totalLabel = `${SKILL_LABELS[skill] || skill} (${ABILITY_ABBREV[SKILLS[skill]]})`;
		DnD5E.history?.push({ kind: 'skill', label: res.totalLabel, total: res.total, rolls: res.rolls, at: Date.now() });
		return res;
	};

	const savingThrow = (creature, ability, { advantage, disadvantage, bonus = 0 } = {}) => {
		const mod = savingThrowModifier(creature, ability);
		const res = DnD5E.Dice.rollD20({ advantage, disadvantage, modifier: mod + bonus });
		res.ability = ability;
		res.label = `${ABILITY_ABBREV[ability] || ability} saving throw`;
		DnD5E.history?.push({ kind: 'save', label: res.label, total: res.total, rolls: res.rolls, at: Date.now() });
		return res;
	};

	const passiveScore = (mod, bonus = 0) => 10 + mod + bonus;

	const hitDiceAverage = (hitDie) => DnD5E.Dice.average(hitDie);

	// Standard array + point-buy helpers (SRD 5.1 rules).
	const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
	const POINT_COST = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };

	const pointBuyCost = (scores) => scores.reduce((sum, s) => sum + (POINT_COST[s] ?? 0), 0);

	const DnD5e = {
		ABILITY_NAMES,
		ABILITY_ABBREV,
		SKILLS,
		SKILL_LABELS,
		SAVING_THROW_ABILITIES,
		modifier,
		proficiencyBonus,
		setDifficultyClass,
		spellSaveDC,
		skillModifier,
		savingThrowModifier,
		abilityCheck,
		skillCheck,
		savingThrow,
		passiveScore,
		hitDiceAverage,
		STANDARD_ARRAY,
		POINT_COST,
		pointBuyCost,
	};
	Object.assign(DnD5E, { Rules: DnD5e });
})(window.DnD5E);

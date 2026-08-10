/*
 * DnD5e plugin for RPG Paper Maker.
 * Leveling: XP thresholds, class level tables, spell slots, level up/down.
 * SRD game mechanics under OGL 1.0a.
 */
window.DnD5E = window.DnD5E || {};

(function (DnD5E) {
	'use strict';

	// SRD 5.1 XP thresholds by level.
	const XP_BY_LEVEL = [
		0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000,
		195000, 225000, 260000, 300000, 355000,
	];

	// Character Advancement table: level -> (XP required, proficiency bonus).
	const CHARACTER_ADVANCEMENT = [
		{ level: 1, xp: 0, proficiency: 2 },
		{ level: 2, xp: 300, proficiency: 2 },
		{ level: 3, xp: 900, proficiency: 2 },
		{ level: 4, xp: 2700, proficiency: 2 },
		{ level: 5, xp: 6500, proficiency: 3 },
		{ level: 6, xp: 14000, proficiency: 3 },
		{ level: 7, xp: 23000, proficiency: 3 },
		{ level: 8, xp: 34000, proficiency: 3 },
		{ level: 9, xp: 48000, proficiency: 4 },
		{ level: 10, xp: 64000, proficiency: 4 },
		{ level: 11, xp: 85000, proficiency: 4 },
		{ level: 12, xp: 100000, proficiency: 4 },
		{ level: 13, xp: 120000, proficiency: 5 },
		{ level: 14, xp: 140000, proficiency: 5 },
		{ level: 15, xp: 165000, proficiency: 5 },
		{ level: 16, xp: 195000, proficiency: 5 },
		{ level: 17, xp: 225000, proficiency: 6 },
		{ level: 18, xp: 260000, proficiency: 6 },
		{ level: 19, xp: 300000, proficiency: 6 },
		{ level: 20, xp: 355000, proficiency: 6 },
	];

	const xpForLevel = (level) => (level >= 1 && level <= 20 ? XP_BY_LEVEL[level - 1] : 0);

	const levelForXP = (xp) => {
		let level = 1;
		for (let i = 0; i < 20; i++) {
			if (xp >= XP_BY_LEVEL[i]) level = i + 1;
			else break;
		}
		return level;
	};

	// The Spellcasting table (full caster slots by level).
	const FULL_CASTER_SLOTS = {
		1: { 1: 2 },
		2: { 1: 3 },
		3: { 1: 4, 2: 2 },
		4: { 1: 4, 2: 3 },
		5: { 1: 4, 2: 3, 3: 2 },
		6: { 1: 4, 2: 3, 3: 3 },
		7: { 1: 4, 2: 3, 3: 3, 4: 1 },
		8: { 1: 4, 2: 3, 3: 3, 4: 2 },
		9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
		10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
		11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
		12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
		13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
		14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
		15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
		16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
		17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
		18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
		19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
		20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
	};

	// Half-casters (Paladin, Ranger) get slots at roughly half rate.
	const HALF_CASTER_SLOTS = {
		1: {},
		2: { 1: 2 },
		3: { 1: 3 },
		4: { 1: 3 },
		5: { 1: 4, 2: 2 },
		6: { 1: 4, 2: 2 },
		7: { 1: 4, 2: 3 },
		8: { 1: 4, 2: 3 },
		9: { 1: 4, 2: 3, 3: 2 },
		10: { 1: 4, 2: 3, 3: 2 },
		11: { 1: 4, 2: 3, 3: 3 },
		12: { 1: 4, 2: 3, 3: 3 },
		13: { 1: 4, 2: 3, 3: 3, 4: 1 },
		14: { 1: 4, 2: 3, 3: 3, 4: 1 },
		15: { 1: 4, 2: 3, 3: 3, 4: 2 },
		16: { 1: 4, 2: 3, 3: 3, 4: 2 },
		17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
		18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
		19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
		20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
	};

	// One-third casters (Eldritch Knight, Arcane Trickster).
	const THIRD_CASTER_SLOTS = {
		1: {},
		2: {},
		3: { 1: 2 },
		4: { 1: 3 },
		5: { 1: 3 },
		6: { 1: 3 },
		7: { 1: 4, 2: 2 },
		8: { 1: 4, 2: 2 },
		9: { 1: 4, 2: 2 },
		10: { 1: 4, 2: 2 },
		11: { 1: 4, 2: 3 },
		12: { 1: 4, 2: 3 },
		13: { 1: 4, 2: 3 },
		14: { 1: 4, 2: 3 },
		15: { 1: 4, 2: 3 },
		16: { 1: 4, 2: 3 },
		17: { 1: 4, 2: 3, 3: 1 },
		18: { 1: 4, 2: 3, 3: 1 },
		19: { 1: 4, 2: 3, 3: 2 },
		20: { 1: 4, 2: 3, 3: 2 },
	};

	const spellSlotsByLevel = (className, level) => {
		const c = DnD5E.SRD ? DnD5E.SRD.classes.byName(className) : null;
		const kind = c && c.spellcasting ? c.spellcasting : 'none';
		let table = null;
		if (kind === 'full') table = FULL_CASTER_SLOTS;
		else if (kind === 'half') table = HALF_CASTER_SLOTS;
		else if (kind === 'third') table = THIRD_CASTER_SLOTS;
		else if (kind === 'pact') table = FULL_CASTER_SLOTS; // Warlock uses pact slots (handled separately)
		if (!table || !table[level]) return {};
		return Object.assign({}, table[level]);
	};

	// Pact magic (Warlock) slots.
	const PACT_SLOTS_BY_LEVEL = {
		1: { count: 1, level: 1 },
		2: { count: 2, level: 1 },
		3: { count: 2, level: 2 },
		4: { count: 2, level: 2 },
		5: { count: 2, level: 3 },
		6: { count: 2, level: 3 },
		7: { count: 2, level: 4 },
		8: { count: 2, level: 4 },
		9: { count: 2, level: 5 },
		10: { count: 2, level: 5 },
		11: { count: 3, level: 5 },
		12: { count: 3, level: 5 },
		13: { count: 3, level: 5 },
		14: { count: 3, level: 5 },
		15: { count: 3, level: 5 },
		16: { count: 3, level: 5 },
		17: { count: 4, level: 5 },
		18: { count: 4, level: 5 },
		19: { count: 4, level: 5 },
		20: { count: 4, level: 5 },
	};

	const classSpellLevels = (className) => {
		const c = DnD5E.SRD ? DnD5E.SRD.classes.byName(className) : null;
		const kind = c && c.spellcasting ? c.spellcasting : 'none';
		if (kind === 'full') return (level) => level;
		if (kind === 'half') return (level) => Math.ceil(level / 2);
		if (kind === 'third') return (level) => Math.ceil(level / 3);
		return () => 0;
	};

	// Number of cantrips / spells known/prepared, from the class data when available.
	const cantripsForLevel = (className, level) => {
		const c = DnD5E.SRD ? DnD5E.SRD.classes.byName(className) : null;
		if (!c || !c.cantripsKnownByLevel) return 0;
		return c.cantripsKnownByLevel[level] || 0;
	};

	const spellsKnownForLevel = (className, level) => {
		const c = DnD5E.SRD ? DnD5E.SRD.classes.byName(className) : null;
		if (!c || !c.spellsKnownByLevel) return 0;
		return c.spellsKnownByLevel[level] || 0;
	};

	const spellsPreparedForLevel = (className, level, abilityModifier = 0) => {
		const c = DnD5E.SRD ? DnD5E.SRD.classes.byName(className) : null;
		if (!c || !c.spellcasting || c.spellcasting === 'none') return 0;
		if (c.preparedSpellsFormula) {
			return Math.max(1, evalSafe(c.preparedSpellsFormula, level, abilityModifier));
		}
		return 0;
	};

	const evalSafe = (formula, level, abilityModifier) => {
		try {
			// eslint-disable-next-line no-new-func
			return new Function('level', 'mod', `"use strict"; return (${formula});`)(level, abilityModifier);
		} catch {
			return level + abilityModifier;
		}
	};

	// Apply a class level to a creature: recompute max HP, hit dice, spell slots.
	function applyClassLevel(creature, className, level) {
		const c = DnD5E.SRD ? DnD5E.SRD.classes.byName(className) : null;
		if (!c) return false;

		const conMod = creature.abilityModifier('Constitution');
		const hitDieValue = DnD5E.Dice.parseDice(c.hitDie).sides;

		// Set hit dice to one per level of this class.
		const existing = creature.hitDice.find((h) => h.name === className);
		if (existing) {
			existing.max = level;
			existing.current = Math.min(existing.current, level);
			existing.die = c.hitDie;
		} else {
			creature.hitDice.push({ name: className, die: c.hitDie, current: level, max: level });
		}

		// Max HP from hit dice averages + CON per level (player characters).
		let maxHP = 0;
		for (const hd of creature.hitDice) {
			const sides = DnD5E.Dice.parseDice(hd.die).sides;
			maxHP += hd.max * (Math.floor((sides + 1) / 2) + conMod);
		}
		if (maxHP > 0) {
			creature.maxHP = maxHP;
			creature.hp = maxHP;
		}

		// Saving throws from the class (keeps the first occurrence).
		if (c.savingThrows) {
			for (const save of c.savingThrows) {
				if (!creature.savingThrows.includes(save)) creature.savingThrows.push(save);
			}
		}

		// Spell slots.
		const spellAbility = c.spellAbility || creature.spellAbility;
		if (spellAbility) {
			creature.spellAbility = spellAbility;
			let slots = {};
			if (c.spellcasting === 'pact') {
				const pact = PACT_SLOTS_BY_LEVEL[level] || { count: 0, level: 0 };
				slots = { [pact.level]: pact.count };
				creature.pactMagic = pact;
			} else {
				slots = spellSlotsByLevel(className, level);
			}
			creature.spellSlots = Object.assign({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }, slots);
			creature.spellSlotsUsed = Object.assign({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
		}

		// Features for the class up to this level.
		const features = [];
		if (c.levels) {
			for (const lvl of c.levels) {
				if (lvl.level <= level && lvl.features) {
					for (const f of lvl.features) {
						features.push({ name: f.name, description: f.description, source: className, level: lvl.level });
					}
				}
			}
		}
		creature.features = creature.features
			.filter((f) => f.source !== className)
			.concat(features);

		// Cantrips / spells known.
		creature.cantripsKnown = creature.cantripsKnown.slice(0, cantripsForLevel(className, level) || undefined);

		return true;
	}

	function applyRace(creature, raceName) {
		const race = DnD5E.SRD ? DnD5E.SRD.races.byName(raceName) : null;
		if (!race) return false;
		creature.race = race.name;
		if (race.abilityBonuses) {
			for (const ability of Object.keys(race.abilityBonuses)) {
				creature.abilityScores[ability] =
					(creature.abilityScores[ability] || 10) + (race.abilityBonuses[ability] || 0);
			}
		}
		if (race.speed) creature.speed = Math.max(creature.speed || 0, race.speed);
		if (race.size) creature.size = race.size;
		for (const trait of race.traits || []) {
			creature.features.push({ name: trait.name, description: trait.description, source: race.name });
		}
		if (race.skillProficiencies) {
			for (const s of race.skillProficiencies) {
				if (!creature.skills.includes(s)) creature.skills.push(s);
			}
		}
		if (race.toolProficiencies) {
			for (const t of race.toolProficiencies) {
				if (!creature.toolProficiencies.includes(t)) creature.toolProficiencies.push(t);
			}
		}
		if (race.languages) creature.languages = (creature.languages || []).concat(race.languages);
		return true;
	}

	// Apply the SRD 5.1 proficiency rules for a multiclassed / single class character.
	function applyClassSet(creature, classes) {
		for (const c of classes) {
			if (!applyClassLevel(creature, c.name, c.level)) continue;
			const def = DnD5E.SRD ? DnD5E.SRD.classes.byName(c.name) : null;
			if (def) {
				if (def.armorProficiencies) {
					for (const a of def.armorProficiencies) {
						if (!creature.armorProficiencies.includes(a)) creature.armorProficiencies.push(a);
					}
				}
				if (def.weaponProficiencies) {
					for (const w of def.weaponProficiencies) {
						if (!creature.weaponProficiencies.includes(w)) creature.weaponProficiencies.push(w);
					}
				}
				if (def.toolProficiencies) {
					for (const t of def.toolProficiencies) {
						if (!creature.toolProficiencies.includes(t)) creature.toolProficiencies.push(t);
					}
				}
				// Starting skill choices (simplified: grant the first N options).
				if (def.skillsChoice && def.skillsChoice.options) {
					for (let i = 0; i < (def.skillsChoice.count || 0); i++) {
						const s = def.skillsChoice.options[i];
						if (s && !creature.skills.includes(s)) creature.skills.push(s);
					}
				}
			}
		}
	}

	// Multiclass spell slots use total spellcaster level per the multiclassing rules.
	function applyMulticlassSpellSlots(creature, classes) {
		const totalCaster = {};
		let pact = null;
		for (const c of classes) {
			const def = DnD5E.SRD ? DnD5E.SRD.classes.byName(c.name) : null;
			const kind = def && def.spellcasting ? def.spellcasting : 'none';
			if (kind === 'pact') {
				pact = PACT_SLOTS_BY_LEVEL[c.level] || { count: 0, level: 0 };
				continue;
			}
			if (kind === 'none') continue;
			const fn = classSpellLevels(c.name);
			const lvl = fn(c.level);
			for (let i = 1; i <= 9; i++) {
				totalCaster[i] = (totalCaster[i] || 0) + Math.max(0, lvl - (i - 1) * 2);
			}
		}
		// Table lookup: use the highest level whose table matches the rounded sum.
		const sum = Math.min(20, Object.values(totalCaster).reduce((a, b) => a + b, 0));
		creature.spellSlots = Object.assign({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }, FULL_CASTER_SLOTS[sum] || {});
		creature.spellSlotsUsed = Object.assign({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
		creature.pactMagic = pact;
	}

	function addXP(creature, amount) {
		creature.gainXP(amount);
		const newLevel = levelForXP(creature.xp);
		if (newLevel > creature.level) {
			return { leveled: true, oldLevel: creature.level, newLevel };
		}
		return { leveled: false, level: creature.level };
	}

	const DnD5e = {
		XP_BY_LEVEL,
		CHARACTER_ADVANCEMENT,
		xpForLevel,
		levelForXP,
		FULL_CASTER_SLOTS,
		HALF_CASTER_SLOTS,
		THIRD_CASTER_SLOTS,
		PACT_SLOTS_BY_LEVEL,
		spellSlotsByLevel,
		classSpellLevels,
		cantripsForLevel,
		spellsKnownForLevel,
		spellsPreparedForLevel,
		applyClassLevel,
		applyRace,
		applyClassSet,
		applyMulticlassSpellSlots,
		addXP,
	};
	Object.assign(DnD5E, { Leveling: DnD5e });
})(window.DnD5E);

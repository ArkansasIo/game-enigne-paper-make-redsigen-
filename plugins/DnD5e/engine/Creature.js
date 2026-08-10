/*
 * DnD5e plugin for RPG Paper Maker.
 * Creature model: characters and monsters (statblocks, HP, AC, conditions, spell slots, inventory).
 * SRD game mechanics under OGL 1.0a.
 */
window.DnD5E = window.DnD5E || {};

(function (DnD5E) {
	'use strict';

	const CONDITION_IDS = {
		Blinded: 1,
		Charmed: 2,
		Deafened: 3,
		Frightened: 4,
		Grappled: 5,
		Incapacitated: 6,
		Invisible: 7,
		Paralyzed: 8,
		Petrified: 9,
		Poisoned: 10,
		Prone: 11,
		Restrained: 12,
		Stunned: 13,
		Unconscious: 14,
		Exhaustion: 15,
	};

	class Condition {
		constructor(id, name) {
			this.id = id;
			this.name = name;
			this.data = DnD5E.Conditions ? DnD5E.Conditions.byName(name) : null;
		}
	}

	class Creature {
		constructor(opts = {}) {
			this.id = opts.id ?? DnD5E.nextId('creature');
			this.name = opts.name || 'Unnamed';
			this.isPlayer = !!opts.isPlayer;
			this.race = opts.race || null;
			this.background = opts.background || null;
			this.classes = (opts.classes || []).map((c) => ({ name: c.name, level: c.level || 1 }));
			this.abilityScores = Object.assign({ Strength: 10, Dexterity: 10, Constitution: 10, Intelligence: 10, Wisdom: 10, Charisma: 10 }, opts.abilityScores || {});
			this.savingThrows = (opts.savingThrows || []).slice();
			this.skills = (opts.skills || []).slice(); // names of proficient skills
			this.expertise = (opts.expertise || []).slice();
			this.armorProficiencies = (opts.armorProficiencies || []).slice();
			this.weaponProficiencies = (opts.weaponProficiencies || []).slice();
			this.toolProficiencies = (opts.toolProficiencies || []).slice();
			this.features = (opts.features || []).slice(); // { name, description, source }
			this.speed = opts.speed ?? 30;
			this.size = opts.size || 'Medium';
			this.type = opts.type || (opts.isPlayer ? 'humanoid' : 'humanoid');
			this.alignment = opts.alignment || 'Unaligned';
			this.xp = opts.xp || 0;

			// HP
			this.maxHP = opts.maxHP ?? 10;
			this.hp = opts.hp ?? this.maxHP;
			this.tempHP = opts.tempHP || 0;
			this.hitDice = (opts.hitDice || []).map((h) => ({ die: h.die, current: h.current ?? h.max ?? 1, max: h.max ?? h.die ? 1 : 1 }));

			// AC
			this.baseAC = opts.baseAC ?? 10;
			this.acBonus = opts.acBonus || 0;
			this.inventory = (opts.inventory || []).slice(); // { name, quantity, type }
			this.equipped = (opts.equipped || []).slice(); // item names

			// Spells
			this.spellAbility = opts.spellAbility || null;
			this.spellSlots = Object.assign({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }, opts.spellSlots || {});
			this.spellSlotsUsed = Object.assign({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }, opts.spellSlotsUsed || {});
			this.spellsKnown = (opts.spellsKnown || []).slice();
			this.spellsPrepared = (opts.spellsPrepared || []).slice();
			this.cantripsKnown = (opts.cantripsKnown || []).slice();

			// Combat state
			this.initiative = opts.initiative || 0;
			this.conditions = new Map();
			this.proficiencyBonusOverride = opts.proficiencyBonusOverride || null;
			this.deathSaves = { successes: 0, failures: 0 };
		}

		get level() {
			return this.classes.reduce((sum, c) => sum + (c.level || 0), 0);
		}

		get ac() {
			return this.baseAC + this.acBonus;
		}

		proficiencyBonus() {
			if (this.proficiencyBonusOverride !== null) return this.proficiencyBonusOverride;
			return DnD5E.Rules.proficiencyBonus(this.level);
		}

		proficiencyFor(name, kind) {
			if (kind === 'skill') return this.skills.includes(name);
			if (kind === 'savingThrow') return this.savingThrows.includes(name);
			if (kind === 'armor') return this.armorProficiencies.includes(name);
			if (kind === 'weapon') return this.weaponProficiencies.includes(name);
			if (kind === 'tool') return this.toolProficiencies.includes(name);
			return false;
		}

		expertiseFor(name) {
			return this.expertise.includes(name);
		}

		abilityModifier(ability) {
			return DnD5E.Rules.modifier(this.abilityScores[ability] ?? 10);
		}

		skillModifier(skill) {
			return DnD5E.Rules.skillModifier(this, skill);
		}

		savingThrowModifier(ability) {
			return DnD5E.Rules.savingThrowModifier(this, ability);
		}

		get spellSaveDC() {
			if (!this.spellAbility) return 0;
			return DnD5E.Rules.spellSaveDC({
				proficiency: this.proficiencyBonus(),
				abilityModifier: this.abilityModifier(this.spellAbility),
			});
		}

		get spellAttackModifier() {
			if (!this.spellAbility) return 0;
			return this.proficiencyBonus() + this.abilityModifier(this.spellAbility);
		}

		get effectiveHP() {
			return this.hp + this.tempHP;
		}

		get isDead() {
			return this.hp <= 0;
		}

		takeDamage(amount) {
			let remaining = Math.max(0, amount);
			const absorbed = Math.min(this.tempHP, remaining);
			this.tempHP -= absorbed;
			remaining -= absorbed;
			this.hp = Math.max(0, this.hp - remaining);
			return { absorbed, hp: this.hp, tempHP: this.tempHP };
		}

		heal(amount) {
			this.hp = Math.min(this.maxHP, this.hp + amount);
			return this.hp;
		}

		setTempHP(amount) {
			this.tempHP = Math.max(0, amount);
		}

		gainXP(amount) {
			this.xp += amount;
		}

		hasCondition(name) {
			return this.conditions.has(name);
		}

		addCondition(name) {
			const id = CONDITION_IDS[name];
			if (!id) return false;
			this.conditions.set(name, new Condition(id, name));
			return true;
		}

		removeCondition(name) {
			return this.conditions.delete(name);
		}

		clearConditions() {
			this.conditions.clear();
		}

		spellSlotsAvailable(level) {
			return Math.max(0, (this.spellSlots[level] || 0) - (this.spellSlotsUsed[level] || 0));
		}

		expendSpellSlot(level) {
			if (this.spellSlotsAvailable(level) <= 0) return false;
			this.spellSlotsUsed[level] = (this.spellSlotsUsed[level] || 0) + 1;
			return true;
		}

		restoreSpellSlot(level, count = 1) {
			this.spellSlotsUsed[level] = Math.max(0, (this.spellSlotsUsed[level] || 0) - count);
		}

		restoreAllSpellSlots() {
			this.spellSlotsUsed = Object.assign({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
		}

		addConditionFromJSON(name) {
			return this.addCondition(name);
		}

		rollHitDice(n = 1) {
			if (!this.hitDice.length) return { total: 0, rolls: [] };
			const used = [];
			let total = 0;
			for (const hd of this.hitDice) {
				if (n <= 0) break;
				const use = Math.min(hd.current, n);
				if (use <= 0) continue;
				const res = DnD5E.Dice.rollDice(hd.die);
				res.rolls.forEach((r) => used.push(r));
				total += res.total;
				hd.current -= use;
				n -= use;
			}
			return { total, rolls: used };
		}

		toJSON() {
			return {
				id: this.id,
				name: this.name,
				isPlayer: this.isPlayer,
				race: this.race,
				background: this.background,
				classes: this.classes,
				abilityScores: this.abilityScores,
				savingThrows: this.savingThrows,
				skills: this.skills,
				expertise: this.expertise,
				armorProficiencies: this.armorProficiencies,
				weaponProficiencies: this.weaponProficiencies,
				toolProficiencies: this.toolProficiencies,
				features: this.features,
				speed: this.speed,
				size: this.size,
				type: this.type,
				alignment: this.alignment,
				xp: this.xp,
				maxHP: this.maxHP,
				hp: this.hp,
				tempHP: this.tempHP,
				hitDice: this.hitDice,
				baseAC: this.baseAC,
				acBonus: this.acBonus,
				inventory: this.inventory,
				equipped: this.equipped,
				spellAbility: this.spellAbility,
				spellSlots: this.spellSlots,
				spellSlotsUsed: this.spellSlotsUsed,
				spellsKnown: this.spellsKnown,
				spellsPrepared: this.spellsPrepared,
				cantripsKnown: this.cantripsKnown,
				initiative: this.initiative,
				conditions: [...this.conditions.keys()],
				deathSaves: this.deathSaves,
			};
		}

		static fromJSON(json) {
			const c = new Creature(json);
			(json.conditions || []).forEach((name) => c.addCondition(name));
			return c;
		}
	}

	const DnD5e = { Creature, Condition, CONDITION_IDS };
	Object.assign(DnD5E, DnD5e);
})(window.DnD5E);

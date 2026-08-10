/*
 * DnD5e plugin for RPG Paper Maker.
 * SRD data loader and registries: races, classes, backgrounds, feats, weapons, armor,
 * equipment, spells, monsters and NPCs. Provides creature factories.
 * Content is from the D&D 5e SRD 5.1, licensed under OGL 1.0a.
 */
window.DnD5E = window.DnD5E || {};

(function (DnD5E) {
	'use strict';

	// Shared helpers used across modules.
	if (!DnD5E.nextId) {
		const counters = {};
		DnD5E.nextId = (kind) => {
			counters[kind] = (counters[kind] || 0) + 1;
			return counters[kind];
		};
	}
	if (!DnD5E.history) {
		DnD5E.history = [];
	}

	// Registry: lookup by name (case-insensitive).
	class Registry {
		constructor(kind) {
			this.kind = kind;
			this.items = [];
			this._byName = new Map();
			this._byId = new Map();
		}

		get all() {
			return this.items;
		}

		get size() {
			return this.items.length;
		}

		normalize(name) {
			return String(name || '').trim().toLowerCase();
		}

		register(item) {
			if (!item || item.name === undefined) return;
			if (item.id === undefined) item.id = DnD5E.nextId(this.kind);
			this.items.push(item);
			this._byName.set(this.normalize(item.name), item);
			this._byId.set(item.id, item);
		}

		byName(name) {
			return this._byName.get(this.normalize(name)) || null;
		}

		byId(id) {
			return this._byId.get(id) || null;
		}

		names() {
			return this.items.map((i) => i.name).sort();
		}
	}

	// Raw data holders (filled by load / register).
	const SRD = {
		races: new Registry('race'),
		backgrounds: new Registry('background'),
		classes: new Registry('class'),
		feats: new Registry('feat'),
		weapons: new Registry('weapon'),
		armor: new Registry('armor'),
		equipment: new Registry('equipment'),
		spells: new Registry('spell'),
		monsters: new Registry('monster'),
		npcs: new Registry('npc'),
		loaded: false,
	};

	const DATA_FILES = {
		races: 'races.json',
		backgrounds: 'backgrounds.json',
		classes: 'classes.json',
		feats: 'feats.json',
		weapons: 'weapons.json',
		armor: 'armor.json',
		equipment: 'equipment.json',
		spells: 'spells.json',
		monsters: 'monsters.json',
		npcs: 'npcs.json',
	};

	const dataPath = (file) => {
		const base = DnD5E.dataFolder || (typeof Common !== 'undefined' && Common.Paths && Common.Paths.PLUGINS
			? Common.Paths.PLUGINS + 'DnD5e/'
			: '');
		return base + 'data/' + file;
	};

	// Register a parsed JSON array (or object with a list property) into a registry.
	function registerList(kind, list) {
		const data = Array.isArray(list) ? list : list.list || list.items || [];
		for (const item of data) {
			if (item) SRD[kind].register(item);
		}
	}

	async function loadFile(file) {
		if (typeof Common !== 'undefined' && Common.Platform && Common.Platform.loadFile) {
			return await Common.Platform.loadFile(dataPath(file));
		}
		// Fallback for tests / non-RPM environments: read from global window.__DnD5E_DATA__.
		if (typeof window !== 'undefined' && window.__DnD5E_DATA__ && window.__DnD5E_DATA__[file] !== undefined) {
			return typeof window.__DnD5E_DATA__[file] === 'string'
				? window.__DnD5E_DATA__[file]
				: JSON.stringify(window.__DnD5E_DATA__[file]);
		}
		throw new Error('DnD5e: cannot load ' + file + ' (no loader available)');
	}

	async function loadOne(kind) {
		const content = await loadFile(DATA_FILES[kind]);
		const json = JSON.parse(content);
		registerList(kind, json);
	}

	async function loadAll() {
		const kinds = Object.keys(DATA_FILES);
		for (const kind of kinds) {
			try {
				await loadOne(kind);
			} catch (e) {
				console.warn('DnD5e: failed to load ' + kind + ': ' + (e && e.message ? e.message : e));
			}
		}
		SRD.loaded = true;
		// Register basic metadata / utility tables on DnD5E for convenience.
		DnD5E.SRD = SRD;
		return SRD;
	}

	// === Challenge rating helpers ===

	// Convert a challenge string/number to a numeric CR (e.g. "1/4" -> 0.25, "5" -> 5).
	const crToNumber = (cr) => {
		if (cr === null || cr === undefined) return 0;
		if (typeof cr === 'number') return cr;
		const str = String(cr).trim();
		if (str.includes('/')) {
			const [a, b] = str.split('/');
			return parseInt(a, 10) / parseInt(b, 10);
		}
		return parseFloat(str) || 0;
	};

	const CR_XP = {
		0: 10,
		0.125: 25,
		0.25: 50,
		0.5: 100,
		1: 200,
		2: 450,
		3: 700,
		4: 1100,
		5: 1800,
		6: 2300,
		7: 2900,
		8: 3900,
		9: 5000,
		10: 5900,
		11: 7200,
		12: 8400,
		13: 10000,
		14: 11500,
		15: 13000,
		16: 15000,
		17: 18000,
		18: 20000,
		19: 22000,
		20: 25000,
		21: 33000,
		22: 41000,
		23: 50000,
		24: 62000,
		25: 75000,
		26: 90000,
		27: 105000,
		28: 120000,
		29: 135000,
		30: 155000,
	};

	const xpForCR = (cr) => CR_XP[crToNumber(cr)] || 0;

	// Proficiency bonus by challenge rating (Monster Manual rules).
	const profBonusForCR = (cr) => {
		const n = crToNumber(cr);
		if (n <= 4) return 2;
		if (n <= 8) return 3;
		if (n <= 12) return 4;
		if (n <= 16) return 5;
		if (n <= 20) return 6;
		if (n <= 24) return 7;
		if (n <= 28) return 8;
		return 9;
	};

	// === Creature factories ===

	function monsterToCreature(monster) {
		if (!monster) return null;
		const creature = new DnD5E.Creature({
			name: monster.name,
			isPlayer: false,
			size: monster.size,
			type: monster.type,
			alignment: monster.alignment,
			abilityScores: monster.abilityScores,
			savingThrows: monster.savingThrows || [],
			skills: (monster.skills || []).map((s) => s.name),
			speed: typeof monster.speed === 'number' ? monster.speed : 30,
			maxHP: monster.hp && monster.hp.average ? monster.hp.average : 10,
			hitDice: monster.hp && monster.hp.dice ? [{ die: monster.hp.dice, current: 1, max: 1 }] : [],
			baseAC: monster.ac || 10,
			xp: monster.xp || 0,
			armorProficiencies: ['light', 'medium', 'heavy', 'shield'],
			weaponProficiencies: [],
		});
		creature.damageVulnerabilities = monster.damageVulnerabilities || [];
		creature.damageResistances = monster.damageResistances || [];
		creature.damageImmunities = monster.damageImmunities || [];
		creature.conditionImmunities = monster.conditionImmunities || [];
		creature.senses = monster.senses || [];
		creature.languages = monster.languages || [];
		creature.challenge = monster.challenge;
		creature.cr = monster.challenge;
		creature.xp = monster.xp || xpForCR(monster.challenge);
		creature.traits = monster.traits || [];
		creature.actions = monster.actions || [];
		creature.legendaryActions = monster.legendaryActions || [];
		creature.proficiencyBonusOverride = profBonusForCR(monster.challenge);
		creature.ac = DnD5E.Armor.computeAC(creature);
		creature.monsterSource = monster.name;
		return creature;
	}

	function createMonster(name) {
		const monster = SRD.monsters.byName(name);
		if (!monster) {
			const npc = SRD.npcs.byName(name);
			if (!npc) return null;
			return monsterToCreature(npc);
		}
		return monsterToCreature(monster);
	}

	// Build a player character from race + class + level.
	function createCharacter(opts = {}) {
		const name = opts.name || 'Hero';
		const raceName = opts.race || 'Human';
		const className = opts.className || 'Fighter';
		const level = opts.level || 1;

		const creature = new DnD5E.Creature({
			name,
			isPlayer: true,
			abilityScores: Object.assign({}, opts.abilityScores || DnD5E.Rules.STANDARD_ARRAY_BY_ABILITY || defaultScores()),
		});
		creature.classes = [{ name: className, level }];
		DnD5E.Leveling.applyRace(creature, raceName);
		DnD5E.Leveling.applyClassSet(creature, creature.classes);
		DnD5E.Leveling.applyMulticlassSpellSlots(creature, creature.classes);
		creature.ac = DnD5E.Armor.computeAC(creature);
		return creature;
	}

	const defaultScores = () => {
		const scores = {};
		const values = [15, 14, 13, 12, 10, 8];
		const abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
		for (let i = 0; i < abilities.length; i++) scores[abilities[i]] = values[i];
		return scores;
	};

	const DnD5e = {
		SRD,
		Registry,
		registerList,
		loadAll,
		loadOne,
		monsterToCreature,
		createMonster,
		createCharacter,
		dataPath,
		crToNumber,
		xpForCR,
		profBonusForCR,
		CR_XP,
	};
	Object.assign(DnD5E, DnD5e);
	DnD5E.SRD = SRD;
})(window.DnD5E);

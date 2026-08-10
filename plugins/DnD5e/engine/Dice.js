/*
 * DnD5e plugin for RPG Paper Maker.
 * Dice module: d20 rolls, advantage/disadvantage, damage dice, roll history.
 * SRD game mechanics under OGL 1.0a.
 */
window.DnD5E = window.DnD5E || {};

(function (DnD5E) {
	'use strict';

	const REROLL_ONCE = Symbol('rerollOnce');

	// Simple seeded PRNG (mulberry32) so results can be replayed in tests.
	let _seed = Date.now() ^ 0x9e3779b9;
	const _rand = () => {
		_seed |= 0;
		_seed = (_seed + 0x6d2b79f5) | 0;
		let t = Math.imul(_seed ^ (_seed >>> 15), 1 | _seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};

	const rollDie = (sides) => Math.floor(_rand() * sides) + 1;

	const parseDice = (notation) => {
		// "2d6+3", "1d20", "d8-1", "3d10 + 2"
		if (typeof notation === 'number') {
			return { count: 1, sides: notation, modifier: 0 };
		}
		const m = /^\s*(\d*)d(\d+)\s*([+\-]\s*\d+)?\s*$/i.exec(String(notation));
		if (!m) {
			throw new Error('Invalid dice notation: ' + notation);
		}
		return {
			count: parseInt(m[1] || '1', 10),
			sides: parseInt(m[2], 10),
			modifier: m[3] ? parseInt(m[3].replace(/\s+/g, ''), 10) : 0,
		};
	};

	// Roll a single die set. Returns { total, rolls }.
	const rollDice = (notation, { advantage = false, disadvantage = false } = {}) => {
		const d = parseDice(notation);
		const sets = [];
		const n = d.count + (advantage || disadvantage ? 1 : 0);
		for (let i = 0; i < n; i++) {
			const rolls = [];
			for (let j = 0; j < d.count; j++) {
				rolls.push(rollDie(d.sides));
			}
			sets.push(rolls);
		}
		let kept = sets[0];
		let discarded = null;
		if (advantage || disadvantage) {
			const sums = sets.map((s) => s.reduce((a, b) => a + b, 0));
			const idx = advantage ? sums.indexOf(Math.max(...sums)) : sums.indexOf(Math.min(...sums));
			kept = sets[idx];
			discarded = sets.filter((_, i) => i !== idx);
		}
		const rolls = kept.slice();
		const total = rolls.reduce((a, b) => a + b, 0) + d.modifier;
		return { total, rolls, modifier: d.modifier, notation: String(notation), discarded };
	};

	const roll = (notation, opts) => {
		const res = rollDice(notation, opts);
		DnD5E.history?.push({ kind: 'dice', notation: res.notation, total: res.total, rolls: res.rolls, at: Date.now() });
		if (DnD5E.history && DnD5E.history.length > 200) DnD5E.history.shift();
		return res;
	};

	// A d20 roll with advantage/disadvantage + modifiers.
	const rollD20 = ({ advantage = false, disadvantage = false, modifier = 0 } = {}) => {
		const res = roll('1d20', { advantage, disadvantage });
		res.total += modifier;
		res.raw = res.total - modifier;
		res.modifier = modifier;
		res.adv = advantage ? 1 : disadvantage ? -1 : 0;
		return res;
	};

	const rollDamage = (dice, times = 1) => {
		let total = 0;
		const all = [];
		for (let i = 0; i < times; i++) {
			const res = rollDice(dice);
			total += res.total;
			all.push(res);
		}
		return { total, rolls: all };
	};

	const average = (notation) => {
		const d = parseDice(notation);
		return Math.floor((d.count * (d.sides + 1)) / 2) + d.modifier;
	};

	const DnD5e = {
		rollDie,
		rollDice,
		roll,
		rollD20,
		rollDamage,
		parseDice,
		average,
		seed: (s) => {
			_seed = s;
		},
		REROLL_ONCE,
	};
	Object.assign(DnD5E, { Dice: DnD5e });
})(window.DnD5E);

/*
 * DnD5e plugin for RPG Paper Maker.
 * Combat: initiative tracking, turn order, combat state.
 * SRD game mechanics under OGL 1.0a.
 */
window.DnD5E = window.DnD5E || {};

(function (DnD5E) {
	'use strict';

	// A single combat encounter.
	class Combat {
		constructor(opts = {}) {
			this.id = opts.id ?? DnD5E.nextId('combat');
			this.name = opts.name || 'Combat';
			this.combatants = (opts.combatants || []).slice(); // [{ creature, initiative }]
			this.round = opts.round || 1;
			this.currentIndex = opts.currentIndex ?? 0;
			this.active = !!opts.active;
			this.history = [];
		}

		add(creature, initiative = null) {
			const roll = initiative !== null && initiative !== undefined
				? initiative
				: DnD5E.Dice.rollD20({ modifier: DnD5E.Rules.modifier(creature.abilityScores.Dexterity ?? 10) }).total;
			creature.initiative = roll;
			this.combatants.push({ creature, initiative: roll });
			DnD5E.history?.push({
				kind: 'initiative',
				name: creature.name,
				roll,
				at: Date.now(),
			});
			this.sort();
			return roll;
		}

		remove(creatureOrId) {
			const id = typeof creatureOrId === 'number' ? creatureOrId : creatureOrId.id;
			this.combatants = this.combatants.filter((c) => c.creature.id !== id);
			if (this.currentIndex >= this.combatants.length) this.currentIndex = 0;
		}

		sort() {
			this.combatants.sort((a, b) => b.initiative - a.initiative || b.creature.initiativeBonus || 0);
		}

		get current() {
			return this.combatants.length ? this.combatants[this.currentIndex] : null;
		}

		next() {
			if (!this.combatants.length) return null;
			this.currentIndex = (this.currentIndex + 1) % this.combatants.length;
			if (this.currentIndex === 0) this.round += 1;
			DnD5E.history?.push({
				kind: 'turn',
				round: this.round,
				name: this.current.creature.name,
				at: Date.now(),
			});
			return this.current;
		}

		start() {
			this.active = true;
			this.round = 1;
			this.currentIndex = 0;
			this.sort();
			return this.current;
		}

		end() {
			this.active = false;
			this.currentIndex = 0;
			return this;
		}

		removeDead() {
			this.combatants = this.combatants.filter((c) => c.creature.hp > 0 || c.creature.isPlayer);
			if (this.currentIndex >= this.combatants.length) this.currentIndex = 0;
		}

		toJSON() {
			return {
				id: this.id,
				name: this.name,
				combatants: this.combatants.map((c) => ({
					creature: c.creature.id,
					initiative: c.initiative,
				})),
				round: this.round,
				currentIndex: this.currentIndex,
				active: this.active,
			};
		}
	}

	// Registry of all combats.
	let _combats = [];

	function startCombat(name) {
		const combat = new Combat({ name, active: true });
		_combats.push(combat);
		DnD5E.currentCombat = combat;
		return combat;
	}

	function endCombat(combat = DnD5E.currentCombat) {
		if (!combat) return null;
		combat.end();
		_combats = _combats.filter((c) => c !== combat);
		if (DnD5E.currentCombat === combat) DnD5E.currentCombat = null;
		return combat;
	}

	function all() {
		return _combats;
	}

	const DnD5e = {
		Combat,
		startCombat,
		endCombat,
		all,
	};
	Object.assign(DnD5E, { CombatSystem: DnD5e });
})(window.DnD5E);

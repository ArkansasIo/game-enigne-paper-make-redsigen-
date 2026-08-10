/*
 * DnD5e plugin for RPG Paper Maker.
 * Conditions: SRD 5.1 condition definitions and their mechanical effects.
 * SRD game mechanics under OGL 1.0a.
 */
window.DnD5E = window.DnD5E || {};

(function (DnD5E) {
	'use strict';

	const CONDITIONS = {
		Blinded: {
			id: 1,
			attackDisadvantage: true,
			attackersGainAdvantage: true,
			advantageOnDexteritySaves: false,
			description: 'A blinded creature can\'t see and automatically fails any ability check that requires sight. Attack rolls against the creature have advantage, and the creature\'s attack rolls have disadvantage.',
		},
		Charmed: {
			id: 2,
			description: 'A charmed creature can\'t attack the charmer or target the charmer with harmful abilities or magical effects. The charmer has advantage on any ability check to interact socially with the creature.',
		},
		Deafened: {
			id: 3,
			description: 'A deafened creature can\'t hear and automatically fails any ability check that requires hearing.',
		},
		Frightened: {
			id: 4,
			attackDisadvantage: true,
			description: 'A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight. The creature can\'t willingly move closer to the source of its fear.',
		},
		Grappled: {
			id: 5,
			speedZero: true,
			description: 'A grappled creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed. The condition ends if the grappler is incapacitated. The condition also ends if an effect removes the grappled creature from the reach of the grappler.',
		},
		Incapacitated: {
			id: 6,
			noActions: true,
			noReactions: true,
			description: 'An incapacitated creature can\'t take actions or reactions.',
		},
		Invisible: {
			id: 7,
			attackersGainDisadvantage: true,
			description: 'An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature\'s location can be detected by any noise it makes or any tracks it leaves. Attack rolls against the creature have disadvantage, and the creature\'s attack rolls have advantage.',
		},
		Paralyzed: {
			id: 8,
			noActions: true,
			noReactions: true,
			incapacitated: true,
			attackersGainAdvantage: true,
			autoCritOnHit: true,
			advantageOnDexteritySaves: false,
			strengthAndDexteritySaveFailure: true,
			description: 'A paralyzed creature is incapacitated and can\'t move or speak. The creature automatically fails Strength and Dexterity saving throws. Attack rolls against the creature have advantage. Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.',
		},
		Petrified: {
			id: 9,
			incapacitated: true,
			damageResistance: true,
			description: 'A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging. The creature is incapacitated, can\'t move or speak, and is unaware of its surroundings. Attack rolls against the creature have advantage. The creature automatically fails Strength and Dexterity saving throws. The creature has resistance to all damage. The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized.',
		},
		Poisoned: {
			id: 10,
			attackDisadvantage: true,
			description: 'A poisoned creature has disadvantage on attack rolls and ability checks.',
		},
		Prone: {
			id: 11,
			attackDisadvantage: true,
			meleeAttackersGainAdvantage: true,
			rangedAttackersGainDisadvantage: true,
			description: 'A prone creature\'s only movement option is to crawl, unless it stands up and thereby ends the condition. The creature has disadvantage on attack rolls. An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage.',
		},
		Restrained: {
			id: 12,
			speedZero: true,
			attackDisadvantage: true,
			attackersGainAdvantage: true,
			disadvantageOnDexteritySaves: true,
			description: 'A restrained creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed. Attack rolls against the creature have advantage, and the creature\'s attack rolls have disadvantage. The creature has disadvantage on Dexterity saving throws.',
		},
		Stunned: {
			id: 13,
			incapacitated: true,
			noActions: true,
			noReactions: true,
			attackDisadvantage: true,
			attackersGainAdvantage: true,
			automaticStrengthAndDexteritySaveFailure: true,
			description: 'A stunned creature is incapacitated, can\'t move, and can speak only falteringly. The creature automatically fails Strength and Dexterity saving throws. Attack rolls against the creature have advantage.',
		},
		Unconscious: {
			id: 14,
			incapacitated: true,
			noActions: true,
			noReactions: true,
			prone: true,
			attackersGainAdvantage: true,
			autoCritOnHit: true,
			automaticStrengthAndDexteritySaveFailure: true,
			description: 'An unconscious creature is incapacitated, can\'t move or speak, and is unaware of its surroundings. The creature drops whatever it\'s holding and falls prone. The creature automatically fails Strength and Dexterity saving throws. Attack rolls against the creature have advantage. Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.',
		},
		Exhaustion: {
			id: 15,
			levels: [
				{ level: 1, effect: 'Disadvantage on ability checks' },
				{ level: 2, effect: 'Speed halved' },
				{ level: 3, effect: 'Disadvantage on attack rolls and saving throws' },
				{ level: 4, effect: 'Hit point maximum halved' },
				{ level: 5, effect: 'Speed reduced to 0' },
				{ level: 6, effect: 'Death' },
			],
			description: 'Some special abilities and environmental hazards, such as starvation and the long-term effects of freezing or scorching temperatures, can lead to a special condition called exhaustion. Exhaustion is measured in six levels.',
		},
	};

	const ORDER = [
		'Blinded',
		'Charmed',
		'Deafened',
		'Frightened',
		'Grappled',
		'Incapacitated',
		'Invisible',
		'Paralyzed',
		'Petrified',
		'Poisoned',
		'Prone',
		'Restrained',
		'Stunned',
		'Unconscious',
		'Exhaustion',
	];

	const byName = (name) => CONDITIONS[name] || null;

	const getIds = () => {
		const map = {};
		for (const name of Object.keys(CONDITIONS)) {
			map[name] = CONDITIONS[name].id;
		}
		return map;
	};

	// Aggregate effects of all conditions currently on a creature.
	function aggregate(creature) {
		const effects = {
			attackDisadvantage: false,
			attackersGainAdvantage: false,
			attackersGainDisadvantage: false,
			meleeAttackersGainAdvantage: false,
			rangedAttackersGainDisadvantage: false,
			noActions: false,
			noReactions: false,
			incapacitated: false,
			speedZero: false,
			prone: false,
			advantageOnDexteritySaves: false,
			disadvantageOnDexteritySaves: false,
			automaticStrengthAndDexteritySaveFailure: false,
			autoCritOnHit: false,
			damageResistance: false,
		};
		if (!creature || !creature.conditions) return effects;
		for (const name of creature.conditions.keys()) {
			const def = CONDITIONS[name];
			if (!def) continue;
			effects.attackDisadvantage = effects.attackDisadvantage || !!def.attackDisadvantage;
			effects.attackersGainAdvantage = effects.attackersGainAdvantage || !!def.attackersGainAdvantage;
			effects.attackersGainDisadvantage = effects.attackersGainDisadvantage || !!def.attackersGainDisadvantage;
			effects.meleeAttackersGainAdvantage = effects.meleeAttackersGainAdvantage || !!def.meleeAttackersGainAdvantage;
			effects.rangedAttackersGainDisadvantage =
				effects.rangedAttackersGainDisadvantage || !!def.rangedAttackersGainDisadvantage;
			effects.noActions = effects.noActions || !!def.noActions;
			effects.noReactions = effects.noReactions || !!def.noReactions;
			effects.incapacitated = effects.incapacitated || !!def.incapacitated;
			effects.speedZero = effects.speedZero || !!def.speedZero;
			effects.prone = effects.prone || !!def.prone;
			effects.advantageOnDexteritySaves =
				effects.advantageOnDexteritySaves || !!def.advantageOnDexteritySaves;
			effects.disadvantageOnDexteritySaves =
				effects.disadvantageOnDexteritySaves || !!def.disadvantageOnDexteritySaves;
			effects.automaticStrengthAndDexteritySaveFailure =
				effects.automaticStrengthAndDexteritySaveFailure || !!def.automaticStrengthAndDexteritySaveFailure;
			effects.autoCritOnHit = effects.autoCritOnHit || !!def.autoCritOnHit;
			effects.damageResistance = effects.damageResistance || !!def.damageResistance;
		}
		return effects;
	}

	// Exhaustion level helpers.
	function getExhaustionLevel(creature) {
		return creature && creature.conditions ? creature.conditions.get('Exhaustion')?.level || 0 : 0;
	}

	function addExhaustion(creature, amount = 1) {
		const cur = getExhaustionLevel(creature);
		const next = cur + amount;
		if (next >= 6) {
			creature.hp = 0;
			creature.addCondition('Unconscious');
			creature.conditions.set('Exhaustion', { id: 15, level: 6 });
			return 6;
		}
		creature.conditions.set('Exhaustion', { id: 15, level: next });
		return next;
	}

	function removeExhaustion(creature, amount = 1) {
		const cur = getExhaustionLevel(creature);
		const next = Math.max(0, cur - amount);
		if (next === 0) {
			creature.conditions.delete('Exhaustion');
		} else {
			creature.conditions.set('Exhaustion', { id: 15, level: next });
		}
		return next;
	}

	const DnD5e = {
		CONDITIONS,
		ORDER,
		byName,
		getIds: () => getIds(),
		aggregate,
		getExhaustionLevel,
		addExhaustion,
		removeExhaustion,
	};
	Object.assign(DnD5E, { Conditions: DnD5e });
})(window.DnD5E);

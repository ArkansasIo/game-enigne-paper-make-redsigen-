/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { BINDING, JSONType } from '../common';
import { BindingType } from '../core/Serializable';
import { Base } from './Base';

class BattleRules extends Base {
	public static type = 'BattleRules';
	public damageFormula!: string;
	public hitRateFormula!: string;
	public critChanceFormula!: string;
	public critDamageMultiplierFormula!: string;
	public expGainMultiplier!: number;
	public currencyGainMultiplier!: number;
	public fleeChance!: number;
	public backAttackChance!: number;
	public guardDamageReduction!: number;
	public levelUpStatBonus!: number;

	public static readonly bindings: BindingType[] = [
		['damageFormula', 'damageFormula', '', BINDING.STRING],
		['hitRateFormula', 'hitRateFormula', '', BINDING.STRING],
		['critChanceFormula', 'critChanceFormula', '', BINDING.STRING],
		['critDamageMultiplierFormula', 'critDamageMultiplierFormula', '', BINDING.STRING],
		['expGainMultiplier', 'expGainMultiplier', 1, BINDING.NUMBER],
		['currencyGainMultiplier', 'currencyGainMultiplier', 1, BINDING.NUMBER],
		['fleeChance', 'fleeChance', 1, BINDING.NUMBER],
		['backAttackChance', 'backAttackChance', 0, BINDING.NUMBER],
		['guardDamageReduction', 'guardDamageReduction', 0.5, BINDING.NUMBER],
		['levelUpStatBonus', 'levelUpStatBonus', 10, BINDING.NUMBER],
	];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	applyDefault(): void {
		super.applyDefault(BattleRules.getBindings([]));
	}

	copy(rules: BattleRules): void {
		super.copy(rules, BattleRules.getBindings([]));
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, BattleRules.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, BattleRules.getBindings(additionnalBinding));
	}
}

export { BattleRules };

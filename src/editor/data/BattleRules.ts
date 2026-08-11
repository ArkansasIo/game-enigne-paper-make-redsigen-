/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { Model } from '../Editor';
import { BINDING, JSONType, Paths } from '../common';
import { Project } from '../core/Project';
import { BindingType, Serializable } from '../core/Serializable';

class BattleRulesData extends Serializable {
	public rules!: Model.BattleRules;

	public static readonly bindings: BindingType[] = [['rules', 'rules', undefined, BINDING.OBJECT, Model.BattleRules]];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	getPath(): string {
		return Paths.join(Project.current!.getPath(), Paths.FILE_BATTLE_RULES);
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, BattleRulesData.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, BattleRulesData.getBindings(additionnalBinding));
	}
}

export { BattleRulesData };

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

class Quests extends Serializable {
	public list!: Model.Quest[];

	public static readonly bindings: BindingType[] = [['list', 'quests', undefined, BINDING.LIST, Model.Quest]];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	getPath(): string {
		return Paths.join(Project.current!.getPath(), Paths.FILE_QUESTS);
	}

	getByID(id: number): Model.Quest {
		return this.list.find((quest) => quest.id === id)!;
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, Quests.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, Quests.getBindings(additionnalBinding));
	}
}

export { Quests };

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

class Recipes extends Serializable {
	public list!: Model.Recipe[];

	public static readonly bindings: BindingType[] = [['list', 'recipes', undefined, BINDING.LIST, Model.Recipe]];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	getPath(): string {
		return Paths.join(Project.current!.getPath(), Paths.FILE_RECIPES);
	}

	getByID(id: number): Model.Recipe {
		return this.list.find((recipe) => recipe.id === id)!;
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, Recipes.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, Recipes.getBindings(additionnalBinding));
	}
}

export { Recipes };

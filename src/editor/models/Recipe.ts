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
import { Localization } from './Localization';
import { RecipeIngredient } from './RecipeIngredient';

export enum CRAFT_KIND {
	FORGE,
	ALCHEMY,
	COOKING,
	ENCHANTING,
	CUSTOM,
}

export const CRAFT_KIND_OPTIONS = Base.mapListIndex(['forge', 'alchemy', 'cooking', 'enchanting', 'custom']);

class Recipe extends Localization {
	public static type = 'Recipe';
	public craftKind!: number;
	public resultID!: number;
	public resultQuantity!: number;
	public isUnlockedByDefault!: boolean;
	public description!: Localization;
	public ingredients!: RecipeIngredient[];

	public static bindings: BindingType[] = [
		['craftKind', 'ck', CRAFT_KIND.FORGE, BINDING.NUMBER],
		['resultID', 'rid', 1, BINDING.NUMBER],
		['resultQuantity', 'rq', 1, BINDING.NUMBER],
		['isUnlockedByDefault', 'iub', true, BINDING.BOOLEAN],
		['description', 'description', undefined, BINDING.OBJECT, Localization],
		['ingredients', 'ingredients', undefined, BINDING.LIST, RecipeIngredient],
	];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	applyDefault(additionnalBinding: BindingType[] = []): void {
		super.applyDefault(Recipe.getBindings(additionnalBinding));
		this.description = Localization.create(-1, '');
		this.ingredients = [];
	}

	copy(recipe: Recipe): void {
		super.copy(recipe, Recipe.getBindings([]));
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, Recipe.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, Recipe.getBindings(additionnalBinding));
	}
}

export { Recipe };

/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { ReactNode } from 'react';
import { BINDING, JSONType } from '../common';
import DialogRecipeIngredient from '../components/dialogs/models/DialogRecipeIngredient';
import { BindingType } from '../core/Serializable';
import { Base, DIALOG_OPTIONS } from './Base';

class RecipeIngredient extends Base {
	public static type = 'RecipeIngredient';
	public itemID!: number;
	public quantity!: number;

	public static bindings: BindingType[] = [
		['itemID', 'iid', 1, BINDING.NUMBER],
		['quantity', 'q', 1, BINDING.NUMBER],
	];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	applyDefault(additionnalBinding: BindingType[] = []): void {
		super.applyDefault(RecipeIngredient.getBindings(additionnalBinding));
	}

	copy(ingredient: RecipeIngredient): void {
		super.copy(ingredient, RecipeIngredient.getBindings([]));
	}

	getDialog(options: DIALOG_OPTIONS): ReactNode {
		return <DialogRecipeIngredient {...options} />;
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, RecipeIngredient.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, RecipeIngredient.getBindings(additionnalBinding));
	}
}

export { RecipeIngredient };

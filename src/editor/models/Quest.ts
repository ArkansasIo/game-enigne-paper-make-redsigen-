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
import { QuestObjective } from './QuestObjective';
import { QuestReward } from './QuestReward';

export enum QUEST_STATUS {
	INACTIVE,
	ACTIVE,
	COMPLETED,
	FAILED,
}

export const QUEST_STATUS_OPTIONS = Base.mapListIndex(['inactive', 'active', 'completed', 'failed']);

class Quest extends Localization {
	public static type = 'Quest';
	public description!: Localization;
	public status!: number;
	public isAutoActive!: boolean;
	public objectives!: QuestObjective[];
	public rewards!: QuestReward[];

	public static bindings: BindingType[] = [
		['description', 'description', undefined, BINDING.OBJECT, Localization],
		['status', 'status', QUEST_STATUS.INACTIVE, BINDING.NUMBER],
		['isAutoActive', 'iaa', true, BINDING.BOOLEAN],
		['objectives', 'objectives', undefined, BINDING.LIST, QuestObjective],
		['rewards', 'rewards', undefined, BINDING.LIST, QuestReward],
	];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	applyDefault(additionnalBinding: BindingType[] = []): void {
		super.applyDefault(Quest.getBindings(additionnalBinding));
		this.description = Localization.create(-1, '');
		this.objectives = [];
		this.rewards = [];
	}

	copy(quest: Quest): void {
		super.copy(quest, Quest.getBindings([]));
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, Quest.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, Quest.getBindings(additionnalBinding));
	}
}

export { Quest };

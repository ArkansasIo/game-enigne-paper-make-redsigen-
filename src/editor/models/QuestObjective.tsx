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
import DialogQuestObjective from '../components/dialogs/models/DialogQuestObjective';
import { BindingType } from '../core/Serializable';
import { Base, DIALOG_OPTIONS } from './Base';
import { Localization } from './Localization';

export enum QUEST_OBJECTIVE_KIND {
	KILL,
	COLLECT,
	TALK,
	REACH,
	CRAFT,
	CUSTOM,
}

export const QUEST_OBJECTIVE_KIND_OPTIONS = Base.mapListIndex(['kill', 'collect', 'talk', 'reach', 'craft', 'custom']);

class QuestObjective extends Base {
	public static type = 'QuestObjective';
	public objectiveKind!: number;
	public targetID!: number;
	public quantity!: number;
	public isOptional!: boolean;
	public hideInLog!: boolean;
	public description!: Localization;

	public static bindings: BindingType[] = [
		['objectiveKind', 'ok', QUEST_OBJECTIVE_KIND.CUSTOM, BINDING.NUMBER],
		['targetID', 'tid', 1, BINDING.NUMBER],
		['quantity', 'q', 1, BINDING.NUMBER],
		['isOptional', 'io', false, BINDING.BOOLEAN],
		['hideInLog', 'hil', false, BINDING.BOOLEAN],
		['description', 'description', undefined, BINDING.OBJECT, Localization],
	];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	applyDefault(additionnalBinding: BindingType[] = []): void {
		super.applyDefault(QuestObjective.getBindings(additionnalBinding));
		this.description = Localization.create(-1, '');
	}

	copy(objective: QuestObjective): void {
		super.copy(objective, QuestObjective.getBindings([]));
	}

	getDialog(options: DIALOG_OPTIONS): ReactNode {
		return <DialogQuestObjective {...options} />;
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, QuestObjective.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, QuestObjective.getBindings(additionnalBinding));
	}
}

export { QuestObjective };

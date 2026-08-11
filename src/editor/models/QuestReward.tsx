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
import DialogQuestReward from '../components/dialogs/models/DialogQuestReward';
import { BindingType } from '../core/Serializable';
import { Base, DIALOG_OPTIONS } from './Base';

export enum QUEST_REWARD_KIND {
	EXPERIENCE,
	CURRENCY,
	ITEM,
	WEAPON,
	ARMOR,
}

export const QUEST_REWARD_KIND_OPTIONS = Base.mapListIndex(['experience', 'currency', 'item', 'weapon', 'armor']);

class QuestReward extends Base {
	public static type = 'QuestReward';
	public rewardKind!: number;
	public targetID!: number;
	public quantity!: number;

	public static bindings: BindingType[] = [
		['rewardKind', 'rk', QUEST_REWARD_KIND.EXPERIENCE, BINDING.NUMBER],
		['targetID', 'tid', 1, BINDING.NUMBER],
		['quantity', 'q', 1, BINDING.NUMBER],
	];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	applyDefault(additionnalBinding: BindingType[] = []): void {
		super.applyDefault(QuestReward.getBindings(additionnalBinding));
	}

	copy(reward: QuestReward): void {
		super.copy(reward, QuestReward.getBindings([]));
	}

	getDialog(options: DIALOG_OPTIONS): ReactNode {
		return <DialogQuestReward {...options} />;
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, QuestReward.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, QuestReward.getBindings(additionnalBinding));
	}
}

export { QuestReward };

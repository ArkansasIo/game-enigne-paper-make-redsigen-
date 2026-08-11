/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { INPUT_TYPE_WIDTH } from '../../../common';
import { Project } from '../../../core/Project';
import { Model } from '../../../Editor';
import useStateNumber from '../../../hooks/useStateNumber';
import { QUEST_REWARD_KIND, QUEST_REWARD_KIND_OPTIONS } from '../../../models';
import Dropdown from '../../Dropdown';
import Flex from '../../Flex';
import Form, { Label, Value } from '../../Form';
import InputNumber from '../../InputNumber';
import Dialog, { Z_INDEX_LEVEL } from '../Dialog';
import FooterCancelOK from '../footers/FooterCancelOK';

type Props = {
	setIsOpen: (b: boolean) => void;
	model: Model.Base;
	onAccept: () => void;
	onReject?: () => void;
};

function DialogQuestReward({ setIsOpen, model, onAccept, onReject }: Props) {
	const reward = model as Model.QuestReward;

	const { t } = useTranslation();

	const [rewardKind, setRewardKind] = useStateNumber();
	const [targetID, setTargetID] = useStateNumber();
	const [quantity, setQuantity] = useStateNumber();

	const getTargetOptions = () => {
		switch (rewardKind) {
			case QUEST_REWARD_KIND.CURRENCY:
				return Project.current!.systems.currencies;
			case QUEST_REWARD_KIND.ITEM:
				return Project.current!.items.list;
			case QUEST_REWARD_KIND.WEAPON:
				return Project.current!.weapons.list;
			case QUEST_REWARD_KIND.ARMOR:
				return Project.current!.armors.list;
		}
		return [];
	};

	const initialize = () => {
		setRewardKind(reward.rewardKind);
		setTargetID(reward.targetID);
		setQuantity(reward.quantity);
	};

	const handleAccept = async () => {
		reward.rewardKind = rewardKind;
		reward.targetID = targetID;
		reward.quantity = quantity;
		onAccept();
		setIsOpen(false);
	};

	const handleReject = async () => {
		onReject?.();
		setIsOpen(false);
	};

	useEffect(() => {
		initialize();
	}, []);

	const hasTargetList = rewardKind !== QUEST_REWARD_KIND.EXPERIENCE;

	return (
		<Dialog
			title={`${t('set.quest.reward')}...`}
			isOpen
			footer={<FooterCancelOK onCancel={handleReject} onOK={handleAccept} />}
			onClose={handleReject}
			zIndex={Z_INDEX_LEVEL.LAYER_TWO}
		>
			<Form>
				<Label hideColon>{t('reward.kind')}</Label>
				<Value>
					<Dropdown
						selectedID={rewardKind}
						onChange={setRewardKind}
						options={QUEST_REWARD_KIND_OPTIONS}
						translateOptions
					/>
				</Value>
				<Label hideColon>{t('target')}</Label>
				<Value>
					<Flex spaced>
						{hasTargetList ? (
							<Dropdown selectedID={targetID} onChange={setTargetID} options={getTargetOptions()} displayIDs />
						) : (
							<InputNumber value={1} onChange={setTargetID} min={1} disabled />
						)}
						<InputNumber value={quantity} onChange={setQuantity} min={1} suffixPlaceholder={t('quantity')} />
					</Flex>
				</Value>
			</Form>
		</Dialog>
	);
}

export default DialogQuestReward;

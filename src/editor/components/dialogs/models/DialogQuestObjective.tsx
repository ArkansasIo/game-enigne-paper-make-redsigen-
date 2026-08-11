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
import useStateBool from '../../../hooks/useStateBool';
import useStateNumber from '../../../hooks/useStateNumber';
import useStateString from '../../../hooks/useStateString';
import { Localization, QUEST_OBJECTIVE_KIND, QUEST_OBJECTIVE_KIND_OPTIONS } from '../../../models';
import Checkbox from '../../Checkbox';
import Dropdown from '../../Dropdown';
import Flex from '../../Flex';
import Form, { Label, Value } from '../../Form';
import InputLocalization from '../../InputLocalization';
import InputNumber from '../../InputNumber';
import Dialog, { Z_INDEX_LEVEL } from '../Dialog';
import FooterCancelOK from '../footers/FooterCancelOK';

type Props = {
	setIsOpen: (b: boolean) => void;
	model: Model.Base;
	onAccept: () => void;
	onReject?: () => void;
};

function DialogQuestObjective({ setIsOpen, model, onAccept, onReject }: Props) {
	const objective = model as Model.QuestObjective;

	const { t } = useTranslation();

	const [objectiveKind, setObjectiveKind] = useStateNumber();
	const [targetID, setTargetID] = useStateNumber();
	const [quantity, setQuantity] = useStateNumber();
	const [isOptional, setIsOptional] = useStateBool();
	const [hideInLog, setHideInLog] = useStateBool();
	const [description, setDescription] = useState<Localization>(new Localization());

	const getTargetOptions = () => {
		switch (objectiveKind) {
			case QUEST_OBJECTIVE_KIND.KILL:
				return Project.current!.monsters.list;
			case QUEST_OBJECTIVE_KIND.COLLECT:
				return Project.current!.items.list;
			case QUEST_OBJECTIVE_KIND.CRAFT:
				return Project.current!.recipes.list;
		}
		return [];
	};

	const initialize = () => {
		setObjectiveKind(objective.objectiveKind);
		setTargetID(objective.targetID);
		setQuantity(objective.quantity);
		setIsOptional(objective.isOptional);
		setHideInLog(objective.hideInLog);
		setDescription(objective.description);
	};

	const handleAccept = async () => {
		objective.objectiveKind = objectiveKind;
		objective.targetID = targetID;
		objective.quantity = quantity;
		objective.isOptional = isOptional;
		objective.hideInLog = hideInLog;
		objective.description = description;
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

	const hasTargetList = [
		QUEST_OBJECTIVE_KIND.KILL,
		QUEST_OBJECTIVE_KIND.COLLECT,
		QUEST_OBJECTIVE_KIND.CRAFT,
	].includes(objectiveKind);

	return (
		<Dialog
			title={`${t('set.quest.objective')}...`}
			isOpen
			footer={<FooterCancelOK onCancel={handleReject} onOK={handleAccept} />}
			onClose={handleReject}
			zIndex={Z_INDEX_LEVEL.LAYER_TWO}
		>
			<Form>
				<Label hideColon>{t('objective.kind')}</Label>
				<Value>
					<Dropdown
						selectedID={objectiveKind}
						onChange={setObjectiveKind}
						options={QUEST_OBJECTIVE_KIND_OPTIONS}
						translateOptions
					/>
				</Value>
				<Label hideColon>{t('target')}</Label>
				<Value>
					<Flex spaced>
						{hasTargetList ? (
							<Dropdown selectedID={targetID} onChange={setTargetID} options={getTargetOptions()} displayIDs />
						) : (
							<InputNumber
								value={targetID}
								onChange={setTargetID}
								widthType={INPUT_TYPE_WIDTH.LARGE}
								min={1}
							/>
						)}
						<InputNumber value={quantity} onChange={setQuantity} min={1} suffixPlaceholder={t('quantity')} />
					</Flex>
				</Value>
				<Value>
					<Flex spaced>
						<Checkbox isChecked={isOptional} onChange={setIsOptional}>
							{t('optional')}
						</Checkbox>
						<Checkbox isChecked={hideInLog} onChange={setHideInLog}>
							{t('hide.in.log')}
						</Checkbox>
					</Flex>
				</Value>
				<Label hideColon>{t('description')}</Label>
				<Value>
					<InputLocalization localization={description} widthType={INPUT_TYPE_WIDTH.FILL} />
				</Value>
			</Form>
		</Dialog>
	);
}

export default DialogQuestObjective;

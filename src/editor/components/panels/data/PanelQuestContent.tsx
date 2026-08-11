/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { INPUT_TYPE_WIDTH } from '../../../common';
import { Node } from '../../../core/Node';
import { Project } from '../../../core/Project';
import useStateBool from '../../../hooks/useStateBool';
import useStateNumber from '../../../hooks/useStateNumber';
import { Localization, Quest, QuestObjective, QuestReward, QUEST_STATUS_OPTIONS } from '../../../models';
import Checkbox from '../../Checkbox';
import Dropdown from '../../Dropdown';
import Flex from '../../Flex';
import Groupbox from '../../Groupbox';
import InputLocalization from '../../InputLocalization';
import Tree from '../../Tree';

type Props = {
	selectedQuest: Quest | null;
	disabled?: boolean;
};

function PanelQuestContent({ selectedQuest, disabled = false }: Props) {
	const { t } = useTranslation();

	const [status, setStatus] = useStateNumber();
	const [isAutoActive, setIsAutoActive] = useStateBool();
	const [description, setDescription] = useState<Localization>(Localization.create(-1, ''));
	const [objectives, setObjectives] = useState<Node[]>([]);
	const [rewards, setRewards] = useState<Node[]>([]);

	const isQuestDisabled = useMemo(
		() => selectedQuest === null || selectedQuest.id === -1,
		[selectedQuest],
	);
	const isDisabled = disabled || isQuestDisabled;

	const update = () => {
		if (selectedQuest) {
			setStatus(selectedQuest.status);
			setIsAutoActive(selectedQuest.isAutoActive);
			setDescription(selectedQuest.description);
			setObjectives(Node.createList(selectedQuest.objectives, false));
			setRewards(Node.createList(selectedQuest.rewards, false));
		}
	};

	const handleChangeStatus = (n: number) => {
		if (selectedQuest) {
			selectedQuest.status = n;
		}
		setStatus(n);
	};

	const handleChangeIsAutoActive = (b: boolean) => {
		if (selectedQuest) {
			selectedQuest.isAutoActive = b;
		}
		setIsAutoActive(b);
	};

	const handleUpdateObjectives = () => {
		if (selectedQuest) {
			selectedQuest.objectives = Node.createListFromNodes(objectives);
		}
	};

	const handleUpdateRewards = () => {
		if (selectedQuest) {
			selectedQuest.rewards = Node.createListFromNodes(rewards);
		}
	};

	useLayoutEffect(() => {
		update();
	}, [selectedQuest]);

	return (
		<Flex one column spacedLarge fillWidth fillHeight>
			<Flex columnMobile spaced>
				<Flex spaced centerV>
					<Flex disabledLabel={isDisabled}>{t('status')}:</Flex>
					<Dropdown
						selectedID={status}
						onChange={handleChangeStatus}
						options={QUEST_STATUS_OPTIONS}
						disabled={isDisabled}
						translateOptions
					/>
				</Flex>
				<Checkbox isChecked={isAutoActive} onChange={handleChangeIsAutoActive} disabled={isDisabled}>
					{t('auto.active')}
				</Checkbox>
				<Flex one />
			</Flex>
			<Flex column spaced>
				<Flex disabledLabel={isDisabled}>{t('description')}:</Flex>
				<InputLocalization
					localization={description}
					disabled={isDisabled}
					widthType={INPUT_TYPE_WIDTH.FILL}
				/>
			</Flex>
			<Flex columnMobile one spacedLarge>
				<Flex one>
					<Groupbox title={t('objectives')} disabled={isDisabled} fillWidth>
						<Flex one fillHeight>
							<Tree
								constructorType={QuestObjective}
								list={objectives}
								onListUpdated={handleUpdateObjectives}
								disabled={isDisabled}
								scrollable
								canBeEmpty
								byIndex
								cannotUpdateListSize
							/>
						</Flex>
					</Groupbox>
				</Flex>
				<Flex one>
					<Groupbox title={t('rewards')} disabled={isDisabled} fillWidth>
						<Flex one fillHeight>
							<Tree
								constructorType={QuestReward}
								list={rewards}
								onListUpdated={handleUpdateRewards}
								disabled={isDisabled}
								scrollable
								canBeEmpty
								byIndex
								cannotUpdateListSize
							/>
						</Flex>
					</Groupbox>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default PanelQuestContent;

/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Node } from '../../../core/Node';
import { Project } from '../../../core/Project';
import { Model } from '../../../Editor';
import Flex from '../../Flex';
import Groupbox from '../../Groupbox';
import Tree, { TREES_MIN_WIDTH } from '../../Tree';
import PanelQuestContent from './PanelQuestContent';

const PanelQuests = forwardRef((props, ref) => {
	const { t } = useTranslation();

	const [quests, setQuests] = useState<Node[]>([]);
	const [selectedQuest, setSelectedQuest] = useState<Model.Quest | null>(null);

	const isQuestDisabled = useMemo(() => selectedQuest === null || selectedQuest.id === -1, [selectedQuest]);

	const initialize = () => {
		setQuests(Node.createList(Project.current!.quests.list, false));
	};

	const handleSelectQuest = (node: Node | null) => {
		setSelectedQuest((node?.content as Model.Quest) ?? null);
	};

	const handleListUpdated = () => {
		Project.current!.quests.list = Node.createListFromNodes(quests);
	};

	useImperativeHandle(ref, () => ({}));

	useLayoutEffect(() => {
		initialize();
	}, []);

	return (
		<Flex columnMobile spacedLarge fillWidth fillHeight>
			<Groupbox title={t('quests')}>
				<Tree
					constructorType={Model.Quest}
					list={quests}
					minWidth={TREES_MIN_WIDTH}
					onSelectedItem={handleSelectQuest}
					onListUpdated={handleListUpdated}
					scrollable
					showEditName
					isLocalization
					applyDefault
					doNotOpenDialog
				/>
			</Groupbox>
			<Flex one column>
				<Flex one column scrollable zeroHeight>
					<PanelQuestContent selectedQuest={selectedQuest} disabled={isQuestDisabled} />
				</Flex>
			</Flex>
		</Flex>
	);
});

PanelQuests.displayName = 'PanelQuests';

export default PanelQuests;

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
import PanelRecipeContent from './PanelRecipeContent';

const PanelRecipes = forwardRef((props, ref) => {
	const { t } = useTranslation();

	const [recipes, setRecipes] = useState<Node[]>([]);
	const [selectedRecipe, setSelectedRecipe] = useState<Model.Recipe | null>(null);

	const isRecipeDisabled = useMemo(() => selectedRecipe === null || selectedRecipe.id === -1, [selectedRecipe]);

	const initialize = () => {
		setRecipes(Node.createList(Project.current!.recipes.list, false));
	};

	const handleSelectRecipe = (node: Node | null) => {
		setSelectedRecipe((node?.content as Model.Recipe) ?? null);
	};

	const handleListUpdated = () => {
		Project.current!.recipes.list = Node.createListFromNodes(recipes);
	};

	useImperativeHandle(ref, () => ({}));

	useLayoutEffect(() => {
		initialize();
	}, []);

	return (
		<Flex columnMobile spacedLarge fillWidth fillHeight>
			<Groupbox title={t('recipes')}>
				<Tree
					constructorType={Model.Recipe}
					list={recipes}
					minWidth={TREES_MIN_WIDTH}
					onSelectedItem={handleSelectRecipe}
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
					<PanelRecipeContent selectedRecipe={selectedRecipe} disabled={isRecipeDisabled} />
				</Flex>
			</Flex>
		</Flex>
	);
});

PanelRecipes.displayName = 'PanelRecipes';

export default PanelRecipes;

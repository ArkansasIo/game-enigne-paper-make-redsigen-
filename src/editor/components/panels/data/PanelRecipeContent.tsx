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
import {
	CRAFT_KIND_OPTIONS,
	Localization,
	Recipe,
	RecipeIngredient,
} from '../../../models';
import Checkbox from '../../Checkbox';
import Dropdown from '../../Dropdown';
import Flex from '../../Flex';
import Form, { Label, Value } from '../../Form';
import Groupbox from '../../Groupbox';
import InputLocalization from '../../InputLocalization';
import InputNumber from '../../InputNumber';
import Tree from '../../Tree';

type Props = {
	selectedRecipe: Recipe | null;
	disabled?: boolean;
};

function PanelRecipeContent({ selectedRecipe, disabled = false }: Props) {
	const { t } = useTranslation();

	const [craftKind, setCraftKind] = useStateNumber();
	const [resultID, setResultID] = useStateNumber();
	const [resultQuantity, setResultQuantity] = useStateNumber();
	const [isUnlockedByDefault, setIsUnlockedByDefault] = useStateBool();
	const [description, setDescription] = useState<Localization>(Localization.create(-1, ''));
	const [ingredients, setIngredients] = useState<Node[]>([]);

	const isRecipeDisabled = useMemo(
		() => selectedRecipe === null || selectedRecipe.id === -1,
		[selectedRecipe],
	);
	const isDisabled = disabled || isRecipeDisabled;

	const update = () => {
		if (selectedRecipe) {
			setCraftKind(selectedRecipe.craftKind);
			setResultID(selectedRecipe.resultID);
			setResultQuantity(selectedRecipe.resultQuantity);
			setIsUnlockedByDefault(selectedRecipe.isUnlockedByDefault);
			setDescription(selectedRecipe.description);
			setIngredients(Node.createList(selectedRecipe.ingredients, false));
		}
	};

	const handleChangeCraftKind = (n: number) => {
		if (selectedRecipe) {
			selectedRecipe.craftKind = n;
		}
		setCraftKind(n);
	};

	const handleChangeResult = (id: number) => {
		if (selectedRecipe) {
			selectedRecipe.resultID = id;
		}
		setResultID(id);
	};

	const handleChangeResultQuantity = (n: number) => {
		if (selectedRecipe) {
			selectedRecipe.resultQuantity = n;
		}
		setResultQuantity(n);
	};

	const handleChangeIsUnlockedByDefault = (b: boolean) => {
		if (selectedRecipe) {
			selectedRecipe.isUnlockedByDefault = b;
		}
		setIsUnlockedByDefault(b);
	};

	const handleUpdateIngredients = () => {
		if (selectedRecipe) {
			selectedRecipe.ingredients = Node.createListFromNodes(ingredients);
		}
	};

	useLayoutEffect(() => {
		update();
	}, [selectedRecipe]);

	return (
		<Flex one column spacedLarge fillWidth fillHeight>
			<Form verticalMobile>
				<Label disabled={isDisabled}>{t('craft.kind')}</Label>
				<Value>
					<Dropdown
						selectedID={craftKind}
						onChange={handleChangeCraftKind}
						options={CRAFT_KIND_OPTIONS}
						disabled={isDisabled}
						translateOptions
					/>
				</Value>
				<Label disabled={isDisabled}>{t('result')}</Label>
				<Value>
					<Flex spaced>
						<Dropdown
							selectedID={resultID}
							onChange={handleChangeResult}
							options={Project.current!.items.list}
							disabled={isDisabled}
							displayIDs
						/>
						<InputNumber
							value={resultQuantity}
							onChange={handleChangeResultQuantity}
							min={1}
							disabled={isDisabled}
						/>
					</Flex>
				</Value>
				<Label disabled={isDisabled}>{t('description')}</Label>
				<Value>
					<InputLocalization
						localization={description}
						disabled={isDisabled}
						widthType={INPUT_TYPE_WIDTH.FILL}
					/>
				</Value>
				<Value>
					<Checkbox
						isChecked={isUnlockedByDefault}
						onChange={handleChangeIsUnlockedByDefault}
						disabled={isDisabled}
					>
						{t('unlocked.by.default')}
					</Checkbox>
				</Value>
			</Form>
			<Flex one>
				<Groupbox title={t('ingredients')} disabled={isDisabled} fillWidth>
					<Flex one fillHeight>
						<Tree
							constructorType={RecipeIngredient}
							list={ingredients}
							onListUpdated={handleUpdateIngredients}
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
	);
}

export default PanelRecipeContent;

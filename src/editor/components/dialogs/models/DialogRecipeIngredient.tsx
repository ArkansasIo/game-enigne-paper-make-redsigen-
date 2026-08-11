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

function DialogRecipeIngredient({ setIsOpen, model, onAccept, onReject }: Props) {
	const ingredient = model as Model.RecipeIngredient;

	const { t } = useTranslation();

	const [itemID, setItemID] = useStateNumber();
	const [quantity, setQuantity] = useStateNumber();

	const initialize = () => {
		setItemID(ingredient.itemID);
		setQuantity(ingredient.quantity);
	};

	const handleAccept = async () => {
		ingredient.itemID = itemID;
		ingredient.quantity = quantity;
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

	return (
		<Dialog
			title={`${t('set.ingredient')}...`}
			isOpen
			footer={<FooterCancelOK onCancel={handleReject} onOK={handleAccept} />}
			onClose={handleReject}
			zIndex={Z_INDEX_LEVEL.LAYER_TWO}
		>
			<Form>
				<Label hideColon>{t('item')}</Label>
				<Value>
					<Dropdown selectedID={itemID} onChange={setItemID} options={Project.current!.items.list} displayIDs />
				</Value>
				<Label hideColon>{t('quantity')}</Label>
				<Value>
					<InputNumber
						value={quantity}
						onChange={setQuantity}
						widthType={INPUT_TYPE_WIDTH.NORMAL}
						min={1}
					/>
				</Value>
			</Form>
		</Dialog>
	);
}

export default DialogRecipeIngredient;

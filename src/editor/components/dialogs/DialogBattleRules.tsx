/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { INPUT_TYPE_WIDTH } from '../../common';
import { Project } from '../../core/Project';
import useStateNumber from '../../hooks/useStateNumber';
import useStateString from '../../hooks/useStateString';
import Flex from '../Flex';
import Form, { Label, Value } from '../Form';
import Groupbox from '../Groupbox';
import InputNumber from '../InputNumber';
import InputText from '../InputText';
import Dialog from './Dialog';
import FooterCancelOK from './footers/FooterCancelOK';

type Props = {
	setIsOpen: (b: boolean) => void;
};

function DialogBattleRules({ setIsOpen }: Props) {
	const { t } = useTranslation();

	const [isLoading, setIsLoading] = useState(false);
	const [damageFormula, setDamageFormula] = useStateString();
	const [hitRateFormula, setHitRateFormula] = useStateString();
	const [critChanceFormula, setCritChanceFormula] = useStateString();
	const [critDamageMultiplierFormula, setCritDamageMultiplierFormula] = useStateString();
	const [expGainMultiplier, setExpGainMultiplier] = useStateNumber();
	const [currencyGainMultiplier, setCurrencyGainMultiplier] = useStateNumber();
	const [fleeChance, setFleeChance] = useStateNumber();
	const [backAttackChance, setBackAttackChance] = useStateNumber();
	const [guardDamageReduction, setGuardDamageReduction] = useStateNumber();
	const [levelUpStatBonus, setLevelUpStatBonus] = useStateNumber();

	const initialize = () => {
		const rules = Project.current!.battleRules.rules;
		setDamageFormula(rules.damageFormula);
		setHitRateFormula(rules.hitRateFormula);
		setCritChanceFormula(rules.critChanceFormula);
		setCritDamageMultiplierFormula(rules.critDamageMultiplierFormula);
		setExpGainMultiplier(rules.expGainMultiplier);
		setCurrencyGainMultiplier(rules.currencyGainMultiplier);
		setFleeChance(rules.fleeChance);
		setBackAttackChance(rules.backAttackChance);
		setGuardDamageReduction(rules.guardDamageReduction);
		setLevelUpStatBonus(rules.levelUpStatBonus);
	};

	useLayoutEffect(() => {
		initialize();
	}, []);

	const handleAccept = async () => {
		setIsLoading(true);
		const rules = Project.current!.battleRules.rules;
		rules.damageFormula = damageFormula;
		rules.hitRateFormula = hitRateFormula;
		rules.critChanceFormula = critChanceFormula;
		rules.critDamageMultiplierFormula = critDamageMultiplierFormula;
		rules.expGainMultiplier = expGainMultiplier;
		rules.currencyGainMultiplier = currencyGainMultiplier;
		rules.fleeChance = fleeChance;
		rules.backAttackChance = backAttackChance;
		rules.guardDamageReduction = guardDamageReduction;
		rules.levelUpStatBonus = levelUpStatBonus;
		await Project.current!.battleRules.save();
		setIsLoading(false);
		setIsOpen(false);
	};

	const handleReject = async () => {
		setIsOpen(false);
	};

	return (
		<Dialog
			isOpen
			title={`${t('battle.rules')}...`}
			footer={<FooterCancelOK onCancel={handleReject} onOK={handleAccept} />}
			onClose={handleReject}
			isLoading={isLoading}
			initialWidth='700px'
		>
			<Flex column spacedLarge fillWidth fillHeight>
				<Groupbox title={t('formulas')}>
					<Form verticalMobile>
						<Label>{t('damage.formula')}</Label>
						<Value>
							<InputText
								value={damageFormula}
								onChange={setDamageFormula}
								widthType={INPUT_TYPE_WIDTH.FILL}
							/>
						</Value>
						<Label>{t('hit.rate.formula')}</Label>
						<Value>
							<InputText
								value={hitRateFormula}
								onChange={setHitRateFormula}
								widthType={INPUT_TYPE_WIDTH.FILL}
							/>
						</Value>
						<Label>{t('crit.chance.formula')}</Label>
						<Value>
							<InputText
								value={critChanceFormula}
								onChange={setCritChanceFormula}
								widthType={INPUT_TYPE_WIDTH.FILL}
							/>
						</Value>
						<Label>{t('crit.damage.multiplier.formula')}</Label>
						<Value>
							<InputText
								value={critDamageMultiplierFormula}
								onChange={setCritDamageMultiplierFormula}
								widthType={INPUT_TYPE_WIDTH.FILL}
							/>
						</Value>
					</Form>
				</Groupbox>
				<Groupbox title={t('values')}>
					<Form verticalMobile>
						<Label>{t('exp.gain.multiplier')}</Label>
						<Value>
							<InputNumber
								value={expGainMultiplier}
								onChange={setExpGainMultiplier}
								decimals
								min={0}
							/>
						</Value>
						<Label>{t('currency.gain.multiplier')}</Label>
						<Value>
							<InputNumber
								value={currencyGainMultiplier}
								onChange={setCurrencyGainMultiplier}
								decimals
								min={0}
							/>
						</Value>
						<Label>{t('flee.chance')}</Label>
						<Value>
							<Flex spaced centerV>
								<InputNumber
									value={fleeChance}
									onChange={setFleeChance}
									decimals
									min={0}
									max={100}
								/>
								%
							</Flex>
						</Value>
						<Label>{t('back.attack.chance')}</Label>
						<Value>
							<Flex spaced centerV>
								<InputNumber
									value={backAttackChance}
									onChange={setBackAttackChance}
									decimals
									min={0}
									max={100}
								/>
								%
							</Flex>
						</Value>
						<Label>{t('guard.damage.reduction')}</Label>
						<Value>
							<Flex spaced centerV>
								<InputNumber
									value={guardDamageReduction}
									onChange={setGuardDamageReduction}
									decimals
									min={0}
									max={1}
								/>
							</Flex>
						</Value>
						<Label>{t('level.up.stat.bonus')}</Label>
						<Value>
							<InputNumber
								value={levelUpStatBonus}
								onChange={setLevelUpStatBonus}
								decimals
								min={0}
							/>
						</Value>
					</Form>
				</Groupbox>
			</Flex>
		</Dialog>
	);
}

export default DialogBattleRules;

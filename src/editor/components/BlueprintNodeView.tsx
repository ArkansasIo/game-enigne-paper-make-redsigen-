/*
    Andromeda RPG Paper Maker (fork)
    Blueprint visual node editor: single node card with inline config editors.
*/

import { useTranslation } from 'react-i18next';
import { SONG_KIND } from '../common';
import { Model } from '../Editor';
import { Project } from '../core/Project';
import InputNumber from './InputNumber';
import InputText from './InputText';
import TextArea from './TextArea';
import Dropdown from './Dropdown';
import {
	BLUEPRINT_NODE_KIND,
	BlueprintDynamicValue,
	BlueprintNode,
	getBlueprintNodeInfo,
} from '../core/Blueprint';

export const BLUEPRINT_NODE_WIDTH = 230;
export const BLUEPRINT_HEADER_HEIGHT = 30;
export const BLUEPRINT_PORT_INPUT_Y = 44;
export const BLUEPRINT_PORT_SPACING = 26;

const VARIABLE_OPERATIONS = [
	Model.Base.create(0, '='),
	Model.Base.create(1, '+'),
	Model.Base.create(2, '-'),
	Model.Base.create(3, '×'),
	Model.Base.create(4, '÷'),
	Model.Base.create(5, '%'),
];

const COMPARE_OPERATIONS = [
	Model.Base.create(0, '='),
	Model.Base.create(1, '!='),
	Model.Base.create(2, '>='),
	Model.Base.create(3, '<='),
	Model.Base.create(4, '>'),
	Model.Base.create(5, '<'),
];

const ITEM_KIND_OPTIONS = [Model.Base.create(0, 'Item'), Model.Base.create(1, 'Weapon'), Model.Base.create(2, 'Armor')];

const getVariables = (): Model.Base[] => Project.current?.variables.getVariables() ?? [];
const getCurrencies = (): Model.Base[] => Project.current?.systems.currencies ?? [];
const getItems = (): Model.Base[] => Project.current?.items.list ?? [];
const getWeapons = (): Model.Base[] => Project.current?.weapons.list ?? [];
const getArmors = (): Model.Base[] => Project.current?.armors.list ?? [];
const getCommonReactions = (): Model.Base[] => Project.current?.commonEvents.commonReactions ?? [];
const getSongs = (kind: SONG_KIND): Model.Base[] => Project.current?.songs.getList(kind) ?? [];

type DynamicValueKindOption = { label: string; kind: number };

const DynamicValueInput = ({
	dv,
	onChange,
	options,
	decimals = false,
}: {
	dv: BlueprintDynamicValue;
	onChange: (dv: BlueprintDynamicValue) => void;
	options: DynamicValueKindOption[];
	decimals?: boolean;
}) => {
	const currentOption = options.find((option) => option.kind === dv.kind) ?? options[0];
	return (
		<div style={{ display: 'flex', gap: 4, alignItems: 'center', width: '100%' }}>
			<Dropdown
				selectedID={currentOption.kind}
				onChange={(kind) => onChange({ kind, value: decimals ? 0 : kind === 5 ? 1 : 0 })}
				options={options.map((option) => Model.Base.create(option.kind, option.label))}
				noWidthChange
				width='80px'
			/>
			{currentOption.kind === 5 ? (
				<Dropdown
					selectedID={typeof dv.value === 'number' ? (dv.value as number) : 1}
					onChange={(variableID) => onChange({ ...dv, value: variableID })}
					options={getVariables()}
					noWidthChange
					width='120px'
				/>
			) : (
				<InputNumber
					value={typeof dv.value === 'number' ? dv.value : 0}
					decimals={decimals}
					onChange={(value) => onChange({ ...dv, value })}
					widthType={2}
				/>
			)}
		</div>
	);
};

const NUMBER_KIND_OPTIONS: DynamicValueKindOption[] = [
	{ label: 'Number', kind: 4 },
	{ label: 'Variable', kind: 5 },
];
const NUMBER_DECIMAL_KIND_OPTIONS: DynamicValueKindOption[] = [
	{ label: 'Number', kind: 13 },
	{ label: 'Variable', kind: 5 },
];
const TEXT_KIND_OPTIONS: DynamicValueKindOption[] = [{ label: 'Text', kind: 9 }];

const getOperationBase = (index: number): Model.Base => VARIABLE_OPERATIONS[index] ?? VARIABLE_OPERATIONS[0];
const getCompareBase = (index: number): Model.Base => COMPARE_OPERATIONS[index] ?? COMPARE_OPERATIONS[0];
const getItemKindBase = (index: number): Model.Base => ITEM_KIND_OPTIONS[index] ?? ITEM_KIND_OPTIONS[0];

const NodeContent = ({ node, onChange }: { node: BlueprintNode; onChange: (node: BlueprintNode) => void }) => {
	const { t } = useTranslation();
	const config = node.config;

	const update = (patch: { [key: string]: unknown }) => {
		onChange({ ...node, config: { ...config, ...patch } });
	};

	switch (node.kind) {
		case BLUEPRINT_NODE_KIND.SHOW_TEXT: {
			const texts = (config.texts as { [key: number]: string }) ?? {};
			const languages = Project.current?.languages.list ?? [];
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
					<div>
						<div style={{ fontSize: 11 }}>Interlocutor</div>
						<DynamicValueInput
							dv={(config.interlocutor as BlueprintDynamicValue) ?? { kind: 9, value: '' }}
							onChange={(interlocutor) => update({ interlocutor })}
							options={TEXT_KIND_OPTIONS}
						/>
					</div>
					<div>
						<div style={{ fontSize: 11 }}>Faceset ID</div>
						<InputNumber
							value={(config.facesetID as number) ?? -1}
							min={-1}
							onChange={(facesetID) => update({ facesetID })}
							widthType={2}
						/>
					</div>
					{languages.map((language) => (
						<div key={language.id}>
							<div style={{ fontSize: 11 }}>{language.toString()}</div>
							<InputText
								value={texts[language.id] ?? ''}
								onChange={(text) => update({ texts: { ...texts, [language.id]: text } })}
								widthType={2}
								style={{ maxWidth: '100%' }}
							/>
						</div>
					))}
				</div>
			);
		}
		case BLUEPRINT_NODE_KIND.CHANGE_VARIABLE:
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
					<div>
						<div style={{ fontSize: 11 }}>Variable</div>
						<Dropdown
							selectedID={(config.variableID as number) ?? 1}
							onChange={(variableID) => update({ variableID })}
							options={getVariables()}
							noWidthChange
							width='150px'
						/>
					</div>
					<div>
						<div style={{ fontSize: 11 }}>Operation</div>
						<Dropdown
							selectedID={(config.operation as number) ?? 0}
							onChange={(operation) => update({ operation })}
							options={VARIABLE_OPERATIONS}
							noWidthChange
							width='150px'
						/>
					</div>
					<div>
						<div style={{ fontSize: 11 }}>Value</div>
						<DynamicValueInput
							dv={(config.value as BlueprintDynamicValue) ?? { kind: 4, value: 0 }}
							onChange={(value) => update({ value })}
							options={NUMBER_KIND_OPTIONS}
						/>
					</div>
				</div>
			);
		case BLUEPRINT_NODE_KIND.WAIT:
			return (
				<div>
					<div style={{ fontSize: 11 }}>{t('time')} (s)</div>
					<DynamicValueInput
						dv={(config.time as BlueprintDynamicValue) ?? { kind: 13, value: 0 }}
						onChange={(time) => update({ time })}
						options={NUMBER_DECIMAL_KIND_OPTIONS}
						decimals
					/>
				</div>
			);
		case BLUEPRINT_NODE_KIND.IF:
		case BLUEPRINT_NODE_KIND.WHILE:
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
					<div>
						<div style={{ fontSize: 11 }}>Variable</div>
						<DynamicValueInput
							dv={(config.dv as BlueprintDynamicValue) ?? { kind: 5, value: 1 }}
							onChange={(dv) => update({ dv })}
							options={[{ label: 'Variable', kind: 5 }]}
						/>
					</div>
					<div>
						<div style={{ fontSize: 11 }}>Compare</div>
						<Dropdown
							selectedID={(config.operation as number) ?? 5}
							onChange={(operation) => update({ operation })}
							options={COMPARE_OPERATIONS}
							noWidthChange
							width='150px'
						/>
					</div>
					<div>
						<div style={{ fontSize: 11 }}>Value</div>
						<DynamicValueInput
							dv={(config.compare as BlueprintDynamicValue) ?? { kind: 4, value: 0 }}
							onChange={(compare) => update({ compare })}
							options={NUMBER_KIND_OPTIONS}
						/>
					</div>
				</div>
			);
		case BLUEPRINT_NODE_KIND.MODIFY_CURRENCY:
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
					<div>
						<div style={{ fontSize: 11 }}>Currency</div>
						<Dropdown
							selectedID={typeof config.currencyID === 'object' ? ((config.currencyID as BlueprintDynamicValue).value as number) : 1}
							onChange={(id) => update({ currencyID: { kind: 8, value: id } })}
							options={getCurrencies()}
							noWidthChange
							width='150px'
						/>
					</div>
					<div>
						<div style={{ fontSize: 11 }}>Operation</div>
						<Dropdown
							selectedID={(config.operation as number) ?? 1}
							onChange={(operation) => update({ operation })}
							options={VARIABLE_OPERATIONS}
							noWidthChange
							width='150px'
						/>
					</div>
					<div>
						<div style={{ fontSize: 11 }}>Amount</div>
						<DynamicValueInput
							dv={(config.value as BlueprintDynamicValue) ?? { kind: 4, value: 1 }}
							onChange={(value) => update({ value })}
							options={NUMBER_KIND_OPTIONS}
						/>
					</div>
				</div>
			);
		case BLUEPRINT_NODE_KIND.MODIFY_INVENTORY:
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
					<div>
						<div style={{ fontSize: 11 }}>Item kind</div>
						<Dropdown
							selectedID={(config.itemKind as number) ?? 0}
							onChange={(itemKind) => update({ itemKind, itemID: { kind: 8, value: 1 } })}
							options={ITEM_KIND_OPTIONS}
							noWidthChange
							width='150px'
						/>
					</div>
					<div>
						<div style={{ fontSize: 11 }}>
							{(config.itemKind as number) === 1
								? 'Weapon'
								: (config.itemKind as number) === 2
									? 'Armor'
									: 'Item'}
						</div>
						<Dropdown
							selectedID={typeof config.itemID === 'object' ? ((config.itemID as BlueprintDynamicValue).value as number) : 1}
							onChange={(id) => update({ itemID: { kind: 8, value: id } })}
							options={
								(config.itemKind as number) === 1
									? getWeapons()
									: (config.itemKind as number) === 2
										? getArmors()
										: getItems()
							}
							noWidthChange
							width='150px'
						/>
					</div>
					<div>
						<div style={{ fontSize: 11 }}>Operation</div>
						<Dropdown
							selectedID={(config.operation as number) ?? 1}
							onChange={(operation) => update({ operation })}
							options={VARIABLE_OPERATIONS}
							noWidthChange
							width='150px'
						/>
					</div>
					<div>
						<div style={{ fontSize: 11 }}>Amount</div>
						<DynamicValueInput
							dv={(config.value as BlueprintDynamicValue) ?? { kind: 4, value: 1 }}
							onChange={(value) => update({ value })}
							options={NUMBER_KIND_OPTIONS}
						/>
					</div>
				</div>
			);
		case BLUEPRINT_NODE_KIND.PLAY_MUSIC:
		case BLUEPRINT_NODE_KIND.PLAY_SOUND:
			return (
				<div>
					<div style={{ fontSize: 11 }}>
						{node.kind === BLUEPRINT_NODE_KIND.PLAY_MUSIC ? 'Music' : 'Sound'}
					</div>
					<Dropdown
						selectedID={(config.songID as number) ?? 1}
						onChange={(songID) => update({ songID })}
						options={getSongs(node.kind === BLUEPRINT_NODE_KIND.PLAY_MUSIC ? SONG_KIND.MUSIC : SONG_KIND.SOUND)}
						noWidthChange
						width='150px'
					/>
				</div>
			);
		case BLUEPRINT_NODE_KIND.CALL_COMMON_REACTION:
			return (
				<div>
					<div style={{ fontSize: 11 }}>Common reaction</div>
					<Dropdown
						selectedID={(config.reactionID as number) ?? 1}
						onChange={(reactionID) => update({ reactionID })}
						options={getCommonReactions()}
						noWidthChange
						width='150px'
					/>
				</div>
			);
		case BLUEPRINT_NODE_KIND.COMMENT:
			return (
				<div>
					<InputText
						value={(config.text as string) ?? ''}
						onChange={(text) => update({ text })}
						widthType={2}
						style={{ maxWidth: '100%' }}
					/>
				</div>
			);
		case BLUEPRINT_NODE_KIND.SCRIPT:
			return (
				<div>
					<TextArea
						text={(config.script as string) ?? ''}
						onChange={(script) => update({ script })}
						height={80}
					/>
				</div>
			);
		default:
			return null;
	}
};

type Props = {
	node: BlueprintNode;
	selected: boolean;
	isTarget: boolean;
	onSelect: () => void;
	onChange: (node: BlueprintNode) => void;
	onStartDrag: (e: React.MouseEvent, node: BlueprintNode) => void;
	onStartWire: (e: React.MouseEvent, node: BlueprintNode, portKey: string) => void;
	onDropWire: (node: BlueprintNode) => void;
	onDelete: (node: BlueprintNode) => void;
};

function BlueprintNodeView({
	node,
	selected,
	isTarget,
	onSelect,
	onChange,
	onStartDrag,
	onStartWire,
	onDropWire,
	onDelete,
}: Props) {
	const info = getBlueprintNodeInfo(node.kind);
	return (
		<div
			className={selected ? 'blueprintNode selected' : isTarget ? 'blueprintNode target' : 'blueprintNode'}
			style={{
				position: 'absolute',
				left: node.x,
				top: node.y,
				width: BLUEPRINT_NODE_WIDTH,
				transform: 'translate(0, 0)',
			}}
			onMouseDown={(e) => {
				onSelect();
				onStartDrag(e, node);
			}}
			onMouseUp={(e) => {
				e.stopPropagation();
				onDropWire(node);
			}}
		>
			<div
				className='blueprintNodeHeader'
				style={{ background: info.color, color: node.kind === BLUEPRINT_NODE_KIND.COMMENT ? '#333' : '#111' }}
			>
				<span className='blueprintNodeTitle'>{info.label}</span>
				{node.kind !== BLUEPRINT_NODE_KIND.START && (
					<button
						className='blueprintNodeDelete'
						onMouseDown={(e) => e.stopPropagation()}
						onClick={(e) => {
							e.stopPropagation();
							onDelete(node);
						}}
					>
						×
					</button>
				)}
			</div>
			<div className='blueprintNodeBody'>
				<NodeContent node={node} onChange={onChange} />
			</div>
			{info.hasInput && (
				<div
					className='blueprintPort blueprintPortInput'
					style={{ top: BLUEPRINT_PORT_INPUT_Y }}
					onMouseUp={(e) => {
						e.stopPropagation();
						onDropWire(node);
					}}
				/>
			)}
			{info.outputs.map((port, index) => (
				<div
					key={port.key}
					className='blueprintPort blueprintPortOutput'
					style={{ top: BLUEPRINT_PORT_INPUT_Y + index * BLUEPRINT_PORT_SPACING, background: port.color }}
					title={port.label}
					onMouseDown={(e) => {
						e.stopPropagation();
						onSelect();
						onStartWire(e, node, port.key);
					}}
				>
					<span className='blueprintPortLabel'>{port.label}</span>
				</div>
			))}
		</div>
	);
}

export default BlueprintNodeView;
export { getOperationBase, getCompareBase, getItemKindBase, getVariables };

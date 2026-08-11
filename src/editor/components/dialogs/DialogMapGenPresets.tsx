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
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { INPUT_TYPE_WIDTH } from '../../common';
import { TOASTER_OPTIONS } from '../../common/ToasterUtils';
import { Node } from '../../core/Node';
import { Project } from '../../core/Project';
import { Model } from '../../Editor';
import useStateBool from '../../hooks/useStateBool';
import useStateNumber from '../../hooks/useStateNumber';
import useStateString from '../../hooks/useStateString';
import { Localization, MAP_GEN_TERRAIN_OPTIONS } from '../../models';
import { MapGenerator } from '../../systems/MapGenerator';
import { triggerTreeMap } from '../../store';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Dropdown from '../Dropdown';
import Flex from '../Flex';
import Form, { Label, Value } from '../Form';
import InputLocalization from '../InputLocalization';
import InputNumber from '../InputNumber';
import InputText from '../InputText';
import Tree, { TREES_MIN_WIDTH } from '../Tree';
import Dialog from './Dialog';
import FooterCancelSaveClose from './footers/FooterCancelSaveClose';

type Props = {
	setIsOpen: (b: boolean) => void;
};

function DialogMapGenPresets({ setIsOpen }: Props) {
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const [presets, setPresets] = useState<Node[]>([]);
	const [selectedPreset, setSelectedPreset] = useState<Model.MapGenPreset | null>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [mapName, setMapName] = useStateString();

	const [width, setWidth] = useStateNumber();
	const [length, setLength] = useStateNumber();
	const [height, setHeight] = useStateNumber();
	const [depth, setDepth] = useStateNumber();
	const [seed, setSeed] = useStateNumber();
	const [terrain, setTerrain] = useStateNumber();
	const [density, setDensity] = useStateNumber();
	const [floorAutotileID, setFloorAutotileID] = useStateNumber();
	const [wallAutotileID, setWallAutotileID] = useStateNumber();
	const [tilesetID, setTilesetID] = useStateNumber();
	const [generateRooms, setGenerateRooms] = useStateBool();
	const [randomBattlesEnabled, setRandomBattlesEnabled] = useStateBool();
	const [description, setDescription] = useState<Localization>(Localization.create(-1, ''));

	const isPresetDisabled = useMemo(() => selectedPreset === null || selectedPreset.id === -1, [selectedPreset]);

	const update = () => {
		if (selectedPreset) {
			setWidth(selectedPreset.width);
			setLength(selectedPreset.length);
			setHeight(selectedPreset.height);
			setDepth(selectedPreset.depth);
			setSeed(selectedPreset.seed);
			setTerrain(selectedPreset.terrain);
			setDensity(selectedPreset.density);
			setFloorAutotileID(selectedPreset.floorAutotileID);
			setWallAutotileID(selectedPreset.wallAutotileID);
			setTilesetID(selectedPreset.tilesetID);
			setGenerateRooms(selectedPreset.generateRooms);
			setRandomBattlesEnabled(selectedPreset.randomBattlesEnabled);
			setDescription(selectedPreset.description);
		}
	};

	useLayoutEffect(() => {
		setPresets(Node.createList(Project.current!.mapGenPresets.list, false));
	}, []);

	useLayoutEffect(() => {
		update();
	}, [selectedPreset]);

	const handleSelectPreset = (node: Node | null) => {
		setSelectedPreset((node?.content as Model.MapGenPreset) ?? null);
	};

	const handleListUpdated = () => {
		Project.current!.mapGenPresets.list = Node.createListFromNodes(presets);
	};

	const handleChangeNumber = (key: keyof Model.MapGenPreset, setter: (n: number) => void) => (n: number) => {
		if (selectedPreset) {
			(selectedPreset[key] as number) = n;
		}
		setter(n);
	};

	const handleChangeBool = (key: keyof Model.MapGenPreset, setter: (b: boolean) => void) => (b: boolean) => {
		if (selectedPreset) {
			(selectedPreset[key] as boolean) = b;
		}
		setter(b);
	};

	const handleSave = async () => {
		await Project.current!.mapGenPresets.save();
	};

	const handleAccept = async () => {
		await handleSave();
		setIsOpen(false);
	};

	const handleReject = async () => {
		await Project.current!.mapGenPresets.load();
		setIsOpen(false);
	};

	const handleGenerate = async () => {
		if (!selectedPreset || isPresetDisabled) {
			return;
		}
		setIsGenerating(true);
		try {
			const map = await MapGenerator.generate(selectedPreset, mapName);
			if (map) {
				dispatch(triggerTreeMap());
				toast.success(t('map.generated.success', { name: map.name }), TOASTER_OPTIONS);
			} else {
				toast.warn(t('map.generated.failure'), TOASTER_OPTIONS);
			}
		} catch (error) {
			console.error(error);
			toast.error(t('map.generated.failure'), TOASTER_OPTIONS);
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<Dialog
			title={`${t('map.gen.presets')}...`}
			isOpen
			footer={<FooterCancelSaveClose onCancel={handleReject} onSave={handleSave} onSaveAndClose={handleAccept} />}
			onClose={handleReject}
			initialWidth='900px'
		>
			<Flex columnMobile spacedLarge fillWidth fillHeight>
				<Flex one column>
					<Tree
						constructorType={Model.MapGenPreset}
						list={presets}
						minWidth={TREES_MIN_WIDTH}
						onSelectedItem={handleSelectPreset}
						onListUpdated={handleListUpdated}
						scrollable
						showEditName
						isLocalization
						applyDefault
						doNotOpenDialog
					/>
				</Flex>
				<Flex two column spacedLarge fillHeight>
					<Form verticalMobile>
						<Label disabled={isPresetDisabled}>{t('width')}</Label>
						<Value>
							<InputNumber value={width} onChange={handleChangeNumber('width', setWidth)} min={2} disabled={isPresetDisabled} />
						</Value>
						<Label disabled={isPresetDisabled}>{t('length')}</Label>
						<Value>
							<InputNumber value={length} onChange={handleChangeNumber('length', setLength)} min={2} disabled={isPresetDisabled} />
						</Value>
						<Label disabled={isPresetDisabled}>{t('height')}</Label>
						<Value>
							<InputNumber value={height} onChange={handleChangeNumber('height', setHeight)} min={1} disabled={isPresetDisabled} />
						</Value>
						<Label disabled={isPresetDisabled}>{t('depth')}</Label>
						<Value>
							<InputNumber value={depth} onChange={handleChangeNumber('depth', setDepth)} min={0} disabled={isPresetDisabled} />
						</Value>
						<Label disabled={isPresetDisabled}>{t('seed')}</Label>
						<Value>
							<InputNumber value={seed} onChange={handleChangeNumber('seed', setSeed)} disabled={isPresetDisabled} />
						</Value>
						<Label disabled={isPresetDisabled}>{t('terrain')}</Label>
						<Value>
							<Dropdown
								selectedID={terrain}
								onChange={handleChangeNumber('terrain', setTerrain)}
								options={MAP_GEN_TERRAIN_OPTIONS}
								disabled={isPresetDisabled}
								translateOptions
							/>
						</Value>
						<Label disabled={isPresetDisabled}>{t('density')}</Label>
						<Value>
							<InputNumber
								value={density}
								onChange={handleChangeNumber('density', setDensity)}
								decimals
								min={0}
								max={1}
								disabled={isPresetDisabled}
							/>
						</Value>
						<Label disabled={isPresetDisabled}>{t('floor.autotile')}</Label>
						<Value>
							<Dropdown
								selectedID={floorAutotileID}
								onChange={handleChangeNumber('floorAutotileID', setFloorAutotileID)}
								options={Project.current!.specialElements.autotiles}
								disabled={isPresetDisabled}
								displayIDs
							/>
						</Value>
						<Label disabled={isPresetDisabled}>{t('wall.autotile')}</Label>
						<Value>
							<Dropdown
								selectedID={wallAutotileID}
								onChange={handleChangeNumber('wallAutotileID', setWallAutotileID)}
								options={Project.current!.specialElements.autotiles}
								disabled={isPresetDisabled}
								displayIDs
							/>
						</Value>
						<Label disabled={isPresetDisabled}>{t('tileset')}</Label>
						<Value>
							<Dropdown
								selectedID={tilesetID}
								onChange={handleChangeNumber('tilesetID', setTilesetID)}
								options={Project.current!.tilesets.list}
								disabled={isPresetDisabled}
								displayIDs
							/>
						</Value>
						<Label disabled={isPresetDisabled}>{t('description')}</Label>
						<Value>
							<InputLocalization
								localization={description}
								disabled={isPresetDisabled}
								widthType={INPUT_TYPE_WIDTH.FILL}
							/>
						</Value>
						<Value>
							<Flex column spaced>
								<Checkbox isChecked={generateRooms} onChange={handleChangeBool('generateRooms', setGenerateRooms)} disabled={isPresetDisabled}>
									{t('generate.rooms')}
								</Checkbox>
								<Checkbox
									isChecked={randomBattlesEnabled}
									onChange={handleChangeBool('randomBattlesEnabled', setRandomBattlesEnabled)}
									disabled={isPresetDisabled}
								>
									{t('random.battles')}
								</Checkbox>
							</Flex>
						</Value>
					</Form>
					<Form verticalMobile>
						<Label>{t('map.name')}</Label>
						<Value>
							<InputText value={mapName} onChange={setMapName} widthType={INPUT_TYPE_WIDTH.FILL} />
						</Value>
						<Value>
							<Button
								disabled={isPresetDisabled || isGenerating}
								onClick={() => void handleGenerate()}
							>
								{isGenerating ? t('generating') : t('generate.map')}
							</Button>
						</Value>
					</Form>
				</Flex>
			</Flex>
		</Dialog>
	);
}

export default DialogMapGenPresets;

/*
    Andromeda RPG Paper Maker (fork)
    Blueprint visual node editor: dialog managing the blueprint of a selected
    common reaction. The blueprint is stored in a sidecar JSON file next to the
    project and can be compiled/exported into the reaction commands.
*/

import { useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BUTTON_TYPE, Paths } from '../../common';
import { checkFileExists, createFile, createFolder, readFile } from '../../common/Platform';
import { BlueprintDocument, createEmptyBlueprint } from '../../core/Blueprint';
import { compileBlueprint } from '../../core/BlueprintCompiler';
import { Project } from '../../core/Project';
import { Model } from '../../Editor';
import BlueprintCanvas from '../BlueprintCanvas';
import Button from '../Button';
import Dropdown from '../Dropdown';
import Flex from '../Flex';
import Dialog from './Dialog';
import FooterOK from './footers/FooterOK';

type Props = {
	setIsOpen: (b: boolean) => void;
};

function DialogBlueprint({ setIsOpen }: Props) {
	const { t } = useTranslation();

	const [reactions, setReactions] = useState<Model.CommonReaction[]>([]);
	const [selectedID, setSelectedID] = useState(-1);
	const [document, setDocument] = useState<BlueprintDocument | null>(null);
	const [warnings, setWarnings] = useState<string[]>([]);
	const [status, setStatus] = useState('');

	const reactionOptions = useMemo(
		() => reactions.map((reaction) => Model.Base.create(reaction.id, String(reaction.toString()))),
		[reactions],
	);

	const getBlueprintPath = (id: number): string =>
		Paths.join(Project.current!.location, 'Blueprint', `${id}.json`);

	const loadBlueprint = async (id: number) => {
		const content = await readFile(getBlueprintPath(id));
		if (content) {
			try {
				setDocument(JSON.parse(content) as BlueprintDocument);
				return;
			} catch {
				// fall back to an empty blueprint
			}
		}
		setDocument(createEmptyBlueprint());
	};

	const initialize = async () => {
		if (!Project.current) {
			return;
		}
		const list = Project.current.commonEvents.commonReactions;
		setReactions(list);
		if (list.length > 0) {
			const first = list[0].id;
			setSelectedID(first);
			await loadBlueprint(first);
		} else {
			setDocument(createEmptyBlueprint());
		}
	};

	const handleClose = async () => {
		setIsOpen(false);
	};

	const handleSelectReaction = async (id: number) => {
		setSelectedID(id);
		setWarnings([]);
		setStatus('');
		await loadBlueprint(id);
	};

	const handleSave = async () => {
		if (!document || !Project.current) {
			return;
		}
		const folder = Paths.join(Project.current.location, 'Blueprint');
		if (!(await checkFileExists(folder))) {
			await createFolder(folder);
		}
		await createFile(getBlueprintPath(selectedID), JSON.stringify(document, null, 2));
		setStatus('Blueprint saved.');
	};

	const handleExport = async () => {
		if (!document || !Project.current) {
			return;
		}
		const reaction = Project.current.commonEvents.commonReactions.find((r) => r.id === selectedID);
		if (!reaction) {
			return;
		}
		const result = compileBlueprint(document);
		reaction.commands = result.commands;
		setWarnings(result.warnings);
		setStatus(
			result.warnings.length > 0
				? 'Exported to commands with warnings.'
				: 'Exported to commands. Remember to save your project.',
		);
	};

	useLayoutEffect(() => {
		initialize().catch(console.error);
	}, []);

	return (
		<Dialog
			isOpen
			title={`${t('blueprint.editor')}`}
			footer={<FooterOK onOK={handleClose} />}
			onClose={handleClose}
			initialWidth='950px'
			initialHeight='620px'
		>
			<Flex column spaced fillWidth fillHeight>
				<div className='blueprintToolbar'>
					<span>{t('common.reactions')}:</span>
					<Dropdown
						selectedID={selectedID}
						onChange={(id) => handleSelectReaction(id).catch(console.error)}
						options={reactionOptions}
						noWidthChange
						width='220px'
					/>
					<Button buttonType={BUTTON_TYPE.PRIMARY} onClick={handleSave}>
						Save Blueprint
					</Button>
					<Button onClick={handleExport}>Export to Commands</Button>
				</div>
				{warnings.length > 0 && <div className='blueprintWarnings'>{warnings.join(' ')}</div>}
				{document ? <BlueprintCanvas document={document} onChange={setDocument} /> : null}
				{status && <div className='blueprintStatus'>{status}</div>}
			</Flex>
		</Dialog>
	);
}

export default DialogBlueprint;

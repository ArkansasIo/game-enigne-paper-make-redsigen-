/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano
*/

import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { BUTTON_TYPE, Constants, Paths } from '../../common';
import { createFile, getFiles, getFolders, readFile } from '../../common/Platform';
import { Project } from '../../core/Project';
import Button from '../Button';
import Flex from '../Flex';
import Dialog from './Dialog';

type Props = {
	setIsOpen: (open: boolean) => void;
};

type SourceFile = {
	name: string;
	path: string;
	root: 'project' | 'engine';
};

const TEXT_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.html', '.md', '.txt', '.glsl']);

const isTextFile = (name: string): boolean => {
	const dot = name.lastIndexOf('.');
	return dot >= 0 && TEXT_EXTENSIONS.has(name.slice(dot).toLowerCase());
};

async function collectFiles(path: string, root: SourceFile['root'], prefix = ''): Promise<SourceFile[]> {
	const files: SourceFile[] = [];
	for (const name of await getFiles(path)) {
		if (isTextFile(name)) files.push({ name: prefix + name, path: Paths.join(path, name), root });
	}
	for (const folder of await getFolders(path)) {
		files.push(...(await collectFiles(Paths.join(path, folder), root, `${prefix + folder}/`)));
	}
	return files;
}

function DialogSourceEditor({ setIsOpen }: Props) {
	const [tab, setTab] = useState<SourceFile['root']>('project');
	const [files, setFiles] = useState<SourceFile[]>([]);
	const [selected, setSelected] = useState<SourceFile | null>(null);
	const [content, setContent] = useState('');
	const [isDirty, setIsDirty] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');

	const loadFiles = async () => {
		if (!Project.current) return;
		const rootPath = tab === 'project' ? Project.current.getPath() : Paths.join(Paths.DIST, 'Scripts');
		const next = await collectFiles(rootPath, tab);
		setFiles(next);
		if (selected && next.some((file) => file.path === selected.path)) return;
		setSelected(null);
		setContent('');
		setIsDirty(false);
	};

	useEffect(() => {
		void loadFiles();
	}, [tab]);

	const openFile = async (file: SourceFile) => {
		setIsLoading(true);
		const next = await readFile(file.path);
		setSelected(file);
		setContent(next ?? '');
		setIsDirty(false);
		setMessage(next === null ? 'Could not read this file.' : '');
		setIsLoading(false);
	};

	const saveFile = async () => {
		if (!selected || !isDirty) return;
		await createFile(selected.path, content);
		setIsDirty(false);
		setMessage('Saved.');
	};

	const close = () => {
		if (isDirty && !window.confirm('Discard unsaved source changes?')) return;
		setIsOpen(false);
	};

	return (
		<Dialog
			title='Source Code Editor'
			isOpen
			initialWidth='1100px'
			initialHeight='760px'
			isLoading={isLoading}
			onClose={close}
			footer={
				<Flex spaced rightH>
					<div className='textSmallDetail'>{message || (selected ? selected.path : 'Select a text file')}</div>
					<Button buttonType={BUTTON_TYPE.PRIMARY} onClick={() => void saveFile()} disabled={!selected || !isDirty}>
						Save
					</Button>
					<Button onClick={close}>Close</Button>
				</Flex>
			}
		>
			<Flex one style={{ minHeight: 0, gap: 8 }}>
				<Flex column style={{ width: 290, minWidth: 220, minHeight: 0, borderRight: '1px solid #444' }}>
					<Flex spaced>
						<Button active={tab === 'project'} onClick={() => setTab('project')}>
							Game Files
						</Button>
						<Button active={tab === 'engine'} onClick={() => setTab('engine')} disabled={!Constants.IS_DESKTOP}>
							Engine Files
						</Button>
					</Flex>
					<div style={{ overflow: 'auto', flex: 1, marginTop: 8 }}>
						{files.map((file) => (
							<Button
								key={file.path}
								active={selected?.path === file.path}
								onClick={() => void openFile(file)}
							>
								{file.name}
							</Button>
						))}
					</div>
				</Flex>
				<Flex one column style={{ minWidth: 0, minHeight: 0 }}>
					{selected ? (
						<CodeMirror
							value={content}
							height='100%'
							theme={vscodeDark}
							extensions={[javascript({ jsx: true, typescript: true })]}
							onChange={(value) => {
								setContent(value);
								setIsDirty(true);
							}}
						/>
					) : (
						<div className='textSmallDetail' style={{ padding: 24 }}>
							Choose a game or engine source file.
						</div>
					)}
				</Flex>
			</Flex>
		</Dialog>
	);
}

export default DialogSourceEditor;

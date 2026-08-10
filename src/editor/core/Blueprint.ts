/*
    Andromeda RPG Paper Maker (fork)
    Blueprint visual node editor: data model.

    A blueprint is a directed graph of nodes. Each node carries a kind
    (statement to compile) plus a small config object. Flow connections are
    stored as node ids:
      - nextId      : continuation after this node / after a whole block
      - trueNextId  : (IF) first node of the true branch
      - falseNextId : (IF) first node of the false branch
      - bodyNextId  : (WHILE) first node inside the loop body

    The compiler (BlueprintCompiler.ts) turns this graph into a command tree
    (Node[] of MapObjectCommand) which is then exported into the reaction.
*/

export enum BLUEPRINT_NODE_KIND {
	START,
	SHOW_TEXT,
	CHANGE_VARIABLE,
	WAIT,
	IF,
	WHILE,
	MODIFY_CURRENCY,
	MODIFY_INVENTORY,
	PLAY_MUSIC,
	PLAY_SOUND,
	STOP_MUSIC,
	CALL_COMMON_REACTION,
	COMMENT,
	SCRIPT,
	GAME_OVER,
	STOP_REACTION,
}

export type BlueprintDynamicValue = { kind: number; value: number | string | boolean };

export type BlueprintNode = {
	id: number;
	kind: BLUEPRINT_NODE_KIND;
	x: number;
	y: number;
	nextId: number | null;
	trueNextId: number | null;
	falseNextId: number | null;
	bodyNextId: number | null;
	config: { [key: string]: unknown };
};

export type BlueprintDocument = {
	version: number;
	nodes: BlueprintNode[];
};

export const BLUEPRINT_VERSION = 1;

export type BlueprintPort = {
	key: 'nextId' | 'trueNextId' | 'falseNextId' | 'bodyNextId';
	label: string;
	color: string;
};

export type BlueprintNodeInfo = {
	kind: BLUEPRINT_NODE_KIND;
	label: string;
	color: string;
	outputs: BlueprintPort[];
	hasInput: boolean;
};

const OUTPUT_NEXT: BlueprintPort = { key: 'nextId', label: 'next', color: '#8ab4f8' };
const OUTPUT_TRUE: BlueprintPort = { key: 'trueNextId', label: 'true', color: '#34d399' };
const OUTPUT_FALSE: BlueprintPort = { key: 'falseNextId', label: 'false', color: '#f87171' };
const OUTPUT_BODY: BlueprintPort = { key: 'bodyNextId', label: 'loop', color: '#fbbf24' };

export const BLUEPRINT_NODE_INFOS: BlueprintNodeInfo[] = [
	{ kind: BLUEPRINT_NODE_KIND.START, label: 'Start', color: '#4caf50', outputs: [OUTPUT_NEXT], hasInput: false },
	{
		kind: BLUEPRINT_NODE_KIND.SHOW_TEXT,
		label: 'Show Text',
		color: '#569ae8',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.CHANGE_VARIABLE,
		label: 'Change Variable',
		color: '#ffa538',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{ kind: BLUEPRINT_NODE_KIND.WAIT, label: 'Wait', color: '#569ae8', outputs: [OUTPUT_NEXT], hasInput: true },
	{
		kind: BLUEPRINT_NODE_KIND.IF,
		label: 'If',
		color: '#e8dd48',
		outputs: [OUTPUT_TRUE, OUTPUT_FALSE, OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.WHILE,
		label: 'While',
		color: '#e8dd48',
		outputs: [OUTPUT_BODY, OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.MODIFY_CURRENCY,
		label: 'Modify Currency',
		color: '#ffa538',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.MODIFY_INVENTORY,
		label: 'Modify Inventory',
		color: '#ffa538',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.PLAY_MUSIC,
		label: 'Play Music',
		color: '#dd9eff',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.PLAY_SOUND,
		label: 'Play Sound',
		color: '#dd9eff',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.STOP_MUSIC,
		label: 'Stop Music',
		color: '#dd9eff',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.CALL_COMMON_REACTION,
		label: 'Call Common Reaction',
		color: '#35c452',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.COMMENT,
		label: 'Comment',
		color: '#ffffff',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.SCRIPT,
		label: 'Script',
		color: '#e8dd48',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.GAME_OVER,
		label: 'Game Over',
		color: '#f87171',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
	{
		kind: BLUEPRINT_NODE_KIND.STOP_REACTION,
		label: 'Stop Reaction',
		color: '#f87171',
		outputs: [OUTPUT_NEXT],
		hasInput: true,
	},
];

export const getBlueprintNodeInfo = (kind: BLUEPRINT_NODE_KIND): BlueprintNodeInfo => BLUEPRINT_NODE_INFOS[kind];

export const getDefaultBlueprintConfig = (kind: BLUEPRINT_NODE_KIND): { [key: string]: unknown } => {
	switch (kind) {
		case BLUEPRINT_NODE_KIND.SHOW_TEXT:
			return { interlocutor: { kind: 9, value: '' }, facesetID: -1, facesetX: 0, facesetY: 0, texts: {} };
		case BLUEPRINT_NODE_KIND.CHANGE_VARIABLE:
			return { variableID: 1, operation: 0, value: { kind: 4, value: 0 } };
		case BLUEPRINT_NODE_KIND.WAIT:
			return { time: { kind: 13, value: 0 } };
		case BLUEPRINT_NODE_KIND.IF:
		case BLUEPRINT_NODE_KIND.WHILE:
			return { dv: { kind: 5, value: 1 }, operation: 5, compare: { kind: 4, value: 0 } };
		case BLUEPRINT_NODE_KIND.MODIFY_CURRENCY:
			return { currencyID: { kind: 8, value: 1 }, operation: 1, value: { kind: 4, value: 1 } };
		case BLUEPRINT_NODE_KIND.MODIFY_INVENTORY:
			return { itemKind: 0, itemID: { kind: 8, value: 1 }, operation: 1, value: { kind: 4, value: 1 } };
		case BLUEPRINT_NODE_KIND.PLAY_MUSIC:
		case BLUEPRINT_NODE_KIND.PLAY_SOUND:
			return { songID: 1 };
		case BLUEPRINT_NODE_KIND.CALL_COMMON_REACTION:
			return { reactionID: 1 };
		case BLUEPRINT_NODE_KIND.COMMENT:
			return { text: '' };
		case BLUEPRINT_NODE_KIND.SCRIPT:
			return { script: '' };
		default:
			return {};
	}
};

export const createBlueprintNode = (
	kind: BLUEPRINT_NODE_KIND,
	x: number,
	y: number,
	existingIDs: number[] = [],
): BlueprintNode => {
	let id = 1;
	while (existingIDs.includes(id)) {
		id++;
	}
	return {
		id,
		kind,
		x,
		y,
		nextId: null,
		trueNextId: null,
		falseNextId: null,
		bodyNextId: null,
		config: getDefaultBlueprintConfig(kind),
	};
};

export const createEmptyBlueprint = (): BlueprintDocument => ({
	version: BLUEPRINT_VERSION,
	nodes: [createBlueprintNode(BLUEPRINT_NODE_KIND.START, 40, 120, [])],
});

export const isBlueprintNodeKindSimple = (kind: BLUEPRINT_NODE_KIND): boolean =>
	![
		BLUEPRINT_NODE_KIND.IF,
		BLUEPRINT_NODE_KIND.WHILE,
		BLUEPRINT_NODE_KIND.CALL_COMMON_REACTION,
		BLUEPRINT_NODE_KIND.SHOW_TEXT,
	].includes(kind);

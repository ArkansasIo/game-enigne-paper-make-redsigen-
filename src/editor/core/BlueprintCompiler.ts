/*
    Andromeda RPG Paper Maker (fork)
    Blueprint visual node editor: graph -> command tree compiler.

    The compiler walks the blueprint graph following the flow connections and
    emits a canonical command tree (Node[] of MapObjectCommand). Blocks such as
    IF / WHILE are emitted with their body as children, matching the format
    read by both the editor tree and the game engine (Reaction.readChildrenJSON).
*/

import { EVENT_COMMAND_KIND } from '../common';
import { Model } from '../Editor';
import { MapObjectCommandType } from '../models';
import { BlueprintDocument, BlueprintNode, BLUEPRINT_NODE_KIND, BlueprintDynamicValue } from './Blueprint';
import { Node } from './Node';
import { Project } from './Project';

export type BlueprintCompileResult = {
	commands: Node[];
	warnings: string[];
};

const MAX_CHAIN_DEPTH = 5000;

const dynamicValueToCommand = (
	dv: BlueprintDynamicValue | undefined,
	fallback: BlueprintDynamicValue,
): MapObjectCommandType[] => {
	const spec = dv ?? fallback;
	return [spec.kind, spec.value as MapObjectCommandType];
};

const createCommandNode = (kind: EVENT_COMMAND_KIND, command: MapObjectCommandType[] = []): Node =>
	Node.create(Model.MapObjectCommand.createCommand(kind, command));

export const compileBlueprint = (blueprint: BlueprintDocument): BlueprintCompileResult => {
	const warnings: string[] = [];
	const nodes = new Map<number, BlueprintNode>();
	for (const node of blueprint.nodes) {
		nodes.set(node.id, node);
	}

	const start = blueprint.nodes.find((node) => node.kind === BLUEPRINT_NODE_KIND.START);
	if (!start) {
		return { commands: [], warnings: ['No Start node found in the blueprint.'] };
	}

	const result: Node[] = [];
	let depth = 0;

	const buildChain = (startId: number | null, output: Node[]): void => {
		let currentId = startId;
		while (currentId !== null && currentId !== undefined) {
			if (depth > MAX_CHAIN_DEPTH) {
				warnings.push('Blueprint is too deep; compilation stopped.');
				return;
			}
			const node = nodes.get(currentId);
			if (!node) {
				warnings.push('A connection points to a missing node.');
				break;
			}
			depth++;
			if (node.kind === BLUEPRINT_NODE_KIND.IF) {
				const ifCommand = createCommandNode(EVENT_COMMAND_KIND.IF, [
					1,
					0,
					...dynamicValueToCommand(node.config.dv as BlueprintDynamicValue, { kind: 5, value: 1 }),
					(node.config.operation as number) ?? 5,
					...dynamicValueToCommand(node.config.compare as BlueprintDynamicValue, { kind: 4, value: 0 }),
				]);
				const children: Node[] = [];
				if (node.trueNextId) {
					buildChain(node.trueNextId, children);
				}
				if (node.falseNextId) {
					children.push(createCommandNode(EVENT_COMMAND_KIND.ELSE));
					buildChain(node.falseNextId, children);
				}
				children.push(createCommandNode(EVENT_COMMAND_KIND.END_IF));
				ifCommand.children = children;
				ifCommand.updateParents();
				output.push(ifCommand);
			} else if (node.kind === BLUEPRINT_NODE_KIND.WHILE) {
				const whileCommand = createCommandNode(EVENT_COMMAND_KIND.WHILE, [
					0,
					0,
					...dynamicValueToCommand(node.config.dv as BlueprintDynamicValue, { kind: 5, value: 1 }),
					(node.config.operation as number) ?? 5,
					...dynamicValueToCommand(node.config.compare as BlueprintDynamicValue, { kind: 4, value: 0 }),
				]);
				const children: Node[] = [];
				if (node.bodyNextId) {
					buildChain(node.bodyNextId, children);
				}
				children.push(createCommandNode(EVENT_COMMAND_KIND.END_WHILE));
				whileCommand.children = children;
				whileCommand.updateParents();
				output.push(whileCommand);
			} else {
				const kind = getCommandKind(node);
				if (kind !== EVENT_COMMAND_KIND.NONE) {
					output.push(createCommandNode(kind, getCommandArray(node)));
				}
			}
			currentId = node.nextId;
		}
	};

	buildChain(start.nextId, result);
	return { commands: result, warnings };
};

const getCommandKind = (node: BlueprintNode): EVENT_COMMAND_KIND => {
	switch (node.kind) {
		case BLUEPRINT_NODE_KIND.SHOW_TEXT:
			return EVENT_COMMAND_KIND.SHOW_TEXT;
		case BLUEPRINT_NODE_KIND.CHANGE_VARIABLE:
			return EVENT_COMMAND_KIND.CHANGE_VARIABLES;
		case BLUEPRINT_NODE_KIND.WAIT:
			return EVENT_COMMAND_KIND.WAIT;
		case BLUEPRINT_NODE_KIND.MODIFY_CURRENCY:
			return EVENT_COMMAND_KIND.MODIFY_CURRENCY;
		case BLUEPRINT_NODE_KIND.MODIFY_INVENTORY:
			return EVENT_COMMAND_KIND.MODIFY_INVENTORY;
		case BLUEPRINT_NODE_KIND.PLAY_MUSIC:
			return EVENT_COMMAND_KIND.PLAY_MUSIC;
		case BLUEPRINT_NODE_KIND.PLAY_SOUND:
			return EVENT_COMMAND_KIND.PLAY_SOUND;
		case BLUEPRINT_NODE_KIND.STOP_MUSIC:
			return EVENT_COMMAND_KIND.STOP_MUSIC;
		case BLUEPRINT_NODE_KIND.CALL_COMMON_REACTION:
			return EVENT_COMMAND_KIND.CALL_A_COMMON_REACTION;
		case BLUEPRINT_NODE_KIND.COMMENT:
			return EVENT_COMMAND_KIND.COMMENT;
		case BLUEPRINT_NODE_KIND.SCRIPT:
			return EVENT_COMMAND_KIND.SCRIPT;
		case BLUEPRINT_NODE_KIND.GAME_OVER:
			return EVENT_COMMAND_KIND.GAME_OVER;
		case BLUEPRINT_NODE_KIND.STOP_REACTION:
			return EVENT_COMMAND_KIND.STOP_REACTION;
		default:
			return EVENT_COMMAND_KIND.NONE;
	}
};

const getCommandArray = (node: BlueprintNode): MapObjectCommandType[] => {
	switch (node.kind) {
		case BLUEPRINT_NODE_KIND.SHOW_TEXT: {
			const array: MapObjectCommandType[] = [
				...dynamicValueToCommand(node.config.interlocutor as BlueprintDynamicValue, { kind: 9, value: '' }),
				(node.config.facesetID as number) ?? -1,
				(node.config.facesetX as number) ?? 0,
				(node.config.facesetY as number) ?? 0,
			];
			const texts = (node.config.texts as { [key: number]: string }) ?? {};
			const languages = Project.current?.languages.list ?? [];
			for (const language of languages) {
				array.push(language.id);
				array.push(texts[language.id] ?? '');
			}
			return array;
		}
		case BLUEPRINT_NODE_KIND.CHANGE_VARIABLE:
			return [
				0,
				(node.config.variableID as number) ?? 1,
				(node.config.operation as number) ?? 0,
				0,
				...dynamicValueToCommand(node.config.value as BlueprintDynamicValue, { kind: 4, value: 0 }),
			];
		case BLUEPRINT_NODE_KIND.WAIT:
			return dynamicValueToCommand(node.config.time as BlueprintDynamicValue, { kind: 13, value: 0 });
		case BLUEPRINT_NODE_KIND.MODIFY_CURRENCY:
			return [
				...dynamicValueToCommand(node.config.currencyID as BlueprintDynamicValue, { kind: 8, value: 1 }),
				(node.config.operation as number) ?? 1,
				...dynamicValueToCommand(node.config.value as BlueprintDynamicValue, { kind: 4, value: 1 }),
			];
		case BLUEPRINT_NODE_KIND.MODIFY_INVENTORY:
			return [
				(node.config.itemKind as number) ?? 0,
				...dynamicValueToCommand(node.config.itemID as BlueprintDynamicValue, { kind: 8, value: 1 }),
				(node.config.operation as number) ?? 1,
				...dynamicValueToCommand(node.config.value as BlueprintDynamicValue, { kind: 4, value: 1 }),
			];
		case BLUEPRINT_NODE_KIND.PLAY_MUSIC:
		case BLUEPRINT_NODE_KIND.PLAY_SOUND: {
			const songID = (node.config.songID as number) ?? 1;
			return [0, 8, songID, songID, 13, 100, 0, 4, 0, 0, 4, 0];
		}
		case BLUEPRINT_NODE_KIND.CALL_COMMON_REACTION:
			return [(node.config.reactionID as number) ?? 1];
		case BLUEPRINT_NODE_KIND.COMMENT:
			return [(node.config.text as string) ?? ''];
		case BLUEPRINT_NODE_KIND.SCRIPT:
			return [0, (node.config.script as string) ?? ''];
		default:
			return [];
	}
};

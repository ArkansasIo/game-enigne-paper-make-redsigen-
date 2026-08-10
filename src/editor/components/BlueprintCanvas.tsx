/*
    Andromeda RPG Paper Maker (fork)
    Blueprint visual node editor: canvas with pan/zoom, node drag,
    wire connections and a node palette.
*/

import { useEffect, useRef, useState } from 'react';
import { BlueprintDocument, BlueprintNode, BLUEPRINT_NODE_KIND, createBlueprintNode, getBlueprintNodeInfo } from '../core/Blueprint';
import BlueprintNodeView, {
	BLUEPRINT_NODE_WIDTH,
	BLUEPRINT_PORT_INPUT_Y,
	BLUEPRINT_PORT_SPACING,
} from './BlueprintNodeView';
import '../styles/Blueprint.css';

const PORT_RADIUS = 6;
const PORT_HIT_RADIUS = 14;
const MIN_SCALE = 0.25;
const MAX_SCALE = 2;

type WireState = {
	sourceId: number;
	portKey: string;
};

type Props = {
	document: BlueprintDocument;
	onChange: (document: BlueprintDocument) => void;
};

function BlueprintCanvas({ document, onChange }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const docRef = useRef(document);
	docRef.current = document;

	const [view, setView] = useState({ x: 0, y: 0, scale: 1 });
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [targetId, setTargetId] = useState<number | null>(null);
	const [wire, setWire] = useState<WireState | null>(null);
	const [wirePos, setWirePos] = useState<{ x: number; y: number } | null>(null);
	const [drag, setDrag] = useState<{ id: number; dx: number; dy: number } | null>(null);
	const [pan, setPan] = useState<{ startX: number; startY: number; viewX: number; viewY: number } | null>(null);

	const toWorld = (clientX: number, clientY: number): { x: number; y: number } => {
		const rect = containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
		const px = clientX - rect.left;
		const py = clientY - rect.top;
		return { x: (px - view.x) / view.scale, y: (py - view.y) / view.scale };
	};

	const getInputCenter = (node: BlueprintNode): { x: number; y: number } => ({
		x: node.x,
		y: node.y + BLUEPRINT_PORT_INPUT_Y + PORT_RADIUS,
	});

	const getOutputCenter = (node: BlueprintNode, index: number): { x: number; y: number } => ({
		x: node.x + BLUEPRINT_NODE_WIDTH + PORT_RADIUS,
		y: node.y + BLUEPRINT_PORT_INPUT_Y + index * BLUEPRINT_PORT_SPACING + PORT_RADIUS,
	});

	const hitTestInput = (point: { x: number; y: number }): number | null => {
		let best: number | null = null;
		let bestDistance = Number.POSITIVE_INFINITY;
		for (const node of docRef.current.nodes) {
			if (!getBlueprintNodeInfo(node.kind).hasInput) {
				continue;
			}
			const center = getInputCenter(node);
			const distance = Math.hypot(center.x - point.x, center.y - point.y);
			if (distance <= PORT_HIT_RADIUS && distance < bestDistance) {
				best = node.id;
				bestDistance = distance;
			}
		}
		return best;
	};

	const connect = (sourceId: number, portKey: string, destinationId: number) => {
		if (sourceId === destinationId) {
			return;
		}
		const nodes = docRef.current.nodes.map((node) =>
			node.id === sourceId ? ({ ...node, [portKey]: destinationId } as BlueprintNode) : node,
		);
		onChange({ ...docRef.current, nodes });
	};

	useEffect(() => {
		if (!wire) {
			return;
		}
		const onMove = (e: MouseEvent) => {
			const wp = toWorld(e.clientX, e.clientY);
			setWirePos(wp);
			setTargetId(hitTestInput(wp));
		};
		const onUp = (e: MouseEvent) => {
			const wp = toWorld(e.clientX, e.clientY);
			const destinationId = hitTestInput(wp);
			if (destinationId !== null) {
				connect(wire.sourceId, wire.portKey, destinationId);
			}
			setWire(null);
			setWirePos(null);
			setTargetId(null);
		};
		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseup', onUp);
		return () => {
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mouseup', onUp);
		};
	}, [wire]);

	useEffect(() => {
		if (!drag) {
			return;
		}
		const onMove = (e: MouseEvent) => {
			const wp = toWorld(e.clientX, e.clientY);
			const nodes = docRef.current.nodes.map((node) =>
				node.id === drag.id ? { ...node, x: wp.x + drag.dx, y: wp.y + drag.dy } : node,
			);
			onChange({ ...docRef.current, nodes });
		};
		const onUp = () => setDrag(null);
		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseup', onUp);
		return () => {
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mouseup', onUp);
		};
	}, [drag]);

	useEffect(() => {
		if (!pan) {
			return;
		}
		const onMove = (e: MouseEvent) => {
			setView((value) => ({ ...value, x: pan.viewX + (e.clientX - pan.startX), y: pan.viewY + (e.clientY - pan.startY) }));
		};
		const onUp = () => setPan(null);
		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseup', onUp);
		return () => {
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mouseup', onUp);
		};
	}, [pan]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}
		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			const rect = el.getBoundingClientRect();
			const px = e.clientX - rect.left;
			const py = e.clientY - rect.top;
			const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
			setView((value) => {
				const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, value.scale * factor));
				const k = scale / value.scale;
				return { scale, x: px - (px - value.x) * k, y: py - (py - value.y) * k };
			});
		};
		el.addEventListener('wheel', onWheel, { passive: false });
		return () => el.removeEventListener('wheel', onWheel);
	}, []);

	const handleSelect = (nodeId: number) => {
		setSelectedId(nodeId);
	};

	const handleStartDrag = (e: React.MouseEvent, node: BlueprintNode) => {
		e.stopPropagation();
		setSelectedId(node.id);
		const wp = toWorld(e.clientX, e.clientY);
		setDrag({ id: node.id, dx: node.x - wp.x, dy: node.y - wp.y });
	};

	const handleStartWire = (e: React.MouseEvent, node: BlueprintNode, portKey: string) => {
		e.stopPropagation();
		setSelectedId(node.id);
		setWire({ sourceId: node.id, portKey });
		setWirePos(toWorld(e.clientX, e.clientY));
	};

	const handleDropWire = (node: BlueprintNode) => {
		if (wire) {
			setTargetId(node.id);
		}
	};

	const handleDeleteNode = (node: BlueprintNode) => {
		if (node.kind === BLUEPRINT_NODE_KIND.START) {
			return;
		}
		const nodes = docRef.current.nodes
			.filter((n) => n.id !== node.id)
			.map((n) => ({
				...n,
				nextId: n.nextId === node.id ? null : n.nextId,
				trueNextId: n.trueNextId === node.id ? null : n.trueNextId,
				falseNextId: n.falseNextId === node.id ? null : n.falseNextId,
				bodyNextId: n.bodyNextId === node.id ? null : n.bodyNextId,
			}));
		onChange({ ...docRef.current, nodes });
		if (selectedId === node.id) {
			setSelectedId(null);
		}
	};

	const handleBackgroundMouseDown = (e: React.MouseEvent) => {
		if (e.button !== 0) {
			return;
		}
		e.stopPropagation();
		setSelectedId(null);
		setPan({ startX: e.clientX, startY: e.clientY, viewX: view.x, viewY: view.y });
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Delete' || e.key === 'Backspace') {
			if (selectedId !== null) {
				const node = docRef.current.nodes.find((n) => n.id === selectedId);
				if (node) {
					e.preventDefault();
					handleDeleteNode(node);
				}
			}
		}
	};

	const handleAddNode = (kind: BLUEPRINT_NODE_KIND) => {
		const rect = containerRef.current?.getBoundingClientRect();
		const center = toWorld(
			rect ? rect.left + rect.width / 2 : 0,
			rect ? rect.top + rect.height / 2 : 0,
		);
		const existingIDs = docRef.current.nodes.map((n) => n.id);
		const node = createBlueprintNode(kind, center.x - BLUEPRINT_NODE_WIDTH / 2, center.y - 60, existingIDs);
		onChange({ ...docRef.current, nodes: [...docRef.current.nodes, node] });
		setSelectedId(node.id);
	};

	const edges: { key: string; d: string; color: string }[] = [];
	for (const node of docRef.current.nodes) {
		const info = getBlueprintNodeInfo(node.kind);
		info.outputs.forEach((port, index) => {
			const destinationId = node[port.key] as number | null;
			if (destinationId === null || destinationId === undefined) {
				return;
			}
			const destination = docRef.current.nodes.find((n) => n.id === destinationId);
			if (!destination) {
				return;
			}
			const source = getOutputCenter(node, index);
			const target = getInputCenter(destination);
			const dx = Math.max(40, (target.x - source.x) * 0.5);
			edges.push({
				key: `${node.id}-${port.key}-${destinationId}`,
				d: `M ${source.x} ${source.y} C ${source.x + dx} ${source.y}, ${target.x - dx} ${target.y}, ${target.x} ${target.y}`,
				color: port.color,
			});
		});
	}

	return (
		<div
			ref={containerRef}
			className='blueprintCanvas'
			tabIndex={0}
			onMouseDown={handleBackgroundMouseDown}
			onKeyDown={handleKeyDown}
		>
			<div
				className={pan ? 'blueprintCanvasBackground draggingCanvas' : 'blueprintCanvasBackground'}
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: 0,
					height: 0,
					transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
					transformOrigin: '0 0',
				}}
			>
				<svg className='blueprintEdges'>
					{edges.map((edge) => (
						<path key={edge.key} d={edge.d} fill='none' stroke={edge.color} strokeWidth={2} />
					))}
					{wire && wirePos && (
						<path
							d={(() => {
								const sourceNode = docRef.current.nodes.find((n) => n.id === wire.sourceId);
								const source = sourceNode
									? getOutputCenter(
											sourceNode,
											Math.max(
												0,
												getBlueprintNodeInfo(sourceNode.kind).outputs.findIndex((port) => port.key === wire.portKey),
											),
										)
									: wirePos;
								const target = targetId
									? getInputCenter(docRef.current.nodes.find((n) => n.id === targetId)!)
									: wirePos;
								const dx = Math.max(40, (target.x - source.x) * 0.5);
								return `M ${source.x} ${source.y} C ${source.x + dx} ${source.y}, ${target.x - dx} ${target.y}, ${target.x} ${target.y}`;
							})()}
							fill='none'
							stroke='#8ab4f8'
							strokeWidth={2}
							strokeDasharray='6 4'
						/>
					)}
				</svg>
				{docRef.current.nodes.map((node) => (
					<BlueprintNodeView
						key={node.id}
						node={node}
						selected={node.id === selectedId}
						isTarget={wire !== null && node.id === targetId}
						onSelect={() => handleSelect(node.id)}
						onChange={(updated) =>
							onChange({ ...docRef.current, nodes: docRef.current.nodes.map((n) => (n.id === updated.id ? updated : n)) })
						}
						onStartDrag={handleStartDrag}
						onStartWire={handleStartWire}
						onDropWire={handleDropWire}
						onDelete={handleDeleteNode}
					/>
				))}
			</div>
			<div className='blueprintPalette'>
				<div className='blueprintPaletteTitle'>Add node</div>
				{Object.values(BLUEPRINT_NODE_KIND)
					.filter((value): value is number => typeof value === 'number')
					.map((kind) => {
						const info = getBlueprintNodeInfo(kind as BLUEPRINT_NODE_KIND);
						return (
							<button
								key={kind}
								className='blueprintPaletteItem'
								onClick={() => handleAddNode(kind as BLUEPRINT_NODE_KIND)}
							>
								<span
									className='blueprintPaletteSwatch'
									style={{ background: getBlueprintNodeInfo(kind as BLUEPRINT_NODE_KIND).color }}
								/>
								{info.label}
							</button>
						);
					})}
			</div>
		</div>
	);
}

export default BlueprintCanvas;

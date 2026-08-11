/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { Constants, DYNAMIC_VALUE_KIND, JSONType, Paths } from '../common';
import { writeJSON } from '../common/Platform';
import { DynamicValue } from '../core/DynamicValue';
import { Node } from '../core/Node';
import { Portion } from '../core/Portion';
import { Position } from '../core/Position';
import { Project } from '../core/Project';
import { Rectangle } from '../core/Rectangle';
import { Model } from '../Editor';
import { Autotile, Floor } from '../mapElements';
import { MAP_GEN_TERRAIN } from '../models/MapGenPreset';
import { TreeMapTag } from '../models/TreeMapTag';

function hash2(x: number, z: number, seed: number): number {
	let h = seed ^ Math.imul(x, 374761393) ^ Math.imul(z, 668265263);
	h = Math.imul(h ^ (h >>> 13), 1274126177);
	return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function smoothNoise(x: number, z: number, seed: number): number {
	const xi = Math.floor(x);
	const zi = Math.floor(z);
	const xf = x - xi;
	const zf = z - zi;
	const smooth = (t: number) => t * t * (3 - 2 * t);
	const a = hash2(xi, zi, seed);
	const b = hash2(xi + 1, zi, seed);
	const c = hash2(xi, zi + 1, seed);
	const d = hash2(xi + 1, zi + 1, seed);
	const u = smooth(xf);
	const v = smooth(zf);
	return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fractalNoise(x: number, z: number, seed: number, octaves = 3): number {
	let total = 0;
	let amp = 1;
	let freq = 1;
	let max = 0;
	for (let i = 0; i < octaves; i++) {
		total += smoothNoise(x * freq, z * freq, seed + i * 101) * amp;
		max += amp;
		amp *= 0.5;
		freq *= 2;
	}
	return total / max;
}

class MapGenerator {
	static createLand(autotileID: number): Floor | Autotile {
		const rect = new Rectangle(0, 0, 1, 1);
		return autotileID > 0 ? Autotile.create(autotileID, 0, rect) : Floor.create(rect);
	}

	static addLand(
		lands: Map<string, Floor | Autotile>,
		x: number,
		y: number,
		z: number,
		autotileID: number,
	) {
		const position = new Position(x, y, 0, z, 0);
		lands.set(position.toKey(), MapGenerator.createLand(autotileID));
	}

	static getOpenCells(
		map: Model.Map,
		preset: Model.MapGenPreset,
	): boolean[][] {
		const open: boolean[][] = [];
		for (let x = 0; x < map.length; x++) {
			open.push([]);
			for (let z = 0; z < map.width; z++) {
				open[x].push(true);
			}
		}
		if (preset.terrain !== MAP_GEN_TERRAIN.CAVERN) {
			return open;
		}
		if (preset.generateRooms) {
			MapGenerator.generateRooms(map, preset, open);
		} else {
			for (let x = 0; x < map.length; x++) {
				for (let z = 0; z < map.width; z++) {
					open[x][z] = fractalNoise(x / 6, z / 6, preset.seed) > preset.density;
				}
			}
		}
		return open;
	}

	static generateRooms(map: Model.Map, preset: Model.MapGenPreset, open: boolean[][]) {
		for (let x = 0; x < map.length; x++) {
			for (let z = 0; z < map.width; z++) {
				open[x][z] = false;
			}
		}
		const minSize = 4;
		const maxSize = Math.max(minSize + 2, Math.floor(Math.min(map.length, map.width) / 4));
		const roomCount = Math.max(2, Math.floor(preset.density * 6));
		const centers: [number, number][] = [];
		for (let i = 0; i < roomCount; i++) {
			const roomWidth = Math.min(map.width - 2, minSize + Math.floor(hash2(i * 3 + 1, preset.seed, preset.seed) * (maxSize - minSize)));
			const roomLength = Math.min(map.length - 2, minSize + Math.floor(hash2(i * 3 + 2, preset.seed, preset.seed) * (maxSize - minSize)));
			const x = Math.floor(hash2(i * 3 + 3, preset.seed, preset.seed) * Math.max(1, map.length - roomLength - 1)) + 1;
			const z = Math.floor(hash2(i * 3 + 4, preset.seed, preset.seed) * Math.max(1, map.width - roomWidth - 1)) + 1;
			for (let dx = x; dx < x + roomLength && dx < map.length; dx++) {
				for (let dz = z; dz < z + roomWidth && dz < map.width; dz++) {
					open[dx][dz] = true;
				}
			}
			centers.push([Math.min(x + Math.floor(roomLength / 2), map.length - 1), Math.min(z + Math.floor(roomWidth / 2), map.width - 1)]);
		}
		for (let i = 0; i < centers.length - 1; i++) {
			const [ax, az] = centers[i];
			const [bx, bz] = centers[i + 1];
			const horizontalFirst = hash2(i, preset.seed, preset.seed) > 0.5;
			if (horizontalFirst) {
				for (let z = Math.min(az, bz); z <= Math.max(az, bz); z++) {
					open[ax][z] = true;
				}
				for (let x = Math.min(ax, bx); x <= Math.max(ax, bx); x++) {
					open[x][bz] = true;
				}
			} else {
				for (let x = Math.min(ax, bx); x <= Math.max(ax, bx); x++) {
					open[x][az] = true;
				}
				for (let z = Math.min(az, bz); z <= Math.max(az, bz); z++) {
					open[bx][z] = true;
				}
			}
		}
	}

	static async generate(preset: Model.MapGenPreset, name: string): Promise<Model.Map | null> {
		const project = Project.current!;
		const id = Node.getNewID(project.treeMaps.tree);
		const map = Model.Map.createDefaultNewMap(id, name.length > 0 ? name : preset.getName());
		map.length = Math.max(2, preset.length);
		map.width = Math.max(2, preset.width);
		map.height = Math.max(1, preset.height);
		map.depth = Math.max(0, preset.depth);
		map.tilesetID = preset.tilesetID;
		if (preset.randomBattlesEnabled && project.troops.list.length > 0) {
			const randomBattle = new Model.RandomBattle();
			randomBattle.applyDefault();
			randomBattle.troopID = DynamicValue.create(DYNAMIC_VALUE_KIND.DATABASE, project.troops.list[0].id);
			map.randomBattles = [randomBattle];
			map.randomBattleMapID = DynamicValue.create(DYNAMIC_VALUE_KIND.DATABASE, id);
		} else {
			map.randomBattles = [];
		}
		const folderMap = await map.createNewMap();
		if (!folderMap) {
			return null;
		}

		const open = MapGenerator.getOpenCells(map, preset);
		const [lx, , lz] = map.getPortionsMax();
		const topY = map.height - 1;
		for (let px = 0; px <= lx; px++) {
			for (let pz = 0; pz <= lz; pz++) {
				const mapPortion = new Model.MapPortion(new Portion(px, 0, pz));
				const startX = px * Constants.PORTION_SIZE;
				const startZ = pz * Constants.PORTION_SIZE;
				for (let i = 0; i < Constants.PORTION_SIZE; i++) {
					const x = startX + i;
					if (x >= map.length) break;
					for (let j = 0; j < Constants.PORTION_SIZE; j++) {
						const z = startZ + j;
						if (z >= map.width) break;
						MapGenerator.fillColumn(map, preset, mapPortion.lands, open, x, z, topY);
					}
				}
				if (mapPortion.lands.size > 0) {
					const json: JSONType = {};
					mapPortion.write(json);
					await writeJSON(Paths.join(folderMap, Portion.getFileName(px, 0, pz)), json);
				}
			}
		}

		const node = Node.create(TreeMapTag.create(map.id, map.name), [], project.treeMaps.tree[0]);
		project.treeMaps.tree[0].children.push(node);
		await project.treeMaps.save();
		return map;
	}

	static fillColumn(
		map: Model.Map,
		preset: Model.MapGenPreset,
		lands: Map<string, Floor | Autotile>,
		open: boolean[][],
		x: number,
		z: number,
		topY: number,
	) {
		switch (preset.terrain) {
			case MAP_GEN_TERRAIN.HILLS: {
				const height = Math.max(
					0,
					Math.min(topY, Math.floor(fractalNoise(x / 8, z / 8, preset.seed) * map.height)),
				);
				for (let y = 0; y <= height; y++) {
					if (y === height || fractalNoise(x + y * 31, z + y * 31, preset.seed + 7) < preset.density) {
						MapGenerator.addLand(lands, x, y, z, preset.floorAutotileID);
					}
				}
				break;
			}
			case MAP_GEN_TERRAIN.CAVERN: {
				MapGenerator.addLand(lands, x, 0, z, preset.floorAutotileID);
				if (open[x][z]) {
					MapGenerator.addLand(lands, x, 1, z, preset.floorAutotileID);
				}
				break;
			}
			case MAP_GEN_TERRAIN.FLAT:
			default: {
				MapGenerator.addLand(lands, x, 0, z, preset.floorAutotileID);
				break;
			}
		}
	}
}

export { MapGenerator };

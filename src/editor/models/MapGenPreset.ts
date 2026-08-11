/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { BINDING, JSONType } from '../common';
import { BindingType } from '../core/Serializable';
import { Base } from './Base';
import { Localization } from './Localization';

export enum MAP_GEN_TERRAIN {
	FLAT,
	HILLS,
	CAVERN,
}

export const MAP_GEN_TERRAIN_OPTIONS = Base.mapListIndex(['flat', 'hills', 'cavern']);

class MapGenPreset extends Localization {
	public static type = 'MapGenPreset';
	public width!: number;
	public length!: number;
	public height!: number;
	public depth!: number;
	public seed!: number;
	public terrain!: number;
	public density!: number;
	public floorAutotileID!: number;
	public wallAutotileID!: number;
	public tilesetID!: number;
	public generateRooms!: boolean;
	public randomBattlesEnabled!: boolean;
	public description!: Localization;

	public static bindings: BindingType[] = [
		['width', 'width', 20, BINDING.NUMBER],
		['length', 'length', 20, BINDING.NUMBER],
		['height', 'height', 1, BINDING.NUMBER],
		['depth', 'depth', 2, BINDING.NUMBER],
		['seed', 'seed', 1, BINDING.NUMBER],
		['terrain', 'terrain', MAP_GEN_TERRAIN.FLAT, BINDING.NUMBER],
		['density', 'density', 0.3, BINDING.NUMBER],
		['floorAutotileID', 'floorAutotileID', 1, BINDING.NUMBER],
		['wallAutotileID', 'wallAutotileID', 1, BINDING.NUMBER],
		['tilesetID', 'tilesetID', 1, BINDING.NUMBER],
		['generateRooms', 'generateRooms', false, BINDING.BOOLEAN],
		['randomBattlesEnabled', 'randomBattlesEnabled', true, BINDING.BOOLEAN],
		['description', 'description', undefined, BINDING.OBJECT, Localization],
	];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	applyDefault(additionnalBinding: BindingType[] = []): void {
		super.applyDefault(MapGenPreset.getBindings(additionnalBinding));
		this.description = Localization.create(-1, '');
	}

	copy(preset: MapGenPreset): void {
		super.copy(preset, MapGenPreset.getBindings([]));
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, MapGenPreset.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, MapGenPreset.getBindings(additionnalBinding));
	}
}

export { MapGenPreset };

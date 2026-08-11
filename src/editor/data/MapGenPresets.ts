/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { Model } from '../Editor';
import { BINDING, JSONType, Paths } from '../common';
import { Project } from '../core/Project';
import { BindingType, Serializable } from '../core/Serializable';

class MapGenPresets extends Serializable {
	public list!: Model.MapGenPreset[];

	public static readonly bindings: BindingType[] = [
		['list', 'mapGenPresets', undefined, BINDING.LIST, Model.MapGenPreset],
	];

	static getBindings(additionnalBinding: BindingType[]) {
		return [...this.bindings, ...additionnalBinding];
	}

	getPath(): string {
		return Paths.join(Project.current!.getPath(), Paths.FILE_MAP_GEN_PRESETS);
	}

	getByID(id: number): Model.MapGenPreset {
		return this.list.find((preset) => preset.id === id)!;
	}

	read(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.read(json, MapGenPresets.getBindings(additionnalBinding));
	}

	write(json: JSONType, additionnalBinding: BindingType[] = []) {
		super.write(json, MapGenPresets.getBindings(additionnalBinding));
	}
}

export { MapGenPresets };

"use strict";
var RPGEngine = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // dist/index.js
  var index_exports = {};
  __export(index_exports, {
    ALEFGARD_SIZE: () => ALEFGARD_SIZE,
    Battle: () => Battle,
    BlueprintManager: () => BlueprintManager,
    CHEST_LOOT: () => CHEST_LOOT,
    CLASSES: () => CLASSES,
    CraftingSystem: () => CraftingSystem,
    DIRECTION_DELTAS: () => DIRECTION_DELTAS,
    DW_CHEST_PLACEMENTS: () => DW_CHEST_PLACEMENTS,
    DW_DUNGEON_CONFIGS: () => DW_DUNGEON_CONFIGS,
    DW_LEVEL_CAP: () => DW_LEVEL_CAP,
    DW_POOLS: () => DW_POOLS,
    DW_SPELL_LEVELS: () => DW_SPELL_LEVELS,
    ELEMENTS: () => ELEMENTS,
    EQUIPMENT_SLOTS: () => EQUIPMENT_SLOTS,
    EventBus: () => EventBus,
    Game: () => Game,
    ITEMS: () => ITEMS,
    Inventory: () => Inventory,
    LEVEL_CAP: () => LEVEL_CAP,
    MILESTONES: () => MILESTONES,
    MONSTERS: () => MONSTERS,
    NODE_TYPES: () => NODE_TYPES,
    NPCS: () => NPCS,
    OVERWORLD_SIZE: () => OVERWORLD_SIZE,
    QUESTS: () => QUESTS,
    QuestLog: () => QuestLog,
    RAIDS: () => RAIDS,
    RAIN_BARRIER: () => RAIN_BARRIER,
    RECIPES: () => RECIPES,
    RECIPE_LIST: () => RECIPE_LIST,
    SAVE_VERSION: () => SAVE_VERSION,
    SKILLS: () => SKILLS,
    STAT_KEYS: () => STAT_KEYS,
    SaveManager: () => SaveManager,
    TILE_DEFS: () => TILE_DEFS,
    TOWER_BOSS_FLOORS: () => TOWER_BOSS_FLOORS,
    TOWER_BOSS_FOR_FLOOR: () => TOWER_BOSS_FOR_FLOOR,
    TOWER_MAX_FLOOR: () => TOWER_MAX_FLOOR,
    TRIALS: () => TRIALS,
    VariableStore: () => VariableStore,
    WorldMap: () => WorldMap,
    XP_CURVES: () => XP_CURVES,
    ZERO_STATS: () => ZERO_STATS,
    addConst: () => addConst,
    addEquipmentSkill: () => addEquipmentSkill,
    addEventGraph: () => addEventGraph,
    addFunctionGraph: () => addFunctionGraph,
    addNode: () => addNode,
    addNodeWithPin: () => addNodeWithPin,
    addVarGet: () => addVarGet,
    addVarSet: () => addVarSet,
    addXp: () => addXp,
    applyEffect: () => applyEffect,
    applyMilestone: () => applyMilestone,
    applyStatPoint: () => applyStatPoint,
    authorDwDungeon: () => authorDwDungeon,
    buildActorFromEnemy: () => buildActorFromEnemy,
    buildActorFromHero: () => buildActorFromHero,
    buildAlefgard: () => buildAlefgard,
    buildTowerFloor: () => buildTowerFloor,
    characterSkills: () => characterSkills,
    classDef: () => classDef,
    connect: () => connect,
    createBlueprint: () => createBlueprint,
    createCharacter: () => createCharacter,
    createRng: () => createRng,
    deriveStats: () => deriveStats,
    dwEncounterPool: () => dwEncounterPool,
    dwFixedChestVariant: () => dwFixedChestVariant,
    dwXpToNext: () => dwXpToNext,
    equipmentStats: () => equipmentStats,
    evaluateCondition: () => evaluateCondition,
    executeGraph: () => executeGraph,
    generateDungeon: () => generateDungeon,
    generateOverworld: () => generateOverworld,
    getDialog: () => getDialog,
    getNpc: () => getNpc,
    hashString: () => hashString,
    isRainBarrier: () => isRainBarrier,
    itemDef: () => itemDef,
    itemStatsSummary: () => itemStatsSummary,
    learnSkill: () => learnSkill,
    levelCapFor: () => levelCapFor,
    makeTile: () => makeTile,
    mergeStats: () => mergeStats,
    milestoneTitle: () => milestoneTitle,
    milestonesCrossed: () => milestonesCrossed,
    monsterDef: () => monsterDef,
    neighborsOf: () => neighborsOf,
    newUid: () => newUid,
    nodeDef: () => nodeDef,
    npcDef: () => npcDef,
    pinsForNode: () => pinsForNode,
    questDef: () => questDef,
    raidDef: () => raidDef,
    recipeDef: () => recipeDef,
    recomputeDerived: () => recomputeDerived,
    removeEquipmentSkill: () => removeEquipmentSkill,
    renderBlueprint: () => renderBlueprint,
    renderGraph: () => renderGraph,
    renderGrid: () => renderGrid,
    rollChest: () => rollChest,
    rollLootEntries: () => rollLootEntries,
    scaleMonster: () => scaleMonster,
    skillDef: () => skillDef,
    standardXpToNext: () => standardXpToNext,
    towerBossForFloor: () => towerBossForFloor,
    towerChestLevel: () => towerChestLevel,
    towerMonsterLevel: () => towerMonsterLevel,
    towerPoolFor: () => towerPoolFor,
    trialDef: () => trialDef,
    validateBlueprint: () => validateBlueprint,
    xpToNext: () => xpToNext,
    xpToNextFor: () => xpToNextFor
  });

  // dist/core/event-bus.js
  var EventBus = class {
    handlers = /* @__PURE__ */ new Map();
    wildcards = /* @__PURE__ */ new Set();
    on(event, handler) {
      const events = Array.isArray(event) ? event : [event];
      for (const e2 of events) {
        if (!this.handlers.has(e2))
          this.handlers.set(e2, /* @__PURE__ */ new Set());
        this.handlers.get(e2).add(handler);
      }
      return () => this.off(events, handler);
    }
    once(event, handler) {
      const wrapped = (payload2, e2) => {
        this.off([event], wrapped);
        handler(payload2, e2);
      };
      return this.on(event, wrapped);
    }
    onAny(handler) {
      this.wildcards.add(handler);
      return () => this.wildcards.delete(handler);
    }
    off(events, handler) {
      for (const e2 of events) {
        const set = this.handlers.get(e2);
        if (set) {
          set.delete(handler);
          if (set.size === 0)
            this.handlers.delete(e2);
        }
      }
    }
    emit(event, payload2) {
      const set = this.handlers.get(event);
      if (set) {
        for (const handler of [...set])
          handler(payload2, event);
      }
      if (this.wildcards.size > 0) {
        for (const handler of [...this.wildcards])
          handler(payload2, event);
      }
    }
    clear() {
      this.handlers.clear();
      this.wildcards.clear();
    }
  };

  // dist/core/rng.js
  function createRng(seed) {
    let a = seed >>> 0;
    const next = () => {
      a |= 0;
      a = a + 1831565813 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    return {
      next,
      int(min, max) {
        return Math.floor(next() * (max - min + 1)) + min;
      },
      range(min, max) {
        return next() * (max - min) + min;
      },
      pick(arr) {
        if (arr.length === 0)
          throw new Error("cannot pick from empty array");
        return arr[Math.floor(next() * arr.length)];
      },
      shuffle(arr) {
        const out = arr.slice();
        for (let i = out.length - 1; i > 0; i--) {
          const j = Math.floor(next() * (i + 1));
          const tmp = out[i];
          out[i] = out[j];
          out[j] = tmp;
        }
        return out;
      },
      chance(p) {
        return next() < p;
      },
      weighted(items) {
        const total = items.reduce((sum, e2) => sum + e2.weight, 0);
        if (total <= 0)
          throw new Error("weighted pick requires positive total weight");
        let roll = next() * total;
        for (const entry of items) {
          roll -= entry.weight;
          if (roll <= 0)
            return entry.item;
        }
        return items[items.length - 1].item;
      }
    };
  }
  function hashString(input) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // ../../../AppData/Local/Temp/opencode/rpg-plugin-build/shims/fs.js
  var PREFIX = "rpg-engine-fs:";
  function storage() {
    if (typeof localStorage !== "undefined") return localStorage;
    if (typeof globalThis !== "undefined" && globalThis.localStorage) return globalThis.localStorage;
    const mem = /* @__PURE__ */ new Map();
    return {
      getItem: (k) => mem.has(k) ? mem.get(k) : null,
      setItem: (k, v) => mem.set(k, v),
      removeItem: (k) => mem.delete(k),
      key: (i) => Array.from(mem.keys())[i] ?? null,
      get length() {
        return mem.size;
      }
    };
  }
  function norm(p) {
    return String(p).replace(/^\.\//, "").replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\/|\/$/g, "");
  }
  function keyFor(p) {
    return PREFIX + norm(p);
  }
  function dirKeys(dir) {
    const s = storage();
    const out = [];
    const prefix = keyFor(dir) === PREFIX ? PREFIX : keyFor(dir) + "/";
    for (let i = 0; i < s.length; i++) {
      const k = s.key(i);
      if (k && k.startsWith(prefix)) out.push(k);
    }
    return out;
  }
  var promises = {
    async mkdir() {
    },
    async writeFile(file, body) {
      storage().setItem(keyFor(file), body);
    },
    async rename(tmp, file) {
      const v = storage().getItem(keyFor(tmp));
      if (v != null) storage().setItem(keyFor(file), v);
      storage().removeItem(keyFor(tmp));
    },
    async readFile(file, encoding) {
      const v = storage().getItem(keyFor(file));
      if (v == null) throw new Error(`ENOENT: no such file '${file}'`);
      return encoding ? v : Buffer.from(v);
    },
    async access(file) {
      if (storage().getItem(keyFor(file)) == null) throw new Error(`ENOENT: no such file '${file}'`);
    },
    async readdir(dir) {
      const seen = /* @__PURE__ */ new Set();
      const names = [];
      for (const k of dirKeys(dir)) {
        const rest = k.slice(keyFor(dir).length).replace(/^\//, "");
        const name = rest.split("/")[0];
        if (name && !seen.has(name)) {
          seen.add(name);
          names.push(name);
        }
      }
      return names;
    },
    async unlink(file) {
      storage().removeItem(keyFor(file));
    }
  };

  // ../../../AppData/Local/Temp/opencode/rpg-plugin-build/shims/path.js
  function norm2(p) {
    return String(p).replace(/\\/g, "/").replace(/\/+/g, "/");
  }
  var path_default = {
    join: (...parts) => norm2(parts.filter((p) => p != null && p !== "").join("/")),
    dirname: (p) => {
      const n2 = norm2(p);
      const i = n2.lastIndexOf("/");
      return i === -1 ? "." : n2.slice(0, i) || "/";
    },
    basename: (p) => {
      const n2 = norm2(p);
      const i = n2.lastIndexOf("/");
      return i === -1 ? n2 : n2.slice(i + 1);
    },
    extname: (p) => {
      const b = norm2(p).split("/").pop() || "";
      const i = b.lastIndexOf(".");
      return i <= 0 ? "" : b.slice(i);
    },
    resolve: (...parts) => norm2(parts.filter((p) => p != null && p !== "").join("/"))
  };

  // dist/core/save-manager.js
  var SaveManager = class {
    dir;
    constructor(dir) {
      this.dir = dir;
    }
    fileFor(slot) {
      const safe = slot.replace(/[^a-zA-Z0-9_-]/g, "_");
      return path_default.join(this.dir, `${safe}.json`);
    }
    async ensureDir() {
      await promises.mkdir(this.dir, { recursive: true });
    }
    async save(slot, data) {
      await this.ensureDir();
      const file = this.fileFor(slot);
      const body = JSON.stringify(data, null, 2);
      const tmp = `${file}.tmp`;
      await promises.writeFile(tmp, body, "utf-8");
      await promises.rename(tmp, file);
      return this.metaFrom(data);
    }
    async load(slot) {
      const file = this.fileFor(slot);
      const raw = await promises.readFile(file, "utf-8");
      return JSON.parse(raw);
    }
    async exists(slot) {
      return promises.access(this.fileFor(slot)).then(() => true).catch(() => false);
    }
    async list() {
      await this.ensureDir();
      const files = await promises.readdir(this.dir);
      const metas = [];
      for (const file of files) {
        if (!file.endsWith(".json") || file.endsWith(".tmp"))
          continue;
        try {
          const raw = await promises.readFile(path_default.join(this.dir, file), "utf-8");
          const data = JSON.parse(raw);
          metas.push(this.metaFrom(data));
        } catch {
          continue;
        }
      }
      return metas.sort((a, b) => a.savedAt < b.savedAt ? 1 : -1);
    }
    async remove(slot) {
      try {
        await promises.unlink(this.fileFor(slot));
        return true;
      } catch {
        return false;
      }
    }
    metaFrom(data) {
      return {
        slot: "",
        savedAt: data.savedAt,
        seed: data.seed,
        playerName: data.player.name,
        classId: data.player.classId,
        level: data.player.level
      };
    }
  };

  // dist/core/types.js
  function makeTile(type, walkable, variant) {
    return { type, walkable, explored: false, variant, featureId: void 0 };
  }
  var TILE_DEFS = {
    water: { walkable: false, glyph: "~", encounterChance: 0 },
    shore: { walkable: true, glyph: ".", encounterChance: 0.02 },
    plains: { walkable: true, glyph: " ", encounterChance: 0.1 },
    grassland: { walkable: true, glyph: '"', encounterChance: 0.14 },
    forest: { walkable: true, glyph: "#", encounterChance: 0.22 },
    desert: { walkable: true, glyph: "d", encounterChance: 0.08 },
    hills: { walkable: true, glyph: "^", encounterChance: 0.12 },
    mountain: { walkable: false, glyph: "M", encounterChance: 0 },
    swamp: { walkable: true, glyph: "&", encounterChance: 0.18 },
    snow: { walkable: true, glyph: "s", encounterChance: 0.12 },
    town: { walkable: true, glyph: "T", encounterChance: 0 },
    dungeon: { walkable: true, glyph: "D", encounterChance: 0 },
    tower: { walkable: true, glyph: "T", encounterChance: 0 },
    shrine: { walkable: true, glyph: "S", encounterChance: 0 },
    path: { walkable: true, glyph: "=", encounterChance: 0.05 },
    stone: { walkable: true, glyph: ".", encounterChance: 0.12 },
    wall: { walkable: false, glyph: "#", encounterChance: 0 },
    "stairs-down": { walkable: true, glyph: ">", encounterChance: 0 },
    "stairs-up": { walkable: true, glyph: "<", encounterChance: 0 },
    chest: { walkable: true, glyph: "C", encounterChance: 0 }
  };
  var ZERO_STATS = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0, luck: 0 };
  var STAT_KEYS = ["str", "dex", "con", "int", "wis", "cha", "luck"];
  var EQUIPMENT_SLOTS = ["weapon", "armor", "accessory", "trinket"];
  var ELEMENTS = ["physical", "fire", "ice", "lightning", "shadow", "holy"];
  var DIRECTION_DELTAS = {
    north: { x: 0, y: -1 },
    south: { x: 0, y: 1 },
    east: { x: 1, y: 0 },
    west: { x: -1, y: 0 }
  };

  // dist/map/generator.js
  function makeNoise(n2, rng) {
    const grid = [];
    for (let y = 0; y < n2; y++) {
      const row = [];
      for (let x = 0; x < n2; x++)
        row.push(rng());
      grid.push(row);
    }
    return grid;
  }
  function smooth(grid) {
    const n2 = grid.length;
    for (let y = 0; y < n2; y++) {
      for (let x = 0; x < n2; x++) {
        let sum = 0;
        let count = 0;
        for (const [dx, dy] of [
          [0, 0],
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1]
        ]) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < n2 && ny < n2) {
            sum += grid[ny][nx];
            count++;
          }
        }
        grid[y][x] = sum / count;
      }
    }
  }
  function assignBiome(elev, moist) {
    if (elev < 0.3)
      return makeTile("water", false, "deep water");
    if (elev < 0.38)
      return makeTile("water", false, "shallow water");
    if (elev < 0.45)
      return makeTile("shore", true, "coast");
    if (elev < 0.55)
      return makeTile("plains", true, "plains");
    if (elev < 0.63)
      return makeTile("grassland", true, "grassland");
    if (elev < 0.7)
      return makeTile("hills", true, "hills");
    if (elev < 0.76) {
      return moist < 0.5 ? makeTile("forest", true, "forest") : makeTile("swamp", true, "swamp");
    }
    if (elev < 0.8) {
      return moist < 0.6 ? makeTile("snow", true, "snowfields") : makeTile("hills", true, "highlands");
    }
    return makeTile("mountain", false, "mountains");
  }
  function beamPath(grid, a, b) {
    let x = a.x;
    let y = a.y;
    while (x !== b.x) {
      const tile = grid[y][x];
      if (tile.walkable && tile.type !== "town" && tile.type !== "dungeon" && tile.type !== "tower" && tile.type !== "shrine") {
        tile.type = "path";
        tile.variant = "road";
      }
      x += Math.sign(b.x - x);
    }
    while (y !== b.y) {
      const tile = grid[y][x];
      if (tile.walkable && tile.type !== "town" && tile.type !== "dungeon" && tile.type !== "tower" && tile.type !== "shrine") {
        tile.type = "path";
        tile.variant = "road";
      }
      y += Math.sign(b.y - y);
    }
  }
  function findWalkableNear(grid, cx, cy, maxRadius) {
    const n2 = grid.length;
    for (let r = 0; r <= maxRadius; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r)
            continue;
          const x = cx + dx;
          const y = cy + dy;
          if (x < 0 || y < 0 || x >= n2 || y >= n2)
            continue;
          if (grid[y][x].walkable)
            return { x, y };
        }
      }
    }
    return null;
  }
  function generateOverworld(opts) {
    const n2 = opts.size;
    let seed = opts.seed;
    const rng = () => {
      seed |= 0;
      seed = seed + 1831565813 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    const elev = makeNoise(n2, rng);
    const moist = makeNoise(n2, rng);
    smooth(elev);
    smooth(elev);
    smooth(moist);
    smooth(moist);
    const grid = [];
    const half = n2 / 2;
    for (let y = 0; y < n2; y++) {
      const row = [];
      for (let x = 0; x < n2; x++) {
        const radial = Math.max(0, 1 - Math.max(Math.abs(x - half), Math.abs(y - half)) / half);
        const e2 = Math.min(1, Math.max(0, elev[y][x] * 0.72 + radial * 0.28));
        const m = Math.min(1, Math.max(0, moist[y][x]));
        row.push(assignBiome(e2, m));
      }
      grid.push(row);
    }
    const features = [];
    const placeFeature = (kind, name, minDist, extra = {}) => {
      for (let attempt = 0; attempt < 300; attempt++) {
        const x = 2 + Math.floor(rng() * (n2 - 4));
        const y = 2 + Math.floor(rng() * (n2 - 4));
        const tile = grid[y][x];
        if (!tile.walkable || tile.type === "town" || tile.type === "dungeon" || tile.type === "tower" || tile.type === "shrine")
          continue;
        const near = features.some((f) => Math.abs(f.x - x) + Math.abs(f.y - y) < minDist);
        if (near)
          continue;
        const slug = name.toLowerCase().replace(/[^a-z]+/g, "-");
        const num = name.replace(/\D+/g, "");
        const id = `${kind}-${slug}${num}`;
        const feature = { id, kind, name, x, y, ...extra };
        const tileType = kind === "town" ? "town" : kind === "dungeon" ? "dungeon" : kind === "tower" ? "tower" : "shrine";
        grid[y][x] = makeTile(tileType, true);
        grid[y][x].featureId = feature.id;
        features.push(feature);
        return feature;
      }
      return null;
    };
    for (let i = 0; i < opts.townCount; i++)
      placeFeature("town", `Town ${i + 1}`, 8);
    for (let i = 0; i < opts.dungeonCount; i++)
      placeFeature("dungeon", `Dungeon ${i + 1}`, 8);
    for (let i = 0; i < opts.towerCount; i++)
      placeFeature("tower", "Tower of Ascension", 10);
    for (let i = 0; i < opts.shrineCount; i++)
      placeFeature("shrine", `Shrine ${i + 1}`, 6);
    const center = findWalkableNear(grid, Math.floor(n2 / 2), Math.floor(n2 / 2), Math.floor(n2 / 2)) ?? { x: 2, y: 2 };
    const spawn = findWalkableNear(grid, center.x, center.y, 12) ?? center;
    const ordered = [...features].sort((a, b) => Math.abs(a.x - spawn.x) + Math.abs(a.y - spawn.y) - (Math.abs(b.x - spawn.x) + Math.abs(b.y - spawn.y)));
    let current = spawn;
    for (const feature of ordered) {
      beamPath(grid, current, { x: feature.x, y: feature.y });
      current = { x: feature.x, y: feature.y };
    }
    grid[spawn.y][spawn.x] = makeTile("plains", true, "spawn");
    return { grid, features, spawn };
  }
  function carveRoom(grid, room) {
    for (let y = room.y; y < room.y + room.h; y++) {
      for (let x = room.x; x < room.x + room.w; x++) {
        grid[y][x] = makeTile("stone", true, "dungeon floor");
      }
    }
  }
  function carveCorridor(grid, a, b, rng) {
    let x = a.x;
    let y = a.y;
    const horizontalFirst = rng() < 0.5;
    const carve = (cx, cy) => {
      if (grid[cy][cx].type !== "stone") {
        grid[cy][cx] = makeTile("stone", true, "dungeon floor");
      }
    };
    if (horizontalFirst) {
      while (x !== b.x) {
        carve(x, y);
        x += Math.sign(b.x - x);
      }
      while (y !== b.y) {
        carve(x, y);
        y += Math.sign(b.y - y);
      }
    } else {
      while (y !== b.y) {
        carve(x, y);
        y += Math.sign(b.y - y);
      }
      while (x !== b.x) {
        carve(x, y);
        x += Math.sign(b.x - x);
      }
    }
    carve(b.x, b.y);
  }
  function generateDungeon(opts) {
    let seed = opts.seed;
    const rng = () => {
      seed |= 0;
      seed = seed + 1831565813 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    const { width, height } = opts;
    const grid = [];
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++)
        row.push(makeTile("wall", false, "dungeon wall"));
      grid.push(row);
    }
    const rooms = [];
    for (let attempt = 0; attempt < 200 && rooms.length < opts.roomCount; attempt++) {
      const w = 4 + Math.floor(rng() * 6);
      const h = 4 + Math.floor(rng() * 6);
      const x = 1 + Math.floor(rng() * (width - w - 2));
      const y = 1 + Math.floor(rng() * (height - h - 2));
      const overlaps = rooms.some((r) => x < r.x + r.w + 1 && x + w + 1 > r.x && y < r.y + r.h + 1 && y + h + 1 > r.y);
      if (overlaps)
        continue;
      rooms.push({ x, y, w, h });
    }
    if (rooms.length < 2) {
      rooms.length = 0;
      rooms.push({ x: 2, y: 2, w: 6, h: 6 });
      rooms.push({ x: Math.floor(width / 2), y: Math.floor(height / 2), w: 6, h: 6 });
    }
    for (const room of rooms)
      carveRoom(grid, room);
    const centers = rooms.map((r) => ({ x: r.x + Math.floor(r.w / 2), y: r.y + Math.floor(r.h / 2) }));
    for (let i = 1; i < centers.length; i++) {
      carveCorridor(grid, centers[i - 1], centers[i], rng);
    }
    const entry = centers[0];
    const exit = centers[centers.length - 1];
    grid[entry.y][entry.x] = makeTile("stairs-up", true, "entrance");
    grid[exit.y][exit.x] = makeTile("stairs-down", true, "exit");
    const monsters = [];
    const chests = [];
    const traps = [];
    const innerRooms = rooms.slice(1, rooms.length - 1);
    for (const room of innerRooms) {
      if (rng() < 0.35) {
        const cx = room.x + 1 + Math.floor(rng() * Math.max(1, room.w - 2));
        const cy = room.y + 1 + Math.floor(rng() * Math.max(1, room.h - 2));
        if (grid[cy][cx].type === "stone") {
          grid[cy][cx] = makeTile("chest", true, "treasure");
          chests.push({ x: cx, y: cy });
        }
      }
    }
    for (const room of rooms) {
      if (room === rooms[0] || room === rooms[rooms.length - 1])
        continue;
      const slots = [];
      for (let y = room.y; y < room.y + room.h; y++) {
        for (let x = room.x; x < room.x + room.w; x++) {
          if (grid[y][x].type === "stone")
            slots.push({ x, y });
        }
      }
      const count = Math.min(Math.max(1, Math.floor(slots.length / 5)), opts.maxMonsters - monsters.length);
      for (let i = 0; i < count; i++) {
        const spot = slots[Math.floor(rng() * slots.length)];
        if (!spot)
          break;
        const monsterId = opts.monsterPool[Math.floor(rng() * opts.monsterPool.length)];
        if (monsterId)
          monsters.push({ x: spot.x, y: spot.y, id: monsterId });
      }
    }
    if (opts.bossId) {
      let bx = exit.x;
      let by = exit.y;
      const neighbors = [];
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
      ]) {
        const nx = bx + dx;
        const ny = by + dy;
        if (nx >= 0 && ny >= 0 && nx < width && ny < height && grid[ny][nx].type === "stone") {
          neighbors.push({ x: nx, y: ny });
        }
      }
      const spot = neighbors.length > 0 ? neighbors[Math.floor(rng() * neighbors.length)] : { x: exit.x + 1, y: exit.y };
      monsters.push({ x: spot.x, y: spot.y, id: opts.bossId });
    }
    for (let i = 0; i < 3; i++) {
      for (let attempt = 0; attempt < 50; attempt++) {
        const x = 1 + Math.floor(rng() * (width - 2));
        const y = 1 + Math.floor(rng() * (height - 2));
        if (grid[y][x].type === "stone" && grid[y][x].variant !== "entrance") {
          traps.push({ x, y });
          break;
        }
      }
    }
    return {
      id: opts.id,
      name: opts.name,
      depth: opts.depth,
      floor: opts.floor ?? 1,
      width,
      height,
      grid,
      entry,
      exit,
      monsters,
      chests,
      traps
    };
  }
  function renderGrid(grid, highlight, maskUnexplored = false) {
    const glyphs = [];
    for (let y = 0; y < grid.length; y++) {
      let row = "";
      for (let x = 0; x < grid[y].length; x++) {
        if (highlight && highlight.x === x && highlight.y === y) {
          row += "@";
          continue;
        }
        const tile = grid[y][x];
        if (maskUnexplored && !tile.explored) {
          row += "?";
          continue;
        }
        const glyph = TILE_DEFS[tile.type]?.glyph ?? " ";
        row += tile.featureId && tile.featureId.startsWith("town") ? "T" : glyph;
      }
      glyphs.push(row);
    }
    return glyphs.join("\n");
  }
  function neighborsOf(grid, pos) {
    const out = [];
    for (const key of Object.keys(DIRECTION_DELTAS)) {
      const d = DIRECTION_DELTAS[key];
      const x = pos.x + d.x;
      const y = pos.y + d.y;
      if (x >= 0 && y >= 0 && y < grid.length && x < grid[y].length)
        out.push({ x, y });
    }
    return out;
  }

  // dist/map/world.js
  var WorldMap = class _WorldMap {
    grid;
    constructor(grid) {
      this.grid = grid;
    }
    get width() {
      return this.grid[0]?.length ?? 0;
    }
    get height() {
      return this.grid.length;
    }
    inBounds(x, y) {
      return x >= 0 && y >= 0 && y < this.grid.length && x < this.grid[y].length;
    }
    get(x, y) {
      const tile = this.grid[y]?.[x];
      if (!tile)
        throw new Error(`tile out of bounds: ${x},${y}`);
      return tile;
    }
    isWalkable(x, y) {
      return this.inBounds(x, y) && this.grid[y][x].walkable;
    }
    isExplored(x, y) {
      return this.inBounds(x, y) && this.grid[y][x].explored;
    }
    reveal(x, y, radius) {
      let revealed = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy > radius * radius)
            continue;
          const nx = x + dx;
          const ny = y + dy;
          if (!this.inBounds(nx, ny))
            continue;
          if (!this.grid[ny][nx].explored) {
            this.grid[ny][nx].explored = true;
            revealed++;
          }
        }
      }
      return revealed;
    }
    neighbors(pos) {
      return neighborsOf(this.grid, pos).filter((n2) => this.grid[n2.y][n2.x].walkable);
    }
    findPath(from, to, maxIterations = 1e5) {
      if (!this.isWalkable(from.x, from.y) || !this.isWalkable(to.x, to.y))
        return null;
      const w = this.width;
      const key = (x, y) => y * w + x;
      const start = key(from.x, from.y);
      const goal = key(to.x, to.y);
      if (start === goal)
        return [{ ...from }];
      const open = [start];
      const cameFrom = /* @__PURE__ */ new Map();
      const gScore = /* @__PURE__ */ new Map([[start, 0]]);
      const fScore = /* @__PURE__ */ new Map([[start, 0]]);
      const closed = /* @__PURE__ */ new Set();
      const heuristic = (x, y) => Math.abs(x - to.x) + Math.abs(y - to.y);
      while (open.length > 0 && maxIterations-- > 0) {
        let bestIdx = 0;
        for (let i = 1; i < open.length; i++) {
          const k = open[i];
          if ((fScore.get(k) ?? Infinity) < (fScore.get(open[bestIdx]) ?? Infinity))
            bestIdx = i;
        }
        const current = open.splice(bestIdx, 1)[0];
        if (current === goal) {
          const path = [];
          let node = current;
          while (node !== start) {
            path.push({ x: node % w, y: Math.floor(node / w) });
            node = cameFrom.get(node);
          }
          path.push({ ...from });
          path.reverse();
          return path;
        }
        closed.add(current);
        const cx = current % w;
        const cy = Math.floor(current / w);
        for (const d of Object.values(DIRECTION_DELTAS)) {
          const nx = cx + d.x;
          const ny = cy + d.y;
          if (!this.isWalkable(nx, ny))
            continue;
          const nkey = key(nx, ny);
          if (closed.has(nkey))
            continue;
          const tentative = (gScore.get(current) ?? 0) + 1;
          if (tentative < (gScore.get(nkey) ?? Infinity)) {
            cameFrom.set(nkey, current);
            gScore.set(nkey, tentative);
            fScore.set(nkey, tentative + heuristic(nx, ny));
            if (!open.includes(nkey))
              open.push(nkey);
          }
        }
      }
      return null;
    }
    stepAlong(path, from) {
      if (path.length === 0)
        return { ...from };
      const next = path.find((p) => p.x !== from.x || p.y !== from.y) ?? path[0];
      return { x: next.x, y: next.y };
    }
    render(highlight, maskUnexplored = true) {
      return renderGrid(this.grid, highlight, maskUnexplored);
    }
    toData() {
      return this.grid;
    }
    static fromData(grid) {
      return new _WorldMap(grid);
    }
  };

  // dist/data/classes.js
  function cls(id, name, description, baseStats, skills, startingWeapon, startingArmor, startingItems, startingGold = 50) {
    return { id, name, description, baseStats, skills, startingWeapon, startingArmor, startingItems, startingGold };
  }
  var CLASSES = {
    warrior: cls("warrior", "Warrior", "A frontline fighter who hits hard and endures blows.", { str: 5, dex: 3, con: 5, int: 2, wis: 2, cha: 2, luck: 2 }, ["power-strike", "shield-bash", "war-cry"], "rusty-sword", "cloth-robe", [
      { id: "minor-healing-potion", count: 2 },
      { id: "torch", count: 1 }
    ], 50),
    ranger: cls("ranger", "Ranger", "A hunter of the wilds, swift and deadly with a blade.", { str: 3, dex: 5, con: 3, int: 3, wis: 2, cha: 2, luck: 3 }, ["power-strike", "poison-strike"], "dagger", "leather-armor", [
      { id: "minor-healing-potion", count: 2 },
      { id: "torch", count: 1 },
      { id: "ration", count: 2 }
    ], 50),
    mage: cls("mage", "Mage", "A scholar of destructive arcana, frail but devastating.", { str: 2, dex: 3, con: 3, int: 5, wis: 4, cha: 2, luck: 2 }, ["fireball", "ice-shard", "lightning-bolt"], "oak-staff", "cloth-robe", [
      { id: "minor-healing-potion", count: 2 },
      { id: "mana-potion", count: 1 },
      { id: "torch", count: 1 }
    ], 50),
    cleric: cls("cleric", "Cleric", "A holy servant who mends wounds and wards the faithful.", { str: 3, dex: 2, con: 4, int: 3, wis: 5, cha: 3, luck: 2 }, ["heal", "cleanse", "shield-of-faith"], "oak-staff", "cloth-robe", [
      { id: "minor-healing-potion", count: 2 },
      { id: "torch", count: 1 }
    ], 50),
    rogue: cls("rogue", "Rogue", "A shadow who strikes where it hurts most.", { str: 3, dex: 6, con: 3, int: 3, wis: 2, cha: 2, luck: 3 }, ["backstab", "poison-strike"], "dagger", "leather-armor", [
      { id: "minor-healing-potion", count: 2 },
      { id: "torch", count: 1 }
    ], 60),
    paladin: cls("paladin", "Paladin", "A holy knight who smites the unholy and shields the faithful.", { str: 4, dex: 3, con: 5, int: 2, wis: 5, cha: 2, luck: 2 }, ["holy-smite", "divine-heal", "holy-shield"], "cudgel", "buckler", [
      { id: "minor-healing-potion", count: 2 },
      { id: "torch", count: 1 }
    ], 50),
    bard: cls("bard", "Bard", "A wandering minstrel whose songs heal allies and unravel foes.", { str: 2, dex: 4, con: 3, int: 4, wis: 2, cha: 6, luck: 3 }, ["inspiring-song", "haunting-melody", "lullaby"], "training-lute", "cloth-robe", [
      { id: "minor-healing-potion", count: 2 },
      { id: "mana-potion", count: 1 },
      { id: "torch", count: 1 }
    ], 60),
    "dw-hero": cls("dw-hero", "Hero", "The descendant of Erdrick, called to defeat the Dragonlord and save Alefgard. (Dragon Warrior mode)", { str: 6, dex: 4, con: 5, int: 4, wis: 3, cha: 3, luck: 3 }, [], "dw-bamboo-pole", "dw-cloth", [{ id: "dw-herb", count: 2 }], 0)
  };
  function classDef(id) {
    const def = CLASSES[id];
    if (!def)
      throw new Error(`unknown class: ${id}`);
    return def;
  }

  // dist/data/items.js
  function eq(id, name, type, description, extra = {}) {
    return {
      id,
      name,
      type,
      stackable: type === "consumable" || type === "material" || type === "quest" || type === "key",
      maxStack: type === "consumable" || type === "material" ? 99 : 10,
      value: 1,
      description,
      ...extra
    };
  }
  var ITEMS = {
    "rusty-sword": eq("rusty-sword", "Rusty Sword", "weapon", "A worn blade that has seen better days.", {
      slot: "weapon",
      attackBonus: 3,
      value: 5,
      stackable: false
    }),
    dagger: eq("dagger", "Dagger", "weapon", "A small, quick blade.", {
      slot: "weapon",
      attackBonus: 4,
      stats: { dex: 1 },
      value: 15,
      stackable: false
    }),
    cudgel: eq("cudgel", "Cudgel", "weapon", "A weighted club bound in prayer cloth.", {
      slot: "weapon",
      attackBonus: 4,
      stats: { str: 1 },
      value: 20,
      stackable: false
    }),
    "training-lute": eq("training-lute", "Training Lute", "weapon", "A simple lute with a pleasing tone.", {
      slot: "weapon",
      attackBonus: 3,
      magicBonus: 2,
      stats: { cha: 1 },
      value: 25,
      stackable: false
    }),
    "iron-sword": eq("iron-sword", "Iron Sword", "weapon", "A reliable soldier's sword.", {
      slot: "weapon",
      attackBonus: 6,
      stats: { str: 1 },
      value: 30,
      stackable: false
    }),
    "steel-sword": eq("steel-sword", "Steel Sword", "weapon", "A finely tempered blade.", {
      slot: "weapon",
      attackBonus: 10,
      stats: { str: 2 },
      value: 80,
      stackable: false
    }),
    "dwarven-axe": eq("dwarven-axe", "Dwarven Axe", "weapon", "Heavy and unforgiving.", {
      slot: "weapon",
      attackBonus: 12,
      stats: { str: 3 },
      value: 140,
      stackable: false
    }),
    "war-hammer": eq("war-hammer", "War Hammer", "weapon", "Crushes armor with ease.", {
      slot: "weapon",
      attackBonus: 11,
      stats: { str: 2 },
      value: 130,
      stackable: false
    }),
    greatsword: eq("greatsword", "Greatsword", "weapon", "A massive two-handed sword.", {
      slot: "weapon",
      attackBonus: 14,
      stats: { str: 4 },
      value: 200,
      stackable: false
    }),
    "elven-bow": eq("elven-bow", "Elven Bow", "weapon", "A graceful bow of the forest folk.", {
      slot: "weapon",
      attackBonus: 9,
      stats: { dex: 2 },
      value: 120,
      stackable: false
    }),
    "oak-staff": eq("oak-staff", "Oak Staff", "weapon", "A staff humming with latent magic.", {
      slot: "weapon",
      attackBonus: 3,
      magicBonus: 5,
      stats: { int: 1 },
      value: 45,
      stackable: false
    }),
    "apprentice-rod": eq("apprentice-rod", "Apprentice Rod", "weapon", "A beginner's focus.", {
      slot: "weapon",
      attackBonus: 2,
      magicBonus: 3,
      value: 25,
      stackable: false
    }),
    "mace-of-light": eq("mace-of-light", "Mace of Light", "weapon", "A radiant mace that smites the unholy.", {
      slot: "weapon",
      attackBonus: 8,
      magicBonus: 4,
      stats: { str: 1, wis: 1 },
      value: 100,
      stackable: false
    }),
    "lute-of-bard": eq("lute-of-bard", "Bard's Lute", "weapon", "Strings that charm beasts and men alike.", {
      slot: "weapon",
      attackBonus: 5,
      magicBonus: 4,
      stats: { cha: 2, luck: 1 },
      value: 95,
      stackable: false
    }),
    "holy-ward": eq("holy-ward", "Holy Ward", "armor", "Robes warded against dark magic.", {
      slot: "armor",
      defenseBonus: 9,
      resistBonus: 5,
      stats: { wis: 1 },
      value: 140,
      stackable: false
    }),
    "silver-charm": eq("silver-charm", "Silver Charm", "accessory", "A lucky charm that wards misfortune.", {
      slot: "accessory",
      stats: { luck: 2 },
      resistBonus: 2,
      value: 90,
      stackable: false
    }),
    "cloth-robe": eq("cloth-robe", "Cloth Robe", "armor", "Simple padded clothing.", {
      slot: "armor",
      defenseBonus: 2,
      magicBonus: 2,
      value: 10,
      stackable: false
    }),
    "leather-armor": eq("leather-armor", "Leather Armor", "armor", "Cured animal hide.", {
      slot: "armor",
      defenseBonus: 5,
      value: 40,
      stackable: false
    }),
    chainmail: eq("chainmail", "Chainmail", "armor", "Interlocking metal rings.", {
      slot: "armor",
      defenseBonus: 9,
      stats: { con: 1 },
      value: 90,
      stackable: false
    }),
    "plate-armor": eq("plate-armor", "Plate Armor", "armor", "Heavy forged plating.", {
      slot: "armor",
      defenseBonus: 13,
      stats: { con: 2 },
      value: 180,
      stackable: false
    }),
    "kings-robe": eq("kings-robe", "Archmage Robe", "armor", "Robes of a royal caster.", {
      slot: "armor",
      defenseBonus: 8,
      resistBonus: 5,
      magicBonus: 4,
      value: 160,
      stackable: false
    }),
    buckler: eq("buckler", "Buckler", "armor", "A small parry shield.", {
      slot: "armor",
      defenseBonus: 3,
      value: 25,
      stackable: false
    }),
    "rune-shield": eq("rune-shield", "Rune Shield", "armor", "Wards carved into ancient metal.", {
      slot: "armor",
      defenseBonus: 8,
      resistBonus: 4,
      value: 150,
      stackable: false
    }),
    "iron-ring": eq("iron-ring", "Iron Ring", "accessory", "A plain ring with a bit of heft.", {
      slot: "accessory",
      stats: { str: 1 },
      value: 20,
      stackable: false
    }),
    "emerald-amulet": eq("emerald-amulet", "Emerald Amulet", "accessory", "Enhances wisdom.", {
      slot: "accessory",
      stats: { wis: 2 },
      value: 100,
      stackable: false
    }),
    "fox-talisman": eq("fox-talisman", "Fox Talisman", "accessory", "Brings nimble luck.", {
      slot: "accessory",
      stats: { dex: 1, luck: 1 },
      value: 75,
      stackable: false
    }),
    "mage-crown": eq("mage-crown", "Mage Crown", "accessory", "Crackles with stored power.", {
      slot: "accessory",
      stats: { int: 2 },
      magicBonus: 4,
      value: 180,
      stackable: false
    }),
    "warrior-gauntlets": eq("warrior-gauntlets", "Warrior Gauntlets", "accessory", "Sturdy fighting gloves.", {
      slot: "accessory",
      stats: { str: 2, con: 1 },
      value: 110,
      stackable: false
    }),
    "minor-healing-potion": eq("minor-healing-potion", "Minor Healing Potion", "consumable", "Restores 20 HP.", {
      healHp: 20,
      value: 8
    }),
    "healing-potion": eq("healing-potion", "Healing Potion", "consumable", "Restores 55 HP.", {
      healHp: 55,
      value: 25
    }),
    "greater-healing-potion": eq("greater-healing-potion", "Greater Healing Potion", "consumable", "Restores 130 HP.", {
      healHp: 130,
      value: 70
    }),
    "mana-potion": eq("mana-potion", "Mana Potion", "consumable", "Restores 40 MP.", {
      healMp: 40,
      value: 30
    }),
    "ether-potion": eq("ether-potion", "Ether Potion", "consumable", "Restores 90 MP.", {
      healMp: 90,
      value: 75
    }),
    antidote: eq("antidote", "Antidote", "consumable", "Cures poison.", {
      cures: ["poison"],
      value: 15
    }),
    torch: eq("torch", "Torch", "consumable", "Lights the dark.", {
      value: 3
    }),
    ration: eq("ration", "Ration", "consumable", "Dry trail food. Restores 12 HP.", {
      healHp: 12,
      value: 5
    }),
    herb: eq("herb", "Herb", "material", "A pungent medicinal plant.", {
      value: 4
    }),
    "water-flask": eq("water-flask", "Water Flask", "material", "Fresh spring water.", {
      value: 2
    }),
    "iron-ore": eq("iron-ore", "Iron Ore", "material", "Raw iron, waiting for a forge.", {
      value: 6
    }),
    coal: eq("coal", "Coal", "material", "Black fuel for the furnace.", {
      value: 3
    }),
    leather: eq("leather", "Leather", "material", "Tanned animal hide.", {
      value: 5
    }),
    wood: eq("wood", "Wood", "material", "Sturdy cut timber.", {
      value: 2
    }),
    "spider-silk": eq("spider-silk", "Spider Silk", "material", "Fine, strong webbing.", {
      value: 12
    }),
    "beast-meat": eq("beast-meat", "Beast Meat", "material", "Raw game meat.", {
      value: 4
    }),
    "venom-gland": eq("venom-gland", "Venom Gland", "material", "Dripping with toxin.", {
      value: 9
    }),
    "essence-of-fire": eq("essence-of-fire", "Essence of Fire", "material", "A captured flame spirit.", {
      value: 40
    }),
    "dungeon-key": eq("dungeon-key", "Dungeon Key", "key", "Opens a dungeon door.", {
      value: 20
    }),
    "elder-letter": eq("elder-letter", "Elder's Letter", "quest", "A sealed letter for the scholar.", {
      value: 0
    }),
    "ancient-relic": eq("ancient-relic", "Ancient Relic", "quest", "A relic of a lost age.", {
      value: 0
    }),
    "dragon-scale": eq("dragon-scale", "Dragon Scale", "quest", "A shimmering scale from a dragon.", {
      value: 0
    }),
    gem: eq("gem", "Precious Gem", "material", "A glittering jewel.", {
      value: 60
    }),
    "platinum-sword": eq("platinum-sword", "Platinum Sword", "weapon", "A blade forged to cut through legends.", {
      slot: "weapon",
      attackBonus: 12,
      stats: { str: 3 },
      value: 900,
      stackable: false
    }),
    "dragon-king-crown": eq("dragon-king-crown", "Dragon King Crown", "accessory", "Warm with the memory of dragonfire.", {
      slot: "accessory",
      stats: { int: 3, wis: 2 },
      magicBonus: 6,
      resistBonus: 4,
      value: 1200,
      stackable: false
    }),
    "wyrm-heart": eq("wyrm-heart", "Wyrm Heart", "material", "A still-warm dragon heart.", {
      value: 500
    }),
    "avatar-core": eq("avatar-core", "Avatar Core", "key", "The crystallized essence of the Tower's Avatar.", {
      value: 0
    }),
    "colossus-core": eq("colossus-core", "Colossus Core", "material", "The beating heart of a ruined giant.", {
      value: 700
    }),
    "warlord-blade": eq("warlord-blade", "Warlord Blade", "weapon", "A sword that never surrenders.", {
      slot: "weapon",
      attackBonus: 15,
      stats: { str: 4, dex: 1 },
      value: 1400,
      stackable: false
    }),
    "storm-essence": eq("storm-essence", "Storm Essence", "material", "A captive thundercloud.", {
      value: 400
    }),
    "tower-key": eq("tower-key", "Tower Key", "key", "Grants entry to the Tower of Ascension.", {
      value: 0
    }),
    "raid-whistle": eq("raid-whistle", "Raid Whistle", "key", "Summons the great raid bosses.", {
      value: 0
    }),
    "moon-tear": eq("moon-tear", "Moon Tear", "material", "A drop of crystallized moonlight.", {
      value: 550
    }),
    "void-crown": eq("void-crown", "Void Crown", "accessory", "A crown woven from extinguished stars.", {
      slot: "accessory",
      stats: { int: 4, wis: 3 },
      magicBonus: 8,
      resistBonus: 6,
      value: 1600,
      stackable: false
    }),
    "dw-bamboo-pole": eq("dw-bamboo-pole", "Bamboo Pole", "weapon", "A humble but serviceable pole. The Hero's first weapon.", {
      slot: "weapon",
      attackBonus: 2,
      value: 4,
      price: 10,
      stackable: false
    }),
    "dw-club": eq("dw-club", "Club", "weapon", "A heavy knotted cudgel.", {
      slot: "weapon",
      attackBonus: 3,
      value: 10,
      price: 40,
      stackable: false
    }),
    "dw-copper-sword": eq("dw-copper-sword", "Copper Sword", "weapon", "A bronze blade that outclasses the bamboo pole.", {
      slot: "weapon",
      attackBonus: 6,
      value: 67,
      price: 120,
      stackable: false
    }),
    "dw-hand-axe": eq("dw-hand-axe", "Hand Axe", "weapon", "A bearded axe balanced for throwing.", {
      slot: "weapon",
      attackBonus: 9,
      value: 120,
      price: 400,
      stackable: false
    }),
    "dw-broad-sword": eq("dw-broad-sword", "Broad Sword", "weapon", "A wide, heavy sword of the royal guard.", {
      slot: "weapon",
      attackBonus: 12,
      value: 300,
      price: 1500,
      stackable: false
    }),
    "dw-flame-sword": eq("dw-flame-sword", "Flame Sword", "weapon", "A blade that crackles with eternal flame.", {
      slot: "weapon",
      attackBonus: 16,
      value: 700,
      price: 5800,
      stackable: false
    }),
    "dw-eridricks-sword": eq("dw-eridricks-sword", "Erdrick's Sword", "weapon", "The legendary sword of Erdrick, mightiest in all Alefgard.", {
      slot: "weapon",
      attackBonus: 24,
      stats: { str: 2 },
      value: 4e3,
      stackable: false
    }),
    "dw-cloth": eq("dw-cloth", "Cloth", "armor", "Light traveling clothes.", {
      slot: "armor",
      defenseBonus: 2,
      value: 7,
      price: 20,
      stackable: false
    }),
    "dw-leather": eq("dw-leather", "Leather Armor", "armor", "Tough hide that turns claws and blades.", {
      slot: "armor",
      defenseBonus: 5,
      value: 20,
      price: 70,
      stackable: false
    }),
    "dw-chain": eq("dw-chain", "Chain Mail", "armor", "Interlocking rings of hardened steel.", {
      slot: "armor",
      defenseBonus: 8,
      value: 53,
      price: 300,
      stackable: false
    }),
    "dw-half-plate": eq("dw-half-plate", "Half Plate", "armor", "A sturdy chest piece over mail.", {
      slot: "armor",
      defenseBonus: 11,
      value: 133,
      price: 1e3,
      stackable: false
    }),
    "dw-full-plate": eq("dw-full-plate", "Full Plate", "armor", "Complete plate armor of the finest smiths.", {
      slot: "armor",
      defenseBonus: 14,
      value: 400,
      price: 3e3,
      stackable: false
    }),
    "dw-magic-armor": eq("dw-magic-armor", "Magic Armor", "armor", "Enchanted armor that guards against dark arts.", {
      slot: "armor",
      defenseBonus: 16,
      magicBonus: 4,
      value: 1200,
      price: 7700,
      stackable: false
    }),
    "dw-eridricks-armor": eq("dw-eridricks-armor", "Erdrick's Armor", "armor", "The legendary armor of Erdrick.", {
      slot: "armor",
      defenseBonus: 24,
      stats: { con: 2 },
      value: 6e3,
      stackable: false
    }),
    "dw-small-shield": eq("dw-small-shield", "Small Shield", "accessory", "A light buckler.", {
      slot: "accessory",
      defenseBonus: 3,
      value: 26,
      price: 90,
      stackable: false
    }),
    "dw-large-shield": eq("dw-large-shield", "Large Shield", "accessory", "A tower of wood and iron.", {
      slot: "accessory",
      defenseBonus: 6,
      value: 133,
      price: 800,
      stackable: false
    }),
    "dw-silver-shield": eq("dw-silver-shield", "Silver Shield", "accessory", "A radiant shield of polished silver.", {
      slot: "accessory",
      defenseBonus: 10,
      value: 600,
      price: 14800,
      stackable: false
    }),
    "dw-eridricks-shield": eq("dw-eridricks-shield", "Erdrick's Shield", "accessory", "The legendary shield of Erdrick.", {
      slot: "accessory",
      defenseBonus: 14,
      value: 4500,
      stackable: false
    }),
    "dw-herb": eq("dw-herb", "Herb", "consumable", "A medicinal herb that restores 30 HP.", {
      healHp: 30,
      value: 7,
      price: 26
    }),
    "dw-torch": eq("dw-torch", "Torch", "consumable", "A burning brand that reveals the dark of caves.", {
      value: 6,
      price: 20
    }),
    "dw-fairy-water": eq("dw-fairy-water", "Fairy Water", "consumable", "Sprinkled water that repels monsters for a while.", {
      value: 8,
      price: 40
    }),
    "dw-wing": eq("dw-wing", "Wing", "consumable", "A magical wing that carries you to the last town you visited.", {
      value: 20,
      price: 70
    }),
    "dw-key": eq("dw-key", "Magic Key", "key", "Opens magically locked doors in the Dragonlord's castle.", {
      value: 20,
      price: 93
    })
  };
  function itemDef(id) {
    const def = ITEMS[id];
    if (!def)
      throw new Error(`unknown item: ${id}`);
    return def;
  }

  // dist/data/skills.js
  function skill(id, name, description, extra) {
    return {
      id,
      name,
      description,
      mpCost: 4,
      power: 1,
      usesMagic: false,
      targets: "enemy",
      element: "physical",
      ...extra
    };
  }
  var SKILLS = {
    "power-strike": skill("power-strike", "Power Strike", "A heavy blow with your weapon.", {
      mpCost: 4,
      power: 1.8,
      element: "physical"
    }),
    backstab: skill("backstab", "Backstab", "A vicious strike from the shadows.", {
      mpCost: 5,
      power: 2.2,
      element: "physical"
    }),
    "shield-bash": skill("shield-bash", "Shield Bash", "Stun the target with your shield.", {
      mpCost: 6,
      power: 1.2,
      element: "physical",
      effect: "stun",
      effectChance: 0.6,
      effectDuration: 1
    }),
    fireball: skill("fireball", "Fireball", "Hurl a sphere of flame.", {
      mpCost: 8,
      power: 2.4,
      usesMagic: true,
      element: "fire",
      effect: "burn",
      effectChance: 0.5,
      effectPower: 0.15,
      effectDuration: 3
    }),
    "ice-shard": skill("ice-shard", "Ice Shard", "Piercing shard of frozen mana.", {
      mpCost: 6,
      power: 1.8,
      usesMagic: true,
      element: "ice"
    }),
    "lightning-bolt": skill("lightning-bolt", "Lightning Bolt", "Arc of raw lightning.", {
      mpCost: 10,
      power: 2.8,
      usesMagic: true,
      element: "lightning"
    }),
    heal: skill("heal", "Heal", "Restore a friendly target's HP.", {
      mpCost: 7,
      power: 2.2,
      usesMagic: true,
      targets: "ally",
      element: "holy"
    }),
    cleanse: skill("cleanse", "Cleanse", "Remove status ailments from an ally.", {
      mpCost: 6,
      power: 0,
      usesMagic: true,
      targets: "ally",
      element: "holy"
    }),
    "shield-of-faith": skill("shield-of-faith", "Shield of Faith", "A protective ward on an ally.", {
      mpCost: 8,
      power: 0.35,
      usesMagic: true,
      targets: "ally",
      element: "holy",
      effect: "shield",
      effectChance: 1,
      effectDuration: 3
    }),
    "poison-strike": skill("poison-strike", "Poison Strike", "A blade coated in venom.", {
      mpCost: 6,
      power: 1.5,
      element: "physical",
      effect: "poison",
      effectChance: 0.7,
      effectPower: 0.15,
      effectDuration: 3
    }),
    "shadow-bolt": skill("shadow-bolt", "Shadow Bolt", "Foul necrotic energy.", {
      mpCost: 9,
      power: 2.2,
      usesMagic: true,
      element: "shadow"
    }),
    "war-cry": skill("war-cry", "War Cry", "Brace yourself, taking less damage.", {
      mpCost: 5,
      power: 0.2,
      targets: "self",
      element: "physical",
      effect: "shield",
      effectChance: 1,
      effectDuration: 2
    }),
    "holy-smite": skill("holy-smite", "Holy Smite", "Radiant judgment that sears the wicked.", {
      mpCost: 7,
      power: 2.2,
      usesMagic: true,
      element: "holy",
      effect: "burn",
      effectChance: 0.3,
      effectPower: 0.1,
      effectDuration: 2
    }),
    "divine-heal": skill("divine-heal", "Divine Heal", "A stronger prayer that mends flesh and spirit.", {
      mpCost: 10,
      power: 3.2,
      usesMagic: true,
      targets: "ally",
      element: "holy"
    }),
    "holy-shield": skill("holy-shield", "Holy Shield", "A shimmering ward of divine protection.", {
      mpCost: 8,
      power: 0.5,
      usesMagic: true,
      targets: "self",
      element: "holy",
      effect: "shield",
      effectChance: 1,
      effectDuration: 3
    }),
    "inspiring-song": skill("inspiring-song", "Inspiring Song", "A rousing melody that mends the spirit over time.", {
      mpCost: 7,
      power: 0.12,
      usesMagic: true,
      targets: "ally",
      element: "physical",
      effect: "regen",
      effectChance: 1,
      effectDuration: 3
    }),
    "haunting-melody": skill("haunting-melody", "Haunting Melody", "A discordant tune of fading shadows.", {
      mpCost: 8,
      power: 2,
      usesMagic: true,
      element: "shadow"
    }),
    lullaby: skill("lullaby", "Lullaby", "A sleep-like daze that stuns the target.", {
      mpCost: 6,
      power: 0.4,
      usesMagic: true,
      element: "shadow",
      effect: "stun",
      effectChance: 0.8,
      effectDuration: 1
    }),
    "flame-orb": skill("flame-orb", "Flame Orb", "A searing orb of condensed fire.", {
      mpCost: 12,
      power: 3.4,
      usesMagic: true,
      element: "fire",
      effect: "burn",
      effectChance: 0.5,
      effectPower: 0.15,
      effectDuration: 3,
      levelReq: 5,
      skillPointCost: 1
    }),
    "frost-armor": skill("frost-armor", "Frost Armor", "A sheath of ice that wards off blows.", {
      mpCost: 8,
      power: 0.45,
      usesMagic: true,
      targets: "self",
      element: "ice",
      effect: "shield",
      effectChance: 1,
      effectDuration: 4,
      levelReq: 8,
      skillPointCost: 1
    }),
    "mega-bash": skill("mega-bash", "Mega Bash", "A bone-crunching shield slam.", {
      mpCost: 9,
      power: 2,
      element: "physical",
      effect: "stun",
      effectChance: 0.85,
      effectDuration: 1,
      levelReq: 10,
      skillPointCost: 1
    }),
    "venom-cloud": skill("venom-cloud", "Venom Cloud", "A choking cloud of toxic mist.", {
      mpCost: 12,
      power: 1.2,
      usesMagic: true,
      targets: "all-enemies",
      element: "physical",
      effect: "poison",
      effectChance: 0.9,
      effectPower: 0.18,
      effectDuration: 3,
      levelReq: 12,
      skillPointCost: 1
    }),
    "twin-strike": skill("twin-strike", "Twin Strike", "Two lightning-quick strikes.", {
      mpCost: 8,
      power: 2.6,
      element: "physical",
      levelReq: 15,
      skillPointCost: 1
    }),
    "battle-fury": skill("battle-fury", "Battle Fury", "Harden your resolve against harm.", {
      mpCost: 8,
      power: 0.4,
      targets: "self",
      element: "physical",
      effect: "shield",
      effectChance: 1,
      effectDuration: 3,
      levelReq: 18,
      skillPointCost: 1
    }),
    "thunder-storm": skill("thunder-storm", "Thunder Storm", "A crackling storm that lashes all foes.", {
      mpCost: 15,
      power: 2.2,
      usesMagic: true,
      targets: "all-enemies",
      element: "lightning",
      levelReq: 20,
      skillPointCost: 2
    }),
    "holy-judgment": skill("holy-judgment", "Holy Judgment", "Divine light smites every foe.", {
      mpCost: 16,
      power: 2.4,
      usesMagic: true,
      targets: "all-enemies",
      element: "holy",
      levelReq: 25,
      skillPointCost: 2
    }),
    "shadow-nova": skill("shadow-nova", "Shadow Nova", "A burst of pure void.", {
      mpCost: 14,
      power: 2.6,
      usesMagic: true,
      targets: "all-enemies",
      element: "shadow",
      levelReq: 30,
      skillPointCost: 2
    }),
    meteor: skill("meteor", "Meteor", "Call down a blazing meteor.", {
      mpCost: 18,
      power: 4,
      usesMagic: true,
      element: "fire",
      effect: "burn",
      effectChance: 0.7,
      effectPower: 0.2,
      effectDuration: 3,
      levelReq: 35,
      skillPointCost: 2
    }),
    "divine-wrath": skill("divine-wrath", "Divine Wrath", "The fury of the gods, unleashed.", {
      mpCost: 20,
      power: 4,
      usesMagic: true,
      element: "holy",
      effect: "burn",
      effectChance: 0.5,
      effectPower: 0.15,
      effectDuration: 2,
      levelReq: 50,
      skillPointCost: 3
    }),
    "world-breach": skill("world-breach", "World Breach", "Tear reality itself to shred every foe.", {
      mpCost: 25,
      power: 5,
      usesMagic: true,
      targets: "all-enemies",
      element: "shadow",
      levelReq: 75,
      skillPointCost: 4
    }),
    "dw-hurt": skill("dw-hurt", "Hurt", "A bolt of arcane force that harms a single foe.", {
      mpCost: 2,
      power: 1.2,
      usesMagic: true,
      element: "physical",
      levelReq: 3,
      mode: "dw"
    }),
    "dw-heal": skill("dw-heal", "Heal", "Restores the caster's HP.", {
      mpCost: 4,
      power: 2.4,
      usesMagic: true,
      targets: "self",
      element: "holy",
      levelReq: 3,
      mode: "dw"
    }),
    "dw-sleep": skill("dw-sleep", "Sleep", "Puts all enemies to sleep.", {
      mpCost: 3,
      power: 0.5,
      usesMagic: true,
      targets: "all-enemies",
      element: "shadow",
      effect: "stun",
      effectChance: 0.65,
      effectPower: 0.15,
      effectDuration: 2,
      levelReq: 3,
      mode: "dw"
    }),
    "dw-firebal": skill("dw-firebal", "Firebal", "A roaring blast of flame at a single foe.", {
      mpCost: 6,
      power: 2.6,
      usesMagic: true,
      element: "fire",
      levelReq: 7,
      mode: "dw"
    }),
    "dw-stopspell": skill("dw-stopspell", "StopSpell", "Seals an enemy's magic for a time.", {
      mpCost: 2,
      power: 0.4,
      usesMagic: true,
      element: "shadow",
      effect: "silence",
      effectChance: 0.8,
      effectPower: 0.1,
      effectDuration: 3,
      levelReq: 7,
      mode: "dw"
    }),
    "dw-firebreath": skill("dw-firebreath", "Firebreath", "A searing breath that scorches a hero's very soul, ignoring armor.", {
      mpCost: 4,
      power: 0.35,
      usesMagic: false,
      element: "fire",
      maxHpDamage: 0.35,
      mode: "dw"
    })
  };
  function skillDef(id) {
    const def = SKILLS[id];
    if (!def)
      throw new Error(`unknown skill: ${id}`);
    return def;
  }

  // dist/combat/character.js
  function mergeStats(base, bonus) {
    const out = { ...base };
    for (const key of STAT_KEYS) {
      if (bonus?.[key])
        out[key] += bonus[key];
    }
    return out;
  }
  function equipmentStats(equipment) {
    let attackBonus = 0;
    let defenseBonus = 0;
    let magicBonus = 0;
    let resistBonus = 0;
    const statBonus = {};
    for (const slot of EQUIPMENT_SLOTS) {
      const item = equipment[slot];
      if (!item)
        continue;
      const def = itemDef(item.id);
      attackBonus += def.attackBonus ?? 0;
      defenseBonus += def.defenseBonus ?? 0;
      magicBonus += def.magicBonus ?? 0;
      resistBonus += def.resistBonus ?? 0;
      if (def.stats) {
        for (const key of STAT_KEYS) {
          if (def.stats[key])
            statBonus[key] = (statBonus[key] ?? 0) + def.stats[key];
        }
      }
    }
    return { statBonus, attackBonus, defenseBonus, magicBonus, resistBonus };
  }
  function deriveStats(level, base, equipment) {
    const { statBonus, attackBonus, defenseBonus, magicBonus, resistBonus } = equipmentStats(equipment);
    const eff = mergeStats(base, statBonus);
    return {
      maxHp: Math.floor(20 + eff.con * 6 + level * 10),
      maxMp: Math.floor(10 + eff.int * 4 + eff.wis * 3),
      attack: Math.floor(eff.str * 2 + attackBonus + level),
      defense: Math.floor(2 + eff.con * 1.5 + defenseBonus),
      magic: Math.floor(eff.int * 2 + magicBonus),
      resist: Math.floor(eff.wis + resistBonus),
      speed: Math.floor(2 + eff.dex + level * 0.5),
      critChance: 0.05 + eff.luck * 0.01
    };
  }
  var LEVEL_CAP = 100;
  var standardXpToNext = (level) => {
    if (level >= LEVEL_CAP)
      return Infinity;
    return Math.floor(50 * Math.pow(level, 1.6));
  };
  var DW_LEVEL_CAP = 30;
  var DW_XP_DELTAS = [
    6,
    19,
    65,
    110,
    220,
    300,
    430,
    550,
    800,
    1e3,
    1300,
    1700,
    2e3,
    2500,
    3e3,
    4e3,
    5e3,
    6e3,
    7e3,
    8e3,
    1e4,
    12e3,
    14e3,
    16e3,
    19e3,
    21e3,
    24e3,
    25e3,
    3e4
  ];
  var dwXpToNext = (level) => {
    if (level < 1 || level >= DW_LEVEL_CAP)
      return Infinity;
    return DW_XP_DELTAS[level - 1];
  };
  var XP_CURVES = {
    standard: standardXpToNext,
    dw: dwXpToNext
  };
  function xpToNext(level) {
    return standardXpToNext(level);
  }
  function xpToNextFor(char, level) {
    const curve = XP_CURVES[char.xpCurveId ?? "standard"] ?? standardXpToNext;
    return curve(level);
  }
  function levelCapFor(char) {
    return char.levelCap ?? LEVEL_CAP;
  }
  var MILESTONES = {
    10: { title: "Veteran", skillPoints: 1 },
    25: { title: "Champion", skillPoints: 2 },
    50: { title: "Legend", skillPoints: 3 },
    100: { title: "Immortal", skillPoints: 5 }
  };
  function milestoneTitle(level) {
    return MILESTONES[level]?.title;
  }
  function milestonesCrossed(fromLevel, toLevel) {
    const crossed = [];
    for (let lvl = fromLevel + 1; lvl <= toLevel; lvl++) {
      if (MILESTONES[lvl])
        crossed.push(lvl);
    }
    return crossed;
  }
  function applyMilestone(char, level) {
    const m = MILESTONES[level];
    if (!m)
      return null;
    char.title = m.title;
    char.skillPoints = (char.skillPoints ?? 0) + m.skillPoints;
    return m;
  }
  function createCharacter(name, classId, rng, opts = {}) {
    const cls2 = classDef(classId);
    const weapon = { id: cls2.startingWeapon, count: 1, uid: rng.int(1, 1e9).toString(36) };
    const armor = { id: cls2.startingArmor, count: 1, uid: rng.int(1, 1e9).toString(36) };
    const equipment = {
      weapon,
      armor,
      accessory: null,
      trinket: null
    };
    const stats = { ...cls2.baseStats };
    const derived = deriveStats(1, stats, equipment);
    const items = [];
    for (const entry of cls2.startingItems) {
      items.push({ id: entry.id, count: entry.count, uid: rng.int(1, 1e9).toString(36) });
    }
    const char = {
      id: `pc-${rng.int(1, 1e9).toString(36)}`,
      name,
      classId,
      level: 1,
      xp: 0,
      xpToNext: 0,
      statPoints: 0,
      skillPoints: 0,
      title: void 0,
      stats,
      derived,
      hp: derived.maxHp,
      mp: derived.maxMp,
      gold: cls2.startingGold,
      inventory: { items, gold: cls2.startingGold, capacity: 30 },
      equipment,
      learnedSkills: [...cls2.skills],
      activeEffects: [],
      flags: {},
      xpCurveId: opts.xpCurveId,
      levelCap: opts.levelCap
    };
    char.xpToNext = xpToNextFor(char, 1);
    return char;
  }
  function recomputeDerived(char) {
    char.derived = deriveStats(char.level, char.stats, char.equipment);
    if (char.hp > char.derived.maxHp)
      char.hp = char.derived.maxHp;
    if (char.mp > char.derived.maxMp)
      char.mp = char.derived.maxMp;
  }
  function addXp(char, amount) {
    const cap = levelCapFor(char);
    char.xp += Math.max(0, amount);
    let levels = 0;
    while (char.level < cap && char.xp >= char.xpToNext) {
      char.xp -= char.xpToNext;
      char.level++;
      char.statPoints += 3;
      recomputeDerived(char);
      char.hp += Math.floor(char.derived.maxHp * 0.2);
      char.mp += Math.floor(char.derived.maxMp * 0.2);
      if (char.hp > char.derived.maxHp)
        char.hp = char.derived.maxHp;
      if (char.mp > char.derived.maxMp)
        char.mp = char.derived.maxMp;
      char.xpToNext = xpToNextFor(char, char.level);
      levels++;
    }
    if (char.level >= cap) {
      char.xp = Math.min(char.xp, xpToNextFor(char, char.level));
    }
    return levels;
  }
  function learnSkill(char, skillId) {
    const skill2 = skillDef(skillId);
    const required = skill2.levelReq ?? 1;
    if (char.level < required)
      return false;
    if (char.learnedSkills.includes(skillId))
      return false;
    const cost = skill2.skillPointCost ?? 1;
    if ((char.skillPoints ?? 0) < cost)
      return false;
    char.skillPoints -= cost;
    char.learnedSkills.push(skillId);
    return true;
  }
  function applyStatPoint(char, stat) {
    if (char.statPoints <= 0)
      return;
    char.stats[stat] += 1;
    char.statPoints--;
    recomputeDerived(char);
  }
  function characterSkills(char) {
    return char.learnedSkills.map((id) => skillDef(id));
  }
  var GRANTS_SKILLS = {
    "oak-staff": ["ice-shard"],
    "mace-of-light": ["holy-smite"],
    "lute-of-bard": ["haunting-melody"]
  };
  function addEquipmentSkill(char, itemId) {
    for (const skillId of GRANTS_SKILLS[itemId] ?? []) {
      if (!char.learnedSkills.includes(skillId))
        char.learnedSkills.push(skillId);
    }
  }
  function removeEquipmentSkill(char, itemId) {
    const grants = GRANTS_SKILLS[itemId];
    if (!grants)
      return;
    const classSkills = new Set(classDef(char.classId).skills);
    char.learnedSkills = char.learnedSkills.filter((s) => !grants.includes(s) || classSkills.has(s));
  }
  function itemStatsSummary(item) {
    const parts = [];
    if (item.attackBonus)
      parts.push(`ATK +${item.attackBonus}`);
    if (item.defenseBonus)
      parts.push(`DEF +${item.defenseBonus}`);
    if (item.magicBonus)
      parts.push(`MAG +${item.magicBonus}`);
    if (item.resistBonus)
      parts.push(`RES +${item.resistBonus}`);
    for (const key of STAT_KEYS) {
      const v = item.stats?.[key];
      if (v)
        parts.push(`${key.toUpperCase()} +${v}`);
    }
    if (item.healHp)
      parts.push(`Heals ${item.healHp} HP`);
    if (item.healMp)
      parts.push(`Restores ${item.healMp} MP`);
    return parts.join(", ") || "No effect";
  }

  // dist/data/monsters.js
  function enemy(id, name, level, extra) {
    const scale = level * 0.4;
    const def = {
      id,
      name,
      level,
      mp: 0,
      stats: {
        str: Math.round(4 + scale),
        dex: Math.round(3 + scale),
        con: Math.round(3 + scale),
        int: Math.round(2 + scale),
        wis: Math.round(2 + scale),
        cha: 1,
        luck: 1
      },
      attackBonus: 0,
      defenseBonus: 0,
      magicBonus: 0,
      resistBonus: 0,
      speedBonus: 0,
      skills: [],
      loot: [],
      resist: {},
      weaknesses: {},
      ai: "aggressive",
      boss: false,
      ...extra
    };
    def.hp = extra.hp;
    def.xp = extra.xp;
    def.goldMin = extra.goldMin;
    def.goldMax = extra.goldMax;
    if (extra.stats)
      def.stats = { ...def.stats, ...extra.stats };
    return def;
  }
  var MONSTERS = {
    rat: enemy("rat", "Giant Rat", 1, {
      hp: 15,
      xp: 8,
      goldMin: 1,
      goldMax: 3,
      stats: { str: 3, dex: 5, con: 2, int: 1, wis: 1, cha: 1, luck: 2 },
      loot: [
        { itemId: "beast-meat", chance: 0.4, min: 1, max: 1 },
        { itemId: "herb", chance: 0.25, min: 1, max: 1 }
      ]
    }),
    "giant-spider": enemy("giant-spider", "Giant Spider", 2, {
      hp: 22,
      xp: 14,
      goldMin: 2,
      goldMax: 5,
      stats: { str: 4, dex: 6, con: 3, int: 1, wis: 1, cha: 1, luck: 2 },
      skills: ["poison-strike"],
      ai: "smart",
      loot: [
        { itemId: "spider-silk", chance: 0.5, min: 1, max: 1 },
        { itemId: "venom-gland", chance: 0.3, min: 1, max: 1 }
      ]
    }),
    wolf: enemy("wolf", "Timber Wolf", 2, {
      hp: 25,
      xp: 16,
      goldMin: 1,
      goldMax: 4,
      stats: { str: 5, dex: 6, con: 4, int: 1, wis: 2, cha: 1, luck: 2 },
      loot: [
        { itemId: "beast-meat", chance: 0.5, min: 1, max: 2 },
        { itemId: "leather", chance: 0.25, min: 1, max: 1 }
      ]
    }),
    slime: enemy("slime", "Forest Slime", 2, {
      hp: 20,
      xp: 12,
      goldMin: 1,
      goldMax: 3,
      stats: { str: 2, dex: 2, con: 5, int: 1, wis: 1, cha: 1, luck: 1 },
      resist: { physical: 0.2 },
      loot: [
        { itemId: "herb", chance: 0.4, min: 1, max: 1 },
        { itemId: "water-flask", chance: 0.3, min: 1, max: 1 }
      ]
    }),
    zombie: enemy("zombie", "Rotting Zombie", 3, {
      hp: 40,
      xp: 25,
      goldMin: 2,
      goldMax: 6,
      stats: { str: 7, dex: 2, con: 6, int: 1, wis: 1, cha: 1, luck: 1 },
      resist: { physical: 0.2 },
      weaknesses: { holy: 0.3, fire: 0.2 },
      loot: [
        { itemId: "beast-meat", chance: 0.3, min: 1, max: 1 },
        { itemId: "herb", chance: 0.3, min: 1, max: 1 }
      ]
    }),
    ghost: enemy("ghost", "Wailing Ghost", 6, {
      hp: 45,
      mp: 30,
      xp: 60,
      goldMin: 8,
      goldMax: 20,
      stats: { str: 3, dex: 5, con: 4, int: 6, wis: 5, cha: 2, luck: 2 },
      magicBonus: 4,
      resist: { physical: 0.4, ice: 0.2, fire: 0.2 },
      weaknesses: { holy: 0.4 },
      skills: ["shadow-bolt"],
      ai: "smart",
      loot: [
        { itemId: "ancient-relic", chance: 0.15, min: 1, max: 1 },
        { itemId: "gem", chance: 0.15, min: 1, max: 1 }
      ]
    }),
    "shadow-wraith": enemy("shadow-wraith", "Shadow Wraith", 7, {
      hp: 70,
      mp: 50,
      xp: 80,
      goldMin: 12,
      goldMax: 28,
      stats: { str: 8, dex: 7, con: 5, int: 7, wis: 4, cha: 2, luck: 3 },
      magicBonus: 5,
      resist: { shadow: 0.5, physical: 0.2 },
      weaknesses: { holy: 0.3, fire: 0.2 },
      skills: ["shadow-bolt", "poison-strike"],
      ai: "smart",
      loot: [
        { itemId: "essence-of-fire", chance: 0.2, min: 1, max: 1 },
        { itemId: "silver-charm", chance: 0.08, min: 1, max: 1 },
        { itemId: "gem", chance: 0.2, min: 1, max: 1 }
      ]
    }),
    goblin: enemy("goblin", "Goblin", 3, {
      hp: 30,
      xp: 22,
      goldMin: 3,
      goldMax: 8,
      stats: { str: 5, dex: 5, con: 4, int: 2, wis: 1, cha: 1, luck: 2 },
      loot: [
        { itemId: "leather", chance: 0.3, min: 1, max: 1 },
        { itemId: "dungeon-key", chance: 0.12, min: 1, max: 1 },
        { itemId: "gem", chance: 0.05, min: 1, max: 1 }
      ]
    }),
    skeleton: enemy("skeleton", "Skeleton", 4, {
      hp: 35,
      xp: 30,
      goldMin: 4,
      goldMax: 10,
      stats: { str: 6, dex: 5, con: 4, int: 2, wis: 2, cha: 1, luck: 1 },
      resist: { physical: 0.15 },
      weaknesses: { holy: 0.25 },
      loot: [
        { itemId: "iron-ore", chance: 0.3, min: 1, max: 1 },
        { itemId: "coal", chance: 0.3, min: 1, max: 1 }
      ]
    }),
    bandit: enemy("bandit", "Bandit", 5, {
      hp: 45,
      xp: 40,
      goldMin: 6,
      goldMax: 15,
      stats: { str: 7, dex: 6, con: 5, int: 3, wis: 2, cha: 2, luck: 2 },
      skills: ["power-strike"],
      loot: [
        { itemId: "iron-sword", chance: 0.1, min: 1, max: 1 },
        { itemId: "minor-healing-potion", chance: 0.3, min: 1, max: 1 },
        { itemId: "leather", chance: 0.3, min: 1, max: 1 }
      ]
    }),
    "orc-warrior": enemy("orc-warrior", "Orc Warrior", 6, {
      hp: 60,
      xp: 55,
      goldMin: 8,
      goldMax: 20,
      stats: { str: 9, dex: 5, con: 7, int: 2, wis: 2, cha: 1, luck: 1 },
      skills: ["war-cry"],
      ai: "smart",
      loot: [
        { itemId: "war-hammer", chance: 0.05, min: 1, max: 1 },
        { itemId: "iron-ore", chance: 0.4, min: 1, max: 2 },
        { itemId: "leather", chance: 0.4, min: 1, max: 1 }
      ]
    }),
    troll: enemy("troll", "Cave Troll", 8, {
      hp: 100,
      xp: 90,
      goldMin: 12,
      goldMax: 30,
      stats: { str: 12, dex: 4, con: 10, int: 2, wis: 2, cha: 1, luck: 1 },
      resist: { physical: 0.2 },
      weaknesses: { fire: 0.3 },
      ai: "defensive",
      loot: [
        { itemId: "beast-meat", chance: 0.8, min: 1, max: 2 },
        { itemId: "leather", chance: 0.6, min: 1, max: 2 }
      ]
    }),
    "dark-wizard": enemy("dark-wizard", "Dark Wizard", 8, {
      hp: 55,
      mp: 60,
      xp: 95,
      goldMin: 15,
      goldMax: 35,
      stats: { str: 3, dex: 4, con: 4, int: 11, wis: 7, cha: 2, luck: 2 },
      attackBonus: 0,
      magicBonus: 6,
      resistBonus: 4,
      skills: ["fireball", "shadow-bolt"],
      ai: "smart",
      weaknesses: { holy: 0.2 },
      loot: [
        { itemId: "essence-of-fire", chance: 0.3, min: 1, max: 1 },
        { itemId: "mana-potion", chance: 0.4, min: 1, max: 1 },
        { itemId: "mage-crown", chance: 0.05, min: 1, max: 1 }
      ]
    }),
    golem: enemy("golem", "Stone Golem", 10, {
      hp: 140,
      xp: 120,
      goldMin: 20,
      goldMax: 45,
      stats: { str: 13, dex: 3, con: 12, int: 1, wis: 3, cha: 1, luck: 1 },
      attackBonus: 3,
      defenseBonus: 6,
      resist: { physical: 0.4, fire: 0.2, ice: 0.2 },
      weaknesses: { lightning: 0.3 },
      ai: "defensive",
      loot: [
        { itemId: "iron-ore", chance: 0.7, min: 1, max: 3 },
        { itemId: "coal", chance: 0.6, min: 1, max: 2 },
        { itemId: "plate-armor", chance: 0.05, min: 1, max: 1 }
      ]
    }),
    dragon: enemy("dragon", "Young Dragon", 12, {
      hp: 220,
      mp: 80,
      xp: 200,
      goldMin: 50,
      goldMax: 120,
      stats: { str: 15, dex: 9, con: 13, int: 8, wis: 6, cha: 4, luck: 3 },
      attackBonus: 5,
      magicBonus: 8,
      resistBonus: 5,
      skills: ["fireball", "power-strike"],
      ai: "smart",
      resist: { fire: 0.5, physical: 0.2 },
      weaknesses: { ice: 0.2 },
      boss: true,
      loot: [
        { itemId: "dragon-scale", chance: 1, min: 1, max: 2 },
        { itemId: "gem", chance: 0.6, min: 1, max: 2 }
      ]
    }),
    lich: enemy("lich", "Lich", 12, {
      hp: 160,
      mp: 120,
      xp: 210,
      goldMin: 40,
      goldMax: 90,
      stats: { str: 5, dex: 5, con: 8, int: 14, wis: 10, cha: 3, luck: 2 },
      magicBonus: 10,
      resistBonus: 8,
      skills: ["shadow-bolt", "fireball", "shield-of-faith"],
      ai: "smart",
      resist: { shadow: 0.5, fire: 0.2 },
      weaknesses: { holy: 0.3 },
      boss: true,
      loot: [
        { itemId: "ancient-relic", chance: 0.3, min: 1, max: 1 },
        { itemId: "greater-healing-potion", chance: 0.5, min: 1, max: 2 }
      ]
    }),
    demon: enemy("demon", "Hell Demon", 14, {
      hp: 260,
      mp: 100,
      xp: 260,
      goldMin: 60,
      goldMax: 140,
      stats: { str: 17, dex: 8, con: 14, int: 9, wis: 5, cha: 2, luck: 2 },
      attackBonus: 6,
      magicBonus: 6,
      resistBonus: 6,
      skills: ["fireball", "shadow-bolt", "power-strike"],
      ai: "smart",
      resist: { fire: 0.5, shadow: 0.5 },
      weaknesses: { holy: 0.3, ice: 0.2 },
      boss: true,
      loot: [
        { itemId: "essence-of-fire", chance: 0.6, min: 1, max: 2 },
        { itemId: "rune-shield", chance: 0.05, min: 1, max: 1 },
        { itemId: "gem", chance: 0.5, min: 1, max: 1 }
      ]
    }),
    "skeleton-king": enemy("skeleton-king", "Skeleton King", 10, {
      hp: 200,
      mp: 40,
      xp: 160,
      goldMin: 40,
      goldMax: 80,
      stats: { str: 12, dex: 7, con: 9, int: 6, wis: 5, cha: 3, luck: 2 },
      attackBonus: 4,
      defenseBonus: 4,
      magicBonus: 4,
      resistBonus: 4,
      skills: ["power-strike", "shield-bash", "shadow-bolt"],
      ai: "smart",
      resist: { physical: 0.2, shadow: 0.3 },
      weaknesses: { holy: 0.3 },
      boss: true,
      loot: [
        { itemId: "gem", chance: 0.8, min: 1, max: 2 },
        { itemId: "ancient-relic", chance: 0.5, min: 1, max: 1 },
        { itemId: "steel-sword", chance: 0.15, min: 1, max: 1 }
      ]
    }),
    "tower-sentinel": enemy("tower-sentinel", "Sentinel of the Gate", 12, {
      hp: 260,
      mp: 40,
      xp: 220,
      goldMin: 60,
      goldMax: 120,
      stats: { str: 14, dex: 4, con: 12, int: 2, wis: 4, cha: 1, luck: 1 },
      attackBonus: 5,
      defenseBonus: 8,
      resist: { physical: 0.35, fire: 0.2, ice: 0.2 },
      weaknesses: { lightning: 0.3 },
      skills: ["mega-bash", "battle-fury"],
      ai: "smart",
      boss: true,
      phases: [
        { hpBelow: 0.5, attackBonus: 4, defenseBonus: 2, message: "The Sentinel's stone armor cracks, revealing burning cores!" }
      ],
      enrageAtRound: 12,
      enrageBonus: { attack: 6, message: "The Sentinel goes haywire, striking blindly!" },
      loot: [
        { itemId: "rune-shield", chance: 0.3, min: 1, max: 1 },
        { itemId: "gem", chance: 0.8, min: 1, max: 2 },
        { itemId: "greater-healing-potion", chance: 0.6, min: 1, max: 2 }
      ]
    }),
    "tower-champion": enemy("tower-champion", "Tower Champion", 25, {
      hp: 520,
      mp: 120,
      xp: 520,
      goldMin: 120,
      goldMax: 240,
      stats: { str: 20, dex: 12, con: 16, int: 8, wis: 8, cha: 4, luck: 3 },
      attackBonus: 10,
      defenseBonus: 8,
      magicBonus: 6,
      resistBonus: 8,
      skills: ["power-strike", "shield-bash", "war-cry", "fireball"],
      ai: "smart",
      resist: { physical: 0.25, fire: 0.3 },
      weaknesses: { ice: 0.2, holy: 0.15 },
      boss: true,
      phases: [
        { hpBelow: 0.66, attackBonus: 6, addSkills: ["flame-orb"], message: "The Champion brandishes a blade wreathed in flames!" },
        { hpBelow: 0.33, attackBonus: 8, defenseBonus: 4, addSkills: ["thunder-storm"], message: "The Champion channels the fury of the storm!" }
      ],
      enrageAtRound: 15,
      enrageBonus: { attack: 10, skills: ["holy-judgment"], message: "The Tower Champion is ENRAGED!" },
      loot: [
        { itemId: "platinum-sword", chance: 0.2, min: 1, max: 1 },
        { itemId: "gem", chance: 1, min: 2, max: 3 },
        { itemId: "greater-healing-potion", chance: 1, min: 1, max: 3 }
      ]
    }),
    "tower-wyrm": enemy("tower-wyrm", "Tower Wyrm", 48, {
      hp: 1100,
      mp: 240,
      xp: 1300,
      goldMin: 300,
      goldMax: 600,
      stats: { str: 30, dex: 18, con: 24, int: 14, wis: 12, cha: 6, luck: 3 },
      attackBonus: 18,
      defenseBonus: 12,
      magicBonus: 14,
      resistBonus: 12,
      skills: ["fireball", "flame-orb", "mega-bash", "power-strike"],
      ai: "smart",
      resist: { fire: 0.5, physical: 0.3 },
      weaknesses: { ice: 0.25, holy: 0.1 },
      boss: true,
      phases: [
        { hpBelow: 0.75, attackBonus: 8, addSkills: ["meteor"], message: "The Wyrm inhales deeply; the air itself catches fire!" },
        { hpBelow: 0.5, magicBonus: 10, addSkills: ["shadow-nova"], message: "The Wyrm's scales darken with cursed flame!" },
        { hpBelow: 0.25, attackBonus: 14, defenseBonus: 6, addSkills: ["world-breach"], message: "The Wyrm screams \u2014 reality warps around it!" }
      ],
      enrageAtRound: 12,
      enrageBonus: { attack: 20, magic: 12, message: "The Tower Wyrm's fury knows no bounds!" },
      loot: [
        { itemId: "wyrm-heart", chance: 0.5, min: 1, max: 1 },
        { itemId: "gem", chance: 1, min: 3, max: 5 },
        { itemId: "greater-healing-potion", chance: 1, min: 2, max: 4 }
      ]
    }),
    "tower-avatar": enemy("tower-avatar", "The Tower's Avatar", 95, {
      hp: 3e3,
      mp: 500,
      xp: 4200,
      goldMin: 1e3,
      goldMax: 2e3,
      stats: { str: 42, dex: 26, con: 34, int: 30, wis: 26, cha: 10, luck: 4 },
      attackBonus: 28,
      defenseBonus: 20,
      magicBonus: 24,
      resistBonus: 20,
      skills: ["world-breach", "meteor", "thunder-storm", "divine-wrath", "holy-judgment"],
      ai: "smart",
      resist: { physical: 0.4, fire: 0.3, ice: 0.3, lightning: 0.3, shadow: 0.3, holy: 0.1 },
      weaknesses: {},
      boss: true,
      phases: [
        { hpBelow: 0.8, attackBonus: 10, addSkills: ["shadow-nova"], message: "The Avatar opens its third eye \u2014 shadows pour out!" },
        { hpBelow: 0.6, magicBonus: 14, addSkills: ["venom-cloud"], message: "The Avatar's form unravels into pure essence!" },
        { hpBelow: 0.4, attackBonus: 18, defenseBonus: 8, addSkills: ["meteor"], message: "The Avatar weaves all elements at once!" },
        { hpBelow: 0.2, attackBonus: 25, magicBonus: 18, message: "The Avatar burns with the light of a dying star!" }
      ],
      enrageAtRound: 10,
      enrageBonus: { attack: 30, magic: 20, message: "THE TOWER'S AVATAR IS FULLY UNLEASHED!" },
      loot: [
        { itemId: "avatar-core", chance: 1, min: 1, max: 1 },
        { itemId: "gem", chance: 1, min: 5, max: 8 },
        { itemId: "greater-healing-potion", chance: 1, min: 3, max: 5 }
      ]
    }),
    "raid-colossus": enemy("raid-colossus", "Colossus of Ruin", 20, {
      hp: 900,
      mp: 100,
      xp: 800,
      goldMin: 200,
      goldMax: 400,
      stats: { str: 22, dex: 8, con: 18, int: 6, wis: 6, cha: 2, luck: 2 },
      attackBonus: 12,
      defenseBonus: 14,
      skills: ["mega-bash", "power-strike", "war-cry"],
      ai: "smart",
      resist: { physical: 0.4 },
      weaknesses: { lightning: 0.3 },
      boss: true,
      phases: [
        { hpBelow: 0.5, attackBonus: 10, defenseBonus: 6, message: "The Colossus tears chunks from itself to hurl at you!" }
      ],
      enrageAtRound: 14,
      enrageBonus: { attack: 12, message: "The Colossus of Ruin is ENRAGED!" },
      loot: [
        { itemId: "colossus-core", chance: 0.4, min: 1, max: 1 },
        { itemId: "gem", chance: 0.9, min: 2, max: 4 }
      ]
    }),
    "raid-warlord": enemy("raid-warlord", "The Warlord", 32, {
      hp: 1500,
      mp: 200,
      xp: 1500,
      goldMin: 400,
      goldMax: 800,
      stats: { str: 28, dex: 16, con: 22, int: 10, wis: 8, cha: 6, luck: 2 },
      attackBonus: 16,
      defenseBonus: 12,
      magicBonus: 8,
      resistBonus: 8,
      skills: ["power-strike", "shield-bash", "war-cry", "mega-bash"],
      ai: "smart",
      resist: { physical: 0.3 },
      weaknesses: { holy: 0.2 },
      boss: true,
      phases: [
        { hpBelow: 0.66, attackBonus: 8, addSkills: ["flame-orb"], message: "The Warlord ignites his twin blades!" },
        { hpBelow: 0.33, attackBonus: 12, addSkills: ["venom-cloud"], message: "The Warlord summons his undying legion!" }
      ],
      enrageAtRound: 16,
      enrageBonus: { attack: 16, message: "The Warlord fights beyond death!" },
      loot: [
        { itemId: "warlord-blade", chance: 0.25, min: 1, max: 1 },
        { itemId: "gem", chance: 1, min: 3, max: 5 }
      ]
    }),
    "raid-dragon-king": enemy("raid-dragon-king", "The Dragon King", 60, {
      hp: 3200,
      mp: 400,
      xp: 4e3,
      goldMin: 1200,
      goldMax: 2500,
      stats: { str: 36, dex: 22, con: 30, int: 20, wis: 16, cha: 8, luck: 3 },
      attackBonus: 24,
      defenseBonus: 18,
      magicBonus: 18,
      resistBonus: 16,
      skills: ["fireball", "flame-orb", "meteor", "mega-bash", "power-strike"],
      ai: "smart",
      resist: { fire: 0.6, physical: 0.3 },
      weaknesses: { ice: 0.3 },
      boss: true,
      phases: [
        { hpBelow: 0.75, attackBonus: 10, addSkills: ["shadow-nova"], message: "The Dragon King's fire turns to void!" },
        { hpBelow: 0.5, magicBonus: 12, addSkills: ["thunder-storm"], message: "The Dragon King commands the storm!" },
        { hpBelow: 0.25, attackBonus: 18, addSkills: ["world-breach"], message: "The Dragon King rends the sky itself!" }
      ],
      enrageAtRound: 12,
      enrageBonus: { attack: 24, magic: 16, message: "THE DRAGON KING'S WRATH ENGULFS ALL!" },
      loot: [
        { itemId: "dragon-king-crown", chance: 0.3, min: 1, max: 1 },
        { itemId: "wyrm-heart", chance: 0.7, min: 1, max: 2 },
        { itemId: "gem", chance: 1, min: 5, max: 8 }
      ]
    }),
    "trial-fire": enemy("trial-fire", "Ember Guardian", 15, {
      hp: 380,
      mp: 150,
      xp: 320,
      goldMin: 80,
      goldMax: 160,
      stats: { str: 10, dex: 10, con: 12, int: 14, wis: 8, cha: 2, luck: 2 },
      magicBonus: 10,
      resistBonus: 6,
      skills: ["fireball", "flame-orb", "frost-armor"],
      ai: "smart",
      resist: { fire: 0.5 },
      weaknesses: { ice: 0.3 },
      boss: true,
      phases: [
        { hpBelow: 0.5, magicBonus: 8, addSkills: ["meteor"], message: "The Ember Guardian bursts into a pillar of flame!" }
      ],
      enrageAtRound: 10,
      enrageBonus: { magic: 10, message: "The Ember Guardian's core detonates with rage!" },
      loot: [
        { itemId: "essence-of-fire", chance: 1, min: 2, max: 3 },
        { itemId: "gem", chance: 0.7, min: 1, max: 2 }
      ]
    }),
    "trial-shadow": enemy("trial-shadow", "Void Stalker", 22, {
      hp: 600,
      mp: 200,
      xp: 600,
      goldMin: 150,
      goldMax: 300,
      stats: { str: 16, dex: 18, con: 14, int: 12, wis: 8, cha: 2, luck: 4 },
      magicBonus: 8,
      resistBonus: 8,
      skills: ["shadow-bolt", "shadow-nova", "poison-strike"],
      ai: "smart",
      resist: { shadow: 0.5, physical: 0.2 },
      weaknesses: { holy: 0.3 },
      boss: true,
      phases: [
        { hpBelow: 0.5, attackBonus: 8, magicBonus: 8, addSkills: ["world-breach"], message: "The Void Stalker discorporates into living shadow!" }
      ],
      enrageAtRound: 11,
      enrageBonus: { attack: 10, magic: 10, message: "The Void Stalker's eyes blaze with malice!" },
      loot: [
        { itemId: "silver-charm", chance: 0.5, min: 1, max: 1 },
        { itemId: "gem", chance: 0.8, min: 1, max: 3 }
      ]
    }),
    "trial-storm": enemy("trial-storm", "Storm Herald", 30, {
      hp: 800,
      mp: 300,
      xp: 900,
      goldMin: 220,
      goldMax: 450,
      stats: { str: 18, dex: 20, con: 16, int: 16, wis: 10, cha: 3, luck: 3 },
      magicBonus: 12,
      resistBonus: 10,
      skills: ["thunder-storm", "lightning-bolt", "flame-orb"],
      ai: "smart",
      resist: { lightning: 0.5 },
      weaknesses: { ice: 0.25 },
      boss: true,
      phases: [
        { hpBelow: 0.5, magicBonus: 10, addSkills: ["meteor"], message: "The Storm Herald calls down a hurricane!" }
      ],
      enrageAtRound: 12,
      enrageBonus: { magic: 14, message: "The Storm Herald is a living tempest!" },
      loot: [
        { itemId: "storm-essence", chance: 0.4, min: 1, max: 1 },
        { itemId: "gem", chance: 1, min: 2, max: 3 }
      ]
    }),
    "trial-undead": enemy("trial-undead", "Grave Monarch", 40, {
      hp: 1200,
      mp: 300,
      xp: 1400,
      goldMin: 350,
      goldMax: 700,
      stats: { str: 24, dex: 14, con: 22, int: 20, wis: 16, cha: 4, luck: 2 },
      magicBonus: 14,
      resistBonus: 12,
      skills: ["shadow-bolt", "shadow-nova", "venom-cloud", "frost-armor"],
      ai: "smart",
      resist: { shadow: 0.5, physical: 0.25 },
      weaknesses: { holy: 0.3, fire: 0.2 },
      boss: true,
      phases: [
        { hpBelow: 0.5, attackBonus: 10, addSkills: ["world-breach"], message: "The Grave Monarch raises its fallen court!" }
      ],
      enrageAtRound: 13,
      enrageBonus: { attack: 14, magic: 10, message: "The Grave Monarch refuses the grave!" },
      loot: [
        { itemId: "ancient-relic", chance: 0.8, min: 1, max: 2 },
        { itemId: "gem", chance: 1, min: 3, max: 4 }
      ]
    }),
    "trial-moon": enemy("trial-moon", "Lunar Warden", 35, {
      hp: 950,
      mp: 280,
      xp: 1200,
      goldMin: 300,
      goldMax: 600,
      stats: { str: 20, dex: 24, con: 18, int: 18, wis: 20, cha: 4, luck: 4 },
      attackBonus: 14,
      defenseBonus: 10,
      magicBonus: 14,
      resistBonus: 12,
      skills: ["frost-armor", "lightning-bolt", "thunder-storm", "divine-wrath"],
      ai: "smart",
      resist: { ice: 0.4, shadow: 0.3, holy: 0.2 },
      weaknesses: { fire: 0.3 },
      boss: true,
      phases: [
        { hpBelow: 0.5, magicBonus: 10, addSkills: ["meteor"], message: "The Warden's howl calls down silver comets!" }
      ],
      enrageAtRound: 12,
      enrageBonus: { attack: 12, magic: 12, message: "The Lunar Warden is eclipsed in fury!" },
      loot: [
        { itemId: "moon-tear", chance: 1, min: 1, max: 2 },
        { itemId: "gem", chance: 1, min: 2, max: 4 }
      ]
    }),
    "tower-celestial": enemy("tower-celestial", "Celestial Judge", 75, {
      hp: 2300,
      mp: 450,
      xp: 2900,
      goldMin: 750,
      goldMax: 1500,
      stats: { str: 34, dex: 22, con: 28, int: 28, wis: 24, cha: 8, luck: 4 },
      attackBonus: 22,
      defenseBonus: 18,
      magicBonus: 20,
      resistBonus: 18,
      skills: ["divine-wrath", "holy-judgment", "thunder-storm", "meteor", "world-breach"],
      ai: "smart",
      resist: { physical: 0.35, holy: 0.3, shadow: 0.4 },
      weaknesses: { lightning: 0.2 },
      boss: true,
      phases: [
        { hpBelow: 0.75, attackBonus: 8, addSkills: ["venom-cloud"], message: "The Judge's halo dims \u2014 celestial venom drips from its blade!" },
        { hpBelow: 0.5, magicBonus: 12, defenseBonus: 6, message: "The Judge weighs your soul in silence." },
        { hpBelow: 0.25, attackBonus: 16, magicBonus: 12, addSkills: ["shadow-nova"], message: "The Judge passes a sentence of annihilation!" }
      ],
      enrageAtRound: 14,
      enrageBonus: { attack: 22, magic: 16, message: "The Celestial Judge is beyond mercy!" },
      loot: [
        { itemId: "void-crown", chance: 0.4, min: 1, max: 1 },
        { itemId: "avatar-core", chance: 0.2, min: 1, max: 1 },
        { itemId: "gem", chance: 1, min: 4, max: 6 }
      ]
    }),
    "raid-void-tyrant": enemy("raid-void-tyrant", "Void Tyrant", 50, {
      hp: 2500,
      mp: 420,
      xp: 3e3,
      goldMin: 900,
      goldMax: 1800,
      stats: { str: 32, dex: 20, con: 26, int: 26, wis: 18, cha: 6, luck: 3 },
      attackBonus: 20,
      defenseBonus: 16,
      magicBonus: 18,
      resistBonus: 16,
      skills: ["shadow-bolt", "shadow-nova", "world-breach", "venom-cloud", "mega-bash"],
      ai: "smart",
      resist: { shadow: 0.5, physical: 0.3, ice: 0.3 },
      weaknesses: { holy: 0.25 },
      boss: true,
      phases: [
        { hpBelow: 0.75, attackBonus: 8, addSkills: ["thunder-storm"], message: "The Void Tyrant rends open a rift of screaming darkness!" },
        { hpBelow: 0.5, magicBonus: 10, addSkills: ["flame-orb"], message: "The Tyrant's crown of eyes all open at once!" },
        { hpBelow: 0.25, attackBonus: 14, magicBonus: 12, message: "The Void Tyrant unhinges its maw of infinite night!" }
      ],
      enrageAtRound: 12,
      enrageBonus: { attack: 20, magic: 18, message: "THE VOID TYRANT CONSUMES ALL LIGHT!" },
      loot: [
        { itemId: "void-crown", chance: 0.5, min: 1, max: 1 },
        { itemId: "avatar-core", chance: 0.15, min: 1, max: 1 },
        { itemId: "gem", chance: 1, min: 4, max: 7 }
      ]
    }),
    "dw-slime": enemy("dw-slime", "Slime", 1, {
      hp: 14,
      xp: 2,
      goldMin: 1,
      goldMax: 3,
      stats: { str: 3, dex: 2, con: 4, int: 1, wis: 1, cha: 1, luck: 1 },
      loot: [{ itemId: "dw-herb", chance: 0.1, min: 1, max: 1 }]
    }),
    "dw-red-slime": enemy("dw-red-slime", "Red Slime", 2, {
      hp: 18,
      xp: 4,
      goldMin: 2,
      goldMax: 5,
      stats: { str: 4, dex: 3, con: 5, int: 1, wis: 1, cha: 1, luck: 1 },
      loot: [{ itemId: "dw-herb", chance: 0.12, min: 1, max: 1 }]
    }),
    "dw-drakeema": enemy("dw-drakeema", "Drakeema", 3, {
      hp: 22,
      xp: 6,
      goldMin: 3,
      goldMax: 7,
      stats: { str: 5, dex: 4, con: 5, int: 1, wis: 1, cha: 1, luck: 1 },
      loot: [{ itemId: "dw-herb", chance: 0.15, min: 1, max: 1 }]
    }),
    "dw-drakee": enemy("dw-drakee", "Drakee", 4, {
      hp: 30,
      xp: 10,
      goldMin: 4,
      goldMax: 8,
      stats: { str: 6, dex: 4, con: 6, int: 1, wis: 1, cha: 1, luck: 1 },
      loot: [{ itemId: "dw-herb", chance: 0.18, min: 1, max: 1 }]
    }),
    "dw-ghost": enemy("dw-ghost", "Ghost", 5, {
      hp: 22,
      xp: 12,
      goldMin: 5,
      goldMax: 10,
      stats: { str: 5, dex: 8, con: 4, int: 2, wis: 2, cha: 1, luck: 2 },
      resist: { shadow: 0.5 }
    }),
    "dw-magidrake": enemy("dw-magidrake", "Magidrake", 6, {
      hp: 28,
      xp: 14,
      goldMin: 6,
      goldMax: 10,
      mp: 8,
      ai: "smart",
      skills: ["dw-firebal"],
      stats: { str: 6, dex: 5, con: 5, int: 5, wis: 2, cha: 1, luck: 2 }
    }),
    "dw-scorpion": enemy("dw-scorpion", "Scorpion", 7, {
      hp: 36,
      xp: 18,
      goldMin: 8,
      goldMax: 12,
      stats: { str: 8, dex: 5, con: 7, int: 1, wis: 1, cha: 1, luck: 1 }
    }),
    "dw-magician": enemy("dw-magician", "Magician", 8, {
      hp: 30,
      xp: 22,
      goldMin: 9,
      goldMax: 13,
      mp: 5,
      ai: "smart",
      skills: ["dw-hurt"],
      stats: { str: 5, dex: 5, con: 4, int: 6, wis: 3, cha: 1, luck: 2 }
    }),
    "dw-druin": enemy("dw-druin", "Druin", 9, {
      hp: 42,
      xp: 26,
      goldMin: 10,
      goldMax: 16,
      stats: { str: 9, dex: 5, con: 7, int: 1, wis: 1, cha: 1, luck: 2 }
    }),
    "dw-rattler": enemy("dw-rattler", "Rattler", 10, {
      hp: 40,
      xp: 30,
      goldMin: 12,
      goldMax: 18,
      stats: { str: 8, dex: 9, con: 6, int: 1, wis: 1, cha: 1, luck: 2 }
    }),
    "dw-wraith": enemy("dw-wraith", "Wraith", 11, {
      hp: 44,
      xp: 34,
      goldMin: 14,
      goldMax: 20,
      stats: { str: 9, dex: 9, con: 6, int: 2, wis: 3, cha: 1, luck: 2 },
      resist: { shadow: 0.5 }
    }),
    "dw-metal-slime": enemy("dw-metal-slime", "Metal Slime", 12, {
      hp: 4,
      xp: 810,
      goldMin: 8,
      goldMax: 10,
      stats: { str: 4, dex: 10, con: 22, int: 1, wis: 1, cha: 1, luck: 3 }
    }),
    "dw-wizard": enemy("dw-wizard", "Wizard", 13, {
      hp: 48,
      xp: 48,
      goldMin: 15,
      goldMax: 24,
      mp: 8,
      ai: "smart",
      skills: ["dw-hurt", "dw-sleep"],
      stats: { str: 8, dex: 6, con: 6, int: 7, wis: 4, cha: 1, luck: 2 }
    }),
    "dw-wyvern": enemy("dw-wyvern", "Wyvern", 14, {
      hp: 70,
      xp: 66,
      goldMin: 18,
      goldMax: 30,
      stats: { str: 11, dex: 8, con: 8, int: 1, wis: 1, cha: 1, luck: 2 }
    }),
    "dw-green-dragon": enemy("dw-green-dragon", "Green Dragon", 15, {
      hp: 100,
      xp: 90,
      goldMin: 30,
      goldMax: 40,
      stats: { str: 13, dex: 7, con: 10, int: 1, wis: 2, cha: 1, luck: 2 },
      resist: { ice: 0.3, shadow: 0.3 }
    }),
    "dw-knight": enemy("dw-knight", "Knight", 16, {
      hp: 66,
      xp: 90,
      goldMin: 35,
      goldMax: 50,
      stats: { str: 12, dex: 6, con: 9, int: 1, wis: 2, cha: 1, luck: 2 },
      ai: "defensive"
    }),
    "dw-demon-knight": enemy("dw-demon-knight", "Demon Knight", 17, {
      hp: 76,
      xp: 110,
      goldMin: 45,
      goldMax: 60,
      stats: { str: 14, dex: 8, con: 9, int: 2, wis: 2, cha: 1, luck: 2 },
      resist: { shadow: 0.3 }
    }),
    "dw-starwyvern": enemy("dw-starwyvern", "Starwyvern", 18, {
      hp: 88,
      xp: 130,
      goldMin: 50,
      goldMax: 70,
      stats: { str: 14, dex: 9, con: 9, int: 2, wis: 2, cha: 1, luck: 2 }
    }),
    "dw-golem": enemy("dw-golem", "Golem", 19, {
      hp: 92,
      xp: 150,
      goldMin: 60,
      goldMax: 80,
      stats: { str: 15, dex: 2, con: 14, int: 1, wis: 1, cha: 1, luck: 1 },
      resist: { physical: 0.3 }
    }),
    "dw-goldman": enemy("dw-goldman", "Goldman", 20, {
      hp: 120,
      xp: 180,
      goldMin: 200,
      goldMax: 300,
      stats: { str: 13, dex: 6, con: 10, int: 2, wis: 2, cha: 1, luck: 3 }
    }),
    "dw-red-dragon": enemy("dw-red-dragon", "Red Dragon", 21, {
      hp: 150,
      xp: 365,
      goldMin: 50,
      goldMax: 80,
      stats: { str: 16, dex: 8, con: 11, int: 2, wis: 2, cha: 1, luck: 2 },
      resist: { fire: 0.5, shadow: 0.3 }
    }),
    "dw-axe-knight": enemy("dw-axe-knight", "Axe Knight", 22, {
      hp: 130,
      xp: 200,
      goldMin: 70,
      goldMax: 90,
      stats: { str: 16, dex: 7, con: 10, int: 2, wis: 2, cha: 1, luck: 2 }
    }),
    "dw-warlock": enemy("dw-warlock", "Warlock", 23, {
      hp: 100,
      xp: 220,
      goldMin: 80,
      goldMax: 100,
      mp: 10,
      ai: "smart",
      skills: ["dw-hurt", "dw-sleep"],
      stats: { str: 12, dex: 7, con: 8, int: 8, wis: 5, cha: 1, luck: 2 },
      resist: { shadow: 0.4 }
    }),
    "dw-dragonlord": enemy("dw-dragonlord", "Dragonlord", 24, {
      hp: 220,
      xp: 420,
      goldMin: 100,
      goldMax: 150,
      mp: 16,
      ai: "smart",
      boss: true,
      skills: ["dw-hurt", "dw-sleep", "dw-stopspell"],
      stats: { str: 14, dex: 8, con: 10, int: 8, wis: 8, cha: 2, luck: 3 },
      resist: { shadow: 0.5, fire: 0.5, ice: 0.3 },
      phases: [
        { hpBelow: 0.5, attackBonus: 8, magicBonus: 6, message: "The Dragonlord's eyes blaze with fury!" }
      ],
      enrageAtRound: 12,
      enrageBonus: { attack: 12, magic: 10, message: "The Dragonlord is ENRAGED!" }
    }),
    "dw-dragonlord-dragon": enemy("dw-dragonlord-dragon", "Dragonlord (Dragon)", 26, {
      hp: 180,
      xp: 560,
      goldMin: 150,
      goldMax: 200,
      mp: 12,
      ai: "smart",
      boss: true,
      skills: ["dw-firebal", "dw-firebreath"],
      stats: { str: 16, dex: 9, con: 12, int: 8, wis: 6, cha: 1, luck: 3 },
      resist: { fire: 0.6, shadow: 0.4 },
      phases: [
        { hpBelow: 0.5, attackBonus: 10, magicBonus: 8, addSkills: ["dw-firebreath"], message: "The dragon form roars with primordial fury!" }
      ],
      enrageAtRound: 10,
      enrageBonus: { attack: 14, magic: 10, message: "The Dragonlord's dragon form goes berserk!" }
    })
  };
  function scaleMonster(id, targetLevel) {
    const base = monsterDef(id);
    const safeLevel = Math.max(1, targetLevel);
    const ratio = safeLevel / Math.max(1, base.level);
    const stat = (v) => Math.max(1, Math.round(v * Math.pow(ratio, 0.75)));
    const def = {
      ...base,
      id: `${id}`,
      name: base.name,
      level: safeLevel,
      hp: Math.round(base.hp * Math.sqrt(ratio)) + (safeLevel - base.level) * 8,
      mp: Math.round(base.mp * ratio),
      xp: Math.round(base.xp * ratio),
      goldMin: Math.round(base.goldMin * ratio),
      goldMax: Math.round(base.goldMax * ratio),
      stats: {
        str: stat(base.stats.str),
        dex: stat(base.stats.dex),
        con: stat(base.stats.con),
        int: stat(base.stats.int),
        wis: stat(base.stats.wis),
        cha: Math.max(1, base.stats.cha),
        luck: Math.max(1, base.stats.luck)
      },
      attackBonus: Math.round((base.attackBonus ?? 0) * Math.sqrt(ratio)),
      defenseBonus: Math.round((base.defenseBonus ?? 0) * Math.sqrt(ratio)),
      magicBonus: Math.round((base.magicBonus ?? 0) * Math.sqrt(ratio)),
      resistBonus: Math.round((base.resistBonus ?? 0) * Math.sqrt(ratio)),
      speedBonus: base.speedBonus
    };
    return def;
  }
  function monsterDef(id) {
    const def = MONSTERS[id];
    if (!def)
      throw new Error(`unknown monster: ${id}`);
    return def;
  }

  // dist/inventory/inventory.js
  var uidCounter = 0;
  function newUid() {
    uidCounter = (uidCounter + 1) % 2147483647;
    return `${Date.now().toString(36)}-${uidCounter.toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
  }
  var Inventory = class {
    data;
    constructor(data) {
      this.data = {
        items: data?.items ?? [],
        gold: data?.gold ?? 0,
        capacity: data?.capacity ?? 30
      };
    }
    get items() {
      return this.data.items;
    }
    get gold() {
      return this.data.gold;
    }
    set gold(v) {
      this.data.gold = v;
    }
    get capacity() {
      return this.data.capacity;
    }
    countStacks() {
      return this.data.items.length;
    }
    isFull() {
      return this.countStacks() >= this.capacity;
    }
    getItemCount(id) {
      return this.data.items.reduce((sum, item) => item.id === id ? sum + item.count : sum, 0);
    }
    has(id, count = 1) {
      return this.getItemCount(id) >= count;
    }
    findStack(id) {
      const def = itemDef(id);
      return this.data.items.find((item) => item.id === id && (def.stackable ? item.count < def.maxStack : true)) ?? null;
    }
    addItem(id, count = 1) {
      const def = itemDef(id);
      let remaining = count;
      let touched = null;
      if (def.stackable) {
        let stack = this.findStack(id);
        while (stack && remaining > 0) {
          const space = def.maxStack - stack.count;
          const add = Math.min(space, remaining);
          stack.count += add;
          remaining -= add;
          touched = stack;
          stack = this.findStack(id);
        }
      }
      while (remaining > 0) {
        if (this.isFull()) {
          throw new Error(`inventory is full, could not add all ${count} x ${def.name}`);
        }
        const amount = def.stackable ? Math.min(def.maxStack, remaining) : 1;
        touched = { id, count: amount, uid: newUid() };
        this.data.items.push(touched);
        remaining -= amount;
      }
      return touched;
    }
    removeItem(id, count = 1) {
      if (this.getItemCount(id) < count)
        return false;
      let remaining = count;
      for (const item of [...this.data.items]) {
        if (item.id !== id)
          continue;
        const take = Math.min(item.count, remaining);
        item.count -= take;
        remaining -= take;
        if (item.count <= 0)
          this.data.items.splice(this.data.items.indexOf(item), 1);
        if (remaining <= 0)
          break;
      }
      return true;
    }
    removeByUid(uid, count = 1) {
      const item = this.data.items.find((i) => i.uid === uid);
      if (!item)
        return false;
      if (item.count < count)
        return false;
      item.count -= count;
      if (item.count <= 0)
        this.data.items.splice(this.data.items.indexOf(item), 1);
      return true;
    }
    find(uid) {
      return this.data.items.find((i) => i.uid === uid) ?? null;
    }
    addGold(amount) {
      this.gold += amount;
    }
    removeGold(amount) {
      if (this.gold < amount)
        return false;
      this.gold -= amount;
      return true;
    }
    list() {
      return this.data.items.map((i) => {
        const def = itemDef(i.id);
        return i.count > 1 ? `${def.name} x${i.count}` : def.name;
      });
    }
  };

  // dist/inventory/loot.js
  function rollLootEntries(entries, rng) {
    const out = [];
    for (const entry of entries) {
      if (rng.chance(entry.chance)) {
        const count = rng.int(entry.min, entry.max);
        out.push({ id: entry.itemId, count, uid: newUid() });
      }
    }
    return out;
  }
  var CHEST_LOOT = {
    1: [
      { itemId: "minor-healing-potion", chance: 0.5, min: 1, max: 2 },
      { itemId: "herb", chance: 0.4, min: 1, max: 3 },
      { itemId: "dagger", chance: 0.1, min: 1, max: 1 },
      { itemId: "buckler", chance: 0.1, min: 1, max: 1 }
    ],
    2: [
      { itemId: "healing-potion", chance: 0.4, min: 1, max: 2 },
      { itemId: "mana-potion", chance: 0.3, min: 1, max: 1 },
      { itemId: "iron-sword", chance: 0.12, min: 1, max: 1 },
      { itemId: "chainmail", chance: 0.12, min: 1, max: 1 },
      { itemId: "iron-ring", chance: 0.15, min: 1, max: 1 },
      { itemId: "gem", chance: 0.2, min: 1, max: 1 }
    ],
    3: [
      { itemId: "greater-healing-potion", chance: 0.35, min: 1, max: 2 },
      { itemId: "mana-potion", chance: 0.4, min: 1, max: 2 },
      { itemId: "steel-sword", chance: 0.12, min: 1, max: 1 },
      { itemId: "plate-armor", chance: 0.1, min: 1, max: 1 },
      { itemId: "rune-shield", chance: 0.1, min: 1, max: 1 },
      { itemId: "emerald-amulet", chance: 0.12, min: 1, max: 1 },
      { itemId: "gem", chance: 0.3, min: 1, max: 2 }
    ]
  };
  function rollChest(level, rng) {
    const entries = CHEST_LOOT[level] ?? CHEST_LOOT[1];
    const items = rollLootEntries(entries, rng);
    const gold = rng.int(10 + level * 8, 30 + level * 15);
    return { items, gold };
  }

  // dist/combat/battle.js
  function buildActorFromHero(char, index) {
    return {
      id: `hero-${index}`,
      name: char.name,
      kind: "hero",
      level: char.level,
      maxHp: char.derived.maxHp,
      hp: char.hp,
      maxMp: char.derived.maxMp,
      mp: char.mp,
      attack: char.derived.attack,
      defense: char.derived.defense,
      magic: char.derived.magic,
      magicResist: char.derived.resist,
      speed: char.derived.speed,
      critChance: char.derived.critChance,
      skills: characterSkills(char),
      statusEffects: [],
      resist: {},
      weaknesses: {},
      isDefending: false,
      ai: "aggressive",
      inventory: char.inventory,
      heroRef: index
    };
  }
  function buildActorFromEnemy(def, index) {
    return {
      id: `enemy-${index}`,
      name: def.name,
      kind: "enemy",
      level: def.level,
      maxHp: def.hp,
      hp: def.hp,
      maxMp: def.mp,
      mp: def.mp,
      attack: def.stats.str * 2 + def.attackBonus + def.level,
      defense: Math.floor(2 + def.stats.con * 1.5 + def.defenseBonus),
      magic: def.stats.int * 2 + def.magicBonus,
      magicResist: def.stats.wis + def.resistBonus,
      speed: Math.floor(2 + def.stats.dex + def.level * 0.5 + def.speedBonus),
      critChance: 0.05 + def.stats.luck * 0.01,
      skills: def.skills.map((id) => skillDef(id)),
      statusEffects: [],
      resist: def.resist,
      weaknesses: def.weaknesses,
      isDefending: false,
      ai: def.ai,
      phases: def.phases,
      phasesDone: [],
      enrageAtRound: def.enrageAtRound,
      enrageBonus: def.enrageBonus,
      enraged: false,
      monsterId: def.id
    };
  }
  var Battle = class {
    actors;
    rng;
    log;
    onEvent;
    order = [];
    orderIndex = 0;
    rounds = 0;
    over = false;
    fled = false;
    result = null;
    constructor(heroes, enemies, rng, log = () => {
    }, onEvent = () => {
    }) {
      this.rng = rng;
      this.log = log;
      this.onEvent = onEvent;
      this.actors = [
        ...heroes.map((h, i) => buildActorFromHero(h, i)),
        ...enemies.map((e2, i) => buildActorFromEnemy(e2, i))
      ];
    }
    start() {
      this.order = [...this.actors].sort((a, b) => b.speed + this.rng.range(0, 10) - (a.speed + this.rng.range(0, 10)));
      this.orderIndex = 0;
      this.rounds = 1;
      this.log(`=== Battle begins (${this.rounds}) ===`);
    }
    isOver() {
      return this.over;
    }
    aliveHeroes() {
      return this.actors.filter((a) => a.kind === "hero" && a.hp > 0);
    }
    aliveEnemies() {
      return this.actors.filter((a) => a.kind === "enemy" && a.hp > 0);
    }
    currentActor() {
      return this.order[this.orderIndex];
    }
    aliveOrder() {
      return this.order.filter((a) => a.hp > 0);
    }
    advance() {
      this.orderIndex = (this.orderIndex + 1) % this.order.length;
      if (this.orderIndex === 0) {
        this.rounds++;
        this.log(`--- Round ${this.rounds} ---`);
      }
      let guard = this.order.length;
      while (guard-- > 0 && this.order[this.orderIndex].hp <= 0) {
        this.orderIndex = (this.orderIndex + 1) % this.order.length;
        if (this.orderIndex === 0)
          this.rounds++;
      }
      this.checkEnd();
    }
    checkEnd() {
      if (this.aliveHeroes().length === 0) {
        this.over = true;
        this.log("The heroes have fallen...");
      } else if (this.aliveEnemies().length === 0) {
        this.over = true;
        this.log("Victory! All enemies defeated.");
      }
    }
    addStatus(actor, effect, power, duration) {
      if (duration <= 0 || power <= 0)
        return;
      if (actor.statusEffects.some((e2) => e2.id === effect))
        return;
      actor.statusEffects.push({ id: effect, turnsLeft: duration, power });
      this.log(`${actor.name} is afflicted by ${effect}.`);
    }
    checkEnrage(actor) {
      if (!actor.enrageAtRound || actor.enraged || actor.hp <= 0)
        return;
      if (this.rounds < actor.enrageAtRound)
        return;
      actor.enraged = true;
      if (actor.enrageBonus?.attack)
        actor.attack += actor.enrageBonus.attack;
      if (actor.enrageBonus?.magic)
        actor.magic += actor.enrageBonus.magic;
      if (actor.enrageBonus?.defense)
        actor.defense += actor.enrageBonus.defense;
      for (const s of actor.enrageBonus?.skills ?? []) {
        if (!actor.skills.some((k) => k.id === s))
          actor.skills.push(skillDef(s));
      }
      this.log(actor.enrageBonus?.message ?? `${actor.name} is ENRAGED!`);
      this.onEvent("boss-enrage", { monsterId: actor.monsterId ?? actor.name, round: this.rounds });
    }
    checkPhase(target) {
      if (!target.phases || target.phases.length === 0)
        return;
      const frac = target.hp / target.maxHp;
      for (let i = 0; i < target.phases.length; i++) {
        const ph = target.phases[i];
        if (target.phasesDone.includes(i))
          continue;
        if (frac <= ph.hpBelow) {
          target.phasesDone.push(i);
          if (ph.attackBonus)
            target.attack += ph.attackBonus;
          if (ph.magicBonus)
            target.magic += ph.magicBonus;
          if (ph.defenseBonus)
            target.defense += ph.defenseBonus;
          if (ph.magicResistBonus)
            target.magicResist += ph.magicResistBonus;
          for (const s of ph.addSkills ?? []) {
            if (!target.skills.some((k) => k.id === s))
              target.skills.push(skillDef(s));
          }
          this.log(ph.message);
          this.onEvent("boss-phase", { monsterId: target.monsterId ?? target.name, phase: ph.message });
        }
      }
    }
    tickStatus(actor) {
      for (const effect of [...actor.statusEffects]) {
        if (effect.id === "poison" || effect.id === "burn") {
          const dmg = Math.max(1, Math.floor(effect.power * actor.maxHp));
          actor.hp -= dmg;
          this.log(`${actor.name} takes ${dmg} damage from ${effect.id}.`);
        } else if (effect.id === "regen") {
          const heal = Math.max(1, Math.floor(effect.power * actor.maxHp));
          actor.hp = Math.min(actor.maxHp, actor.hp + heal);
          this.log(`${actor.name} regenerates ${heal} HP.`);
        }
        effect.turnsLeft--;
        if (effect.turnsLeft <= 0 || actor.hp <= 0)
          actor.statusEffects.splice(actor.statusEffects.indexOf(effect), 1);
      }
      return actor.hp > 0;
    }
    computeDamage(attacker, defender, skill2) {
      let base;
      if (skill2) {
        base = skill2.usesMagic ? attacker.magic * skill2.power : attacker.attack * skill2.power;
      } else {
        base = attacker.attack;
      }
      let damage = base * this.rng.range(0.9, 1.1);
      let crit = false;
      if ((!skill2 || !skill2.usesMagic) && this.rng.next() < attacker.critChance) {
        damage *= 1.5;
        crit = true;
      }
      const element = skill2?.element ?? "physical";
      if (skill2 && skill2.usesMagic) {
        damage *= 100 / (100 + defender.magicResist);
      } else {
        damage *= 100 / (100 + defender.defense);
      }
      const resist = defender.resist[element] ?? 0;
      const weakness = defender.weaknesses[element] ?? 0;
      damage *= (1 - resist) * (1 + weakness);
      if (defender.isDefending)
        damage *= 0.5;
      return { damage: Math.max(1, Math.floor(damage)), crit };
    }
    applyDamage(target, amount) {
      const shield = target.statusEffects.find((e2) => e2.id === "shield");
      if (shield) {
        const absorb = shield.power * target.maxHp;
        const reduced = Math.min(absorb, amount);
        amount -= reduced;
        shield.power -= reduced / target.maxHp;
        if (shield.power <= 0)
          target.statusEffects.splice(target.statusEffects.indexOf(shield), 1);
        if (reduced > 0)
          this.log(`${target.name}'s shield absorbs ${Math.floor(reduced)} damage.`);
      }
      target.hp -= amount;
      if (target.hp > 0 && target.kind === "enemy")
        this.checkPhase(target);
      return amount;
    }
    pickSkill(actor, skillId) {
      const skill2 = actor.skills.find((s) => s.id === skillId);
      if (!skill2)
        return null;
      if (actor.mp < skill2.mpCost)
        return null;
      return skill2;
    }
    useSkill(actor, skill2, target) {
      actor.mp -= skill2.mpCost;
      this.log(`${actor.name} uses ${skill2.name}!`);
      if (skill2.id === "heal" || skill2.id === "divine-heal" || skill2.id === "dw-heal") {
        const amount = Math.max(1, Math.floor(actor.magic * skill2.power));
        target.hp = Math.min(target.maxHp, target.hp + amount);
        this.log(`${target.name} is healed for ${amount} HP.`);
      } else if (skill2.id === "cleanse") {
        target.statusEffects = [];
        this.log(`${target.name} is cleansed of all ailments.`);
      } else if (skill2.effect === "shield" || skill2.effect === "regen") {
        this.addStatus(target, skill2.effect, skill2.power, skill2.effectDuration ?? 2);
        if (target === actor)
          this.log(`${actor.name} ${skill2.effect === "shield" ? "braces themselves" : "is heartened by the song"}.`);
      } else if (skill2.maxHpDamage) {
        const amount = Math.max(1, Math.floor(target.maxHp * skill2.maxHpDamage * this.rng.range(0.85, 1.15)));
        this.applyDamage(target, amount);
        this.log(`${actor.name} breathes flame at ${target.name} for ${amount} damage!`);
      } else if (skill2.targets === "all-enemies") {
        const targets = actor.kind === "enemy" ? this.aliveHeroes() : this.aliveEnemies();
        for (const t of targets) {
          const { damage, crit } = this.computeDamage(actor, t, skill2);
          this.applyDamage(t, damage);
          this.log(`${actor.name} hits ${t.name} for ${damage}${crit ? " (crit)" : ""} damage.`);
          if (skill2.effect && (skill2.effectChance ?? 1) >= this.rng.next()) {
            this.addStatus(t, skill2.effect, skill2.effectPower ?? 0.1, skill2.effectDuration ?? 2);
          }
          if (t.hp <= 0)
            this.log(`${t.name} has been defeated!`);
        }
        return;
      } else {
        const { damage, crit } = this.computeDamage(actor, target, skill2);
        this.applyDamage(target, damage);
        this.log(`${actor.name} hits ${target.name} for ${damage}${crit ? " (crit)" : ""} damage.`);
        if (skill2.effect && (skill2.effectChance ?? 1) >= this.rng.next()) {
          this.addStatus(target, skill2.effect, skill2.effectPower ?? 0.1, skill2.effectDuration ?? 2);
        }
      }
      if (target.hp <= 0)
        this.log(`${target.name} has been defeated!`);
    }
    useItem(actor, target, itemId) {
      const def = itemDef(itemId);
      if (!actor.inventory)
        return;
      const stack = actor.inventory.items.find((i) => i.id === itemId);
      if (!stack) {
        this.log(`${actor.name} has no ${def.name}.`);
        return;
      }
      stack.count--;
      if (stack.count <= 0) {
        actor.inventory.items.splice(actor.inventory.items.indexOf(stack), 1);
      }
      if (def.healHp) {
        target.hp = Math.min(target.maxHp, target.hp + def.healHp);
        this.log(`${actor.name} uses ${def.name}, restoring ${def.healHp} HP to ${target.name}.`);
      }
      if (def.healMp) {
        target.mp = Math.min(target.maxMp, target.mp + def.healMp);
        this.log(`${target.name} regains ${def.healMp} MP.`);
      }
      if (def.cures) {
        target.statusEffects = target.statusEffects.filter((e2) => !def.cures.includes(e2.id));
        this.log(`${target.name} is cured.`);
      }
    }
    execute(actor, action) {
      if (actor.hp <= 0 || this.over)
        return;
      this.checkEnrage(actor);
      if (!this.tickStatus(actor))
        return;
      const stunned = actor.statusEffects.some((e2) => e2.id === "stun");
      if (stunned) {
        this.log(`${actor.name} is stunned and cannot act!`);
        actor.statusEffects = actor.statusEffects.filter((e2) => e2.id !== "stun");
        return;
      }
      actor.isDefending = false;
      switch (action.type) {
        case "attack": {
          const target = this.actors.find((a) => a.id === action.targetId && a.hp > 0);
          if (!target) {
            this.log(`${actor.name} hesitates, no valid target.`);
            break;
          }
          const { damage, crit } = this.computeDamage(actor, target);
          this.applyDamage(target, damage);
          this.log(`${actor.name} attacks ${target.name} for ${damage}${crit ? " (crit)" : ""} damage.`);
          if (target.hp <= 0)
            this.log(`${target.name} has been defeated!`);
          break;
        }
        case "skill": {
          if (actor.statusEffects.some((e2) => e2.id === "silence")) {
            this.log(`${actor.name}'s magic is sealed by silence!`);
            actor.statusEffects = actor.statusEffects.filter((e2) => e2.id !== "silence");
            break;
          }
          const skill2 = this.pickSkill(actor, action.skillId);
          if (!skill2) {
            const target2 = this.actors.find((a) => a.id === action.targetId && a.hp > 0);
            if (target2) {
              const { damage, crit } = this.computeDamage(actor, target2);
              this.applyDamage(target2, damage);
              this.log(`${actor.name} attacks ${target2.name} for ${damage}${crit ? " (crit)" : ""} damage.`);
              if (target2.hp <= 0)
                this.log(`${target2.name} has been defeated!`);
            }
            break;
          }
          let target;
          if (skill2.targets === "self") {
            target = actor;
          } else if (skill2.targets === "ally") {
            target = this.actors.find((a) => a.id === action.targetId && a.hp > 0 && a.kind === "hero") ?? actor;
          } else {
            target = this.actors.find((a) => a.id === action.targetId && a.hp > 0);
            if (!target)
              target = actor.kind === "enemy" ? this.aliveHeroes()[0] : this.aliveEnemies()[0];
          }
          if (target)
            this.useSkill(actor, skill2, target);
          break;
        }
        case "defend": {
          actor.isDefending = true;
          this.log(`${actor.name} takes a defensive stance.`);
          break;
        }
        case "item": {
          this.useItem(actor, this.actors.find((a) => a.id === action.targetId && a.hp > 0) ?? actor, action.itemId);
          break;
        }
        case "flee": {
          const enemies = this.aliveEnemies();
          const avgSpeed = enemies.reduce((s, e2) => s + e2.speed, 0) / Math.max(1, enemies.length);
          const chance = Math.min(0.9, Math.max(0.15, 0.35 + (actor.speed - avgSpeed) / 40));
          if (this.rng.chance(chance)) {
            this.fled = true;
            this.over = true;
            this.log(`${actor.name} fled the battle!`);
          } else {
            this.log(`${actor.name} failed to flee!`);
          }
          break;
        }
      }
    }
    enemyAI(actor) {
      const heroes = this.aliveHeroes();
      if (heroes.length === 0)
        return { type: "attack", targetId: "none" };
      const target = [...heroes].sort((a, b) => a.hp - b.hp)[0];
      if (actor.ai === "smart" && actor.skills.length > 0) {
        const support = /* @__PURE__ */ new Set(["heal", "cleanse", "shield-of-faith", "divine-heal", "holy-shield", "inspiring-song"]);
        const usable = actor.skills.filter((s) => actor.mp >= s.mpCost && s.targets !== "ally" && s.targets !== "self" && !support.has(s.id));
        if (usable.length > 0 && this.rng.chance(0.55)) {
          const skill2 = this.rng.pick(usable);
          return { type: "skill", skillId: skill2.id, targetId: target.id };
        }
      } else if (actor.ai === "defensive" && this.rng.chance(0.25)) {
        return { type: "defend" };
      }
      return { type: "attack", targetId: target.id };
    }
    defaultHeroAI(actor) {
      const enemies = this.aliveEnemies();
      if (enemies.length === 0)
        return { type: "defend" };
      const target = [...enemies].sort((a, b) => a.hp - b.hp)[0];
      const healSkill = actor.hp < actor.maxHp * 0.5 ? actor.skills.find((s) => (s.id === "heal" || s.id === "divine-heal" || s.id === "dw-heal") && actor.mp >= s.mpCost) : void 0;
      if (healSkill) {
        return { type: "skill", skillId: healSkill.id, targetId: actor.id };
      }
      if (actor.hp < actor.maxHp * 0.35 && actor.inventory?.items.some((i) => itemDef(i.id).healHp)) {
        return { type: "item", itemId: actor.inventory.items.find((i) => itemDef(i.id).healHp).id, targetId: actor.id };
      }
      const damageSkills = actor.skills.filter((s) => (s.targets === "enemy" || s.targets === "all-enemies") && actor.mp >= s.mpCost && s.id !== "poison-strike");
      if (damageSkills.length > 0 && this.rng.chance(0.7)) {
        const skill2 = [...damageSkills].sort((a, b) => b.power - a.power)[0];
        return { type: "skill", skillId: skill2.id, targetId: target.id };
      }
      return { type: "attack", targetId: target.id };
    }
    run(playerAI = (b, a) => b.defaultHeroAI(a)) {
      if (this.order.length === 0)
        this.start();
      let guard = 1e4;
      while (!this.isOver() && guard-- > 0) {
        const actor = this.currentActor();
        if (actor.hp <= 0) {
          this.advance();
          continue;
        }
        const action = actor.kind === "hero" ? playerAI(this, actor) : this.enemyAI(actor);
        this.execute(actor, action);
        if (this.isOver())
          break;
        this.advance();
      }
      return this.finish();
    }
    skipToHero() {
      while (!this.isOver()) {
        const actor = this.currentActor();
        if (actor.kind === "hero")
          return;
        this.step(this.enemyAI(actor));
      }
    }
    step(action) {
      if (this.over)
        return;
      const actor = this.currentActor();
      this.execute(actor, action);
      if (!this.isOver())
        this.advance();
    }
    finish() {
      if (this.result)
        return this.result;
      const victory = !this.fled && this.aliveEnemies().length === 0 && this.aliveHeroes().length > 0;
      const kills = /* @__PURE__ */ new Map();
      for (const actor of this.actors) {
        if (actor.kind === "enemy" && actor.hp <= 0) {
          const mid = actor.monsterId ?? actor.id;
          kills.set(mid, (kills.get(mid) ?? 0) + 1);
        }
      }
      let xpEarned = 0;
      let goldEarned = 0;
      const loot = [];
      if (victory) {
        for (const actor of this.actors) {
          if (actor.kind !== "enemy" || actor.hp > 0)
            continue;
          const def = monsterDef(actor.monsterId ?? actor.id);
          xpEarned += def.xp;
          goldEarned += this.rng.int(def.goldMin, def.goldMax);
          loot.push(...rollLootEntries(def.loot, this.rng));
        }
      }
      this.result = {
        victory,
        fled: this.fled,
        rounds: this.rounds,
        xpEarned,
        goldEarned,
        loot,
        kills: [...kills.entries()].map(([monsterId, count]) => ({ monsterId, count }))
      };
      return this.result;
    }
  };

  // dist/data/recipes.js
  var RECIPES = {
    "cook-ration": {
      id: "cook-ration",
      name: "Cook Ration",
      station: "campfire",
      ingredients: [
        { id: "herb", count: 1 },
        { id: "beast-meat", count: 1 }
      ],
      result: { id: "ration", count: 1 }
    },
    "cook-feast": {
      id: "cook-feast",
      name: "Cook a Hearty Feast",
      station: "campfire",
      ingredients: [
        { id: "beast-meat", count: 2 },
        { id: "herb", count: 1 }
      ],
      result: { id: "ration", count: 2 }
    },
    "craft-minor-healing": {
      id: "craft-minor-healing",
      name: "Brew Minor Healing Potion",
      station: "alchemy",
      ingredients: [
        { id: "herb", count: 2 },
        { id: "water-flask", count: 1 }
      ],
      result: { id: "minor-healing-potion", count: 1 }
    },
    "craft-healing-potion": {
      id: "craft-healing-potion",
      name: "Brew Healing Potion",
      station: "alchemy",
      ingredients: [
        { id: "herb", count: 3 },
        { id: "water-flask", count: 2 }
      ],
      result: { id: "healing-potion", count: 1 }
    },
    "craft-antidote": {
      id: "craft-antidote",
      name: "Brew Antidote",
      station: "alchemy",
      ingredients: [
        { id: "herb", count: 1 },
        { id: "venom-gland", count: 1 }
      ],
      result: { id: "antidote", count: 1 }
    },
    "craft-mana-potion": {
      id: "craft-mana-potion",
      name: "Brew Mana Potion",
      station: "alchemy",
      ingredients: [
        { id: "herb", count: 2 },
        { id: "water-flask", count: 2 },
        { id: "essence-of-fire", count: 1 }
      ],
      result: { id: "mana-potion", count: 1 }
    },
    "craft-ether-potion": {
      id: "craft-ether-potion",
      name: "Brew Ether Potion",
      station: "alchemy",
      ingredients: [
        { id: "herb", count: 2 },
        { id: "water-flask", count: 2 },
        { id: "gem", count: 1 }
      ],
      result: { id: "ether-potion", count: 1 }
    },
    "forge-iron-sword": {
      id: "forge-iron-sword",
      name: "Forge Iron Sword",
      station: "forge",
      ingredients: [
        { id: "iron-ore", count: 2 },
        { id: "coal", count: 1 }
      ],
      result: { id: "iron-sword", count: 1 }
    },
    "forge-steel-sword": {
      id: "forge-steel-sword",
      name: "Forge Steel Sword",
      station: "forge",
      ingredients: [
        { id: "iron-ore", count: 3 },
        { id: "coal", count: 2 }
      ],
      result: { id: "steel-sword", count: 1 }
    },
    "forge-chainmail": {
      id: "forge-chainmail",
      name: "Forge Chainmail",
      station: "forge",
      ingredients: [
        { id: "iron-ore", count: 3 },
        { id: "coal", count: 2 },
        { id: "leather", count: 1 }
      ],
      result: { id: "chainmail", count: 1 }
    },
    "forge-greatsword": {
      id: "forge-greatsword",
      name: "Forge Greatsword",
      station: "forge",
      ingredients: [
        { id: "iron-ore", count: 4 },
        { id: "coal", count: 3 }
      ],
      result: { id: "greatsword", count: 1 }
    },
    "forge-mace-of-light": {
      id: "forge-mace-of-light",
      name: "Forge Mace of Light",
      station: "forge",
      ingredients: [
        { id: "iron-ore", count: 3 },
        { id: "coal", count: 2 },
        { id: "gem", count: 1 }
      ],
      result: { id: "mace-of-light", count: 1 }
    }
  };
  var RECIPE_LIST = Object.values(RECIPES);
  function recipeDef(id) {
    const def = RECIPES[id];
    if (!def)
      throw new Error(`unknown recipe: ${id}`);
    return def;
  }

  // dist/inventory/crafting.js
  var CraftingSystem = class {
    recipes;
    constructor(recipes = RECIPE_LIST) {
      this.recipes = recipes;
    }
    recipe(id) {
      const recipe = RECIPES[id];
      if (!recipe)
        throw new Error(`unknown recipe: ${id}`);
      return recipe;
    }
    available(inv, station) {
      return this.recipes.filter((r) => (station === "none" || r.station === station || r.station === "campfire") && this.canCraft(r, inv));
    }
    canCraft(recipe, inv) {
      return recipe.ingredients.every((ing) => inv.has(ing.id, ing.count));
    }
    craft(recipe, inv) {
      if (!this.canCraft(recipe, inv))
        return false;
      for (const ing of recipe.ingredients) {
        inv.removeItem(ing.id, ing.count);
      }
      inv.addItem(recipe.result.id, recipe.result.count);
      return true;
    }
  };

  // dist/data/quests.js
  var QUESTS = {
    "q-tutorial": {
      id: "q-tutorial",
      name: "Welcome to the Realm",
      giver: "elder",
      description: "Speak with the village elder.",
      objectives: [{ id: "talk-elder", type: "talk", target: "elder", required: 1, description: "Talk to the Elder" }],
      rewards: { xp: 20, gold: 10, items: [{ id: "minor-healing-potion", count: 1 }] },
      autoComplete: true
    },
    "q-rat-menace": {
      id: "q-rat-menace",
      name: "The Rat Menace",
      giver: "elder",
      description: "The village is overrun by giant rats. Thin their numbers.",
      objectives: [{ id: "kill-rats", type: "kill", target: "rat", required: 5, description: "Slay 5 Giant Rats" }],
      rewards: { xp: 60, gold: 30, items: [] },
      autoComplete: true
    },
    "q-spider-cull": {
      id: "q-spider-cull",
      name: "Spider Silk Harvest",
      giver: "hunter",
      description: "The hunter needs spider silk and wants the brood thinned.",
      objectives: [
        { id: "kill-spiders", type: "kill", target: "giant-spider", required: 3, description: "Slay 3 Giant Spiders" },
        { id: "collect-silk", type: "collect", target: "spider-silk", required: 2, description: "Gather 2 Spider Silk" }
      ],
      rewards: { xp: 80, gold: 40, items: [{ id: "healing-potion", count: 2 }] },
      autoComplete: true
    },
    "q-bandit-threat": {
      id: "q-bandit-threat",
      name: "Bandit Threat",
      giver: "guard-captain",
      description: "Bandits prey on the roads. Teach them a lesson.",
      objectives: [
        { id: "kill-bandits", type: "kill", target: "bandit", required: 3, description: "Defeat 3 Bandits" },
        { id: "kill-orcs", type: "kill", target: "orc-warrior", required: 1, description: "Defeat 1 Orc Warrior" }
      ],
      rewards: { xp: 150, gold: 80, items: [{ id: "steel-sword", count: 1 }] },
      autoComplete: true
    },
    "q-dungeon-clear": {
      id: "q-dungeon-clear",
      name: "Cleanse the Dungeon",
      giver: "guard-captain",
      description: "Enter the ruined keep and defeat the Skeleton King.",
      objectives: [
        { id: "reach-dungeon", type: "reach", target: "dungeon-ruined-keep", required: 1, description: "Enter the Ruined Keep" },
        { id: "kill-king", type: "kill", target: "skeleton-king", required: 1, description: "Slay the Skeleton King" }
      ],
      rewards: { xp: 250, gold: 120, items: [{ id: "plate-armor", count: 1 }] },
      autoComplete: true
    },
    "q-deliver-letter": {
      id: "q-deliver-letter",
      name: "A Letter for the Scholar",
      giver: "elder",
      description: "Deliver the elder's letter to the scholar in the next town.",
      objectives: [{ id: "talk-scholar", type: "talk", target: "scholar", required: 1, description: "Speak to the Scholar" }],
      rewards: { xp: 50, gold: 25, items: [] },
      autoComplete: true
    },
    "q-ancient-relic": {
      id: "q-ancient-relic",
      name: "Relics of the Fallen",
      giver: "scholar",
      description: "The scholar studies ancient relics. Recover one.",
      objectives: [{ id: "collect-relic", type: "collect", target: "ancient-relic", required: 1, description: "Recover an Ancient Relic" }],
      rewards: { xp: 300, gold: 150, items: [{ id: "kings-robe", count: 1 }] },
      autoComplete: true
    },
    "q-dragon-scale": {
      id: "q-dragon-scale",
      name: "The Dragon's Price",
      giver: "dragon-hunter",
      description: "The dragon hunter wants a scale from a young dragon.",
      objectives: [{ id: "collect-scale", type: "collect", target: "dragon-scale", required: 1, description: "Acquire a Dragon Scale" }],
      rewards: { xp: 400, gold: 200, items: [{ id: "dwarven-axe", count: 1 }] },
      autoComplete: true
    },
    "q-night-terrors": {
      id: "q-night-terrors",
      name: "Night Terrors",
      giver: "hunter",
      description: "Undead now walk the night. Thin their ranks before they reach the villages.",
      objectives: [
        { id: "kill-zombies", type: "kill", target: "zombie", required: 3, description: "Slay 3 Rotting Zombies" },
        { id: "kill-ghosts", type: "kill", target: "ghost", required: 2, description: "Slay 2 Wailing Ghosts" }
      ],
      rewards: { xp: 220, gold: 100, items: [{ id: "silver-charm", count: 1 }] },
      autoComplete: true
    },
    "q-deeper-depths": {
      id: "q-deeper-depths",
      name: "Into Deeper Depths",
      giver: "guard-captain",
      description: "The Cursed Crypt has a second level few have returned from. Prove your worth by reaching it.",
      objectives: [
        { id: "reach-depth-2", type: "reach", target: "dungeon-cursed-crypt-depth-2", required: 1, description: "Reach Floor 2 of the Cursed Crypt" }
      ],
      rewards: { xp: 280, gold: 130, items: [{ id: "ether-potion", count: 2 }] },
      autoComplete: true
    },
    "dw-defeat-dragonlord": {
      id: "dw-defeat-dragonlord",
      name: "Defeat the Dragonlord",
      giver: "dw-king",
      description: "Slay the Dragonlord in his castle on the isle southwest of Rimuldar and rescue Princess Gwaelin.",
      objectives: [
        { id: "dw-kill-dragonlord", type: "kill", target: "dw-dragonlord-dragon", required: 1, description: "Defeat the Dragonlord's dragon form" }
      ],
      rewards: { xp: 500, gold: 500, items: [] },
      autoComplete: true
    },
    "dw-relics": {
      id: "dw-relics",
      name: "Erdrick's Relics",
      giver: "dw-king",
      description: "Recover the legendary sword and armor of Erdrick to stand a chance against the Dragonlord.",
      objectives: [
        { id: "dw-collect-sword", type: "collect", target: "dw-eridricks-sword", required: 1, description: "Claim Erdrick's Sword" },
        { id: "dw-collect-armor", type: "collect", target: "dw-eridricks-armor", required: 1, description: "Claim Erdrick's Armor" }
      ],
      rewards: { xp: 300, gold: 200, items: [] },
      autoComplete: true
    }
  };
  function questDef(id) {
    const def = QUESTS[id];
    if (!def)
      throw new Error(`unknown quest: ${id}`);
    return def;
  }

  // dist/quest/quest-log.js
  var QuestLog = class {
    states = [];
    constructor(states) {
      if (states) {
        this.states = states.map((s) => ({
          ...s,
          def: questDef(s.def.id),
          objectives: s.objectives.map((o) => ({ ...o, def: { ...o.def } }))
        }));
      }
    }
    attach(bus) {
      const handler = (payload2, event) => {
        const p = payload2 ?? {};
        if (event === "kill")
          this.onKill(String(p.monsterId ?? ""), Number(p.count ?? 1));
        if (event === "collect")
          this.onCollect(String(p.itemId ?? ""), Number(p.count ?? 1));
        if (event === "visit")
          this.onVisit(String(p.featureId ?? ""));
        if (event === "talk")
          this.onTalk(String(p.npcId ?? ""));
        if (event === "reach")
          this.onReach(String(p.dungeonId ?? ""));
      };
      bus.on(["kill", "collect", "visit", "talk", "reach"], handler);
      return () => bus.off(["kill", "collect", "visit", "talk", "reach"], handler);
    }
    getState(questId) {
      return this.states.find((s) => s.def.id === questId);
    }
    isActive(questId) {
      return this.getState(questId)?.status === "active";
    }
    isCompleted(questId) {
      const s = this.getState(questId);
      return s?.status === "completed" || s?.status === "turned-in";
    }
    active() {
      return this.states.filter((s) => s.status === "active");
    }
    completed() {
      return this.states.filter((s) => s.status === "completed" || s.status === "turned-in");
    }
    start(questId, bus) {
      if (this.getState(questId))
        return false;
      const def = questDef(questId);
      if (def.prerequisites && !def.prerequisites.every((p) => this.isCompleted(p)))
        return false;
      const state = {
        def,
        status: "active",
        objectives: def.objectives.map((o) => ({ def: { ...o }, current: 0, done: false }))
      };
      this.states.push(state);
      bus?.emit("quest-start", { questId, name: def.name });
      return true;
    }
    updateObjective(state, objectiveId, amount, bus) {
      const obj = state.objectives.find((o) => o.def.id === objectiveId);
      if (!obj || obj.done)
        return;
      obj.current = Math.min(obj.def.required, obj.current + amount);
      if (obj.current >= obj.def.required) {
        obj.done = true;
        bus?.emit("quest-progress", { questId: state.def.id, objectiveId, message: `${obj.def.description} - done` });
      }
      const allDone = state.objectives.every((o) => o.done);
      if (allDone)
        this.complete(state.def.id, bus);
    }
    onKill(monsterId, count) {
      for (const state of this.active()) {
        for (const obj of state.objectives) {
          if (obj.def.type === "kill" && obj.def.target === monsterId)
            this.updateObjective(state, obj.def.id, count);
        }
      }
    }
    onCollect(itemId, count) {
      for (const state of this.active()) {
        for (const obj of state.objectives) {
          if (obj.def.type === "collect" && obj.def.target === itemId)
            this.updateObjective(state, obj.def.id, count);
        }
      }
    }
    onVisit(featureId) {
      for (const state of this.active()) {
        for (const obj of state.objectives) {
          if (obj.def.type === "visit" && obj.def.target === featureId)
            this.updateObjective(state, obj.def.id, 1);
        }
      }
    }
    onTalk(npcId) {
      for (const state of this.active()) {
        for (const obj of state.objectives) {
          if (obj.def.type === "talk" && obj.def.target === npcId)
            this.updateObjective(state, obj.def.id, 1);
        }
      }
    }
    onReach(dungeonId) {
      for (const state of this.active()) {
        for (const obj of state.objectives) {
          if (obj.def.type === "reach" && obj.def.target === dungeonId)
            this.updateObjective(state, obj.def.id, 1);
        }
      }
    }
    complete(questId, bus) {
      const state = this.getState(questId);
      if (!state || state.status !== "active")
        return null;
      state.status = "completed";
      bus?.emit("quest-complete", { questId, name: state.def.name, rewards: state.def.rewards });
      return state.def.rewards;
    }
    turnIn(questId, bus) {
      const state = this.getState(questId);
      if (!state || state.status !== "completed")
        return null;
      state.status = "turned-in";
      bus?.emit("quest-turnin", { questId, name: state.def.name });
      return state.def.rewards;
    }
    toData() {
      return this.states;
    }
  };

  // dist/data/npcs.js
  var NPCS = {
    elder: {
      id: "elder",
      name: "Elder Bram",
      role: "Village Elder",
      townId: "town-emberfall",
      startDialog: "elder-greet",
      givesQuests: ["q-tutorial", "q-rat-menace", "q-deliver-letter"],
      dialogs: {
        "elder-greet": {
          text: "Welcome, traveler. The realm is dangerous, and our village of Emberfall needs heroes.",
          options: [
            { text: "I'm ready to help. What ails the village?", next: "elder-help" },
            { text: "Tell me about this land.", next: "elder-lore" },
            { text: "Goodbye.", next: "elder-bye" }
          ]
        },
        "elder-help": {
          text: "The rats have grown bold and feasted on our grain stores. Kill enough of them and you will earn our gratitude.",
          options: [
            {
              text: "I'll cull the rats.",
              condition: "no-quest-active:q-rat-menace",
              effect: { startQuest: "q-rat-menace", dialogue: "Bless you, hero. Bring word when the deed is done." }
            },
            {
              text: "I accept the letter quest.",
              condition: "no-quest-active:q-deliver-letter",
              effect: {
                startQuest: "q-deliver-letter",
                giveItem: { id: "elder-letter", count: 1 },
                dialogue: "Take this sealed letter to the scholar in the capital. It must reach him."
              }
            },
            { text: "Back.", next: "elder-greet" }
          ]
        },
        "elder-lore": {
          text: "Emberfall sits at the edge of the wilds. Beyond the forest lie ruined keeps, haunted by the Skeleton King, and in the high mountains, dragons still fly.",
          options: [{ text: "Fascinating. Goodbye.", next: "elder-bye" }]
        },
        "elder-bye": {
          text: "Travel safely, hero."
        }
      }
    },
    blacksmith: {
      id: "blacksmith",
      name: "Rurik Ironhand",
      role: "Blacksmith",
      townId: "town-emberfall",
      startDialog: "smith-greet",
      shop: ["iron-sword", "steel-sword", "war-hammer", "chainmail", "plate-armor", "rune-shield", "mace-of-light"],
      dialogs: {
        "smith-greet": {
          text: "Hmm, a hero's build. I forge the finest steel in Emberfall. Browse my wares or I can craft from raw materials.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Pick your weapon, and make it count." } },
            { text: "What can you craft?", next: "smith-craft" },
            { text: "Goodbye.", next: "smith-bye" }
          ]
        },
        "smith-craft": {
          text: "Bring me iron ore and coal, and I will forge iron weapons and armor for you. Raw ore can be smelted at a forge.",
          options: [{ text: "Goodbye.", next: "smith-bye" }]
        },
        "smith-bye": { text: "Stay sharp out there." }
      }
    },
    alchemist: {
      id: "alchemist",
      name: "Mira Pebble",
      role: "Alchemist",
      townId: "town-emberfall",
      startDialog: "alch-greet",
      shop: ["healing-potion", "mana-potion", "antidote", "greater-healing-potion", "ether-potion"],
      dialogs: {
        "alch-greet": {
          text: "Potions for every wound and worry. I also buy rare ingredients.",
          options: [
            { text: "Let me shop.", effect: { openShop: true, dialogue: "Bottoms up!" } },
            { text: "Goodbye.", next: "alch-bye" }
          ]
        },
        "alch-bye": { text: "Mind your health, adventurer." }
      }
    },
    innkeeper: {
      id: "innkeeper",
      name: "Sara Longleaf",
      role: "Innkeeper",
      townId: "town-emberfall",
      startDialog: "inn-greet",
      shop: ["minor-healing-potion", "torch", "ration"],
      healService: true,
      dialogs: {
        "inn-greet": {
          text: "A room and a warm meal await you. I can patch you up for a few coins.",
          options: [
            { text: "Heal me, please.", effect: { healPlayer: true, dialogue: "Good as new! That'll be 10 gold." } },
            { text: "What do you sell?", effect: { openShop: true, dialogue: "Provisions for the road." } },
            { text: "Goodbye.", next: "inn-bye" }
          ]
        },
        "inn-bye": { text: "Rest well, traveler." }
      }
    },
    merchant: {
      id: "merchant",
      name: "Tomas Coin",
      role: "General Merchant",
      townId: "town-hollowbrook",
      startDialog: "merch-greet",
      shop: ["dagger", "leather-armor", "buckler", "iron-ring", "fox-talisman", "minor-healing-potion", "torch", "ration", "silver-charm", "holy-ward", "lute-of-bard"],
      dialogs: {
        "merch-greet": {
          text: "Buying or selling, I'm your man. I pay fair coin for anything.",
          options: [
            { text: "Let me browse.", effect: { openShop: true, dialogue: "Take a look." } },
            { text: "Goodbye.", next: "merch-bye" }
          ]
        },
        "merch-bye": { text: "Pleasure doing business." }
      }
    },
    "guard-captain": {
      id: "guard-captain",
      name: "Captain Aldous",
      role: "Guard Captain",
      townId: "town-hollowbrook",
      startDialog: "guard-greet",
      givesQuests: ["q-bandit-threat", "q-dungeon-clear", "q-deeper-depths"],
      dialogs: {
        "guard-greet": {
          text: "You look capable. The roads are plagued by bandits, and the Ruined Keep has stirred awake once more.",
          options: [
            {
              text: "I'll deal with the bandits.",
              condition: "no-quest-active:q-bandit-threat",
              effect: { startQuest: "q-bandit-threat", dialogue: "Good hunting. Report back when the roads are safe." }
            },
            {
              text: "I will cleanse the Ruined Keep.",
              condition: "no-quest-active:q-dungeon-clear",
              effect: { startQuest: "q-dungeon-clear", dialogue: "The Skeleton King sits at its heart. Do not die." }
            },
            {
              text: "I'll seek the second level of the Cursed Crypt.",
              condition: "no-quest-active:q-deeper-depths",
              effect: { startQuest: "q-deeper-depths", dialogue: "Few return from that depth. Be sure to prepare." }
            },
            { text: "Goodbye.", next: "guard-bye" }
          ]
        },
        "guard-bye": { text: "The realm depends on heroes like you." }
      }
    },
    hunter: {
      id: "hunter",
      name: "Willa Fern",
      role: "Hunter",
      townId: "town-hollowbrook",
      startDialog: "hunter-greet",
      givesQuests: ["q-spider-cull", "q-night-terrors"],
      dialogs: {
        "hunter-greet": {
          text: "Spiders in the deep woods have spun silk worth a fortune, but they're dangerous. Bring me their silk and thin their numbers.",
          options: [
            {
              text: "I'll hunt the spiders.",
              condition: "no-quest-active:q-spider-cull",
              effect: { startQuest: "q-spider-cull", dialogue: "Mind their venom." }
            },
            {
              text: "What stalks the night?",
              condition: "no-quest-active:q-night-terrors",
              effect: { startQuest: "q-night-terrors", dialogue: "The dead walk after dark. Kill enough and I'll see you rewarded." }
            },
            { text: "Goodbye.", next: "hunter-bye" }
          ]
        },
        "hunter-bye": { text: "Watch your step in the forest." }
      }
    },
    scholar: {
      id: "scholar",
      name: "Archivist Lyra",
      role: "Scholar",
      townId: "town-brightport",
      startDialog: "scholar-greet",
      givesQuests: ["q-ancient-relic"],
      dialogs: {
        "scholar-greet": {
          text: "The archives are vast, and the past still has secrets to yield. I would pay handsomely for relics of the fallen.",
          options: [
            {
              text: "I'll search for an ancient relic.",
              condition: "no-quest-active:q-ancient-relic",
              effect: { startQuest: "q-ancient-relic", dialogue: "Search the old ruins and the cursed keeps." }
            },
            { text: "Goodbye.", next: "scholar-bye" }
          ]
        },
        "scholar-bye": { text: "Knowledge is the truest treasure." }
      }
    },
    "dragon-hunter": {
      id: "dragon-hunter",
      name: "Sir Aldric",
      role: "Dragon Hunter",
      townId: "town-brightport",
      startDialog: "dragon-greet",
      givesQuests: ["q-dragon-scale"],
      dialogs: {
        "dragon-greet": {
          text: "A dragon nests in the mountains. Bring me one of its scales, and you'll be rewarded handsomely.",
          options: [
            {
              text: "I'll face the dragon.",
              condition: "no-quest-active:q-dragon-scale",
              effect: { startQuest: "q-dragon-scale", dialogue: "It breathes fire. Come prepared." }
            },
            { text: "Goodbye.", next: "dragon-bye" }
          ]
        },
        "dragon-bye": { text: "May the wind be at your back." }
      }
    },
    "dw-king": {
      id: "dw-king",
      name: "King Lorik",
      role: "King of Alefgard",
      townId: "dw-town-tantegel",
      startDialog: "dw-king-greet",
      givesQuests: ["dw-defeat-dragonlord", "dw-relics"],
      dialogs: {
        "dw-king-greet": {
          text: "Welcome, descendant of Erdrick. Our beloved Princess Gwaelin has been carried off by the Dragonlord of Charlock Castle. All of Alefgard trembles beneath his shadow.",
          options: [
            { text: "Tell me of the Dragonlord.", next: "dw-king-lore" },
            {
              text: "I will save the princess!",
              condition: "not-flag:dw-king-gold",
              effect: { startQuest: "dw-defeat-dragonlord", startQuests: ["dw-relics"], rewardGold: 150, setFlag: "dw-king-gold", dialogue: "Take this gold, brave hero. Gear yourself well, and bring her home." }
            },
            {
              text: "The task is still before me.",
              condition: "flag:dw-king-gold",
              effect: { startQuest: "dw-defeat-dragonlord", dialogue: "Then do not tarry. The princess awaits." }
            },
            {
              text: "Princess, you are safe at last.",
              condition: "flag:dw-gwaelin-rescued",
              next: "dw-king-shield"
            },
            { text: "Goodbye.", next: "dw-king-bye" }
          ]
        },
        "dw-king-lore": {
          text: "The Dragonlord rules from his castle on the isle southwest of Rimuldar. Only with the relics of Erdrick may you hope to face him. Seek his sword and his armor across Alefgard.",
          options: [{ text: "I understand.", next: "dw-king-bye" }]
        },
        "dw-king-shield": {
          text: "You freed our Gwaelin! Take this shield, forged in Erdrick's time. May it guard you as you finish what he began.",
          options: [
            {
              text: "Thank you, Your Majesty.",
              condition: "not-flag:dw-king-shield",
              effect: { giveItem: { id: "dw-eridricks-shield", count: 1 }, setFlag: "dw-king-shield", dialogue: "Go now, hero of Alefgard." }
            },
            { text: "Goodbye.", next: "dw-king-bye" }
          ]
        },
        "dw-king-bye": { text: "May Erdrick's blood guide you." }
      }
    },
    "dw-tantegel-inn": {
      id: "dw-tantegel-inn",
      name: "Tantegel Innkeeper",
      role: "Innkeeper",
      townId: "dw-town-tantegel",
      startDialog: "dw-inn-greet",
      healService: true,
      dialogs: {
        "dw-inn-greet": {
          text: "Welcome to the inn of Tantegel Castle. Rest a while and mend your wounds?",
          options: [
            { text: "Yes, rest me.", effect: { healPlayer: true, dialogue: "Rest well, hero. The Dragonlord grows stronger by the day." } },
            { text: "No thanks.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-tantegel-guard": {
      id: "dw-tantegel-guard",
      name: "Castle Guard",
      role: "Guard",
      townId: "dw-town-tantegel",
      startDialog: "dw-guard-greet",
      dialogs: {
        "dw-guard-greet": {
          text: "Halt... oh, a descendant of Erdrick. The road east leads to Brecconary. Beware the slimes that frolic in the grass.",
          options: [{ text: "Thank you, guard.", next: "dw-shop-bye" }]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-brecconary-weapon": {
      id: "dw-brecconary-weapon",
      name: "Brecconary Weapon Dealer",
      role: "Weapon Dealer",
      townId: "dw-town-brecconary",
      startDialog: "dw-shop-greet",
      shop: ["dw-copper-sword"],
      dialogs: {
        "dw-shop-greet": {
          text: "Welcome. A hero of Alefgard needs a good blade.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-brecconary-armor": {
      id: "dw-brecconary-armor",
      name: "Brecconary Armorer",
      role: "Armor Dealer",
      townId: "dw-town-brecconary",
      startDialog: "dw-shop-greet",
      shop: ["dw-leather", "dw-small-shield"],
      dialogs: {
        "dw-shop-greet": {
          text: "Leather, cloth, and shields for a budding hero.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-brecconary-item": {
      id: "dw-brecconary-item",
      name: "Brecconary Merchant",
      role: "Item Dealer",
      townId: "dw-town-brecconary",
      startDialog: "dw-shop-greet",
      shop: ["dw-herb", "dw-torch", "dw-fairy-water"],
      dialogs: {
        "dw-shop-greet": {
          text: "Herbs, torches, and fairy water. Everything a traveler needs.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-kol-weapon": {
      id: "dw-kol-weapon",
      name: "Kol Weapon Dealer",
      role: "Weapon Dealer",
      townId: "dw-town-kol",
      startDialog: "dw-shop-greet",
      shop: ["dw-hand-axe"],
      dialogs: {
        "dw-shop-greet": {
          text: "The hand axes of Kol can bite through drake hides.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-kol-armor": {
      id: "dw-kol-armor",
      name: "Kol Armorer",
      role: "Armor Dealer",
      townId: "dw-town-kol",
      startDialog: "dw-shop-greet",
      shop: ["dw-chain"],
      dialogs: {
        "dw-shop-greet": {
          text: "Chain mail, forged to turn the teeth of monsters.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-kol-item": {
      id: "dw-kol-item",
      name: "Kol Merchant",
      role: "Item Dealer",
      townId: "dw-town-kol",
      startDialog: "dw-shop-greet",
      shop: ["dw-herb", "dw-fairy-water", "dw-wing", "dw-torch", "dw-key"],
      dialogs: {
        "dw-shop-greet": {
          text: "Herbs, fairy water, and a wing to carry you home. Magic keys too, for a locked door in the Dragonlord's castle.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-rimuldar-weapon": {
      id: "dw-rimuldar-weapon",
      name: "Rimuldar Weapon Dealer",
      role: "Weapon Dealer",
      townId: "dw-town-rimuldar",
      startDialog: "dw-shop-greet",
      shop: ["dw-broad-sword"],
      dialogs: {
        "dw-shop-greet": {
          text: "Only the broad sword will do for what lurks around Rimuldar.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-rimuldar-armor": {
      id: "dw-rimuldar-armor",
      name: "Rimuldar Armorer",
      role: "Armor Dealer",
      townId: "dw-town-rimuldar",
      startDialog: "dw-shop-greet",
      shop: ["dw-half-plate"],
      dialogs: {
        "dw-shop-greet": {
          text: "Half plate, sturdy enough for the swamps of Rimuldar.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-rimuldar-item": {
      id: "dw-rimuldar-item",
      name: "Rimuldar Merchant",
      role: "Item Dealer",
      townId: "dw-town-rimuldar",
      startDialog: "dw-shop-greet",
      shop: ["dw-herb", "dw-fairy-water", "dw-wing", "dw-key"],
      dialogs: {
        "dw-shop-greet": {
          text: "Magical keys here! They unlock sealed doors in the Dragonlord's castle.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-rimuldar-hint": {
      id: "dw-rimuldar-hint",
      name: "Rimuldar Elder",
      role: "Wise One",
      townId: "dw-town-rimuldar",
      startDialog: "dw-hint-rain",
      dialogs: {
        "dw-hint-rain": {
          text: "To the east of Kol lies a shrine that commands the rain. Pray at it, and the stream blocking the way to Erdrick's cave shall part. His sword awaits within.",
          options: [{ text: "Thank you.", next: "dw-shop-bye" }]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-garinham-weapon": {
      id: "dw-garinham-weapon",
      name: "Garinham Weapon Dealer",
      role: "Weapon Dealer",
      townId: "dw-town-garinham",
      startDialog: "dw-shop-greet",
      shop: ["dw-broad-sword"],
      dialogs: {
        "dw-shop-greet": {
          text: "Garinham's smiths temper the finest broad swords.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-garinham-armor": {
      id: "dw-garinham-armor",
      name: "Garinham Armorer",
      role: "Armor Dealer",
      townId: "dw-town-garinham",
      startDialog: "dw-shop-greet",
      shop: ["dw-full-plate", "dw-large-shield"],
      dialogs: {
        "dw-shop-greet": {
          text: "Full plate and great shields, fit for the road south.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-garinham-item": {
      id: "dw-garinham-item",
      name: "Garinham Merchant",
      role: "Item Dealer",
      townId: "dw-town-garinham",
      startDialog: "dw-shop-greet",
      shop: ["dw-herb", "dw-fairy-water", "dw-wing", "dw-key"],
      dialogs: {
        "dw-shop-greet": {
          text: "Stock up before the desert south of here.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-garinham-hint": {
      id: "dw-garinham-hint",
      name: "Garinham Sage",
      role: "Wise One",
      townId: "dw-town-garinham",
      startDialog: "dw-hint-armor",
      dialogs: {
        "dw-hint-armor": {
          text: "Erdrick's Armor lies in the cave to the southwest of Garinham, watched over by a golem of living stone.",
          options: [{ text: "Thank you.", next: "dw-shop-bye" }]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-cantlin-weapon": {
      id: "dw-cantlin-weapon",
      name: "Cantlin Weapon Dealer",
      role: "Weapon Dealer",
      townId: "dw-town-cantlin",
      startDialog: "dw-shop-greet",
      shop: ["dw-broad-sword"],
      dialogs: {
        "dw-shop-greet": {
          text: "Cantlin arms the bravest souls of Alefgard.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-cantlin-armor": {
      id: "dw-cantlin-armor",
      name: "Cantlin Armorer",
      role: "Armor Dealer",
      townId: "dw-town-cantlin",
      startDialog: "dw-shop-greet",
      shop: ["dw-full-plate", "dw-magic-armor", "dw-silver-shield"],
      dialogs: {
        "dw-shop-greet": {
          text: "The finest armor in Alefgard, including enchanted magic armor.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-cantlin-item": {
      id: "dw-cantlin-item",
      name: "Cantlin Merchant",
      role: "Item Dealer",
      townId: "dw-town-cantlin",
      startDialog: "dw-shop-greet",
      shop: ["dw-herb", "dw-fairy-water", "dw-wing", "dw-key"],
      dialogs: {
        "dw-shop-greet": {
          text: "Last stop before the Dragonlord's isle. Stock up.",
          options: [
            { text: "Let me see your wares.", effect: { openShop: true, dialogue: "Take your pick." } },
            { text: "Goodbye.", next: "dw-shop-bye" }
          ]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    },
    "dw-cantlin-hint": {
      id: "dw-cantlin-hint",
      name: "Cantlin Seer",
      role: "Wise One",
      townId: "dw-town-cantlin",
      startDialog: "dw-hint-castle",
      dialogs: {
        "dw-hint-castle": {
          text: "Charlock Castle, the Dragonlord's fortress, stands on the isle southwest of Rimuldar. Cross the sea and face him with Erdrick's relics. He may offer you a dark bargain... refuse it.",
          options: [{ text: "Thank you.", next: "dw-shop-bye" }]
        },
        "dw-shop-bye": { text: "Fare well on your quest." }
      }
    }
  };
  function npcDef(id) {
    const def = NPCS[id];
    if (!def)
      throw new Error(`unknown npc: ${id}`);
    return def;
  }

  // dist/npc/dialog.js
  function getNpc(id) {
    return npcDef(id);
  }
  function getDialog(npc, nodeId) {
    const node = npc.dialogs[nodeId];
    if (node)
      return node;
    return { text: `${npc.name} has nothing more to say.` };
  }
  function evaluateCondition(cond, game) {
    if (!cond)
      return true;
    const [kind, value] = cond.split(":");
    switch (kind) {
      case "always":
        return true;
      case "no-quest-active":
        return !game.questLog.isActive(value);
      case "no-quest-done":
        return !game.questLog.isCompleted(value);
      case "quest-active":
        return game.questLog.isActive(value);
      case "quest-complete":
        return game.questLog.isCompleted(value);
      case "has-item":
        return game.hasItem(value);
      case "flag":
        return Boolean(game.flags[value]);
      case "not-flag":
        return !game.flags[value];
      default:
        return true;
    }
  }
  function applyEffect(effect, game) {
    if (!effect)
      return;
    if (effect.startQuest)
      game.startQuest(effect.startQuest);
    if (effect.startQuests)
      effect.startQuests.forEach((id) => game.startQuest(id));
    if (effect.giveItem)
      game.giveItem(effect.giveItem.id, effect.giveItem.count);
    if (effect.rewardGold)
      game.rewardGold(effect.rewardGold);
    if (effect.healPlayer)
      game.healPlayer();
    if (effect.setFlag)
      game.setFlag(effect.setFlag);
  }

  // dist/data/trials.js
  var TRIALS = {
    "trial-fire": {
      id: "trial-fire",
      name: "Trial of Fire",
      description: "Prove your heart against a burning colossus.",
      levelReq: 15,
      enemies: ["trial-fire"],
      rewards: { xp: 400, gold: 120, items: [{ id: "essence-of-fire", count: 1 }] },
      repeatRewards: { xp: 120, gold: 25, items: [] },
      flagKey: "trial-fire-cleared"
    },
    "trial-shadow": {
      id: "trial-shadow",
      name: "Trial of Shadow",
      description: "Outlast the creeping dark and its lord.",
      levelReq: 22,
      enemies: ["trial-shadow"],
      rewards: { xp: 700, gold: 200, items: [{ id: "gem", count: 2 }] },
      repeatRewards: { xp: 200, gold: 40, items: [] },
      flagKey: "trial-shadow-cleared"
    },
    "trial-storm": {
      id: "trial-storm",
      name: "Trial of Storm",
      description: "Stand against the wrath of the heavens.",
      levelReq: 30,
      enemies: ["trial-storm"],
      rewards: { xp: 1100, gold: 320, items: [{ id: "storm-essence", count: 1 }] },
      repeatRewards: { xp: 300, gold: 60, items: [] },
      flagKey: "trial-storm-cleared"
    },
    "trial-moon": {
      id: "trial-moon",
      name: "Trial of the Moon",
      description: "Banish the lunar warden that howls beneath the silver light.",
      levelReq: 35,
      enemies: ["trial-moon"],
      rewards: { xp: 1400, gold: 400, items: [{ id: "moon-tear", count: 1 }] },
      repeatRewards: { xp: 350, gold: 70, items: [] },
      flagKey: "trial-moon-cleared"
    },
    "trial-undead": {
      id: "trial-undead",
      name: "Trial of the Dead",
      description: "Seal the restless dead beneath the shrine.",
      levelReq: 40,
      enemies: ["trial-undead"],
      rewards: { xp: 1800, gold: 500, items: [{ id: "tower-key", count: 1 }] },
      repeatRewards: { xp: 450, gold: 90, items: [] },
      flagKey: "trial-undead-cleared"
    }
  };
  function trialDef(id) {
    const def = TRIALS[id];
    if (!def)
      throw new Error(`unknown trial: ${id}`);
    return def;
  }

  // dist/data/raids.js
  var RAIDS = {
    "raid-colossus": {
      id: "raid-colossus",
      name: "The Colossus Awakens",
      description: "A ruined giant stirs in the mountains. Requires a Raid Whistle.",
      levelReq: 20,
      entryItem: "raid-whistle",
      stages: [
        { name: "The Awakening", message: "The mountain shakes. Colossus rises.", enemies: ["raid-colossus"] }
      ],
      healBetweenPct: 0.25,
      rewards: { xp: 900, gold: 250, items: [{ id: "colossus-core", count: 1 }] },
      repeatable: false
    },
    "raid-warlord": {
      id: "raid-warlord",
      name: "The Warlord's March",
      description: "A warlord has taken the border keeps. Requires a Raid Whistle.",
      levelReq: 32,
      entryItem: "raid-whistle",
      stages: [
        { name: "The Gates", message: "War horns sound across the valley.", enemies: ["tower-champion"] },
        { name: "The Warlord", message: "The Warlord himself blocks the keep gate.", enemies: ["raid-warlord"] }
      ],
      healBetweenPct: 0.3,
      rewards: { xp: 1800, gold: 600, items: [{ id: "warlord-blade", count: 1 }] },
      repeatable: false
    },
    "raid-void-tyrant": {
      id: "raid-void-tyrant",
      name: "The Void Tyrant",
      description: "A void-spawned tyrant hungers for the realm. Requires a Raid Whistle.",
      levelReq: 50,
      entryItem: "raid-whistle",
      stages: [
        { name: "The Dark Procession", message: "Shadow knights march from a weeping rift.", enemies: ["trial-shadow"] },
        { name: "The Void Tyrant", message: "The tyrant's gaze extinguishes hope.", enemies: ["raid-void-tyrant"] }
      ],
      healBetweenPct: 0.3,
      rewards: { xp: 3200, gold: 1200, items: [{ id: "void-crown", count: 1 }] },
      repeatable: false
    },
    "raid-dragon-king": {
      id: "raid-dragon-king",
      name: "The Dragon King",
      description: "The Dragon King descends upon the realm. Requires a Raid Whistle.",
      levelReq: 60,
      entryItem: "raid-whistle",
      stages: [
        { name: "The Wyrm's Brood", message: "Hatchlings guard the hoard.", enemies: ["tower-wyrm"] },
        { name: "The Queen's Guard", message: "An ancient dragon knight bars the way.", enemies: ["tower-sentinel"] },
        { name: "The Dragon King", message: "The Dragon King breathes a world-ending flame.", enemies: ["raid-dragon-king"] }
      ],
      healBetweenPct: 0.35,
      rewards: { xp: 5e3, gold: 2e3, items: [{ id: "dragon-king-crown", count: 1 }] },
      repeatable: false
    }
  };
  function raidDef(id) {
    const def = RAIDS[id];
    if (!def)
      throw new Error(`unknown raid: ${id}`);
    return def;
  }

  // dist/tower/tower.js
  var TOWER_MAX_FLOOR = 100;
  var TOWER_BOSS_FLOORS = [10, 25, 50, 75, 100];
  var TOWER_BOSS_FOR_FLOOR = {
    10: "tower-sentinel",
    25: "tower-champion",
    50: "tower-wyrm",
    75: "tower-celestial",
    100: "tower-avatar"
  };
  var TOWER_POOLS = [
    { min: 1, max: 10, pool: ["rat", "skeleton", "goblin", "tower-sentinel"] },
    { min: 11, max: 25, pool: ["tower-champion", "stone-golem", "bandit", "undead-priest", "harpy"] },
    { min: 26, max: 50, pool: ["tower-wyrm", "harpy", "troll", "fire-elemental", "greater-wolf"] },
    { min: 51, max: 100, pool: ["tower-avatar", "tower-celestial", "elder-lich", "dragon", "storm-elemental"] }
  ];
  function towerMonsterLevel(floor) {
    if (floor <= 10)
      return 1 + floor;
    if (floor <= 25)
      return Math.round(11 + (floor - 10) * 1.4);
    if (floor <= 50)
      return Math.round(32 + (floor - 25) * 0.9);
    return Math.round(54 + (floor - 50) * 0.9);
  }
  function towerBossForFloor(floor) {
    return TOWER_BOSS_FOR_FLOOR[floor];
  }
  function towerChestLevel(floor) {
    return Math.min(4, 1 + Math.floor(floor / 12));
  }
  function towerPoolFor(floor) {
    const band = TOWER_POOLS.find((b) => floor >= b.min && floor <= b.max);
    return band ? band.pool : TOWER_POOLS[0].pool;
  }
  function generateTowerSeed(baseSeed, floor) {
    return Math.imul(baseSeed, 2654435761) ^ floor * 1099511628211;
  }
  function buildTowerFloor(floor, baseSeed) {
    const bossId = towerBossForFloor(floor);
    return generateDungeon({
      id: "tower",
      name: `Tower Floor ${floor}`,
      seed: generateTowerSeed(baseSeed, floor),
      width: 28,
      height: 28,
      roomCount: 8,
      monsterPool: towerPoolFor(floor),
      maxMonsters: Math.min(10, 6 + Math.floor(floor / 10)),
      bossId,
      chestLevel: Math.min(4, 1 + Math.floor(floor / 12)),
      depth: TOWER_MAX_FLOOR,
      floor
    });
  }

  // dist/dw/alefgard.js
  var ALEFGARD_SIZE = 128;
  var RAIN_BARRIER = (() => {
    const tiles = [];
    for (let x = 84; x <= 92; x++) {
      for (let y = 28; y <= 29; y++)
        tiles.push({ x, y });
    }
    return tiles;
  })();
  function isRainBarrier(x, y) {
    return RAIN_BARRIER.some((t) => t.x === x && t.y === y);
  }
  var TOWNS = [
    { id: "dw-town-tantegel", name: "Tantegel Castle", x: 58, y: 34, npcs: ["dw-king", "dw-tantegel-inn", "dw-tantegel-guard"] },
    { id: "dw-town-brecconary", name: "Brecconary", x: 82, y: 46, npcs: ["dw-brecconary-weapon", "dw-brecconary-armor", "dw-brecconary-item"] },
    { id: "dw-town-kol", name: "Kol", x: 74, y: 66, npcs: ["dw-kol-weapon", "dw-kol-armor", "dw-kol-item"] },
    { id: "dw-town-rimuldar", name: "Rimuldar", x: 40, y: 70, npcs: ["dw-rimuldar-weapon", "dw-rimuldar-armor", "dw-rimuldar-item", "dw-rimuldar-hint"] },
    { id: "dw-town-garinham", name: "Garinham", x: 86, y: 88, npcs: ["dw-garinham-weapon", "dw-garinham-armor", "dw-garinham-item", "dw-garinham-hint"] },
    { id: "dw-town-cantlin", name: "Cantlin", x: 76, y: 104, npcs: ["dw-cantlin-weapon", "dw-cantlin-armor", "dw-cantlin-item", "dw-cantlin-hint"] }
  ];
  var DUNGEONS = [
    { id: "dw-dungeon-castle", name: "Charlock Castle", x: 30, y: 92, dungeonId: "dw-castle" },
    { id: "dw-dungeon-eridricks-cave", name: "Erdrick's Cave", x: 88, y: 22, dungeonId: "dw-eridricks-cave" },
    { id: "dw-dungeon-armor-cave", name: "Armor Cave", x: 78, y: 92, dungeonId: "dw-armor-cave" }
  ];
  var SHRINES = [
    { id: "dw-shrine-rain", name: "Rain Shrine", x: 70, y: 32 }
  ];
  var n = ALEFGARD_SIZE;
  function makeGrid() {
    const grid = [];
    for (let y = 0; y < n; y++) {
      const row = [];
      for (let x = 0; x < n; x++)
        row.push(makeTile("water", false, "sea"));
      grid.push(row);
    }
    return grid;
  }
  function fillRect(grid, x0, y0, x1, y1, tile) {
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        if (x < 0 || y < 0 || x >= n || y >= n)
          continue;
        grid[y][x] = tile;
      }
    }
  }
  function fillEllipse(grid, cx, cy, rx, ry, tile) {
    for (let y = cy - ry; y <= cy + ry; y++) {
      for (let x = cx - rx; x <= cx + rx; x++) {
        if (x < 0 || y < 0 || x >= n || y >= n)
          continue;
        const dx = (x - cx) / rx;
        const dy = (y - cy) / ry;
        if (dx * dx + dy * dy <= 1)
          grid[y][x] = tile;
      }
    }
  }
  function ellipseAt(grid, cx, cy, rx, ry, type, variant, walkable) {
    fillEllipse(grid, cx, cy, rx, ry, makeTile(type, walkable, variant));
  }
  function carvePath(grid, a, b) {
    let x = a.x;
    let y = a.y;
    const step = (nx, ny) => {
      const tile = grid[ny][nx];
      if (tile.walkable && tile.type !== "town" && tile.type !== "dungeon" && tile.type !== "shrine") {
        tile.type = "path";
        tile.variant = "road";
      }
    };
    while (x !== b.x) {
      step(x, y);
      x += Math.sign(b.x - x);
    }
    while (y !== b.y) {
      step(x, y);
      y += Math.sign(b.y - y);
    }
    step(x, y);
  }
  function buildAlefgard() {
    const grid = makeGrid();
    fillEllipse(grid, 62, 66, 58, 44, makeTile("plains", true, "plains"));
    fillEllipse(grid, 30, 94, 18, 16, makeTile("plains", true, "plains"));
    fillEllipse(grid, 98, 26, 18, 14, makeTile("plains", true, "plains"));
    fillEllipse(grid, 86, 96, 14, 12, makeTile("plains", true, "plains"));
    fillRect(grid, 4, 78, 38, 84, makeTile("water", false, "sea"));
    fillRect(grid, 4, 28, 106, 29, makeTile("water", false, "stream"));
    for (let y = 24; y <= 27; y++) {
      for (let x = 46; x <= 106; x++) {
        grid[y][x] = makeTile("grassland", true, "riverbank");
      }
    }
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (grid[y][x].type !== "water")
          continue;
        if (grid[y][x].variant === "stream")
          continue;
        const neighbors = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1]
        ];
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && ny >= 0 && nx < n && ny < n && grid[ny][nx].type !== "water") {
            grid[y][x] = makeTile("shore", true, "coast");
            break;
          }
        }
      }
    }
    const mnt = (cx, cy, rx, ry) => ellipseAt(grid, cx, cy, rx, ry, "mountain", "mountains", false);
    const frs = (cx, cy, rx, ry) => ellipseAt(grid, cx, cy, rx, ry, "forest", "forest", true);
    const swp = (cx, cy, rx, ry) => ellipseAt(grid, cx, cy, rx, ry, "swamp", "swamp", true);
    const dsz = (cx, cy, rx, ry) => ellipseAt(grid, cx, cy, rx, ry, "desert", "desert", true);
    const hll = (cx, cy, rx, ry) => ellipseAt(grid, cx, cy, rx, ry, "hills", "hills", true);
    const grs = (cx, cy, rx, ry) => ellipseAt(grid, cx, cy, rx, ry, "grassland", "grassland", true);
    mnt(24, 16, 8, 10);
    mnt(40, 14, 9, 10);
    mnt(58, 18, 6, 8);
    mnt(70, 12, 9, 10);
    mnt(86, 10, 8, 9);
    mnt(100, 16, 9, 10);
    mnt(12, 62, 6, 20);
    mnt(112, 70, 6, 26);
    mnt(60, 94, 5, 5);
    frs(82, 42, 9, 6);
    frs(80, 74, 9, 6);
    frs(60, 52, 8, 5);
    frs(64, 62, 6, 5);
    frs(96, 60, 5, 4);
    swp(30, 66, 7, 5);
    swp(58, 70, 6, 4);
    dsz(85, 100, 26, 8);
    dsz(66, 90, 8, 4);
    hll(48, 56, 5, 4);
    hll(70, 52, 5, 4);
    hll(56, 84, 6, 4);
    hll(96, 64, 5, 4);
    hll(20, 56, 4, 4);
    grs(58, 42, 16, 8);
    grs(76, 60, 10, 8);
    grs(40, 68, 8, 6);
    grs(84, 82, 8, 6);
    grs(70, 98, 10, 6);
    const features = [];
    const place = (kind, id, name, x, y, extra = {}) => {
      const tileType = kind === "town" ? "town" : kind === "dungeon" ? "dungeon" : "shrine";
      grid[y][x] = makeTile(tileType, true);
      grid[y][x].featureId = id;
      const feature = { id, kind, name, x, y, ...extra };
      features.push(feature);
      return feature;
    };
    for (const t of TOWNS) {
      place("town", t.id, t.name, t.x, t.y, { npcs: t.npcs });
    }
    for (const d of DUNGEONS) {
      place("dungeon", d.id, d.name, d.x, d.y, { dungeonId: d.dungeonId });
    }
    for (const s of SHRINES) {
      place("shrine", s.id, s.name, s.x, s.y);
    }
    const spawn = { x: 58, y: 38 };
    grid[spawn.y][spawn.x] = makeTile("plains", true, "spawn");
    const byId = new Map(features.map((f) => [f.id, { x: f.x, y: f.y }]));
    const road = (aId, bId) => {
      const a = byId.get(aId);
      const b = byId.get(bId);
      if (a && b)
        carvePath(grid, a, b);
    };
    road("dw-town-tantegel", "dw-town-brecconary");
    road("dw-town-brecconary", "dw-town-kol");
    road("dw-town-kol", "dw-town-rimuldar");
    road("dw-town-kol", "dw-town-garinham");
    road("dw-town-garinham", "dw-town-cantlin");
    road("dw-town-rimuldar", "dw-dungeon-castle");
    road("dw-town-brecconary", "dw-shrine-rain");
    return { grid, features, spawn };
  }

  // dist/dw/pools.js
  var DW_POOLS = {
    forest: ["dw-slime", "dw-red-slime", "dw-drakeema", "dw-drakee", "dw-druin", "dw-wraith", "dw-wyvern", "dw-metal-slime"],
    swamp: ["dw-ghost", "dw-scorpion", "dw-wraith", "dw-magician", "dw-warlock", "dw-druin"],
    grassland: ["dw-slime", "dw-red-slime", "dw-drakeema", "dw-drakee", "dw-druin", "dw-rattler"],
    plains: ["dw-slime", "dw-red-slime", "dw-druin", "dw-rattler", "dw-knight", "dw-demon-knight", "dw-metal-slime"],
    hills: ["dw-drakee", "dw-druin", "dw-wyvern", "dw-green-dragon", "dw-red-dragon", "dw-starwyvern"],
    shore: ["dw-slime", "dw-red-slime", "dw-drakeema"],
    desert: ["dw-scorpion", "dw-wyvern", "dw-green-dragon", "dw-starwyvern", "dw-golem", "dw-red-dragon"]
  };
  function dwEncounterPool(tileType, level) {
    const pool = DW_POOLS[tileType] ?? ["dw-slime", "dw-red-slime"];
    return pool.filter((id) => {
      const def = monsterDef(id);
      return def.level >= level - 2 && def.level <= level + 2;
    });
  }

  // dist/dw/dungeons.js
  var DW_CHEST_PLACEMENTS = {
    "dw-eridricks-cave": [
      { floor: 1, variant: "dw-chest-gold" },
      { floor: 2, variant: "dw-chest-eridricks-sword" }
    ],
    "dw-armor-cave": [
      { floor: 1, variant: "dw-chest-gold" },
      { floor: 2, variant: "dw-chest-eridricks-armor" }
    ],
    "dw-castle": [
      { floor: 1, variant: "dw-chest-gold" },
      { floor: 2, variant: "dw-chest-gold-big" },
      { floor: 3, variant: "dw-chest-gwaelin" }
    ]
  };
  function dwFixedChestVariant(key, floor) {
    return DW_CHEST_PLACEMENTS[key]?.find((c) => c.floor === floor)?.variant ?? null;
  }
  function stoneNeighbor(grid, exit) {
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ]) {
      const nx = exit.x + dx;
      const ny = exit.y + dy;
      if (nx >= 0 && ny >= 0 && ny < grid.length && nx < grid[ny].length && grid[ny][nx].type === "stone") {
        return { x: nx, y: ny };
      }
    }
    return null;
  }
  function authorDwDungeon(dungeon, key) {
    const variant = dwFixedChestVariant(key, dungeon.floor);
    for (let y = 0; y < dungeon.grid.length; y++) {
      for (let x = 0; x < dungeon.grid[y].length; x++) {
        if (dungeon.grid[y][x].type === "chest") {
          dungeon.grid[y][x] = makeTile("stone", true, "dungeon floor");
        }
      }
    }
    dungeon.chests = [];
    if (!variant)
      return;
    const spot = stoneNeighbor(dungeon.grid, dungeon.exit) ?? { x: dungeon.exit.x + 1, y: dungeon.exit.y };
    dungeon.grid[spot.y][spot.x] = makeTile("chest", true, variant);
    dungeon.chests.push(spot);
  }

  // dist/blueprint/nodes.js
  var toNum = (v) => typeof v === "number" ? v : Number(v) || 0;
  var toInt = (v) => Math.trunc(toNum(v));
  var toBool = (v) => Boolean(v);
  var toStr = (v) => String(v ?? "");
  var toArr = (v) => Array.isArray(v) ? v : [];
  var clampHp = (v) => Math.max(0, Math.trunc(v));
  function e(type, title, category, pins, run, opts = {}) {
    return { type, category, title, description: opts.description, pure: opts.pure, pins, pinsFor: opts.pinsFor, run };
  }
  var execIn = { name: "exec", type: "exec", direction: "input", required: true };
  var execOut = { name: "then", type: "exec", direction: "output" };
  function eventNode(type, title, outPins, payloadToValues) {
    return e(type, title, "Event", [execOut, ...outPins], ({ ctx }) => ({ values: payloadToValues(ctx.eventPayload), pin: "then" }));
  }
  var payload = (p) => p ?? {};
  var EVENT_NODES = [
    eventNode("event.gameStart", "Game Start", [], () => ({})),
    eventNode("event.kill", "On Kill", [
      { name: "monster id", type: "name", direction: "output" },
      { name: "count", type: "int", direction: "output" }
    ], (p) => ({ "monster id": payload(p).monsterId, count: toInt(payload(p).count ?? 1) })),
    eventNode("event.collect", "On Collect", [
      { name: "item id", type: "name", direction: "output" },
      { name: "count", type: "int", direction: "output" }
    ], (p) => ({ "item id": payload(p).itemId, count: toInt(payload(p).count ?? 1) })),
    eventNode("event.questStart", "On Quest Start", [
      { name: "quest id", type: "name", direction: "output" }
    ], (p) => ({ "quest id": payload(p).questId })),
    eventNode("event.questComplete", "On Quest Complete", [
      { name: "quest id", type: "name", direction: "output" }
    ], (p) => ({ "quest id": payload(p).questId })),
    eventNode("event.questTurnin", "On Quest Turn-In", [
      { name: "quest id", type: "name", direction: "output" }
    ], (p) => ({ "quest id": payload(p).questId })),
    eventNode("event.levelUp", "On Level Up", [
      { name: "level", type: "int", direction: "output" }
    ], (p) => ({ level: toInt(payload(p).level) })),
    eventNode("event.rest", "On Rest", [
      { name: "hours slept", type: "float", direction: "output" },
      { name: "safe", type: "bool", direction: "output" }
    ], (p) => ({ "hours slept": toNum(payload(p).hoursSlept), safe: toBool(payload(p).safe) })),
    eventNode("event.battleEnd", "On Battle End", [
      { name: "victory", type: "bool", direction: "output" },
      { name: "fled", type: "bool", direction: "output" },
      { name: "xp", type: "int", direction: "output" },
      { name: "gold", type: "int", direction: "output" },
      { name: "rounds", type: "int", direction: "output" }
    ], (p) => {
      const r = payload(payload(p).result);
      return { victory: toBool(r.victory), fled: toBool(r.fled), xp: toInt(r.xpEarned), gold: toInt(r.goldEarned), rounds: toInt(r.rounds) };
    }),
    eventNode("event.gold", "On Gold", [
      { name: "amount", type: "int", direction: "output" }
    ], (p) => ({ amount: toInt(payload(p).amount) })),
    eventNode("event.itemGain", "On Item Gained", [
      { name: "item id", type: "name", direction: "output" },
      { name: "count", type: "int", direction: "output" }
    ], (p) => ({ "item id": payload(p).itemId, count: toInt(payload(p).count ?? 1) })),
    eventNode("event.talk", "On Talk", [
      { name: "npc id", type: "name", direction: "output" }
    ], (p) => ({ "npc id": payload(p).npcId })),
    eventNode("event.save", "On Save", [
      { name: "slot", type: "name", direction: "output" }
    ], (p) => ({ slot: payload(p).slot })),
    eventNode("event.day", "On Day", [], () => ({})),
    eventNode("event.night", "On Night", [], () => ({})),
    eventNode("event.skillLearned", "On Skill Learned", [
      { name: "skill id", type: "name", direction: "output" }
    ], (p) => ({ "skill id": payload(p).skillId })),
    eventNode("event.visit", "On Visit", [
      { name: "feature id", type: "name", direction: "output" }
    ], (p) => ({ "feature id": payload(p).featureId })),
    eventNode("event.reach", "On Reach", [
      { name: "dungeon id", type: "name", direction: "output" }
    ], (p) => ({ "dungeon id": payload(p).dungeonId })),
    eventNode("event.custom", "Custom Event", [
      { name: "event name", type: "name", direction: "output" },
      { name: "payload", type: "any", direction: "output" }
    ], (p) => ({ "event name": payload(p).name, payload: payload(p).payload })),
    eventNode("event.any", "Any Event", [
      { name: "event name", type: "name", direction: "output" },
      { name: "payload", type: "any", direction: "output" }
    ], (p) => ({ "event name": payload(p).name, payload: payload(p).payload }))
  ];
  var FLOW_NODES = [
    e("flow.sequence", "Sequence", "Flow", [execIn, { name: "count", type: "int", direction: "input", default: 3 }], ({ node }) => {
      const count = Math.max(1, toInt(node.metadata.count ?? 3));
      return { pins: Array.from({ length: count }, (_, i) => `then ${i}`) };
    }, {
      pinsFor: (node) => {
        const count = Math.max(1, toInt(node.metadata.count ?? 3));
        return [execIn, ...Array.from({ length: count }, (_, i) => ({ name: `then ${i}`, type: "exec", direction: "output" }))];
      }
    }),
    e("flow.branch", "Branch", "Flow", [
      execIn,
      { name: "condition", type: "bool", direction: "input", required: true },
      { name: "true", type: "exec", direction: "output" },
      { name: "false", type: "exec", direction: "output" }
    ], ({ inputs }) => ({ pin: toBool(inputs.condition) ? "true" : "false" })),
    e("flow.forLoop", "For Loop", "Flow", [
      execIn,
      { name: "first index", type: "int", direction: "input", default: 0 },
      { name: "last index", type: "int", direction: "input", default: 10 },
      { name: "index", type: "int", direction: "output" },
      { name: "loop body", type: "exec", direction: "output" },
      { name: "completed", type: "exec", direction: "output" }
    ], ({ inputs }) => ({
      loop: { kind: "for", bodyPin: "loop body", completedPin: "completed", indexVar: "index", start: toInt(inputs["first index"]), end: toInt(inputs["last index"]) }
    })),
    e("flow.whileLoop", "While Loop", "Flow", [
      execIn,
      { name: "condition", type: "bool", direction: "input", required: true },
      { name: "loop body", type: "exec", direction: "output" },
      { name: "completed", type: "exec", direction: "output" }
    ], () => ({ loop: { kind: "while", bodyPin: "loop body", completedPin: "completed" } })),
    e("flow.forEach", "For Each", "Flow", [
      execIn,
      { name: "array", type: "array", direction: "input", required: true },
      { name: "element", type: "any", direction: "output" },
      { name: "index", type: "int", direction: "output" },
      { name: "loop body", type: "exec", direction: "output" },
      { name: "completed", type: "exec", direction: "output" }
    ], () => ({ loop: { kind: "for-each", bodyPin: "loop body", completedPin: "completed", indexVar: "index", elementVar: "element" } })),
    e("flow.breakLoop", "Break", "Flow", [execIn], () => ({ break: true })),
    e("flow.delay", "Delay", "Flow", [
      execIn,
      { name: "seconds", type: "float", direction: "input", default: 1 },
      execOut
    ], ({ inputs }) => ({
      wait: new Promise((resolve) => setTimeout(resolve, Math.max(0, toNum(inputs.seconds)) * 1e3)),
      pin: "then"
    })),
    e("flow.doOnce", "Do Once", "Flow", [
      execIn,
      { name: "reset", type: "exec", direction: "input" },
      execOut
    ], ({ node, ctx, viaPin }) => {
      const memory = ctx.memory.get(node.id) ?? { fired: false };
      ctx.memory.set(node.id, memory);
      if (viaPin === "reset") {
        memory.fired = false;
        return { terminate: true };
      }
      if (memory.fired)
        return { terminate: true };
      memory.fired = true;
      return { pin: "then" };
    }),
    e("flow.flipFlop", "Flip Flop", "Flow", [
      execIn,
      { name: "a", type: "exec", direction: "output" },
      { name: "b", type: "exec", direction: "output" }
    ], ({ node, ctx }) => {
      const memory = ctx.memory.get(node.id) ?? { a: true };
      ctx.memory.set(node.id, memory);
      memory.a = !memory.a;
      return { pin: memory.a ? "a" : "b" };
    }),
    e("flow.gate", "Gate", "Flow", [
      { name: "enter", type: "exec", direction: "input" },
      { name: "exit", type: "exec", direction: "output" },
      { name: "open", type: "exec", direction: "input" },
      { name: "close", type: "exec", direction: "input" },
      { name: "toggle", type: "exec", direction: "input" },
      { name: "start open", type: "bool", direction: "input", default: false }
    ], ({ node, ctx, inputs, viaPin }) => {
      const memory = ctx.memory.get(node.id) ?? { open: toBool(inputs["start open"]) };
      ctx.memory.set(node.id, memory);
      if (viaPin === "open") {
        memory.open = true;
        return { terminate: true };
      }
      if (viaPin === "close") {
        memory.open = false;
        return { terminate: true };
      }
      if (viaPin === "toggle") {
        memory.open = !memory.open;
        return { terminate: true };
      }
      if (viaPin === "enter")
        return memory.open ? { pin: "exit" } : { terminate: true };
      return { terminate: true };
    }),
    e("flow.doN", "Do N Times", "Flow", [
      execIn,
      { name: "n", type: "int", direction: "input", default: 3 },
      { name: "reset", type: "exec", direction: "input" },
      execOut
    ], ({ node, ctx, inputs, viaPin }) => {
      const memory = ctx.memory.get(node.id) ?? { count: 0 };
      ctx.memory.set(node.id, memory);
      if (viaPin === "reset") {
        memory.count = 0;
        return { terminate: true };
      }
      memory.count = toInt(memory.count) + 1;
      return toInt(memory.count) <= toInt(inputs.n) ? { pin: "then" } : { terminate: true };
    }),
    e("flow.select", "Select (Switch)", "Flow", [
      execIn,
      { name: "index", type: "int", direction: "input", default: 0 },
      { name: "default", type: "exec", direction: "output" }
    ], ({ inputs, node }) => {
      const target = `then ${toInt(inputs.index)}`;
      return { pin: node.pins.some((p) => p.name === target) ? target : "default" };
    }, {
      pinsFor: (node) => {
        const count = Math.max(1, toInt(node.metadata.count ?? 3));
        return [execIn, { name: "index", type: "int", direction: "input", default: 0 }, ...Array.from({ length: count }, (_, i) => ({ name: `then ${i}`, type: "exec", direction: "output" })), { name: "default", type: "exec", direction: "output" }];
      }
    }),
    e("flow.callFunction", "Call Function", "Flow", [
      execIn,
      { name: "function name", type: "name", direction: "input", required: true },
      { name: "arguments", type: "array", direction: "input", default: [] },
      execOut
    ], ({ inputs }) => ({ callFunction: { name: toStr(inputs["function name"]), args: toArr(inputs.arguments) }, pin: "then" })),
    e("flow.runEvent", "Trigger Custom Event", "Flow", [
      execIn,
      { name: "event name", type: "name", direction: "input", required: true },
      { name: "payload", type: "any", direction: "input" },
      execOut
    ], ({ inputs, ctx }) => {
      ctx.trigger(toStr(inputs["event name"]), inputs.payload);
      return { pin: "then" };
    }),
    e("flow.return", "Return", "Flow", [execIn], () => ({ terminate: true }))
  ];
  function binaryMath(type, title, fn) {
    return e(type, title, "Math", [
      { name: "a", type: "any", direction: "input", required: true },
      { name: "b", type: "any", direction: "input", required: true },
      { name: "result", type: "any", direction: "output" }
    ], ({ inputs }) => ({ values: { result: fn(toNum(inputs.a), toNum(inputs.b)) } }), { pure: true });
  }
  function unaryMath(type, title, fn) {
    return e(type, title, "Math", [
      { name: "a", type: "any", direction: "input", required: true },
      { name: "result", type: "any", direction: "output" }
    ], ({ inputs }) => ({ values: { result: fn(toNum(inputs.a)) } }), { pure: true });
  }
  var MATH_NODES = [
    binaryMath("math.add", "Add", (a, b) => a + b),
    binaryMath("math.subtract", "Subtract", (a, b) => a - b),
    binaryMath("math.multiply", "Multiply", (a, b) => a * b),
    binaryMath("math.divide", "Divide", (a, b) => b === 0 ? 0 : a / b),
    binaryMath("math.modulo", "Modulo", (a, b) => b === 0 ? 0 : a % b),
    binaryMath("math.min", "Min", (a, b) => Math.min(a, b)),
    binaryMath("math.max", "Max", (a, b) => Math.max(a, b)),
    unaryMath("math.abs", "Absolute", (a) => Math.abs(a)),
    unaryMath("math.floor", "Floor", (a) => Math.floor(a)),
    unaryMath("math.ceil", "Ceiling", (a) => Math.ceil(a)),
    unaryMath("math.round", "Round", (a) => Math.round(a)),
    e("math.clamp", "Clamp", "Math", [
      { name: "value", type: "any", direction: "input", required: true },
      { name: "min", type: "any", direction: "input", default: 0 },
      { name: "max", type: "any", direction: "input", default: 1 },
      { name: "result", type: "any", direction: "output" }
    ], ({ inputs }) => ({ values: { result: Math.min(Math.max(toNum(inputs.value), toNum(inputs.min)), toNum(inputs.max)) } }), { pure: true }),
    e("math.randomInt", "Random Integer", "Math", [
      { name: "min", type: "int", direction: "input", default: 0 },
      { name: "max", type: "int", direction: "input", default: 100 },
      { name: "result", type: "int", direction: "output" }
    ], ({ inputs, ctx }) => ({ values: { result: ctx.game.rng.int(toInt(inputs.min), toInt(inputs.max)) } }), { pure: true }),
    e("math.randomFloat", "Random Float", "Math", [
      { name: "min", type: "float", direction: "input", default: 0 },
      { name: "max", type: "float", direction: "input", default: 1 },
      { name: "result", type: "float", direction: "output" }
    ], ({ inputs, ctx }) => ({ values: { result: ctx.game.rng.range(toNum(inputs.min), toNum(inputs.max)) } }), { pure: true }),
    e("math.randomBool", "Random Bool", "Math", [
      { name: "chance", type: "float", direction: "input", default: 0.5 },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs, ctx }) => ({ values: { result: ctx.game.rng.chance(Math.min(1, Math.max(0, toNum(inputs.chance)))) } }), { pure: true }),
    e("math.greater", ">", "Math", [
      { name: "a", type: "any", direction: "input", required: true },
      { name: "b", type: "any", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: toNum(inputs.a) > toNum(inputs.b) } }), { pure: true }),
    e("math.greaterEqual", ">=", "Math", [
      { name: "a", type: "any", direction: "input", required: true },
      { name: "b", type: "any", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: toNum(inputs.a) >= toNum(inputs.b) } }), { pure: true }),
    e("math.less", "<", "Math", [
      { name: "a", type: "any", direction: "input", required: true },
      { name: "b", type: "any", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: toNum(inputs.a) < toNum(inputs.b) } }), { pure: true }),
    e("math.lessEqual", "<=", "Math", [
      { name: "a", type: "any", direction: "input", required: true },
      { name: "b", type: "any", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: toNum(inputs.a) <= toNum(inputs.b) } }), { pure: true }),
    e("math.equal", "Equal", "Math", [
      { name: "a", type: "any", direction: "input", required: true },
      { name: "b", type: "any", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: Object.is(inputs.a, inputs.b) || String(inputs.a) === String(inputs.b) } }), { pure: true }),
    e("math.notEqual", "Not Equal", "Math", [
      { name: "a", type: "any", direction: "input", required: true },
      { name: "b", type: "any", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: !(Object.is(inputs.a, inputs.b) || String(inputs.a) === String(inputs.b)) } }), { pure: true }),
    e("math.not", "Not", "Logic", [
      { name: "a", type: "bool", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: !toBool(inputs.a) } }), { pure: true }),
    e("math.and", "And", "Logic", [
      { name: "a", type: "bool", direction: "input", required: true },
      { name: "b", type: "bool", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: toBool(inputs.a) && toBool(inputs.b) } }), { pure: true }),
    e("math.or", "Or", "Logic", [
      { name: "a", type: "bool", direction: "input", required: true },
      { name: "b", type: "bool", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: toBool(inputs.a) || toBool(inputs.b) } }), { pure: true })
  ];
  var CONVERT_NODES = [
    e("convert.toInt", "To Integer", "Convert", [{ name: "value", type: "any", direction: "input", required: true }, { name: "result", type: "int", direction: "output" }], ({ inputs }) => ({ values: { result: toInt(inputs.value) } }), { pure: true }),
    e("convert.toFloat", "To Float", "Convert", [{ name: "value", type: "any", direction: "input", required: true }, { name: "result", type: "float", direction: "output" }], ({ inputs }) => ({ values: { result: toNum(inputs.value) } }), { pure: true }),
    e("convert.toString", "To String", "Convert", [{ name: "value", type: "any", direction: "input", required: true }, { name: "result", type: "string", direction: "output" }], ({ inputs }) => ({ values: { result: toStr(inputs.value) } }), { pure: true }),
    e("convert.toBool", "To Boolean", "Convert", [{ name: "value", type: "any", direction: "input", required: true }, { name: "result", type: "bool", direction: "output" }], ({ inputs }) => ({ values: { result: toBool(inputs.value) } }), { pure: true })
  ];
  var STRING_NODES = [
    e("string.concat", "Concatenate", "String", [
      { name: "a", type: "any", direction: "input", required: true },
      { name: "b", type: "any", direction: "input", required: true },
      { name: "result", type: "string", direction: "output" }
    ], ({ inputs }) => ({ values: { result: `${toStr(inputs.a)}${toStr(inputs.b)}` } }), { pure: true }),
    e("string.format", "Format", "String", [
      { name: "format", type: "string", direction: "input", required: true },
      { name: "arguments", type: "array", direction: "input", default: [] },
      { name: "result", type: "string", direction: "output" }
    ], ({ inputs }) => {
      const args = toArr(inputs.arguments).map(toStr);
      return { values: { result: toStr(inputs.format).replace(/\{(\d+)\}/g, (_, i) => args[Number(i)] ?? `{${i}}`) } };
    }, { pure: true }),
    e("string.length", "Length", "String", [{ name: "string", type: "string", direction: "input", required: true }, { name: "result", type: "int", direction: "output" }], ({ inputs }) => ({ values: { result: toStr(inputs.string).length } }), { pure: true }),
    e("string.contains", "Contains", "String", [
      { name: "string", type: "string", direction: "input", required: true },
      { name: "substring", type: "string", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: toStr(inputs.string).includes(toStr(inputs.substring)) } }), { pure: true }),
    e("string.toUpper", "To Upper", "String", [{ name: "string", type: "string", direction: "input", required: true }, { name: "result", type: "string", direction: "output" }], ({ inputs }) => ({ values: { result: toStr(inputs.string).toUpperCase() } }), { pure: true }),
    e("string.toLower", "To Lower", "String", [{ name: "string", type: "string", direction: "input", required: true }, { name: "result", type: "string", direction: "output" }], ({ inputs }) => ({ values: { result: toStr(inputs.string).toLowerCase() } }), { pure: true })
  ];
  var ARRAY_NODES = [
    e("array.from", "Make Array", "Array", [{ name: "elements", type: "array", direction: "input", default: [] }, { name: "result", type: "array", direction: "output" }], ({ inputs }) => ({ values: { result: toArr(inputs.elements) } }), { pure: true }),
    e("array.length", "Array Length", "Array", [{ name: "array", type: "array", direction: "input", required: true }, { name: "result", type: "int", direction: "output" }], ({ inputs }) => ({ values: { result: toArr(inputs.array).length } }), { pure: true }),
    e("array.get", "Get Element", "Array", [
      { name: "array", type: "array", direction: "input", required: true },
      { name: "index", type: "int", direction: "input", default: 0 },
      { name: "result", type: "any", direction: "output" }
    ], ({ inputs }) => ({ values: { result: toArr(inputs.array)[toInt(inputs.index)] } }), { pure: true }),
    e("array.append", "Append", "Array", [
      { name: "array", type: "array", direction: "input", required: true },
      { name: "value", type: "any", direction: "input", required: true },
      { name: "result", type: "array", direction: "output" }
    ], ({ inputs }) => ({ values: { result: [...toArr(inputs.array), inputs.value] } }), { pure: true }),
    e("array.contains", "Array Contains", "Array", [
      { name: "array", type: "array", direction: "input", required: true },
      { name: "value", type: "any", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs }) => ({ values: { result: toArr(inputs.array).some((v) => String(v) === String(inputs.value)) } }), { pure: true })
  ];
  var VARIABLE_NODES = [
    e("var.get", "Get Variable", "Variable", [
      { name: "variable name", type: "name", direction: "input", default: "" },
      { name: "value", type: "any", direction: "output" }
    ], ({ inputs, ctx, node }) => ({ values: { value: ctx.vars.get(variableName(node, inputs)) } }), { pure: true }),
    e("var.set", "Set Variable", "Variable", [
      execIn,
      { name: "variable name", type: "name", direction: "input", default: "" },
      { name: "value", type: "any", direction: "input", required: true },
      execOut
    ], ({ inputs, ctx, node }) => {
      ctx.vars.set(variableName(node, inputs), inputs.value);
      return { pin: "then" };
    }),
    e("var.increment", "Increment Variable", "Variable", [
      execIn,
      { name: "variable name", type: "name", direction: "input", default: "" },
      { name: "amount", type: "int", direction: "input", default: 1 },
      execOut
    ], ({ inputs, ctx, node }) => {
      const name = variableName(node, inputs);
      const current = ctx.vars.get(name);
      ctx.vars.set(name, toNum(current) + toInt(inputs.amount));
      return { pin: "then" };
    })
  ];
  function variableName(node, inputs) {
    const fromPin = inputs["variable name"];
    if (typeof fromPin === "string" && fromPin.length > 0)
      return fromPin;
    const fromMeta = node.metadata.variable;
    if (typeof fromMeta === "string" && fromMeta.length > 0)
      return fromMeta;
    return "";
  }
  var GAME_NODES = [
    e("game.message", "Message", "Game", [execIn, { name: "text", type: "string", direction: "input", required: true }, execOut], ({ inputs, ctx }) => {
      ctx.game.message(toStr(inputs.text));
      return { pin: "then" };
    }),
    e("game.giveItem", "Give Item", "Game", [
      execIn,
      { name: "item id", type: "name", direction: "input", required: true },
      { name: "count", type: "int", direction: "input", default: 1 },
      execOut
    ], ({ inputs, ctx }) => {
      ctx.game.giveItem(toStr(inputs["item id"]), toInt(inputs.count));
      return { pin: "then" };
    }),
    e("game.rewardGold", "Give Gold", "Game", [
      execIn,
      { name: "amount", type: "int", direction: "input", default: 0 },
      execOut
    ], ({ inputs, ctx }) => {
      ctx.game.rewardGold(toInt(inputs.amount));
      return { pin: "then" };
    }),
    e("game.giveXp", "Give XP", "Game", [
      execIn,
      { name: "amount", type: "int", direction: "input", default: 0 },
      execOut
    ], ({ inputs, ctx }) => {
      ctx.game.addXpToPlayer(toInt(inputs.amount));
      return { pin: "then" };
    }),
    e("game.startQuest", "Start Quest", "Game", [
      execIn,
      { name: "quest id", type: "name", direction: "input", required: true },
      execOut,
      { name: "started", type: "bool", direction: "output" }
    ], ({ inputs, ctx }) => {
      const started = ctx.game.startQuest(toStr(inputs["quest id"]));
      return { pin: "then", values: { started } };
    }),
    e("game.completeQuest", "Complete Quest", "Game", [
      execIn,
      { name: "quest id", type: "name", direction: "input", required: true },
      execOut
    ], ({ inputs, ctx }) => {
      ctx.game.completeQuest(toStr(inputs["quest id"]));
      return { pin: "then" };
    }),
    e("game.grantRewards", "Grant Quest Rewards", "Game", [
      execIn,
      { name: "quest id", type: "name", direction: "input", required: true },
      execOut
    ], ({ inputs, ctx }) => {
      ctx.game.grantQuestRewards(toStr(inputs["quest id"]));
      return { pin: "then" };
    }),
    e("game.heal", "Heal", "Game", [
      execIn,
      { name: "amount", type: "int", direction: "input", default: 10 },
      execOut
    ], ({ inputs, ctx }) => {
      const p = ctx.game.player;
      p.hp = Math.min(p.derived.maxHp, p.hp + toInt(inputs.amount));
      return { pin: "then" };
    }),
    e("game.healFull", "Heal Fully", "Game", [execIn, execOut], ({ ctx }) => {
      ctx.game.healPlayer();
      return { pin: "then" };
    }),
    e("game.damage", "Damage", "Game", [
      execIn,
      { name: "amount", type: "int", direction: "input", default: 10 },
      execOut
    ], ({ inputs, ctx }) => {
      ctx.game.player.hp = clampHp(ctx.game.player.hp - toInt(inputs.amount));
      return { pin: "then" };
    }),
    e("game.setFlag", "Set Flag", "Game", [
      execIn,
      { name: "flag name", type: "name", direction: "input", required: true },
      execOut
    ], ({ inputs, ctx }) => {
      ctx.game.setFlag(toStr(inputs["flag name"]));
      return { pin: "then" };
    }),
    e("game.clearFlag", "Clear Flag", "Game", [
      execIn,
      { name: "flag name", type: "name", direction: "input", required: true },
      execOut
    ], ({ inputs, ctx }) => {
      ctx.game.clearFlag(toStr(inputs["flag name"]));
      return { pin: "then" };
    }),
    e("game.runBattle", "Run Battle", "Game", [
      execIn,
      { name: "enemies", type: "array", direction: "input", required: true },
      execOut,
      { name: "victory", type: "bool", direction: "output" },
      { name: "gold", type: "int", direction: "output" },
      { name: "xp", type: "int", direction: "output" },
      { name: "rounds", type: "int", direction: "output" }
    ], ({ inputs, ctx }) => {
      const ids = toArr(inputs.enemies).map(toStr);
      const result = ctx.game.runBattle(ids);
      return { pin: "then", values: { victory: !!result?.victory, gold: toInt(result?.goldEarned), xp: toInt(result?.xpEarned), rounds: toInt(result?.rounds) } };
    }),
    e("game.move", "Move", "Game", [
      execIn,
      { name: "direction", type: "name", direction: "input", required: true },
      execOut,
      { name: "moved", type: "bool", direction: "output" }
    ], ({ inputs, ctx }) => {
      const result = ctx.game.move(toStr(inputs.direction));
      return { pin: "then", values: { moved: !!result.moved } };
    }),
    e("game.rest", "Rest", "Game", [
      execIn,
      { name: "hours", type: "int", direction: "input", default: 8 },
      execOut,
      { name: "safe", type: "bool", direction: "output" }
    ], ({ inputs, ctx }) => {
      const result = ctx.game.rest(toInt(inputs.hours));
      return { pin: "then", values: { safe: !!result.safe } };
    }),
    e("game.useItem", "Use Item", "Game", [
      execIn,
      { name: "item id", type: "name", direction: "input", required: true },
      execOut,
      { name: "used", type: "bool", direction: "output" }
    ], ({ inputs, ctx }) => {
      const used = ctx.game.useItem(toStr(inputs["item id"]));
      return { pin: "then", values: { used } };
    })
  ];
  var GAME_READ_NODES = [
    e("game.playerLevel", "Player Level", "Game", [{ name: "result", type: "int", direction: "output" }], ({ ctx }) => ({ values: { result: ctx.game.player.level } }), { pure: true }),
    e("game.playerHp", "Player HP", "Game", [{ name: "result", type: "int", direction: "output" }], ({ ctx }) => ({ values: { result: ctx.game.player.hp } }), { pure: true }),
    e("game.playerMaxHp", "Player Max HP", "Game", [{ name: "result", type: "int", direction: "output" }], ({ ctx }) => ({ values: { result: ctx.game.player.derived.maxHp } }), { pure: true }),
    e("game.playerGold", "Player Gold", "Game", [{ name: "result", type: "int", direction: "output" }], ({ ctx }) => ({ values: { result: ctx.game.player.gold } }), { pure: true }),
    e("game.playerXp", "Player XP", "Game", [{ name: "result", type: "int", direction: "output" }], ({ ctx }) => ({ values: { result: ctx.game.player.xp } }), { pure: true }),
    e("game.isNight", "Is Night", "Game", [{ name: "result", type: "bool", direction: "output" }], ({ ctx }) => ({ values: { result: ctx.game.isNight } }), { pure: true }),
    e("game.positionX", "Position X", "Game", [{ name: "result", type: "int", direction: "output" }], ({ ctx }) => ({ values: { result: ctx.game.position.x } }), { pure: true }),
    e("game.positionY", "Position Y", "Game", [{ name: "result", type: "int", direction: "output" }], ({ ctx }) => ({ values: { result: ctx.game.position.y } }), { pure: true }),
    e("game.hasItem", "Has Item", "Game", [
      { name: "item id", type: "name", direction: "input", required: true },
      { name: "count", type: "int", direction: "input", default: 1 },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs, ctx }) => ({ values: { result: ctx.game.hasItem(toStr(inputs["item id"]), toInt(inputs.count)) } }), { pure: true }),
    e("game.itemCount", "Item Count", "Game", [
      { name: "item id", type: "name", direction: "input", required: true },
      { name: "result", type: "int", direction: "output" }
    ], ({ inputs, ctx }) => ({ values: { result: ctx.game.itemCount(toStr(inputs["item id"])) } }), { pure: true }),
    e("game.getFlag", "Get Flag", "Game", [
      { name: "flag name", type: "name", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs, ctx }) => ({ values: { result: Boolean(ctx.game.flags[toStr(inputs["flag name"])]) } }), { pure: true }),
    e("game.questActive", "Quest Active", "Game", [
      { name: "quest id", type: "name", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs, ctx }) => ({ values: { result: ctx.game.questActive(toStr(inputs["quest id"])) } }), { pure: true }),
    e("game.questCompleted", "Quest Completed", "Game", [
      { name: "quest id", type: "name", direction: "input", required: true },
      { name: "result", type: "bool", direction: "output" }
    ], ({ inputs, ctx }) => ({ values: { result: ctx.game.questCompleted(toStr(inputs["quest id"])) } }), { pure: true })
  ];
  var FUNCTION_NODES = [
    e("function.entry", "Function Entry", "Function", [execOut], () => ({ pin: "then" })),
    e("get.param", "Get Param", "Function", [
      { name: "param name", type: "name", direction: "input", default: "" },
      { name: "value", type: "any", direction: "output" }
    ], ({ inputs, ctx }) => ({ values: { value: ctx.locals.get(toStr(inputs["param name"])) } }), { pure: true })
  ];
  var MISC_NODES = [
    e("const", "Const", "Misc", [{ name: "value", type: "any", direction: "output" }], ({ node }) => ({ values: { value: node.metadata.value } }), { pure: true }),
    e("comment", "Comment", "Misc", [], void 0)
  ];
  var NODE_TYPES = Object.fromEntries([...EVENT_NODES, ...FLOW_NODES, ...MATH_NODES, ...CONVERT_NODES, ...STRING_NODES, ...ARRAY_NODES, ...VARIABLE_NODES, ...GAME_NODES, ...GAME_READ_NODES, ...FUNCTION_NODES, ...MISC_NODES].map((d) => [d.type, d]));
  function nodeDef(type) {
    return NODE_TYPES[type];
  }
  function pinsForNode(def, node) {
    return (def.pinsFor ? def.pinsFor(node) : def.pins).map((p) => ({ ...p }));
  }

  // dist/blueprint/validation.js
  function typesCompatible(a, b) {
    if (a === b)
      return true;
    if (a === "any" || b === "any")
      return true;
    if (a === "int" && b === "float")
      return true;
    if (a === "float" && b === "int")
      return true;
    if (a === "string" && b === "name")
      return true;
    if (a === "name" && b === "string")
      return true;
    return false;
  }
  function pinByName(node, name) {
    return node.pins.find((p) => p.name === name);
  }
  function validateBlueprint(bp) {
    const issues = [];
    const nodeIds = /* @__PURE__ */ new Set();
    for (const graph of bp.graphs) {
      const graphIssue = (level, message, nodeId) => {
        issues.push({ level, message, graphName: graph.name, nodeId });
      };
      const seenIds = /* @__PURE__ */ new Set();
      for (const node of graph.nodes) {
        if (seenIds.has(node.id))
          graphIssue("error", `Duplicate node id "${node.id}"`, node.id);
        seenIds.add(node.id);
        nodeIds.add(node.id);
        const def = nodeDef(node.type);
        if (!def) {
          graphIssue("error", `Unknown node type "${node.type}"`, node.id);
          continue;
        }
        const expected = pinsForNode(def, node);
        const expectedNames = new Set(expected.map((p) => p.name));
        const nodePinNames = /* @__PURE__ */ new Set();
        for (const pin of node.pins) {
          if (nodePinNames.has(pin.name))
            graphIssue("error", `Duplicate pin "${pin.name}" on node "${node.id}"`, node.id);
          nodePinNames.add(pin.name);
          if (!expectedNames.has(pin.name))
            graphIssue("error", `Pin "${pin.name}" is not defined by node type "${node.type}"`, node.id);
        }
        for (const exp of expected) {
          if (!nodePinNames.has(exp.name))
            graphIssue("error", `Node "${node.id}" is missing pin "${exp.name}"`, node.id);
        }
        for (const exp of expected) {
          const actual = node.pins.find((p) => p.name === exp.name);
          if (actual && (actual.direction !== exp.direction || actual.type !== exp.type)) {
            graphIssue("error", `Pin "${exp.name}" on "${node.id}" has direction/type mismatch with node type "${node.type}"`, node.id);
          }
        }
      }
      const edgeIds = /* @__PURE__ */ new Set();
      for (const edge of graph.edges) {
        if (edgeIds.has(edge.id))
          graphIssue("error", `Duplicate edge id "${edge.id}"`);
        edgeIds.add(edge.id);
        const from = graph.nodes.find((n2) => n2.id === edge.fromNode);
        const to = graph.nodes.find((n2) => n2.id === edge.toNode);
        if (!from) {
          graphIssue("error", `Edge "${edge.id}" references missing source node "${edge.fromNode}"`);
          continue;
        }
        if (!to) {
          graphIssue("error", `Edge "${edge.id}" references missing target node "${edge.toNode}"`);
          continue;
        }
        const fromPin = pinByName(from, edge.fromPin);
        const toPin = pinByName(to, edge.toPin);
        if (!fromPin) {
          graphIssue("error", `Edge "${edge.id}" references missing source pin "${edge.fromPin}" on "${edge.fromNode}"`, edge.fromNode);
          continue;
        }
        if (!toPin) {
          graphIssue("error", `Edge "${edge.id}" references missing target pin "${edge.toPin}" on "${edge.toNode}"`, edge.toNode);
          continue;
        }
        if (fromPin.direction !== "output")
          graphIssue("error", `Edge "${edge.id}" starts at input pin "${edge.fromPin}" (must start at an output)`, edge.fromNode);
        if (toPin.direction !== "input")
          graphIssue("error", `Edge "${edge.id}" ends at output pin "${edge.toPin}" (must end at an input)`, edge.toNode);
        if (fromPin.type === "exec" && toPin.type !== "exec")
          graphIssue("error", `Edge "${edge.id}" connects exec pin "${edge.fromPin}" to data pin "${edge.toPin}"`, edge.toNode);
        if (fromPin.type !== "exec" && toPin.type === "exec")
          graphIssue("error", `Edge "${edge.id}" connects data pin "${edge.fromPin}" to exec pin "${edge.toPin}"`, edge.toNode);
        if (fromPin.type !== "exec" && !typesCompatible(fromPin.type, toPin.type)) {
          graphIssue("error", `Edge "${edge.id}" connects incompatible types ${fromPin.type} -> ${toPin.type}`, edge.toNode);
        }
      }
      for (const node of graph.nodes) {
        for (const pin of node.pins) {
          if (pin.direction !== "input" || pin.type === "exec")
            continue;
          const incoming = graph.edges.filter((e2) => e2.toNode === node.id && e2.toPin === pin.name);
          if (incoming.length > 1)
            graphIssue("error", `Input pin "${pin.name}" on "${node.id}" has ${incoming.length} incoming edges (fan-in not allowed)`, node.id);
        }
        const execIns = node.pins.filter((p) => p.type === "exec" && p.direction === "input" && p.name !== "reset" && p.name !== "open" && p.name !== "close" && p.name !== "toggle" && p.name !== "enter");
        for (const pin of execIns) {
          const incoming = graph.edges.filter((e2) => e2.toNode === node.id && e2.toPin === pin.name);
          if (incoming.length > 1)
            graphIssue("error", `Exec input pin "${pin.name}" on "${node.id}" has ${incoming.length} incoming edges`, node.id);
        }
      }
      for (const node of graph.nodes) {
        const def = nodeDef(node.type);
        if (!def)
          continue;
        for (const pin of pinsForNode(def, node)) {
          if (pin.direction === "input" && pin.type !== "exec" && pin.required) {
            const incoming = graph.edges.find((e2) => e2.toNode === node.id && e2.toPin === pin.name);
            if (!incoming && pin.default === void 0) {
              graphIssue("warning", `Required input "${pin.name}" on "${node.id}" is unconnected`, node.id);
            }
          }
        }
      }
      if (graph.kind === "event") {
        const entry = graph.nodes.find((n2) => n2.id === graph.entryNode);
        if (!entry)
          graphIssue("error", `Event graph "${graph.name}" has no entry node`);
        else if (!nodeDef(entry.type) || !entry.type.startsWith("event."))
          graphIssue("error", `Event graph "${graph.name}" entry node must be an event node, got "${entry.type}"`, entry.id);
      } else {
        const entry = graph.nodes.find((n2) => n2.id === graph.entryNode);
        if (!entry)
          graphIssue("error", `Function graph "${graph.name}" has no entry node`);
        else if (entry.type !== "function.entry")
          graphIssue("error", `Function graph "${graph.name}" entry node must be "function.entry", got "${entry.type}"`, entry.id);
      }
      const pureCycle = findPureCycle(graph);
      if (pureCycle)
        graphIssue("error", `Pure/data cycle detected: ${pureCycle.join(" -> ")}`);
    }
    if (nodeIds.size === 0 && bp.graphs.length > 0) {
      issues.push({ level: "error", message: "Blueprint defines graphs but no nodes" });
    }
    return { ok: issues.every((i) => i.level === "warning"), issues };
  }
  function findPureCycle(graph) {
    const adj = /* @__PURE__ */ new Map();
    for (const node of graph.nodes) {
      const def = nodeDef(node.type);
      if (def?.pure)
        adj.set(node.id, []);
    }
    for (const edge of graph.edges) {
      const fromDef = nodeDef(edge.fromNode ? graph.nodes.find((n2) => n2.id === edge.fromNode)?.type ?? "" : "");
      const toDef = nodeDef(edge.toNode ? graph.nodes.find((n2) => n2.id === edge.toNode)?.type ?? "" : "");
      if (fromDef?.pure && toDef?.pure) {
        if (!adj.has(edge.fromNode))
          adj.set(edge.fromNode, []);
        adj.get(edge.fromNode).push(edge.toNode);
      }
    }
    const WHITE = 0;
    const GRAY = 1;
    const BLACK = 2;
    const color = /* @__PURE__ */ new Map();
    const stack = [];
    const visit = (u) => {
      color.set(u, GRAY);
      stack.push(u);
      for (const v of adj.get(u) ?? []) {
        if (!color.has(v)) {
          const cycle = visit(v);
          if (cycle)
            return cycle;
        } else if (color.get(v) === GRAY) {
          const idx = stack.indexOf(v);
          return [...stack.slice(idx), v];
        }
      }
      stack.pop();
      color.set(u, BLACK);
      return null;
    };
    for (const [u] of adj) {
      if (!color.has(u)) {
        const cycle = visit(u);
        if (cycle)
          return cycle;
      }
    }
    return null;
  }

  // dist/blueprint/variables.js
  var VariableStore = class {
    values = /* @__PURE__ */ new Map();
    constructor(variables = []) {
      for (const v of variables)
        this.values.set(v.name, v.value);
    }
    get(name) {
      return this.values.get(name);
    }
    set(name, value) {
      this.values.set(name, value);
    }
    has(name) {
      return this.values.has(name);
    }
    names() {
      return [...this.values.keys()];
    }
    snapshot() {
      return Object.fromEntries(this.values);
    }
    restore(data) {
      this.values.clear();
      for (const [k, v] of Object.entries(data))
        this.values.set(k, v);
    }
  };

  // dist/blueprint/interpreter.js
  var BREAK_SIGNAL = /* @__PURE__ */ Symbol("blueprint.loop-break");
  function nodeOf(graph, nodeId) {
    const node = graph.nodes.find((n2) => n2.id === nodeId);
    if (!node)
      throw new Error(`Blueprint graph "${graph.name}" has no node "${nodeId}"`);
    return node;
  }
  function execTargetOf(graph, nodeId, outPin) {
    const edge = graph.edges.find((e2) => e2.fromNode === nodeId && e2.fromPin === outPin);
    if (!edge)
      return null;
    return { node: edge.toNode, pin: edge.toPin };
  }
  function inputEdge(graph, nodeId, pinName) {
    return graph.edges.find((e2) => e2.toNode === nodeId && e2.toPin === pinName);
  }
  function inputPin(node, name) {
    return node.pins.find((p) => p.direction === "input" && p.name === name);
  }
  async function executeGraph(bp, graph, opts) {
    const ctx = {
      graph,
      blueprint: bp,
      vars: opts.vars ?? new VariableStore(bp.variables),
      game: opts.game,
      locals: opts.locals ?? /* @__PURE__ */ new Map(),
      cache: /* @__PURE__ */ new Map(),
      outValues: /* @__PURE__ */ new Map(),
      memory: opts.memory ?? /* @__PURE__ */ new Map(),
      eventPayload: opts.eventPayload,
      trigger: opts.trigger ?? (() => {
      }),
      maxSteps: opts.maxSteps ?? 1e4,
      steps: 0,
      warnings: []
    };
    await execNode(graph, graph.entryNode, ctx, opts, void 0);
    return { warnings: ctx.warnings, steps: ctx.steps };
  }
  async function execNode(graph, nodeId, ctx, opts, viaPin) {
    const node = nodeOf(graph, nodeId);
    const def = nodeDef(node.type);
    if (!def)
      throw new Error(`Unknown blueprint node type "${node.type}"`);
    ctx.steps += 1;
    if (ctx.steps > ctx.maxSteps)
      throw new Error(`Blueprint exceeded ${ctx.maxSteps} steps (possible infinite loop) in graph "${graph.name}"`);
    ctx.cache.clear();
    opts.onStep?.(nodeId);
    const inputs = {};
    for (const pin of node.pins) {
      if (pin.direction !== "input" || pin.type === "exec")
        continue;
      inputs[pin.name] = await resolveInput(graph, node, pin, ctx, opts);
    }
    const result = def.run ? def.run({ node, inputs, ctx, viaPin }) : void 0;
    await handleResult(graph, node, result, ctx, opts);
  }
  async function handleResult(graph, node, result, ctx, opts) {
    if (result === void 0 || result === null)
      return;
    const r = result;
    if (r.break)
      throw BREAK_SIGNAL;
    if (r.wait)
      await r.wait;
    if (r.locals)
      for (const [k, v] of Object.entries(r.locals))
        ctx.locals.set(k, v);
    if (r.values)
      for (const [k, v] of Object.entries(r.values))
        ctx.outValues.set(`${node.id}:${k}`, v);
    if (r.terminate)
      return;
    if (r.loop) {
      await runLoop(graph, node, r.loop, ctx, opts);
      return;
    }
    if (r.callFunction) {
      await callGraphFunction(ctx, r.callFunction.name, r.callFunction.args, opts);
      if (r.pin) {
        const t = execTargetOf(graph, node.id, r.pin);
        if (t)
          await execNode(graph, t.node, ctx, opts, t.pin);
      }
      return;
    }
    if (r.pins) {
      for (const p of r.pins) {
        const t = execTargetOf(graph, node.id, p);
        if (t)
          await execNode(graph, t.node, ctx, opts, t.pin);
      }
      return;
    }
    if (r.pin) {
      const t = execTargetOf(graph, node.id, r.pin);
      if (t)
        await execNode(graph, t.node, ctx, opts, t.pin);
    }
  }
  async function runLoop(graph, node, loop, ctx, opts) {
    try {
      if (loop.kind === "for") {
        for (let i = loop.start ?? 0; i <= (loop.end ?? 0); i++) {
          ctx.cache.clear();
          if (loop.indexVar)
            ctx.outValues.set(`${node.id}:${loop.indexVar}`, i);
          const t = execTargetOf(graph, node.id, loop.bodyPin);
          if (t)
            await execNode(graph, t.node, ctx, opts, t.pin);
        }
      } else if (loop.kind === "while") {
        const condPin = inputPin(node, "condition");
        let guard = 0;
        for (; ; ) {
          ctx.cache.clear();
          const condition = condPin && await resolveInput(graph, node, condPin, ctx, opts) === true;
          if (!condition)
            break;
          if (++guard > 1e6)
            throw new Error(`While loop in graph "${graph.name}" did not terminate`);
          const t = execTargetOf(graph, node.id, loop.bodyPin);
          if (t)
            await execNode(graph, t.node, ctx, opts, t.pin);
        }
      } else if (loop.kind === "for-each") {
        const arrPin = inputPin(node, "array");
        const arr = arrPin ? await resolveInput(graph, node, arrPin, ctx, opts) : [];
        const items = Array.isArray(arr) ? arr : [];
        for (let i = 0; i < items.length; i++) {
          ctx.cache.clear();
          if (loop.indexVar)
            ctx.outValues.set(`${node.id}:${loop.indexVar}`, i);
          if (loop.elementVar)
            ctx.outValues.set(`${node.id}:${loop.elementVar}`, items[i]);
          const t = execTargetOf(graph, node.id, loop.bodyPin);
          if (t)
            await execNode(graph, t.node, ctx, opts, t.pin);
        }
      }
    } catch (e2) {
      if (e2 !== BREAK_SIGNAL)
        throw e2;
    }
    if (loop.completedPin) {
      const t = execTargetOf(graph, node.id, loop.completedPin);
      if (t)
        await execNode(graph, t.node, ctx, opts, t.pin);
    }
  }
  async function callGraphFunction(ctx, name, args, opts) {
    const graph = ctx.blueprint.graphs.find((g) => g.kind === "function" && g.name === name);
    if (!graph)
      throw new Error(`Blueprint "${ctx.blueprint.id}" has no function graph "${name}"`);
    const subLocals = new Map(ctx.locals);
    (graph.params ?? []).forEach((p, i) => subLocals.set(p.name, args?.[i]));
    const subCtx = { ...ctx, graph, locals: subLocals };
    await execNode(graph, graph.entryNode, subCtx, opts, void 0);
  }
  async function resolveInput(graph, node, pin, ctx, opts) {
    const edge = inputEdge(graph, node.id, pin.name);
    if (!edge)
      return pin.default;
    return resolveOutput(graph, edge.fromNode, edge.fromPin, ctx, opts);
  }
  async function resolveOutput(graph, nodeId, pinName, ctx, opts) {
    const node = nodeOf(graph, nodeId);
    const def = nodeDef(node.type);
    if (!def || !def.pure) {
      return ctx.outValues.get(`${nodeId}:${pinName}`);
    }
    const values = await resolvePure(graph, node, ctx, opts);
    return values[pinName];
  }
  async function resolvePure(graph, node, ctx, opts) {
    const cached = ctx.cache.get(node.id);
    if (cached)
      return cached;
    const def = nodeDef(node.type);
    if (!def)
      throw new Error(`Unknown blueprint node type "${node.type}"`);
    ctx.steps += 1;
    if (ctx.steps > ctx.maxSteps)
      throw new Error(`Blueprint exceeded ${ctx.maxSteps} steps in graph "${graph.name}"`);
    opts.onStep?.(node.id);
    const inputs = {};
    for (const pin of node.pins) {
      if (pin.direction !== "input" || pin.type === "exec")
        continue;
      inputs[pin.name] = await resolveInput(graph, node, pin, ctx, opts);
    }
    const result = def.run ? def.run({ node, inputs, ctx }) : void 0;
    const values = (result && typeof result === "object" && "values" in result ? result.values : void 0) ?? {};
    ctx.cache.set(node.id, values);
    return values;
  }

  // dist/blueprint/manager.js
  var ANY_EVENT_TYPE = "event.any";
  var BlueprintManager = class {
    game;
    opts;
    blueprints = /* @__PURE__ */ new Map();
    stores = /* @__PURE__ */ new Map();
    memories = /* @__PURE__ */ new Map();
    busTargets = /* @__PURE__ */ new Map();
    wildcardTargets = [];
    customTargets = [];
    unsubs = [];
    inflight = /* @__PURE__ */ new Set();
    constructor(game, opts = {}) {
      this.game = game;
      this.opts = opts;
    }
    register(def) {
      const result = validateBlueprint(def);
      if (!result.ok)
        return result;
      if (this.blueprints.has(def.id)) {
        result.issues.push({ level: "warning", message: `Blueprint "${def.id}" is already registered; replacing it` });
      }
      this.unregister(def.id);
      this.blueprints.set(def.id, def);
      this.stores.set(def.id, new VariableStore(def.variables));
      this.memories.set(def.id, /* @__PURE__ */ new Map());
      for (const graph of def.graphs) {
        if (graph.kind !== "event")
          continue;
        const entry = graph.nodes.find((n2) => n2.id === graph.entryNode);
        const entryType = entry?.type ?? "";
        if (entryType === ANY_EVENT_TYPE) {
          this.wildcardTargets.push({ def, graph });
        } else if (entryType.startsWith("event.")) {
          const eventName = entryType.slice("event.".length);
          if (eventName === "custom") {
            this.customTargets.push({ def, graph });
          } else {
            if (!this.busTargets.has(eventName))
              this.busTargets.set(eventName, []);
            this.busTargets.get(eventName).push({ def, graph });
          }
        }
      }
      this.subscribeBus();
      return result;
    }
    unregister(id) {
      if (!this.blueprints.has(id))
        return false;
      this.blueprints.delete(id);
      this.stores.delete(id);
      this.memories.delete(id);
      const strip = (targets) => targets.filter((t) => t.def.id !== id);
      for (const [event, targets] of this.busTargets) {
        const next = strip(targets);
        if (next.length === 0)
          this.busTargets.delete(event);
        else
          this.busTargets.set(event, next);
      }
      this.wildcardTargets = strip(this.wildcardTargets);
      this.customTargets = strip(this.customTargets);
      return true;
    }
    has(id) {
      return this.blueprints.has(id);
    }
    list() {
      return [...this.blueprints.keys()];
    }
    subscribeBus() {
      for (const unsub of this.unsubs)
        unsub();
      this.unsubs = [];
      const busEvents = /* @__PURE__ */ new Set([...this.busTargets.keys()]);
      for (const event of busEvents) {
        this.unsubs.push(this.game.bus.on(event, (payload2) => void this.dispatch(event, payload2)));
      }
      if (this.wildcardTargets.length > 0) {
        this.unsubs.push(this.game.bus.onAny((payload2, event) => void this.dispatchAny(event, payload2)));
      }
    }
    dispatch(busEvent, payload2) {
      return this.runTargets(this.busTargets.get(busEvent) ?? [], payload2, void 0, busEvent);
    }
    dispatchAny(busEvent, payload2) {
      if (this.wildcardTargets.length === 0)
        return Promise.resolve();
      return this.runTargets(this.wildcardTargets, { name: busEvent, payload: payload2 }, void 0, busEvent);
    }
    trigger(customName, payload2) {
      return this.runTargets(this.customTargets, { name: customName, payload: payload2 }, customName);
    }
    startGame(payload2 = {}) {
      return this.runTargets(this.busTargets.get("gameStart") ?? [], payload2);
    }
    async settle() {
      while (this.inflight.size > 0) {
        await Promise.allSettled([...this.inflight]);
      }
    }
    runTargets(targets, eventPayload, customName, busEvent) {
      if (targets.length === 0)
        return Promise.resolve();
      const run = async () => {
        for (const { def, graph } of targets) {
          await this.runOne(def, graph, eventPayload, customName ?? busEvent);
        }
      };
      const p = run();
      this.inflight.add(p);
      p.finally(() => this.inflight.delete(p)).catch(() => void 0);
      return p;
    }
    async runOne(def, graph, eventPayload, eventName) {
      try {
        await executeGraph(def, graph, {
          game: this.game,
          vars: this.stores.get(def.id),
          memory: this.memories.get(def.id),
          eventPayload,
          trigger: (name, payload2) => void this.trigger(name, payload2),
          maxSteps: this.opts.maxSteps ?? 1e4
        });
      } catch (e2) {
        const err = e2 instanceof Error ? e2 : new Error(String(e2));
        if (this.opts.onError)
          this.opts.onError(err, def.id, graph.name);
        else
          throw err;
      }
    }
    async callFunction(blueprintId, graphName, args = []) {
      const def = this.blueprints.get(blueprintId);
      if (!def)
        throw new Error(`Unknown blueprint "${blueprintId}"`);
      const graph = def.graphs.find((g) => g.kind === "function" && g.name === graphName);
      if (!graph)
        throw new Error(`Blueprint "${blueprintId}" has no function "${graphName}"`);
      return executeGraph(def, graph, {
        game: this.game,
        vars: this.stores.get(def.id),
        memory: this.memories.get(def.id),
        trigger: (name, payload2) => void this.trigger(name, payload2),
        maxSteps: this.opts.maxSteps ?? 1e4
      });
    }
    getVariable(blueprintId, name) {
      return this.stores.get(blueprintId)?.get(name);
    }
    setVariable(blueprintId, name, value) {
      const store = this.stores.get(blueprintId);
      if (!store)
        throw new Error(`Unknown blueprint "${blueprintId}"`);
      store.set(name, value);
    }
    dispose() {
      for (const unsub of this.unsubs)
        unsub();
      this.unsubs = [];
      this.blueprints.clear();
      this.stores.clear();
      this.memories.clear();
      this.busTargets.clear();
      this.wildcardTargets = [];
      this.customTargets = [];
    }
  };

  // dist/game.js
  var OVERWORLD_SIZE = 48;
  var SAVE_VERSION = 3;
  var DUNGEON_CONFIGS = {
    "dungeon-ruined-keep": {
      name: "Ruined Keep",
      depth: 1,
      pool: ["skeleton", "goblin", "rat", "giant-spider", "bandit"],
      boss: "skeleton-king",
      chestLevel: 2
    },
    "dungeon-cursed-crypt": {
      name: "Cursed Crypt",
      depth: 2,
      pool: ["skeleton", "bandit", "orc-warrior", "dark-wizard"],
      boss: "lich",
      chestLevel: 2
    },
    "dungeon-dragon-lair": {
      name: "Dragon Lair",
      depth: 3,
      pool: ["orc-warrior", "troll", "dark-wizard", "golem"],
      boss: "dragon",
      chestLevel: 3
    }
  };
  var DW_DUNGEON_CONFIGS = {
    "dw-castle": {
      name: "Charlock Castle",
      depth: 3,
      pool: ["dw-slime", "dw-red-slime", "dw-drakeema", "dw-drakee", "dw-magician", "dw-wizard", "dw-wraith", "dw-knight", "dw-demon-knight", "dw-axe-knight", "dw-warlock"],
      boss: "dw-dragonlord",
      chestLevel: 4
    },
    "dw-eridricks-cave": {
      name: "Erdrick's Cave",
      depth: 2,
      pool: ["dw-slime", "dw-drakeema", "dw-drakee", "dw-ghost", "dw-scorpion", "dw-magician", "dw-druin"],
      chestLevel: 3
    },
    "dw-armor-cave": {
      name: "Armor Cave",
      depth: 2,
      pool: ["dw-ghost", "dw-scorpion", "dw-druin", "dw-wraith", "dw-golem", "dw-magidrake"],
      boss: "dw-golem",
      chestLevel: 3
    }
  };
  var DW_SPELL_LEVELS = {
    "dw-hurt": 3,
    "dw-heal": 3,
    "dw-sleep": 3,
    "dw-firebal": 7,
    "dw-stopspell": 7
  };
  var Game = class _Game {
    seed;
    mode;
    rng;
    bus;
    saveManager;
    crafting = new CraftingSystem(Object.values(RECIPES));
    blueprints;
    world;
    features = [];
    dungeon = null;
    dungeonFloor = 1;
    dungeonFloors = {};
    inTower = false;
    towerFloor = 1;
    towerFloors = {};
    player;
    position;
    inDungeon = false;
    questLog = new QuestLog();
    flags = {};
    kills = {};
    npcDialogs = {};
    rests = 0;
    minutes = 0;
    dialogNpcId = null;
    dialogNodeId = "";
    battle = null;
    mapCache = null;
    dungeonConfigFor = {};
    activeDungeonFeatureId = null;
    activeTowerFeatureId = null;
    saveDir;
    constructor(seed, saveDir, mode) {
      this.seed = seed;
      this.mode = mode;
      this.rng = createRng(seed);
      this.saveDir = saveDir ?? "./saves";
      this.bus = new EventBus();
      this.saveManager = new SaveManager(this.saveDir);
      this.blueprints = new BlueprintManager(this);
      this.questLog.attach(this.bus);
      this.bus.on("kill", (payload2) => {
        const p = payload2 ?? {};
        if (p.monsterId)
          this.kills[p.monsterId] = (this.kills[p.monsterId] ?? 0) + (p.count ?? 1);
      });
      this.bus.on("quest-complete", (payload2) => {
        const p = payload2;
        if (p.questId)
          this.grantQuestRewards(p.questId);
      });
    }
    static newGame(opts) {
      const seed = opts.seed ?? Math.floor(Math.random() * 2 ** 31);
      const mode = opts.mode ?? "classic";
      const game = new _Game(seed, opts.saveDir, mode);
      game.buildWorld(seed, mode);
      if (mode === "dw") {
        game.player = createCharacter(opts.playerName, "dw-hero", game.rng, { xpCurveId: "dw", levelCap: DW_LEVEL_CAP });
      } else {
        game.player = createCharacter(opts.playerName, opts.classId, game.rng);
      }
      game.position = { ...game.worldSpawn };
      game.world.reveal(game.position.x, game.position.y, 2);
      game.assignFeatures();
      game.recordLastTown();
      game.message(mode === "dw" ? `Welcome, ${game.player.name}, heir of Erdrick. Alefgard needs you.` : `Welcome, ${game.player.name}, to the realm.`);
      return game;
    }
    static fromSave(data, saveDir) {
      const game = new _Game(data.seed, saveDir, data.mode ?? "classic");
      game.world = new WorldMap(data.worldGrid);
      game.features = data.features;
      game.player = data.player;
      game.position = data.position;
      game.inDungeon = data.inDungeon;
      game.questLog = new QuestLog(data.questLog);
      game.questLog.attach(game.bus);
      game.flags = data.flags;
      game.kills = data.kills;
      game.npcDialogs = data.npcDialogs;
      game.minutes = data.minutes;
      game.rests = data.rests ?? 0;
      game.dungeonFloor = data.dungeonFloor ?? 1;
      if (data.dungeonFloors) {
        for (const [floor, d] of Object.entries(data.dungeonFloors)) {
          game.dungeonFloors[Number(floor)] = game.dataToDungeon(d);
        }
      } else if (data.dungeon) {
        game.dungeonFloors[game.dungeonFloor] = game.dataToDungeon(data.dungeon);
      }
      game.dungeon = game.dungeonFloors[game.dungeonFloor] ?? null;
      game.activeDungeonFeatureId = data.dungeonFeatureId ?? null;
      game.inTower = data.inTower ?? false;
      game.towerFloor = data.towerFloor ?? 1;
      game.activeTowerFeatureId = data.towerFeatureId ?? null;
      if (data.towerFloors) {
        for (const [floor, d] of Object.entries(data.towerFloors)) {
          game.towerFloors[Number(floor)] = game.dataToDungeon(d);
        }
      }
      if (game.inTower) {
        game.dungeon = game.towerFloors[game.towerFloor] ?? null;
      }
      game.restoreDungeonConfigs();
      game.bus.emit("load", {});
      return game;
    }
    restoreDungeonConfigs() {
      if (this.mode !== "classic")
        return;
      const dungeonKeys = Object.keys(DUNGEON_CONFIGS);
      const dungeons = this.features.filter((f) => f.kind === "dungeon").sort((a, b) => a.name.localeCompare(b.name));
      dungeons.forEach((dungeon, i) => {
        const key = dungeonKeys[i % dungeonKeys.length];
        dungeon.dungeonId = key;
        this.dungeonConfigFor[dungeon.id] = key;
      });
    }
    buildWorld(seed, mode) {
      const result = mode === "dw" ? buildAlefgard() : generateOverworld({ size: OVERWORLD_SIZE, seed, townCount: 3, dungeonCount: 3, towerCount: 1, shrineCount: 2 });
      this.world = new WorldMap(result.grid);
      this.features = result.features;
      this.worldSpawn = result.spawn;
    }
    worldSpawn = { x: 2, y: 2 };
    assignFeatures() {
      if (this.mode !== "classic")
        return;
      const towns = this.features.filter((f) => f.kind === "town").sort((a, b) => a.name.localeCompare(b.name));
      const townAssignments = {
        emberfall: ["elder", "blacksmith", "alchemist", "innkeeper"],
        hollowbrook: ["merchant", "guard-captain", "hunter"],
        brightport: ["scholar", "dragon-hunter"]
      };
      const townNames = Object.keys(townAssignments);
      towns.forEach((town, i) => {
        town.npcs = townAssignments[townNames[i % townNames.length]] ?? [];
      });
      const dungeons = this.features.filter((f) => f.kind === "dungeon").sort((a, b) => a.name.localeCompare(b.name));
      const dungeonKeys = Object.keys(DUNGEON_CONFIGS);
      dungeons.forEach((dungeon, i) => {
        const key = dungeonKeys[i % dungeonKeys.length];
        dungeon.dungeonId = key;
        this.dungeonConfigFor[dungeon.id] = key;
      });
    }
    currentMap() {
      if ((this.inDungeon || this.inTower) && this.dungeon) {
        if (!this.mapCache || this.mapCache.grid !== this.dungeon.grid) {
          this.mapCache = new WorldMap(this.dungeon.grid);
        }
        return this.mapCache;
      }
      return this.world;
    }
    currentTile() {
      return this.currentMap().get(this.position.x, this.position.y);
    }
    get day() {
      return Math.floor(this.minutes / 1440) + 1;
    }
    get hour() {
      return Math.floor(this.minutes % 1440 / 60);
    }
    get timeLabel() {
      const h = this.hour;
      return `Day ${this.day}, ${h.toString().padStart(2, "0")}:${(this.minutes % 60 / 10 * 10).toString().padStart(2, "0")}`;
    }
    get isNight() {
      return this.hour >= 20 || this.hour < 6;
    }
    get period() {
      const h = this.hour;
      if (h >= 6 && h < 9)
        return "dawn";
      if (h >= 9 && h < 17)
        return "day";
      if (h >= 17 && h < 20)
        return "dusk";
      return "night";
    }
    advanceTime(minutes) {
      const oldDay = this.day;
      const oldPeriod = this.period;
      this.minutes += minutes;
      if (this.day !== oldDay)
        this.bus.emit("day", { day: this.day });
      if (this.period !== oldPeriod) {
        if (this.period === "night")
          this.bus.emit("night", {});
        if (this.period === "dawn")
          this.bus.emit("dawn", {});
      }
    }
    isSafeRestSpot() {
      const tile = this.currentTile();
      if (tile.type === "town" || tile.type === "shrine")
        return true;
      return false;
    }
    rest(hours = 8) {
      const clamped = Math.max(1, Math.min(12, Math.floor(hours)));
      const minutes = clamped * 60;
      const safe = this.isSafeRestSpot();
      const hpBefore = this.player.hp;
      const mpBefore = this.player.mp;
      if (safe) {
        this.healPlayer();
      } else {
        this.player.hp = Math.min(this.player.derived.maxHp, this.player.hp + Math.floor(this.player.derived.maxHp * 0.4));
        this.player.mp = Math.min(this.player.derived.maxMp, this.player.mp + Math.floor(this.player.derived.maxMp * 0.4));
      }
      const healedHp = Math.max(0, this.player.hp - hpBefore);
      const healedMp = Math.max(0, this.player.mp - mpBefore);
      this.rests++;
      let attacked = false;
      let encounter = [];
      if (!safe) {
        const tile = this.currentTile();
        if (this.rng.chance(0.3)) {
          encounter = this.rollEncounterAt(tile, this.position.x, this.position.y, true);
          if (encounter.length === 0)
            encounter = this.rollEncounterAt(tile, this.position.x, this.position.y, true);
          attacked = encounter.length > 0;
        }
      }
      this.advanceTime(minutes);
      this.bus.emit("rest", { hoursSlept: clamped, safe, healedHp, healedMp, attacked });
      const message = safe ? `You rest ${clamped}h in safety and recover fully.` : attacked ? `You rest ${clamped}h. An ambush cuts your sleep short! (+${healedHp} HP, +${healedMp} MP)` : `You rest ${clamped}h in the wild. (+${healedHp} HP, +${healedMp} MP)`;
      this.message(message);
      return { hoursSlept: clamped, safe, healedHp, healedMp, attacked, encounter: attacked ? encounter : void 0, message };
    }
    message(text) {
      this.bus.emit("message", { text });
    }
    repelActive() {
      return this.mode === "dw" && typeof this.flags["dw-repel-until"] === "number" && this.minutes < this.flags["dw-repel-until"];
    }
    torchActive() {
      return this.mode === "dw" && typeof this.flags["dw-torch-until"] === "number" && this.minutes < this.flags["dw-torch-until"];
    }
    recordLastTown() {
      const feature = this.featureAt(this.position);
      if (feature && feature.kind === "town")
        this.flags["dw-last-town"] = feature.id;
    }
    lastTownPos() {
      const id = this.flags["dw-last-town"];
      if (typeof id !== "string")
        return null;
      const feature = this.features.find((f) => f.id === id);
      return feature ? { x: feature.x, y: feature.y } : null;
    }
    hasItem(id, count = 1) {
      return new Inventory(this.player.inventory).has(id, count);
    }
    itemCount(id) {
      return new Inventory(this.player.inventory).getItemCount(id);
    }
    startQuest(id) {
      const ok = this.questLog.start(id, this.bus);
      if (ok) {
        const def = this.questLog.getState(id).def;
        this.message(`Quest started: ${def.name}`);
      }
      return ok;
    }
    giveItem(id, count) {
      const inv = new Inventory(this.player.inventory);
      try {
        inv.addItem(id, count);
      } catch {
        this.message(`Inventory full, could not receive ${itemDef(id).name}.`);
        return;
      }
      this.bus.emit("item-gain", { itemId: id, count });
      this.bus.emit("collect", { itemId: id, count });
    }
    rewardGold(amount) {
      this.player.gold += amount;
      this.bus.emit("gold", { amount });
    }
    healPlayer() {
      this.player.hp = this.player.derived.maxHp;
      this.player.mp = this.player.derived.maxMp;
      this.message(`${this.player.name} is fully healed.`);
    }
    setFlag(name) {
      this.flags[name] = true;
    }
    clearFlag(name) {
      delete this.flags[name];
    }
    completeQuest(id) {
      return this.questLog.complete(id, this.bus) !== null;
    }
    questActive(id) {
      return this.questLog.isActive(id);
    }
    questCompleted(id) {
      return this.questLog.isCompleted(id);
    }
    move(dir) {
      const map = this.currentMap();
      const d = DIRECTION_DELTAS[dir];
      const nx = this.position.x + d.x;
      const ny = this.position.y + d.y;
      if (!map.isWalkable(nx, ny)) {
        return { moved: false, reason: "blocked" };
      }
      this.position = { x: nx, y: ny };
      this.advanceTime(10);
      const trapDamage = this.dungeon ? this.triggerTrap(nx, ny) : 0;
      const revealed = map.reveal(nx, ny, this.torchActive() ? 4 : 2);
      this.bus.emit("move", { dir, x: nx, y: ny });
      const tile = map.get(nx, ny);
      this.recordLastTown();
      const encounter = this.rollEncounterAt(tile, nx, ny);
      const result = { moved: true, tile, x: nx, y: ny, revealed };
      if (encounter.length > 0)
        result.encounter = encounter;
      if (trapDamage > 0)
        result.trapDamage = trapDamage;
      return result;
    }
    triggerTrap(x, y) {
      if (!this.dungeon)
        return 0;
      const index = this.dungeon.traps.findIndex((t) => t.x === x && t.y === y);
      if (index < 0)
        return 0;
      this.dungeon.traps.splice(index, 1);
      const damage = Math.max(1, Math.floor(this.player.derived.maxHp * 0.12 + this.player.level));
      this.player.hp = Math.max(1, this.player.hp - damage);
      this.bus.emit("trap", { x, y, damage });
      this.message(`You step on a hidden trap and take ${damage} damage!`);
      return damage;
    }
    rollEncounterAt(tile, x, y, night = this.isNight) {
      if (this.repelActive())
        return [];
      if (this.inTower && this.dungeon) {
        const monsterHere = this.dungeon.monsters.find((m) => m.x === x && m.y === y);
        if (monsterHere)
          return [monsterHere.id];
        const chance2 = TILE_DEFS[tile.type]?.encounterChance ?? 0.1;
        if (tile.type === "stone" && this.rng.chance(chance2)) {
          const count2 = this.rng.chance(0.25) ? 2 : 1;
          const pool2 = towerPoolFor(this.towerFloor);
          const ids2 = [];
          for (let i = 0; i < count2; i++)
            ids2.push(this.rng.pick(pool2));
          return ids2;
        }
        return [];
      }
      if (this.inDungeon && this.dungeon) {
        const monsterHere = this.dungeon.monsters.find((m) => m.x === x && m.y === y);
        if (monsterHere)
          return [monsterHere.id];
        const chance2 = TILE_DEFS[tile.type]?.encounterChance ?? 0.1;
        if (tile.type === "stone" && this.rng.chance(chance2)) {
          const config = this.dungeonConfig(this.currentDungeonKey());
          const count2 = this.rng.chance(0.25) ? 2 : 1;
          const ids2 = [];
          for (let i = 0; i < count2; i++)
            ids2.push(this.rng.pick(config.pool));
          return ids2;
        }
        return [];
      }
      let chance = TILE_DEFS[tile.type]?.encounterChance ?? 0;
      if (night && this.mode === "classic")
        chance *= 1.8;
      if (chance <= 0 || !this.rng.chance(chance))
        return [];
      const pool = this.encounterPool(tile.type, night);
      if (pool.length === 0)
        return [];
      const count = this.rng.chance(0.15) ? 2 : this.rng.chance(0.25) ? 3 : 1;
      const ids = [];
      for (let i = 0; i < count; i++)
        ids.push(this.rng.weighted(pool));
      return ids;
    }
    encounterPool(tileType, night = false) {
      const level = this.player.level;
      if (this.mode === "dw") {
        return dwEncounterPool(tileType, level).map((item) => ({ item, weight: 1 }));
      }
      const byTerrain = {
        forest: ["rat", "wolf", "giant-spider", "slime", "goblin"],
        swamp: ["slime", "giant-spider", "rat", "wolf"],
        grassland: ["rat", "wolf", "goblin", "slime"],
        plains: ["rat", "goblin", "bandit", "wolf"],
        hills: ["goblin", "bandit", "orc-warrior", "wolf"],
        shore: ["rat", "slime"],
        snow: ["wolf", "troll", "dragon", "skeleton"],
        desert: ["bandit", "goblin", "skeleton"]
      };
      const terrainPool = byTerrain[tileType] ?? ["rat", "wolf", "goblin"];
      const nightPool = night ? ["zombie", "ghost", "shadow-wraith", "skeleton"] : [];
      return [...terrainPool, ...nightPool].map((id) => ({ item: id, def: monsterDef(id) })).filter(({ def }) => def.level >= level - 2 && def.level <= level + 2).map(({ item, def }) => ({ item, weight: def.boss ? 2 : 10 - Math.abs(def.level - level) }));
    }
    enemyDefsFor(ids) {
      if (this.inTower) {
        const boss = towerBossForFloor(this.towerFloor);
        const level = towerMonsterLevel(this.towerFloor);
        return ids.map((id) => boss === id ? monsterDef(id) : scaleMonster(id, level));
      }
      return ids.map((id) => monsterDef(id));
    }
    startBattle(enemyIds) {
      if (this.battle || enemyIds.length === 0)
        return null;
      this.bus.emit("battle-start", { enemies: enemyIds });
      const battle = new Battle([this.player], this.enemyDefsFor(enemyIds), this.rng, (line) => this.bus.emit("battle-log", { text: line }));
      battle.start();
      this.battle = battle;
      return battle;
    }
    stepBattle(action) {
      if (!this.battle)
        throw new Error("No active battle.");
      this.battle.step(action);
      while (!this.battle.isOver()) {
        const actor = this.battle.currentActor();
        if (actor.kind === "hero")
          break;
        this.battle.step(this.battle.enemyAI(actor));
      }
      return this.battle;
    }
    resolveBattle() {
      if (!this.battle)
        return null;
      const battle = this.battle;
      this.battle = null;
      const result = battle.finish();
      this.resolveBattleResult(result);
      return result;
    }
    runBattle(enemyIds) {
      if (!this.startBattle(enemyIds))
        return null;
      const battle = this.battle;
      this.battle = null;
      const result = battle.run();
      this.resolveBattleResult(result);
      return result;
    }
    resolveBattleResult(result) {
      const hero = this.player;
      hero.hp = Math.max(0, Math.min(hero.derived.maxHp, hero.hp));
      if (result.victory) {
        this.addXpToPlayer(result.xpEarned);
        hero.gold += result.goldEarned;
        this.bus.emit("gold", { amount: result.goldEarned });
        const inv = new Inventory(hero.inventory);
        for (const loot of result.loot) {
          try {
            inv.addItem(loot.id, loot.count);
            this.bus.emit("collect", { itemId: loot.id, count: loot.count });
          } catch {
            this.message(`Inventory full, lost ${loot.count} x ${itemDef(loot.id).name}.`);
          }
        }
        for (const kill of result.kills) {
          this.bus.emit("kill", { monsterId: kill.monsterId, count: kill.count });
        }
        if (this.mode === "dw" && !this.flags["dw-dragon-transformed"] && result.kills.some((k) => k.monsterId === "dw-dragonlord")) {
          this.flags["dw-dragon-transformed"] = true;
          this.message("The Dragonlord's human guise collapses... and the beast within rises!");
          this.bus.emit("battle-start", { enemies: ["dw-dragonlord-dragon"] });
          this.battle = new Battle([this.player], this.enemyDefsFor(["dw-dragonlord-dragon"]), this.rng, (line) => this.bus.emit("battle-log", { text: line }));
          this.battle.start();
          return;
        }
        this.message(`Victory! Gained ${result.xpEarned} XP and ${result.goldEarned} gold.`);
      } else if (result.fled) {
        this.message("You fled the battle.");
      } else {
        hero.hp = 0;
        this.message("You were defeated...");
        this.respawn();
      }
      this.bus.emit("battle-end", { result });
    }
    respawn() {
      const town = this.features.find((f) => f.kind === "town");
      this.position = town ? { x: town.x, y: town.y } : { ...this.worldSpawn };
      if (this.inDungeon) {
        this.dungeon = null;
        this.dungeonFloors = {};
      }
      if (this.inTower) {
        this.dungeon = null;
        this.towerFloors = {};
      }
      this.inDungeon = false;
      this.inTower = false;
      this.towerFloor = 1;
      this.activeDungeonFeatureId = null;
      this.activeTowerFeatureId = null;
      this.mapCache = null;
      this.player.hp = Math.floor(this.player.derived.maxHp * 0.5);
      this.player.mp = Math.floor(this.player.derived.maxMp * 0.5);
      this.recordLastTown();
      this.message("You wake up in the safety of the nearest town, battered but alive.");
    }
    interact() {
      const tile = this.currentTile();
      if (tile.type === "chest")
        return this.lootChest();
      const feature = this.featureAt(this.position);
      if (this.inDungeon && tile.type === "stairs-up")
        return this.ascend();
      if (this.inDungeon && tile.type === "stairs-down")
        return this.descend();
      if (this.inTower && tile.type === "stairs-up")
        return this.towerPrev();
      if (this.inTower && tile.type === "stairs-down")
        return this.towerNext();
      if (tile.type === "shrine") {
        return this.blessAtShrine(feature);
      }
      if (tile.type === "town" && feature) {
        return { kind: "town", feature, npcs: feature.npcs ?? [] };
      }
      if (tile.type === "dungeon" && feature) {
        return { kind: "dungeon", feature };
      }
      if (tile.type === "tower" && feature) {
        return this.enterTower(feature);
      }
      return { kind: "none" };
    }
    featureAt(pos) {
      return this.features.find((f) => f.x === pos.x && f.y === pos.y);
    }
    currentDungeonKey() {
      if (this.mode === "dw") {
        const feature = this.activeDungeonFeatureId ? this.features.find((f) => f.id === this.activeDungeonFeatureId) : void 0;
        return feature?.dungeonId ?? "dw-castle";
      }
      const key = this.activeDungeonFeatureId ? this.dungeonConfigFor[this.activeDungeonFeatureId] : void 0;
      return key ?? "dungeon-ruined-keep";
    }
    dungeonConfig(key) {
      if (this.mode === "dw")
        return DW_DUNGEON_CONFIGS[key] ?? DW_DUNGEON_CONFIGS["dw-castle"];
      return DUNGEON_CONFIGS[key] ?? DUNGEON_CONFIGS["dungeon-ruined-keep"];
    }
    buildDungeonFloor(floor) {
      const key = this.currentDungeonKey();
      const config = this.dungeonConfig(key);
      const seed = this.rng.int(1, 2 ** 31);
      const lastFloor = floor >= config.depth;
      const dungeon = generateDungeon({
        id: key,
        name: config.name,
        seed,
        width: 28,
        height: 28,
        roomCount: 8,
        monsterPool: config.pool,
        maxMonsters: 8,
        bossId: lastFloor ? config.boss : void 0,
        chestLevel: Math.min(3, config.chestLevel + floor - 1),
        depth: config.depth,
        floor
      });
      if (this.mode === "dw")
        authorDwDungeon(dungeon, key);
      this.dungeonFloors[floor] = dungeon;
      return dungeon;
    }
    enterDungeon(feature) {
      this.activeDungeonFeatureId = feature.id;
      this.dungeonFloor = 1;
      this.dungeonFloors = {};
      const key = feature.dungeonId ?? this.currentDungeonKey();
      const config = this.dungeonConfig(key);
      this.dungeon = this.buildDungeonFloor(1);
      this.inDungeon = true;
      this.position = { ...this.dungeon.entry };
      this.mapCache = null;
      this.currentMap().reveal(this.position.x, this.position.y, 3);
      this.bus.emit("enter-dungeon", { dungeonId: key, name: config.name, floor: 1 });
      this.bus.emit("reach", { dungeonId: key });
      this.bus.emit("visit", { featureId: feature.id });
      this.message(`You descend into the ${config.name} (Floor 1).`);
      return { kind: "none", message: `Entered ${config.name}. Good luck.` };
    }
    descend() {
      if (!this.inDungeon || !this.dungeon)
        return { kind: "none", message: "You are not in a dungeon." };
      if (this.currentTile().type !== "stairs-down")
        return { kind: "none", message: "You are not on stairs leading down." };
      const key = this.currentDungeonKey();
      const config = this.dungeonConfig(key);
      if (this.dungeonFloor >= config.depth) {
        this.message("There is no deeper path.");
        return { kind: "none", message: "The stairs descend no further." };
      }
      this.dungeonFloor++;
      this.dungeon = this.dungeonFloors[this.dungeonFloor] ?? this.buildDungeonFloor(this.dungeonFloor);
      this.position = { ...this.dungeon.entry };
      this.mapCache = null;
      this.currentMap().reveal(this.position.x, this.position.y, 3);
      this.bus.emit("descend", { dungeonId: key, floor: this.dungeonFloor });
      this.bus.emit("reach", { dungeonId: `${key}-depth-${this.dungeonFloor}` });
      this.message(`You descend to Floor ${this.dungeonFloor} of the ${config.name}.`);
      return { kind: "none", message: `You are on Floor ${this.dungeonFloor}.` };
    }
    ascend() {
      if (!this.inDungeon || !this.dungeon)
        return { kind: "none", message: "You are not in a dungeon." };
      if (this.currentTile().type !== "stairs-up")
        return { kind: "none", message: "You are not on stairs leading up." };
      if (this.dungeonFloor <= 1) {
        this.exitDungeon();
        return { kind: "none", message: "You climb back to the surface." };
      }
      this.dungeonFloor--;
      this.dungeon = this.dungeonFloors[this.dungeonFloor] ?? this.buildDungeonFloor(this.dungeonFloor);
      this.position = { ...this.dungeon.entry };
      this.mapCache = null;
      this.currentMap().reveal(this.position.x, this.position.y, 3);
      this.bus.emit("ascend", { dungeonId: this.dungeon.id, floor: this.dungeonFloor });
      this.message(`You climb back up to Floor ${this.dungeonFloor}.`);
      return { kind: "none", message: `You are on Floor ${this.dungeonFloor}.` };
    }
    exitDungeon() {
      const feature = this.features.find((f) => f.id === this.activeDungeonFeatureId) ?? this.features.find((f) => f.kind === "dungeon");
      this.dungeon = null;
      this.dungeonFloors = {};
      this.inDungeon = false;
      this.mapCache = null;
      if (feature)
        this.position = { x: feature.x, y: feature.y };
      this.activeDungeonFeatureId = null;
      this.bus.emit("exit-dungeon", {});
      this.message("You exit the dungeon into the open air.");
    }
    enterTower(feature) {
      if (this.player.level < 10) {
        this.message("The tower's wards refuse to open for one so lowly. (Requires level 10)");
        return { kind: "none", message: "The tower is sealed to you." };
      }
      this.activeTowerFeatureId = feature.id;
      this.towerFloor = 1;
      this.towerFloors = {};
      this.dungeon = this.towerFloors[1] ?? this.buildTowerFloor(1, this.seed);
      this.inTower = true;
      this.position = { ...this.dungeon.entry };
      this.mapCache = null;
      this.currentMap().reveal(this.position.x, this.position.y, 3);
      this.bus.emit("enter-tower", { floor: 1 });
      this.bus.emit("visit", { featureId: feature.id });
      this.message("You climb the worn stairs into the Tower of Ascension (Floor 1).");
      return { kind: "none", message: "You entered the Tower of Ascension." };
    }
    towerNext() {
      if (!this.inTower || !this.dungeon)
        return { kind: "none", message: "You are not in the tower." };
      if (this.currentTile().type !== "stairs-down")
        return { kind: "none", message: "You are not on the ascending stairs." };
      if (this.towerFloor >= TOWER_MAX_FLOOR) {
        this.message("You stand at the peak of the Tower. There is nothing higher.");
        return { kind: "none", message: "You stand atop the tower." };
      }
      this.towerFloor++;
      this.dungeon = this.towerFloors[this.towerFloor] ?? this.buildTowerFloor(this.towerFloor, this.seed);
      this.position = { ...this.dungeon.entry };
      this.mapCache = null;
      this.currentMap().reveal(this.position.x, this.position.y, 3);
      const boss = towerBossForFloor(this.towerFloor);
      this.bus.emit("tower-ascend", { floor: this.towerFloor });
      this.bus.emit("reach", { dungeonId: `tower-floor-${this.towerFloor}` });
      if (boss)
        this.message(`You climb to Floor ${this.towerFloor}. The ${monsterDef(boss).name} looms ahead!`);
      else
        this.message(`You climb to Floor ${this.towerFloor} of the Tower.`);
      return { kind: "none", message: `You are on Floor ${this.towerFloor}.` };
    }
    towerPrev() {
      if (!this.inTower || !this.dungeon)
        return { kind: "none", message: "You are not in the tower." };
      if (this.currentTile().type !== "stairs-up")
        return { kind: "none", message: "You are not on the descending stairs." };
      if (this.towerFloor <= 1) {
        this.exitTower();
        return { kind: "none", message: "You descend back to the ground." };
      }
      this.towerFloor--;
      this.dungeon = this.towerFloors[this.towerFloor] ?? this.buildTowerFloor(this.towerFloor, this.seed);
      this.position = { ...this.dungeon.entry };
      this.mapCache = null;
      this.currentMap().reveal(this.position.x, this.position.y, 3);
      this.bus.emit("tower-descend", { floor: this.towerFloor });
      this.message(`You descend to Floor ${this.towerFloor} of the Tower.`);
      return { kind: "none", message: `You are on Floor ${this.towerFloor}.` };
    }
    exitTower() {
      const feature = this.features.find((f) => f.id === this.activeTowerFeatureId) ?? this.features.find((f) => f.kind === "tower");
      this.dungeon = null;
      this.towerFloors = {};
      this.inTower = false;
      this.towerFloor = 1;
      this.mapCache = null;
      if (feature)
        this.position = { x: feature.x, y: feature.y };
      this.activeTowerFeatureId = null;
      this.bus.emit("exit-tower", {});
      this.message("You step out of the Tower of Ascension into the light.");
    }
    buildTowerFloor(floor, baseSeed) {
      const tower = buildTowerFloor(floor, baseSeed);
      this.towerFloors[floor] = tower;
      return tower;
    }
    blessAtShrine(feature) {
      this.healPlayer();
      this.addXpToPlayer(25);
      if (this.mode === "dw" && feature?.id === "dw-shrine-rain") {
        if (!this.flags["dw-rain-prayed"]) {
          this.flags["dw-rain-prayed"] = true;
          for (const t of RAIN_BARRIER) {
            if (this.world.grid[t.y]?.[t.x])
              this.world.grid[t.y][t.x] = makeTile("plains", true, "dry riverbed");
          }
          this.message("The shrine's waters rise, and the stream to the east parts before your faith!");
        } else {
          this.message("The stream to the east remains parted, awaiting the bearer of Erdrick's will.");
        }
        this.bus.emit("shrine", { featureId: feature?.id });
        return { kind: "shrine", feature, message: "The Rain Shrine renews your spirit." };
      }
      const key = `blessed-${feature?.id ?? "shrine"}`;
      if (!this.flags[key]) {
        this.flags[key] = true;
        this.message("The shrine's light fills you with resolve. (+25 XP)");
      } else {
        this.message("You rest at the shrine. Your wounds are mended.");
      }
      this.bus.emit("shrine", { featureId: feature?.id });
      return { kind: "shrine", feature, message: "The shrine renews your spirit." };
    }
    lootChest() {
      const map = this.currentMap();
      const tile = map.get(this.position.x, this.position.y);
      if (tile.type !== "chest")
        return { kind: "none" };
      if (this.mode === "dw" && tile.variant)
        return this.lootDwChest(tile.variant, tile);
      const level = this.inTower ? towerChestLevel(this.towerFloor) : this.inDungeon && this.dungeon ? this.dungeonConfig(this.currentDungeonKey()).chestLevel : 1;
      const { items, gold } = rollChest(level, this.rng);
      const inv = new Inventory(this.player.inventory);
      inv.gold += gold;
      for (const item of items) {
        try {
          inv.addItem(item.id, item.count);
          this.bus.emit("collect", { itemId: item.id, count: item.count });
        } catch {
          this.message(`Inventory full, lost ${item.count} x ${itemDef(item.id).name}.`);
        }
      }
      tile.type = "stone";
      tile.variant = "looted chest";
      this.bus.emit("item-gain", { gold, items: items.length });
      this.message(`You open the chest: ${gold} gold${items.length > 0 ? " and " + items.map((i) => `${i.count} x ${itemDef(i.id).name}`).join(", ") : ""}.`);
      return {
        kind: "chest",
        looted: { items: items.map((i) => ({ id: i.id, count: i.count })), gold }
      };
    }
    lootDwChest(variant, tile) {
      const inv = new Inventory(this.player.inventory);
      const sealChest = () => {
        this.message("The chest is magically sealed. It will not open without a Magic Key.");
        return { kind: "none", message: "The chest is sealed." };
      };
      let gold = 0;
      let items = [];
      switch (variant) {
        case "dw-chest-gold":
          gold = this.rng.int(40, 120);
          break;
        case "dw-chest-gold-big":
          gold = this.rng.int(150, 350);
          break;
        case "dw-chest-eridricks-sword":
          if (this.flags["dw-has-eridricks-sword"])
            return sealChest();
          items = [{ id: "dw-eridricks-sword", count: 1 }];
          this.flags["dw-has-eridricks-sword"] = true;
          break;
        case "dw-chest-eridricks-armor":
          if (this.flags["dw-has-eridricks-armor"])
            return sealChest();
          items = [{ id: "dw-eridricks-armor", count: 1 }];
          this.flags["dw-has-eridricks-armor"] = true;
          break;
        case "dw-chest-gwaelin": {
          const key = inv.items.find((i) => i.id === "dw-key");
          if (!key)
            return sealChest();
          inv.removeByUid(key.uid, 1);
          this.flags["dw-gwaelin-rescued"] = true;
          this.message("You use a Magic Key. The chest opens and frees Princess Gwaelin! She rushes to safety, her heart bound to yours.");
          break;
        }
        default:
          return { kind: "none", message: "The chest is empty." };
      }
      if (gold > 0) {
        this.player.gold += gold;
        this.bus.emit("gold", { amount: gold });
      }
      for (const item of items) {
        try {
          inv.addItem(item.id, item.count);
          this.bus.emit("collect", { itemId: item.id, count: item.count });
        } catch {
          this.message(`Inventory full, lost ${item.count} x ${itemDef(item.id).name}.`);
        }
      }
      tile.type = "stone";
      tile.variant = "looted chest";
      this.bus.emit("item-gain", { gold, items: items.length });
      const gained = `${gold > 0 ? `${gold} gold` : ""}${items.length > 0 ? (gold > 0 ? " and " : "") + items.map((i) => `${i.count} x ${itemDef(i.id).name}`).join(", ") : ""}`;
      this.message(`You open the chest: ${gained || "nothing"}.`);
      return { kind: "chest", looted: { items, gold } };
    }
    addXpToPlayer(amount) {
      const fromLevel = this.player.level;
      const levels = addXp(this.player, amount);
      const crossed = milestonesCrossed(fromLevel, this.player.level);
      for (const lvl of crossed) {
        const m = applyMilestone(this.player, lvl);
        if (m) {
          this.message(`MILESTONE: ${this.player.name} is now a ${m.title}! (+${m.skillPoints} skill point${m.skillPoints > 1 ? "s" : ""})`);
          this.bus.emit("milestone", { level: lvl, title: m.title, skillPoints: m.skillPoints });
        }
      }
      this.bus.emit("xp", { amount, level: this.player.level, levels });
      if (levels > 0) {
        if (this.mode === "dw")
          this.learnDwSpells();
        this.message(`You reached level ${this.player.level}! You have ${this.player.statPoints} stat points to spend.`);
        this.bus.emit("level-up", { level: this.player.level });
      }
      return levels;
    }
    learnDwSpells() {
      for (const [skillId, req] of Object.entries(DW_SPELL_LEVELS)) {
        if (this.player.level < req)
          continue;
        if (this.player.learnedSkills.includes(skillId))
          continue;
        this.player.learnedSkills.push(skillId);
        this.message(`You learn ${skillDef(skillId).name}!`);
        this.bus.emit("skill-learned", { skillId });
      }
    }
    learnPlayerSkill(skillId) {
      const ok = learnSkill(this.player, skillId);
      if (ok) {
        this.message(`You learn ${skillDef(skillId).name}!`);
        this.bus.emit("skill-learned", { skillId });
      }
      return ok;
    }
    grantRewards(r) {
      if (r.xp > 0)
        this.addXpToPlayer(r.xp);
      if (r.gold > 0)
        this.rewardGold(r.gold);
      for (const item of r.items)
        this.giveItem(item.id, item.count);
    }
    runTrial(trialId) {
      const trial = trialDef(trialId);
      if (this.player.level < trial.levelReq) {
        return { success: false, firstTime: false, rewardsGranted: false, message: `Requires level ${trial.levelReq}.` };
      }
      this.bus.emit("trial-start", { trialId });
      this.message(`You begin the ${trial.name}!`);
      const result = this.runBattle(trial.enemies);
      if (!result?.victory) {
        this.bus.emit("trial-end", { trialId, success: false });
        return { success: false, result, firstTime: false, rewardsGranted: false, message: "The trial overcomes you." };
      }
      const firstTime = !this.flags[trial.flagKey];
      const rewards = firstTime ? trial.rewards : trial.repeatRewards;
      this.grantRewards(rewards);
      if (firstTime)
        this.flags[trial.flagKey] = true;
      this.bus.emit("trial-end", { trialId, success: true, firstTime });
      this.message(firstTime ? "Trial complete! First-clear rewards granted." : "Trial complete! Repeat rewards granted.");
      return { success: true, result, firstTime, rewardsGranted: true, message: `Completed ${trial.name}.` };
    }
    runRaid(raidId) {
      const raid = raidDef(raidId);
      if (this.player.level < raid.levelReq) {
        return { success: false, stagesCleared: 0, stagesTotal: raid.stages.length, rewardsGranted: false, message: `Requires level ${raid.levelReq}.` };
      }
      if (raid.entryItem && !this.hasItem(raid.entryItem)) {
        return { success: false, stagesCleared: 0, stagesTotal: raid.stages.length, rewardsGranted: false, message: `You need a ${itemDef(raid.entryItem).name}.` };
      }
      if (raid.entryItem) {
        const inv = new Inventory(this.player.inventory);
        const stack = inv.items.find((i) => i.id === raid.entryItem);
        if (stack)
          inv.removeByUid(stack.uid, 1);
        this.message(`The ${itemDef(raid.entryItem).name} is consumed.`);
      }
      this.bus.emit("raid-start", { raidId });
      let cleared = 0;
      for (const stage of raid.stages) {
        this.message(stage.message);
        this.bus.emit("raid-stage", { raidId, stage: stage.name });
        const result = this.runBattle(stage.enemies);
        if (!result?.victory) {
          this.bus.emit("raid-end", { raidId, success: false, stagesCleared: cleared });
          return {
            success: false,
            stagesCleared: cleared,
            stagesTotal: raid.stages.length,
            result,
            rewardsGranted: false,
            message: `Raid failed at "${stage.name}".`
          };
        }
        cleared++;
        if (cleared < raid.stages.length) {
          this.player.hp = Math.min(this.player.derived.maxHp, this.player.hp + Math.floor(this.player.derived.maxHp * raid.healBetweenPct));
          this.player.mp = Math.min(this.player.derived.maxMp, this.player.mp + Math.floor(this.player.derived.maxMp * raid.healBetweenPct));
          this.message("A moment's reprieve restores a little strength.");
        }
      }
      this.grantRewards(raid.rewards);
      this.bus.emit("raid-end", { raidId, success: true, stagesCleared: cleared });
      this.message("Raid complete! Rewards granted.");
      return { success: true, stagesCleared: cleared, stagesTotal: raid.stages.length, rewardsGranted: true, message: `Completed ${raid.name}.` };
    }
    grantQuestRewards(questId) {
      const state = this.questLog.getState(questId);
      if (!state || state.status !== "completed")
        return;
      const r = state.def.rewards;
      if (r.xp > 0)
        this.addXpToPlayer(r.xp);
      if (r.gold > 0)
        this.rewardGold(r.gold);
      for (const item of r.items)
        this.giveItem(item.id, item.count);
      this.questLog.turnIn(questId, this.bus);
      this.message(`Quest rewards granted for "${state.def.name}".`);
    }
    spendStatPoint(stat) {
      if (this.player.statPoints <= 0)
        return false;
      applyStatPoint(this.player, stat);
      this.message(`${stat.toUpperCase()} increased to ${this.player.stats[stat]}.`);
      return true;
    }
    talk(npcId) {
      if (!NPCS[npcId])
        return null;
      this.npcDialogs[npcId] = (this.npcDialogs[npcId] ?? 0) + 1;
      this.bus.emit("talk", { npcId });
      this.dialogNpcId = npcId;
      this.dialogNodeId = getNpc(npcId).startDialog;
      return this.dialogView();
    }
    chooseDialog(optionIndex) {
      if (!this.dialogNpcId)
        return this.dialogView();
      const npc = getNpc(this.dialogNpcId);
      const node = getDialog(npc, this.dialogNodeId);
      const options = (node.options ?? []).map((opt, i) => ({ opt, i })).filter(({ opt }) => evaluateCondition(opt.condition, this));
      const entry = options.find(({ i }) => i === optionIndex);
      let openedShop = false;
      if (entry) {
        if (entry.opt.effect) {
          openedShop = Boolean(entry.opt.effect.openShop);
          applyEffect(entry.opt.effect, this);
        }
        if (entry.opt.next)
          this.dialogNodeId = entry.opt.next;
      }
      const view = this.dialogView();
      view.openedShop = openedShop;
      return view;
    }
    closeDialog() {
      this.dialogNpcId = null;
    }
    currentDialogView() {
      return this.dialogView();
    }
    dialogView() {
      if (!this.dialogNpcId) {
        return { npcId: "", npcName: "", nodeId: "", text: "", options: [], openedShop: false };
      }
      const npc = getNpc(this.dialogNpcId);
      const node = getDialog(npc, this.dialogNodeId);
      const options = (node.options ?? []).map((opt, i) => ({
        index: i,
        text: opt.text,
        available: evaluateCondition(opt.condition, this)
      }));
      return {
        npcId: npc.id,
        npcName: npc.name,
        nodeId: this.dialogNodeId,
        text: node.text,
        options,
        openedShop: false
      };
    }
    useItem(itemId) {
      const def = itemDef(itemId);
      const inv = new Inventory(this.player.inventory);
      const stack = inv.items.find((i) => i.id === itemId);
      if (!stack)
        return false;
      if (this.mode === "dw" && itemId === "dw-torch") {
        this.flags["dw-torch-until"] = this.minutes + 256;
        inv.removeByUid(stack.uid, 1);
        this.bus.emit("use-item", { itemId });
        this.message("The torch flares to life, banishing the dark around you.");
        return true;
      }
      if (this.mode === "dw" && itemId === "dw-fairy-water") {
        this.flags["dw-repel-until"] = this.minutes + 256;
        inv.removeByUid(stack.uid, 1);
        this.bus.emit("use-item", { itemId });
        this.message("You sprinkle the fairy water. Monsters will avoid you for a while.");
        return true;
      }
      if (this.mode === "dw" && itemId === "dw-wing") {
        const dest = this.lastTownPos() ?? { ...this.worldSpawn };
        if (this.inDungeon || this.inTower) {
          this.dungeon = null;
          this.dungeonFloors = {};
          this.towerFloors = {};
          this.inDungeon = false;
          this.inTower = false;
          this.mapCache = null;
          this.activeDungeonFeatureId = null;
          this.activeTowerFeatureId = null;
        }
        this.position = { ...dest };
        this.world.reveal(this.position.x, this.position.y, 3);
        inv.removeByUid(stack.uid, 1);
        this.bus.emit("use-item", { itemId });
        this.message("The wing carries you swiftly through the air to the last town you visited.");
        return true;
      }
      if (def.healHp)
        this.player.hp = Math.min(this.player.derived.maxHp, this.player.hp + def.healHp);
      if (def.healMp)
        this.player.mp = Math.min(this.player.derived.maxMp, this.player.mp + def.healMp);
      if (def.cures)
        this.player.activeEffects = [];
      if (def.healHp || def.healMp || def.cures) {
        inv.removeByUid(stack.uid, 1);
        this.bus.emit("use-item", { itemId });
        this.message(`Used ${def.name}.`);
        return true;
      }
      return false;
    }
    equip(uid) {
      const inv = new Inventory(this.player.inventory);
      const item = inv.find(uid);
      if (!item)
        return false;
      const def = itemDef(item.id);
      const slot = def.slot;
      if (!slot)
        return false;
      const old = this.player.equipment[slot];
      inv.removeByUid(uid, 1);
      this.player.equipment[slot] = { ...item, count: 1 };
      if (old)
        inv.addItem(old.id, 1);
      addEquipmentSkill(this.player, item.id);
      recomputeDerived(this.player);
      this.bus.emit("equip", { itemId: item.id, slot });
      this.message(`Equipped ${def.name}.`);
      return true;
    }
    unequip(slot) {
      const item = this.player.equipment[slot];
      if (!item)
        return false;
      const inv = new Inventory(this.player.inventory);
      try {
        inv.addItem(item.id, 1);
      } catch {
        return false;
      }
      this.player.equipment[slot] = null;
      removeEquipmentSkill(this.player, item.id);
      recomputeDerived(this.player);
      this.bus.emit("unequip", { itemId: item.id, slot });
      this.message(`Unequipped ${itemDef(item.id).name}.`);
      return true;
    }
    buy(itemId, npcId) {
      const npc = getNpc(npcId);
      if (!npc.shop?.includes(itemId))
        return false;
      const def = itemDef(itemId);
      const price = def.price ?? Math.max(1, Math.ceil(def.value * 1.5));
      if (this.player.gold < price) {
        this.message("Not enough gold.");
        return false;
      }
      const inv = new Inventory(this.player.inventory);
      try {
        inv.addItem(itemId, 1);
      } catch {
        this.message("Inventory full, cannot buy.");
        return false;
      }
      this.player.gold -= price;
      this.bus.emit("trade", { kind: "buy", itemId, price });
      this.message(`Bought ${def.name} for ${price} gold.`);
      return true;
    }
    sell(uid) {
      const inv = new Inventory(this.player.inventory);
      const item = inv.find(uid);
      if (!item)
        return false;
      const def = itemDef(item.id);
      const price = Math.max(1, Math.floor(def.value * 0.6));
      inv.removeByUid(uid, 1);
      this.player.gold += price;
      this.bus.emit("trade", { kind: "sell", itemId: item.id, price });
      this.message(`Sold ${def.name} for ${price} gold.`);
      return true;
    }
    craft(recipeId, station) {
      const recipe = this.crafting.recipe(recipeId);
      const inv = new Inventory(this.player.inventory);
      try {
        const ok = this.crafting.craft(recipe, inv);
        if (ok) {
          this.bus.emit("craft", { recipeId, result: recipe.result });
          this.message(`Crafted ${recipe.name}.`);
        } else {
          this.message(`Cannot craft ${recipe.name}: missing ingredients.`);
        }
        return ok;
      } catch {
        this.message(`Cannot craft ${recipe.name}: inventory is full.`);
        return false;
      }
    }
    serializableState() {
      const floors = {};
      if (this.inDungeon) {
        for (const [floor, d] of Object.entries(this.dungeonFloors)) {
          floors[Number(floor)] = this.dungeonToData(d);
        }
      }
      const towerFloors = {};
      if (this.inTower) {
        for (const [floor, d] of Object.entries(this.towerFloors)) {
          towerFloors[Number(floor)] = this.dungeonToData(d);
        }
      }
      return {
        version: SAVE_VERSION,
        savedAt: (/* @__PURE__ */ new Date()).toISOString(),
        seed: this.seed,
        mode: this.mode,
        minutes: this.minutes,
        player: this.player,
        worldGrid: this.world.grid,
        features: this.features,
        position: this.position,
        dungeon: this.inDungeon && this.dungeon ? this.dungeonToData(this.dungeon) : null,
        dungeonFloor: this.dungeonFloor,
        dungeonFloors: this.inDungeon ? floors : void 0,
        dungeonFeatureId: this.activeDungeonFeatureId ?? void 0,
        inDungeon: this.inDungeon,
        inTower: this.inTower,
        towerFloor: this.towerFloor,
        towerFloors: this.inTower ? towerFloors : void 0,
        towerFeatureId: this.activeTowerFeatureId ?? void 0,
        questLog: this.questLog.toData(),
        flags: this.flags,
        kills: this.kills,
        npcDialogs: this.npcDialogs,
        rests: this.rests
      };
    }
    async save(slot) {
      await this.saveManager.ensureDir();
      await this.saveManager.save(slot, this.serializableState());
      this.bus.emit("save", { slot });
      return true;
    }
    async load(slot) {
      try {
        const data = await this.saveManager.load(slot);
        return _Game.fromSave(data, this.saveDir);
      } catch {
        return null;
      }
    }
    static async loadSlot(slot, saveDir) {
      const mgr = new SaveManager(saveDir ?? "./saves");
      try {
        const data = await mgr.load(slot);
        return _Game.fromSave(data, saveDir);
      } catch {
        return null;
      }
    }
    async listSaves() {
      return this.saveManager.list();
    }
    dungeonToData(dungeon) {
      return {
        id: dungeon.id,
        name: dungeon.name,
        depth: dungeon.depth,
        floor: dungeon.floor,
        width: dungeon.width,
        height: dungeon.height,
        grid: dungeon.grid,
        entry: dungeon.entry,
        exit: dungeon.exit,
        monsters: dungeon.monsters,
        chests: dungeon.chests,
        traps: dungeon.traps
      };
    }
    dataToDungeon(data) {
      return { ...data, floor: data.floor ?? 1 };
    }
    findPathTo(x, y) {
      return this.currentMap().findPath(this.position, { x, y });
    }
    renderMap(showAll = false) {
      return this.currentMap().render(this.position, !showAll);
    }
  };

  // dist/blueprint/builder.js
  function createBlueprint(opts) {
    return {
      id: opts.id,
      name: opts.name,
      category: opts.category ?? "Blueprint",
      description: opts.description,
      variables: opts.variables ?? [],
      graphs: []
    };
  }
  function addEventGraph(bp, opts) {
    const graph = { id: opts.id, name: opts.name, kind: "event", entryNode: "", nodes: [], edges: [] };
    const entry = addNode(graph, opts.eventType, { id: "entry" });
    graph.entryNode = entry.id;
    bp.graphs.push(graph);
    return graph;
  }
  function addFunctionGraph(bp, opts) {
    const graph = { id: opts.id, name: opts.name, kind: "function", entryNode: "", params: opts.params, nodes: [], edges: [] };
    const entry = addNode(graph, "function.entry", { id: "entry" });
    graph.entryNode = entry.id;
    bp.graphs.push(graph);
    return graph;
  }
  function addNode(graph, type, opts = {}) {
    const def = nodeDef(type);
    if (!def)
      throw new Error(`Unknown blueprint node type "${type}"`);
    const id = opts.id ?? `n${graph.nodes.length + 1}`;
    if (graph.nodes.some((n2) => n2.id === id))
      throw new Error(`Duplicate node id "${id}" in graph "${graph.name}"`);
    const node = {
      id,
      type,
      x: opts.x ?? 0,
      y: opts.y ?? 0,
      metadata: opts.metadata ?? {},
      pins: []
    };
    if (opts.label)
      node.label = opts.label;
    node.pins = pinsForNode(def, node);
    graph.nodes.push(node);
    return node;
  }
  function addConst(graph, value, opts = {}) {
    return addNode(graph, "const", { metadata: { value }, id: opts.id, label: opts.label });
  }
  function connect(graph, fromNode, fromPin, toNode, toPin) {
    const fromId = typeof fromNode === "string" ? fromNode : fromNode.id;
    const toId = typeof toNode === "string" ? toNode : toNode.id;
    if (!graph.nodes.some((n2) => n2.id === fromId))
      throw new Error(`connect() references unknown node "${fromId}"`);
    if (!graph.nodes.some((n2) => n2.id === toId))
      throw new Error(`connect() references unknown node "${toId}"`);
    const edge = { id: `e${graph.edges.length + 1}`, fromNode: fromId, fromPin, toNode: toId, toPin };
    graph.edges.push(edge);
    return edge;
  }
  function addVarGet(graph, variable) {
    return addNode(graph, "var.get", { metadata: { variable } });
  }
  function addVarSet(graph, variable) {
    return addNode(graph, "var.set", { metadata: { variable } });
  }
  function addNodeWithPin(graph, type, pinValues) {
    const node = addNode(graph, type);
    for (const [name, value] of Object.entries(pinValues)) {
      const pin = node.pins.find((p) => p.name === name);
      if (pin && pin.direction === "input")
        pin.default = value;
    }
    return node;
  }

  // dist/blueprint/renderer.js
  var Canvas = class {
    rows = [];
    ensure(y, len) {
      while (this.rows.length <= y)
        this.rows.push("");
      if (this.rows[y].length < len)
        this.rows[y] = this.rows[y].padEnd(len, " ");
    }
    set(x, y, ch) {
      this.ensure(y, x + 1);
      const row = this.rows[y];
      this.rows[y] = row.slice(0, x) + ch + row.slice(x + 1);
    }
    hline(x0, x1, y, ch = "\u2500") {
      const [a, b] = x0 <= x1 ? [x0, x1] : [x1, x0];
      for (let x = a; x <= b; x++)
        this.set(x, y, ch);
    }
    vline(y0, y1, x, ch = "\u2502") {
      const [a, b] = y0 <= y1 ? [y0, y1] : [y1, y0];
      for (let y = a; y <= b; y++)
        this.set(x, y, ch);
    }
    text(x, y, s) {
      for (let i = 0; i < s.length; i++)
        this.set(x + i, y, s[i]);
    }
    toString() {
      return this.rows.join("\n");
    }
  };
  var stripPinName = (name) => name;
  function titleOf(node) {
    if (node.label)
      return node.label;
    const def = nodeDef(node.type);
    return def ? def.title : node.type;
  }
  function nodeBox(graph, node) {
    const inputs = node.pins.filter((p) => p.direction === "input");
    const outputs = node.pins.filter((p) => p.direction === "output");
    const title = titleOf(node);
    const leftWidth = Math.max(title.length, ...inputs.map((p) => (p.type === "exec" ? `> ${stripPinName(p.name)}` : `in: ${stripPinName(p.name)}`).length), 1);
    const rightWidth = Math.max(...outputs.map((p) => (p.type === "exec" ? `${stripPinName(p.name)} >` : `out: ${stripPinName(p.name)}`).length), 1);
    const inner = Math.max(leftWidth, rightWidth);
    const w = inner + 4;
    const rows = Math.max(inputs.length, outputs.length);
    const h = rows > 0 ? rows + 2 : 3;
    const leftY = /* @__PURE__ */ new Map();
    const rightY = /* @__PURE__ */ new Map();
    for (let i = 0; i < rows; i++) {
      if (inputs[i])
        leftY.set(inputs[i].name, 1 + i);
      if (outputs[i])
        rightY.set(outputs[i].name, 1 + i);
    }
    return { node, x: 0, y: 0, w, h, pinY: leftY, rightY, leftY };
  }
  function drawBox(canvas, box) {
    const { node, x, y, w, h } = box;
    const title = titleOf(node);
    const inputs = node.pins.filter((p) => p.direction === "input");
    const outputs = node.pins.filter((p) => p.direction === "output");
    const rows = Math.max(inputs.length, outputs.length);
    canvas.text(x, y, `\u250C\u2500 ${title}${"\u2500".repeat(Math.max(0, w - title.length - 4))}\u2510`);
    if (rows === 0) {
      canvas.set(x, y + 1, "\u2502");
      canvas.set(x + w - 1, y + 1, "\u2502");
      canvas.text(x, y + 2, `\u2514${"\u2500".repeat(w - 2)}\u2518`);
      return;
    }
    for (let i = 0; i < rows; i++) {
      const ry = y + 1 + i;
      canvas.set(x, ry, "\u2502");
      canvas.set(x + w - 1, ry, "\u2502");
      const input = inputs[i];
      if (input) {
        const label = input.type === "exec" ? `> ${stripPinName(input.name)}` : `in: ${stripPinName(input.name)}`;
        canvas.text(x + 1, ry, label);
      }
      const output = outputs[i];
      if (output) {
        const label = output.type === "exec" ? `${stripPinName(output.name)} >` : `out: ${stripPinName(output.name)}`;
        canvas.text(x + w - 1 - label.length, ry, label);
      }
    }
    canvas.text(x, y + rows + 1, `\u2514${"\u2500".repeat(w - 2)}\u2518`);
  }
  function renderGraph(graph) {
    const levels = assignLevels(graph);
    const boxes = layoutBoxes(graph, levels);
    const canvas = new Canvas();
    for (const box of boxes)
      drawBox(canvas, box);
    drawEdges(canvas, boxes, graph);
    return canvas.toString();
  }
  function renderBlueprint(bp) {
    const parts = [];
    parts.push(`Blueprint: ${bp.name} (${bp.category})${bp.description ? ` \u2014 ${bp.description}` : ""}`);
    if (bp.variables.length > 0) {
      parts.push("Variables:");
      for (const v of bp.variables)
        parts.push(`  ${v.name}: ${v.type} = ${JSON.stringify(v.value)}`);
    }
    for (const graph of bp.graphs) {
      parts.push("");
      parts.push(`\u2500\u2500 Graph: ${graph.name} [${graph.kind}]${graph.kind === "function" && graph.params ? ` params: ${graph.params.map((p) => p.name).join(", ")}` : ""} \u2500\u2500`);
      parts.push(renderGraph(graph));
    }
    return parts.join("\n");
  }
  function assignLevels(graph) {
    const level = /* @__PURE__ */ new Map();
    const isExecEdge = (n2, pin) => {
      const node = graph.nodes.find((x) => x.id === n2);
      return !!node?.pins.find((p) => p.name === pin && p.type === "exec");
    };
    const entry = graph.nodes.find((n2) => n2.id === graph.entryNode);
    if (entry)
      level.set(entry.id, 0);
    let changed = true;
    while (changed) {
      changed = false;
      for (const edge of graph.edges) {
        if (!level.has(edge.fromNode))
          continue;
        if (isExecEdge(edge.fromNode, edge.fromPin)) {
          const nl = (level.get(edge.fromNode) ?? 0) + 1;
          if (!level.has(edge.toNode) || level.get(edge.toNode) > nl) {
            level.set(edge.toNode, nl);
            changed = true;
          }
        }
      }
    }
    changed = true;
    while (changed) {
      changed = false;
      for (const edge of graph.edges) {
        if (!level.has(edge.fromNode))
          continue;
        if (level.has(edge.toNode))
          continue;
        level.set(edge.toNode, (level.get(edge.fromNode) ?? 0) + 1);
        changed = true;
      }
    }
    let max = 0;
    for (const [, lv] of level)
      max = Math.max(max, lv);
    for (const node of graph.nodes) {
      if (!level.has(node.id))
        level.set(node.id, max + 1);
    }
    return level;
  }
  function layoutBoxes(graph, levels) {
    const grouped = /* @__PURE__ */ new Map();
    for (const node of graph.nodes) {
      const lv = levels.get(node.id) ?? 0;
      if (!grouped.has(lv))
        grouped.set(lv, []);
      grouped.get(lv).push(node);
    }
    const colIndex = [...grouped.keys()].sort((a, b) => a - b);
    const boxes = [];
    let x = 0;
    for (const col of colIndex) {
      const nodes = grouped.get(col);
      let colMaxW = 0;
      const colBoxes = nodes.map((n2) => {
        const b = nodeBox(graph, n2);
        colMaxW = Math.max(colMaxW, b.w);
        return b;
      });
      const colW = colMaxW + 6;
      let y = 0;
      for (const b of colBoxes) {
        b.x = x + 1;
        b.y = y;
        b.w = colMaxW;
        y += b.h + 2;
      }
      x += colW;
      boxes.push(...colBoxes);
    }
    return boxes;
  }
  function drawEdges(canvas, boxes, graph) {
    const byId = new Map(boxes.map((b) => [b.node.id, b]));
    const maxX = Math.max(...boxes.map((b) => b.x + b.w)) + 2;
    for (const edge of graph.edges) {
      const from = byId.get(edge.fromNode);
      const to = byId.get(edge.toNode);
      if (!from || !to)
        continue;
      const sx = from.x + from.w;
      const sy = from.rightY.get(edge.fromPin) ?? from.y + 2;
      const tx = to.x - 1;
      const ty = to.leftY.get(edge.toPin) ?? to.y + 2;
      if (tx >= sx) {
        const gx = sx + 1;
        canvas.set(sx, sy, ">");
        canvas.hline(sx, gx, sy);
        canvas.vline(sy, ty, gx);
        canvas.hline(gx, tx, ty);
        canvas.set(tx, ty, "<");
      } else {
        const gx = maxX;
        canvas.set(sx, sy, ">");
        canvas.hline(sx, gx, sy);
        canvas.vline(sy, ty, gx);
        canvas.hline(gx, tx, ty);
        canvas.set(tx, ty, "<");
      }
    }
  }
  return __toCommonJS(index_exports);
})();
globalThis.RPGEngine = RPGEngine;

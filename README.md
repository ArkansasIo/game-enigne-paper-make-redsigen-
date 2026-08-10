# RPG Paper Maker — D&D 5e Redesign

A game making engine, free for non-commercial use, letting you create 3D universes with 2D sprites and 3D objects through a simple interface for Web browser, Windows, Linux, and MacOS.

This fork adds a **Dungeons & Dragons 5th Edition rules system** built as a first-class plugin.

- **Core engine**: React, TypeScript, three.js, Howler.js, Electron.js
- **D&D 5e plugin**: d20 rules engine, ability scores, skills, saving throws, combat, spells, conditions, character sheets, and SRD content (OGL 1.0a)

## ✨ Features

### Engine
- Full 3D map editor with 2D sprite and 3D object support
- Real-time game preview (web and desktop)
- Event/reaction scripting system with plugin commands
- Cross-platform: Windows, Linux, macOS, Web
- Data-driven project format (`.rpmg`), JSON based

### D&D 5e plugin (`plugins/DnD5e/`)
- Complete rules engine: d20 rolls, advantage/disadvantage, ability modifiers, proficiency, skills, saving throws, spell save DCs
- Combat system: initiative, action economy, attack rolls, damage by type, hit dice, death saves, conditions
- Character model: races, classes & levels, backgrounds, feats, spell slots, inventory, equipment, XP
- Spells, monsters, equipment, backgrounds, feats, and conditions data (System Reference Document 5.1)
- In-game character sheet and combat tracker UI
- Plugin commands usable from events in the editor

## :open_file_folder: Project organization

The [RPG-Paper-Maker organization](https://github.com/RPG-Paper-Maker) contains independent repositories. If you fork several, **put them all in the same parent folder root**.

- **RPG-Paper-Maker** (this repo) — the core Game Editor Software, written in TS/React. Manages all `.json` files related to a RPM game.
- [Game-Scripts](https://github.com/RPG-Paper-Maker/Game-Scripts) — game scripts used to actually play a game. TS, HTML/CSS, JSON, three.js, Howler.js, Electron.js.
- [Game-Scripts-Build](https://github.com/RPG-Paper-Maker/Game-Scripts-Build) — compiled JS build of Game-Scripts, usable in a browser and editable at runtime.
- [Basic-Ressources](https://github.com/RPG-Paper-Maker/Basic-Ressources) — basic assets users can use in projects (pictures, musics…).
- [Dependencies](https://github.com/RPG-Paper-Maker/Dependencies) — dynamic libraries and binaries needed for standalone games and the engine.
- [Updater](https://github.com/RPG-Paper-Maker/Updater) — updater that installs and checks for RPG Paper Maker updates.
- [PaperMaker-Haxe](https://github.com/RPG-Paper-Maker/PaperMaker-Haxe) — (may be deprecated) Haxe version of game scripts.

## How to build the project

### Pre-requirements

- [Node.js](https://nodejs.org/en)
- IDE: [Visual Studio Code](https://code.visualstudio.com/) recommended, with the ESLint extension. Optional Prettier format-on-save:

```json
{
    "editor.formatOnSave": true,
    "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
    "[typescriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
    "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
    "[json]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
    "editor.codeActionsOnSave": { "source.organizeImports": "explicit" }
}
```

- Windows users: [Git for Windows](https://gitforwindows.org/) is recommended (Git Bash works best for the shell scripts).

### Clone and install

```bash
git clone https://github.com/ArkansasIo/game-enigne-paper-make-redsigen-.git
cd game-enigne-paper-make-redsigen-
npm install
```

### Update and run

Update the modules (downloads the other independent repos data needed for the engine: default assets, game scripts, shaders…):

```bash
npm run update-mods
```

Run the project (web):

```bash
npm start
```

Open [http://localhost:3000/](http://localhost:3000/).

### Build and run the desktop (Electron) version

```bash
npm run build-electron
```

Then run the app:

```bash
npm run electron
```

> On Windows, if `npm` is blocked by the PowerShell execution policy, use `npm.cmd` instead.

## :game_die: Using the D&D 5e plugin

The plugin lives in `plugins/DnD5e/`:

```
plugins/DnD5e/
├── details.json      Plugin metadata, parameters and editor commands
├── code.js           Plugin entry point (registers the system + commands)
├── engine/           Rules, dice, creature, combat, spells, leveling, SRD loader
├── data/             SRD 5.1 content (races, classes, spells, monsters, equipment…)
└── ui/               Character sheet and combat tracker overlays
```

To add it to a project from the editor: open **Tools → Plugins**, find **DnD5e** (category *Battle*), and enable it. Regenerate the plugin manifest after changes:

```bash
npm run generate-plugins-manifest
```

Plugin commands (callable from events):
- Roll ability/skill checks and saving throws
- Start / end combat and manage the initiative order
- Deal damage, heal, apply conditions
- Cast spells (expends spell slots)
- Short / long rests (restore hit points, hit dice, and spell slots)
- Level up and open the character sheet

## :construction_worker: Contributing

Thank you for considering contributing! See the [Contributing Guide](.github/CONTRIBUTING.md).

### :innocent: Code of Conduct

Please review and abide by the [Code of Conduct](.github/CODE_OF_CONDUCT.md).

## :scroll: License

The RPG Paper Maker engine is under a proprietary license. This source code is copyrighted; use the Commercial edition for commercial use of your games. See the [RPG Paper Maker EULA](http://rpg-paper-maker.com/index.php/eula).

The D&D 5e plugin mechanics and SRD content are distributed under the **Open Game License v1.0a** (SRD 5.1). Wizards of the Coast and D&D are trademarks of their respective owners.

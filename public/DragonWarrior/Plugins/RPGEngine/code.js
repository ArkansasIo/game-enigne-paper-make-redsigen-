const pluginName = 'RPGEngine';

let engine = null;
let currentGame = null;
let lastLog = [];
let lastDialog = null;

const savePrefix = Manager.Plugins.getParameter(pluginName, 'Save prefix') || 'rpg-engine';
const logToConsole = Manager.Plugins.getParameter(pluginName, 'Log to console') !== false;

(async () => {
	try {
		const code = await Common.Platform.loadFile(Common.Paths.PLUGINS + pluginName + '/engine/rpg-engine.js');
		Common.Interpreter.evaluate(code, { addReturn: false });
		engine = globalThis.RPGEngine || (typeof RPGEngine !== 'undefined' ? RPGEngine : null);
		if (engine) {
			log('Engine loaded (' + Object.keys(engine).length + ' exports).');
		} else {
			log('Failed to load RPGEngine bundle.');
		}
	} catch (e) {
		log('Engine load error: ' + (e && e.message ? e.message : e));
	}
})();

function log(text) {
	lastLog.push(String(text));
	if (lastLog.length > 100) lastLog.shift();
	if (logToConsole) console.log('[RPGEngine] ' + text);
}

function ensureEngine() {
	if (!engine) throw new Error('RPGEngine bundle not loaded yet. Call a command after the map loads.');
}

function ensureGame() {
	ensureEngine();
	if (!currentGame) throw new Error('No active RPGEngine game. Run "New game" first.');
	return currentGame;
}

function setVariable(varId, value) {
	try {
		if (typeof Core !== 'undefined' && Core.Game && Core.Game.current && Core.Game.current.variables) {
			Core.Game.current.variables.set(varId, value);
			return;
		}
	} catch (e) {
		// fall through to plugin-local storage
	}
	lastLog.push('Variable ' + varId + ' = ' + value);
	if (logToConsole) console.log('[RPGEngine] Variable ' + varId + ' = ' + value);
}

function attachBus(game) {
	game.bus.on('message', (p) => log(p.text));
	game.bus.on('battle-log', (p) => log('  ' + p.text));
	game.bus.on('battle-end', (p) => {
		const r = p && p.result;
		if (r) log('Battle over. victory=' + r.victory + ' xp=' + r.xpEarned + ' gold=' + r.goldEarned);
	});
}

function featureByKind(kind, index) {
	const game = ensureGame();
	const list = game.features.filter((f) => f.kind === kind);
	if (list.length === 0) throw new Error('No ' + kind + ' feature in this world.');
	return list[Math.max(0, Math.min(index || 0, list.length - 1))];
}

Manager.Plugins.registerCommand(pluginName, 'New game', (seed, playerName, classId, mode) => {
	ensureEngine();
	const opts = {
		seed: seed && seed >= 0 ? seed : undefined,
		playerName: playerName || 'Hero',
		classId: classId || 'warrior',
		saveDir: './saves',
		mode: mode === 'dw' ? 'dw' : 'classic',
	};
	try {
		currentGame = engine.Game.newGame(opts);
		attachBus(currentGame);
		lastDialog = null;
		log('New game created: ' + currentGame.player.name + ' (' + currentGame.mode + ' mode), Level ' + currentGame.player.level + '.');
	} catch (e) {
		log('New game error: ' + (e && e.message ? e.message : e));
	}
});

Manager.Plugins.registerCommand(pluginName, 'Start Dragon Warrior', (playerName, seed) => {
	ensureEngine();
	try {
		currentGame = engine.Game.newGame({
			seed: seed && seed >= 0 ? seed : undefined,
			playerName: playerName || 'Erdrick',
			classId: 'dw-hero',
			saveDir: './saves',
			mode: 'dw',
		});
		attachBus(currentGame);
		lastDialog = null;
		log('Dragon Warrior started in Alefgard: ' + currentGame.player.name + ', heir of Erdrick.');
	} catch (e) {
		log('Dragon Warrior start error: ' + (e && e.message ? e.message : e));
	}
});

Manager.Plugins.registerCommand(pluginName, 'Load game', async (slot) => {
	ensureEngine();
	try {
		const saved = await engine.Game.loadSlot(slot, './saves');
		if (saved) {
			currentGame = saved;
			attachBus(currentGame);
			lastDialog = null;
			log('Game loaded from slot "' + slot + '": ' + currentGame.player.name + ', Level ' + currentGame.player.level + '.');
		} else {
			log('No save found in slot "' + slot + '".');
		}
	} catch (e) {
		log('Load error: ' + (e && e.message ? e.message : e));
	}
});

Manager.Plugins.registerCommand(pluginName, 'Save game', async (slot) => {
	try {
		ensureGame();
		await currentGame.save(slot);
		log('Game saved to slot "' + slot + '".');
	} catch (e) {
		log('Save error: ' + (e && e.message ? e.message : e));
	}
});

Manager.Plugins.registerCommand(pluginName, 'Delete slot', async (slot) => {
	ensureEngine();
	try {
		const done = await new engine.SaveManager('./saves').remove(slot);
		log(done ? 'Slot "' + slot + '" deleted.' : 'No save in slot "' + slot + '".');
	} catch (e) {
		log('Delete error: ' + (e && e.message ? e.message : e));
	}
});

Manager.Plugins.registerCommand(pluginName, 'Slot exists?', async (slot, variable) => {
	ensureEngine();
	let exists = false;
	try {
		const mgr = new engine.SaveManager('./saves');
		exists = await mgr.exists(slot);
	} catch (e) {
		exists = false;
	}
	setVariable(variable, exists ? 1 : 0);
});

Manager.Plugins.registerCommand(pluginName, 'Move', (direction) => {
	const game = ensureGame();
	const dir = String(direction || 'north').toLowerCase();
	const result = game.move(dir);
	if (!result.moved) {
		log('Move ' + dir + ' blocked: ' + (result.reason || 'wall'));
		return;
	}
	let msg = 'Moved ' + dir + ' to (' + result.x + ', ' + result.y + ').';
	if (result.trapDamage > 0) msg += ' Trap! -' + result.trapDamage + ' HP.';
	log(msg);
	if (result.encounter && result.encounter.length > 0) {
		log('Encounter! Resolving battle automatically.');
		const battle = game.runBattle(result.encounter);
		if (battle) log('Battle: victory=' + battle.victory + ' xp=' + battle.xpEarned + ' gold=' + battle.goldEarned);
	}
});

Manager.Plugins.registerCommand(pluginName, 'Position to variables', (xVar, yVar) => {
	const game = ensureGame();
	setVariable(xVar, game.position.x);
	setVariable(yVar, game.position.y);
});

Manager.Plugins.registerCommand(pluginName, 'Enter dungeon', (dungeonIndex) => {
	const game = ensureGame();
	try {
		const feature = featureByKind('dungeon', dungeonIndex);
		const result = game.enterDungeon(feature);
		log(result && result.message ? result.message : 'Entered dungeon.');
	} catch (e) {
		log('Enter dungeon error: ' + (e && e.message ? e.message : e));
	}
});

Manager.Plugins.registerCommand(pluginName, 'Enter tower', () => {
	const game = ensureGame();
	try {
		const feature = featureByKind('tower', 0);
		const result = game.enterTower(feature);
		log(result && result.message ? result.message : 'Entered tower.');
	} catch (e) {
		log('Enter tower error: ' + (e && e.message ? e.message : e));
	}
});

Manager.Plugins.registerCommand(pluginName, 'Descend stairs', () => {
	const game = ensureGame();
	const result = game.descend();
	log(result && result.message ? result.message : 'No stairs.');
});

Manager.Plugins.registerCommand(pluginName, 'Ascend stairs', () => {
	const game = ensureGame();
	const result = game.ascend();
	log(result && result.message ? result.message : 'No stairs.');
});

Manager.Plugins.registerCommand(pluginName, 'Tower next floor', () => {
	const game = ensureGame();
	const result = game.towerNext();
	log(result && result.message ? result.message : 'Cannot climb.');
});

Manager.Plugins.registerCommand(pluginName, 'Tower prev floor', () => {
	const game = ensureGame();
	const result = game.towerPrev();
	log(result && result.message ? result.message : 'Cannot descend.');
});

Manager.Plugins.registerCommand(pluginName, 'Interact', () => {
	const game = ensureGame();
	const result = game.interact();
	if (result.kind === 'chest' && result.looted) {
		log('Looted chest: ' + result.looted.gold + ' gold, ' + result.looted.items.map((i) => i.count + 'x ' + i.id).join(', ') + '.');
	} else if (result.kind === 'town' && result.npcs) {
		log('In town. NPCs: ' + result.npcs.join(', ') + '.');
	} else if (result.message) {
		log(result.message);
	} else {
		log('Nothing to interact with here.');
	}
});

Manager.Plugins.registerCommand(pluginName, 'Generate world', (seed, townCount, dungeonCount, towerCount, shrineCount) => {
	ensureEngine();
	const result = engine.generateOverworld({
		size: 48,
		seed: seed && seed >= 0 ? seed : Math.floor(Math.random() * 2147483647),
		townCount: Math.max(0, townCount || 3),
		dungeonCount: Math.max(0, dungeonCount || 3),
		towerCount: Math.max(0, towerCount || 1),
		shrineCount: Math.max(0, shrineCount || 2),
	});
	if (currentGame) {
		currentGame.world = new engine.WorldMap(result.grid);
		currentGame.features = result.features;
		currentGame.position = { ...result.spawn };
		currentGame.inDungeon = false;
		currentGame.inTower = false;
		currentGame.dungeon = null;
	}
	log('Generated world: ' + result.grid.length + 'x' + result.grid[0].length + ', ' + result.features.length + ' features.');
});

Manager.Plugins.registerCommand(pluginName, 'Run battle', (enemies, victoryVar, xpVar, goldVar) => {
	const game = ensureGame();
	const ids = String(enemies || 'rat')
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
	if (ids.length === 0) {
		log('Run battle: no enemy ids given.');
		return;
	}
	const result = game.runBattle(ids);
	if (!result) {
		log('Run battle: could not start battle.');
		return;
	}
	setVariable(victoryVar, result.victory ? 1 : 0);
	setVariable(xpVar, result.xpEarned);
	setVariable(goldVar, result.goldEarned);
	log('Battle result: victory=' + result.victory + ' xp=' + result.xpEarned + ' gold=' + result.goldEarned);
});

Manager.Plugins.registerCommand(pluginName, 'Add XP', (amount) => {
	const game = ensureGame();
	const levels = game.addXpToPlayer(Math.max(0, amount || 0));
	log('Gained ' + (amount || 0) + ' XP. Level ' + game.player.level + ' (' + levels + ' level-up' + (levels === 1 ? '' : 's') + ').');
});

Manager.Plugins.registerCommand(pluginName, 'Learn skill', (skillId) => {
	const game = ensureGame();
	const ok = game.learnPlayerSkill(String(skillId));
	log(ok ? 'Learned skill ' + skillId + '.' : 'Could not learn skill ' + skillId + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Spend stat point', (stat) => {
	const game = ensureGame();
	const ok = game.spendStatPoint(String(stat));
	log(ok ? 'Spent a point in ' + stat + '.' : 'No stat points to spend.');
});

Manager.Plugins.registerCommand(
	pluginName,
	'Status to variables',
	(hpVar, maxHpVar, mpVar, maxMpVar, levelVar, goldVar, xpVar, statPointsVar) => {
		const game = ensureGame();
		setVariable(hpVar, game.player.hp);
		setVariable(maxHpVar, game.player.derived.maxHp);
		setVariable(mpVar, game.player.mp);
		setVariable(maxMpVar, game.player.derived.maxMp);
		setVariable(levelVar, game.player.level);
		setVariable(goldVar, game.player.gold);
		setVariable(xpVar, game.player.xp);
		setVariable(statPointsVar, game.player.statPoints);
	}
);

Manager.Plugins.registerCommand(pluginName, 'Give item', (itemId, count) => {
	const game = ensureGame();
	const n = Math.max(0, count || 1);
	game.giveItem(String(itemId), n);
	log('Gave ' + n + 'x ' + itemId + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Remove item', (itemId, count) => {
	const game = ensureGame();
	const inv = new engine.Inventory(game.player.inventory);
	const n = Math.max(0, count || 1);
	let removed = 0;
	for (const stack of inv.items.filter((i) => i.id === itemId)) {
		const take = Math.min(stack.count, n - removed);
		inv.removeByUid(stack.uid, take);
		removed += take;
		if (removed >= n) break;
	}
	log('Removed ' + removed + 'x ' + itemId + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Use item', (itemId) => {
	const game = ensureGame();
	const ok = game.useItem(String(itemId));
	log(ok ? 'Used ' + itemId + '.' : 'Could not use ' + itemId + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Item count to variable', (itemId, variable) => {
	const game = ensureGame();
	setVariable(variable, game.itemCount(String(itemId)));
});

Manager.Plugins.registerCommand(pluginName, 'Craft', (recipeId, station) => {
	const game = ensureGame();
	const ok = game.craft(String(recipeId), String(station || 'forge'));
	log(ok ? 'Crafted ' + recipeId + ' at ' + (station || 'forge') + '.' : 'Could not craft ' + recipeId + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Equip item', (itemId) => {
	const game = ensureGame();
	const inv = new engine.Inventory(game.player.inventory);
	const stack = inv.items.find((i) => i.id === itemId);
	if (!stack) {
		log('Equip failed: no ' + itemId + ' in inventory.');
		return;
	}
	const ok = game.equip(stack.uid);
	log(ok ? 'Equipped ' + itemId + '.' : 'Could not equip ' + itemId + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Unequip', (slot) => {
	const game = ensureGame();
	const ok = game.unequip(String(slot));
	log(ok ? 'Unequipped ' + slot + '.' : 'Nothing equipped in ' + slot + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Buy', (itemId, npcId) => {
	const game = ensureGame();
	const ok = game.buy(String(itemId), String(npcId));
	log(ok ? 'Bought ' + itemId + ' from ' + npcId + '.' : 'Could not buy ' + itemId + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Sell', (itemId, count) => {
	const game = ensureGame();
	const inv = new engine.Inventory(game.player.inventory);
	const n = Math.max(0, count || 1);
	let sold = 0;
	for (const stack of inv.items.filter((i) => i.id === itemId)) {
		if (sold >= n) break;
		const ok = game.sell(stack.uid);
		if (ok) sold += 1;
	}
	log('Sold ' + sold + 'x ' + itemId + '. Gold: ' + game.player.gold + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Start quest', (questId) => {
	const game = ensureGame();
	const ok = game.startQuest(String(questId));
	log(ok ? 'Started quest ' + questId + '.' : 'Could not start quest ' + questId + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Complete quest', (questId) => {
	const game = ensureGame();
	const ok = game.completeQuest(String(questId));
	log(ok ? 'Completed quest ' + questId + '.' : 'Could not complete quest ' + questId + '.');
});

Manager.Plugins.registerCommand(pluginName, 'Quest active?', (questId, variable) => {
	const game = ensureGame();
	setVariable(variable, game.questActive(String(questId)) ? 1 : 0);
});

Manager.Plugins.registerCommand(pluginName, 'Quest completed?', (questId, variable) => {
	const game = ensureGame();
	setVariable(variable, game.questCompleted(String(questId)) ? 1 : 0);
});

Manager.Plugins.registerCommand(pluginName, 'Talk to NPC', (npcId) => {
	const game = ensureGame();
	lastDialog = game.talk(String(npcId));
	if (!lastDialog) {
		log('Talk failed: unknown NPC ' + npcId + '.');
		return;
	}
	log(lastDialog.npcName + ': ' + lastDialog.text);
});

Manager.Plugins.registerCommand(pluginName, 'Choose dialog option', (optionIndex) => {
	const game = ensureGame();
	const view = game.chooseDialog(Math.max(0, optionIndex || 0));
	lastDialog = view;
	log('Dialog: ' + view.text);
});

Manager.Plugins.registerCommand(pluginName, 'Close dialog', () => {
	const game = ensureGame();
	game.closeDialog();
	lastDialog = null;
	log('Dialog closed.');
});

Manager.Plugins.registerCommand(pluginName, 'Dialog text to variable', (variable) => {
	const game = ensureGame();
	const view = game.currentDialogView();
	setVariable(variable, view ? view.text : '');
});

Manager.Plugins.registerCommand(pluginName, 'Last message to variable', (variable) => {
	setVariable(variable, lastLog.length > 0 ? lastLog[lastLog.length - 1] : '');
});

Manager.Plugins.registerCommand(pluginName, 'Run trial', (trialId, successVar) => {
	const game = ensureGame();
	const result = game.runTrial(String(trialId));
	if (!result) return;
	setVariable(successVar, result.success ? 1 : 0);
	log('Trial result: success=' + result.success + ' message=' + result.message);
});

Manager.Plugins.registerCommand(pluginName, 'Run raid', (raidId, successVar) => {
	const game = ensureGame();
	const result = game.runRaid(String(raidId));
	if (!result) return;
	setVariable(successVar, result.success ? 1 : 0);
	log('Raid result: success=' + result.success + ' message=' + result.message);
});

/*
    Andromeda RPG Paper Maker (fork)
    AI assistant settings: stored in a local settings file (outside the
    project) via the Electron main process, so API keys are never embedded
    into game projects.
*/

export type AISettings = {
	baseUrl: string;
	apiKey: string;
	model: string;
	systemPrompt: string;
};

export const DEFAULT_AI_SETTINGS: AISettings = {
	baseUrl: 'https://api.openai.com/v1',
	apiKey: '',
	model: 'gpt-4o-mini',
	systemPrompt:
		'You are an assistant helping a game developer build RPG Paper Maker games. ' +
		'Answer concisely and give concrete, actionable advice.',
};

export const loadAISettings = async (): Promise<AISettings> => {
	try {
		const result = (await window.ipcRenderer.invoke('get-ai-settings')) as Partial<AISettings> | null;
		return { ...DEFAULT_AI_SETTINGS, ...(result ?? {}) };
	} catch {
		return { ...DEFAULT_AI_SETTINGS };
	}
};

export const saveAISettings = async (settings: AISettings): Promise<void> => {
	await window.ipcRenderer.invoke('save-ai-settings', settings);
};

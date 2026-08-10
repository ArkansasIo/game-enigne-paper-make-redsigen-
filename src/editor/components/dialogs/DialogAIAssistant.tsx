/*
    Andromeda RPG Paper Maker (fork)
    AI assistant dialog: a chat panel backed by an OpenAI-compatible API.
    Settings (base URL, API key, model) are stored in a local settings file.
*/

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BUTTON_TYPE } from '../../common';
import { AISettings, loadAISettings, saveAISettings } from '../../core/AISettings';
import Button from '../Button';
import Flex from '../Flex';
import InputText from '../InputText';
import Dialog from './Dialog';
import FooterOK from './footers/FooterOK';

type Props = {
	setIsOpen: (b: boolean) => void;
};

type Message = {
	role: 'user' | 'assistant';
	content: string;
};

const sendChatRequest = async (settings: AISettings, history: Message[]): Promise<string> => {
	const baseUrl = settings.baseUrl.trim().replace(/\/+$/, '');
	if (!baseUrl) {
		throw new Error('Please configure the API base URL in the settings panel.');
	}
	const url = `${baseUrl}/chat/completions`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(settings.apiKey ? { Authorization: `Bearer ${settings.apiKey.trim()}` } : {}),
		},
		body: JSON.stringify({
			model: settings.model.trim() || 'gpt-4o-mini',
			messages: [{ role: 'system', content: settings.systemPrompt }, ...history],
		}),
	});
	if (!response.ok) {
		const body = await response.text();
		throw new Error(`AI request failed (${response.status}): ${body.slice(0, 300)}`);
	}
	const data = await response.json();
	const content = data?.choices?.[0]?.message?.content;
	if (typeof content !== 'string') {
		throw new Error('Unexpected response from the AI endpoint.');
	}
	return content;
};

function DialogAIAssistant({ setIsOpen }: Props) {
	const { t } = useTranslation();

	const [settings, setSettings] = useState<AISettings>({
		baseUrl: '',
		apiKey: '',
		model: '',
		systemPrompt: '',
	});
	const [settingsStatus, setSettingsStatus] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState('');
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		loadAISettings()
			.then(setSettings)
			.catch(console.error);
	}, []);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages, isSending]);

	const handleClose = async () => {
		setIsOpen(false);
	};

	const handleSaveSettings = async () => {
		await saveAISettings(settings);
		setSettingsStatus('Settings saved.');
	};

	const handleSend = async () => {
		const text = input.trim();
		if (!text || isSending) {
			return;
		}
		const userMessage: Message = { role: 'user', content: text };
		const history = [...messages, userMessage];
		setMessages(history);
		setInput('');
		setIsSending(true);
		setError('');
		try {
			const reply = await sendChatRequest(settings, history);
			setMessages([...history, { role: 'assistant', content: reply }]);
		} catch (e) {
			setError(e instanceof Error ? e.message : String(e));
		} finally {
			setIsSending(false);
		}
	};

	return (
		<Dialog
			isOpen
			title={`${t('ai.assistant')}`}
			footer={<FooterOK onOK={handleClose} />}
			onClose={handleClose}
			initialWidth='900px'
			initialHeight='600px'
		>
			<Flex spaced fillWidth fillHeight>
				<Flex column spaced fillWidth style={{ flexBasis: 300, maxWidth: 320 }}>
					<div style={{ fontWeight: 'bold' }}>AI settings</div>
					<div>
						<div>API base URL</div>
						<InputText
							value={settings.baseUrl}
							onChange={(baseUrl) => setSettings({ ...settings, baseUrl })}
							widthType={2}
						/>
					</div>
					<div>
						<div>API key</div>
						<InputText
							value={settings.apiKey}
							onChange={(apiKey) => setSettings({ ...settings, apiKey })}
							widthType={2}
						/>
					</div>
					<div>
						<div>Model</div>
						<InputText
							value={settings.model}
							onChange={(model) => setSettings({ ...settings, model })}
							widthType={2}
						/>
					</div>
					<div>
						<div>System prompt</div>
						<textarea
							value={settings.systemPrompt}
							onChange={(e) => setSettings({ ...settings, systemPrompt: e.target.value })}
							rows={5}
							style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit' }}
						/>
					</div>
					<Flex spaced>
						<Button buttonType={BUTTON_TYPE.PRIMARY} onClick={handleSaveSettings}>
							Save settings
						</Button>
						<Button onClick={() => setMessages([])}>New conversation</Button>
					</Flex>
					{settingsStatus && <div style={{ fontSize: 11, opacity: 0.8 }}>{settingsStatus}</div>}
					<div style={{ fontSize: 11, opacity: 0.7 }}>
						Stored locally on this computer, never inside your project.
					</div>
				</Flex>
				<Flex
					column
					fillWidth
					fillHeight
					spaced
					style={{
						border: '1px solid var(--lighter-bg-color)',
						borderRadius: 4,
						background: 'var(--darkest-bg-color)',
						padding: 8,
					}}
				>
					<div
						style={{
							flex: 1,
							overflowY: 'auto',
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
							minHeight: 200,
						}}
					>
						{messages.length === 0 && (
							<div style={{ opacity: 0.7, fontStyle: 'italic' }}>Ask anything about your game project...</div>
						)}
						{messages.map((message, index) => (
							<div
								key={index}
								style={{
									alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
									maxWidth: '85%',
									padding: '6px 10px',
									borderRadius: 8,
									background:
										message.role === 'user' ? 'var(--primary-dark-color)' : 'var(--darker-bg-color)',
									whiteSpace: 'pre-wrap',
								}}
							>
								{message.content}
							</div>
						))}
						{isSending && (
							<div style={{ alignSelf: 'flex-start', opacity: 0.7, fontStyle: 'italic' }}>Thinking...</div>
						)}
						{error && <div style={{ alignSelf: 'flex-start', color: 'var(--red-color)' }}>{error}</div>}
						<div ref={bottomRef} />
					</div>
					<Flex spaced>
						<textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									handleSend().catch(console.error);
								}
							}}
							rows={3}
							placeholder='Type a message...'
							style={{
								flex: 1,
								resize: 'none',
								fontFamily: 'inherit',
								fontSize: 'inherit',
								background: 'var(--darker-bg-color)',
								color: 'var(--main-color)',
								border: '1px solid var(--lighter-bg-color)',
								borderRadius: 4,
								padding: 6,
							}}
						/>
						<Button buttonType={BUTTON_TYPE.PRIMARY} disabled={isSending} onClick={handleSend}>
							Send
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Dialog>
	);
}

export default DialogAIAssistant;

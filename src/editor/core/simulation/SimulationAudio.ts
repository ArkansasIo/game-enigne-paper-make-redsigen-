import type { Howl } from 'howler';
import { SONG_KIND } from '../../common';

const loopingChannels = new Map<SONG_KIND, Howl>();
const soundChannels = new Map<number, Set<Howl>>();

const clampVolume = (volume: number) => Math.max(0, Math.min(1, volume / 100));

export const playLoopingAudio = (kind: SONG_KIND, howl: Howl, volume: number, start: number, end: number) => {
	const previous = loopingChannels.get(kind);
	previous?.stop();
	previous?.unload();
	loopingChannels.set(kind, howl);
	howl.volume(clampVolume(volume));
	howl.loop(end <= start);
	howl.on('end', () => {
		if (loopingChannels.get(kind) !== howl || end <= start) return;
		howl.seek(start);
		howl.play();
	});
	if (start > 0) howl.seek(start);
	howl.play();
};

export const playSoundEffect = (songID: number, howl: Howl, volume: number) => {
	howl.volume(clampVolume(volume));
	const active = soundChannels.get(songID) ?? new Set<Howl>();
	active.add(howl);
	soundChannels.set(songID, active);
	const remove = () => {
		active.delete(howl);
		if (active.size === 0) soundChannels.delete(songID);
		howl.unload();
	};
	howl.once('end', remove);
	howl.once('stop', remove);
	howl.play();
};

const fadeOrStop = (howl: Howl, milliseconds: number) => {
	if (milliseconds <= 0) {
		howl.stop();
		return;
	}
	howl.fade(howl.volume(), 0, milliseconds);
	setTimeout(() => howl.stop(), milliseconds);
};

export const stopLoopingAudio = (kind: SONG_KIND, milliseconds: number) => {
	const howl = loopingChannels.get(kind);
	if (!howl) return;
	loopingChannels.delete(kind);
	fadeOrStop(howl, milliseconds);
	if (milliseconds <= 0) howl.unload();
	else setTimeout(() => howl.unload(), milliseconds);
};

export const stopSoundEffect = (songID: number, milliseconds: number) => {
	const active = soundChannels.get(songID);
	if (!active) return;
	for (const howl of active) fadeOrStop(howl, milliseconds);
};

export const stopAllAudio = (milliseconds: number) => {
	for (const kind of loopingChannels.keys()) stopLoopingAudio(kind, milliseconds);
	for (const songID of soundChannels.keys()) stopSoundEffect(songID, milliseconds);
};

/*
    RPG Paper Maker Copyright (C) 2017-2026 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/

import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paths } from '../../common';
import { openWebsite, readPublicFile } from '../../common/Platform';
import { Project } from '../../core/Project';
import Flex from '../Flex';
import Dialog from './Dialog';
import FooterOK from './footers/FooterOK';

type PatreonJSONType = {
	current: string;
	previous: string;
};

type Props = {
	setIsOpen: (b: boolean) => void;
};

function DialogAbout({ setIsOpen }: Props) {
	const { t } = useTranslation();

	const [isLoading, setIsLoading] = useState(true);
	const [patreons, setPatreons] = useState<PatreonJSONType>();

	const changelogsLink = 'https://github.com/RPG-Paper-Maker/RPG-Paper-Maker/tree/master/changelogs';
	const redesignGithubProfile = 'https://github.com/ArkansasIo';
	const redesignForkRepo = 'https://github.com/ArkansasIo/game-enigne-paper-make-redsigen-';

	const initialize = async () => {
		setPatreons(JSON.parse(await readPublicFile(Paths.FILE_PATREON)));
		setIsLoading(false);
	};

	const handleClose = async () => {
		setIsOpen(false);
	};

	useLayoutEffect(() => {
		initialize().catch(console.error);
	}, []);

	return (
		<Dialog
			isOpen
			title={`${t('about')}...`}
			footer={<FooterOK onOK={handleClose} />}
			onClose={handleClose}
			isLoading={isLoading}
			initialWidth='600px'
		>
			<Flex column spacedLarge fillWidth fillHeight>
				<div>
					Andromeda RPG Paper Maker {Project.VERSION}, changelogs:{' '}
					<a
						href=''
						onClick={async (e) => {
							e.preventDefault();
							await openWebsite(changelogsLink);
						}}
					>
						{changelogsLink}
					</a>
				</div>
			http://rpg-paper-maker.com/
			<div>{t('thanks.patreon')}:</div>
			{patreons?.current}
			<div
				style={{
					width: '100%',
					height: '1px',
					background: 'currentColor',
					opacity: 0.25,
					margin: '4px 0',
				}}
			/>
			<Flex column spaced>
				<div style={{ fontWeight: 'bold', fontSize: '1.05em' }}>Redesign by Stephen</div>
				<div>
					GitHub:{' '}
					<a
						href=''
						onClick={async (e) => {
							e.preventDefault();
							await openWebsite(redesignGithubProfile);
						}}
					>
						{redesignGithubProfile}
					</a>
				</div>
				<div>
					Fork repository:{' '}
					<a
						href=''
						onClick={async (e) => {
							e.preventDefault();
							await openWebsite(redesignForkRepo);
						}}
					>
						{redesignForkRepo}
					</a>
				</div>
			</Flex>
			<div>Andromeda RPG Paper Maker Copyright © {new Date().getFullYear()} Stephen</div>
				<div>{t('copyright')}</div>
			</Flex>
		</Dialog>
	);
}

export default DialogAbout;

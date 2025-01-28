'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface WspolnotaZmartwychwstaniaProps {
	content: string;
}

const saveWspolnotaZmartwychwstaniaData = async (
	data: WspolnotaZmartwychwstaniaProps
) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (
		!session?.user?.role?.includes('wspolnotazmartwychwstania') &&
		!session?.user?.role?.includes('admin')
	) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.wspolnotaZmartwychwstania.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'WspolnotaZmartwychwstania updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving WspolnotaZmartwychwstania data');
	}
};

export default saveWspolnotaZmartwychwstaniaData;

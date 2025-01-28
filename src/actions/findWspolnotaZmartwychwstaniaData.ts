'use server';

import { db } from '@/lib/db';

async function findWspolnotaZmartwychwstaniaData() {
	try {
		const wspolnotaZmartwychwstaniaData =
			await db.wspolnotaZmartwychwstania.findUnique({
				where: { id: '1' },
			});

		if (!wspolnotaZmartwychwstaniaData) {
			throw new Error('WspolnotaZmartwychwstania data not found');
		}

		return wspolnotaZmartwychwstaniaData;
	} catch (error) {
		throw new Error(`Failed to fetch WspolnotaZmartwychwstania data: ${error}`);
	}
}

export default findWspolnotaZmartwychwstaniaData;

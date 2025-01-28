'use server';

import { db } from '@/lib/db';

async function findRozancoweDzieloData() {
	try {
		const rozancoweDzieloData = await db.rozancoweDzielo.findUnique({
			where: { id: '1' },
		});

		if (!rozancoweDzieloData) {
			throw new Error('RozancoweDzielo data not found');
		}

		return rozancoweDzieloData;
	} catch (error) {
		throw new Error(`Failed to fetch RozancoweDzielo data: ${error}`);
	}
}

export default findRozancoweDzieloData;

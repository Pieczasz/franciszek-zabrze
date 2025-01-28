'use server';

import { db } from '@/lib/db';

async function findChrzestData() {
	try {
		const chrzestData = await db.chrzest.findUnique({
			where: { id: '1' },
		});

		if (!chrzestData) {
			throw new Error('Chrzest data not found');
		}

		return chrzestData;
	} catch (error) {
		throw new Error(`Failed to fetch Chrzest data: ${error}`);
	}
}

export default findChrzestData;

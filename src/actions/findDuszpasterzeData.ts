'use server';

import { db } from '@/lib/db';

async function findDuszpasterzeData() {
	try {
		const duszpasterzeData = await db.duszpasterze.findUnique({
			where: { id: '1' },
		});

		if (!duszpasterzeData) {
			throw new Error('Duszpasterze data not found');
		}

		return duszpasterzeData;
	} catch (error) {
		throw new Error(`Failed to fetch Duszpasterze data: ${error}`);
	}
}

export default findDuszpasterzeData;

'use server';

import { db } from '@/lib/db';

async function findDzieciMaryiData() {
	try {
		const dzieciMaryiData = await db.dzieciMaryi.findUnique({
			where: { id: '1' },
		});

		if (!dzieciMaryiData) {
			throw new Error('DzieciMaryi data not found');
		}

		return dzieciMaryiData;
	} catch (error) {
		throw new Error(`Failed to fetch DzieciMaryi data: ${error}`);
	}
}

export default findDzieciMaryiData;

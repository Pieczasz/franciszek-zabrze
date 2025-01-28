'use server';

import { db } from '@/lib/db';

async function findSpowiedzData() {
	try {
		const spowiedzData = await db.spowiedz.findUnique({
			where: { id: '1' },
		});

		if (!spowiedzData) {
			throw new Error('Spowiedz data not found');
		}

		return spowiedzData;
	} catch (error) {
		throw new Error(`Failed to fetch Spowiedz data: ${error}`);
	}
}

export default findSpowiedzData;

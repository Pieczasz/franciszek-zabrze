'use server';

import { db } from '@/lib/db';

async function findSakramentMalzenstwaData() {
	try {
		const sakramentMalzenstwaData = await db.sakramentMalzenstwa.findUnique({
			where: { id: '1' },
		});

		if (!sakramentMalzenstwaData) {
			throw new Error('SakramentMalzenstwa data not found');
		}

		return sakramentMalzenstwaData;
	} catch (error) {
		throw new Error(`Failed to fetch SakramentMalzenstwa data: ${error}`);
	}
}

export default findSakramentMalzenstwaData;

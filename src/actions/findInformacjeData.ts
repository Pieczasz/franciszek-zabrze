'use server';

import { db } from '@/lib/db';

async function findInformacjeData() {
	try {
		const informacjeData = await db.informacje.findUnique({
			where: { id: '1' },
		});

		if (!informacjeData) {
			throw new Error('Informacje data not found');
		}

		return informacjeData;
	} catch (error) {
		throw new Error(`Failed to fetch Informacje data: ${error}`);
	}
}

export default findInformacjeData;

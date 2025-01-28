'use server';

import { db } from '@/lib/db';

async function findOazaData() {
	try {
		const oazaData = await db.oaza.findUnique({
			where: { id: '1' },
		});

		if (!oazaData) {
			throw new Error('Oaza data not found');
		}

		return oazaData;
	} catch (error) {
		throw new Error(`Failed to fetch Oaza data: ${error}`);
	}
}

export default findOazaData;

'use server';

import { db } from '@/lib/db';

async function findCaritasData() {
	try {
		const caritasData = await db.caritas.findUnique({
			where: { id: '1' },
		});

		if (!caritasData) {
			throw new Error('Caritas data not found');
		}

		return caritasData;
	} catch (error) {
		throw new Error(`Failed to fetch Caritas data: ${error}`);
	}
}

export default findCaritasData;

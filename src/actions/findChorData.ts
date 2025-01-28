'use server';

import { db } from '@/lib/db';

async function findChorData() {
	try {
		const chorData = await db.chor.findUnique({
			where: { id: '1' },
		});

		if (!chorData) {
			throw new Error('Chor data not found');
		}

		return chorData;
	} catch (error) {
		throw new Error(`Failed to fetch Chor data: ${error}`);
	}
}

export default findChorData;

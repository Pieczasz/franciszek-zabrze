'use server';

import { db } from '@/lib/db';

async function findPogrzebData() {
	try {
		const pogrzebData = await db.pogrzeb.findUnique({
			where: { id: '1' },
		});

		if (!pogrzebData) {
			throw new Error('Pogrzeb data not found');
		}

		return pogrzebData;
	} catch (error) {
		throw new Error(`Failed to fetch Pogrzeb data: ${error}`);
	}
}

export default findPogrzebData;

'use server';

import { db } from '@/lib/db';

async function findNaszPatronData() {
	try {
		const naszPatronData = await db.naszPatron.findUnique({
			where: { id: '1' },
		});

		if (!naszPatronData) {
			throw new Error('NaszPatron data not found');
		}

		return naszPatronData;
	} catch (error) {
		throw new Error(`Failed to fetch NaszPatron data: ${error}`);
	}
}

export default findNaszPatronData;

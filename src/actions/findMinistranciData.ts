'use server';

import { db } from '@/lib/db';

async function findMinistranciData() {
	try {
		const ministranciData = await db.ministranci.findUnique({
			where: { id: '1' },
		});

		if (!ministranciData) {
			throw new Error('Ministranci data not found');
		}

		return ministranciData;
	} catch (error) {
		throw new Error(`Failed to fetch Ministranci data: ${error}`);
	}
}

export default findMinistranciData;

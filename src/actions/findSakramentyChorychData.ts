'use server';

import { db } from '@/lib/db';

async function findSakramentyChorychData() {
	try {
		const sakramentyChorychData = await db.sakramentyChorych.findUnique({
			where: { id: '1' },
		});

		if (!sakramentyChorychData) {
			throw new Error('SakramentyChorych data not found');
		}

		return sakramentyChorychData;
	} catch (error) {
		throw new Error(`Failed to fetch SakramentyChorych data: ${error}`);
	}
}

export default findSakramentyChorychData;

'use server';

import { db } from '@/lib/db';

async function findSpacerPoKoscieleData() {
	try {
		const spacerPoKoscieleData = await db.spacerPoKosciele.findUnique({
			where: { id: '1' },
		});

		if (!spacerPoKoscieleData) {
			throw new Error('SpacerPoKosciele data not found');
		}

		return spacerPoKoscieleData;
	} catch (error) {
		throw new Error(`Failed to fetch SpacerPoKosciele data: ${error}`);
	}
}

export default findSpacerPoKoscieleData;

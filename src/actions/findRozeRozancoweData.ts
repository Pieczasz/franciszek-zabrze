'use server';

import { db } from '@/lib/db';

async function findRozeRozancoweData() {
	try {
		const rozeRozancoweData = await db.rozeRozancowe.findUnique({
			where: { id: '1' },
		});

		if (!rozeRozancoweData) {
			throw new Error('RozeRozancowe data not found');
		}

		return rozeRozancoweData;
	} catch (error) {
		throw new Error(`Failed to fetch RozeRozancowe data: ${error}`);
	}
}

export default findRozeRozancoweData;

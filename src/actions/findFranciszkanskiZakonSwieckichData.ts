'use server';

import { db } from '@/lib/db';

async function findFranciszkanskiZakonSwieckichData() {
	try {
		const franciszkanskiZakonSwieckichData =
			await db.franciszkanskiZakonSwieckich.findUnique({
				where: { id: '1' },
			});

		if (!franciszkanskiZakonSwieckichData) {
			throw new Error('FranciszkanskiZakonSwieckich data not found');
		}

		return franciszkanskiZakonSwieckichData;
	} catch (error) {
		throw new Error(
			`Failed to fetch FranciszkanskiZakonSwieckich data: ${error}`
		);
	}
}

export default findFranciszkanskiZakonSwieckichData;

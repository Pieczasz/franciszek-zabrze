'use server';

import { db } from '@/lib/db';

async function findKarmelitanskiZakonSwieckichData() {
	try {
		const karmelitanskiZakonSwieckichData =
			await db.karmelitanskiZakonSwieckich.findUnique({
				where: { id: '1' },
			});

		if (!karmelitanskiZakonSwieckichData) {
			throw new Error('KarmelitanskiZakonSwieckich data not found');
		}

		return karmelitanskiZakonSwieckichData;
	} catch (error) {
		throw new Error(
			`Failed to fetch KarmelitanskiZakonSwieckich data: ${error}`
		);
	}
}

export default findKarmelitanskiZakonSwieckichData;

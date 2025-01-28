'use server';

import { db } from '@/lib/db';

async function findBierzmowanieData() {
	try {
		const bierzmowanieData = await db.bierzmowanie.findUnique({
			where: { id: '1' },
		});

		if (!bierzmowanieData) {
			throw new Error('Bierzmowanie data not found');
		}

		return bierzmowanieData;
	} catch (error) {
		throw new Error(`Failed to fetch Bierzmowanie data: ${error}`);
	}
}

export default findBierzmowanieData;

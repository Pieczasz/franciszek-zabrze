'use server';

import { db } from '@/lib/db';

async function findNoweInformacjeData() {
	try {
		const noweInformacjeData = await db.noweInformacje.findUnique({
			where: { id: '1' },
		});

		if (!noweInformacjeData) {
			throw new Error('NoweInformacje data not found');
		}

		return noweInformacjeData;
	} catch (error) {
		throw new Error(`Failed to fetch NoweInformacje data: ${error}`);
	}
}

export default findNoweInformacjeData;

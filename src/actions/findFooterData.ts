'use server';

import { db } from '@/lib/db';

async function findFooterData() {
	try {
		const footerData = await db.footer.findUnique({
			where: { id: '1' },
		});

		if (!footerData) {
			throw new Error('Footer data not found');
		}

		return footerData;
	} catch (error) {
		throw new Error(`Failed to fetch footer data: ${error}`);
	}
}

export default findFooterData;

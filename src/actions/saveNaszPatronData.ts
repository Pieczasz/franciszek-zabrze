'use server';

import { db } from '@/lib/db';

interface NaszPatronProps {
	content: string;
}

const saveNaszPatronData = async (data: NaszPatronProps) => {
	try {
		await db.naszPatron.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'NaszPatron updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving NaszPatron data');
	}
};

export default saveNaszPatronData;

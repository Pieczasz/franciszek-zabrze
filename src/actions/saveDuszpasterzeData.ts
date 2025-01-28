'use server';

import { db } from '@/lib/db';

interface DuszpasterzeProps {
	content: string;
}

const saveDuszpasterzeData = async (data: DuszpasterzeProps) => {
	try {
		await db.duszpasterze.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'Duszpasterze updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving Duszpasterze data');
	}
};

export default saveDuszpasterzeData;

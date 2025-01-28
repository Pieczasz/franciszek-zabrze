'use server';

import { db } from '@/lib/db';

interface InformacjeProps {
	content: string;
}

const saveInformacjeData = async (data: InformacjeProps) => {
	try {
		await db.informacje.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'Informacje updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving Informacje data');
	}
};

export default saveInformacjeData;

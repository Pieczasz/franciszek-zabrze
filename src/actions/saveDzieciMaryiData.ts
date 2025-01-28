'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface DzieciMaryiProps {
	content: string;
}

const saveDzieciMaryiData = async (data: DzieciMaryiProps) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (
		!session?.user?.role?.includes('dzieckomaryi') &&
		!session?.user?.role?.includes('admin')
	) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.dzieciMaryi.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'DzieciMaryi updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving DzieciMaryi data');
	}
};

export default saveDzieciMaryiData;

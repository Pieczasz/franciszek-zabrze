'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface RozancoweDzieloProps {
	content: string;
}

const saveRozancoweDzieloData = async (data: RozancoweDzieloProps) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (
		!session?.user?.role?.includes('rozancowedzielo') &&
		!session?.user?.role?.includes('admin')
	) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.rozancoweDzielo.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'RozancoweDzielo updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving RozancoweDzielo data');
	}
};

export default saveRozancoweDzieloData;

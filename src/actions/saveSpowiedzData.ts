'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface SpowiedzProps {
	content: string;
}

const saveSpowiedzData = async (data: SpowiedzProps) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (
		!session?.user?.role?.includes('poslugaduszpasterska') &&
		!session?.user?.role?.includes('admin')
	) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}

	try {
		await db.spowiedz.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'Spowiedz updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving Spowiedz data');
	}
};

export default saveSpowiedzData;

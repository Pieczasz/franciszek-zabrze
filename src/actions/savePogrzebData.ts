'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface PogrzebProps {
	content: string;
}

const savePogrzebData = async (data: PogrzebProps) => {
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
		await db.pogrzeb.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'Pogrzeb updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving Pogrzeb data');
	}
};

export default savePogrzebData;

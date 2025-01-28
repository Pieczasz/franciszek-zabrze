'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface BierzmowanieProps {
	content: string;
}

const saveBierzmowanieData = async (data: BierzmowanieProps) => {
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
		await db.bierzmowanie.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'Bierzmowanie updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving Bierzmowanie data');
	}
};

export default saveBierzmowanieData;

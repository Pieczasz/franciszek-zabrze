'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface FranciszkanskiZakonSwieckichProps {
	content: string;
}

const saveFranciszkanskiZakonSwieckichData = async (
	data: FranciszkanskiZakonSwieckichProps
) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (
		!session?.user?.role?.includes('franciszkanskizakon') &&
		!session?.user?.role?.includes('admin')
	) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.franciszkanskiZakonSwieckich.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'FranciszkanskiZakonSwieckich updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving FranciszkanskiZakonSwieckich data');
	}
};

export default saveFranciszkanskiZakonSwieckichData;

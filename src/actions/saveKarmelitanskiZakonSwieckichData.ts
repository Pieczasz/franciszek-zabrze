'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface KarmelitanskiZakonSwieckichProps {
	content: string;
}

const saveKarmelitanskiZakonSwieckichData = async (
	data: KarmelitanskiZakonSwieckichProps
) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (
		!session?.user?.role?.includes('karmelitanskizakon') &&
		!session?.user?.role?.includes('admin')
	) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.karmelitanskiZakonSwieckich.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'KarmelitanskiZakonSwieckich updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving KarmelitanskiZakonSwieckich data');
	}
};

export default saveKarmelitanskiZakonSwieckichData;

'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface ChorProps {
	content: string;
}

const saveChorData = async (data: ChorProps) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (!session?.user?.role?.includes('chor')) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.chor.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'Chor updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving Chor data');
	}
};

export default saveChorData;

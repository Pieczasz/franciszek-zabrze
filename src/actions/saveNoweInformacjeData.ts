'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface NoweInformacjeProps {
	content: string;
}

const saveNoweInformacjeData = async (data: NoweInformacjeProps) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (
		!session?.user?.role?.includes('moderator') &&
		!session?.user?.role?.includes('admin')
	) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.noweInformacje.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'NoweInformacje updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving NoweInformacje data');
	}
};

export default saveNoweInformacjeData;

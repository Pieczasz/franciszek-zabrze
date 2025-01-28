'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface SakramentyChorychProps {
	content: string;
}

const saveSakramentyChorychData = async (data: SakramentyChorychProps) => {
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
		await db.sakramentyChorych.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'SakramentyChorych updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving SakramentyChorych data');
	}
};

export default saveSakramentyChorychData;

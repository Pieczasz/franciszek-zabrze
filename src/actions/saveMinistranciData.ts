'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface MinistranciProps {
	content: string;
}

const saveMinistranciData = async (data: MinistranciProps) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (
		!session?.user?.role?.includes('ministrant') &&
		!session?.user?.role?.includes('admin')
	) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.ministranci.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'Ministranci updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving Ministranci data');
	}
};

export default saveMinistranciData;

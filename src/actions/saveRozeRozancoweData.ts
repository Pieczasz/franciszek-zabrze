'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface RozeRozancoweProps {
	content: string;
}

const saveRozeRozancoweData = async (data: RozeRozancoweProps) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (
		!session?.user?.role?.includes('rozerozancowe') &&
		!session?.user?.role?.includes('admin')
	) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.rozeRozancowe.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'RozeRozancowe updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving RozeRozancowe data');
	}
};

export default saveRozeRozancoweData;

'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface CaritasProps {
	content: string;
}

const saveCaritasData = async (data: CaritasProps) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (!session?.user?.role?.includes('caritas')) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.caritas.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'Caritas updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving Caritas data');
	}
};

export default saveCaritasData;

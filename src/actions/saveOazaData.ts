'use server';

import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

interface OazaProps {
	content: string;
}

const saveOazaData = async (data: OazaProps) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (!session?.user?.role?.includes('oaza')) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.oaza.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'Oaza updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving Oaza data');
	}
};

export default saveOazaData;

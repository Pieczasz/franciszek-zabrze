'use server';

import { auth } from '@/auth/auth';
// Database

import { db } from '@/lib/db';

export default async function deleteUser(id: string) {
	const session = await auth();

	// If user doesn't have session he can't add post
	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (!session?.user?.role?.includes('admin')) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		const deleteUser = await db.user.delete({
			where: {
				id: id,
			},
		});
		return deleteUser;
	} catch (error) {
		throw new Error('Błąd przy pobieraniu danych z bazy danych');
	}
}

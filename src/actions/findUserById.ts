'use server';

// Database

import { db } from '@/lib/db';

export default async function findUserById(id: string) {
	try {
		const user = await db.user.findUnique({
			where: {
				id: id,
			},
		});
		return user;
	} catch (error) {
		throw new Error('Błąd przy pobieraniu danych z bazy danych');
	}
}

'use server';

// Database

import { db } from '@/lib/db';

export default async function findUsers() {
	try {
		const users = await db.user.findMany({});
		return users;
	} catch (error) {
		throw new Error('Błąd przy pobieraniu danych z bazy danych');
	}
}

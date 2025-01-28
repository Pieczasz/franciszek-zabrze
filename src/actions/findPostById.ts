'use server';

// Database

import { db } from '@/lib/db';

export default async function findPostById(id: string) {
	try {
		const post = await db.post.findUnique({
			where: {
				id: id,
			},
		});
		return post;
	} catch (error) {
		throw new Error('Błąd przy pobieraniu danych z bazy danych');
	}
}

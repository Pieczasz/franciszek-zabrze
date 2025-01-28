'use server';

// Database

import { db } from '@/lib/db';

export default async function findPosts(category: string) {
	try {
		const posts = await db.post.findMany({
			where: {
				category: category,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		return posts;
	} catch (error) {
		throw new Error('Błąd przy pobieraniu danych z bazy danych');
	}
}

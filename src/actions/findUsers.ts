'use server';

// Database

import { db } from '@/lib/db';

interface PaginationParams {
	page?: number;
	limit?: number;
}

interface PaginatedResult<T> {
	data: T[];
	total: number;
	currentPage: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

interface User {
	id: string;
	username: string;
	role: string[];
	firstname: string;
	lastname: string;
	createdAt: Date;
	updatedAt: Date;
}

export default async function findUsers({ page = 1, limit = 10 }: PaginationParams = {}): Promise<PaginatedResult<User>> {
	try {
		const skip = (page - 1) * limit;

		const [users, total] = await Promise.all([
			db.user.findMany({
				skip,
				take: limit,
				orderBy: {
					createdAt: 'desc'
				}
			}),
			db.user.count()
		]);

		const totalPages = Math.ceil(total / limit);

		return {
			data: users,
			total,
			currentPage: page,
			totalPages,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1
		};
	} catch (error) {
		throw new Error('Błąd przy pobieraniu danych z bazy danych');
	}
}

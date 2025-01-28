'use server';

// Functions

import { auth } from '@/auth/auth';

// Schemas

import * as z from 'zod';
import { PostSchema } from '@/schemas';

// Database

import { db } from '@/lib/db';

export const addPost = async (values: z.infer<typeof PostSchema>) => {
	// Validating values with zod and PostSchema in schemas folder
	const validatedFields = PostSchema.safeParse(values);

	const session = await auth();

	// If user doesn't have session he can't add post
	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (
		!session?.user?.role?.includes('moderator') &&
		!session?.user?.role?.includes('admin')
	) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}

	const firstname = session?.user?.firstname;
	const lastname = session?.user?.lastname;

	// Safe checking if all fields are valid
	if (!validatedFields.success) {
		return {
			error:
				'Nieprawidłowe dane (tytuł musi mieć minimum 2 litery, a treść minimum 10 liter)',
		};
	}

	const { content, category } = validatedFields.data;


	try {
		await db.post.create({
			data: {
				content: content,
				category: category,
				author: `${firstname} ${lastname}`,
			},
		});
		return { success: 'Poprawnie dodano post!' };
	} catch (err) {
		return { error: 'Coś poszło nie tak' };
	}
};

'use server';

// Functions

import { auth } from '@/auth/auth';
import bcrypt from 'bcryptjs';

// Schemas

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

// Database

import { db } from '@/lib/db';

// Extended schema to include password fields
const EditUserSchema = RegisterSchema.extend({
	newPassword: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków'),
	confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
	message: 'Hasła muszą się zgadzać',
	path: ['confirmPassword'],
});

export const editUser = async (
	id: string,
	values: z.infer<typeof EditUserSchema>
) => {
	// Validating values with zod and EditUserSchema
	const validatedFields = EditUserSchema.safeParse(values);

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

	// Safe checking if all fields are valid
	if (!validatedFields.success) {
		return { error: validatedFields.error.flatten().fieldErrors };
	}

	const { username, role, firstname, lastname, newPassword } =
		validatedFields.data;

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	try {
		// Updating user details and password if provided
		await db.user.update({
			where: {
				id: id,
			},
			data: {
				username: username,
				role: role,
				firstname: firstname,
				lastname: lastname,
				...(hashedPassword && { password: hashedPassword }),
			},
		});

		return { success: 'Poprawnie edytowano użytkownika!' };
	} catch (err) {
		return { error: 'Coś poszło nie tak' };
	}
};

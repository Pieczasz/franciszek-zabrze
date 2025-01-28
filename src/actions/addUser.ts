'use server';

// Functions

import { getUserByUsername } from '@/data/user';
import { auth } from '@/auth/auth';
import { hasRequiredRole } from '@/utils/roleChecks';
import { ROLES } from '@/constants/roles';
import { AUTH_MESSAGES } from '@/constants/messages';

// Schemas

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

// Cryptography

import bcrypt from 'bcryptjs';

// Database

import { db } from '@/lib/db';

export const addUser = async (values: z.infer<typeof RegisterSchema>) => {
	try {
		const validatedFields = RegisterSchema.safeParse(values);
		const session = await auth();

		if (!session) {
			return { error: 'Twoja sesja nie istnieje!' };
		}

		if (!hasRequiredRole(session, [ROLES.ADMIN])) {
			return { error: AUTH_MESSAGES.ADMIN_REQUIRED };
		}

		if (!validatedFields.success) {
			return {
				error:
					'Nieprawidłowe dane: ' +
					validatedFields.error.errors.map((e) => e.message).join(', '),
			};
		}

		const { username, password, role, firstname, lastname } =
			validatedFields.data;

		const existingUser = await getUserByUsername(username);
		if (existingUser) {
			return { error: 'Użytkownik o podanej nazwie już istnieje!' };
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await db.user.create({
			data: {
				username,
				password: hashedPassword,
				role,
				firstname,
				lastname,
			},
		});

		return { success: 'Poprawnie dodano użytkownika!' };
	} catch (error) {
		console.error('Error adding user:', error);
		return { error: 'Wystąpił błąd podczas dodawania użytkownika' };
	}
};

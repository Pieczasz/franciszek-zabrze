'use server';

import { signIn } from '@/auth/auth';
import { LoginSchema } from '@/schemas';
import { AUTH_MESSAGES } from '@/constants/messages';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	try {
		const validatedFields = LoginSchema.safeParse(values);

		if (!validatedFields.success) {
			return { error: AUTH_MESSAGES.INVALID_CREDENTIALS };
		}

		const { username, password } = validatedFields.data;

		try {
			const result = await signIn('credentials', {
				username,
				password,
				redirect: false,
				callbackUrl: '/dashboard/profile',
			});

			if (result?.error) {
				return { error: AUTH_MESSAGES.INVALID_CREDENTIALS };
			}

			return { success: 'Zalogowano pomyślnie!' };
		} catch (error) {
			console.error('SignIn error:', error);
			return { error: AUTH_MESSAGES.GENERAL_ERROR };
		}
	} catch (error) {
		console.error('Unexpected login error:', error);
		return { error: AUTH_MESSAGES.GENERAL_ERROR };
	}
};

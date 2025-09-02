'use server';

// Functions

import { auth } from '@/auth/auth';
import bcrypt from 'bcryptjs';

// Schemas

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

// Database

import { db } from '@/lib/db';
import { requireAdmin, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';

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
	try {
		// Ensure only admins can edit users
		await requireAdmin();

		// Validate user ID format (basic UUID/CUID check)
		if (!id || typeof id !== 'string' || id.length < 10) {
			return createErrorResponse(new Error('Invalid user ID'));
		}

		// Check if target user exists
		const existingUser = await db.user.findUnique({
			where: { id },
			select: { id: true, username: true }
		});

		if (!existingUser) {
			return createErrorResponse(new Error('User not found'));
		}

		// Validating values with zod and EditUserSchema
		const validatedFields = EditUserSchema.safeParse(values);

		// Safe checking if all fields are valid
		if (!validatedFields.success) {
			return createErrorResponse(new Error(`Validation failed: ${JSON.stringify(validatedFields.error.flatten().fieldErrors)}`));
		}

		const { username, role, firstname, lastname, newPassword } =
			validatedFields.data;

		// Check for username conflicts (excluding current user)
		if (username !== existingUser.username) {
			const usernameExists = await db.user.findFirst({
				where: {
					username,
					NOT: { id }
				}
			});

			if (usernameExists) {
				return createErrorResponse(new Error('Username already exists'));
			}
		}

		// Hash password if provided
		const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 12) : undefined;

		// Update user with explicit field mapping (no mass assignment)
		await db.user.update({
			where: { id },
			data: {
				username,
				role,
				firstname,
				lastname,
				...(hashedPassword && { password: hashedPassword }),
				updatedAt: new Date(),
			},
		});

		return createSuccessResponse('User updated successfully');
	} catch (error) {
		console.error('Error updating user:', error);
		return createErrorResponse(error);
	}
};

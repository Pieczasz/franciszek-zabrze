// Zod

import * as z from 'zod';
import { ROLES } from '@/constants/roles';

const passwordSchema = z.string().min(8, 'Hasło musi mieć minimum 8 znaków');

export const LoginSchema = z.object({
	username: z.string().min(3),
	password: passwordSchema,
});

const roleEnum = z.enum(Object.values(ROLES) as [string, ...string[]]);

export const RegisterSchema = z.object({
	username: z.string().min(3),
	password: passwordSchema,
	firstname: z.string().min(3, {
		message: 'Imię musi mieć minimum 3 litery',
	}),
	lastname: z.string().min(3, {
		message: 'Nazwosko musi mieć minimum 3 litery',
	}),
	role: z.array(roleEnum),
});

export const PostSchema = z.object({
	content: z.string().min(10, {
		message: 'Treść musi mieć minimum 10 znaków',
	}),
	author: z.string(),
	category: z.enum(['notice', 'intension', 'devotion']),
});

export const validCemeteryParts = new Set([
	'S1',
	'S2',
	'S3',
	'S4',
	'S5',
	'S6',
	'S7',
	'S8',
	'S9',
	'S10',
	'S11',
	'N1',
	'N2',
	'N3',
	'N4',
	'N5',
	'N6',
	'N7',
	'N8',
	'N9',
	'NN',
]);

export const CemeterySchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'Imię musi być dłuższe niż dwie litery' })
		.regex(/^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/, {
			message: 'Imię nie może zawierać cyfr',
		}),
	lastName: z
		.string()
		.min(2, { message: 'Nazwisko musi być dłuższe niż dwie litery' })
		.regex(/^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/, {
			message: 'Nazwisko nie może zawierać cyfr',
		}),
});

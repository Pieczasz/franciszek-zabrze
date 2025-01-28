// Next-Auth

import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Database

import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';

// Cryptography

import bcrypt from 'bcryptjs';

import { DefaultSession } from 'next-auth';
import { ROLES } from '@/constants/roles';

declare module 'next-auth' {
	interface User {
		username: string;
		role: Array<(typeof ROLES)[keyof typeof ROLES]>;
		firstname: string | null;
		lastname: string | null;
	}

	interface Session {
		user: {
			id: string;
			username: string;
			role: Array<(typeof ROLES)[keyof typeof ROLES]>;
			firstname: string | null;
			lastname: string | null;
		} & DefaultSession['user'];
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/signIn',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.username = user.username;
				token.role = user.role;
				token.firstname = user.firstname;
				token.lastname = user.lastname;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.username = token.username as string;
				session.user.role = token.role as Array<
					(typeof ROLES)[keyof typeof ROLES]
				>;
				session.user.firstname = token.firstname as string | null;
				session.user.lastname = token.lastname as string | null;
			}
			return session;
		},
	},
	providers: [
		Credentials({
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'text' },
			},
			async authorize(
				credentials: Partial<Record<'username' | 'password', unknown>>,
				req: Request
			): Promise<User | null> {
				try {
					if (!credentials?.username || !credentials.password) {
						return null;
					}

					const user = await db.user.findUnique({
						where: {
							username: credentials.username as string,
						},
					});

					if (!user || !user.password) {
						return null;
					}

					const passwordsMatch = await bcrypt.compare(
						credentials.password as string,
						user.password
					);

					if (!passwordsMatch) {
						return null;
					}

					return {
						id: user.id,
						username: user.username,
						role: user.role as Array<(typeof ROLES)[keyof typeof ROLES]>,
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email || undefined,
					};
				} catch (error) {
					console.error('Authentication error occurred');
					return null;
				}
			},
		}),
	],
});

// Funtions

import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth/auth';

// Components

import AuthButtonClient from '@/app/AuthButton.client';

export default async function AuthButton() {
	const session = await auth();

	if (session && session.user) {
		session.user = {
			id: session.user.id,
			username: session.user.username,
			role: session.user.role,
			firstname: session.user.firstname,
			lastname: session.user.lastname,
		};
	}

	return (
		<SessionProvider session={session}>
			<AuthButtonClient />
		</SessionProvider>
	);
}

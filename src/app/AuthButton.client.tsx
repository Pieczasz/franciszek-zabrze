'use client';

// Functions

import { useSession } from 'next-auth/react';
import { signIn, signOut } from '@/auth/helpers';

// Components

import { Button } from '@/components/ui/button';

export default function AuthButton() {
	const session = useSession();

	return session?.data?.user ? (
		<Button
			onClick={async () => {
				await signOut();
				await signIn();
			}}
		>
			Wyloguj się
		</Button>
	) : (
		<Button onClick={async () => await signIn()}>Zaloguj się</Button>
	);
}

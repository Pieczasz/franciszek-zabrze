'use client';

import LoginForm from '@/components/auth/LoginForm';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function SignInContent() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');

	useEffect(() => {
		if (status === 'authenticated' && session?.user) {
			router.push(callbackUrl || '/dashboard/profile');
		}
	}, [status, session, router, callbackUrl]);

	if (status === 'loading') {
		return null;
	}

	return (
		<div className="bg-white h-full flex items-center justify-center">
			<LoginForm />
		</div>
	);
}

export default function SignIn() {
	return (
		<Suspense
			fallback={
				<div className="bg-white h-full flex items-center justify-center">
					Loading...
				</div>
			}
		>
			<SignInContent />
		</Suspense>
	);
}

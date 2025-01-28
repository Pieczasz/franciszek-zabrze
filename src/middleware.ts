import { NextResponse } from 'next/server';
import { auth } from '@/auth/auth';

export const config = {
	matcher: ['/dashboard/:path*', '/api/:path*', '/signIn'],
};

export default auth((req) => {
	const { nextUrl } = req;
	const session = req.auth;

	const isAuthPage = nextUrl.pathname.startsWith('/signIn');
	const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard');

	// If trying to access protected route without auth
	if (isProtectedRoute) {
		if (!session?.user) {
			const signInUrl = new URL('/signIn', nextUrl);
			signInUrl.searchParams.set('callbackUrl', nextUrl.pathname);
			return NextResponse.redirect(signInUrl);
		}
	}

	// If accessing sign-in page while authenticated
	if (isAuthPage && session?.user) {
		const callbackUrl = nextUrl.searchParams.get('callbackUrl');
		return NextResponse.redirect(
			new URL(callbackUrl || '/dashboard/profile', nextUrl)
		);
	}

	return NextResponse.next();
});

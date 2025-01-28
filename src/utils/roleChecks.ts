import { ROLES } from '@/constants/roles';
import type { Session } from 'next-auth';

export const hasRequiredRole = (
	session: Session | null,
	requiredRoles: Array<(typeof ROLES)[keyof typeof ROLES]>
): boolean => {
	if (!session?.user?.role) return false;

	const userRoles = Array.isArray(session.user.role)
		? session.user.role
		: [session.user.role];

	return userRoles.some((role) => requiredRoles.includes(role));
};

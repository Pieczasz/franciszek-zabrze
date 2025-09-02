import { auth } from '@/auth/auth';
import { ROLES } from '@/constants/roles';

export type AuthorizedUser = {
  id: string;
  username: string;
  role: Array<(typeof ROLES)[keyof typeof ROLES]>;
  firstname: string | null;
  lastname: string | null;
};

/**
 * Ensures the user is authenticated and returns user data
 * @returns Promise<AuthorizedUser> - The authenticated user
 * @throws Error if user is not authenticated
 */
export async function requireAuth(): Promise<AuthorizedUser> {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error('Authentication required');
  }
  
  return {
    id: session.user.id,
    username: session.user.username,
    role: session.user.role,
    firstname: session.user.firstname,
    lastname: session.user.lastname,
  };
}

/**
 * Ensures the user has at least one of the required roles
 * @param requiredRoles - Array of roles, user must have at least one
 * @returns Promise<AuthorizedUser> - The authenticated user with required role
 * @throws Error if user doesn't have required role
 */
export async function requireRole(
  requiredRoles: Array<(typeof ROLES)[keyof typeof ROLES]>
): Promise<AuthorizedUser> {
  const user = await requireAuth();
  
  const hasRequiredRole = requiredRoles.some(role => 
    user.role.includes(role)
  );
  
  if (!hasRequiredRole) {
    throw new Error(`Access denied. Required roles: ${requiredRoles.join(', ')}`);
  }
  
  return user;
}

/**
 * Ensures the user is an admin
 * @returns Promise<AuthorizedUser> - The authenticated admin user
 * @throws Error if user is not an admin
 */
export async function requireAdmin(): Promise<AuthorizedUser> {
  return requireRole([ROLES.ADMIN]);
}

/**
 * Ensures the user is an admin or moderator
 * @returns Promise<AuthorizedUser> - The authenticated admin/moderator user
 * @throws Error if user is not an admin or moderator
 */
export async function requireAdminOrModerator(): Promise<AuthorizedUser> {
  return requireRole([ROLES.ADMIN, ROLES.MODERATOR]);
}

/**
 * Checks if user can edit the specified user (admins can edit anyone, users can edit themselves)
 * @param targetUserId - The ID of the user to be edited
 * @returns Promise<AuthorizedUser> - The authenticated user if authorized
 * @throws Error if user cannot edit the target user
 */
export async function requireUserEditPermission(targetUserId: string): Promise<AuthorizedUser> {
  const user = await requireAuth();
  
  // Admins can edit anyone
  if (user.role.includes(ROLES.ADMIN)) {
    return user;
  }
  
  // Users can only edit themselves
  if (user.id === targetUserId) {
    return user;
  }
  
  throw new Error('Insufficient permissions to edit this user');
}

/**
 * Creates a standardized error response for server actions
 * @param error - The error that occurred
 * @returns Standardized error response object
 */
export function createErrorResponse(error: unknown) {
  if (error instanceof Error) {
    return { 
      error: error.message,
      success: false 
    };
  }
  
  return { 
    error: 'An unexpected error occurred',
    success: false 
  };
}

/**
 * Creates a standardized success response for server actions
 * @param message - Success message
 * @param data - Optional data to include
 * @returns Standardized success response object
 */
export function createSuccessResponse(message: string, data?: any) {
  return { 
    message,
    success: true,
    data 
  };
}
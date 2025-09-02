'use server';

import { db } from '@/lib/db';
import { requireAdmin, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { sanitizeHtml } from '@/lib/sanitize';

interface DuszpasterzeProps {
	content: string;
}

const saveDuszpasterzeData = async (data: DuszpasterzeProps) => {
	try {
		// Ensure only admins can update content
		await requireAdmin();

		// Sanitize HTML content to prevent XSS
		const sanitizedContent = sanitizeHtml(data.content);

		await db.duszpasterze.update({
			where: { id: '1' },
			data: { content: sanitizedContent },
		});

		return createSuccessResponse('Duszpasterze updated successfully');
	} catch (error) {
		console.error('Error saving duszpasterze data:', error);
		return createErrorResponse(error);
	}
};

export default saveDuszpasterzeData;

'use server';

import { db } from '@/lib/db';
import { requireAdmin, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { sanitizeHtml } from '@/lib/sanitize';

interface NaszPatronProps {
	content: string;
}

const saveNaszPatronData = async (data: NaszPatronProps) => {
	try {
		// Ensure only admins can update content
		await requireAdmin();

		// Sanitize HTML content to prevent XSS
		const sanitizedContent = sanitizeHtml(data.content);

		await db.naszPatron.update({
			where: { id: '1' },
			data: { content: sanitizedContent },
		});

		return createSuccessResponse('NaszPatron updated successfully');
	} catch (error) {
		console.error('Error saving nasz patron data:', error);
		return createErrorResponse(error);
	}
};

export default saveNaszPatronData;

'use server';

import { db } from '@/lib/db';
import { requireAdmin, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { sanitizeHtml } from '@/lib/sanitize';

interface InformacjeProps {
	content: string;
}

const saveInformacjeData = async (data: InformacjeProps) => {
	try {
		// Ensure only admins can update content
		await requireAdmin();

		// Sanitize HTML content to prevent XSS
		const sanitizedContent = sanitizeHtml(data.content);

		await db.informacje.update({
			where: { id: '1' },
			data: { content: sanitizedContent },
		});

		return createSuccessResponse('Informacje updated successfully');
	} catch (error) {
		console.error('Error saving informacje data:', error);
		return createErrorResponse(error);
	}
};

export default saveInformacjeData;

'use server';

import { db } from '@/lib/db';
import { requireAdmin, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { sanitizeHtml } from '@/lib/sanitize';

interface SpacerPoKoscieleProps {
	content: string;
}

const saveSpacerPoKoscieleData = async (data: SpacerPoKoscieleProps) => {
	try {
		// Ensure only admins can update content
		await requireAdmin();

		// Sanitize HTML content to prevent XSS
		const sanitizedContent = sanitizeHtml(data.content);

		await db.spacerPoKosciele.update({
			where: { id: '1' },
			data: { content: sanitizedContent },
		});

		return createSuccessResponse('SpacerPoKosciele updated successfully');
	} catch (error) {
		console.error('Error saving spacer po kosciele data:', error);
		return createErrorResponse(error);
	}
};

export default saveSpacerPoKoscieleData;

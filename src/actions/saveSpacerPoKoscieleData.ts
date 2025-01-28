'use server';

import { db } from '@/lib/db';

interface SpacerPoKoscieleProps {
	content: string;
}

const saveSpacerPoKoscieleData = async (data: SpacerPoKoscieleProps) => {
	try {
		await db.spacerPoKosciele.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'SpacerPoKosciele updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving SpacerPoKosciele data');
	}
};

export default saveSpacerPoKoscieleData;

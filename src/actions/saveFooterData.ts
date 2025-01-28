'use server';
import { auth } from '@/auth/auth';
import { db } from '@/lib/db';

// Define the type for the footer data
interface FooterProps {
	address: string;
	officeHours: string;
	contactPhone: string;
	contactEmail: string;
	instagram: string;
	twitter: string;
	facebook: string;
	youtube: string;
}

// Function to handle saving footer data
const saveFooterData = async (data: FooterProps) => {
	const session = await auth();

	if (!session) {
		return { error: 'Twoja sesja nie istnieje!' };
	}

	if (!session?.user?.role?.includes('admin')) {
		return {
			error: 'Nie masz permisji do dodawania postów',
		};
	}
	try {
		await db.footer.update({
			where: { id: '1' },
			data: data,
		});

		return { message: 'Footer updated successfully' };
	} catch (error) {
		console.error('Error saving data:', error);
		throw new Error('Error saving footer data');
	}
};

export default saveFooterData;

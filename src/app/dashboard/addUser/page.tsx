// Functions
import { auth } from '@/auth/auth';

// Components
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import AddUserForm from '@/components/auth/AddUserForm';

export default async function addUser() {
	const session = await auth();
	if (!session) return null;

	return (
		<div className="flex min-h-screen flex-col items-center bg-white relative overflow-hidden">
			<MaxWidthWrapper className="flex flex-col items-center justify-center mt-7">
				{session?.user?.role?.includes('admin') ? (
					<>
						<h1 className="text-3xl font-bold mb-5">Dodaj użytkownika</h1>
						<AddUserForm />
					</>
				) : (
					<p className="text-xl font-semibold mt-5">
						Nie masz permisji do dodawania użytkowników
					</p>
				)}
			</MaxWidthWrapper>
		</div>
	);
}

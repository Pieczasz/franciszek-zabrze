'use client';

// Functions

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import deleteUser from '@/actions/deleteUser';
import { signOut } from '@/auth/helpers';

// Components

import AuthButton from '@/app/AuthButton.client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';

export default function Profile() {
	const handleDeleteUser = async (userId: string) => {
		await deleteUser(userId)
			.then(async () => {
				await signOut();
				window.location.reload();
			})
			.catch((error) => {
				throw error;
			});
	};

	const router = useRouter();

	const { data } = useSession();
	if (!data) {
		return null;
	}

	const handleEditUser = (userId: string) => {
		router.push(`/dashboard/editUser?userId=${userId}`);
	};

	return (
		<div className="flex min-h-screen flex-col items-center  bg-white relative overflow-hidden">
			<MaxWidthWrapper className="flex flex-col items-center justify-center mt-7 gap-y-4">
				<h1 className="text-3xl font-bold ">Twój profil</h1>
				<div className="flex flex-col">
					{/* Ignoring error because we know user have data and username */}
					{/* @ts-ignore */}
					<pre>{`Nazwa użytkownika: ${data.user.username}`}</pre>
					<pre>{`Rola: ${data.user.role}`}</pre>
					<pre>{`Imię: ${data.user.firstname}`}</pre>
					<pre>{`Nazwisko: ${data.user.lastname}`}</pre>
				</div>
				<div>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive" size="sm">
								Usuń swój profil
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Czy jesteś pewny?</AlertDialogTitle>
								<AlertDialogDescription>
									Usunięcie swojego profilu jest nieodwracalne. Jeżeli go
									usuniesz nie będzie możliwości przywrócenia go!
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Anuluj</AlertDialogCancel>

								<AlertDialogAction
									// We know that data.user.id exists
									// @ts-ignore
									onClick={() => handleDeleteUser(data.user.id)}
								>
									Usuń swój profil
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<Button
						variant="ghost"
						size="sm"
						// We know that data.user.id exists
						// @ts-ignore
						onClick={() => handleEditUser(data.user.id)}
					>
						Edytuj dane użytkownika
					</Button>
				</div>
				<AuthButton />
			</MaxWidthWrapper>
		</div>
	);
}

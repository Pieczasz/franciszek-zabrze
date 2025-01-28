'use client';

// Functions

import deleteUser from '@/actions/deleteUser';
import findUsers from '@/actions/findUsers';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

// Components

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

// Interfaces

interface User {
	id: string;
	username: string;
	role: string[];
	firstname: string;
	lastname: string;
}
export default function Profile() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);

	// Getting users
	useEffect(() => {
		setLoading(true);
		findUsers()
			.then((data) => {
				setUsers(data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				throw error;
			});
	}, []);

	const handleDeleteUser = async (userId: string) => {
		try {
			await deleteUser(userId);
			window.location.reload();
		} catch (error) {
			throw error;
		}
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
				<h1 className="text-3xl font-bold ">Lista użytkowników</h1>
				<div className="">
					{loading && <p></p>}
					{users.map((user) => (
						<div key={user.id} className="flex flex-col gap-y-2 items-center">
							<pre>{`Nazwa użytkownika: ${user.username}`}</pre>
							<pre>{`Rola: ${user.role}`}</pre>
							<pre>{`Imię: ${user.firstname}`}</pre>
							<pre>{`Nazwisko: ${user.lastname}`}</pre>

							{data.user.role?.includes('admin') && (
								<div className="flex gap-x-2 w-full py-5">
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button variant="destructive" size="sm">
												Usuń użytkownika
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Czy jesteś pewny?</AlertDialogTitle>
												<AlertDialogDescription>
													Usunięcie użytkownika jest nieodwracalne. Jeżeli go
													usuniesz nie będzie możliwości przywrócenia go!
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Anuluj</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDeleteUser(user.id)}
												>
													Usuń użytkownika
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>

									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleEditUser(user.id)}
									>
										Edytuj dane użytkownika
									</Button>
								</div>
							)}
							<hr className="w-full my-7" />
						</div>
					))}
				</div>
			</MaxWidthWrapper>
		</div>
	);
}

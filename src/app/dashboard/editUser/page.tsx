'use client';

// Functions
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import findUserById from '@/actions/findUserById';
import { editUser } from '@/actions/editUser';

// Schemas
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

// Components
import { CardWrapper } from '@/components/auth/CardWrapper';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormMessage,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';

const roles = [
	'admin',
	'moderator',
	'ministrant',
	'dzieckomaryi',
	'chor',
	'caritas',
	'oaza',
] as const;

// Extended schema to handle password change
const EditUserSchema = RegisterSchema.extend({
	newPassword: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków'),
	confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
	message: 'Hasła muszą się zgadzać',
	path: ['confirmPassword'],
});

export default function EditUserForm() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<z.infer<typeof EditUserSchema>>({
		resolver: zodResolver(EditUserSchema),
		defaultValues: {
			username: '',
			password: '',
			role: [], // Default to an empty array for roles
			newPassword: '',
			confirmPassword: '',
		},
	});

	const { data } = useSession();
	const searchParams = useSearchParams();
	const userId = searchParams.get('userId');

	useEffect(() => {
		if (userId) {
			const userIdString = Array.isArray(userId) ? userId[0] : userId;
			findUserById(userIdString)
				.then((userData) => {
					if (userData) {
						// Ignore ts because we know that value will be correct
						// @ts-ignore
						form.reset(userData);
					} else {
						setError('Nie znaleziono danych dla takiego użytkownika');
					}
				})
				.catch((error) => {
					setError('Błąd przy pobieraniu danych z bazy danych');
					throw error;
				});
		}
	}, [form, userId]);

	const onSubmit = async (values: z.infer<typeof EditUserSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			if (!userId) return;
			editUser(userId, values)
				.then((data) => {
					if (data.success) {
						form.reset();
						setSuccess('User updated successfully');
						window.location.reload();
					} else {
						if ('error' in data && typeof data.error === 'object' && data.error !== null) {
							const fieldErrors = Object.values(data.error).flat().join(', ');
							setError(fieldErrors);
						} else if ('error' in data && typeof data.error === 'string') {
							setError(data.error);
						} else {
							setError('Unknown error');
						}
					}
				})
				.catch(() => {
					setError(
						'Coś poszło nie tak podczas edytowania użytkownika. Spróbuj ponownie'
					);
				});
		});
	};

	return (
		<>
			<div className="ml-5 mt-5">
				<CardWrapper
					headerLabel="Edytuj użytkownika"
					backButtonHref="/dashboard/profile"
					backButtonLabel="Powrót"
				>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="flex flex-col gap-y-6">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nazwa użytkownika</FormLabel>
											<FormControl>
												<Input
													placeholder="Tomasz"
													{...field}
													disabled={isPending}
													type="text"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="firstname"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Imię</FormLabel>
											<FormControl>
												<Input
													placeholder="Tomasz"
													{...field}
													disabled={isPending}
													type="text"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastname"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nazwisko</FormLabel>
											<FormControl>
												<Input
													placeholder="Brzeziński"
													{...field}
													disabled={isPending}
													type="text"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="role"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Wybierz role</FormLabel>
											<div className="space-y-2">
												{roles.map((role) => (
													<div
														key={role}
														className="flex items-center space-x-2"
													>
														<Checkbox
															checked={field.value.includes(role)}
															onCheckedChange={() => {
																if (field.value.includes(role)) {
																	form.setValue(
																		'role',
																		field.value.filter((r) => r !== role)
																	);
																} else {
																	form.setValue('role', [...field.value, role]);
																}
															}}
														/>
														<span>
															{role.charAt(0).toUpperCase() + role.slice(1)}
														</span>
													</div>
												))}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* New Password Field */}
								<FormField
									control={form.control}
									name="newPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nowe Hasło</FormLabel>
											<FormControl>
												<Input
													placeholder="Wprowadź nowe hasło"
													{...field}
													disabled={isPending}
													type="password"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Confirm Password Field */}
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Potwierdź Nowe Hasło</FormLabel>
											<FormControl>
												<Input
													placeholder="Potwierdź nowe hasło"
													{...field}
													disabled={isPending}
													type="password"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Display errors */}
							{error !== undefined && <FormError message={error} />}
							{success !== undefined && <FormSuccess message={success} />}

							<Button type="submit" className="w-full" disabled={isPending}>
								Zapisz zmiany
							</Button>
						</form>
					</Form>
				</CardWrapper>
			</div>
		</>
	);
}

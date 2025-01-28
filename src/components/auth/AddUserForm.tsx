'use client';

// Functions
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useState } from 'react';
import { addUser } from '@/actions/addUser';

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
	'franciszkanskizakon',
	'karmelitanskizakon',
	'duszpasterze',
	'rozancowedzielo',
	'rozerozancowe',
	'wspolnotazmartwychwstania',
	'poslugaduszpasterska',
] as const;

const AddUserForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			username: '',
			password: '',
			role: [], // Default to an empty array for roles
		},
	});

	const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
		setError('');
		setSuccess('');

		// Calling a function to add new user
		startTransition(() => {
			addUser(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
	};

	return (
		<div className="mt-5">
			<CardWrapper
				headerLabel="Dodaj użytkownika"
				backButtonHref="/register"
				backButtonLabel=""
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
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Hasło</FormLabel>
										<FormControl>
											<Input
												placeholder="******"
												{...field}
												type="password"
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Role Checkboxes */}
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Wybierz role</FormLabel>
										<div className="space-y-2">
											{roles.map((role) => (
												<div key={role} className="flex items-center space-x-2">
													<Checkbox
														checked={field.value.includes(role)}
														onCheckedChange={(checked) => {
															const newRoles = checked
																? [...field.value, role]
																: field.value.filter((r) => r !== role);
															field.onChange(newRoles);
														}}
														disabled={isPending}
													/>
													<FormLabel>
														{role.charAt(0).toUpperCase() + role.slice(1)}
													</FormLabel>
												</div>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* Display errors */}
						{error !== undefined && <FormError message={error} />}
						{success !== undefined && <FormSuccess message={success} />}

						<Button type="submit" className="w-full" disabled={isPending}>
							Dodaj użytkownika
						</Button>
					</form>
				</Form>
			</CardWrapper>
		</div>
	);
};

export default AddUserForm;

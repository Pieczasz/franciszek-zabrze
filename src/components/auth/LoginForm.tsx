'use client';

// Functions

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { login } from '@/actions/login';
import { useRouter } from 'next/navigation';

// Schemas

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

// Components

import { Input } from '@/components/ui/input';

import { CardWrapper } from '@/components/auth/CardWrapper';

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

import { AUTH_MESSAGES } from '@/constants/messages';

export default function LoginForm() {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError(undefined);
		setSuccess(undefined);

		startTransition(async () => {
			try {
				const response = await login(values);

				if (response?.error) {
					console.error('Login error response:', response.error);
					setError(response.error);
					form.reset();
					return;
				}

				if (response?.success) {
					setSuccess(response.success);
					setTimeout(() => {
						router.push('/dashboard/profile');
						router.refresh();
					}, 1000);
				}
			} catch (error) {
				console.error('Form submission error:', error);
				setError(`${AUTH_MESSAGES.GENERAL_ERROR}: ${error}`);
			}
		});
	};

	return (
		<CardWrapper
			headerLabel="Zaloguj się"
			backButtonHref="/signIn"
			backButtonLabel=""
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div>
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
							name="password"
							render={({ field }) => (
								<FormItem className="mt-4">
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
					</div>
					{/* Display errors */}
					{error && <FormError message={error} />}
					{success && <FormSuccess message={success} />}

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? 'Logowanie...' : 'Zaloguj się'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}

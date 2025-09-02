'use client';

// Functions

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { editPost } from '@/actions/editPost';
import findPostById from '@/actions/findPostById';

// Schemas

import { zodResolver } from '@hookform/resolvers/zod';
import type * as z from 'zod';
import { PostSchema } from '@/schemas';

// Components

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import {
	Form,
	FormControl,
	FormField,
	FormMessage,
	FormItem,
	FormLabel,
} from '@/components/ui/form';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

export default function EditPostForm() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const { data: session } = useSession();

	const form = useForm<z.infer<typeof PostSchema>>({
		resolver: zodResolver(PostSchema),

		defaultValues: {
			content: '',
			author: `${session?.user.firstname} ${session?.user.lastname}`,
		},
	});

	const searchParams = useSearchParams();

	const postId = searchParams.get('postId');

	useEffect(() => {
		if (postId) {
			const postIdString = Array.isArray(postId) ? postId[0] : postId;
			findPostById(postIdString)
				.then((postData) => {
					if (postData) {
						// Ignore ts because we now that value will be correct
						// @ts-ignore
						form.reset(postData);
					} else {
						setError('Nie znaleziono danych dla takiego posta');
					}
				})
				.catch((error) => {
					setError('Błąd przy pobieraniu danych z bazy danych');
					throw error;
				});
		}
	}, [form, postId]);

	const onSubmit = async (values: z.infer<typeof PostSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			if (!postId) return;
			editPost(postId, values)
				.then((data) => {
					if (data.success) {
						form.reset();
						setSuccess(data.success);
						window.location.reload();
					} else {
						setError(data.error);
					}
				})
				.catch(() => {
					setError(
						'Coś poszło nie tak podczas edytowania posta. Spróbuj ponownie'
					);
				});
		});
	};

	const roles = Array.isArray(session?.user?.role)
		? session.user.role
		: [(session?.user?.role as string | undefined)?.toString()];

	const hasRole = roles.some(
		(role) => typeof role === 'string' && ['admin', 'moderator'].includes(role)
	);
	return (
		<>
			{hasRole && (
				<div className="flex min-h-screen flex-col items-center bg-white relative overflow-hidden w-full">
					<MaxWidthWrapper className="flex flex-col items-center justify-center mt-7">
						<h1 className="text-3xl font-bold mb-5">Edytuj post</h1>
						<div className="w-full">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-6"
								>
									<div className="flex flex-col gap-y-6">
										<div className="flex flex-row gap-x-1 justify-center items-center">
											<FormField
												control={form.control}
												name="category"
												render={({ field }) => (
													<FormItem className="w-1/3">
														<FormLabel>Kategoria posta</FormLabel>
														<Select
															onValueChange={field.onChange}
															value={field.value}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Wybierz kategorie posta" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="notice">
																	Ogłoszenie parafialne
																</SelectItem>
																<SelectItem value="intension">
																	Intencja mszalna
																</SelectItem>
																<SelectItem value="devotion">
																	Nabożeństwo
																</SelectItem>
															</SelectContent>
														</Select>
													</FormItem>
												)}
											/>
										</div>
										<div className="flex flex-col gap-y-4">
											<p className="text-sm">
												Jak podać link do zdjęcia? <br />
												Wejdź na stronę taką jak np:{' '}
												<a
													href="https://postimages.org/"
													className="text-indigo-500"
												>
													https://postimages.org/
												</a>
												<br />
												Następnie prześlij tam swoje zdjęcie <br />
												Potem dostaniesz link do swojego zdjęcia.{' '}
												<strong>(Direct link)</strong> <br />
											</p>
											<p className="tex-sm font-semibold">
												W edytorze tekstu kliknij w trzy kropki, następnie
												obrazek, następnie wklej tam ten link.
											</p>
										</div>
										<div className="dangerouslySetInnerHTML">
											<FormField
												control={form.control}
												name="content"
												render={({ field }) => (
													<FormItem className="mb-12">
														<FormControl>
															<JoditEditor {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
									{error !== undefined && <FormError message={error} />}
									{success !== undefined && <FormSuccess message={success} />}

									<Button
										type="submit"
										className="w-full mt-12"
										disabled={isPending}
									>
										Zapisz zmiany
									</Button>
								</form>
							</Form>
						</div>
					</MaxWidthWrapper>
				</div>
			)}
		</>
	);
}

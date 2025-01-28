'use client';

// Functions

import { useForm } from 'react-hook-form';
import { useTransition, useState } from 'react';
import { useSession } from 'next-auth/react';
import { addPost } from '@/actions/addPost';

// Schemas

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function AddPostForm() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const { data } = useSession();

	const form = useForm<z.infer<typeof PostSchema>>({
		resolver: zodResolver(PostSchema),

		defaultValues: {
			content: '',
			author: `${data?.user.firstname} ${data?.user.lastname}`,
		},
	});

	const onSubmit = async (values: z.infer<typeof PostSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			addPost(values).then((data) => {
				if (data.success) {
					form.reset();
					setSuccess(data.success);
				} else {
					setError(data.error);
				}
			});
		});
	};

	return (
		<div className="flex min-h-screen flex-col items-center  bg-white relative overflow-hidden w-full">
			<MaxWidthWrapper className="flex flex-col items-center justify-center mt-7">
				<h1 className="text-3xl font-bold mb-5">Dodaj post</h1>
				<div className="w-full">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
										W edytorze tekstu kliknij w trzy kropki, następnie obrazek,
										następnie wklej tam ten link.
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
								Dodaj post
							</Button>
						</form>
					</Form>
				</div>
			</MaxWidthWrapper>
		</div>
	);
}

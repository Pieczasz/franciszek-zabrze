'use client';

// Functions

import deleteUser from '@/actions/deleteUser';
import findUsers from '@/actions/findUsers';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

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
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

// Interfaces

interface User {
	id: string;
	username: string;
	role: string[];
	firstname: string;
	lastname: string;
}

interface PaginationData {
	data: User[];
	total: number;
	currentPage: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export default function Profile() {
	const [paginationData, setPaginationData] = useState<PaginationData | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	
	const currentPage = Number(searchParams.get('page')) || 1;
	const itemsPerPage = 5;

	// Getting users with pagination
	useEffect(() => {
		setLoading(true);
		findUsers({ page: currentPage, limit: itemsPerPage })
			.then((data) => {
				setPaginationData(data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				throw error;
			});
	}, [currentPage]);

	const handleDeleteUser = async (userId: string) => {
			await deleteUser(userId);
			// Refresh the current page data instead of full page reload
			const data = await findUsers({ page: currentPage, limit: itemsPerPage });
			setPaginationData(data);
	};

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`/dashboard/usersList?${params.toString()}`);
	};

	const { data } = useSession();
	if (!data) {
		return null;
	}

	const handleEditUser = (userId: string) => {
		router.push(`/dashboard/editUser?userId=${userId}`);
	};

	const users = paginationData?.data || [];
	
	return (
		<div className="flex min-h-screen flex-col items-center  bg-white relative overflow-hidden">
			<MaxWidthWrapper className="flex flex-col items-center justify-center mt-7 gap-y-4">
				<h1 className="text-3xl font-bold ">Lista użytkowników</h1>
				{paginationData && (
					<p className="text-sm text-gray-600">
						Strona {paginationData.currentPage} z {paginationData.totalPages} 
						({paginationData.total} użytkowników)
					</p>
				)}
				<div className="">
					{loading && <p>Ładowanie...</p>}
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
				
				{/* Pagination Controls */}
				{paginationData && paginationData.totalPages > 1 && (
					<div className="mt-8">
						<Pagination>
							<PaginationContent>
								{paginationData.hasPrevPage && (
									<PaginationItem>
										<PaginationPrevious 
											href="#" 
											onClick={(e) => {
												e.preventDefault();
												handlePageChange(currentPage - 1);
											}}
										/>
									</PaginationItem>
								)}
								
								{/* Page numbers */}
								{Array.from({ length: paginationData.totalPages }, (_, i) => i + 1).map((page) => {
									// Show first page, last page, current page, and pages around current
									const isVisible = page === 1 || 
													 page === paginationData.totalPages || 
													 (page >= currentPage - 1 && page <= currentPage + 1);
									
									if (!isVisible) {
										// Show ellipsis if there's a gap
										if (page === 2 && currentPage > 4) {
											return (
												<PaginationItem key="ellipsis1">
													<PaginationEllipsis />
												</PaginationItem>
											);
										}
										if (page === paginationData.totalPages - 1 && currentPage < paginationData.totalPages - 3) {
											return (
												<PaginationItem key="ellipsis2">
													<PaginationEllipsis />
												</PaginationItem>
											);
										}
										return null;
									}
									
									return (
										<PaginationItem key={page}>
											<PaginationLink
												href="#"
												isActive={page === currentPage}
												onClick={(e) => {
													e.preventDefault();
													handlePageChange(page);
												}}
											>
												{page}
											</PaginationLink>
										</PaginationItem>
									);
								})}
								
								{paginationData.hasNextPage && (
									<PaginationItem>
										<PaginationNext 
											href="#" 
											onClick={(e) => {
												e.preventDefault();
												handlePageChange(currentPage + 1);
											}}
										/>
									</PaginationItem>
								)}
							</PaginationContent>
						</Pagination>
					</div>
				)}
			</MaxWidthWrapper>
		</div>
	);
}

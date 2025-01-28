'use client';

// Functions

import findPosts from '@/actions/findPosts';
import deletePost from '@/actions/deletePost';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Components

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

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

// Icons

import { IoPerson } from 'react-icons/io5';
import { FaCalendar } from 'react-icons/fa';

interface Post {
	id: string;
	author: string;
	createdAt: Date;
	content: string;
	category: string;
}

const Nabozenstwa = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(false);
	const [postsPerPage] = useState(3);
	const { data: session } = useSession();

	// Getting posts
	useEffect(() => {
		setLoading(true);
		findPosts('devotion')
			.then((data: Post[]) => {
				setPosts(data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				throw error;
			});
	}, []);

	// Handle delete post
	const handleDeletePost = async (postId: string) => {
		try {
			await deletePost(postId);
			window.location.reload();
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	const router = useRouter();

	const handleEditPost = (postId: string) => {
		router.push(`/dashboard/editPost?postId=${postId}`);
	};

	// Regex for content validation
	const isHTML = (str: string) => /<[a-z][\s\S]*>/i.test(str);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = (pageNumber: number) => {
		if (
			pageNumber > 0 &&
			pageNumber <= Math.ceil(posts.length / postsPerPage)
		) {
			setCurrentPage(pageNumber);
		}
	};

	const roles = Array.isArray(session?.user?.role)
		? session.user.role
		: [(session?.user?.role as string | undefined)?.toString()];

	const hasRole = roles.some(
		(role) => typeof role === 'string' && ['admin', 'moderator'].includes(role)
	);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between bg-white relative overflow-hidden">
			<MaxWidthWrapper className="flex flex-col items-center justify-center mt-7">
				<hr className="w-full mb-7" />
				<div className="flex flex-col w-full items-left jusify-center ">
					<h2 className="text-3xl font-bold text-left w-full">Nabożeństwa</h2>
					<hr className="w-full my-7" />
				</div>
				{loading ? (
					<div></div>
				) : (
					<>
						{currentPosts.length > 0 ? (
							currentPosts.map((post) => (
								<div
									key={post.id}
									className="flex flex-col justify-center items-left w-full mb-2"
								>
									<p className="flex items-center gap-x-2 text-gray-600">
										<IoPerson />
										{post.author} <FaCalendar />
										{new Date(post.createdAt)
											.toLocaleString()
											.slice(0, 10)
											.replace(',', '')}
									</p>

									{isHTML(post.content) ? (
										<div
											className="dangerouslySetInnerHTML"
											dangerouslySetInnerHTML={{ __html: post.content }}
										/>
									) : (
										<p>{post.content}</p>
									)}
									{hasRole && (
										<div className="flex gap-x-2 w-full py-5">
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button variant="destructive" size="sm">
														Usuń posta
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Czy jesteś pewny?
														</AlertDialogTitle>
														<AlertDialogDescription>
															Usunięcie posta jest nieodwracalne. Jeżeli go
															usuniesz nie będzie możliwości przywrócenia go!
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Anuluj</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => handleDeletePost(post.id)}
														>
															Usuń
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>

											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleEditPost(post.id)}
											>
												Edytuj post
											</Button>
											<Button
												variant="secondary"
												size="sm"
												onClick={() => router.push(`/dashboard/addPost`)}
											>
												Dodaj post
											</Button>
										</div>
									)}
								</div>
							))
						) : (
							<div></div>
						)}
						<Pagination className="my-5">
							<PaginationContent>
								<PaginationItem>
									{currentPage !== 1 && (
										<PaginationPrevious
											href="#"
											onClick={() => paginate(currentPage - 1)}
										/>
									)}
								</PaginationItem>
								{/* Display page numbers */}
								{Array.from({
									length: Math.ceil(posts.length / postsPerPage),
								}).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink
											href="#"
											onClick={() => paginate(index + 1)}
											isActive={currentPage === index + 1}
										>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{currentPage !== Math.ceil(posts.length / postsPerPage) && (
										<PaginationNext
											href="#"
											onClick={() => paginate(currentPage + 1)}
										/>
									)}
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</>
				)}
				<hr className="w-full mb-7" />
			</MaxWidthWrapper>
		</main>
	);
};

export default Nabozenstwa;

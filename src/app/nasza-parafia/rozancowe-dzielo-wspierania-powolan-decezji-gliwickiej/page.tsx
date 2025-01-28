'use client';

// Functions
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// Components
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

// Database
import findRozancoweDzieloData from '@/actions/findRozancoweDzieloData';
import saveRozancoweDzieloData from '@/actions/saveRozancoweDzieloData';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface RozancoweDzieloProps {
	content: string;
}

export default function RozancoweDzielo() {
	const [rozancoweDzielo, setRozancoweDzielo] =
		useState<RozancoweDzieloProps | null>(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [editValues, setEditValues] = useState<RozancoweDzieloProps | null>(
		null
	);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchRozancoweDzielo = async () => {
			try {
				const data = await findRozancoweDzieloData();
				setRozancoweDzielo(data);
				setEditValues(data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching RozancoweDzielo data:', error);
				setLoading(false);
			}
		};

		fetchRozancoweDzielo();
	}, []);

	const handleContentChange = (newContent: string) => {
		setEditValues((prevEditValues) =>
			prevEditValues
				? { ...prevEditValues, content: newContent }
				: prevEditValues
		);
	};

	const handleSave = async () => {
		if (!editValues) return;

		try {
			const result = await saveRozancoweDzieloData(editValues);
			if (result) {
				setRozancoweDzielo(editValues);
				setIsEditing(false);
			} else {
				alert('Failed to save changes');
			}
		} catch (error) {
			console.error('Error saving data:', error);
			alert('Failed to save changes');
		}
	};

	if (loading) {
		return <div className="min-h-screen bg-white"></div>;
	}

	if (!rozancoweDzielo) {
		return <div>Error loading RozancoweDzielo data</div>;
	}

	const roles = Array.isArray(session?.user?.role)
		? session.user.role
		: [(session?.user?.role as string | undefined)?.toString()];

	const hasRole = roles.some(
		(role) =>
			typeof role === 'string' && ['admin', 'rozancowedzielo'].includes(role)
	);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between bg-white relative overflow-hidden">
			<MaxWidthWrapper className="flex flex-col items-center justify-center mt-7">
				{isEditing ? (
					<>
						<div className="dangerouslySetInnerHTML">
							<JoditEditor
								value={editValues?.content || ''}
								onChange={handleContentChange}
								className="w-full p-4 border rounded min-h-screen"
							/>
						</div>
					</>
				) : (
					<>
						<hr className="w-full mb-7" />
						<div
							className="dangerouslySetInnerHTML flex flex-col max-w-fit w-[100ch] mb-14"
							dangerouslySetInnerHTML={{
								__html: rozancoweDzielo.content,
							}}
						></div>
						<hr className="w-full my-7" />
					</>
				)}
				{hasRole && (
					<div className="mt-4 flex gap-2 my-7">
						{isEditing ? (
							<>
								<Button onClick={handleSave}>Zapisz</Button>
								<Button
									onClick={() => setIsEditing(false)}
									variant={'destructive'}
								>
									Odrzuć
								</Button>
							</>
						) : (
							<Button onClick={() => setIsEditing(true)}>Edytuj</Button>
						)}
					</div>
				)}
			</MaxWidthWrapper>
		</main>
	);
}

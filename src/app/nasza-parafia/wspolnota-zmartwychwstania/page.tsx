'use client';

// Functions
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// Components
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

// Database
import findWspolnotaZmartwychwstaniaData from '@/actions/findWspolnotaZmartwychwstaniaData';
import saveWspolnotaZmartwychwstaniaData from '@/actions/saveWspolnotaZmartwychwstaniaData';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface WspolnotaZmartwychwstaniaProps {
	content: string;
}

export default function WspolnotaZmartwychwstania() {
	const [wspolnotaZmartwychwstania, setWspolnotaZmartwychwstania] =
		useState<WspolnotaZmartwychwstaniaProps | null>(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [editValues, setEditValues] =
		useState<WspolnotaZmartwychwstaniaProps | null>(null);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchWspolnotaZmartwychwstania = async () => {
			try {
				const data = await findWspolnotaZmartwychwstaniaData();
				setWspolnotaZmartwychwstania(data);
				setEditValues(data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching WspolnotaZmartwychwstania data:', error);
				setLoading(false);
			}
		};

		fetchWspolnotaZmartwychwstania();
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
			const result = await saveWspolnotaZmartwychwstaniaData(editValues);
			if (result) {
				setWspolnotaZmartwychwstania(editValues);
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

	if (!wspolnotaZmartwychwstania) {
		return <div>Error loading WspolnotaZmartwychwstania data</div>;
	}

	const roles = Array.isArray(session?.user?.role)
		? session.user.role
		: [(session?.user?.role as string | undefined)?.toString()];

	const hasRole = roles.some(
		(role) =>
			typeof role === 'string' &&
			['admin', 'wspolnotazmartwychwstania'].includes(role)
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
								__html: wspolnotaZmartwychwstania.content,
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

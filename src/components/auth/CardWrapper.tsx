'use client';

// Components

import {
	Card,
	CardHeader,
	CardFooter,
	CardContent,
} from '@/components/ui/card';

import { Header } from '@/components/auth/Header';

import Social from '@/components/auth/Social';

import BackButton from '@/components/auth/BackButton';

// Interfaces

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}

export const CardWrapper = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className="w-[400px] shadow-md mb-10">
			<CardHeader>
				<Header label={headerLabel} text="" />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
};

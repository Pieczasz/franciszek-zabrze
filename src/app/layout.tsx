// Functions and data

import type { Metadata } from 'next';
import { cn } from '@/lib/utils';

// Fonts

import { Poppins } from 'next/font/google';
const font = Poppins({ subsets: ['latin'], weight: '400' });

// Styles

import '@/app/globals.css';

// Components

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Provider from '@/components/Provider';

export const metadata: Metadata = {
	title: 'Kościół św. Franciszka w Zabrzu',
	description: 'Kościół św. Franciszka w Zabrzu',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					'relative h-full font-poppins antialiased bg-slate-700',
					font.className
				)}
			>
				<Provider>
					<Header />
					<div className="flex-grow flex-1">{children}</div>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}

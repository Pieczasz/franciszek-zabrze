'use client';

// Providers

import { SessionProvider } from 'next-auth/react';

// Types

import { FC } from 'react';

// Interfaces

interface ProviderProps {
	children: React.ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;

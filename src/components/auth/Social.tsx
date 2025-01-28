'use client';

// Icons

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';

// Components

import { Button } from '@/components/ui/button';

// Social component if ever needed
const Social = () => {
	return (
		<div className="flex flex-col item-center justify-center w-full gap-y-4">
			<Button
				variant="outline"
				className="w-full gap-x-2"
				size="lg"
				onClick={() => {}}
			>
				<FcGoogle className="h-6 w-6" />
			</Button>
			<Button
				variant="outline"
				className="w-full gap-x-2"
				size="lg"
				onClick={() => {}}
			>
				<FaFacebookF className="h-6 w-6" />
			</Button>
		</div>
	);
};

export default Social;

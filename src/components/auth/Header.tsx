// Icons

import { MdAccountCircle } from 'react-icons/md';

// Interfaces
interface HeaderProps {
	label: string;
	text: string;
}

export const Header = ({ label, text }: HeaderProps) => {
	return (
		<header className="w-full flex items-center justify-center flex-col gap-y-4">
			<div className="flex gap-x-2 justify-center items-center">
				<MdAccountCircle className="w-8 h-8" />
				<h1 className="text-3xl font-semibold">{text}</h1>
			</div>
			<p className="font-muted-foreground text-sm">{label}</p>
		</header>
	);
};

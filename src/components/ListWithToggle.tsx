import React, { useState } from 'react';

interface ListItemProps {
	className?: string;
	title: string;
	href: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
	({ className, title, href, ...props }, ref) => {
		return (
			<li>
				<a
					ref={ref}
					className={`block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
					href={href}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
				</a>
			</li>
		);
	}
);
ListItem.displayName = 'ListItem';

interface ListWithToggleProps {
	items: Array<{ title: string; href: string }>;
}

const ListWithToggle: React.FC<ListWithToggleProps> = ({ items }) => {
	const [showMore, setShowMore] = useState<boolean>(false);

	const initialItemsToShow = 6; // Number of items to show initially

	return (
		<div className="w-full flex justify-center items-center flex-col">
			<ul className="grid w-full gap-3 p-4 lg:w-[170px] lg:grid-cols-1 xl:w-[220px]">
				{items
					.slice(0, showMore ? items.length : initialItemsToShow)
					.map((item, index) => (
						<ListItem key={index} title={item.title} href={item.href} />
					))}
			</ul>
			<button
				onClick={() => setShowMore(!showMore)}
				className="mt-4 p-2 bg-blue-500 text-white rounded"
			>
				{showMore ? 'Pokaż mniej' : 'Pokaż więcej'}
			</button>
		</div>
	);
};

export default ListWithToggle;

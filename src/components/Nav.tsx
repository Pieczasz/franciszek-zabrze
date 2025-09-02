'use client';

// Functions

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Components

import Image from 'next/image';
import Link from 'next/link';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import MenuItem from '@/components/MenuItem';

import ListWithToggle from '@/components/ListWithToggle';

import { Button } from '@/components/ui/button';

// Icons

import { FaBars } from 'react-icons/fa';

const Nav: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleNavbar = () => {
		setIsOpen(!isOpen);
	};

	const listItems = [
		{
			title: 'Podstawowe informacje',
			href: '/nasza-parafia/podstawowe-informacje',
		},
		{ title: 'Duszpasterze', href: '/nasza-parafia/duszpasterze' },
		{ title: 'Dzieci Maryi', href: '/nasza-parafia/dzieci-maryi' },
		{ title: 'Ministranci', href: '/nasza-parafia/ministranci' },
		{ title: 'Nasz patron', href: '/nasza-parafia/nasz-patron' },
		{ title: 'Chór parafialny', href: '/nasza-parafia/chor-parafialny' },
		{
			title: 'Franciszkański zakon świeckich',
			href: '/nasza-parafia/franciszkanski-zakon-swieckich',
		},
		{
			title: 'Karmelitański zakon świeckich',
			href: '/nasza-parafia/karmelitanski-zakon-swieckich',
		},
		{ title: 'Caritas', href: '/nasza-parafia/caritas' },
		{
			title: 'Oaza - ruch, światło, życie',
			href: '/nasza-parafia/oaza-ruch-swiatlo-zycie',
		},
		{
			title: 'Różańcowe dzieło wspierania powołań decezji gliwickiej',
			href: '/nasza-parafia/rozancowe-dzielo-wspierania-powolan-decezji-gliwickiej',
		},
		{ title: 'Róże różańcowe', href: '/nasza-parafia/roze-rozancowe' },
		{
			title: 'Wspólnota zmartwychwstania',
			href: '/nasza-parafia/wspolnota-zmartwychwstania',
		},
		{ title: 'Spacer po kościele', href: '/nasza-parafia/spacer-po-kosciele' },
	];

	return (
		<nav>
			{/* Mobile Navbar */}
			<div className="lg:hidden flex justify-between items-center px-4">
				<div className="mr-4">
					<Link href="/">
						<Image src="/logo.png" alt="Logo" width={200} height={100} />
					</Link>
				</div>
				<div>
					<FaBars className="text-2xl" onClick={toggleNavbar} />
				</div>
			</div>
			{isOpen && (
				<div className="lg:hidden flex flex-col items-center justify-center px-4 pt-8 w-full">
					<Popover>
						<PopoverTrigger asChild className="w-full">
							<Button variant="outline" className="border-none w-full">
								Aktualności
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<div className="grid gap-4">
								<Link
									href="/aktualnosci/ogloszenia-parafialne"
									className="w-full text-center"
								>
									Ogłoszenia parafialne
								</Link>
								<Link
									href="/aktualnosci/intencje-mszalne"
									className="w-full text-center"
								>
									Intencje mszalne
								</Link>
								<Link
									href="/aktualnosci/nabozenstwa"
									className="w-full text-center"
								>
									Nabożeństwa
								</Link>
							</div>
						</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger asChild className="w-full">
							<Button variant="outline" className="border-none w-full">
								Posługa duszpasterska
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<div className="grid gap-4">
								<Link
									href="/posluga-duszpasterska/chrzest"
									className="w-full text-center"
								>
									Chrzest
								</Link>
								<Link
									href="/posluga-duszpasterska/bierzmowanie"
									className="w-full text-center"
								>
									Bierzmowanie
								</Link>
								<Link
									href="/posluga-duszpasterska/sakrament-malzenstwa"
									className="w-full text-center"
								>
									Sakrament małżeństwa
								</Link>
								<Link
									href="/posluga-duszpasterska/sakramenty-chorych"
									className="w-full text-center"
								>
									Sakramenty chorych
								</Link>
								<Link
									href="/posluga-duszpasterska/pogrzeb"
									className="w-full text-center"
								>
									Pogrzeb
								</Link>
								<Link
									href="/posluga-duszpasterska/spowiedz"
									className="w-full text-center"
								>
									Spowiedź
								</Link>
							</div>
						</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger asChild className="w-full">
							<Button variant="outline" className="border-none w-full">
								Nasza Parafia
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<ListWithToggle items={listItems} />
						</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger asChild className="w-full">
							<Button variant="outline" className="border-none w-full">
								Ochrona dzieci
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<div className="grid gap-4">
								<a
									href="/Skrocone_standardy_ochrony_dzieci_w_parafiii_SW_Franciszka_w_Zabrzu.pdf"
									className="w-full text-center"
								>
									Skrócone standardy ochrony dzieci w parafii ŚW. Franciszka w
									Zabrzu
								</a>
								<a
									href="/Standardy_ochrony_dzieci_w_parafiii_SW_Franciszka_w_Zabrzu.pdf"
									className="w-full text-center"
								>
									Standardy ochrony dzieci w parafii ŚW. Franciszka w Zabrzu
								</a>
								<a
									href="/Zespol_DS_prewencji_w_parafii_SW_Franciszka_w_Zabrzu.pdf"
									className="w-full text-center"
								>
									Zespół DS prewencji w parafii ŚW. Franciszka w Zabrzu
								</a>
								<a
									href="/Ochrona_dzieci_i_mlodziezy_diecezja_gliwicka.pdf"
									className="w-full text-center"
								>
									Ochrona Dzieci i Młodzieży - Diecezja Gliwicka
								</a>
							</div>
						</PopoverContent>
					</Popover>
					<Link href="/msze-sw-w-zabrzu" className="w-full text-center">
						<MenuItem className="w-full">Msze św. w Zabrzu</MenuItem>
					</Link>
					<a
						href="https://opoka.org.pl/liturgia/"
						className="w-full text-center"
					>
						<MenuItem className="w-full">Czytania na dziś</MenuItem>
					</a>
					<Link href="/cmentarz" className="w-full text-center">
						<MenuItem className="w-full">Cmentarz</MenuItem>
					</Link>
				</div>
			)}

			{/* Desktop Navbar */}
			<div className="hidden lg:flex justify-between items-center px-4">
				<div className="mr-4">
					<Link href="/">
						<Image src="/logo.png" alt="Logo" width={200} height={100} />
					</Link>
				</div>
				<div className="flex flex-wrap gap-x-1">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Aktualności</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[120px] gap-3 p-4 lg:w-[170px] lg:grid-cols-1 xl:w-[220px]">
										<ListItem
											title="Ogłoszenia parafialne"
											href="/aktualnosci/ogloszenia-parafialne"
										/>
										<ListItem
											title="Intencje mszalne"
											href="/aktualnosci/intencje-mszalne"
										/>
										<ListItem
											title="Nabożeństwa"
											href="/aktualnosci/nabozenstwa"
										/>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="w-full">
									Posługa duszpasterska
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[120px] gap-3 p-4 lg:w-[170px] lg:grid-cols-1 xl:w-[220px]">
										<ListItem
											title="Chrzest"
											href="/posluga-duszpasterska/chrzest"
										/>
										<ListItem
											title="Bierzmowanie"
											href="/posluga-duszpasterska/bierzmowanie"
										/>
										<ListItem
											title="Sakrament małżeństwa"
											href="/posluga-duszpasterska/sakrament-malzenstwa"
										/>
										<ListItem
											title="Sakramenty chorych"
											href="/posluga-duszpasterska/sakramenty-chorych"
										/>
										<ListItem
											title="Pogrzeb"
											href="/posluga-duszpasterska/pogrzeb"
										/>
										<ListItem
											title="Spowiedź"
											href="/posluga-duszpasterska/spowiedz"
										/>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Ochrona dzieci</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[120px] gap-3 p-4 lg:w-[170px] lg:grid-cols-1 xl:w-[220px]">
										<ListItem
											title="Skrócone standardy ochrony dzieci w parafii ŚW. Franciszka
											w Zabrzu"
											href="/Skrocone_standardy_ochrony_dzieci_w_parafiii_SW_Franciszka_w_Zabrzu.pdf"
										/>
										<ListItem
											title="Standardy ochrony dzieci w parafii ŚW. Franciszka w Zabrzu"
											href="/Standardy_ochrony_dzieci_w_parafiii_SW_Franciszka_w_Zabrzu.pdf"
										/>
										<ListItem
											title="Zespół DS prewencji w parafii ŚW. Franciszka w Zabrzu"
											href="/Zespol_DS_prewencji_w_parafii_SW_Franciszka_w_Zabrzu.pdf"
										/>
										<ListItem
											title="Ochrona Dzieci i Młodzieży - Diecezja Gliwicka"
											href="/Ochrona_dzieci_i_mlodziezy_diecezja_gliwicka.pdf"
										/>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="w-full">
									Nasza Parafia
								</NavigationMenuTrigger>
								<NavigationMenuContent className="pb-6">
									<ListWithToggle items={listItems} />
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<Link href="/msze-sw-w-zabrzu">
						<MenuItem>Msze św. w Zabrzu</MenuItem>
					</Link>
					<a href="https://opoka.org.pl/liturgia/">
						<MenuItem>Czytania na dziś</MenuItem>
					</a>
					<Link href="/cmentarz">
						<MenuItem>Cmentarz</MenuItem>
					</Link>
				</div>
			</div>
		</nav>
	);
};

const ListItem = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

export default Nav;

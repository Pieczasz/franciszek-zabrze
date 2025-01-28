'use client';

// Functions

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Components

import Image from 'next/image';

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
					<a href="/">
						<Image src="/logo.png" alt="Logo" width={200} height={100} />
					</a>
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
								<a
									href="/aktualnosci/ogloszenia-parafialne"
									className="w-full text-center"
								>
									Ogłoszenia parafialne
								</a>
								<a
									href="/aktualnosci/intencje-mszalne"
									className="w-full text-center"
								>
									Intencje mszalne
								</a>
								<a
									href="/aktualnosci/nabozenstwa"
									className="w-full text-center"
								>
									Nabożeństwa
								</a>
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
								<a
									href="/posluga-duszpasterska/chrzest"
									className="w-full text-center"
								>
									Chrzest
								</a>
								<a
									href="/posluga-duszpasterska/bierzmowanie"
									className="w-full text-center"
								>
									Bierzmowanie
								</a>
								<a
									href="/posluga-duszpasterska/sakrament-malzenstwa"
									className="w-full text-center"
								>
									Sakrament małżeństwa
								</a>
								<a
									href="/posluga-duszpasterska/sakramenty-chorych"
									className="w-full text-center"
								>
									Sakramenty chorych
								</a>
								<a
									href="/posluga-duszpasterska/pogrzeb"
									className="w-full text-center"
								>
									Pogrzeb
								</a>
								<a
									href="/posluga-duszpasterska/spowiedz"
									className="w-full text-center"
								>
									Spowiedź
								</a>
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
					<a href="/msze-sw-w-zabrzu" className="w-full text-center">
						<MenuItem className="w-full">Msze św. w Zabrzu</MenuItem>
					</a>
					<a
						href="https://opoka.org.pl/liturgia/"
						className="w-full text-center"
					>
						<MenuItem className="w-full">Czytania na dziś</MenuItem>
					</a>
					<a href="/cmentarz" className="w-full text-center">
						<MenuItem className="w-full">Cmentarz</MenuItem>
					</a>
				</div>
			)}

			{/* Desktop Navbar */}
			<div className="hidden lg:flex justify-between items-center px-4">
				<div className="mr-4">
					<a href="/">
						<Image src="/logo.png" alt="Logo" width={200} height={100} />
					</a>
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
					<a href="/msze-sw-w-zabrzu">
						<MenuItem>Msze św. w Zabrzu</MenuItem>
					</a>
					<a href="https://opoka.org.pl/liturgia/">
						<MenuItem>Czytania na dziś</MenuItem>
					</a>
					<a href="/cmentarz">
						<MenuItem>Cmentarz</MenuItem>
					</a>
				</div>
			</div>
		</nav>
	);
};

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
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
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

export default Nav;

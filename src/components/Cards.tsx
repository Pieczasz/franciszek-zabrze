// Icons

import { FaCross, FaNewspaper } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

const Cards = () => {
	return (
		<div className="flex flex-col gap-y-8 lg:flex-row lg:justify-between items-center my-10">
			<a href="/msze-sw-w-zabrzu">
				<div className="flex flex-col items-center justify-center pt-10 gap-y-5 w-[300px] h-[200px] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
					<FaCross />
					<h2 className="2xl">Msze święte</h2>
					<hr />
				</div>
			</a>
			<a href="/aktualnosci/ogloszenia-parafialne">
				<div className="flex flex-col items-center justify-center pt-10 gap-y-5 w-[300px] h-[200px] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
					<FaNewspaper />
					<h2 className="2xl">Ogłoszenia</h2>
					<hr />
				</div>
			</a>
			<a href="/nowe-informacje">
				<div className="flex flex-col items-center justify-center pt-10 gap-y-5 w-[300px] h-[200px] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
					<FaMessage />
					<h2 className="2xl">Najnowsze informacje</h2>
					<hr />
				</div>
			</a>
		</div>
	);
};

export default Cards;

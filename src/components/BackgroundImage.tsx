const BackgroundImage = () => {
	return (
		<div className="bg-slate-900/50 rounded-xl ">
			<div
				className="absolute inset-0 overflow-hidden z-10 h-[650px] bg-no-repeat bg-cover "
				style={{ backgroundImage: "url('/background/tlo_parafia.jpg')" }}
			>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-0 flex flex-col items-center justify-center gap-y-5 p-10 bg-slate-800/50 rounded-xl">
					<h2 className="text-6xl">Parafia św. Franciszka</h2>
					<hr className="w-1/2" />
					<h3 className="text-4xl">w Zabrzu</h3>
				</div>
			</div>
		</div>
	);
};

export default BackgroundImage;

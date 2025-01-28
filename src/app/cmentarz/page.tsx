'use client';

import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function Cmentarz() {
	return (
		<main className="flex min-h-screen flex-col items-center bg-white">
			<MaxWidthWrapper className="flex flex-col items-center justify-center mt-7">
				<hr className="w-full mb-7" />
				<div className="flex flex-col items-center max-w-6xl w-full mb-14">
					<h2 className="text-3xl pb-5 font-bold">Cmentarz</h2>
					<a href="/Regulamin_Cmentarza.pdf">
						<h3 className="text-xl text-blue-600 py-6 font-bold hover:underline">
							Regulamin cmentarza
						</h3>
					</a>

					<div className="w-full space-y-8">
						<Image
							src="/cmenatarz_zabrze_mapa.jpeg"
							alt="Plan cmentarza"
							width={1200}
							height={800}
							className="w-full h-auto rounded-lg shadow-lg"
							priority
						/>

						<iframe
							title="Wyszukiwarka cmentarna"
							src="https://polskie-cmentarze.info/wyszukiwarka.php?clientId=676"
							className="w-full h-[200rem] border-0 rounded-lg shadow-lg"
						/>
					</div>
				</div>
				<hr className="w-full mt-7" />
			</MaxWidthWrapper>
		</main>
	);
}

// Components
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import msze from '@/constants/msze';

export default function mszeSwWZabrzu() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between bg-white relative overflow-hidden">
			<MaxWidthWrapper className="flex flex-col items-center justify-center mt-7">
				<hr className="w-full mb-7" />
				<div className="flex flex-col max-w-fit w-[80ch] mb-14">
					<h2 className="text-3xl pb-5 font-bold">Msze Święte w Zabrzu</h2>
					<p>
						Udział w niedzielnej Eucharystii jest obowiązkiem katolika
						wynikającym z Przykazania Bożego: Pamiętaj, abyś dzień święty
						święcił.
					</p>
					<h3 className="text-xl py-6 font-bold">
						{' '}
						W czasie wakacyjnym godziny Mszy św. należy sprawdzić na stronie
						internetowej parafii
					</h3>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Godzina</TableHead>
								<TableHead className="text-right">Kościoły</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{msze.map((godzina) => (
								<TableRow key={godzina.godzina}>
									<TableCell className="font-medium">
										{godzina.godzina}
									</TableCell>
									<TableCell>
										<div className="w-full h-full flex flex-col justify-center items-end gap-y-2">
											{godzina.koscioly.map((kosciol) =>
												kosciol.includes('Wolności 446') ? (
													<span key={kosciol} className="text-base">
														{' '}
														<strong>{kosciol} </strong>
													</span>
												) : (
													<span key={kosciol}> {kosciol} </span>
												)
											)}
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<hr className="w-full mb-7" />
			</MaxWidthWrapper>
		</main>
	);
}

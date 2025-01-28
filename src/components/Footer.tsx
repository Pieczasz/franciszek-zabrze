'use client';

import { useEffect, useState } from 'react';
import findFooterData from '@/actions/findFooterData';
import saveFooterData from '@/actions/saveFooterData';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhone, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { HiMiniBuildingOffice } from 'react-icons/hi2';
import { IoMdMail, IoMdContact } from 'react-icons/io';
import { useSession } from 'next-auth/react';
import { BsBank } from 'react-icons/bs';

interface FooterProps {
	address: string;
	officeHours: string;
	contactPhone: string;
	contactEmail: string;
	instagram: string;
	twitter: string;
	facebook: string;
	youtube: string;
}

const Footer = () => {
	const [footerData, setFooterData] = useState<FooterProps | null>(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [editValues, setEditValues] = useState<FooterProps | null>(null);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchFooterData = async () => {
			try {
				const data = await findFooterData();

				setFooterData(data);
				setEditValues(data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching footer data:', error);
				setLoading(false);
			}
		};

		fetchFooterData();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEditValues((prevEditValues) =>
			prevEditValues ? { ...prevEditValues, [name]: value } : prevEditValues
		);
	};

	const handleSave = async () => {
		if (!editValues) return;

		try {
			const result = await saveFooterData(editValues);
			if (result) {
				setFooterData(editValues);
				setIsEditing(false);
			} else {
				alert('Failed to save changes');
			}
		} catch (error) {
			console.error('Error saving data:', error);
			alert('Failed to save changes');
		}
	};

	if (loading) {
		return <div></div>;
	}

	if (!footerData) {
		return <div>Error loading footer data</div>;
	}

	return (
		<footer className="text-white p-10 pb-5">
			<MaxWidthWrapper>
				<div className="flex flex-col gap-y-8 lg:flex-row lg:justify-between text-sm items-center">
					<div className="flex flex-col gap-y-4 text-center items-center relative">
						<FaLocationDot className="text-3xl" />
						<h4 className="text-2xl font-bold">Adres parafii</h4>
						{isEditing ? (
							<textarea
								name="address"
								value={editValues!.address}
								onChange={handleChange}
								className="text-black p-2"
							/>
						) : (
							<p>
								{footerData.address.split('\n').map((line, index) => (
									<span key={index}>
										{line}
										<br />
									</span>
								))}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-y-4 text-center items-center relative">
						<HiMiniBuildingOffice className="text-3xl" />
						<h4 className="text-2xl font-bold">Kancelaria Parafialna</h4>
						{isEditing ? (
							<textarea
								name="officeHours"
								value={editValues!.officeHours}
								onChange={handleChange}
								className="text-black p-2"
							/>
						) : (
							<div
								dangerouslySetInnerHTML={{ __html: footerData.officeHours }}
							/>
						)}
					</div>
					<div className="flex flex-col gap-y-4 text-center items-center relative">
						<IoMdContact className="text-3xl" />
						<h4 className="text-2xl font-bold">Kontakt</h4>
						<div className="flex gap-x-5 items-center justify-center">
							<FaPhone className="text-2xl" />
							{isEditing ? (
								<input
									name="contactPhone"
									value={editValues!.contactPhone}
									onChange={handleChange}
									className="text-black p-2"
								/>
							) : (
								<p>{footerData.contactPhone}</p>
							)}
						</div>
						<div className="flex gap-x-5 items-center justify-center">
							<IoMdMail className="text-2xl" />
							{isEditing ? (
								<input
									name="contactEmail"
									value={editValues!.contactEmail}
									onChange={handleChange}
									className="text-black p-2"
								/>
							) : (
								<p>{footerData.contactEmail}</p>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-y-4 text-center items-center relative">
						<BsBank className="text-3xl" />
						<h4 className="text-2xl font-bold">Konto Parafialne</h4>
						<div className="flex flex-col gap-x-5 items-center justify-center">
							<div>
								Orzesko - Knurowski Bank Spółdzielczy
								<br />
								34-8454-1082-2006-0023-9628-0001
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col lg:flex-row mt-14 justify-between">
					<p className="text-left text-md flex items-center">
						&copy; Parafia św. Franciszka w Zabrzu
					</p>
					<div className="flex justify-evenly mt-6 lg:items-center lg:gap-x-4 lg:mt-0">
						<a
							href={'https://www.facebook.com/swfranciszekzabrze/?locale=pl_PL'}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaFacebook className="text-2xl" />
						</a>
						<a
							href={'https://x.com/franciszek_zab'}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaTwitter className="text-2xl" />
						</a>
						<a
							href={'https://www.youtube.com/channel/UCsoJROoNWSobb5hoR6kQ0mQ'}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaYoutube className="text-2xl" />
						</a>
					</div>
				</div>
				{session?.user?.role?.includes('admin') && (
					<div className="mt-6 flex justify-center">
						{isEditing ? (
							<>
								<button
									onClick={handleSave}
									className="bg-green-500 text-white p-2 rounded"
								>
									Zapisz
								</button>
								<button
									onClick={() => setIsEditing(false)}
									className="bg-red-500 text-white p-2 rounded ml-4"
								>
									Anuluj
								</button>
							</>
						) : (
							<button
								onClick={() => setIsEditing(true)}
								className="bg-blue-500 text-white p-2 rounded"
							>
								Edytuj
							</button>
						)}
					</div>
				)}
			</MaxWidthWrapper>
		</footer>
	);
};

export default Footer;

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { PiCube, PiHouseSimple, PiMegaphoneSimple, PiTelegramLogo } from "react-icons/pi";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import NavItems from "./NavItems";


const firstRow = [
	{ name: 'Home', href: '/', icon: <PiHouseSimple /> },
	{ name: 'Roger', href: '/', icon: <PiMegaphoneSimple /> },
	{ name: 'Crowdfund', href: '/', icon: <PiCube /> },
	{ name: 'Campaigns', href: '/', icon: <BsList /> },
]
const secondRow = [
	{ name: 'FAQs', href: '/', icon: <PiHouseSimple /> },
	{ name: 'Campaign', href: '/', icon: <PiMegaphoneSimple /> },
	{ name: 'About', href: '/', icon: <PiCube /> },
	{ name: 'FAQs', href: '/', icon: <BsList /> },
	{ name: 'Help', href: '/', icon: <PiMegaphoneSimple /> },
]
const thirdRow = [
	{ name: 'Dashboard', href: '/', icon: <PiHouseSimple /> },
	{ name: 'My Campaigns', href: '/', icon: <PiMegaphoneSimple /> },
	{ name: 'Create Campaign', href: '/', icon: <PiCube /> },
	{ name: 'Cookies Policy', href: '/', icon: <BsList /> },
	{ name: 'Terms and Conditions', href: '/', icon: <PiMegaphoneSimple /> },
]

export default function Footer() {
	return (
		<footer className="bg-secondaryColor border-t py-10 mt-5">
			<div className="max-w-7xl py-10 px-5 md:p-0 space-y-5  mx-auto flex justify-between md:items-end flex-col md:flex-col">
				<div className="space-y-10 w-full">
					<div className="space-y-2 w-full lg:flex-row flex-col lg:w-full  sm:w-96 flex justify-between">
						<div className="flex-1 w-full">
							<Image className="mr-2 mb-10" src={require(`@/public/whitelogo.svg`)} alt={'logo'} title={'logover'} width={100} height={100} />
							<div className="flex items-center gap-7 mb-5">
								<Link href="https://t.me/arbius_ai" target="blank">
									<PiTelegramLogo className="w-6 h-6 text-white" />
								</Link>
								<Link href="https://t.me/arbius_ai" target="blank">
									<FaFacebook className="w-6 h-6 text-white" />
								</Link>
								<Link href="https://t.me/arbius_ai" target="blank">
									<FaYoutube className="w-6 h-6 text-white" />
								</Link>
								<Link href="https://t.me/arbius_ai" target="blank">
									<FaInstagram className="w-6 h-6 text-white" />
								</Link>
							</div>
						</div>
						<div className="flex flex-1 w-full flex-row !mt-0">
							<div className="flex-1">
								<h3 className="text-white text-xl font-bold mb-5">Home</h3>
								<ul>
									<NavItems navigationItems={firstRow}/>
								</ul>
							</div>
							<div className="flex-1">
								<h3 className="text-white text-xl font-bold mb-5">Topic</h3>
								<ul>
									<NavItems navigationItems={secondRow}/>
								</ul>
							</div>
							<div className="flex-1">
								<h3 className="text-white text-xl font-bold mb-5">Topic</h3>
								<ul>
									<NavItems navigationItems={thirdRow}/>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full w-5 h-[2px] bg-black"/>
				<div className="flex justify-between w-full">
					<span className="flex-1 text-white">2024 - VersCase All Rights Reserved</span>
					<span className="flex-1 text-right text-white">Privacy Terms and Conditions</span>
				</div>
			</div>
		</footer>
	);
}

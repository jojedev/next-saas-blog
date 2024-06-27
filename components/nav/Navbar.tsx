"use client";
import React from "react";
import HoverUnderLine from "./HoverUnderLine";
import Link from "next/link";
import { useUser } from "@/lib/store/user";
import Profile from "./Profile";
import SignupNav from "./SignupNav";
import Image from "next/image";

export default function Navbar() {
	const user = useUser((state) => state.user);

	return (
		<nav className=" w-full justify-between items-center flex p-5 xl:p-0 h-[100px] shadow-sm">
			<div className="max-w-7xl mx-auto flex  w-full justify-between items-center">
				<Link href={"/"} className="font-bold text-2xl text-white">
					<Image className="" src={require(`@/public/darklogo.svg`)} alt={'logo'} title={'logover'} width={100} height={100} />
				</Link>
				<div className="flex justify-content-between space-x-4 items-center">
					<div className="mr-5">
						<HoverUnderLine>
							<Link className="" href={""}>
								<span className="font-bold">Campaigns</span>
							</Link>
						</HoverUnderLine>
					</div>
					{user ? <Profile /> : <SignupNav />}
				</div>
			</div>
		</nav>
	);
}

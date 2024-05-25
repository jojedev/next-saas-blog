import Link from "next/link";
import React from "react";
import Image from "next/image";
import { readCampaign } from "@/lib/actions/campaign";
import styles from "./home.module.css"
import { Button } from "@/components/ui/button";

export default async function Home() {
	let { data: campaigns } = await readCampaign();

	if (!campaigns?.length) {
		campaigns = [];
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen mt-0">
				<h1 className={styles.contents}>Crypto Lisan al gaib</h1>
				<br></br>
				<div className="flex items-center justify-center">
					<Button className="m-10">Rogers History</Button>
					<Button>Crowdfund</Button>
				</div>
			</div>
			<video src={require('../../../public/CryptoJesus.webm')} autoPlay muted loop className={styles.video}/>
			<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0">
				{campaigns.map((campaign, index) => {
					return (
						<Link
							href={"/campaign/" + campaign.id}
							className="w-full  border rounded-md dark:bg-graident-dark p-5 hover:ring-2 ring-green-500 transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3"
							key={index}
						>
							<div className="w-full h-72 sm:w-full  md:h-64 xl:h-96  relative">
								<Image
									priority
									src={campaign.image_url}
									alt="cover"
									fill
									className=" rounded-md object-cover object-center"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</div>
							<div className="space-y-2">
								<p className="text-sm dark:text-gray-400">
									{new Date(campaign.created_at).toDateString()}
								</p>

								<h1 className="text-xl font-bold dark:text-gray-300">
									{campaign.title}
								</h1>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}

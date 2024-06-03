import { ICampaign } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { ExplData, ExplEvent, parse3xplData } from "../../campaign/[id]/components/3xpl";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { getWalletData } from "@/lib/actions/campaign";

export default async function CampaignItem({campaign, index}: {campaign: ICampaign, index:number}) {
    const result: any = await getWalletData(campaign.addresses)
	const parsedData:ExplData = parse3xplData(result);
	let totalRaisedUs: number = 0
	for (const { totalRaisedUsd} of Object.values(parsedData)) {
        totalRaisedUs = totalRaisedUsd + totalRaisedUs
    }
	return (
		<>
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
                    <Progress value={totalRaisedUs/campaign.target_usd*100} max={campaign.target_usd} />
                    <div className="w-full"><span className="text-3xl font-semibold">${Math.round(totalRaisedUs)}</span><span> collected</span></div>
                    <div>Of ${campaign.target_usd} Pledge</div>
				</div>
			</Link>
		</>
	);
}
                                              
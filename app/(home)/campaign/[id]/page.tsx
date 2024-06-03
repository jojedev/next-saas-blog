import React from "react";
import { ICampaign } from "@/lib/types";
import Image from "next/image";
import Content from "./components/Content";
import Addresses from "./components/Addresses";
import { Progress } from "@/components/ui/progress";
import { ExplData, ExplEvent, parse3xplData } from "./components/3xpl";

export async function generateStaticParams() {
	try {
		const { data: campaigns } = await fetch(
			process.env.SITE_URL + "/api/campaign?id=*"
		).then((res) => res.json());

		return campaigns;
	} catch (error) {
		return [];
	}
}

export async function generateMetadata({ params }: { params: { id: string } }) {
	try {
		const { data: campaign } = (await fetch(
			process.env.SITE_URL + "/api/campaign?id=" + params.id
		).then((res) => res.json())) as { data: ICampaign };

		return {
			title: campaign?.title,
			authors: {
				name: "arbius",
			},
			openGraph: {
				title: campaign?.title,
				url: "https://rogerweb.vercel.app/campaign/" + params.id,
				siteName: "RogerWeb",
				images: campaign?.image_url,
				type: "website",
			},
			keywords: ["rogerweb", "arbius"],
		};
	} catch (error) {
		return {};
	}
}

export default async function page({ params }: { params: { id: string } }) {
	const { data: campaign } = (await fetch(
		process.env.SITE_URL + "/api/campaign?id=" + params.id, {
			cache: 'no-store',
		  }
	).then((res) => res.json()).catch(() => ({data: undefined}))) as { data: ICampaign };

	const response = await fetch(process.env.SITE_URL + `/api/crypto?addresses=${encodeURIComponent(JSON.stringify(campaign?.addresses))}`
)
	const result = await response.json();
	const parsedData:ExplData = parse3xplData(result);

	let totalRaisedUs: number = 0
	for (const { totalRaisedUsd} of Object.values(parsedData)) {
        totalRaisedUs = totalRaisedUsd + totalRaisedUs
    }


	if (!campaign?.id) {
		return <h1 className="text-white">Not found</h1>;
	}

	return (
		<div className="max-w-7xl mx-auto flex-col mx-auto min-h-screen  pt-10 space-y-10">
			<div className="space-y-5">
				<h1 className=" text-3xl font-bold dark:text-gray-200">
					{campaign?.title}
				</h1>
				<p className="text-sm dark:text-gray-400">
					{new Date(campaign?.created_at!).toDateString()}
				</p>
			</div>
			<div className="flex flex-row gap-20">
				<div className="flex-col basis-2/3"> 
				<div className="h-96 relative aspect-square w-full">
						<Image
							priority
							src={campaign?.image_url!}
							alt="cover"
							fill
							className="aspect-square static h-125 object-cover object-center rounded-md border-[0.5px] border-zinc-600"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
					<div className="h-96">
						<Content campaignId={params.id} />
					</div>
				</div>
				<div className="flex-col basis-1/3"> 
					<div className="">
						<Addresses addresses={campaign?.addresses} campaign={campaign}></Addresses>
					</div>
				</div>
			</div>
		</div>
	);
}

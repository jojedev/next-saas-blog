import React from "react";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { ICampaign } from "@/lib/types";
import SwitchForm from "./SwitchForm";
import DeleteAlert from "./DeleteAlert";
import { readOwnCampaigns, readPremoderaionCampaigns, updateCampaignById, readCampaignContent, getWalletData } from "@/lib/actions/campaign";
import { Progress } from "@/components/ui/progress";
import { ExplData, parse3xplData } from "@/app/(home)/campaign/[id]/components/3xpl";
import Content from "@/app/(home)/campaign/[id]/components/Content";

interface ProcessCampaignsResult {
	totalsRaised: number[];
	campaignsContent: string[]; // Consider specifying a more precise type instead of 'any' if possible
  }

async function processCampaigns(campaigns: any[]): Promise<ProcessCampaignsResult> {
	const totalsRaised = [];
	const campaignsContent = [];
  
	for (const campaign of campaigns) {
		try {
			const campaignContent: any = await readCampaignContent(campaign.id);
			campaignsContent.push(campaignContent);
			const result: any = await getWalletData(campaign.addresses); // Assuming getWalletData is correctly fetching data for each campaign's addresses
			const parsedData: ExplData = parse3xplData(result);
			let totalRaisedUs: number = 0;
			for (const { totalRaisedUsd } of Object.values(parsedData)) {
			  totalRaisedUs += totalRaisedUsd;
			}
			totalsRaised.push(Math.round(totalRaisedUs));
		  } catch (error) {
			console.error("Error processing campaign:", campaign, error);
			// Optionally, push a default value like 0 or continue to the next campaign
			totalsRaised.push(0); // Assuming we want to count failed ones as 0
		  }
	}
  
	return {totalsRaised, campaignsContent}
  }

export default async function CampaignTable({ kind = "own"} : {kind: "own" | "moderation"}) {
	const { data: campaigns } = kind === "own" ? await readOwnCampaigns() : await readPremoderaionCampaigns();
	const { totalsRaised, campaignsContent } =	await processCampaigns(campaigns as ICampaign[]);
	const isModeration = kind === "moderation";
	return (
		<>
			<div className="rounded-md  overflow-y-scroll ">
				<div className="w-[800px] md:w-full ">
					<div className="space-y-10 border-t border-gray-100">
						{campaigns?.map((campaign, index) => {
							const updatePulished = updateCampaignById.bind(
								null,
								campaign.id,
								{
									is_published: !campaign.is_published,
								} as ICampaign
							);

							return (
								<div className="grid !mt-0 grid-cols-4 border-b py-5 border-gray-100" key={index}>
									<div className="relative overflow-hidden  rounded-lg col-span-1 max-w-[260px] max-h-[180px]">
										<Image className="mr-2 mb-10 w-full h-full object-cover absolute top-[0] left-[0] " src={campaign.image_url} alt={'logo'} title={'logover'} width={500} height={500} />	
									</div>
									<div className="col-span-2"> 
										<h2 className="dark:text-gray-200 col-span-2 font-lg font-bold text-3xl">
											{campaign.title}
										</h2>
										<div className="line-clamp-3 min-h-[70px] my-1 mb-3">
											<Content  campaignId={campaigns[index].id} />
										</div>
										<Progress value={totalsRaised[index]/campaign.target_usd*100} max={campaign.target_usd} />
										<div className="flex justify-end mt-1">
											<span className="dark:text-gray-200 font-lg text-gray-400 text-sm font-normal">
												${totalsRaised[index]} of ${campaign.target_usd} raised
											</span>
										</div>
									</div>
									
									<div className="col-span-1">
										{/* <SwitchForm
											checked={campaign.is_published}
											onSubmit={updatePulished}
											name="publish"
											disabled={!isModeration}
										/> */}
										<Actions canUpdate={!(campaign.is_published && !isModeration)} id={campaign.id} />
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

const Actions = ({ id, canUpdate }: { id: string, canUpdate: boolean }) => {
	return (
		<div className="flex items-center gap-2 flex-wrap flex-col">
			{/* TODO: change to id */}
			<Link href={`/campaign/${id}`}>
				<Button className="flex gap-2 items-center min-w-32" variant="outline">
					View
				</Button>
			</Link>
			<DeleteAlert disabled={!canUpdate} id={id} />

			<Link className={canUpdate ? "" : "pointer-events-none cursor-not-allowed"} href={`/dashboard/campaign/edit/${id}`}>
				<Button disabled={!canUpdate} className="flex gap-2 items-center min-w-32" variant="outline">
					Edit
				</Button>
			</Link>
		</div>
	);
};

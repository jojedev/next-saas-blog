import { ICampaign } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import CampaignItem from "./CampaignItem";

export default function CampaignLoop({ campaigns}: { campaigns: any}) {
	return (
		<>
			{campaigns.map((campaign: ICampaign, index: number) => {
					return (
						<CampaignItem key={index} campaign={campaign} index={index}></CampaignItem>
					);
				})}
		</>
	);
}
                                              
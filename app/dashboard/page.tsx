import React from "react";
import CampaignTable from "./campaign/components/CampaignTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Campaign() {
	return (
		<div className="max-w-7xl mx-auto space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Your Campaigns</h1>
				<Link href="/dashboard/campaign/create">
					<Button
						className="flex items-center gap-2 bg-primaryColor border-0 font-bold"
						variant="outline"
					>
						New Campaign 
					</Button>
				</Link>
			</div>

			<CampaignTable kind="own"/>
		</div>
	);
}

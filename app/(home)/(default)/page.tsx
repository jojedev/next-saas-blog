import Link from "next/link";
import React from "react";
import Image from "next/image";
import { readCampaign } from "@/lib/actions/campaign";
import styles from "./home.module.css"
import { Button } from "@/components/ui/button";
import CampaignLoop from "./components/CampaignLoop";
// import { ExplData, ExplEvent, parse3xplData } from "../campaign/[id]/components/";

export default async function Home() {
	let { data: campaigns } = await readCampaign();

	if (!campaigns?.length) {
		campaigns = [];
	}

// 	const response = await fetch(process.env.SITE_URL + `/api/crypto?addresses=${encodeURIComponent(JSON.stringify(campaign?.addresses))}`
// )
// 	const result = await response.json();
// 	const parsedData:ExplData = parse3xplData(result);
// 	console.log(parsedData)
// 	let totalRaisedUs: number = 0
// 	for (const { totalRaisedUsd} of Object.values(parsedData)) {
//         totalRaisedUs = totalRaisedUsd + totalRaisedUs
//     }
// 	console.log(totalRaisedUs)

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
				<CampaignLoop campaigns={campaigns}></CampaignLoop>
			</div>
		</>
	);
}

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { readCampaign } from "@/lib/actions/campaign";
import styles from "./home.module.css"
import { Button } from "@/components/ui/button";
import CampaignLoop from "./components/CampaignLoop";
import { EmblaCarousel } from "./components/Carousel/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel'

export default async function Home() {
	let { data: campaigns } = await readCampaign();
	const testimonials = [
		'../../../../../public/testimonial1.png',
		'../../../../../public/testimonial1.png',
		'../../../../../public/testimonial1.png',
		'../../../../../public/testimonial1.png',
		'../../../../../public/testimonial1.png',
		'../../../../../public/testimonial1.png'
	]
	const SLIDE_COUNT = testimonials.length
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


	if (!campaigns?.length) {
		campaigns = [];
	}


	return (
		<>
			<div className={`flex flex-col items-center justify-center h-[100vh] ${styles.firstDivHome}`}>
				<div className="p-5">
					<h1 className="uppercase text-[white] font-medium px-[0] py-8 text-[3rem] md:text-[5rem] max-w-[500px] leading-[0.9]">SPEAK OUT YOUR MIND ABOUT IT</h1>
					<div className="w-24 h-[6px] bg-primaryColor mb-5"></div>
					<span className="text-xl block text-white font-light max-w-[380px]">cryptocurrency advocate, unfairly arrested; highlights challenges in legal landscape for blockchain pioneers.</span>
				</div>
			</div>
			<video src={require('../../../public/CryptoJesus.webm')} autoPlay muted loop className={styles.video}/>
			<div className={`${styles.noTop} bg-secondaryColor h-[640px]`}>
				<h2 className="uppercase text-[white] px-5 font-medium text-[2.5rem] sm:text-[4rem] max-w-[500px] leading-[0.9] md:left-[10%] relative top-[70px] z-10">COMMUNITY SHOWING SUPPORT</h2>
				<EmblaCarousel slides={SLIDES} testimonials={testimonials} ></EmblaCarousel>
			</div>
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:space-x-6 p-8 border-b-[1px_solid_#fff]">
				<div className="flex-1 justify-center relative min-h-[350px] mb-[15px]">
					<Image 
					src={require(`../../../public/rogerInterview.webp`)} 
					alt={''}
					className="rounded-md object-cover object-center"
					fill
					></Image>
				</div>
				<div className="flex-1 m-0">
				<h2 className="text-[black] font-medium px-[0]  text-[2rem] md:text-[40px]  leading-[1] pb-4">Unfolding Developments in the Roger Vers Case: What You Need to Know</h2>
					<span className="text-xl block text-[black] font-medium ">The Roger Vers case has captured widespread attention, sparking debates  and discussions across various platforms. As the situation continues to  evolve, staying informed about the latest developments is crucial.</span>
				</div>
			</div>
			{/* <div className={`max-w-7xl mx-auto mx-5 w-[90%] h-[2px] bg-green mb-5${styles.noTop}`}></div> */}
			<div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0">
				<CampaignLoop campaigns={campaigns}></CampaignLoop>
			</div>
		</>
	);
}

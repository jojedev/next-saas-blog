"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
	EyeOpenIcon,
	Pencil1Icon,
	RocketIcon,
	StarIcon,
} from "@radix-ui/react-icons";
import { MutableRefObject, ReactNode, Ref, useEffect, useRef, useState, useTransition } from "react";
import { ICampaignDetial, ICampaignForm } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { BsSave } from "react-icons/bs";
import { CampaignFormSchema, CampaignFormSchemaType, SupportedChains } from "../schema";
import { useUser } from "@/lib/store/user";
import { usePathname } from "next/navigation";
import TiptapEditor from '../../../../components/TiptapEditor'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Button } from "@/RogerVer/components/ui/button";
export default function CampaignForm({
	onHandleSubmit,
	defaultCampaign,
}: {
	defaultCampaign: ICampaignDetial;
	onHandleSubmit: (data: CampaignFormSchemaType) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [isPreview, setPreivew] = useState(false);
	const user = useUser((state) => state.user);
	const urlPath: string = usePathname()
	const campaignId: string = urlPath.substring(urlPath.lastIndexOf("/") + 1)
	const chains = SupportedChains;
	const dropdownRef:any = useRef(null);
	const [activeAddresses, setActiveAddreses] = useState<string[]>([]);
	const form = useForm<z.infer<typeof CampaignFormSchema>>({
		mode: "all",
		resolver: zodResolver(CampaignFormSchema),
		defaultValues: {
			title: defaultCampaign?.title,
			content: defaultCampaign?.campaign_content.content,
			image_url: defaultCampaign?.image_url,
			is_premium: defaultCampaign?.is_premium,
			is_published: defaultCampaign?.is_published,
			addresses: defaultCampaign?.addresses,
			target_usd: defaultCampaign?.target_usd,
			user_id: defaultCampaign?.user_id,
			...chains.map((chain) => ({
					[`addresses_${chain}`]: defaultCampaign?.addresses[chain],
				})).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
		},
	});

	const onSubmit = (data: z.infer<typeof CampaignFormSchema>) => {
		startTransition(() => {
			data.user_id = data.user_id || user?.id!;
			SupportedChains.forEach((chain) => {
				if (data[`addresses_${chain}`]) {
					if (chain === "bitcoin-cash") {
						data.addresses[chain] = data[`addresses_${chain}`].split(":")[1] || data[`addresses_${chain}`];
					} else {
						data.addresses[chain] = data[`addresses_${chain}`];
					}
				}
				delete data[`addresses_${chain}`];
			});
			onHandleSubmit(data);
		});
	};

	const handleDropdownChange = (event: any) => {
		event.preventDefault()
		let activeChains: string[] = [...activeAddresses];
		const allOptions: string[] = [...chains]
		const selectedChain: string = dropdownRef.current.state.selected.value
		if (!selectedChain) return

		const selectedIndex = allOptions.findIndex((chain)=> { if (selectedChain === chain) return true })

		activeChains.unshift(selectedChain);
		console.log(activeChains)
		setActiveAddreses(activeChains);

 		// console.log('Selected option:',  activeAddreses,  selectedChain);
	  };
	  const deleteChain = (event: any, chain: string) => {
		event.preventDefault()
		form.setValue(`addresses_${chain}`, '');
		let activeChains: string[] = [...activeAddresses];
		const selectedIndex = activeChains.findIndex((selectedChain)=> {if (selectedChain === chain) return true})
		activeChains.splice(selectedIndex, 1, '');
		setActiveAddreses(activeChains);
	  }
	  const svgOptions = chains.map((chain) => ({
		svg: <Image className="inline-block mr-2" src={`https://3xpl.com/3xpl-assets/${chain}/logo_dark.svg`} alt={chain} title={chain} width={24} height={24} />,
		label: <span>{`${chain.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(' ', '')} address`}</span>,
	  }));

	  const dropdownOptions = svgOptions.map((option, index) => ({
		label: (
		  <div>
			{option.svg}
			{option.label}
		  </div>
		),
		value: chains[index],
		className: `${activeAddresses[index] ? 'eraseItem' : 'block'}`,
	  }));

	useEffect(() => {
		const addresses = chains.map((chain) => {
			const addressValues = form.getValues(`addresses_${chain}` as any);
			return addressValues ? chain : '';
		  });
		setActiveAddreses(addresses);
	}, []);
	console.log(activeAddresses)
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-4/6 max-sm:w-full justify-center items-center pb-5 rounded-lg"
			>
				<div className="flex items-center p-2 sm:justify-between flex-wrap sm:flex-row gap-2">
					<div
					>
						<h1 className="text-3xl font-bold dark:text-gray-200">
							Edit Campaign 
						</h1>
					</div>
					<div className="flex items-center flex-wrap gap-5">
					<Link href={`/campaign/${campaignId}`}>
						<span
							role="button"
							tabIndex={0}
							className="flex bg-primaryColor gap-2 items-center font-bold px-3 py-2 rounded-lg hover:border-zinc-400 transition-all text-sm"
						>
								<>
									{/* <EyeOpenIcon /> */}
									View
								</>
						</span>
					</Link>

						<button
						type="submit"
						role="button"
						className={cn(
							"flex bg-primaryColor gap-2 items-center  font-bold px-3 py-2 rounded-lg disabled:border-gray-800  transition-all group text-sm disabled:bg-gray-900",
							{ "animate-spin": isPending }
						)}
						disabled={!form.formState.isValid}
					>
						{/* <BsSave className=" animate-bounce group-disabled:animate-none" /> */}
						Save
					</button>
					</div>

				</div>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<div
										className={cn(
											"w-full flex break-words p-2 gap-2 divide-x",
										)}
									>
										<div className="w-full">
											<FormLabel>Title</FormLabel>
											<Input
												placeholder="Campaign title"
												{...field}
												autoFocus
												className={cn(
													"py-5 px-2 border border-gray-200 rounded-lg text-lg font-medium leading-relaxed",
												)}
											/>
										</div>
									</div>
								</>
							</FormControl>

							{form.getFieldState("title").invalid &&
								form.getValues().title && (
									<div className="px-2">
										<FormMessage />
									</div>
								)}
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div
									className={cn(
										"w-full flex divide-x-0",
									)}
								>	
									<div className="w-full p-2">
										<FormLabel>Campaign content</FormLabel>
										<TiptapEditor {...field} />
										</div>
								</div>
							</FormControl>

							{form.getFieldState("content").invalid &&
								form.getValues().content && <FormMessage />}
						</FormItem>
					)}
				/>

					<FormField
					control={form.control}
					name="image_url"
					render={({ field }) => {
						return (
							<FormItem>
								<FormControl>
									<div
										className={cn(
											"w-full flex-1 p-2 gap-2 items-center",
										)}
									>
											<div className="w-full">
											<FormLabel>Image Url</FormLabel>
											<Input
												placeholder="🔗 Image url"
												{...field}
												className={cn(
													"py-5 px-2 border border-gray-200 rounded-lg text-lg font-medium leading-relaxed",
												)}
												type="url"
											/>
										</div>

										<div
											className={cn(
												"relative px-10 w-1/2 lg:block hidden",
											)}
										>
										</div>
									</div>
								</FormControl>

								<div className="px-3">
									<FormMessage />
								</div>
							</FormItem>
						);
					}}
				/>

				<FormField
					control={form.control}
					name="target_usd"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<div
										className={cn(
											"w-full flex break-words p-2 gap-2 divide-x",
										)}
									>
										<div className="w-full">
										<FormLabel>Target Amount</FormLabel>
										<Input
											placeholder="Campaign Target $USD"
											{...field}
											autoFocus
											className={cn(
												"py-5 px-2 border border-gray-200 rounded-lg text-lg font-medium leading-relaxed",
											)}
										/>
										</div>
									</div>
								</>
							</FormControl>

							{form.getFieldState("target_usd").invalid &&
								form.getValues().target_usd && (
									<div className="px-2">
										<FormMessage />
									</div>
								)}
						</FormItem>
					)}
				/>
				<div className="p-2 max-w-xl">
					<FormLabel>Addresses</FormLabel>	
					<div className="flex justify-start items-center w-full mb-5">
						<Dropdown controlClassName="py-5 px-2 border !border-gray-200 !rounded-lg shadow-sm" className="inline-block mr-2 w-full " ref={dropdownRef} options={dropdownOptions}  placeholder="Select an option" />	
						<Button className="inline-block" onClick={handleDropdownChange}>New Wallet</Button>				
					</div>
							
					{activeAddresses.map((chain, index) => (
						<FormField
							key={activeAddresses[index]}
							control={form.control}
							name={`addresses_${activeAddresses[index]}` as any}
							render={({ field }) => (
								<FormItem>
									<FormControl>
									{activeAddresses[index]   ? (
										<div
											className={cn(
											"w-full break-words gap-2 items-center ",
											)}
										>
											<div className="flex my-2">
												<Image className="mr-2" src={`https://3xpl.com/3xpl-assets/${chain}/logo_dark.svg`} alt={chain} title={chain} width={24} height={24} />
												<label className="font-medium">{`${chain.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(' ', '')} address`}</label>
											</div>
											<div className="w-full flex break-words mb-5  gap-2 items-center divide-x">
												<Input
												placeholder={`${chain.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(' ', '')} address`}
												{...field}
												autoFocus
												className={cn(
													"py-5 px-2 border border-gray-200 rounded-lg text-lg  leading-relaxed",
												)}
												/>
												<Button className="rounded-full text-3xl w-10 h-10" onClick={(e)=> deleteChain(e, chain)}>-</Button>
											</div>

										</div>
										): null
									}
									</FormControl>
									{form.getFieldState(`addresses_${chain}` as any).invalid &&
										(form.getValues() as any)[`addresses_${chain}`] && (
											<div className="px-2">
												<FormMessage />
											</div>
										)}
								</FormItem>
							)}
						/>
					))}
				</div>		
			</form>
		</Form>
	);
}

const ImgaeEror = ({ src }: { src: string }) => {
	try {
		return <Image src={src} alt="" width={100} height={100} />;
	} catch {
		return <h1>Invalid</h1>;
	}
};

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
import { ReactNode, useState, useTransition } from "react";
import { ICampaignDetial, ICampaignForm } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { BsSave } from "react-icons/bs";
import { CampaignFormSchema, CampaignFormSchemaType, SupportedChains } from "../schema";
import { useUser } from "@/lib/store/user";
import { usePathname } from "next/navigation";
import TiptapEditor from '../../../../components/TiptapEditor'
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
	console.log(campaignId)

	const chains = SupportedChains;
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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-4/6 max-sm:w-full justify-center items-center pb-5 rounded-md"
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
							className="flex gap-2 items-center border px-3 py-2 rounded-md hover:border-zinc-400 transition-all bg-zinc-800 text-sm"
						>
								<>
									<EyeOpenIcon />
									View
								</>
						</span>
					</Link>

						<button
						type="submit"
						role="button"
						className={cn(
							"flex gap-2 items-center border px-3 py-2 rounded-md border-green-500 disabled:border-gray-800  bg-zinc-800 transition-all group text-sm disabled:bg-gray-900",
							{ "animate-spin": isPending }
						)}
						disabled={!form.formState.isValid}
					>
						<BsSave className=" animate-bounce group-disabled:animate-none" />
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
													"border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full",
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
										"w-full flex p-2 divide-x-0",
									)}
								>	
									<div className="w-full">
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
													"border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full lg:w-1/2 ",
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
												"border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full lg:w-1/2",
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
				<div className="p-2">
					<FormLabel>Campaign content</FormLabel>																
					{chains.map((chain) => (
						<FormField
							key={chain}
							control={form.control}
							name={`addresses_${chain}` as any}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div
											className={cn(
												"w-full flex break-words p-2 gap-2 items-center divide-x",
											)}
										>
											<Image src={`https://3xpl.com/3xpl-assets/${chain}/logo_dark.svg`} alt={chain} title={chain} width={24} height={24} />
											<Input
												placeholder={`${chain.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(' ', '')} address`}
												{...field}
												autoFocus
												className={cn(
													"border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full lg:w-1/2",
												)}
											/>

										</div>
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

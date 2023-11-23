import Link from "next/link";
import React from "react";
import Image from "next/image";
import { IBlog } from "@/lib/types";

export default async function Home() {
	const { data: blogs } = await fetch(
		process.env.SITE_URL + "/api/all?query=*"
	).then((res) => res.json());

	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0">
			{(blogs as IBlog[])?.map((blog, index) => {
				return (
					<Link
						href={"/blog/" + blog.id}
						className="w-full  border rounded-md dark:bg-graident-dark p-5 hover:ring-2 ring-green-500 transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3"
						key={index}
					>
						<div className="w-full h-72 sm:w-full  md:h-64 xl:h-96  relative">
							<Image
								src={blog.image_url}
								alt="cover"
								fill
								className=" rounded-md object-cover object-center"
							/>
						</div>
						<div className="space-y-2">
							<p className="text-sm dark:text-gray-400">
								{new Date(blog.created_at).toDateString()}
							</p>

							<h1 className="text-xl font-bold dark:text-gray-300">
								{blog.title}
							</h1>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
import React from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useUser } from "@/lib/store/user";
import { Button } from "@/components/ui/button";
import { DashboardIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function Profile() {
	const supabase = createClient();
	const user = useUser((state) => state.user);
	const setUser = useUser((state) => state.setUser);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		setUser(null);
	};

	return (
		<Popover>
			<PopoverTrigger>
				<div className="px-3 py-2 shadow-md rounded-lg">
					<Image
						src={user?.image_url!}
						alt={user?.display_name!}
						width={35}
						height={35}
						className="rounded-full mr-2  inline-block "
					/>
					<span className="font-bold inline-block">User</span>
				</div>
			</PopoverTrigger>
			<PopoverContent className="space-y-3 divide-y p-2" side="bottom">
				<div className="px-4">
					<p className="text-sm">{user?.display_name}</p>
					<p className="text-sm text-gray-500">{user?.email}</p>
				</div>

				<Link href="/dashboard">
					<Button
						variant="ghost"
						className="w-full flex justify-between items-center"
					>
						Dashboard <DashboardIcon />
					</Button>
				</Link>

				<Button
					variant="ghost"
					className="w-full flex justify-between items-center"
					onClick={handleLogout}
				>
					Log out <LockOpen1Icon />
				</Button>
			</PopoverContent>
		</Popover>
	);
}

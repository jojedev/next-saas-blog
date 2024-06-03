import type { Metadata } from "next";
import { Inter, Red_Hat_Display, Roboto } from 'next/font/google'
import "./globals.scss";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from "../components/nav/Navbar";
import { Toaster } from "@/components/ui/toaster";
import SessisonProvider from "../components/SessisonProvider";

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"] });
const roboto = Roboto({
	subsets: ["latin"],
	weight: ["100","300","400","500","700"]
});

export const metadata: Metadata = {
	metadataBase: new URL("https://rogerweb.vercel.app/"),

	title: {
		template: "%s | RogerWeb",
		default: "RogerWeb",
	},
	authors: {
		name: "arbius",
	},

	description:
		"Explore a world of captivating stories and insightful articles on our blog. From the latest trends to in-depth analyses, our blog covers a wide range of topics to keep you informed and entertained. Join our community of readers and discover thought-provoking content that sparks curiosity and fosters discussion. Stay updated with our diverse collection of blog posts, written by passionate contributors who share their expertise and unique perspectives. Engage with a platform that goes beyond the ordinary, providing you with enriching content that resonates with your interests.",
	openGraph: {
		title: "RogerWeb",
		description:
			"Explore a world of captivating stories and insightful articles on our blog. From the latest trends to in-depth analyses, our blog covers a wide range of topics to keep you informed and entertained. Join our community of readers and discover thought-provoking content that sparks curiosity and fosters discussion. Stay updated with our diverse collection of blog posts, written by passionate contributors who share their expertise and unique perspectives. Engage with a platform that goes beyond the ordinary, providing you with enriching content that resonates with your interests.",
		url: "https://rogerweb.vercel.app/",
		siteName: "RogerWeb",
		images: "/og.png",
		type: "website",
	},
	keywords: ["rogerweb", "arbius"],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn("antialiased dark:bg-[#fff]", redHatDisplay.className, roboto.className)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					{/* max-w-7xl mx-auto  */}
					<main className="space-y-10 lg:p-0">
						<Navbar />
						{children}
					</main>
				</ThemeProvider>
				<Toaster />
				<SessisonProvider />
			</body>
		</html>
	);
}

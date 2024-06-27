import type { Metadata } from "next";

import React, { ReactNode } from "react";
import NavLinks from "./components/NavLinks";

export const metadata: Metadata = {
	metadataBase: new URL("https://rogerweb.vercel.app/"),

	title: {
		template: "%s | Dashboard",
		default: "Dashboard",
	},
	authors: {
		name: "Arbius",
	},

	description:
		"Empower your decision-making with our intuitive dashboard. Gain valuable insights at a glance with interactive visualizations and real-time analytics. Our dashboard provides a centralized hub for monitoring key metrics, tracking progress, and making data-driven decisions. Streamline your workflow, enhance collaboration, and stay ahead of the curve with customizable widgets and personalized dashboards. Experience the power of data in a user-friendly interface designed to optimize productivity and drive results.",
	openGraph: {
		title: "Dashboard",
		description:
			"Empower your decision-making with our intuitive dashboard. Gain valuable insights at a glance with interactive visualizations and real-time analytics. Our dashboard provides a centralized hub for monitoring key metrics, tracking progress, and making data-driven decisions. Streamline your workflow, enhance collaboration, and stay ahead of the curve with customizable widgets and personalized dashboards. Experience the power of data in a user-friendly interface designed to optimize productivity and drive results.",
		url: "https://rogerweb.vercel.app/",
		siteName: "RogerWeb",
		images: "/og-dashboard.png",
		type: "website",
	},
	keywords: ["RogerWeb", "Arbius"],
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			{children}
		</>
	);
}

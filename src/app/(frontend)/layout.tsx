import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import {
	getActiveLocales,
	getContact,
	getNavByLocale,
} from "@/lib/payload-pages";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "Anna Saxo | Versicherung & Übersetzungen Deutsch-Russisch",
		template: "%s | Anna Saxo",
	},
	description:
		"Persönliche Versicherungsberatung in Deutschland und Übersetzungen Deutsch-Russisch. Klar, ehrlich und zweisprachig.",
	openGraph: {
		type: "website",
		locale: "de_DE",
		siteName: "Anna Saxo",
	},
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#edf1f7" },
		{ media: "(prefers-color-scheme: dark)", color: "#070b16" },
	],
	width: "device-width",
	initialScale: 1,
};

export default async function FrontendLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [locales, contact, navByLocale] = await Promise.all([
		getActiveLocales(),
		getContact(),
		getNavByLocale(),
	]);

	return (
		<html lang="de" className={`${GeistSans.variable} ${GeistMono.variable}`}>
			<body className="font-sans">
				<div className="canvas">
					<div className="bento flex flex-col gap-3 sm:gap-4">
						<Navbar
							locales={locales}
							contact={contact}
							navByLocale={navByLocale}
						/>
						{children}
						<Footer />
					</div>
				</div>
				<CookieBanner />
			</body>
		</html>
	);
}

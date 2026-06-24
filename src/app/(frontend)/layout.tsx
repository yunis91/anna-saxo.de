import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { Analytics } from "@/components/site/Analytics";
import {
	getActiveLocales,
	getContact,
	getFooterLegal,
	getGaId,
	getNavByLocale,
	getSeoSettings,
	getSiteName,
} from "@/lib/payload-pages";
import { DEFAULT_LOCALE } from "@/lib/locales";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
	const settings = await getSeoSettings(DEFAULT_LOCALE);
	const verification = settings?.seo?.googleSiteVerification?.trim();

	return {
		metadataBase: new URL(SITE_URL),
		title: {
			default: DEFAULT_TITLE,
			template: "%s | Anna Saxo",
		},
		description: DEFAULT_DESCRIPTION,
		openGraph: {
			type: "website",
			locale: "de_DE",
			siteName: "Anna Saxo",
		},
		robots: { index: true, follow: true },
		verification: verification ? { google: verification } : undefined,
	};
}

export const viewport: Viewport = {
	// Light theme is forced site-wide; keep the browser chrome light too.
	themeColor: "#edf1f7",
	width: "device-width",
	initialScale: 1,
};

export default async function FrontendLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [locales, contact, navByLocale, gaId, siteName, footerLegal] =
		await Promise.all([
			getActiveLocales(),
			getContact(),
			getNavByLocale(),
			getGaId(),
			getSiteName(),
			getFooterLegal(),
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
							siteName={siteName}
						/>
						{children}
						<Footer siteName={siteName} legal={footerLegal} />
					</div>
				</div>
				<CookieBanner />
				<Analytics gaId={gaId} />
			</body>
		</html>
	);
}

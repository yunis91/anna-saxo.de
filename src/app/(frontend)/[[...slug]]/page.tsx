import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { DEFAULT_LOCALE } from "@/lib/locales";
import {
	getActiveLocales,
	getContact,
	getPage,
	getSeoSettings,
} from "@/lib/payload-pages";
import { buildMetadata } from "@/lib/seo";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";
import { HomeSections } from "@/components/site/HomeSections";

export const revalidate = 300;

interface RouteParams {
	slug?: string[];
}

/** Resolve the locale + page slug from the URL segments. */
async function resolve(segments: string[]) {
	const active = await getActiveLocales();
	const codes = active.map((l) => l.code);
	const first = segments[0];

	// /de/... is a duplicate of the unprefixed default - redirect to clean URL.
	const isDePrefix = first === DEFAULT_LOCALE;
	const isLocalePrefix =
		Boolean(first) && first !== DEFAULT_LOCALE && codes.includes(first);

	const locale = isLocalePrefix ? first : DEFAULT_LOCALE;
	const rest = isLocalePrefix || isDePrefix ? segments.slice(1) : segments;
	const pageSlug = rest.length ? rest.join("/") : "home";

	return { locale, pageSlug, isDePrefix, restPath: rest.join("/"), active };
}

export async function generateMetadata({
	params,
}: {
	params: Promise<RouteParams>;
}): Promise<Metadata> {
	const { slug = [] } = await params;
	const { locale, pageSlug, active } = await resolve(slug);
	const [page, settings] = await Promise.all([
		getPage(pageSlug, locale),
		getSeoSettings(locale),
	]);
	return buildMetadata({
		page,
		settings,
		locale,
		pageSlug,
		activeLocales: active,
	});
}

export default async function Page({
	params,
}: {
	params: Promise<RouteParams>;
}) {
	const { slug = [] } = await params;
	const { locale, pageSlug, isDePrefix, restPath } = await resolve(slug);

	if (isDePrefix) redirect(`/${restPath}`);

	const [page, contact] = await Promise.all([
		getPage(pageSlug, locale),
		getContact(),
	]);

	let content: React.ReactNode = null;
	if (page?.layout?.length) {
		content = <RenderBlocks blocks={page.layout} contact={contact} />;
	} else if (pageSlug === "home") {
		content = <HomeSections contact={contact} />;
	}

	if (!content) notFound();

	return (
		<main lang={locale} className="flex-1 flex flex-col gap-3 sm:gap-4">
			{content}
		</main>
	);
}

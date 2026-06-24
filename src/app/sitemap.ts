import type { MetadataRoute } from "next";

import { getActiveLocales, getAllPageSlugs } from "@/lib/payload-pages";
import { DEFAULT_LOCALE } from "@/lib/locales";
import { absoluteUrl, localePath } from "@/lib/seo";

/**
 * One entry per page slug, in the default language, with hreflang alternates
 * pointing at every active language. The "home" slug maps to the site root.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [slugs, activeLocales] = await Promise.all([
		getAllPageSlugs(),
		getActiveLocales(),
	]);
	const now = new Date().toISOString();

	// De-duplicate and ensure the home page is always present.
	const uniqueSlugs = Array.from(new Set(["home", ...slugs]));

	return uniqueSlugs.map((slug) => {
		const languages: Record<string, string> = {};
		for (const { code } of activeLocales) {
			languages[code] = absoluteUrl(localePath(code, slug));
		}

		return {
			url: absoluteUrl(localePath(DEFAULT_LOCALE, slug)),
			lastModified: now,
			changeFrequency: slug === "home" ? "weekly" : "monthly",
			priority: slug === "home" ? 1 : 0.7,
			alternates: { languages },
		};
	});
}

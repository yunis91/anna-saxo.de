import { SITE } from "@/lib/site";
import type { NavItem } from "@/lib/payload-pages";
import { CookieSettingsLink } from "./CookieSettingsLink";
import Link from "next/link";

const DEFAULT_LEGAL: NavItem[] = [
	{ label: "Impressum", link: "/impressum" },
	{ label: "Datenschutz", link: "/datenschutz" },
];

const linkClass =
	"text-sm text-zinc-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:text-zinc-400 dark:hover:text-brand-300";

export function Footer({
	siteName = SITE.name,
	legal = DEFAULT_LEGAL,
}: {
	siteName?: string;
	legal?: NavItem[];
}) {
	const year = new Date().getFullYear();

	return (
		<footer className="card p-7 sm:p-10">
			<div className="flex flex-col gap-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
				<p>
					© {year} {siteName}. Alle Rechte vorbehalten.
				</p>
				<ul className="flex flex-row flex-wrap gap-3">
					{legal.map((item) => (
						<li key={item.link}>
							<Link href={item.link} className={linkClass}>
								{item.label}
							</Link>
						</li>
					))}
					<li>
						<CookieSettingsLink label="Cookie-Einstellungen" className={linkClass} />
					</li>
				</ul>
			</div>
		</footer>
	);
}

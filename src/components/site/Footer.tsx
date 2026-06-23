import { SITE } from "@/lib/site";
import { CtaButton } from "./CtaButton";
import Link from "next/link";

const LEGAL = [
	{ label: "Impressum", href: "/impressum" },
	{ label: "Datenschutz", href: "/datenschutz" },
];

const linkClass =
	"text-sm text-zinc-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:text-zinc-400 dark:hover:text-brand-300";

const headingClass = "text-sm font-semibold text-zinc-900 dark:text-zinc-100";

export function Footer({ siteName = SITE.name }: { siteName?: string }) {
	const year = new Date().getFullYear();

	return (
		<footer className="card p-7 sm:p-10">
			<div className="flex flex-col gap-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
				<p>
					© {year} {siteName}. Alle Rechte vorbehalten.
				</p>
				<ul className="flex flex-row flex-wrap gap-3">
					{LEGAL.map((item) => (
						<li key={item.href}>
							<Link href={item.href} className={linkClass}>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
}

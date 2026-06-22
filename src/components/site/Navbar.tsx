"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

import { SITE } from "@/lib/site";
import { DEFAULT_LOCALE, LOCALE_CODES, type LocaleDef } from "@/lib/locales";
import type { ContactDetails, NavItem } from "@/lib/payload-pages";
import { CtaButton } from "./CtaButton";
import { LangSwitch } from "./LangSwitch";
import Link from "next/link";

function Wordmark({ onClick }: { onClick?: () => void }) {
	return (
		<Link
			href="#top"
			onClick={onClick}
			className="flex items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white"
			aria-label={`${SITE.name}, zur Startseite`}
		>
			<span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
				{SITE.name}
			</span>
		</Link>
	);
}

export function Navbar({
	locales,
	contact,
	navByLocale,
}: {
	locales: LocaleDef[];
	contact?: ContactDetails | null;
	navByLocale: Record<string, NavItem[]>;
}) {
	const [open, setOpen] = useState(false);
	const reduce = useReducedMotion();
	const pathname = usePathname() || "/";
	const firstSeg = pathname.split("/").filter(Boolean)[0];
	const currentLocale = LOCALE_CODES.includes(firstSeg)
		? firstSeg
		: DEFAULT_LOCALE;
	const nav = navByLocale[currentLocale] ?? navByLocale[DEFAULT_LOCALE] ?? [];

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return (
		<header className="sticky top-3 z-50 sm:top-4 lg:top-5">
			<nav className="card relative flex items-center justify-between rounded-full py-2 pl-3 pr-3 sm:pl-4">
				<Wordmark />

				<div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
					{nav.map((item) => (
						<Link
							key={item.link}
							href={item.link}
							className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand-700 dark:text-zinc-300 dark:hover:text-brand-300"
						>
							{item.label}
						</Link>
					))}
				</div>

				<div className="hidden items-center gap-4 lg:flex">
					<LangSwitch locales={locales} />
					<CtaButton variant="outline" />
				</div>

				<button
					type="button"
					onClick={() => setOpen(true)}
					aria-label="Menü öffnen"
					aria-expanded={open}
					className="grid h-10 w-10 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-900/5 dark:text-zinc-200 dark:hover:bg-white/10 lg:hidden"
				>
					<List size={22} weight="bold" aria-hidden />
				</button>
			</nav>

			<AnimatePresence>
				{open && (
					<>
						<motion.div
							key="overlay"
							className="fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-sm lg:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={() => setOpen(false)}
						/>
						<motion.div
							key="drawer"
							role="dialog"
							aria-modal="true"
							aria-label="Menü"
							className="card fixed right-3 top-3 z-50 flex w-[calc(100%-1.5rem)] max-w-sm flex-col rounded-[28px] p-5 sm:right-4 sm:top-4 lg:hidden"
							initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
							animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
							exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
							transition={
								reduce
									? { duration: 0.15 }
									: { type: "spring", stiffness: 320, damping: 34 }
							}
						>
							<div className="flex items-center justify-between">
								<Wordmark onClick={() => setOpen(false)} />
								<button
									type="button"
									onClick={() => setOpen(false)}
									aria-label="Menü schließen"
									className="grid h-10 w-10 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-900/5 dark:text-zinc-200 dark:hover:bg-white/10"
								>
									<X size={20} weight="bold" aria-hidden />
								</button>
							</div>

							<div className="mt-6 flex flex-col gap-1">
								{nav.map((item) => (
									<Link
										key={item.link}
										href={item.link}
										onClick={() => setOpen(false)}
										className="rounded-2xl px-3 py-3 text-lg font-medium text-zinc-800 transition-colors hover:bg-zinc-900/5 dark:text-zinc-100 dark:hover:bg-white/5"
									>
										{item.label}
									</Link>
								))}
							</div>

							<div className="mt-5 flex flex-col gap-4 border-t border-zinc-200/70 pt-5 dark:border-white/10">
								<div className="flex items-center justify-between">
									<a
										href={contact?.phoneHref ?? SITE.phoneHref}
										className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
									>
										{contact?.phone ?? SITE.phone}
									</a>
									<LangSwitch locales={locales} />
								</div>
								<CtaButton onClick={() => setOpen(false)} full />
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}

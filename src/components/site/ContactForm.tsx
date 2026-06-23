"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
	ArrowUpRight,
	CheckCircle,
	CircleNotch,
	WarningCircle,
} from "@phosphor-icons/react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** How long the success message stays before the form is shown again. */
const SUCCESS_RESET_DELAY_MS = 5000;

export interface ContactFormLabels {
	nameLabel: string;
	emailLabel: string;
	phoneLabel: string;
	topicLabel: string;
	messageLabel: string;
	insuranceLabel: string;
	translationLabel: string;
	consultationLabel: string;
	consentText: string;
	submitLabel: string;
	sendingLabel: string;
	successTitle: string;
	successText: string;
	errorText: string;
}

const DEFAULTS: ContactFormLabels = {
	nameLabel: "Name",
	emailLabel: "E-Mail",
	phoneLabel: "Telefon",
	topicLabel: "Thema",
	messageLabel: "Nachricht",
	insuranceLabel: "Versicherung",
	translationLabel: "Übersetzung",
	consultationLabel: "Beratung",
	consentText:
		"Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert werden.",
	submitLabel: "Nachricht senden",
	sendingLabel: "Wird gesendet…",
	successTitle: "Vielen Dank für Ihre Nachricht",
	successText:
		"Ihre Anfrage ist angekommen. Ich melde mich so schnell wie möglich bei Ihnen, in der Regel innerhalb eines Werktags.",
	errorText:
		"Da ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie mir direkt.",
};

type Status = "idle" | "submitting" | "success" | "error";

interface FormValues {
	name: string;
	email: string;
	phone: string;
	service: string;
	message: string;
	consent: boolean;
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL: FormValues = {
	name: "",
	email: "",
	phone: "",
	service: "insurance",
	message: "",
	consent: false,
};

function validate(values: FormValues): FieldErrors {
	const errors: FieldErrors = {};
	if (!values.name.trim()) errors.name = "Bitte geben Sie Ihren Namen an.";
	if (!values.email.trim())
		errors.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
	else if (!EMAIL_RE.test(values.email))
		errors.email = "Diese E-Mail-Adresse scheint nicht zu stimmen.";
	if (!values.message.trim())
		errors.message = "Bitte schreiben Sie eine kurze Nachricht.";
	if (!values.consent)
		errors.consent = "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.";
	return errors;
}

const fieldBase =
	"w-full rounded-2xl border bg-zinc-50 px-4 py-3 text-[15px] text-zinc-900 transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-700/20 disabled:opacity-60 dark:bg-white/5 dark:text-zinc-100 dark:placeholder:text-zinc-500";

function fieldClass(hasError: boolean): string {
	return `${fieldBase} ${
		hasError
			? "border-red-500 focus:border-red-500 dark:border-red-500/70"
			: "border-zinc-200 focus:border-brand-700 dark:border-white/15 dark:focus:border-brand-400"
	}`;
}

export type ContactFormLabelInput = Partial<
	Record<keyof ContactFormLabels, string | null>
>;

/** Merge incoming (possibly null/empty) labels over the German defaults. */
function mergeLabels(labels?: ContactFormLabelInput | null): ContactFormLabels {
	const result = { ...DEFAULTS };
	if (labels) {
		for (const key of Object.keys(DEFAULTS) as (keyof ContactFormLabels)[]) {
			const value = labels[key];
			if (value) result[key] = value;
		}
	}
	return result;
}

export function ContactForm({
	labels,
}: {
	labels?: ContactFormLabelInput | null;
}) {
	const t = mergeLabels(labels);
	const reduce = useReducedMotion();
	const [values, setValues] = useState<FormValues>(INITIAL);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [status, setStatus] = useState<Status>("idle");

	// After a successful submission, show the confirmation briefly, then bring
	// the (already reset) form back so a visitor can send another message.
	useEffect(() => {
		if (status !== "success") return;
		const timer = setTimeout(() => setStatus("idle"), SUCCESS_RESET_DELAY_MS);
		return () => clearTimeout(timer);
	}, [status]);

	const serviceOptions = [
		{ value: "insurance", label: t.insuranceLabel },
		{ value: "translation", label: t.translationLabel },
		{ value: "consultation", label: t.consultationLabel },
	];

	const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
		setValues((prev) => ({ ...prev, [key]: value }));
		setErrors((prev) => ({ ...prev, [key]: undefined }));
	};

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		const nextErrors = validate(values);
		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			return;
		}

		setStatus("submitting");
		try {
			const res = await fetch("/api/contact-submissions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: values.name.trim(),
					email: values.email.trim(),
					phone: values.phone.trim() || undefined,
					service: values.service,
					message: values.message.trim(),
				}),
			});
			if (!res.ok) throw new Error(`Request failed: ${res.status}`);
			setStatus("success");
			setValues(INITIAL);
		} catch {
			setStatus("error");
		}
	}

	if (status === "success") {
		return (
			<motion.div
				initial={reduce ? false : { opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex h-full flex-col items-start justify-center rounded-2xl bg-zinc-50 p-8 dark:bg-white/5"
			>
				<CheckCircle
					size={44}
					weight="duotone"
					className="text-brand-700 dark:text-brand-300"
					aria-hidden
				/>
				<h3 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
					{t.successTitle}
				</h3>
				<p className="mt-2 max-w-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
					{t.successText}
				</p>
			</motion.div>
		);
	}

	return (
		<form onSubmit={handleSubmit} noValidate>
			<div className="grid gap-5 sm:grid-cols-2">
				<div className="flex flex-col gap-2">
					<label
						htmlFor="cf-name"
						className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
					>
						{t.nameLabel}
					</label>
					<input
						id="cf-name"
						type="text"
						autoComplete="name"
						value={values.name}
						disabled={status === "submitting"}
						onChange={(e) => update("name", e.target.value)}
						aria-invalid={Boolean(errors.name)}
						aria-describedby={errors.name ? "cf-name-error" : undefined}
						className={fieldClass(Boolean(errors.name))}
					/>
					{errors.name && (
						<p
							id="cf-name-error"
							className="text-sm text-red-600 dark:text-red-400"
						>
							{errors.name}
						</p>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="cf-email"
						className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
					>
						{t.emailLabel}
					</label>
					<input
						id="cf-email"
						type="email"
						autoComplete="email"
						value={values.email}
						disabled={status === "submitting"}
						onChange={(e) => update("email", e.target.value)}
						aria-invalid={Boolean(errors.email)}
						aria-describedby={errors.email ? "cf-email-error" : undefined}
						className={fieldClass(Boolean(errors.email))}
						placeholder="name@beispiel.de"
					/>
					{errors.email && (
						<p
							id="cf-email-error"
							className="text-sm text-red-600 dark:text-red-400"
						>
							{errors.email}
						</p>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="cf-phone"
						className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
					>
						{t.phoneLabel}
					</label>
					<input
						id="cf-phone"
						type="tel"
						autoComplete="tel"
						value={values.phone}
						disabled={status === "submitting"}
						onChange={(e) => update("phone", e.target.value)}
						className={fieldClass(false)}
						placeholder="+49 …"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="cf-service"
						className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
					>
						{t.topicLabel}
					</label>
					<select
						id="cf-service"
						value={values.service}
						disabled={status === "submitting"}
						onChange={(e) => update("service", e.target.value)}
						className={fieldClass(false)}
					>
						{serviceOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="mt-5 flex flex-col gap-2">
				<label
					htmlFor="cf-message"
					className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
				>
					{t.messageLabel}
				</label>
				<textarea
					id="cf-message"
					rows={5}
					value={values.message}
					disabled={status === "submitting"}
					onChange={(e) => update("message", e.target.value)}
					aria-invalid={Boolean(errors.message)}
					aria-describedby={errors.message ? "cf-message-error" : undefined}
					className={`${fieldClass(Boolean(errors.message))} resize-none`}
				/>
				{errors.message && (
					<p
						id="cf-message-error"
						className="text-sm text-red-600 dark:text-red-400"
					>
						{errors.message}
					</p>
				)}
			</div>

			<div className="mt-5 flex flex-col gap-2">
				<label className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
					<input
						type="checkbox"
						checked={values.consent}
						disabled={status === "submitting"}
						onChange={(e) => update("consent", e.target.checked)}
						aria-invalid={Boolean(errors.consent)}
						className="mt-0.5 h-5 w-5 shrink-0 rounded border-zinc-300 accent-brand-700 focus:ring-2 focus:ring-brand-700/20 dark:border-white/20 dark:accent-brand-400"
					/>
					<span>
						{t.consentText}{" "}
						<a
							href="/datenschutz"
							className="font-medium text-brand-700 underline-offset-2 hover:underline dark:text-brand-300"
						>
							Datenschutz
						</a>
					</span>
				</label>
				{errors.consent && (
					<p className="text-sm text-red-600 dark:text-red-400">
						{errors.consent}
					</p>
				)}
			</div>

			<AnimatePresence>
				{status === "error" && (
					<motion.div
						initial={reduce ? false : { opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="mt-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
					>
						<WarningCircle
							size={20}
							weight="bold"
							className="mt-px shrink-0"
							aria-hidden
						/>
						<span>{t.errorText}</span>
					</motion.div>
				)}
			</AnimatePresence>

			<motion.button
				type="submit"
				disabled={status === "submitting"}
				whileTap={reduce ? undefined : { scale: 0.98 }}
				className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
			>
				{status === "submitting" ? (
					<>
						<CircleNotch
							size={18}
							weight="bold"
							className="animate-spin"
							aria-hidden
						/>
						{t.sendingLabel}
					</>
				) : (
					<>
						{t.submitLabel}
						<ArrowUpRight size={18} weight="bold" aria-hidden />
					</>
				)}
			</motion.button>
		</form>
	);
}

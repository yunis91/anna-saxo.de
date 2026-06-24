import type { GlobalConfig } from "payload";

/**
 * Editor-controlled contact details, shown in the navbar, hero, contact section
 * and footer, and used as the notification recipient for the contact form.
 */
export const SiteSettings: GlobalConfig = {
	slug: "site-settings",
	label: "Website-Einstellungen",
	access: { read: () => true },
	admin: { group: "Einstellungen" },
	fields: [
		{
			name: "brand",
			type: "group",
			label: "Marke",
			fields: [
				{
					name: "name",
					type: "text",
					label: "Seitenname",
					defaultValue: "Anna Saxo",
					admin: {
						description: "Wird im Navigationslogo und im Footer angezeigt.",
					},
				},
			],
		},
		{
			name: "nav",
			type: "array",
			label: "Navigationsmenü",
			localized: true,
			labels: { singular: "Menüpunkt", plural: "Menüpunkte" },
			admin: {
				description:
					"#anker für Abschnitte (z. B. #leistungen) oder /slug für Unterseiten. Wenn leer, wird das Standardmenü verwendet.",
			},
			fields: [
				{ name: "label", type: "text", label: "Beschriftung", required: true },
				{ name: "link", type: "text", label: "Link", required: true },
			],
		},
		{
			name: "footerLegal",
			type: "array",
			label: "Footer-Links (rechtliches)",
			labels: { singular: "Link", plural: "Links" },
			admin: {
				description:
					"Links im Footer (z. B. Impressum, Datenschutz). Wenn leer, werden Impressum und Datenschutz angezeigt.",
			},
			fields: [
				{ name: "label", type: "text", label: "Beschriftung", required: true },
				{ name: "link", type: "text", label: "Link", required: true },
			],
		},
		{
			type: "group",
			name: "contact",
			label: "Kontaktdaten",
			fields: [
				{
					name: "phone",
					type: "text",
					label: "Telefon",
					defaultValue: "+49 151 5384 7012",
				},
				{
					name: "email",
					type: "email",
					label: "E-Mail",
					defaultValue: "hallo@anna-saxo.de",
				},
				{ name: "city", type: "text", label: "Ort", defaultValue: "Berlin" },
			],
		},
		{
			name: "seo",
			type: "group",
			label: "SEO (Standardwerte)",
			admin: {
				description:
					"Fallback-Werte, wenn eine Seite keine eigenen SEO-Angaben hat.",
			},
			fields: [
				{
					name: "titleSuffix",
					type: "text",
					label: "Titel-Zusatz",
					defaultValue: "Anna Saxo",
					admin: {
						description:
							"Wird an den Seitentitel angehängt, z. B. „Datenschutz | Anna Saxo“.",
					},
				},
				{
					name: "defaultDescription",
					type: "textarea",
					label: "Standard-Beschreibung",
					localized: true,
					defaultValue:
						"Persönliche Versicherungsberatung in Deutschland und Übersetzungen Deutsch-Russisch. Klar, ehrlich und zweisprachig.",
				},
				{
					name: "defaultImage",
					type: "upload",
					label: "Standard OG-Bild",
					relationTo: "media",
				},
				{
					name: "googleSiteVerification",
					type: "text",
					label: "Google Search Console — Verifizierung",
					admin: {
						description:
							"Inhalt des content-Attributs des Verifizierungs-Meta-Tags.",
					},
				},
			],
		},
		{
			name: "analytics",
			type: "group",
			label: "Analytics",
			fields: [
				{
					name: "gaId",
					type: "text",
					label: "Google Analytics 4 — Mess-ID",
					admin: {
						description:
							"Format: G-XXXXXXXXXX. Leer = kein Tracking. Wird erst nach Cookie-Zustimmung geladen.",
					},
				},
			],
		},
	],
};

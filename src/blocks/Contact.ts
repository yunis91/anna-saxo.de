import type { Block } from 'payload'

const L = (name: string, label: string, defaultValue: string) =>
  ({ name, type: 'text' as const, label, localized: true, defaultValue })

/** "Kontakt" module: heading + intro + localized form labels. Contact details
    (phone/email/city) come from the site config. The form posts to Payload. */
export const ContactBlock: Block = {
  slug: 'contact',
  labels: { singular: 'Kontakt', plural: 'Kontakt-Blöcke' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      required: true,
      localized: true,
      defaultValue: 'Schreiben Sie mir',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
      localized: true,
      defaultValue:
        'Erzählen Sie kurz, worum es geht. Ich melde mich persönlich bei Ihnen, auf Deutsch oder auf Russisch.',
    },
    {
      type: 'group',
      name: 'form',
      label: 'Formular-Beschriftungen',
      fields: [
        L('nameLabel', 'Name', 'Name'),
        L('emailLabel', 'E-Mail', 'E-Mail'),
        L('phoneLabel', 'Telefon', 'Telefon'),
        L('topicLabel', 'Thema', 'Thema'),
        L('messageLabel', 'Nachricht', 'Nachricht'),
        L('insuranceLabel', 'Option: Versicherung', 'Versicherung'),
        L('translationLabel', 'Option: Übersetzung', 'Übersetzung'),
        L('consultationLabel', 'Option: Beratung', 'Beratung'),
        L('consentText', 'Einwilligungstext', 'Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert werden.'),
        L('submitLabel', 'Button: Senden', 'Nachricht senden'),
        L('sendingLabel', 'Button: Wird gesendet', 'Wird gesendet…'),
        L('successTitle', 'Erfolg: Titel', 'Vielen Dank für Ihre Nachricht'),
        L('successText', 'Erfolg: Text', 'Ihre Anfrage ist angekommen. Ich melde mich so schnell wie möglich bei Ihnen, in der Regel innerhalb eines Werktags.'),
        L('errorText', 'Fehlertext', 'Da ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie mir direkt.'),
      ],
    },
  ],
}

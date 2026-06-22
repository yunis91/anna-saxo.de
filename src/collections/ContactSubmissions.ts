import type { CollectionConfig } from 'payload'

const SERVICE_LABELS: Record<string, string> = {
  insurance: 'Versicherung',
  translation: 'Übersetzung',
  consultation: 'Beratung',
}

/**
 * Stores messages sent from the public contact form.
 * Anyone may create (the form is public); only authenticated admins may read/delete.
 * On create, a notification email is sent via the configured adapter (Resend).
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Anfrage',
    plural: 'Anfragen',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'createdAt'],
    group: 'Anna Saxo',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'service',
      type: 'select',
      defaultValue: 'insurance',
      options: [
        { label: 'Versicherung', value: 'insurance' },
        { label: 'Übersetzung', value: 'translation' },
        { label: 'Beratung', value: 'consultation' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        try {
          let recipient = process.env.CONTACT_RECIPIENT
          if (!recipient) {
            const settings = await req.payload.findGlobal({ slug: 'site-settings' })
            recipient = settings?.contact?.email || 'hallo@anna-saxo.de'
          }

          const text = [
            `Name: ${doc.name}`,
            `E-Mail: ${doc.email}`,
            doc.phone ? `Telefon: ${doc.phone}` : null,
            `Thema: ${SERVICE_LABELS[doc.service] || doc.service || '-'}`,
            '',
            'Nachricht:',
            doc.message || '(keine)',
          ]
            .filter((line) => line !== null)
            .join('\n')

          await req.payload.sendEmail({
            to: recipient,
            replyTo: doc.email,
            subject: `Neue Anfrage von ${doc.name}`,
            text,
          })
        } catch (err) {
          req.payload.logger.error({ msg: 'Anfrage-E-Mail konnte nicht gesendet werden', err })
        }
      },
    ],
  },
}

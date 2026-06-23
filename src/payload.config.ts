import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Pages } from './collections/Pages'
import { LanguageSettings } from './globals/LanguageSettings'
import { SiteSettings } from './globals/SiteSettings'
import { LOCALES, DEFAULT_LOCALE } from './lib/locales'

// Resend (HTTP API) for transactional email. Without a key, Payload logs emails
// to the console (fine for local dev).
const email = process.env.RESEND_API_KEY
  ? resendAdapter({
      apiKey: process.env.RESEND_API_KEY,
      defaultFromAddress: process.env.EMAIL_FROM || 'noreply@anna-saxo.de',
      defaultFromName: 'Anna Saxo Website',
    })
  : undefined

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Anna Saxo Admin',
    },
  },
  collections: [Users, Media, ContactSubmissions, Pages],
  globals: [LanguageSettings, SiteSettings],
  email,
  localization: {
    locales: LOCALES.map((l) => ({ label: l.label, code: l.code })),
    defaultLocale: DEFAULT_LOCALE,
    fallback: true,
  },
  editor: lexicalEditor(),
  plugins: [
    // Medien in Vercel Blob speichern statt im (auf Vercel flüchtigen)
    // Dateisystem. clientUploads: Browser lädt direkt zu Blob hoch und
    // umgeht so das 4,5-MB-Limit der Serverless-Funktion.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
      // Eindeutige Dateinamen vergeben, sonst schlägt das erneute Hochladen
      // einer gleichnamigen Datei mit "blob already exists" (400) fehl.
      addRandomSuffix: true,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})

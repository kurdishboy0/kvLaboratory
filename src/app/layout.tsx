import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'
import { AuthProvider } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Kurdish Virtual Laboratory',
  description: 'The first Kurdish online virtual laboratory platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ku" dir="rtl">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <I18nProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
}

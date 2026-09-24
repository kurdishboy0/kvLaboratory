'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'

export default function LoginPage() {
  const { t } = useTranslation()
  const { login, user } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // If already logged in, redirect
  if (user) {
    if (user.role === 'instructor') {
      router.push('/instructor/dashboard')
    } else {
      router.push('/dashboard')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = login(email, password)

      if (!result) {
        setError(t('login.invalidCredentials'))
        setLoading(false)
        return
      }

      if (result.role === 'instructor') {
        router.push('/instructor/dashboard')
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError(t('login.error'))
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-16">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <Card className="border border-gray-200 p-8 shadow-xl sm:p-10">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-3xl">
                🔐
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                {t('login.title')}
              </h1>
              <p className="text-sm text-gray-500">
                {t('login.subtitle')}
              </p>
            </div>

            {error && (
              <Alert type="error" message={error} className="mb-6" />
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t('login.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  placeholder={t('login.emailPlaceholder')}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t('login.password')}
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  placeholder={t('login.passwordPlaceholder')}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full bg-teal-600 py-2.5 hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? t('login.loggingIn') : t('login.loginButton')}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              {t('login.noAccount')}{' '}
              <Link href="/register" className="font-semibold text-teal-600 hover:text-teal-700">
                {t('login.registerLink')}
              </Link>
            </div>
          </Card>

          {/* Demo Credentials */}
          <Card className="mt-6 border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-3 text-sm font-bold text-blue-800">
              {t('login.demoCredentials')}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="rounded-lg bg-white p-3">
                <p className="mb-1 font-semibold text-gray-700">
                  👨‍🎓 {t('login.demoStudent')}
                </p>
                <p className="text-gray-500">
                  {t('login.email')}: student@demo.com
                </p>
                <p className="text-gray-500">
                  {t('login.password')}: demo123
                </p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="mb-1 font-semibold text-gray-700">
                  👨‍🏫 {t('login.demoInstructor')}
                </p>
                <p className="text-gray-500">
                  {t('login.email')}: instructor@demo.com
                </p>
                <p className="text-gray-500">
                  {t('login.password')}: demo123
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

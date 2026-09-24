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
import type { UserRole } from '@/types'

export default function RegisterPage() {
  const { t } = useTranslation()
  const { register, user } = useAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<UserRole>('student')
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

    // Validation
    if (password.length < 6) {
      setError(t('register.passwordTooShort'))
      return
    }

    if (password !== confirmPassword) {
      setError(t('register.passwordMismatch'))
      return
    }

    setLoading(true)

    try {
      const result = register(name, email, password, role)

      if (!result) {
        setError(t('register.emailTaken'))
        setLoading(false)
        return
      }

      if (result.role === 'instructor') {
        router.push('/instructor/dashboard')
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError(t('register.error'))
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-16">
        <div className="w-full max-w-md">
          <Card className="border border-gray-200 p-8 shadow-xl sm:p-10">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-3xl">
                📝
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                {t('register.title')}
              </h1>
              <p className="text-sm text-gray-500">
                {t('register.subtitle')}
              </p>
            </div>

            {error && (
              <Alert type="error" message={error} className="mb-6" />
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t('register.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  placeholder={t('register.namePlaceholder')}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t('register.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  placeholder={t('register.emailPlaceholder')}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t('register.password')}
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  placeholder={t('register.passwordPlaceholder')}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t('register.confirmPassword')}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  placeholder={t('register.confirmPasswordPlaceholder')}
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t('register.role')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                      role === 'student'
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg">👨‍🎓</span>
                    {t('register.student')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('instructor')}
                    className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                      role === 'instructor'
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg">👨‍🏫</span>
                    {t('register.instructor')}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full bg-teal-600 py-2.5 hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? t('register.registering') : t('register.registerButton')}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              {t('register.hasAccount')}{' '}
              <Link href="/login" className="font-semibold text-teal-600 hover:text-teal-700">
                {t('register.loginLink')}
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

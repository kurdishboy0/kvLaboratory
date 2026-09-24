'use client'

import { useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { elisaExperiment } from '@/data/elisa-experiment'

export default function ElisaIntroductionPage() {
  const { t, locale } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-teal-600 to-blue-700 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-4 text-sm text-teal-200">
              <Link href="/lab/immunology" className="hover:text-white transition-colors">
                {t('lab.immunology.title')}
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white">{t('experiments.elisa.name')}</span>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl backdrop-blur-sm">
                🧪
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                  {elisaExperiment.name[locale]}
                </h1>
                <p className="mt-1 text-lg text-teal-100">
                  {t('experiments.elisa.fullName')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Introduction Text */}
            <Card className="mb-8 border border-gray-200 p-8 sm:p-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t('elisa.introductionTitle')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {elisaExperiment.introduction[locale]}
              </p>
            </Card>

            {/* Purpose, Principle, Sample Type */}
            <div className="mb-8 grid gap-6 sm:grid-cols-3">
              <Card className="border border-teal-100 bg-teal-50 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-200 text-xl">
                  🎯
                </div>
                <h3 className="mb-2 font-bold text-teal-900">
                  {t('elisa.purpose')}
                </h3>
                <p className="text-sm leading-relaxed text-teal-700">
                  {elisaExperiment.purpose?.[locale] || t('elisa.purposeDescription')}
                </p>
              </Card>

              <Card className="border border-blue-100 bg-blue-50 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-200 text-xl">
                  ⚙️
                </div>
                <h3 className="mb-2 font-bold text-blue-900">
                  {t('elisa.principle')}
                </h3>
                <p className="text-sm leading-relaxed text-blue-700">
                  {elisaExperiment.principle?.[locale] || t('elisa.principleDescription')}
                </p>
              </Card>

              <Card className="border border-indigo-100 bg-indigo-50 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-200 text-xl">
                  🩸
                </div>
                <h3 className="mb-2 font-bold text-indigo-900">
                  {t('elisa.sampleType')}
                </h3>
                <p className="text-sm leading-relaxed text-indigo-700">
                  {elisaExperiment.sampleType?.[locale] || t('elisa.sampleTypeDescription')}
                </p>
              </Card>
            </div>

            {/* Equipment & Materials */}
            <Card className="mb-8 border border-gray-200 p-8">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                {t('elisa.equipmentTitle')}
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {elisaExperiment.equipment.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-teal-50 hover:border-teal-200"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.name[locale]}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.function?.[locale]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/lab/immunology/elisa/procedure">
                <Button variant="primary" size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 px-10 py-3 text-lg font-semibold shadow-lg">
                  🧪 {t('elisa.startProcedure')}
                </Button>
              </Link>
              <Link href="/lab/immunology/elisa/ordering">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto border-2 border-teal-300 text-teal-700 hover:bg-teal-50 px-10 py-3 text-lg font-semibold">
                  🧩 {t('elisa.stepOrdering')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

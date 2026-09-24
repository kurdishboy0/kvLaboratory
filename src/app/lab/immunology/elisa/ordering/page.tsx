'use client'

import { useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import StepOrderingGame from '@/components/lab/StepOrderingGame'
import { elisaExperiment } from '@/data/elisa-experiment'

export default function ElisaOrderingPage() {
  const { t } = useTranslation()
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

      <main className="flex-1 bg-gray-50">
        {/* Header Breadcrumb */}
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/lab/immunology" className="hover:text-teal-600 transition-colors">
                {t('lab.immunology.title')}
              </Link>
              <span>›</span>
              <Link href="/lab/immunology/elisa" className="hover:text-teal-600 transition-colors">
                {t('experiments.elisa.name')}
              </Link>
              <span>›</span>
              <span className="font-medium text-gray-800">
                {t('elisa.ordering')}
              </span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              🧩 {t('elisa.orderingTitle')}
            </h1>
            <p className="mx-auto max-w-2xl text-gray-500">
              {t('elisa.orderingSubtitle')}
            </p>
          </div>

          {/* Step Ordering Game */}
          <StepOrderingGame steps={elisaExperiment.orderingSteps} />

          {/* Navigation */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/lab/immunology/elisa">
              <Button variant="secondary" className="px-8">
                ← {t('elisa.backToIntro')}
              </Button>
            </Link>
            <Link href="/lab/immunology/elisa/procedure">
              <Button variant="primary" className="bg-teal-600 hover:bg-teal-700 px-8">
                🧪 {t('elisa.startProcedure')}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

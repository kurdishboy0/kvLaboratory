'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import StepByStep from '@/components/lab/StepByStep'
import ExperimentResults from '@/components/lab/ExperimentResults'
import { elisaExperiment } from '@/data/elisa-experiment'
import { saveResult, getStudentAttemptCount } from '@/lib/storage'
import type { ExperimentResult } from '@/types'

export default function ElisaProcedurePage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()

  const [completed, setCompleted] = useState(false)
  const [result, setResult] = useState<ExperimentResult | null>(null)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const handleComplete = useCallback((resultFromComponent: ExperimentResult) => {
    if (!user) return

    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    const attempts = getStudentAttemptCount(user.id, 'elisa') + 1

    const experimentResult: ExperimentResult = {
      ...resultFromComponent,
      id: `result-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      experimentId: 'elisa',
      experimentName: t('elisa.title'),
      attempts,
      timeSpent,
      status: 'completed',
      completedAt: new Date().toISOString(),
    }

    saveResult(experimentResult)
    setResult(experimentResult)
    setCompleted(true)
  }, [user, startTime, t])

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Minimal Navbar */}
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
                {t('elisa.procedure')}
              </span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {!completed ? (
            <>
              {/* Procedure Header */}
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                  🧪 {t('elisa.procedureTitle')}
                </h1>
                <p className="text-gray-500">
                  {t('elisa.procedureSubtitle')}
                </p>
              </div>

              {/* Step-by-Step Component */}
              <StepByStep
                steps={elisaExperiment.steps}
                experimentId="elisa"
                experimentName={t('elisa.title')}
                onComplete={handleComplete}
              />
            </>
          ) : (
            <>
              {/* Results */}
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                  🎉 {t('elisa.completed')}
                </h1>
                <p className="text-gray-500">
                  {t('elisa.completedDescription')}
                </p>
              </div>

              {result && (
                <ExperimentResults result={result} />
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/dashboard">
                  <Button variant="primary" className="bg-teal-600 hover:bg-teal-700 px-8">
                    📊 {t('elisa.goToDashboard')}
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCompleted(false)
                    setResult(null)
                  }}
                  className="border-teal-300 text-teal-700 hover:bg-teal-50 px-8"
                >
                  🔄 {t('elisa.retry')}
                </Button>
                <Link href="/lab/immunology/elisa">
                  <Button variant="secondary" className="px-8">
                    ← {t('elisa.backToIntro')}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

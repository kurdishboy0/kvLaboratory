'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import StudentStats from '@/components/dashboard/StudentStats'
import CertificateModal from '@/components/dashboard/CertificateModal'
import { getResultsByUser, getFeedbackForStudent } from '@/lib/storage'
import type { ExperimentResult, Feedback } from '@/types'

export default function StudentDashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()

  const [results, setResults] = useState<ExperimentResult[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [selectedCert, setSelectedCert] = useState<{name: string, score: number, date: string} | null>(null)

  useEffect(() => {
    if (!user || user.role !== 'student') {
      router.push('/login')
      return
    }

    const userResults = getResultsByUser(user.id)
    setResults(userResults)

    const userFeedback = getFeedbackForStudent(user.id)
    setFeedback(userFeedback)
  }, [user, router])

  if (!user || user.role !== 'student') {
    return null
  }

  const availableExperiments = [
    {
      id: 'elisa',
      icon: '🧬',
      name: t('experiments.elisa.name'),
      description: t('experiments.elisa.description'),
      lab: t('labs.immunology.name'),
      href: '/lab/immunology/elisa',
      active: true,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {t('dashboard.welcome')}, {user.name} 👋
            </h1>
            <p className="text-gray-500">
              {t('dashboard.subtitle')}
            </p>
          </div>

          {/* Stats Section */}
          <div className="mb-10">
            <StudentStats results={results} />
          </div>

          {/* Available Experiments */}
          <div className="mb-10">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {t('dashboard.availableExperiments')}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {availableExperiments.map((experiment) => {
                const experimentResults = results.filter(
                  (r) => r.experimentId === experiment.id
                )
                const bestScore = experimentResults.length > 0
                  ? Math.max(...experimentResults.map((r) => r.score))
                  : null

                return (
                  <Card key={experiment.id} className="border border-gray-200 p-6 transition-shadow duration-200 hover:shadow-lg">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-2xl">
                        {experiment.icon}
                      </div>
                      {bestScore !== null && (
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          bestScore >= 80
                            ? 'bg-green-100 text-green-700'
                            : bestScore >= 50
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {t('dashboard.bestScore')}: {bestScore}%
                        </span>
                      )}
                    </div>

                    <h3 className="mb-1 text-lg font-bold text-gray-900">
                      {experiment.name}
                    </h3>
                    <p className="mb-1 text-xs text-teal-600 font-medium">
                      {experiment.lab}
                    </p>
                    <p className="mb-5 text-sm text-gray-500">
                      {experiment.description}
                    </p>

                  {experimentResults.length > 0 && (
                    <p className="mb-4 text-xs text-gray-400">
                      {t('dashboard.attempts')}: {experimentResults.length}
                    </p>
                  )}

                  <div className="space-y-3">
                    <Link href={experiment.href} className="block w-full">
                      <Button variant="primary" className="w-full bg-teal-600 hover:bg-teal-700">
                        {experimentResults.length > 0
                          ? t('dashboard.retryExperiment')
                          : t('dashboard.startExperiment')}
                      </Button>
                    </Link>
                    
                    {bestScore !== null && bestScore >= 80 && (
                      <Button 
                        variant="secondary" 
                        className="w-full border-2 border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                        onClick={() => {
                          const bestResult = experimentResults.reduce((prev, current) => (prev.score > current.score) ? prev : current);
                          setSelectedCert({
                            name: experiment.name,
                            score: bestScore,
                            date: bestResult.completedAt
                          });
                        }}
                      >
                        ðŸŽ“ View Certificate
                      </Button>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Certificate Modal */}
        {selectedCert && (
          <CertificateModal 
            user={user}
            experimentName={selectedCert.name}
            bestScore={selectedCert.score}
            date={selectedCert.date}
            onClose={() => setSelectedCert(null)}
          />
        )}

          {/* Instructor Feedback */}
          {feedback.length > 0 && (
            <div>
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                {t('dashboard.feedback')}
              </h2>

              <div className="space-y-4">
                {feedback.map((fb) => (
                  <Card key={fb.id} className="border border-blue-100 bg-blue-50 p-5">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-sm">
                        👨‍🏫
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-900">
                          {fb.instructorName}
                        </p>
                        <p className="text-xs text-blue-500">
                          {new Date(fb.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-blue-800">
                      {fb.message}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

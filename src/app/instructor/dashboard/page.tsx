'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import InstructorTable from '@/components/dashboard/InstructorTable'
import { getAllStudentResults, saveFeedback } from '@/lib/storage'
import type { User, ExperimentResult } from '@/types'

interface StudentData {
  user: User
  results: ExperimentResult[]
}

export default function InstructorDashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()

  const [studentData, setStudentData] = useState<StudentData[]>([])

  useEffect(() => {
    if (!user || user.role !== 'instructor') {
      router.push('/login')
      return
    }

    const data = getAllStudentResults()
    setStudentData(data)
  }, [user, router])

  if (!user || user.role !== 'instructor') {
    return null
  }

  // Calculate summary stats
  const totalStudents = studentData.length
  const allResults = studentData.flatMap((sd) => sd.results)
  const averageScore = allResults.length > 0
    ? Math.round(allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length)
    : 0
  const completedResults = allResults.filter((r) => r.status === 'completed')
  const completionRate = allResults.length > 0
    ? Math.round((completedResults.length / allResults.length) * 100)
    : 0

  const handleSendFeedback = (studentId: string, resultId: string, message: string) => {
    if (!message.trim()) return

    saveFeedback({
      id: Date.now().toString(),
      studentId,
      resultId,
      instructorId: user.id,
      instructorName: user.name,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    })
  }

  const summaryCards = [
    {
      icon: '👥',
      label: t('instructor.totalStudents'),
      value: totalStudents,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: '📊',
      label: t('instructor.averageScore'),
      value: `${averageScore}%`,
      color: 'bg-teal-100 text-teal-700',
    },
    {
      icon: '✅',
      label: t('instructor.completionRate'),
      value: `${completionRate}%`,
      color: 'bg-green-100 text-green-700',
    },
    {
      icon: '📝',
      label: t('instructor.totalAttempts'),
      value: allResults.length,
      color: 'bg-purple-100 text-purple-700',
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
              {t('instructor.welcome')}, {user.name} 👨‍🏫
            </h1>
            <p className="text-gray-500">
              {t('instructor.subtitle')}
            </p>
          </div>

          {/* Summary Stats */}
          <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card, index) => (
              <Card key={index} className="border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${card.color}`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{card.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Student Results Table */}
          <div className="mb-10">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {t('instructor.studentResults')}
            </h2>

            {studentData.length > 0 ? (
              <InstructorTable
                studentData={studentData}
                onSendFeedback={handleSendFeedback}
              />
            ) : (
              <Card className="border border-gray-200 p-12 text-center">
                <div className="mb-4 text-5xl">📭</div>
                <p className="text-lg font-medium text-gray-500">
                  {t('instructor.noStudents')}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  {t('instructor.noStudentsDescription')}
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

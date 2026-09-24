'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import LabBench from '@/components/lab/LabBench'
import { EquipmentInfoModal } from '@/components/lab/EquipmentInfoModal'
import { elisaExperiment } from '@/data/elisa-experiment'

import type { Equipment } from '@/types'

export default function ImmunologyLabPage() {
  const { t, locale } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [showEquipmentModal, setShowEquipmentModal] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleEquipmentClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setShowEquipmentModal(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-teal-600 to-blue-700 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl backdrop-blur-sm">
                🧬
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                  {t('lab.immunology.title')}
                </h1>
                <p className="mt-1 text-lg text-teal-100">
                  {t('lab.immunology.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lab Bench */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {t('lab.equipment')}
            </h2>

            <LabBench
              equipment={elisaExperiment.equipment}
              onEquipmentClick={handleEquipmentClick}
            />
          </div>
        </section>

        {/* Available Experiments */}
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {t('lab.availableExperiments')}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* ELISA Experiment Card */}
              <Card className="overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-3xl backdrop-blur-sm">
                    🧪
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {elisaExperiment.name[locale]}
                  </h3>
                  <p className="mt-1 text-sm text-teal-100">
                    Immunology
                  </p>
                </div>

                <div className="p-6">
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">
                    {elisaExperiment.description?.[locale] || t('experiments.elisa.description')}
                  </p>

                  <div className="mb-6 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      ⏱️ 30-45 {t('lab.minutes')}
                    </span>
                    <span className="flex items-center gap-1">
                      📋 {elisaExperiment.steps?.length || 0} {t('lab.steps')}
                    </span>
                  </div>

                  <Link href="/lab/immunology/elisa">
                    <Button variant="primary" className="w-full bg-teal-600 hover:bg-teal-700">
                      {t('lab.viewExperiment')}
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* More experiments coming soon */}
              <Card className="flex flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                <div className="mb-4 text-5xl opacity-40">🔬</div>
                <p className="font-medium text-gray-400">
                  {t('lab.moreExperiments')}
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {t('labs.comingSoon')}
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Equipment Info Modal */}
      {selectedEquipment && (
        <EquipmentInfoModal
          equipment={selectedEquipment}
          isOpen={showEquipmentModal}
          onClose={() => setShowEquipmentModal(false)}
        />
      )}

      <Footer />
    </div>
  )
}

'use client'

import { useTranslation } from '@/lib/i18n'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface LabItem {
  id: string
  icon: string
  nameKey: string
  descriptionKey: string
  href: string
  active: boolean
}

export default function LaboratoriesPage() {
  const { t } = useTranslation()

  const labs: LabItem[] = [
    {
      id: 'immunology',
      icon: '🧬',
      nameKey: 'labs.immunology.name',
      descriptionKey: 'labs.immunology.description',
      href: '/lab/immunology',
      active: true,
    },
    {
      id: 'microbiology',
      icon: '🦠',
      nameKey: 'labs.microbiology.name',
      descriptionKey: 'labs.microbiology.description',
      href: '#',
      active: false,
    },
    {
      id: 'biochemistry',
      icon: '⚗️',
      nameKey: 'labs.biochemistry.name',
      descriptionKey: 'labs.biochemistry.description',
      href: '#',
      active: false,
    },
    {
      id: 'genetics',
      icon: '🧫',
      nameKey: 'labs.genetics.name',
      descriptionKey: 'labs.genetics.description',
      href: '#',
      active: false,
    },
    {
      id: 'anatomy',
      icon: '🫀',
      nameKey: 'labs.anatomy.name',
      descriptionKey: 'labs.anatomy.description',
      href: '#',
      active: false,
    },
    {
      id: 'pharmacology',
      icon: '💊',
      nameKey: 'labs.pharmacology.name',
      descriptionKey: 'labs.pharmacology.description',
      href: '#',
      active: false,
    },
    {
      id: 'hematology',
      icon: '🩸',
      nameKey: 'labs.hematology.name',
      descriptionKey: 'labs.hematology.description',
      href: '/lab/hematology',
      active: true,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-teal-600 to-blue-700 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
                {t('labs.title')}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-teal-100">
                {t('labs.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Labs Grid */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {labs.map((lab) => (
                <Card
                  key={lab.id}
                  className={`relative overflow-hidden border p-8 transition-all duration-300 ${
                    lab.active
                      ? 'border-teal-200 bg-white hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  {/* Coming Soon Badge */}
                  {!lab.active && (
                    <div className="absolute top-4 end-4">
                      <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
                        {t('labs.comingSoon')}
                      </span>
                    </div>
                  )}

                  {/* Active Badge */}
                  {lab.active && (
                    <div className="absolute top-4 end-4">
                      <span className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                        <span className="me-1.5 h-2 w-2 rounded-full bg-teal-500 inline-block" />
                        {t('labs.active')}
                      </span>
                    </div>
                  )}

                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-blue-100 text-4xl">
                    {lab.icon}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {t(lab.nameKey)}
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed text-gray-600">
                    {t(lab.descriptionKey)}
                  </p>

                  {lab.active ? (
                    <Link href={lab.href}>
                      <Button variant="primary" className="w-full bg-teal-600 hover:bg-teal-700">
                        {t('labs.enterLab')}
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="secondary" disabled className="w-full cursor-not-allowed opacity-50">
                      {t('labs.comingSoon')}
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

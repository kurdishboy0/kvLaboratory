'use client'

import { useTranslation } from '@/lib/i18n'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'

export default function AboutPage() {
  const { t } = useTranslation()

  const goals = [
    t('about.goals.goal1'),
    t('about.goals.goal2'),
    t('about.goals.goal3'),
    t('about.goals.goal4'),
    t('about.goals.goal5'),
    t('about.goals.goal6'),
  ]

  const teamMembers = [
    { 
      image: '/images/team/ahmed.jpg', 
      role: t('about.team.lead'), 
      name: t('about.team.leadName'),
      linkedin: 'https://www.linkedin.com/in/ahmed-bradosty-190b7917a?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
    },
    { 
      image: '/images/team/kasya.jpg', 
      role: t('about.team.advisor'), 
      name: t('about.team.advisorName'),
      linkedin: 'https://www.linkedin.com/in/kasya-aswad-1a8bb3294?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
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
                {t('about.title')}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-teal-100">
                {t('about.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 text-4xl">
                🎯
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                {t('about.missionTitle')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {t('about.missionDescription')}
              </p>
            </div>

            {/* Description */}
            <Card className="mb-16 border border-teal-100 bg-gradient-to-br from-teal-50 to-blue-50 p-8 sm:p-10">
              <p className="text-lg leading-relaxed text-gray-700">
                {t('about.description')}
              </p>
            </Card>
          </div>
        </section>

        {/* Goals Section */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                {t('about.goalsTitle')}
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                {t('about.goalsSubtitle')}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {goals.map((goal, index) => (
                <Card key={index} className="flex items-start gap-4 border border-gray-100 p-6 transition-shadow duration-200 hover:shadow-lg">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-800">{goal}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                {t('about.teamTitle')}
              </h2>
            </div>

            <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
              {teamMembers.map((member, index) => (
                <a 
                  key={index} 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="h-full border border-gray-100 p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-teal-50 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                    <p className="text-md font-medium text-teal-600 mb-4">{member.role}</p>
                    
                    {/* LinkedIn Icon */}
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full transition-colors group-hover:bg-blue-100">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

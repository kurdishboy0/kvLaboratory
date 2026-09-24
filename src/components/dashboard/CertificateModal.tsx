'use client'

import React, { useRef } from 'react'
import { useTranslation } from '@/lib/i18n'
import type { User, ExperimentResult } from '@/types'

interface CertificateModalProps {
  user: User
  experimentName: string
  bestScore: number
  date: string
  onClose: () => void
}

export default function CertificateModal({ user, experimentName, bestScore, date, onClose }: CertificateModalProps) {
  const { t } = useTranslation()
  const certRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:bg-white print:p-0">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
        
        {/* Certificate Content */}
        <div ref={certRef} className="relative p-12 sm:p-20 text-center border-[16px] border-double border-teal-800 bg-teal-50/30 min-h-[500px] flex flex-col items-center justify-center print:border-[10px]">
          
          <div className="absolute top-10 left-10 text-6xl opacity-20">ðŸ”¬</div>
          <div className="absolute bottom-10 right-10 text-6xl opacity-20">ðŸ§ª</div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-teal-900 mb-2">
            Certificate of Completion
          </h1>
          <p className="text-teal-700 tracking-widest uppercase text-sm mb-12">
            Kurdish Virtual Laboratory
          </p>

          <p className="text-gray-600 text-lg mb-4">
            This is to certify that
          </p>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-2 border-teal-200 pb-2 mb-8 px-12 inline-block">
            {user.name}
          </h2>

          <p className="text-gray-600 text-lg mb-4">
            has successfully completed the virtual experiment:
          </p>

          <h3 className="text-2xl font-bold text-teal-800 mb-8">
            {experimentName}
          </h3>

          <div className="flex items-center justify-center gap-12 mt-4 text-gray-600">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{bestScore}%</p>
              <p className="text-xs uppercase tracking-wider">Score Achieved</p>
            </div>
            <div className="h-12 w-px bg-teal-200"></div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{new Date(date).toLocaleDateString()}</p>
              <p className="text-xs uppercase tracking-wider">Date of Completion</p>
            </div>
          </div>

          <div className="mt-16 flex justify-between w-full px-12 items-end">
            <div className="text-center border-t border-gray-400 pt-2 w-40">
              <p className="font-signature text-xl text-gray-800 mb-1">Dr. Ahmed</p>
              <p className="text-xs text-gray-500">Project Lead</p>
            </div>
            
            <div className="w-24 h-24 border-4 border-yellow-500 rounded-full flex items-center justify-center bg-yellow-50 shadow-inner relative">
              <div className="absolute inset-1 border-2 border-dashed border-yellow-400 rounded-full"></div>
              <span className="font-serif font-bold text-yellow-700 text-center text-xs">
                VERIFIED<br/>EXCELLENCE
              </span>
            </div>

            <div className="text-center border-t border-gray-400 pt-2 w-40">
              <p className="font-signature text-xl text-gray-800 mb-1">Prof. Sarah</p>
              <p className="text-xs text-gray-500">Scientific Advisor</p>
            </div>
          </div>
        </div>

        {/* Action Bar (hidden in print) */}
        <div className="bg-gray-50 p-4 flex justify-end gap-4 border-t border-gray-200 print:hidden">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            {t('common.close') || 'Close'}
          </button>
          <button 
            onClick={handlePrint}
            className="px-6 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors shadow-sm"
          >
            Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  )
}


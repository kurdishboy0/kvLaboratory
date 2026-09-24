'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { Equipment } from '@/types';
import { useTranslation } from '@/lib/i18n';

interface EquipmentInfoModalProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EquipmentInfoModal({ equipment, isOpen, onClose }: EquipmentInfoModalProps) {
  const { locale, t } = useTranslation();

  if (!equipment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={equipment.name[locale]}>
      <div className="space-y-6">
        <div className="flex justify-center p-6 bg-gray-50 rounded-xl border border-gray-100">
          <span className="text-6xl" role="img" aria-label={equipment.name[locale]}>
            {equipment.icon}
          </span>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {t('lab.equipment.function') || 'Function'}
          </h3>
          <p className="text-gray-800 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
            {equipment.function[locale]}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {t('lab.equipment.example') || 'Example Use'}
          </h3>
          <p className="text-gray-800 bg-gray-50 p-4 rounded-lg border border-gray-100">
            {equipment.example[locale]}
          </p>
        </div>
      </div>
    </Modal>
  );
}

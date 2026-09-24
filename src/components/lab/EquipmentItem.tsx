'use client';

import React from 'react';
import { Equipment } from '@/types';
import { useTranslation } from '@/lib/i18n';

interface EquipmentItemProps {
  equipment: Equipment;
  onClick: (equipment: Equipment) => void;
}

export function EquipmentItem({ equipment, onClick }: EquipmentItemProps) {
  const { locale } = useTranslation();

  return (
    <div 
      onClick={() => onClick(equipment)}
      className="equipment-hover group flex flex-col items-center justify-center p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 cursor-pointer transition-all hover:scale-105 hover:shadow-md hover:bg-white"
    >
      <div className="text-4xl mb-3 transition-transform group-hover:-translate-y-1">
        {equipment.icon}
      </div>
      <span className="text-sm font-medium text-gray-700 text-center line-clamp-2">
        {equipment.name[locale]}
      </span>
    </div>
  );
}

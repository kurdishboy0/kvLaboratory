'use client';

import React from 'react';
import { Equipment } from '@/types';
import { EquipmentItem } from './EquipmentItem';

interface LabBenchProps {
  equipment: Equipment[];
  onEquipmentClick: (equipment: Equipment) => void;
}

export function LabBench({ equipment, onEquipmentClick }: LabBenchProps) {
  return (
    <div className="w-full min-h-[400px] bg-gradient-to-b from-[#e5d3b3] to-[#c2a878] rounded-2xl shadow-inner p-8 relative overflow-hidden border-t-8 border-[#8b5a2b]">
      {/* Visual background elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-4 bg-black/5 pointer-events-none"></div>
      
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {equipment.map((item) => (
          <EquipmentItem 
            key={item.id} 
            equipment={item} 
            onClick={onEquipmentClick} 
          />
        ))}
      </div>
    </div>
  );
}

export default LabBench;

'use client';

import React from 'react';

interface ELISAPlateProps {
  onWellClick?: (wellId: string) => void;
  filledWells?: Set<string>;
  highlightedWell?: string | null;
  disabled?: boolean;
}

export function ELISAPlate({ 
  onWellClick, 
  filledWells = new Set(), 
  highlightedWell = null,
  disabled = false
}: ELISAPlateProps) {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="inline-block bg-gray-100 p-4 rounded-xl shadow-md border border-gray-300">
      <div className="flex mb-2">
        <div className="w-8"></div>
        {cols.map(c => (
          <div key={c} className="w-8 text-center text-xs font-semibold text-gray-500">
            {c}
          </div>
        ))}
      </div>
      
      {rows.map(r => (
        <div key={r} className="flex items-center mb-1">
          <div className="w-8 text-sm font-semibold text-gray-500">{r}</div>
          {cols.map(c => {
            const wellId = `${r}${c}`;
            const isFilled = filledWells.has(wellId);
            const isHighlighted = highlightedWell === wellId;
            
            return (
              <button
                key={wellId}
                disabled={disabled}
                onClick={() => onWellClick?.(wellId)}
                className={`
                  w-6 h-6 rounded-full mx-1 border-2 transition-all duration-200
                  ${isFilled ? 'bg-blue-500 border-blue-600' : 'bg-white border-gray-300'}
                  ${isHighlighted ? 'ring-2 ring-yellow-400 scale-110' : ''}
                  ${disabled ? 'cursor-not-allowed opacity-80' : 'hover:border-blue-400 cursor-pointer'}
                `}
                aria-label={`Well ${wellId}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

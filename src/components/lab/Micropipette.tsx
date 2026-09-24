'use client';

import React from 'react';

interface MicropipetteProps {
  volume: number;
  showTip?: boolean;
}

export function Micropipette({ volume, showTip = true }: MicropipetteProps) {
  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative">
        {/* Plunger */}
        <div className="w-8 h-12 bg-gray-300 rounded-t-lg mx-auto border-2 border-gray-400"></div>
        
        {/* Main Body */}
        <div className="w-12 h-32 bg-white border-2 border-gray-400 rounded-lg shadow-sm flex flex-col items-center justify-center relative z-10">
          <div className="bg-gray-100 px-2 py-1 border border-gray-300 rounded text-center w-3/4">
            <span className="font-mono font-bold text-lg text-blue-600">{volume}</span>
            <span className="text-[10px] block text-gray-500 leading-none mt-1">µL</span>
          </div>
        </div>
        
        {/* Ejector mechanism */}
        <div className="absolute right-0 top-16 w-2 h-24 bg-gray-300 border-r border-gray-400"></div>

        {/* Shaft */}
        <div className="w-4 h-20 bg-gray-200 mx-auto border-x border-gray-400"></div>
        
        {/* Tip (conditionally rendered) */}
        {showTip && (
          <div className="w-4 h-16 mx-auto">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[64px] border-t-blue-200 opacity-80"></div>
          </div>
        )}
      </div>
    </div>
  );
}

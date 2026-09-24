'use client';

import React, { useState, useEffect } from 'react';
import { OrderingStep } from '@/types';
import { useTranslation } from '@/lib/i18n';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';

interface StepOrderingGameProps {
  steps: OrderingStep[];
  onComplete?: () => void;
}

export function StepOrderingGame({ steps, onComplete }: StepOrderingGameProps) {
  const { locale } = useTranslation();
  const [items, setItems] = useState<OrderingStep[]>([]);
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initial shuffle
  useEffect(() => {
    const shuffled = [...steps].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, [steps]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('index'), 10);
    if (sourceIndex === targetIndex) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    
    setItems(newItems);
    setFeedback(null); // Clear feedback on move
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkOrder = () => {
    setAttempts(a => a + 1);
    let allCorrect = true;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].correctOrder !== i + 1) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      setIsSuccess(true);
      setFeedback({ type: 'success', message: 'Perfect! All steps are in the correct order.' });
      if (onComplete) {
        setTimeout(onComplete, 2000); // Call onComplete after showing success message
      }
    } else {
      setFeedback({ type: 'error', message: 'Some steps are incorrect. Try again!' });
    }
  };

  const resetOrder = () => {
    const shuffled = [...steps].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setFeedback(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Drag and Drop Steps into Correct Order</h3>
        
        <div className="space-y-3 mb-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable={!isSuccess}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`p-4 border rounded-lg bg-gray-50 flex items-center gap-4 ${
                !isSuccess ? 'cursor-move hover:bg-gray-100 hover:border-blue-300' : ''
              } transition-colors`}
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full font-bold text-gray-500">
                {index + 1}
              </div>
              <div className="flex-grow font-medium text-gray-800">
                {item.text[locale]}
              </div>
              {!isSuccess && (
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {feedback && (
          <div className="mb-4">
            <Alert type={feedback.type} message={feedback.message} />
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Attempts: {attempts}</span>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={resetOrder} disabled={isSuccess}>
              Reset
            </Button>
            <Button onClick={checkOrder} disabled={isSuccess}>
              Check Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepOrderingGame;

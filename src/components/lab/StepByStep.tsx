'use client';

import React, { useState, useEffect } from 'react';
import { ExperimentStep, ExperimentResult, Mistake } from '@/types';
import { useTranslation } from '@/lib/i18n';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Alert } from '../ui/Alert';

interface StepByStepProps {
  steps: ExperimentStep[];
  experimentId: string;
  experimentName: string;
  onComplete: (result: ExperimentResult) => void;
}

export function StepByStep({ steps, experimentId, experimentName, onComplete }: StepByStepProps) {
  const { locale, t } = useTranslation();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  // Tracking
  const [correctSteps, setCorrectSteps] = useState(0);
  const [incorrectSteps, setIncorrectSteps] = useState(0);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [startTime] = useState(new Date().toISOString());

  const currentStep = steps[currentStepIndex];
  const progress = ((currentStepIndex) / steps.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback && isCorrect) return; // Prevent clicking after correct answer before next step
    
    const option = currentStep.options.find(o => o.id === optionId);
    if (!option) return;

    setSelectedOption(optionId);
    setIsCorrect(option.correct);
    setShowFeedback(true);

    if (option.correct) {
      if (!showFeedback || !isCorrect) { // First time correct for this step
        setCorrectSteps(prev => prev + 1);
      }
    } else {
      setIncorrectSteps(prev => prev + 1);
      
      const correctOpt = currentStep.options.find(o => o.correct);
      setMistakes(prev => [...prev, {
        stepId: currentStep.id,
        selectedOptionId: optionId,
        correctOptionId: correctOpt?.id || '',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      // Complete experiment
      const timeSpentSeconds = Math.floor((new Date().getTime() - new Date(startTime).getTime()) / 1000);
      const score = Math.round((correctSteps / steps.length) * 100);
      
      onComplete({
        id: crypto.randomUUID(),
        userId: 'temp-user', // Will be filled by parent/auth
        userName: 'Student', // Will be filled
        experimentId,
        experimentName,
        score,
        correctSteps,
        incorrectSteps,
        totalSteps: steps.length,
        attempts: 1, // Basic attempt tracking
        timeSpent: timeSpentSeconds,
        mistakes,
        status: 'completed',
        completedAt: new Date().toISOString()
      });
    }
  };

  if (!currentStep) return null;

  const feedbackText = selectedOption 
    ? currentStep.options.find(o => o.id === selectedOption)?.feedback[locale] 
    : '';

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span>{t('lab.step')} {currentStepIndex + 1} / {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="step-enter">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentStep.title[locale]}</h2>
        
        <Card className="p-6 mb-6 bg-blue-50/50 border-blue-100">
          <p className="text-lg text-gray-800">{currentStep.instruction[locale]}</p>
          
          {currentStep.hint && (
            <div className="mt-4">
              {!showHint ? (
                <button 
                  onClick={() => setShowHint(true)}
                  className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Show Hint
                </button>
              ) : (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                  <span className="font-bold mr-2">Hint:</span>
                  {currentStep.hint[locale]}
                </div>
              )}
            </div>
          )}
        </Card>

        <div className="grid gap-4 mb-6">
          {currentStep.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={showFeedback && isCorrect}
              className={`p-4 rounded-lg border-2 text-start transition-all ${
                selectedOption === option.id
                  ? isCorrect 
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 bg-white'
              } ${showFeedback && isCorrect && selectedOption !== option.id ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-3">
                {option.icon && <span className="text-2xl">{option.icon}</span>}
                <span className="font-medium text-gray-900">{option.label[locale]}</span>
              </div>
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="mb-6 step-enter">
            <Alert 
              type={isCorrect ? 'success' : 'error'} 
              message={feedbackText || ''} 
            />
          </div>
        )}

        <div className="flex justify-end">
          <Button 
            onClick={handleNextStep}
            disabled={!showFeedback || !isCorrect}
            size="lg"
          >
            {currentStepIndex < steps.length - 1 ? 'Next Step' : 'Finish Experiment'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StepByStep;

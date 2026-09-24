'use client';

import React from 'react';
import { ExperimentResult } from '@/types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ExperimentResultsProps {
  result: ExperimentResult;
}

export function ExperimentResults({ result }: ExperimentResultsProps) {
  const getFeedbackMessage = (score: number) => {
    if (score >= 90) return { text: 'Excellent Work!', color: 'text-green-600' };
    if (score >= 70) return { text: 'Good Job!', color: 'text-blue-600' };
    if (score >= 50) return { text: 'Not Bad. Keep practicing!', color: 'text-yellow-600' };
    return { text: 'Needs Improvement.', color: 'text-red-600' };
  };

  const feedback = getFeedbackMessage(result.score);
  const minutes = Math.floor(result.timeSpent / 60);
  const seconds = result.timeSpent % 60;

  return (
    <div className="max-w-2xl mx-auto text-center step-enter">
      <Card className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Experiment Completed</h2>
        <p className="text-gray-500 mb-8">{result.experimentName}</p>

        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${
                  result.score >= 70 ? 'text-green-500' : result.score >= 50 ? 'text-yellow-500' : 'text-red-500'
                }`}
                strokeDasharray={`${result.score}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-900">{result.score}%</span>
              <span className="text-sm text-gray-500">Score</span>
            </div>
          </div>
        </div>

        <h3 className={`text-2xl font-bold mb-6 ${feedback.color}`}>{feedback.text}</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-500 text-sm mb-1">Correct</div>
            <div className="text-xl font-semibold text-green-600">{result.correctSteps}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-500 text-sm mb-1">Incorrect</div>
            <div className="text-xl font-semibold text-red-600">{result.incorrectSteps}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-500 text-sm mb-1">Time</div>
            <div className="text-xl font-semibold text-gray-900">{minutes}m {seconds}s</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-500 text-sm mb-1">Attempts</div>
            <div className="text-xl font-semibold text-gray-900">{result.attempts}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg" onClick={() => window.location.href = '/dashboard'}>
            Back to Dashboard
          </Button>
          <Button variant="primary" size="lg" onClick={() => window.location.reload()}>
            Retry Experiment
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ExperimentResults;

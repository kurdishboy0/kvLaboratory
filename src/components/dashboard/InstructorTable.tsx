'use client';

import React, { useState } from 'react';
import { User, ExperimentResult } from '@/types';
import { Button } from '../ui/Button';

interface InstructorTableProps {
  studentData: { user: User; results: ExperimentResult[] }[];
  onSendFeedback: (studentId: string, resultId: string, message: string) => void;
}

export function InstructorTable({ studentData, onSendFeedback }: InstructorTableProps) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [activeFeedbackId, setActiveFeedbackId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const handleSendFeedback = (studentId: string, resultId: string) => {
    if (feedbackText.trim()) {
      onSendFeedback(studentId, resultId, feedbackText);
      setFeedbackText('');
      setActiveFeedbackId(null);
    }
  };

  // Flatten data for easier table rendering
  const flatData = studentData.flatMap(data => 
    data.results.map(result => ({
      user: data.user,
      result: result
    }))
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Experiment</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flatData.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No student data available.</td>
              </tr>
            ) : (
              flatData.map((row) => (
                <React.Fragment key={`${row.user.id}-${row.result.id}`}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                          {row.user.name.charAt(0)}
                        </div>
                        <div className="ms-3">
                          <div className="text-sm font-medium text-gray-900">{row.user.name}</div>
                          <div className="text-sm text-gray-500">{row.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{row.result.experimentName}</div>
                      <div className="text-xs text-gray-500">{new Date(row.result.completedAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.result.score >= 70 ? 'bg-green-100 text-green-800' : 
                        row.result.score >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {row.result.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.result.attempts} attempts • {Math.floor(row.result.timeSpent / 60)}m {row.result.timeSpent % 60}s
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button
                        onClick={() => toggleRow(row.result.id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        {expandedRowId === row.result.id ? 'Hide Details' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Row Content */}
                  {expandedRowId === row.result.id && (
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Mistakes Summary</h4>
                            {row.result.mistakes.length === 0 ? (
                              <p className="text-sm text-gray-500 italic">No mistakes made!</p>
                            ) : (
                              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                {row.result.mistakes.map((m, idx) => (
                                  <li key={idx}>Failed at step {m.stepId}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Send Feedback</h4>
                            {activeFeedbackId === row.result.id ? (
                              <div className="space-y-2">
                                <textarea
                                  className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                  rows={3}
                                  placeholder="Write feedback for the student..."
                                  value={feedbackText}
                                  onChange={(e) => setFeedbackText(e.target.value)}
                                />
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => setActiveFeedbackId(null)}>Cancel</Button>
                                  <Button size="sm" onClick={() => handleSendFeedback(row.user.id, row.result.id)}>Send</Button>
                                </div>
                              </div>
                            ) : (
                              <Button size="sm" variant="secondary" onClick={() => setActiveFeedbackId(row.result.id)}>
                                Write Feedback
                              </Button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InstructorTable;

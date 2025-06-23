import React from 'react';

interface ProgressBarProps {
  percent: number;
  stage: number;
  stages: string[];
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent, stage, stages, label }) => (
  <div className="w-full bg-gray-800 py-2 px-4 flex items-center">
    <div className="flex-1 mr-4">
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-purple-200 mt-1">
        {stages.map((s, i) => (
          <span key={s} className={i === stage ? 'font-bold text-white' : ''}>{s}</span>
        ))}
      </div>
    </div>
    {label && <span className="text-purple-300 text-sm">{label}</span>}
  </div>
); 
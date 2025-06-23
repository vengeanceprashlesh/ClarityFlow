import React, { useState, useEffect } from 'react';
import { Sun, Wind, Droplet } from 'lucide-react';

interface CognitiveCalibrationProps {
  isActive: boolean;
  onInteract: () => void;
  emotionalState: string;
}

// Mock AI-generated values based on emotional state
const getClarityMetrics = (emotionalState: string) => {
  switch (emotionalState) {
    case 'Overwhelmed':
      return { clarity: 25, lightness: 30, awareness: 40, progress: 'calming' };
    case 'Calm':
      return { clarity: 80, lightness: 75, awareness: 85, progress: 'focusing' };
    case 'Focused':
      return { clarity: 90, lightness: 85, awareness: 90, progress: 'integrating' };
    default:
      return { clarity: 60, lightness: 65, awareness: 70, progress: 'balancing' };
  }
};

export const CognitiveCalibration = ({ isActive, onInteract, emotionalState }: CognitiveCalibrationProps) => {
  const [metrics, setMetrics] = useState(getClarityMetrics(emotionalState));

  useEffect(() => {
    // Re-calibrate when the emotional state changes
    setMetrics(getClarityMetrics(emotionalState));
  }, [emotionalState]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 text-center" onClick={onInteract}>
      {/* 1. Summary Card */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-2">You've moved from tension to clarity.</h2>
        <p className="text-lg text-purple-300">Let's keep going.</p>
      </div>

      {/* 2. Visual Metaphors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mental Clarity Orb */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div 
              className="absolute bg-teal-500 rounded-full animate-pulse"
              style={{ 
                width: `${metrics.clarity}%`, 
                height: `${metrics.clarity}%`,
                opacity: 0.1 + (metrics.clarity / 100) * 0.4,
                boxShadow: `0 0 ${metrics.clarity / 2}px 0px #0D9488`
              }} 
            />
            <Sun className="w-12 h-12 text-teal-300 z-10" />
          </div>
          <p className="mt-4 text-white">Mental Clarity</p>
          <p className="text-xs text-gray-400">Your mind feels brighter ☀️</p>
        </div>

        {/* Mental Breeze Ring */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div 
              className="absolute w-full h-full border-2 border-blue-400/50 rounded-full"
              style={{ animation: `breathe ${6 - (metrics.lightness / 100) * 4}s ease-in-out infinite` }}
            />
            <Wind className="w-12 h-12 text-blue-300 z-10" />
          </div>
          <p className="mt-4 text-white">Mental Breeze</p>
          <p className="text-xs text-gray-400">Your mind feels lighter 🕊️</p>
        </div>

        {/* Emotional Awareness Droplet */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
             <div 
              className="absolute w-full h-full"
              style={{
                background: `radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent ${metrics.awareness}%)`,
              }}
            />
            <Droplet className="w-12 h-12 text-purple-300 z-10" />
          </div>
          <p className="mt-4 text-white">Emotional Awareness</p>
          <p className="text-xs text-gray-400">Your awareness is growing 🌸</p>
        </div>
      </div>

      {/* 3. Emotional Progress Arc */}
      <div className="mt-12">
        <div className="relative w-48 h-24 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#374151" strokeWidth="4" />
            <path 
              d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" 
              stroke="url(#arcGradient)" 
              strokeWidth="4" 
              strokeDasharray="125.6" 
              strokeDashoffset={125.6 * (1 - (metrics.clarity / 100))}
              className="transition-all duration-1000"
            />
          </svg>
          <p className="absolute bottom-0 w-full text-center text-purple-300 font-semibold">
            You're {metrics.progress}.
          </p>
        </div>
      </div>

       {/* 4. Calming Caption */}
       <p className="text-center text-gray-400 mt-12">
        Each step brings more clarity. You're doing beautifully.
      </p>

      {/* Styles & Definitions */}
      <style>{`
        @keyframes breathe {
          0% { transform: scale(0.8); opacity: 0.7; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.7; }
        }
      `}</style>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

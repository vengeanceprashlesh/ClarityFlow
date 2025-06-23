
import React, { useState, useEffect } from 'react';
import { Target, Layers, CheckCircle, AlertCircle } from 'lucide-react';

interface CognitiveFrameworkProps {
  isActive: boolean;
  onInteract: () => void;
  currentState: string;
}

interface Framework {
  name: string;
  description: string;
  steps: string[];
  effectiveness: number;
}

export const CognitiveFramework = ({ isActive, onInteract, currentState }: CognitiveFrameworkProps) => {
  const [activeFramework, setActiveFramework] = useState<Framework | null>(null);
  const [progress, setProgress] = useState(0);

  const frameworks: Framework[] = [
    {
      name: "CBT Restructuring",
      description: "Challenge and reframe negative thought patterns",
      steps: [
        "Identify the triggering thought",
        "Examine the evidence",
        "Consider alternative perspectives",
        "Develop balanced thinking"
      ],
      effectiveness: 0.87
    },
    {
      name: "DBT Distress Tolerance",
      description: "Navigate intense emotions without destructive actions",
      steps: [
        "Notice the emotional intensity",
        "Apply TIPP technique",
        "Use distraction strategies",
        "Practice radical acceptance"
      ],
      effectiveness: 0.82
    },
    {
      name: "REBT Disputation",
      description: "Challenge irrational beliefs systematically",
      steps: [
        "Identify the irrational belief",
        "Dispute with logical questions",
        "Replace with rational beliefs",
        "Reinforce new thinking patterns"
      ],
      effectiveness: 0.79
    }
  ];

  useEffect(() => {
    if (isActive && !activeFramework) {
      const randomFramework = frameworks[Math.floor(Math.random() * frameworks.length)];
      setActiveFramework(randomFramework);
      setProgress(0);
    }
  }, [isActive]);

  useEffect(() => {
    if (activeFramework && isActive) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [activeFramework, isActive]);

  const selectFramework = (framework: Framework) => {
    setActiveFramework(framework);
    setProgress(0);
    onInteract();
  };

  return (
    <div className="relative h-96">
      {/* Framework Selector */}
      {!activeFramework ? (
        <div className="h-full rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-white mono text-sm">Cognitive Frameworks</span>
          </div>
          
          <div className="space-y-3">
            {frameworks.map((framework, index) => (
              <button
                key={framework.name}
                onClick={() => selectFramework(framework)}
                className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-400/30 transition-all duration-300 text-left group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium text-sm">{framework.name}</h3>
                  <div className="text-xs text-green-400 mono">
                    {Math.round(framework.effectiveness * 100)}%
                  </div>
                </div>
                <p className="text-gray-300 text-xs mb-2">{framework.description}</p>
                <div className="flex items-center space-x-2">
                  <Layers className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{framework.steps.length} steps</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Active Framework */
        <div className={`
          h-full rounded-xl backdrop-blur-md border transition-all duration-500
          ${isActive ? 'bg-black/50 border-green-400/30 synaptic-glow' : 'bg-black/30 border-white/10'}
        `}>
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">{activeFramework.name}</h3>
                <p className="text-gray-300 text-xs">{activeFramework.description}</p>
              </div>
              <button 
                onClick={() => setActiveFramework(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <AlertCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 mono">Progress</span>
                <span className="text-xs text-green-400 mono">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {activeFramework.steps.map((step, index) => {
                const isCompleted = progress > (index + 1) * 25;
                const isActive = progress >= index * 25 && progress < (index + 1) * 25;
                
                return (
                  <div 
                    key={index}
                    className={`
                      flex items-start space-x-3 p-2 rounded-lg transition-all duration-500
                      ${isCompleted ? 'bg-green-400/10 border border-green-400/20' : 
                        isActive ? 'bg-blue-400/10 border border-blue-400/20' : 
                        'bg-white/5 border border-white/10'}
                    `}
                  >
                    <div className="mt-1">
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          isActive ? 'border-blue-400 bg-blue-400/20' : 'border-gray-400'
                        }`}>
                          {isActive && (
                            <div className="w-full h-full rounded-full bg-blue-400 animate-pulse" />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`text-sm ${
                        isCompleted ? 'text-green-300' : 
                        isActive ? 'text-blue-300' : 'text-gray-400'
                      }`}>
                        {step}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Effectiveness Indicator */}
            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 mono">Clinical Effectiveness</span>
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-green-400 mono">
                    {Math.round(activeFramework.effectiveness * 100)}%
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1 h-3 rounded-full ${
                          i < activeFramework.effectiveness * 5 ? 'bg-green-400' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

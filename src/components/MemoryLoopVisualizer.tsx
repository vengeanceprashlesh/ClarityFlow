
import React, { useState, useEffect } from 'react';
import { RotateCcw, Brain, Zap } from 'lucide-react';

interface MemoryLoopVisualizerProps {
  isActive: boolean;
  onInteract: () => void;
  emotionalState: string;
}

interface MemoryLoop {
  id: string;
  thought: string;
  repetitions: number;
  intensity: number;
  timestamp: number;
}

export const MemoryLoopVisualizer = ({ isActive, onInteract, emotionalState }: MemoryLoopVisualizerProps) => {
  const [memoryLoops, setMemoryLoops] = useState<MemoryLoop[]>([]);
  const [activeLoop, setActiveLoop] = useState<string | null>(null);

  const thoughtPatterns = {
    overwhelmed: ["I can't handle this", "Everything is falling apart", "I'm not good enough"],
    calm: ["I can work through this", "Things will be okay", "I'm making progress"],
    distracted: ["What was I doing?", "I should check my phone", "Where did the time go?"],
    energized: ["I can accomplish anything", "Let's tackle this challenge", "I'm feeling powerful"]
  };

  useEffect(() => {
    if (isActive) {
      generateMemoryLoop();
      const interval = setInterval(generateMemoryLoop, 3000);
      return () => clearInterval(interval);
    }
  }, [isActive, emotionalState]);

  const generateMemoryLoop = () => {
    const patterns = thoughtPatterns[emotionalState as keyof typeof thoughtPatterns] || thoughtPatterns.calm;
    const thought = patterns[Math.floor(Math.random() * patterns.length)];
    
    const existingLoop = memoryLoops.find(loop => loop.thought === thought);
    
    if (existingLoop) {
      setMemoryLoops(prev => prev.map(loop => 
        loop.id === existingLoop.id 
          ? { ...loop, repetitions: loop.repetitions + 1, intensity: Math.min(loop.intensity + 0.1, 1) }
          : loop
      ));
      setActiveLoop(existingLoop.id);
    } else {
      const newLoop: MemoryLoop = {
        id: Date.now().toString(),
        thought,
        repetitions: 1,
        intensity: 0.3,
        timestamp: Date.now()
      };
      setMemoryLoops(prev => [newLoop, ...prev.slice(0, 4)]);
      setActiveLoop(newLoop.id);
    }

    setTimeout(() => setActiveLoop(null), 1500);
  };

  const getEmotionalColor = () => {
    switch (emotionalState) {
      case 'overwhelmed': return 'from-red-500/40 to-orange-600/40';
      case 'calm': return 'from-blue-400/40 to-green-400/40';
      case 'distracted': return 'from-yellow-400/40 to-purple-400/40';
      case 'energized': return 'from-purple-500/40 to-pink-500/40';
      default: return 'from-purple-400/40 to-blue-400/40';
    }
  };

  return (
    <div className="relative h-80 group cursor-pointer" onClick={onInteract}>
      <div className={`
        h-full rounded-xl backdrop-blur-md border transition-all duration-700
        ${isActive ? 'bg-black/50 border-purple-400/30 synaptic-glow' : 'bg-black/30 border-white/10'}
      `}>
        
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <RotateCcw className={`w-5 h-5 text-purple-400 ${isActive ? 'animate-spin' : ''}`} />
              <span className="text-white mono text-sm">Memory Loop Visualizer</span>
            </div>
            <div className="text-xs text-purple-300 mono">
              Patterns: {memoryLoops.length}
            </div>
          </div>
        </div>

        {/* Loop Visualization */}
        <div className="p-4 h-64 overflow-hidden relative">
          {/* Neural Network Background */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-20" viewBox="0 0 400 300">
              {memoryLoops.map((loop, index) => (
                <g key={loop.id}>
                  <circle
                    cx={50 + (index * 80)}
                    cy={150}
                    r={20 + loop.intensity * 15}
                    fill="none"
                    stroke={`rgba(168, 85, 247, ${loop.intensity})`}
                    strokeWidth="2"
                    className={activeLoop === loop.id ? 'animate-pulse' : ''}
                  />
                  {index > 0 && (
                    <line
                      x1={50 + ((index - 1) * 80) + 20}
                      y1={150}
                      x2={50 + (index * 80) - 20}
                      y2={150}
                      stroke="rgba(168, 85, 247, 0.4)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Memory Loops */}
          <div className="relative space-y-3">
            {memoryLoops.map((loop, index) => (
              <div 
                key={loop.id}
                className={`
                  relative p-3 rounded-lg border backdrop-blur-sm transition-all duration-500
                  ${activeLoop === loop.id 
                    ? `bg-gradient-to-r ${getEmotionalColor()} border-purple-400/50 scale-105` 
                    : 'bg-white/5 border-white/10'
                  }
                `}
                style={{
                  transform: `translateX(${activeLoop === loop.id ? '10px' : '0px'})`,
                  opacity: 1 - (index * 0.15)
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white/90 text-sm mb-1">
                      "{loop.thought}"
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-purple-300 mono">
                        Repetitions: {loop.repetitions}
                      </span>
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div 
                            key={i}
                            className={`w-1 h-2 rounded-full transition-all duration-300 ${
                              i < loop.intensity * 5 ? 'bg-purple-400' : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {activeLoop === loop.id && (
                    <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
                  )}
                </div>

                {/* Ripple Effect */}
                {activeLoop === loop.id && (
                  <div className="absolute inset-0 rounded-lg border-2 border-purple-400/30 animate-ping" />
                )}
              </div>
            ))}
          </div>

          {/* Ambient Particles */}
          {isActive && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 200}ms`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

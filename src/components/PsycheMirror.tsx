
import React, { useState, useEffect } from 'react';
import { Circle, Sparkles, Layers } from 'lucide-react';

interface PsycheMirrorProps {
  isActive: boolean;
  onInteract: () => void;
  currentState: string;
}

export const PsycheMirror = ({ isActive, onInteract, currentState }: PsycheMirrorProps) => {
  const [reflections, setReflections] = useState<string[]>([]);
  const [mirrorIntensity, setMirrorIntensity] = useState(0.3);

  const thoughtPrompts = [
    "What patterns do you notice in your reactions?",
    "Where does this feeling originate from?",
    "What would you tell a friend in this situation?",
    "What evidence supports this thought?",
    "How might this look in 5 years?",
    "What assumptions are you making?"
  ];

  useEffect(() => {
    if (isActive) {
      setMirrorIntensity(0.8);
      const newReflection = thoughtPrompts[Math.floor(Math.random() * thoughtPrompts.length)];
      setReflections(prev => [newReflection, ...prev.slice(0, 2)]);
    } else {
      setMirrorIntensity(0.3);
    }
  }, [isActive]);

  return (
    <div className="relative h-96 group cursor-pointer" onClick={onInteract}>
      {/* Mirror Frame */}
      <div className={`
        absolute inset-0 rounded-xl mirror-surface synaptic-glow
        transition-all duration-700 transform
        ${isActive ? 'scale-105 fractured' : 'hover:scale-102'}
        ${currentState === 'breakthrough' ? 'cognitive-mode' : ''}
      `}>
        
        {/* Mirror Surface */}
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-purple-500/20"
            style={{ opacity: mirrorIntensity }}
          />
          
          {/* Fracture Lines */}
          <div className={`absolute inset-0 ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M20,10 L80,30 L60,70 L40,50 L20,80 L10,40 Z" 
                fill="none" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="0.5"
                className="animate-pulse"
              />
              <path 
                d="M50,0 L90,40 L70,90 L30,60 L10,90 L0,20 Z" 
                fill="none" 
                stroke="rgba(168,85,247,0.4)" 
                strokeWidth="0.3"
              />
            </svg>
          </div>

          {/* Reflection Content */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div className="flex items-center space-x-2 text-purple-300">
              <Circle className="w-5 h-5" />
              <span className="text-sm mono">Psyche Mirror</span>
              {isActive && <Sparkles className="w-4 h-4 animate-spin" />}
            </div>

            <div className="space-y-3">
              {reflections.map((reflection, index) => (
                <div 
                  key={index}
                  className={`
                    text-white/90 text-sm transition-all duration-500 transform
                    ${index === 0 ? 'text-base font-medium scale-105' : 'text-xs opacity-60'}
                  `}
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  "{reflection}"
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-purple-400 mono">
              <span>Reflection Depth</span>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`w-2 h-1 rounded-full transition-all duration-300 ${
                      i < reflections.length ? 'bg-purple-400' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>

      {/* Neural Connections */}
      {isActive && (
        <div className="absolute -inset-4 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-px h-8 bg-purple-400/60 transform rotate-${i * 60}`}
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${i * 60}deg)`,
                animation: `synaptic-pulse ${2 + i * 0.3}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

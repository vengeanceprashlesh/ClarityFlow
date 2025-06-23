
import React, { useEffect, useState } from 'react';

interface AmbientNeuroFeedbackProps {
  emotionalState: string;
  introspectionDepth: number;
  isUserActive: boolean;
}

export const AmbientNeuroFeedback = ({ 
  emotionalState, 
  introspectionDepth, 
  isUserActive 
}: AmbientNeuroFeedbackProps) => {
  const [particles, setParticles] = useState<Array<{
    id: string;
    x: number;
    y: number;
    size: number;
    opacity: number;
    color: string;
    speed: number;
  }>>([]);

  const emotionColors = {
    overwhelmed: ['#ef4444', '#f97316', '#eab308'],
    calm: ['#22d3ee', '#06b6d4', '#0891b2'],
    distracted: ['#eab308', '#f59e0b', '#d97706'],
    energized: ['#a855f7', '#9333ea', '#7c3aed'],
    anxious: ['#f97316', '#ea580c', '#dc2626'],
    focused: ['#10b981', '#059669', '#047857']
  };

  useEffect(() => {
    const generateParticles = () => {
      const colors = emotionColors[emotionalState as keyof typeof emotionColors] || emotionColors.calm;
      const particleCount = Math.floor(introspectionDepth / 10) + 5;
      
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: `particle-${i}-${Date.now()}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 0.5
      }));

      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 5000);
    return () => clearInterval(interval);
  }, [emotionalState, introspectionDepth]);

  const getAnimationDuration = () => {
    switch (emotionalState) {
      case 'overwhelmed': return '1s';
      case 'anxious': return '0.8s';
      case 'energized': return '1.2s';
      case 'calm': return '3s';
      case 'focused': return '2s';
      default: return '2s';
    }
  };

  const getBlurAmount = () => {
    if (emotionalState === 'focused') return 'blur(0px)';
    if (emotionalState === 'distracted') return 'blur(2px)';
    return 'blur(1px)';
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 transition-all duration-1000`}
         style={{ filter: getBlurAmount() }}>
      
      {/* Breathing Background Effect */}
      <div 
        className={`absolute inset-0 transition-all duration-1000`}
        style={{
          background: emotionalState === 'overwhelmed' 
            ? 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 70%)'
            : emotionalState === 'calm'
            ? 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.05) 0%, transparent 70%)'
            : emotionalState === 'anxious'
            ? 'radial-gradient(circle at 30% 70%, rgba(249, 115, 22, 0.08) 0%, transparent 50%)'
            : 'transparent',
          animation: `pulse ${getAnimationDuration()} ease-in-out infinite`
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animation: `float ${10 + particle.speed}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}40`
          }}
        />
      ))}

      {/* Heartbeat Effect for Anxiety */}
      {emotionalState === 'anxious' && (
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-500 rounded-full animate-ping"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}

      {/* Neural Connections */}
      {isUserActive && (
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: emotionColors[emotionalState as keyof typeof emotionColors]?.[0] || '#a855f7' }} />
              <stop offset="100%" style={{ stopColor: emotionColors[emotionalState as keyof typeof emotionColors]?.[1] || '#3b82f6' }} />
            </linearGradient>
          </defs>
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              opacity="0.3"
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
};

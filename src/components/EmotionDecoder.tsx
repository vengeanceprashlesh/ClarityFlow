
import React, { useState, useEffect } from 'react';
import { Palette, Heart, Brain } from 'lucide-react';

interface EmotionDecoderProps {
  isActive: boolean;
  onInteract: () => void;
  onEmotionChange: (emotion: string) => void;
  currentEmotion: string;
}

interface EmotionReading {
  emotion: string;
  intensity: number;
  color: string;
  timestamp: number;
}

export const EmotionDecoder = ({ isActive, onInteract, onEmotionChange, currentEmotion }: EmotionDecoderProps) => {
  const [emotionReadings, setEmotionReadings] = useState<EmotionReading[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const emotionProfiles = {
    overwhelmed: { color: '#ef4444', intensity: 0.9, description: 'High stress, need grounding' },
    calm: { color: '#22d3ee', intensity: 0.4, description: 'Balanced, receptive state' },
    distracted: { color: '#eab308', intensity: 0.6, description: 'Scattered focus, need centering' },
    energized: { color: '#a855f7', intensity: 0.8, description: 'High motivation, ready for action' },
    anxious: { color: '#f97316', intensity: 0.7, description: 'Elevated concern, need reassurance' },
    focused: { color: '#10b981', intensity: 0.5, description: 'Clear mind, optimal state' }
  };

  useEffect(() => {
    if (isActive) {
      simulateEmotionScan();
      const interval = setInterval(simulateEmotionScan, 4000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const simulateEmotionScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const emotions = Object.keys(emotionProfiles);
      const detectedEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      const profile = emotionProfiles[detectedEmotion as keyof typeof emotionProfiles];
      
      const newReading: EmotionReading = {
        emotion: detectedEmotion,
        intensity: profile.intensity + (Math.random() - 0.5) * 0.2,
        color: profile.color,
        timestamp: Date.now()
      };

      setEmotionReadings(prev => [newReading, ...prev.slice(0, 3)]);
      onEmotionChange(detectedEmotion);
      setIsScanning(false);
    }, 1500);
  };

  const getCurrentProfile = () => {
    return emotionProfiles[currentEmotion as keyof typeof emotionProfiles] || emotionProfiles.calm;
  };

  return (
    <div className="relative h-80 group cursor-pointer" onClick={onInteract}>
      <div 
        className={`
          h-full rounded-xl backdrop-blur-md border transition-all duration-700
          ${isActive ? 'bg-black/50 border-purple-400/30 synaptic-glow' : 'bg-black/30 border-white/10'}
        `}
        style={{
          background: isActive 
            ? `linear-gradient(135deg, ${getCurrentProfile().color}10, rgba(0,0,0,0.5))`
            : undefined
        }}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Palette className={`w-5 h-5 text-pink-400 ${isScanning ? 'animate-pulse' : ''}`} />
              <span className="text-white mono text-sm">Emotion Decoder</span>
            </div>
            <div className="text-xs text-pink-300 mono">
              {isScanning ? 'Scanning...' : 'Active'}
            </div>
          </div>
        </div>

        {/* Current Emotion Display */}
        <div className="p-4">
          <div className="text-center mb-6">
            <div 
              className="w-20 h-20 mx-auto rounded-full border-4 transition-all duration-500 relative overflow-hidden"
              style={{ 
                borderColor: getCurrentProfile().color,
                boxShadow: `0 0 30px ${getCurrentProfile().color}40`
              }}
            >
              <div 
                className="absolute inset-0 animate-pulse"
                style={{ 
                  background: `radial-gradient(circle, ${getCurrentProfile().color}30, transparent 70%)`
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart 
                  className="w-8 h-8 animate-pulse"
                  style={{ color: getCurrentProfile().color }}
                />
              </div>
              
              {/* Heartbeat Effect */}
              {currentEmotion === 'anxious' && (
                <div className="absolute inset-0 border-2 rounded-full animate-ping" 
                     style={{ borderColor: getCurrentProfile().color }} />
              )}
            </div>
            
            <div className="mt-3">
              <div 
                className="text-lg font-medium capitalize transition-colors duration-500"
                style={{ color: getCurrentProfile().color }}
              >
                {currentEmotion}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {getCurrentProfile().description}
              </div>
            </div>
          </div>

          {/* Emotion History */}
          <div className="space-y-2">
            <div className="text-xs text-gray-400 mono mb-2">Recent Emotional Patterns</div>
            {emotionReadings.map((reading, index) => (
              <div 
                key={reading.timestamp}
                className="flex items-center space-x-3 p-2 rounded-lg bg-white/5 border border-white/10 transition-all duration-300"
                style={{ 
                  opacity: 1 - (index * 0.25),
                  transform: `translateY(${index * 2}px)`
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: reading.color }}
                />
                <div className="flex-1">
                  <div className="text-white text-sm capitalize">{reading.emotion}</div>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1 h-2 rounded-full transition-all duration-300`}
                      style={{
                        backgroundColor: i < reading.intensity * 5 ? reading.color : 'rgba(255,255,255,0.2)'
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Scanning Effect */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-4 border border-pink-400/50 rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

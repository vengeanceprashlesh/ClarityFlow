import React, { useState, useEffect } from 'react';
import { Settings, Brain, Zap, Heart } from 'lucide-react';

interface CognitiveCalibrationProps {
  isActive: boolean;
  onInteract: () => void;
  onDepthChange: (depth: number) => void;
  emotionalState: string;
}

export const CognitiveCalibration = ({ isActive, onInteract, onDepthChange, emotionalState }: CognitiveCalibrationProps) => {
  const [introspectionDepth, setIntrospectionDepth] = useState(50);
  const [cognitiveLoad, setCognitiveLoad] = useState(30);
  const [emotionalSensitivity, setEmotionalSensitivity] = useState(70);

  useEffect(() => {
    onDepthChange(introspectionDepth);
  }, [introspectionDepth, onDepthChange]);

  const handleSliderChange = (value: number, setter: (val: number) => void) => {
    setter(value);
    // Create haptic-like visual feedback
    const slider = document.activeElement as HTMLElement;
    if (slider) {
      slider.style.transform = 'scale(1.05)';
      setTimeout(() => {
        slider.style.transform = 'scale(1)';
      }, 150);
    }
  };

  const getEmotionalGradient = () => {
    switch (emotionalState) {
      case 'overwhelmed': return 'from-red-500 via-orange-500 to-yellow-500';
      case 'calm': return 'from-blue-500 via-cyan-500 to-green-500';
      case 'distracted': return 'from-yellow-500 via-purple-500 to-pink-500';
      case 'energized': return 'from-purple-500 via-fuchsia-500 to-pink-500';
      default: return 'from-purple-500 via-blue-500 to-cyan-500';
    }
  };

  const SliderComponent = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon, 
    color 
  }: { 
    label: string; 
    value: number; 
    onChange: (val: number) => void; 
    icon: any; 
    color: string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-white text-sm">{label}</span>
        </div>
        <span className="text-xs text-purple-300 mono">{value}%</span>
      </div>
      
      <div className="relative">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getEmotionalGradient()} transition-all duration-300 relative`}
            style={{ width: `${value}%` }}
          >
            <div className="absolute right-0 top-0 h-full w-1 bg-white/50 animate-pulse" />
          </div>
        </div>
        
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => handleSliderChange(Number(e.target.value), onChange)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {/* Neural Activity Indicators */}
        <div className="absolute -top-1 left-0 right-0 flex justify-between pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className={`w-1 h-4 rounded-full transition-all duration-300 ${
                (i * 20) <= value ? `bg-gradient-to-t ${getEmotionalGradient()}` : 'bg-white/20'
              }`}
              style={{
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

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
              <Settings className={`w-5 h-5 text-cyan-400 ${isActive ? 'animate-spin' : ''}`} />
              <span className="text-white mono text-sm">Cognitive Calibration</span>
            </div>
            <div className="text-xs text-cyan-300 mono">
              Depth: {introspectionDepth}%
            </div>
          </div>
        </div>

        {/* Calibration Controls */}
        <div className="p-4 space-y-6">
          <SliderComponent
            label="Introspection Depth"
            value={introspectionDepth}
            onChange={setIntrospectionDepth}
            icon={Brain}
            color="text-purple-400"
          />
          
          <SliderComponent
            label="Cognitive Load"
            value={cognitiveLoad}
            onChange={setCognitiveLoad}
            icon={Zap}
            color="text-blue-400"
          />
          
          <SliderComponent
            label="Emotional Sensitivity"
            value={emotionalSensitivity}
            onChange={setEmotionalSensitivity}
            icon={Heart}
            color="text-pink-400"
          />

          {/* Real-time Feedback */}
          <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-xs text-gray-400 mono mb-2">Neural Response Pattern</div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getEmotionalGradient()} animate-pulse`}
                  style={{ 
                    width: `${(introspectionDepth + cognitiveLoad + emotionalSensitivity) / 3}%` 
                  }}
                />
              </div>
              <span className="text-xs text-cyan-300 mono">
                {Math.round((introspectionDepth + cognitiveLoad + emotionalSensitivity) / 3)}%
              </span>
            </div>
          </div>
        </div>

        {/* Ambient Neural Activity */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-8 bg-cyan-400/60 animate-pulse"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  animationDelay: `${i * 300}ms`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

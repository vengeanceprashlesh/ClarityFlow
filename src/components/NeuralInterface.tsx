import React, { useState, useEffect } from 'react';
import { Brain, Zap, Eye, Heart, Lightbulb, Activity, Settings } from 'lucide-react';
import { PsycheMirror } from './PsycheMirror';
import { ThoughtStream } from './ThoughtStream';
import { CognitiveFramework } from './CognitiveFramework';
import { MemoryLoopVisualizer } from './MemoryLoopVisualizer';
import { CognitiveCalibration } from './CognitiveCalibration';
import { EmotionDecoder } from './EmotionDecoder';
import { AmbientNeuroFeedback } from './AmbientNeuroFeedback';

export const NeuralInterface = () => {
  const [currentState, setCurrentState] = useState('observing');
  const [emotionalState, setEmotionalState] = useState('calm');
  const [interactionCount, setInteractionCount] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [introspectionDepth, setIntrospectionDepth] = useState(50);
  const [isUserActive, setIsUserActive] = useState(false);

  const psychStates = {
    observing: { color: 'from-blue-500 to-purple-600', intensity: 0.3 },
    analyzing: { color: 'from-purple-600 to-pink-500', intensity: 0.6 },
    processing: { color: 'from-pink-500 to-red-500', intensity: 0.8 },
    breakthrough: { color: 'from-green-400 to-blue-500', intensity: 1.0 },
    integrating: { color: 'from-indigo-500 to-purple-700', intensity: 0.5 }
  };

  // Adaptive state changes based on user interaction patterns
  useEffect(() => {
    const interval = setInterval(() => {
      if (interactionCount > 0) {
        const states = Object.keys(psychStates);
        let nextState = states[Math.floor(Math.random() * states.length)];
        
        // Adaptive logic based on emotional state
        if (emotionalState === 'overwhelmed' && Math.random() > 0.7) {
          nextState = 'processing';
        } else if (emotionalState === 'calm' && Math.random() > 0.6) {
          nextState = 'integrating';
        } else if (emotionalState === 'energized' && Math.random() > 0.5) {
          nextState = 'breakthrough';
        }
        
        setCurrentState(nextState);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [interactionCount, emotionalState]);

  // Track user activity for ambient feedback
  useEffect(() => {
    setIsUserActive(activeNode !== null);
    const timeout = setTimeout(() => {
      if (activeNode === null) setIsUserActive(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [activeNode]);

  const handleInteraction = (type: string) => {
    setInteractionCount(prev => prev + 1);
    setActiveNode(type);
    setTimeout(() => setActiveNode(null), 2000);
  };

  const getBackgroundGradient = () => {
    switch (emotionalState) {
      case 'overwhelmed':
        return 'from-red-900/20 via-slate-900 to-orange-900/20';
      case 'calm':
        return 'from-blue-900/20 via-slate-900 to-cyan-900/20';
      case 'distracted':
        return 'from-yellow-900/20 via-slate-900 to-purple-900/20';
      case 'energized':
        return 'from-purple-900/20 via-slate-900 to-pink-900/20';
      case 'anxious':
        return 'from-orange-900/30 via-red-900/20 to-slate-900';
      case 'focused':
        return 'from-green-900/20 via-slate-900 to-blue-900/20';
      default:
        return 'from-slate-900 via-purple-900 to-slate-900';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br transition-all duration-1000 ${getBackgroundGradient()}`}>
      
      {/* Ambient Neuro-Feedback Layer */}
      <AmbientNeuroFeedback 
        emotionalState={emotionalState}
        introspectionDepth={introspectionDepth}
        isUserActive={isUserActive}
      />

      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="neural-network-bg w-full h-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full neural-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: emotionalState === 'anxious' ? '1s' : '2s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Interface */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Adaptive Neural Header */}
        <header className={`p-6 backdrop-blur-md border-b transition-all duration-700 ${
          emotionalState === 'overwhelmed' ? 'bg-red-900/20 border-red-500/20' :
          emotionalState === 'calm' ? 'bg-blue-900/20 border-blue-500/20' :
          emotionalState === 'anxious' ? 'bg-orange-900/20 border-orange-500/20' :
          'bg-black/20 border-white/10'
        }`}>
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className={`w-8 h-8 transition-colors duration-500 ${
                  emotionalState === 'overwhelmed' ? 'text-red-400' :
                  emotionalState === 'calm' ? 'text-cyan-400' :
                  emotionalState === 'energized' ? 'text-purple-400' :
                  'text-purple-400'
                }`} />
                <div className="absolute inset-0 blur-md opacity-50" 
                     style={{ 
                       backgroundColor: emotionalState === 'overwhelmed' ? '#ef4444' :
                                      emotionalState === 'calm' ? '#22d3ee' :
                                      emotionalState === 'energized' ? '#a855f7' :
                                      '#a855f7'
                     }} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white mono">SYNAPTIC</h1>
                <p className="text-xs text-purple-300 mono">Neural Cognitive Control Center</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-purple-300 mono">State: {currentState}</div>
                <div className="text-xs text-gray-400 mono">Depth: {introspectionDepth}%</div>
                <div className="text-xs mono" style={{ 
                  color: emotionalState === 'overwhelmed' ? '#ef4444' :
                         emotionalState === 'calm' ? '#22d3ee' :
                         emotionalState === 'energized' ? '#a855f7' :
                         '#9ca3af'
                }}>
                  Emotion: {emotionalState}
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${psychStates[currentState as keyof typeof psychStates].color} neural-pulse`}></div>
            </div>
          </div>
        </header>

        {/* Central Processing Area */}
        <main className="flex-1 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
            
            {/* Row 1: Core Modules */}
            <div className="lg:col-span-1">
              <PsycheMirror 
                isActive={activeNode === 'mirror'} 
                onInteract={() => handleInteraction('mirror')}
                currentState={currentState}
              />
            </div>

            <div className="lg:col-span-1">
              <ThoughtStream 
                isActive={activeNode === 'stream'} 
                onInteract={() => handleInteraction('stream')}
                interactionCount={interactionCount}
              />
            </div>

            <div className="lg:col-span-1">
              <CognitiveFramework 
                isActive={activeNode === 'framework'} 
                onInteract={() => handleInteraction('framework')}
                currentState={currentState}
              />
            </div>

            {/* Row 2: Advanced Modules */}
            <div className="lg:col-span-1">
              <MemoryLoopVisualizer
                isActive={activeNode === 'memory'}
                onInteract={() => handleInteraction('memory')}
                emotionalState={emotionalState}
              />
            </div>

            <div className="lg:col-span-1">
              <CognitiveCalibration
                isActive={activeNode === 'calibration'}
                onInteract={() => handleInteraction('calibration')}
                onDepthChange={setIntrospectionDepth}
                emotionalState={emotionalState}
              />
            </div>

            <div className="lg:col-span-1">
              <EmotionDecoder
                isActive={activeNode === 'emotion'}
                onInteract={() => handleInteraction('emotion')}
                onEmotionChange={setEmotionalState}
                currentEmotion={emotionalState}
              />
            </div>
          </div>

          {/* Enhanced Neural Navigation */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className={`flex space-x-3 backdrop-blur-md rounded-full p-4 border transition-all duration-500 ${
              emotionalState === 'overwhelmed' ? 'bg-red-900/40 border-red-500/20' :
              emotionalState === 'calm' ? 'bg-blue-900/40 border-blue-500/20' :
              'bg-black/40 border-white/10'
            }`}>
              {[
                { icon: Eye, label: 'Observe', action: 'mirror' },
                { icon: Zap, label: 'Process', action: 'stream' },
                { icon: Lightbulb, label: 'Integrate', action: 'framework' },
                { icon: Activity, label: 'Memory', action: 'memory' },
                { icon: Settings, label: 'Calibrate', action: 'calibration' },
                { icon: Heart, label: 'Emotion', action: 'emotion' }
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={action}
                  onClick={() => handleInteraction(action)}
                  className={`group relative p-3 rounded-full transition-all duration-300 ${
                    activeNode === action 
                      ? 'bg-purple-500/50 text-white scale-110' 
                      : 'hover:bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity mono">
                    {label}
                  </div>
                  {activeNode === action && (
                    <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Brain, Zap, Eye, Heart, Lightbulb, Activity, Settings, Sparkles } from 'lucide-react';
import { PsycheMirror } from './PsycheMirror';
import { ThoughtStream } from './ThoughtStream';
import { CognitiveFramework } from './CognitiveFramework';
import { MemoryLoopVisualizer } from './MemoryLoopVisualizer';
import { CognitiveCalibration } from './CognitiveCalibration';
import { EmotionDecoder } from './EmotionDecoder';
import { AmbientNeuroFeedback } from './AmbientNeuroFeedback';
import { ProgressBar } from './ui/ProgressBar';
import { SessionRecap } from './SessionRecap';

export const NeuralInterface = () => {
  const [currentState, setCurrentState] = useState('observing');
  const [emotionalState, setEmotionalState] = useState('calm');
  const [initialEmotionalState, setInitialEmotionalState] = useState('calm');
  const [unlockedTool, setUnlockedTool] = useState('CBT Reframing');
  const [interactionCount, setInteractionCount] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [introspectionDepth, setIntrospectionDepth] = useState(50);
  const [isUserActive, setIsUserActive] = useState(false);
  const [stage, setStage] = useState(0);
  const [sessionFinished, setSessionFinished] = useState(false);
  const stages = [
    'Awareness',
    'Introspection',
    'Insight',
    'Reframe',
    'Reflection'
  ];
  const stageCount = stages.length;
  const clarityPercent = Math.round(((stage + 1) / stageCount) * 100);

  const onboarding = [
    {
      title: 'Emotion Decoder',
      desc: "We're starting by checking in with your mood. This helps us guide your journey.",
    },
    {
      title: 'Psyche Mirror',
      desc: 'Reflect on this question. Your answer will help clarify your thoughts.'
    },
    {
      title: 'Insight',
      desc: "Here's what your thoughts reveal. Notice any patterns?"
    },
    {
      title: 'Cognitive Calibration',
      desc: (
        <>
          We're tuning your clarity.
          <br />
          Notice how your answers shift your mental state.
        </>
      )
    },
    {
      title: 'Session Recap',
      desc: "Let's review your progress. See how far you've come in this session."
    }
  ];

  const psychStates = {
    observing: { color: 'from-blue-500 to-purple-600', intensity: 0.3 },
    analyzing: { color: 'from-purple-600 to-pink-500', intensity: 0.6 },
    processing: { color: 'from-pink-500 to-red-500', intensity: 0.8 },
    breakthrough: { color: 'from-green-400 to-blue-500', intensity: 1.0 },
    integrating: { color: 'from-indigo-500 to-purple-700', intensity: 0.5 }
  };

  const goToNextStage = () => setStage(s => Math.min(stageCount - 1, s + 1));
  const goToPrevStage = () => setStage(s => Math.max(0, s - 1));

  // Capture the initial emotional state
  useEffect(() => {
    if (stage === 0) {
      setInitialEmotionalState(emotionalState);
    }
  }, [stage, emotionalState]);

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
      {/* Progress Bar */}
      <div className="w-full fixed top-0 left-0 z-50">
        <ProgressBar 
          percent={clarityPercent} 
          stage={stage} 
          stages={stages} 
          label={`Cognitive Clarity: ${clarityPercent}%`}
        />
      </div>
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
      {/* Main Interface: Stepper Flow */}
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center p-4 pt-28">
        {/* Onboarding/Tooltip Modal */}
        <div className="mb-8">
          <div className="bg-black/70 rounded-lg p-4 shadow-lg text-center max-w-md mx-auto">
            <h2 className="text-lg font-bold text-purple-200 mb-2">{onboarding[stage].title}</h2>
            <p className="text-sm text-purple-100">{onboarding[stage].desc}</p>
          </div>
        </div>
        {/* Stage Content */}
        <div className="w-full max-w-2xl flex flex-col items-center">
          {stage === 0 && (
            <EmotionDecoder
              isActive={true}
              onInteract={() => handleInteraction('emotion')}
              onEmotionChange={setEmotionalState}
              currentEmotion={emotionalState}
            />
          )}
          {stage === 1 && (
            <PsycheMirror
              isActive={true}
              onInteract={() => handleInteraction('mirror')}
              currentState={currentState}
              emotionalState={emotionalState}
            />
          )}
          {stage === 2 && (
            <>
              <ThoughtStream
                isActive={true}
                onInteract={() => handleInteraction('stream')}
                interactionCount={interactionCount}
                emotionalState={emotionalState}
              />
              <MemoryLoopVisualizer
                isActive={activeNode === 'memory'}
                onInteract={() => handleInteraction('memory')}
                emotionalState={emotionalState}
              />
            </>
          )}
          {stage === 3 && (
            <CognitiveCalibration
              isActive={true}
              onInteract={() => handleInteraction('calibration')}
              emotionalState={emotionalState}
            />
          )}
          {stage === 4 && (
            <CognitiveFramework
              isActive={true}
              onInteract={() => handleInteraction('framework')}
              emotionalState={emotionalState}
            />
          )}
          {stage === 4 && !sessionFinished && (
            <SessionRecap
              initialMood={initialEmotionalState}
              finalMood={emotionalState}
              unlockedTool={unlockedTool}
              insightsCount={5} // Mock data
              thoughtLoopsBroken={3} // Mock data
              onContinue={() => setSessionFinished(true)}
              onSave={() => alert('Session saved!')}
              isFinalStage={true}
            />
          )}
          {sessionFinished && (
            <div className="w-full max-w-xl mx-auto p-12 flex flex-col items-center text-center animate-fade-in-up font-manrope">
              <Sparkles className="w-16 h-16 text-yellow-300 mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Thank you for completing your session!</h2>
              <p className="text-lg text-purple-200 mb-8">Your journey to clarity continues. Come back anytime you need a mental reset or a moment of reflection.</p>
              <button
                onClick={() => { setStage(0); setSessionFinished(false); }}
                className="py-4 px-8 rounded-2xl bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-500 transition-colors text-lg"
              >
                Start New Session
              </button>
            </div>
          )}
        </div>

        {/* Centralized Navigation */}
        {stage !== 4 && (
          <div className="flex w-64 space-x-4 mt-8">
            <button 
              onClick={goToPrevStage}
              disabled={stage === 0}
              className="flex-1 py-3 rounded-2xl bg-gray-700 text-white shadow-md hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Back
            </button>
            <button 
              onClick={goToNextStage}
              className="flex-1 py-3 rounded-2xl bg-purple-600 text-white shadow-md hover:bg-purple-500 transition-colors disabled:opacity-50"
              disabled={stage === stageCount - 1}
            >
              {stage === stageCount - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

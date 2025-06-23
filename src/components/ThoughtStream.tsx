import React, { useState, useEffect } from 'react';
import { Zap, Compass, Heart, RotateCw, Lightbulb } from 'lucide-react';

interface ThoughtStreamProps {
  isActive: boolean;
  onInteract: () => void;
  interactionCount: number;
  emotionalState: string;
}

// A unified type for all items that can appear in the stream
type StreamItem = {
  id: string;
  type: 'insight' | 'action' | 'compassion' | 'loop';
  text: string;
  repetitions?: number; // Specific to loops
};

// Mock analysis based on emotional state, simulating AI insight
const getInsightsForState = (emotionalState: string): StreamItem[] => {
  switch (emotionalState) {
    case 'Overwhelmed':
      return [
        { id: 'compassion1', type: 'compassion', text: "It's okay to feel this way. You are carrying a heavy load." },
        { id: 'loop1', type: 'loop', text: "I can't handle this", repetitions: 3 },
        { id: 'action1', type: 'action', text: 'Try a 2-minute breathing exercise to ground yourself.' },
      ];
    case 'Calm':
      return [
        { id: 'insight1', type: 'insight', text: "There's a pattern of peaceful acceptance here." },
        { id: 'action2', type: 'action', text: 'Consider what one small step you can take to build on this calm.' },
        { id: 'compassion2', type: 'compassion', text: "You've cultivated a space for clarity. Honor that." },
      ];
    default:
      return [
        { id: 'insight2', type: 'insight', text: 'You seem to be progressing with curiosity.' },
        { id: 'loop2', type: 'loop', text: 'What was I doing?', repetitions: 2 },
        { id: 'action3', type: 'action', text: 'Channel this energy into a creative outlet.' },
      ];
  }
};

const typeStyles = {
  insight: {
    icon: <Lightbulb />,
    gradient: 'from-purple-500/20 to-black/10',
    color: 'purple',
    label: 'Insight'
  },
  action: {
    icon: <Zap />,
    gradient: 'from-green-500/20 to-black/10',
    color: 'green',
    label: 'Action'
  },
  compassion: {
    icon: <Heart />,
    gradient: 'from-pink-500/20 to-black/10',
    color: 'pink',
    label: 'Compassion'
  },
  loop: {
    icon: <RotateCw />,
    gradient: 'from-blue-500/20 to-black/10',
    color: 'blue',
    label: 'Pattern'
  },
};

export const ThoughtStream = ({ isActive, onInteract, emotionalState }: ThoughtStreamProps) => {
  const [streamItems, setStreamItems] = useState<StreamItem[]>([]);

  useEffect(() => {
    if (isActive) {
      // Generate new insights when the component becomes active or the emotional state changes
      const newItems = getInsightsForState(emotionalState);
      setStreamItems(newItems);
    }
  }, [isActive, emotionalState]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6" onClick={onInteract}>
      {/* 1. Emotionally Intelligent Summary */}
      <div className="text-center mb-8">
        <h2 className="text-xl text-white">Here's what we're noticing in your thought patterns…</h2>
        <p className="text-purple-300">Emotional Flow: <span className="font-semibold">{emotionalState}, with gentle momentum.</span></p>
        </div>

      {/* 2. Unified Insight View */}
      <div className="relative space-y-4">
        {streamItems.map((item, index) => {
          const style = typeStyles[item.type];
            return (
            <div key={item.id} className={`relative rounded-2xl border border-${style.color}-400/20 bg-gradient-to-r ${style.gradient} p-4 shadow-lg animate-fade-in`} style={{ animationDelay: `${index * 150}ms`}}>
              <div className="flex items-start space-x-4">
                <div className={`text-${style.color}-400 mt-1`}>{style.icon}</div>
                <div>
                  <p className="text-white/90">{item.text}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-${style.color}-500/20 text-${style.color}-300`}>
                      {style.label} {item.repetitions && `(x${item.repetitions})`}
                        </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* Curved connection lines for loops */}
        {streamItems.filter(i => i.type === 'loop').map((item, idx, loops) => {
          if (idx === 0) return null;
          const prevLoopId = loops[idx-1].id;
          // Note: This is a visual representation. A real implementation would need element positions.
          return (
            <svg key={`line-${item.id}`} className="absolute w-full h-full top-0 left-0 pointer-events-none opacity-30">
              <path d={`M 20 ${idx * 110 + 40} C 80 ${idx * 110}, 80 ${(idx-1) * 110 + 80}, 20 ${(idx-1) * 110 + 40}`} stroke="url(#line-grad)" strokeWidth="2" fill="none" />
            </svg>
          )
        })}
      </div>

      {/* 3. Bottom Caption */}
      <p className="text-center text-gray-400 mt-12">
        Your thoughts are a story. Let's listen and shape it gently.
      </p>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
       <svg width="0" height="0">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0}} />
            <stop offset="50%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0}} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

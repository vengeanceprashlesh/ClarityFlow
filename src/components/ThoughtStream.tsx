
import React, { useState, useEffect } from 'react';
import { MessageCircle, Zap, ArrowRight, Brain } from 'lucide-react';

interface ThoughtStreamProps {
  isActive: boolean;
  onInteract: () => void;
  interactionCount: number;
}

interface ThoughtNode {
  id: string;
  content: string;
  type: 'question' | 'insight' | 'action';
  intensity: number;
}

export const ThoughtStream = ({ isActive, onInteract, interactionCount }: ThoughtStreamProps) => {
  const [thoughts, setThoughts] = useState<ThoughtNode[]>([]);
  const [streamActive, setStreamActive] = useState(false);

  const thoughtTemplates = {
    question: [
      "What triggers this emotional response?",
      "How does this serve your growth?",
      "What would change if you reframed this?",
      "Where is the evidence for this belief?"
    ],
    insight: [
      "Patterns reveal deeper truths",
      "Resistance often points to growth areas",
      "Your thoughts are not facts",
      "Progress isn't always linear"
    ],
    action: [
      "Practice the 5-4-3-2-1 grounding technique",
      "Challenge this thought with evidence",
      "Implement a structured response plan",
      "Create new neural pathways through repetition"
    ]
  };

  useEffect(() => {
    if (isActive) {
      setStreamActive(true);
      generateThought();
    }
  }, [isActive]);

  const generateThought = () => {
    const types: (keyof typeof thoughtTemplates)[] = ['question', 'insight', 'action'];
    const type = types[Math.floor(Math.random() * types.length)];
    const content = thoughtTemplates[type][Math.floor(Math.random() * thoughtTemplates[type].length)];
    
    const newThought: ThoughtNode = {
      id: Date.now().toString(),
      content,
      type,
      intensity: Math.random() * 0.8 + 0.2
    };

    setThoughts(prev => [newThought, ...prev.slice(0, 4)]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return MessageCircle;
      case 'insight': return Brain;
      case 'action': return Zap;
      default: return MessageCircle;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'text-blue-400 border-blue-400/30';
      case 'insight': return 'text-purple-400 border-purple-400/30';
      case 'action': return 'text-green-400 border-green-400/30';
      default: return 'text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className="relative h-96 group">
      {/* Stream Container */}
      <div className={`
        h-full rounded-xl bg-black/30 backdrop-blur-md border border-white/10
        transition-all duration-500 cursor-pointer
        ${isActive ? 'bg-black/50 border-purple-400/30 synaptic-glow' : 'hover:bg-black/40'}
      `} onClick={onInteract}>
        
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Zap className="w-5 h-5 text-purple-400" />
                {streamActive && (
                  <div className="absolute inset-0 bg-purple-400 blur-md opacity-50 animate-pulse"></div>
                )}
              </div>
              <span className="text-white mono text-sm">Thought Stream</span>
            </div>
            <div className="text-xs text-purple-300 mono">
              Flow: {interactionCount}
            </div>
          </div>
        </div>

        {/* Thought Nodes */}
        <div className="p-4 space-y-3 h-80 overflow-hidden">
          {thoughts.map((thought, index) => {
            const Icon = getTypeIcon(thought.type);
            const colorClass = getTypeColor(thought.type);
            
            return (
              <div 
                key={thought.id}
                className={`
                  relative transform transition-all duration-700 
                  ${index === 0 ? 'scale-100 opacity-100' : `scale-${100 - index * 10} opacity-${100 - index * 20}`}
                `}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`
                  p-3 rounded-lg border backdrop-blur-sm
                  ${colorClass} bg-white/5
                  hover:bg-white/10 transition-colors duration-300
                `}>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/90 text-sm mb-1">
                        {thought.content}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs opacity-60 mono uppercase">
                          {thought.type}
                        </span>
                        <div className="flex space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div 
                              key={i}
                              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                                i < thought.intensity * 5 ? 'bg-current' : 'bg-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Line */}
                {index < thoughts.length - 1 && (
                  <div className="absolute left-6 top-full w-px h-3 bg-gradient-to-b from-current to-transparent opacity-30"></div>
                )}
              </div>
            );
          })}

          {/* Stream Flow Animation */}
          {streamActive && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-6 top-20 bottom-20 w-px bg-gradient-to-b from-purple-400/60 via-blue-400/40 to-green-400/60 animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Generate New Thought */}
        <div className="absolute bottom-4 right-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              generateThought();
            }}
            className="p-2 rounded-full bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 hover:text-white transition-all duration-300 group"
          >
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Neural Activity Indicator */}
      {isActive && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
      )}
    </div>
  );
};

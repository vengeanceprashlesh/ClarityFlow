import React, { useState, useEffect } from 'react';
import { Key, Sparkles, ShieldCheck } from 'lucide-react';

interface CognitiveFrameworkProps {
  isActive: boolean;
  onInteract: () => void;
  emotionalState: string; // Used to determine which "key" to unlock
}

interface Framework {
  name: string;
  description: string;
  reason: string;
  icon: React.ReactNode;
}

// Mock AI to select a framework based on emotional state
const getUnlockedFramework = (emotionalState: string): Framework => {
  switch (emotionalState) {
    case 'Overwhelmed':
      return {
        name: "Grounding Practice",
        description: "A technique to anchor you in the present moment.",
        reason: "For when things feel too intense, this helps you find your center.",
        icon: <ShieldCheck className="w-16 h-16 text-teal-300" />
      };
    case 'Calm':
    case 'Focused':
       return {
        name: "Mindful Observation",
        description: "A method to notice thoughts without judgment.",
        reason: "To build on your clarity and strengthen your awareness.",
        icon: <Sparkles className="w-16 h-16 text-purple-300" />
      };
    default:
      return {
        name: "CBT Reframing",
        description: "A way to challenge and change unhelpful thoughts.",
        reason: "Because you've been exploring thought patterns, this tool can help shape them.",
        icon: <Key className="w-16 h-16 text-yellow-300" />
      };
  }
};

export const CognitiveFramework = ({ isActive, onInteract, emotionalState }: CognitiveFrameworkProps) => {
  const [unlockedFramework, setUnlockedFramework] = useState<Framework | null>(null);

  useEffect(() => {
    if (isActive) {
      // "Unlock" the framework when the component becomes active
      const framework = getUnlockedFramework(emotionalState);
      setUnlockedFramework(framework);
    }
  }, [isActive, emotionalState]);

  if (!unlockedFramework) {
    // Optional: Show a loading or unlocking animation here
    return <div className="text-center text-white">Unlocking your next tool...</div>;
  }

  return null;
};

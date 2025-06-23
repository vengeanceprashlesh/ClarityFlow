import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const EMOTIONS = [
  { name: 'Focused', color: 'green', icon: <Heart className="w-6 h-6" /> },
  { name: 'Energized', color: 'purple', icon: <Heart className="w-6 h-6" /> },
  { name: 'Calm', color: 'cyan', icon: <Heart className="w-6 h-6" /> },
  { name: 'Distracted', color: 'yellow', icon: <Heart className="w-6 h-6" /> },
  { name: 'Overwhelmed', color: 'red', icon: <Heart className="w-6 h-6" /> },
];

interface EmotionDecoderProps {
  isActive: boolean;
  onInteract: () => void;
  onEmotionChange: (emotion: string) => void;
  currentEmotion: string;
}

export const EmotionDecoder = ({ isActive, onInteract, onEmotionChange, currentEmotion }: EmotionDecoderProps) => {
  const [selectedEmotion, setSelectedEmotion] = useState(currentEmotion || 'Focused');
  const [recentEmotions, setRecentEmotions] = useState<string[]>([selectedEmotion]);
  const [transitioning, setTransitioning] = useState(false);
  const [cardAnimation, setCardAnimation] = useState('');

  useEffect(() => {
    if (selectedEmotion !== currentEmotion) {
      setTransitioning(true);
      setTimeout(() => {
        onEmotionChange(selectedEmotion);
        setRecentEmotions((prev) => [selectedEmotion, ...prev.filter(e => e !== selectedEmotion)].slice(0, 5));
        setTransitioning(false);
      }, 350);
    }
    // eslint-disable-next-line
  }, [selectedEmotion]);

  const mainEmotion = EMOTIONS.find(e => e.name === selectedEmotion) || EMOTIONS[0];

  // Animation map for each emotion
  const emotionAnimations: Record<string, string> = {
    Focused: 'animate-pulse-soft',
    Energized: 'animate-bounce-energized',
    Calm: 'animate-glow-calm',
    Distracted: 'animate-shake-distracted',
    Overwhelmed: 'animate-wiggle-overwhelmed',
  };

  // Handle emotion button click with animation
  const handleEmotionClick = (emotionName: string) => {
    setSelectedEmotion(emotionName);
    setCardAnimation(emotionAnimations[emotionName] || '');
    setTimeout(() => setCardAnimation(''), 900); // Remove after animation duration
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-12">
      {/* Main Emotion Card */}
      <div className="relative flex flex-col items-center mb-8">
        <div
          className={`relative z-10 w-64 h-64 flex flex-col items-center justify-center bg-black/40 rounded-3xl shadow-xl backdrop-blur-lg border border-${mainEmotion.color}-400/30
            transition-all duration-500
            ${transitioning ? 'animate-fadeOut' : 'animate-fadeIn'} ${cardAnimation}
          `}
          style={{ boxShadow: `0 0 40px 0 var(--tw-shadow-color, #${mainEmotion.color}4d)` }}
        >
          {/* Glowing ring animation */}
          <div className={`absolute inset-0 rounded-3xl pointer-events-none animate-glow-${mainEmotion.color}`} />
          <div className={`text-5xl mb-4 text-${mainEmotion.color}-300`}>{mainEmotion.icon}</div>
          <div className={`text-2xl font-bold text-${mainEmotion.color}-300 mb-2`}>{mainEmotion.name}</div>
          <div className="text-base text-gray-300">{getEmotionDescription(mainEmotion.name)}</div>
        </div>
        {/* Emotion Selector Cards */}
        <div className="flex flex-col items-center mt-8 space-y-4 w-64">
          {EMOTIONS.map((emotion) => (
            <button
              key={emotion.name}
              className={`
                w-full py-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10
                text-lg font-medium text-white flex items-center justify-center gap-2
                transition-all duration-300
                hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-${emotion.color}-400/50
                ${selectedEmotion === emotion.name ? `ring-4 ring-${emotion.color}-400/60` : ''}
              `}
              onClick={() => handleEmotionClick(emotion.name)}
              style={{ outline: 'none' }}
            >
              {emotion.icon} {emotion.name}
            </button>
          ))}
        </div>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes glow-green { 0% { box-shadow: 0 0 0 0 #22d3ee44; } 100% { box-shadow: 0 0 40px 20px #22d3ee44; } }
        @keyframes glow-purple { 0% { box-shadow: 0 0 0 0 #a855f744; } 100% { box-shadow: 0 0 40px 20px #a855f744; } }
        @keyframes glow-cyan { 0% { box-shadow: 0 0 0 0 #06b6d444; } 100% { box-shadow: 0 0 40px 20px #06b6d444; } }
        @keyframes glow-yellow { 0% { box-shadow: 0 0 0 0 #eab30844; } 100% { box-shadow: 0 0 40px 20px #eab30844; } }
        @keyframes glow-red { 0% { box-shadow: 0 0 0 0 #ef444444; } 100% { box-shadow: 0 0 40px 20px #ef444444; } }
        .animate-glow-green { animation: glow-green 2s infinite alternate; }
        .animate-glow-purple { animation: glow-purple 2s infinite alternate; }
        .animate-glow-cyan { animation: glow-cyan 2s infinite alternate; }
        .animate-glow-yellow { animation: glow-yellow 2s infinite alternate; }
        .animate-glow-red { animation: glow-red 2s infinite alternate; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @keyframes fadeOut { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(-20px); } }
        .animate-fadeIn { animation: fadeIn 0.35s; }
        .animate-fadeOut { animation: fadeOut 0.35s; }
        /* Custom Animations for Emotions */
        @keyframes pulse-soft { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .animate-pulse-soft { animation: pulse-soft 0.9s; }
        @keyframes bounce-energized { 0%, 100% { transform: translateY(0); } 30% { transform: translateY(-20px); } 60% { transform: translateY(10px); } 80% { transform: translateY(-5px); } }
        .animate-bounce-energized { animation: bounce-energized 0.9s; }
        @keyframes glow-calm { 0%, 100% { box-shadow: 0 0 40px 0 #06b6d4; } 50% { box-shadow: 0 0 80px 10px #06b6d4; } }
        .animate-glow-calm { animation: glow-calm 0.9s; }
        @keyframes shake-distracted { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-10px); } 40% { transform: translateX(10px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(6px); } }
        .animate-shake-distracted { animation: shake-distracted 0.9s; }
        @keyframes wiggle-overwhelmed { 0%, 100% { transform: rotate(0); } 20% { transform: rotate(-8deg); } 40% { transform: rotate(8deg); } 60% { transform: rotate(-4deg); } 80% { transform: rotate(4deg); } }
        .animate-wiggle-overwhelmed { animation: wiggle-overwhelmed 0.9s; }
      `}</style>
    </div>
  );
};

function getEmotionDescription(emotion: string) {
  switch (emotion) {
    case 'Focused': return 'Clear mind, optimal state';
    case 'Energized': return 'High motivation, ready for action';
    case 'Calm': return 'Balanced, receptive state';
    case 'Distracted': return 'Scattered focus, need centering';
    case 'Overwhelmed': return 'High stress, need grounding';
    default: return '';
  }
}

import React, { useState, useEffect } from 'react';
import { Circle, Sparkles } from 'lucide-react';

interface PsycheMirrorProps {
  isActive: boolean;
  onInteract: () => void;
  currentState: string;
  emotionalState: string;
}

  const thoughtPrompts = [
  "What triggered this feeling today?",
  "If your emotion had a color, what would it be?",
  "What part of you needs compassion right now?",
];

const thoughtSparks = [
  "You don't have to figure it all out — just observe it.",
  "There is no right or wrong answer. Only your answer.",
  "Write like no one is judging, not even you.",
];

export const PsycheMirror = ({ isActive, onInteract, currentState, emotionalState }: PsycheMirrorProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const stateColor = {
    Calm: 'cyan',
    Distracted: 'purple',
    Overwhelmed: 'gray',
    Focused: 'green',
    Energized: 'pink',
    Anxious: 'red',
  }[emotionalState] || 'purple';

  const handleNextQuestion = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestionIndex < thoughtPrompts.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserResponse(''); // Clear response for next question
    } else {
        // Logic for finishing, can be tied to parent later if needed
        console.log('Finished all questions');
      }
      setIsTransitioning(false);
    }, 400); // match transition duration
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div 
      className={`w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-8 rounded-3xl bg-black/30 backdrop-blur-xl border border-${stateColor}-500/20 transition-all duration-700`}
      style={{ boxShadow: `0 0 60px 0 rgba(var(--${stateColor}-rgb), 0.15)` }}
    >
      {/* Question Display */}
      <div className="text-center mb-8">
        <h2 className={`text-xl font-medium text-white transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {thoughtPrompts[currentQuestionIndex]}
        </h2>
        <p className={`text-sm text-gray-400 mt-3 transition-opacity duration-300 delay-100 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {thoughtSparks[currentQuestionIndex]}
        </p>
          </div>

      {/* Mirror Input */}
      <div 
        className={`relative w-full h-48 rounded-2xl border border-${stateColor}-500/30 bg-black/20 transition-all duration-500 ${isFocused ? `shadow-inner-glow-${stateColor}` : ''}`}
      >
        <textarea
          value={userResponse}
          onChange={(e) => setUserResponse(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Take your time… just write what feels true."
          className={`w-full h-full p-4 bg-transparent text-white/90 placeholder-gray-500 rounded-2xl resize-none focus:outline-none caret-${stateColor}-400 animate-caret-pulse`}
        />
        {/* Mirror Shimmer */}
        <div className={`absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl overflow-hidden
          before:content-[''] before:absolute before:top-0 before:-translate-x-full before:w-1/2 before:h-full
          before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
          ${isFocused ? 'before:animate-shimmer' : ''}
        `} />
          </div>

      {/* Navigation for within the component */}
      <div className="flex w-full justify-between items-center mt-8">
        <button 
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 rounded-xl bg-gray-700 text-white shadow-md hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        <div className="text-sm text-gray-400">
          Reflection Depth: {currentQuestionIndex + 1} of {thoughtPrompts.length}
        </div>
        <button 
          onClick={handleNextQuestion}
          className={`px-6 py-2 rounded-xl bg-${stateColor}-600 text-white shadow-md hover:bg-${stateColor}-500 transition-colors`}
        >
          {currentQuestionIndex === thoughtPrompts.length - 1 ? 'Last Question' : 'Next Question'}
        </button>
      </div>

      {/* Dynamic Color Styles */}
      <style>{`
        :root {
          --purple-rgb: 168, 85, 247;
          --cyan-rgb: 34, 211, 238;
          --green-rgb: 34, 197, 94;
          --pink-rgb: 236, 72, 153;
          --gray-rgb: 107, 114, 128;
          --red-rgb: 239, 68, 68;
        }
        .shadow-inner-glow-purple { box-shadow: inset 0 0 20px 0 rgba(var(--purple-rgb), 0.3); }
        .shadow-inner-glow-cyan { box-shadow: inset 0 0 20px 0 rgba(var(--cyan-rgb), 0.3); }
        .shadow-inner-glow-green { box-shadow: inset 0 0 20px 0 rgba(var(--green-rgb), 0.3); }
        .shadow-inner-glow-pink { box-shadow: inset 0 0 20px 0 rgba(var(--pink-rgb), 0.3); }
        .shadow-inner-glow-gray { box-shadow: inset 0 0 20px 0 rgba(var(--gray-rgb), 0.3); }
        .shadow-inner-glow-red { box-shadow: inset 0 0 20px 0 rgba(var(--red-rgb), 0.3); }
        @keyframes shimmer { 0% { transform: translateX(-100%) skewX(-30deg); } 100% { transform: translateX(200%) skewX(-30deg); } }
        .before\\:animate-shimmer::before { animation: shimmer 2.5s infinite; }
        @keyframes caret-pulse { 0%, 100% { caret-color: currentColor; } 50% { caret-color: transparent; } }
        .animate-caret-pulse { animation: caret-pulse 1.2s infinite; }
      `}</style>
    </div>
  );
};

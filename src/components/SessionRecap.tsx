import React, { useState } from 'react';
import { Sparkles, ArrowRight, Save, Wind, Repeat, Key, BookOpen } from 'lucide-react';

interface SessionRecapProps {
  initialMood: string;
  finalMood: string;
  unlockedTool: string;
  insightsCount: number;
  thoughtLoopsBroken: number;
  onContinue: () => void;
  onSave: () => void;
  isFinalStage?: boolean;
}

const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center justify-center text-center border border-white/10">
    <div className="mb-3 text-purple-300">{icon}</div>
    <p className="text-3xl font-bold text-white">{value}</p>
    <p className="text-sm text-purple-200/80">{label}</p>
  </div>
);

export const SessionRecap = ({
  initialMood,
  finalMood,
  unlockedTool,
  insightsCount,
  thoughtLoopsBroken,
  onContinue,
  onSave,
  isFinalStage = false
}: SessionRecapProps) => {
  const reframeAffirmations = [
    'This moment doesn\'t define you.',
    'Even pausing to reflect is powerful.',
    'You\'re allowed to feel without performing.'
  ];
  const [anchoredCard, setAnchoredCard] = useState<number | null>(null);
  const [showCalmModal, setShowCalmModal] = useState(false);

  return (
    <>
      <div className="w-full max-w-3xl mx-auto p-8 flex flex-col items-center text-center animate-fade-in-up font-manrope">
        <Sparkles className="w-12 h-12 text-yellow-300 mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2">Session Complete</h1>
        <p className="text-lg text-purple-300 mb-10">A summary of your journey to clarity.</p>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            icon={<Wind size={28} />} 
            value={`${initialMood} → ${finalMood}`}
            label="Mood Shift" 
          />
          <StatCard 
            icon={<Repeat size={28} />} 
            value={thoughtLoopsBroken}
            label="Loops Broken" 
          />
          <StatCard 
            icon={<Key size={28} />} 
            value={unlockedTool}
            label="Tool Unlocked" 
          />
          <div className="col-span-2 md:col-span-3">
             <StatCard 
                icon={<BookOpen size={28} />} 
                value={insightsCount}
                label="Insights Gained" 
              />
          </div>
        </div>
        
        <div className="w-full flex flex-col items-center mb-10">
          <h2 className="text-xl text-white mb-6">Choose an anchor for your journey:</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {reframeAffirmations.map((text, idx) => (
              <div
                key={idx}
                className={`relative cursor-pointer transition-all duration-500 px-6 py-5 rounded-2xl bg-black/40 border border-purple-400/20 shadow-lg text-lg text-purple-100 font-semibold max-w-xs
                  ${anchoredCard === idx ? 'ring-4 ring-yellow-300 animate-float-glow z-10' : 'hover:ring-2 hover:ring-purple-400/40 opacity-80'}
                  ${anchoredCard !== null && anchoredCard !== idx ? 'opacity-30 scale-95' : ''}
                `}
                onClick={() => setAnchoredCard(idx)}
                style={{ minWidth: '220px' }}
              >
                <span className="text-2xl mr-2 align-middle">✨</span> {text}
                {anchoredCard === idx && (
                  <div className="absolute -top-3 -right-3 bg-yellow-300 text-black text-xs px-2 py-1 rounded-full font-bold shadow">Anchored</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {anchoredCard !== null && (
        <div className="flex flex-col sm:flex-row w-full max-w-md space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={onSave}
            className="flex-1 py-4 rounded-2xl bg-black/30 text-white font-bold shadow-lg hover:bg-purple-500/20 border border-purple-400/30 transition-all flex items-center justify-center space-x-2"
          >
            <Save size={20} />
            <span>Save Session</span>
          </button>
          <button 
            onClick={onContinue}
            className="flex-1 py-4 rounded-2xl bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-500 transition-colors flex items-center justify-center space-x-2"
          >
            <span>{isFinalStage ? 'Finish' : 'Continue Journey'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
        )}
      </div>
      {/* Floating Calm Button (always fixed to viewport) */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-blue-900/80 text-blue-200 font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-lg hover:bg-blue-800/90 transition-all border border-blue-400/30 animate-fade-in-up"
        style={{backdropFilter: 'blur(6px)'}}
        onClick={() => setShowCalmModal(true)}
      >
        <span className="text-2xl">💫</span> Calm
      </button>

      {/* Calm Modal */}
      {showCalmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowCalmModal(false)}>
          <div
            className="relative bg-blue-950/90 rounded-3xl p-8 max-w-xs w-full flex flex-col items-center text-center shadow-2xl border border-blue-400/20 animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-blue-200 hover:text-blue-100 text-xl font-bold"
              onClick={() => setShowCalmModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            {/* Breathing Circle */}
            <div className="my-6">
              <div className="w-24 h-24 rounded-full bg-blue-400/20 border-4 border-blue-300 mx-auto animate-breathe-pulse" />
              <div className="mt-2 text-blue-200 font-semibold">Breathe in... Breathe out...</div>
            </div>
            {/* Calming Prompts */}
            <div className="space-y-3 mt-4">
              <div className="text-white">Name 3 things you can see</div>
              <div className="text-white">Put your feet on the floor and feel gravity</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;700&family=Zen+Maru+Gothic:wght@400;700&display=swap');
        
        .font-manrope {
            font-family: 'Manrope', sans-serif;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        @keyframes float-glow {
          0%, 100% { transform: translateY(0) scale(1.05); box-shadow: 0 0 40px 0 #fde68a66; }
          50% { transform: translateY(-12px) scale(1.09); box-shadow: 0 0 80px 10px #fde68a99; }
        }
        .animate-float-glow {
          animation: float-glow 2.2s infinite alternate;
        }
        @keyframes breathe-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.18); opacity: 1; }
        }
        .animate-breathe-pulse {
          animation: breathe-pulse 3.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}; 
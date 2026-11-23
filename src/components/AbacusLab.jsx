import React, { useState } from 'react';
import { RotateCcw, Eye, Sparkles, CheckCircle2, Trophy, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const RODS = [
  { id: 'TL', name: 'Ten Lakhs', multiplier: 1000000, short: '10L' },
  { id: 'L', name: 'Lakhs', multiplier: 100000, short: '1L' },
  { id: 'TTh', name: 'Ten Th', multiplier: 10000, short: '10K' },
  { id: 'Th', name: 'Thousands', multiplier: 1000, short: '1K' },
  { id: 'H', name: 'Hundreds', multiplier: 100, short: '100' },
  { id: 'T', name: 'Tens', multiplier: 10, short: '10' },
  { id: 'U', name: 'Units (Ones)', multiplier: 1, short: '1' }
];

const CHALLENGES = [
  { target: 4520, prompt: 'Show 4,520 on the Abacus' },
  { target: 25000, prompt: 'Show 25,000 on the Abacus' },
  { target: 124300, prompt: 'Show 1,24,300 on the Abacus' },
  { target: 308, prompt: 'Show 308 on the Abacus' },
  { target: 560000, prompt: 'Show 5,60,000 on the Abacus' },
  { target: 1500000, prompt: 'Show 15,00,000 on the Abacus' }
];

export const AbacusLab = ({ onEarnBonusStars }) => {
  const [mode, setMode] = useState('free'); // 'free' | 'challenge'
  // Rod states: for each rod, upper: boolean (value 5), lower: number of active beads (0 to 4)
  const [rodsState, setRodsState] = useState({
    TL: { upper: false, lower: 0 },
    L: { upper: false, lower: 0 },
    TTh: { upper: false, lower: 0 },
    Th: { upper: false, lower: 0 },
    H: { upper: false, lower: 0 },
    T: { upper: false, lower: 0 },
    U: { upper: false, lower: 0 }
  });

  const [showPlaceValues, setShowPlaceValues] = useState(true);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [challengeFeedback, setChallengeFeedback] = useState(null);

  // Compute total number on abacus
  const calculateTotal = () => {
    let total = 0;
    RODS.forEach(rod => {
      const state = rodsState[rod.id];
      const rodValue = (state.upper ? 5 : 0) + state.lower;
      total += rodValue * rod.multiplier;
    });
    return total;
  };

  const currentTotal = calculateTotal();

  const toggleUpperBead = (rodId) => {
    setRodsState(prev => ({
      ...prev,
      [rodId]: { ...prev[rodId], upper: !prev[rodId].upper }
    }));
  };

  const setLowerBeads = (rodId, count) => {
    setRodsState(prev => {
      // Toggle off if tapping already selected count
      const newLower = prev[rodId].lower === count ? count - 1 : count;
      return {
        ...prev,
        [rodId]: { ...prev[rodId], lower: Math.max(0, newLower) }
      };
    });
  };

  const resetAbacus = () => {
    setRodsState({
      TL: { upper: false, lower: 0 },
      L: { upper: false, lower: 0 },
      TTh: { upper: false, lower: 0 },
      Th: { upper: false, lower: 0 },
      H: { upper: false, lower: 0 },
      T: { upper: false, lower: 0 },
      U: { upper: false, lower: 0 }
    });
    setChallengeFeedback(null);
  };

  const checkChallenge = () => {
    const target = CHALLENGES[challengeIdx].target;
    if (currentTotal === target) {
      setChallengeFeedback('correct');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      if (onEarnBonusStars) onEarnBonusStars(10);
    } else {
      setChallengeFeedback('incorrect');
    }
  };

  const nextChallenge = () => {
    resetAbacus();
    setChallengeIdx((prev) => (prev + 1) % CHALLENGES.length);
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto animate-fade-in pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-5 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase mb-2">
          <span>🧮</span>
          <span>Hands-on Visual Maths</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-xs">
          Interactive Abacus Lab
        </h1>
        <p className="text-xs text-white/90 font-medium mt-0.5">
          Slide beads up and down to master Indian place values from Units up to Ten Lakhs!
        </p>

        {/* Live Total Display */}
        <div className="mt-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/80 block">
              Current Abacus Value
            </span>
            <span className="text-2xl font-black font-mono tracking-wider text-amber-200">
              {currentTotal.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={resetAbacus}
            className="p-2 bg-white/20 hover:bg-white/30 active:scale-95 text-white rounded-xl transition flex items-center gap-1 text-xs font-bold"
            title="Clear Abacus"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Mode Selector & Controls */}
      <div className="flex items-center justify-between bg-white border border-slate-200 p-2 rounded-2xl shadow-xs">
        <div className="flex gap-1.5">
          <button
            onClick={() => { setMode('free'); resetAbacus(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
              mode === 'free' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Free Play
          </button>
          <button
            onClick={() => { setMode('challenge'); resetAbacus(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
              mode === 'challenge' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Challenge Mode
          </button>
        </div>

        <button
          onClick={() => setShowPlaceValues(!showPlaceValues)}
          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition flex items-center gap-1 ${
            showPlaceValues
              ? 'bg-slate-100 text-slate-800 border-slate-300'
              : 'text-slate-400 border-slate-200'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Labels</span>
        </button>
      </div>

      {/* Challenge Card if Challenge Mode */}
      {mode === 'challenge' && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Target Mission #{challengeIdx + 1}</span>
            </span>
            <span className="text-xs font-bold text-amber-700">Goal: {CHALLENGES[challengeIdx].target.toLocaleString('en-IN')}</span>
          </div>

          <h3 className="text-sm font-extrabold text-slate-900">
            {CHALLENGES[challengeIdx].prompt}
          </h3>

          <div className="flex gap-2 pt-1">
            <button
              onClick={checkChallenge}
              className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-xs transition active:scale-95"
            >
              Verify on Abacus
            </button>
            {challengeFeedback === 'correct' && (
              <button
                onClick={nextChallenge}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition active:scale-95"
              >
                Next ➔
              </button>
            )}
          </div>

          {challengeFeedback === 'correct' && (
            <div className="p-2 bg-emerald-100/80 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Hurray! You created {CHALLENGES[challengeIdx].target.toLocaleString('en-IN')} correctly! (+10 Star Bonus)</span>
            </div>
          )}
          {challengeFeedback === 'incorrect' && (
            <div className="p-2 bg-rose-100/80 border border-rose-300 rounded-xl text-rose-800 text-xs font-bold flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Not quite. Your abacus shows {currentTotal.toLocaleString('en-IN')}. Adjust beads and try again!</span>
            </div>
          )}
        </div>
      )}

      {/* The 7-Rod Soroban/School Abacus Frame */}
      <div className="bg-gradient-to-b from-amber-900 via-amber-950 to-stone-900 p-3.5 rounded-3xl shadow-xl border-4 border-amber-800 relative">
        {/* Frame metallic corners */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-400"></div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-amber-400"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-400"></div>

        {/* Rods container */}
        <div className="bg-amber-950/80 rounded-2xl p-2.5 border border-amber-700/50 flex justify-between gap-1 relative overflow-hidden">
          
          {/* Horizontal Beam Separator (Beam value 5 divider) */}
          <div className="absolute left-0 right-0 top-[82px] h-3 bg-gradient-to-b from-stone-800 via-stone-900 to-black border-y border-amber-500/60 z-10 flex items-center justify-around pointer-events-none">
            {/* Unit reckoning dots on beam */}
            {RODS.map((rod, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full ${i === 3 || i === 6 ? 'bg-amber-300 shadow-xs' : 'bg-transparent'}`}
              />
            ))}
          </div>

          {RODS.map((rod) => {
            const state = rodsState[rod.id];
            const rodDigit = (state.upper ? 5 : 0) + state.lower;

            return (
              <div key={rod.id} className="flex-1 flex flex-col items-center">
                
                {/* Place value label */}
                {showPlaceValues && (
                  <span className="text-[9px] font-black uppercase text-amber-200/90 mb-1">
                    {rod.short}
                  </span>
                )}

                {/* Upper Deck (Value 5 Bead) */}
                <div 
                  onClick={() => toggleUpperBead(rod.id)}
                  className="w-full h-14 relative flex items-center justify-center cursor-pointer group"
                >
                  {/* Vertical Brass Rod */}
                  <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 rounded-full"></div>

                  {/* Upper Bead (sliding down toward beam when active) */}
                  <div
                    className={`absolute w-8 h-6 rounded-lg bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 border border-rose-300 shadow-md transition-all duration-200 flex items-center justify-center text-[10px] font-black text-white ${
                      state.upper ? 'bottom-0 translate-y-0' : 'top-0'
                    }`}
                  >
                    5
                  </div>
                </div>

                {/* Spacer for horizontal beam */}
                <div className="h-4"></div>

                {/* Lower Deck (4 Beads each value 1) */}
                <div className="w-full h-36 relative flex flex-col justify-end items-center">
                  {/* Vertical Brass Rod */}
                  <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 rounded-full"></div>

                  {/* 4 lower beads */}
                  <div className="relative w-full h-full flex flex-col justify-between py-1">
                    {[1, 2, 3, 4].map((beadIndex) => {
                      const isActive = state.lower >= (5 - beadIndex);

                      return (
                        <div
                          key={beadIndex}
                          onClick={() => setLowerBeads(rod.id, 5 - beadIndex)}
                          className="h-7 w-full flex items-center justify-center cursor-pointer relative"
                        >
                          <div
                            className={`w-8 h-6 rounded-lg border shadow-sm transition-all duration-150 flex items-center justify-center text-[9px] font-black text-white ${
                              isActive
                                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 border-cyan-200 -translate-y-2'
                                : 'bg-gradient-to-r from-blue-700 to-indigo-800 border-blue-600/60 translate-y-1 opacity-70'
                            }`}
                          >
                            1
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Digit Count */}
                <div className="mt-2 text-center">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-xs">
                    {rodDigit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Place Value Explanation Card */}
      <div className="p-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-1 shadow-xs">
        <div className="font-extrabold text-slate-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>How Soroban Abacus works:</span>
        </div>
        <p>• Top bead (Pink) = Value <strong>5</strong> when pushed DOWN to the beam.</p>
        <p>• Bottom 4 beads (Blue) = Value <strong>1</strong> each when pushed UP to the beam.</p>
        <p>• Rods from right to left follow the Indian numbering system: <strong>Units $\rightarrow$ Tens $\rightarrow$ Hundreds $\rightarrow$ Thousands $\rightarrow$ 10K $\rightarrow$ Lakhs $\rightarrow$ 10 Lakhs</strong>.</p>
      </div>
    </div>
  );
};

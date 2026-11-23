import React from 'react';
import { Sparkles, Trophy, Shield } from 'lucide-react';
import { AVATARS } from '../data/curriculum.js';

export const TopHeader = ({ gameState, onOpenTrophy, onOpenParent }) => {
  const currentAvatar = AVATARS.find(a => a.id === gameState.avatar) || AVATARS[0];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2.5">
        <button 
          onClick={onOpenTrophy}
          className="relative text-2xl p-1.5 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full shadow-sm active:scale-95 transition-transform"
          title="Change Avatar"
        >
          <span>{currentAvatar.icon}</span>
          <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-[10px] text-white font-bold px-1.5 py-0.2 rounded-full border border-white shadow-xs">
            Lvl {Math.floor(gameState.xp / 100) + 1}
          </span>
        </button>
        <div>
          <div className="text-xs font-extrabold text-slate-800 leading-tight flex items-center gap-1">
            {gameState.playerName}
          </div>
          <div className="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{gameState.xp} XP</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Coins display */}
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full text-xs font-black text-amber-700 shadow-xs">
          <span className="text-sm">🪙</span>
          <span>{gameState.coins}</span>
        </div>

        {/* Trophy Room button */}
        <button
          onClick={onOpenTrophy}
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-amber-600 border border-slate-200 active:scale-95 transition"
          title="Trophy Room & Shop"
        >
          <Trophy className="w-4 h-4 fill-amber-500 text-amber-600" />
        </button>

        {/* Parent Dashboard button */}
        <button
          onClick={onOpenParent}
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-indigo-600 border border-slate-200 active:scale-95 transition"
          title="Parent Dashboard"
        >
          <Shield className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

import React from 'react';
import { Sparkles, Trophy, Shield, Heart } from 'lucide-react';
import { AVATARS } from '../data/curriculum';

export const TopHeader = ({ gameState, onOpenTrophy, onOpenParent }) => {
  const currentAvatar = AVATARS.find(a => a.id === gameState.avatar) || AVATARS[0];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-white shadow-lg">
      <div className="flex items-center gap-2.5">
        <button 
          onClick={onOpenTrophy}
          className="relative text-2xl p-1.5 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-full shadow-md active:scale-95 transition-transform"
          title="Change Avatar"
        >
          <span>{currentAvatar.icon}</span>
          <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-slate-900">
            Lvl {Math.floor(gameState.xp / 100) + 1}
          </span>
        </button>
        <div>
          <div className="text-xs font-bold text-slate-300 leading-tight flex items-center gap-1">
            {gameState.playerName}
          </div>
          <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{gameState.xp} XP</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Coins display */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-bold text-amber-300 shadow-inner">
          <span className="text-sm">🪙</span>
          <span>{gameState.coins}</span>
        </div>

        {/* Trophy Room button */}
        <button
          onClick={onOpenTrophy}
          className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700 active:scale-95 transition"
          title="Trophy Room & Shop"
        >
          <Trophy className="w-4 h-4" />
        </button>

        {/* Parent Dashboard button */}
        <button
          onClick={onOpenParent}
          className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 active:scale-95 transition"
          title="Parent Dashboard"
        >
          <Shield className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

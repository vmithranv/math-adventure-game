import React, { useState } from 'react';
import { X, Check, Lock } from 'lucide-react';
import { AVATARS, BADGES } from '../data/curriculum.js';

export const TrophyRoomModal = ({ gameState, onClose, onBuyAvatar, onSelectAvatar }) => {
  const [activeTab, setActiveTab] = useState('avatars');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in text-slate-800">
      <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <h2 className="text-base font-black text-slate-950">Trophy Room & Shop</h2>
              <p className="text-xs font-semibold text-slate-900">Customise your hero & view achievements</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-slate-950 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance & Tabs */}
        <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('avatars')}
              className={`px-3 py-1 rounded-full text-xs font-extrabold transition ${
                activeTab === 'avatars'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Avatars
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-3 py-1 rounded-full text-xs font-extrabold transition ${
                activeTab === 'badges'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Badges ({gameState.unlockedBadges.length}/{BADGES.length})
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-black text-amber-700">
            <span>🪙</span>
            <span>{gameState.coins} Coins</span>
          </div>
        </div>

        {/* Content body */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-white">
          {activeTab === 'avatars' ? (
            <div className="space-y-3">
              {AVATARS.map((av) => {
                const isUnlocked = gameState.unlockedAvatars.includes(av.id);
                const isSelected = gameState.avatar === av.id;

                return (
                  <div
                    key={av.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-400 shadow-xs'
                        : isUnlocked
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-slate-50/50 border-slate-200/60 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-3xl shadow-xs">
                        {av.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-extrabold text-slate-800">{av.name}</h4>
                          {isSelected && (
                            <span className="text-[9px] font-black uppercase bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">{av.desc}</p>
                      </div>
                    </div>

                    <div>
                      {isSelected ? (
                        <div className="p-2 rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => onSelectAvatar(av.id)}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-xs active:scale-95 transition"
                        >
                          Equip
                        </button>
                      ) : (
                        <button
                          disabled={gameState.coins < av.cost}
                          onClick={() => onBuyAvatar(av.id, av.cost)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition ${
                            gameState.coins >= av.cost
                              ? 'bg-amber-500 hover:bg-amber-600 text-white font-black'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          }`}
                        >
                          <Lock className="w-3 h-3" />
                          <span>{av.cost} 🪙</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {BADGES.map((badge) => {
                const unlocked = gameState.unlockedBadges.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                      unlocked
                        ? 'bg-amber-50/80 border-amber-300'
                        : 'bg-slate-50/50 border-slate-200/60 opacity-60'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs ${
                      unlocked ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-bold ${unlocked ? 'text-amber-900' : 'text-slate-500'}`}>
                          {badge.title}
                        </h4>
                        {unlocked && (
                          <span className="text-[9px] font-black uppercase bg-amber-500 text-white px-2 py-0.5 rounded-full">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

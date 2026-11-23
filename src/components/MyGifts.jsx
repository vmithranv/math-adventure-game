import React, { useState } from 'react';
import { Sparkles, Heart, Award, Gift, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MysteryGiftModal = ({ gift, level, playerName, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    setIsOpen(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in text-slate-800">
      <div className="bg-white border-2 border-amber-300 w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

        {!isOpen ? (
          <div className="space-y-4 py-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block">
              Level {level.id} Complete! 🎉
            </span>

            <h2 className="text-xl font-black text-slate-900">
              You Won a Mystery Gift!
            </h2>
            <p className="text-xs text-slate-600">
              Tap the golden gift box below to unwrap your special reward!
            </p>

            <button
              onClick={handleOpenGift}
              className="my-4 text-7xl inline-block transform hover:scale-110 active:scale-95 transition cursor-pointer animate-bounce"
            >
              🎁
            </button>

            <div>
              <button
                onClick={handleOpenGift}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-sm rounded-2xl shadow-md transition active:scale-95"
              >
                Tap to Open Gift Box!
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2 animate-fade-in">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              New Item Unlocked! ✨
            </span>

            <div className="text-6xl animate-float my-2">
              {gift.icon}
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">
                {gift.name}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                {gift.desc}
              </p>
            </div>

            {/* If Certificate */}
            {gift.type === 'certificate' && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-900 font-serif shadow-xs">
                <p className="text-[10px] uppercase tracking-widest font-sans font-bold text-amber-700">Certificate of Excellence</p>
                <p className="font-bold text-sm my-0.5">{playerName}</p>
                <p className="text-[11px] italic">Master of Grade 6 Mathematics</p>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Add to "My Gifts" Shelf</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const MyGiftsShelf = ({ unlockedGifts, playerName }) => {
  return (
    <div className="p-4 space-y-4 max-w-md mx-auto animate-fade-in pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-5 text-white shadow-lg shadow-pink-500/20 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase mb-2">
          <span>🎁</span>
          <span>Personal Trophy Room</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-xs">
          My Gifts & Collectibles
        </h1>
        <p className="text-xs text-white/90 font-medium mt-0.5">
          Every completed level unlocks an enchanting companion, theme, or gold trophy!
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full">
            Unlocked: {unlockedGifts.length} / 6 Gifts
          </span>
        </div>
      </div>

      {/* Gifts Grid */}
      <div className="grid grid-cols-2 gap-3">
        {unlockedGifts.map((gift) => (
          <div
            key={gift.id}
            className="p-4 bg-white border border-slate-200/90 rounded-3xl shadow-sm flex flex-col items-center text-center space-y-2 hover:border-pink-300 transition"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-50 to-purple-50 border border-pink-100 flex items-center justify-center text-4xl shadow-xs animate-float">
              {gift.icon}
            </div>

            <div>
              <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                {gift.name}
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 block mt-0.5">
                {gift.type}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 font-medium line-clamp-2">
              {gift.desc}
            </p>
          </div>
        ))}

        {/* Empty slots placeholders up to 6 */}
        {Array.from({ length: Math.max(0, 6 - unlockedGifts.length) }).map((_, idx) => (
          <div
            key={`locked_${idx}`}
            className="p-4 bg-slate-50/70 border border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center text-center space-y-2 opacity-60 min-h-[160px]"
          >
            <span className="text-3xl text-slate-400">🔒</span>
            <span className="text-xs font-bold text-slate-500">
              Mystery Gift #{unlockedGifts.length + idx + 1}
            </span>
            <span className="text-[10px] text-slate-400">
              Complete Level {unlockedGifts.length + idx + 1} to unlock!
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

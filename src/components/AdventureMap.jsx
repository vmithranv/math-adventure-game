import React from 'react';
import { Star, Lock, Swords, Play } from 'lucide-react';
import { WORLDS } from '../data/curriculum.js';

export const AdventureMap = ({ gameState, onSelectStage, isStageUnlocked }) => {
  return (
    <div className="py-4 px-3 space-y-5 max-w-md mx-auto">
      {/* Adventure Header Banner matching cyan/blue gradient card style */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 rounded-3xl p-5 text-white shadow-lg shadow-cyan-600/20 relative overflow-hidden">
        {/* Subtle white decorative pill on top */}
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase mb-3">
          <span>✨</span>
          <span>CBSE Class 6 Maths Quest</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-xs">
              Math Adventure Map
            </h1>
            <p className="text-xs text-white/90 mt-1 max-w-xs font-medium leading-relaxed">
              Conquer 5 enchanted worlds, master Class 6 maths, and defeat chapter bosses!
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0 shadow-xs">
            ⚡
          </div>
        </div>
      </div>

      {/* World progression chain */}
      <div className="space-y-4">
        {WORLDS.map((world) => {
          const worldLocked = !isStageUnlocked(world.id, 1);

          return (
            <div 
              key={world.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                worldLocked 
                  ? 'bg-slate-50 border-slate-200/60 opacity-60' 
                  : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50'
              }`}
            >
              {/* World Header */}
              <div className={`p-4 bg-gradient-to-r ${world.themeColor} text-white flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-white/20 rounded-2xl backdrop-blur-sm shadow-xs">
                    {world.id === 1 ? '👑' : world.id === 2 ? '🌲' : world.id === 3 ? '🏝️' : world.id === 4 ? '📐' : '🏔️'}
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/90 bg-black/15 px-2 py-0.5 rounded-md inline-block">
                      World {world.id}
                    </span>
                    <h2 className="text-base font-extrabold leading-tight text-white drop-shadow-xs">
                      {world.name}
                    </h2>
                    <p className="text-[11px] text-white/90 font-medium">
                      {world.chapter}
                    </p>
                  </div>
                </div>

                {worldLocked && (
                  <div className="flex items-center gap-1 bg-black/25 px-2.5 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </div>
                )}
              </div>

              {/* Stages List within World */}
              <div className="p-3 space-y-2.5">
                {world.stages.map((stage) => {
                  const unlocked = isStageUnlocked(world.id, stage.id);
                  const progressKey = `${world.id}_${stage.id}`;
                  const progress = gameState.stageProgress[progressKey] || { stars: 0, highscore: 0 };

                  return (
                    <button
                      key={stage.id}
                      disabled={!unlocked}
                      onClick={() => onSelectStage(world, stage)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                        !unlocked
                          ? 'bg-slate-100/60 border-slate-200 text-slate-400 cursor-not-allowed'
                          : stage.isBoss
                            ? 'bg-gradient-to-r from-rose-50 via-amber-50 to-white border-rose-200 hover:border-rose-300 hover:shadow-sm active:scale-[0.98]'
                            : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80 hover:border-indigo-300 hover:shadow-xs active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Stage Number / Boss icon */}
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                          !unlocked
                            ? 'bg-slate-200 text-slate-400'
                            : stage.isBoss
                              ? 'bg-gradient-to-tr from-rose-500 to-amber-500 text-white animate-pulse-subtle'
                              : 'bg-indigo-600 text-white shadow-indigo-600/20'
                        }`}>
                          {stage.isBoss ? <Swords className="w-4 h-4" /> : stage.id}
                        </div>

                        {/* Title and subtitle */}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className={`text-xs font-bold ${!unlocked ? 'text-slate-400' : 'text-slate-800 group-hover:text-indigo-600 transition'}`}>
                              {stage.title}
                            </h3>
                            {stage.isBoss && unlocked && (
                              <span className="text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white px-1.5 py-0.2 rounded-md">
                                Boss
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">
                            {stage.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right side: Lock or Stars */}
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        {!unlocked ? (
                          <Lock className="w-4 h-4 text-slate-400" />
                        ) : (
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3].map((starNum) => (
                              <Star
                                key={starNum}
                                className={`w-3.5 h-3.5 ${
                                  starNum <= progress.stars
                                    ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                                    : 'text-slate-300'
                                }`}
                              />
                            ))}
                            <div className="ml-1 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

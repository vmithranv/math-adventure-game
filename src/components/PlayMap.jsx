import React from 'react';
import { Star, Lock, Play, Gift } from 'lucide-react';
import { LEVELS } from '../data/gameCurriculum.js';

export const PlayMap = ({ gameState, onSelectStage, isStageUnlocked }) => {
  return (
    <div className="py-4 px-3 space-y-4 max-w-md mx-auto animate-fade-in pb-16">
      {/* Top Banner (Vibrant cyan-blue gradient card) */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 rounded-3xl p-5 text-white shadow-lg shadow-cyan-600/20 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase mb-2">
          <span>✨</span>
          <span>CBSE Class 6 Maths Quest</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-xs">
              Nichus Maths Game
            </h1>
            <p className="text-xs text-white/90 mt-1 max-w-xs font-medium leading-relaxed">
              Explore 6 cheerful levels at your own pace. Solve math puzzles and open mystery gifts!
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0 shadow-xs">
            🌟
          </div>
        </div>
      </div>

      {/* Levels list */}
      <div className="space-y-4">
        {LEVELS.map((level) => {
          const levelUnlocked = isStageUnlocked(level.id, 1);
          // Check if all 4 stages are completed
          const allStagesDone = [1, 2, 3, 4].every(
            (sId) => (gameState.stageProgress[`${level.id}_${sId}`]?.stars || 0) > 0
          );

          return (
            <div
              key={level.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                !levelUnlocked
                  ? 'bg-slate-50 border-slate-200/60 opacity-60'
                  : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50'
              }`}
            >
              {/* Level Header */}
              <div className={`p-4 bg-gradient-to-r ${level.themeColor} text-white flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-white/20 rounded-2xl backdrop-blur-sm shadow-xs">
                    {level.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/90 bg-black/15 px-2 py-0.5 rounded-md inline-block">
                      Level {level.id}
                    </span>
                    <h2 className="text-base font-extrabold leading-tight text-white drop-shadow-xs">
                      {level.name}
                    </h2>
                    <p className="text-[11px] text-white/90 font-medium">
                      {level.chapter}
                    </p>
                  </div>
                </div>

                {!levelUnlocked ? (
                  <div className="flex items-center gap-1 bg-black/25 px-2.5 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </div>
                ) : allStagesDone ? (
                  <div className="flex items-center gap-1 bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-full text-xs shadow-xs">
                    <Gift className="w-3.5 h-3.5" />
                    <span>Gift Won!</span>
                  </div>
                ) : null}
              </div>

              {/* Stages List */}
              <div className="p-3 space-y-2.5">
                {level.stages.map((stage) => {
                  const unlocked = isStageUnlocked(level.id, stage.id);
                  const progressKey = `${level.id}_${stage.id}`;
                  const progress = gameState.stageProgress[progressKey] || { stars: 0 };

                  return (
                    <button
                      key={stage.id}
                      disabled={!unlocked}
                      onClick={() => onSelectStage(level, stage)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                        !unlocked
                          ? 'bg-slate-100/60 border-slate-200 text-slate-400 cursor-not-allowed'
                          : stage.isBoss
                            ? 'bg-gradient-to-r from-amber-50 via-rose-50 to-white border-amber-200 hover:border-amber-300 hover:shadow-xs active:scale-[0.98]'
                            : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80 hover:border-indigo-300 hover:shadow-xs active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                          !unlocked
                            ? 'bg-slate-200 text-slate-400'
                            : stage.isBoss
                              ? 'bg-gradient-to-tr from-amber-500 to-rose-500 text-white animate-pulse-subtle'
                              : 'bg-indigo-600 text-white'
                        }`}>
                          {stage.isBoss ? '⭐' : stage.id}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className={`text-xs font-bold ${!unlocked ? 'text-slate-400' : 'text-slate-800 group-hover:text-indigo-600 transition'}`}>
                              {stage.title}
                            </h3>
                            {stage.isBoss && unlocked && (
                              <span className="text-[9px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-md">
                                Challenge
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">
                            {stage.subtitle}
                          </p>
                        </div>
                      </div>

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

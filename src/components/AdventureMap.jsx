import React from 'react';
import { Star, Lock, Swords, Play } from 'lucide-react';
import { WORLDS } from '../data/curriculum';

export const AdventureMap = ({ gameState, onSelectStage, isStageUnlocked }) => {
  return (
    <div className="py-4 px-3 space-y-6 max-w-md mx-auto">
      {/* Adventure Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900/80 border border-indigo-500/30 rounded-2xl p-4 text-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-400 bg-indigo-950/80 border border-indigo-700/50 px-3 py-0.5 rounded-full inline-block mb-1.5">
          CBSE Class 6 Maths Quest
        </span>
        <h1 className="text-xl font-extrabold text-white tracking-wide">
          Math Adventure Map
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
          Conquer 5 enchanted math worlds, earn stars, and defeat epic chapter bosses!
        </p>
      </div>

      {/* World progression chain */}
      <div className="space-y-6">
        {WORLDS.map((world, worldIdx) => {
          const worldLocked = !isStageUnlocked(world.id, 1);

          return (
            <div 
              key={world.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg ${
                worldLocked 
                  ? 'bg-slate-900/40 border-slate-800 opacity-75' 
                  : 'bg-slate-900/90 border-slate-700/80'
              }`}
            >
              {/* World Header */}
              <div className={`p-4 bg-gradient-to-r ${world.themeColor} text-white flex items-center justify-between`}>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-2 bg-black/20 rounded-xl backdrop-blur-sm shadow-inner">
                    {world.id === 1 ? '👑' : world.id === 2 ? '🌲' : world.id === 3 ? '🏝️' : world.id === 4 ? '📐' : '🏔️'}
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/80 bg-black/20 px-2 py-0.5 rounded-md">
                      World {world.id}
                    </span>
                    <h2 className="text-base font-extrabold leading-tight text-white drop-shadow">
                      {world.name}
                    </h2>
                    <p className="text-[11px] text-white/90 font-medium">
                      {world.chapter}
                    </p>
                  </div>
                </div>

                {worldLocked && (
                  <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full text-xs font-bold text-amber-300 border border-amber-400/30">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </div>
                )}
              </div>

              {/* Stages List within World */}
              <div className="p-3 space-y-2.5">
                {world.stages.map((stage, stageIdx) => {
                  const unlocked = isStageUnlocked(world.id, stage.id);
                  const progressKey = `${world.id}_${stage.id}`;
                  const progress = gameState.stageProgress[progressKey] || { stars: 0, highscore: 0 };

                  return (
                    <button
                      key={stage.id}
                      disabled={!unlocked}
                      onClick={() => onSelectStage(world, stage)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                        !unlocked
                          ? 'bg-slate-950/40 border-slate-800 text-slate-500 cursor-not-allowed'
                          : stage.isBoss
                            ? 'bg-gradient-to-r from-red-950/40 via-amber-950/30 to-slate-900 border-red-500/40 hover:border-red-400 active:scale-[0.98]'
                            : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-slate-500 active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Stage Number / Boss icon */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                          !unlocked
                            ? 'bg-slate-800 text-slate-600'
                            : stage.isBoss
                              ? 'bg-gradient-to-tr from-red-600 to-amber-500 text-white animate-pulse-subtle'
                              : 'bg-indigo-600 text-white'
                        }`}>
                          {stage.isBoss ? <Swords className="w-4 h-4" /> : stage.id}
                        </div>

                        {/* Title and subtitle */}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className={`text-xs font-bold ${!unlocked ? 'text-slate-500' : 'text-slate-100 group-hover:text-amber-400 transition'}`}>
                              {stage.title}
                            </h3>
                            {stage.isBoss && unlocked && (
                              <span className="text-[9px] font-black uppercase tracking-wider bg-red-600 text-white px-1.5 py-0.2 rounded">
                                Boss
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {stage.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right side: Lock or Stars */}
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        {!unlocked ? (
                          <Lock className="w-4 h-4 text-slate-600" />
                        ) : (
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3].map((starNum) => (
                              <Star
                                key={starNum}
                                className={`w-3.5 h-3.5 ${
                                  starNum <= progress.stars
                                    ? 'text-yellow-400 fill-yellow-400 drop-shadow'
                                    : 'text-slate-600'
                                }`}
                              />
                            ))}
                            <div className="ml-1 w-6 h-6 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition">
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

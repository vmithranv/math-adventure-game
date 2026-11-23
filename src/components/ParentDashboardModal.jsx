import React, { useState } from 'react';
import { X, Lock, Clock, Target, AlertTriangle, RotateCcw } from 'lucide-react';
import { WORLDS } from '../data/curriculum.js';

export const ParentDashboardModal = ({ gameState, onClose, onResetProgress, onSetParentPin }) => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === gameState.parentPin) {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect PIN! Default PIN is 1234');
      setPinInput('');
    }
  };

  const totalQuestions = Object.values(gameState.topicStats).reduce((acc, curr) => acc + (curr?.total || 0), 0);
  const totalCorrect = Object.values(gameState.topicStats).reduce((acc, curr) => acc + (curr?.correct || 0), 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const totalTimeSeconds = Object.values(gameState.topicStats).reduce((acc, curr) => acc + (curr?.timeSpentSeconds || 0), 0);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    if (mins === 0) return `${remainingSec}s`;
    return `${mins}m ${remainingSec}s`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in text-slate-800">
      <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <div>
              <h2 className="text-base font-black">Parent Dashboard</h2>
              <p className="text-xs text-blue-100 font-medium">Learning Analytics & Progress Insights</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* PIN Verification screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-800">Enter Parent Security PIN</h3>
              <p className="text-xs text-slate-500 mt-1">Default PIN is <span className="font-mono font-bold text-blue-600">1234</span></p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4 max-w-xs mx-auto">
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="4-digit PIN"
                className="w-full text-center text-xl tracking-widest font-mono py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:border-blue-500"
                autoFocus
              />

              {errorMsg && (
                <p className="text-xs font-semibold text-rose-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-2xl transition shadow-md active:scale-95"
              >
                Unlock Analytics
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Analytics Screen */
          <div className="p-4 overflow-y-auto space-y-4 flex-1 bg-white">
            {/* Top metric highlights */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <Target className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-lg font-black text-emerald-600">{overallAccuracy}%</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Accuracy</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <Clock className="w-4 h-4 text-cyan-600 mx-auto mb-1" />
                <div className="text-sm font-black text-cyan-600 mt-1">{formatTime(totalTimeSeconds)}</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Time Spent</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <div className="text-lg font-black text-amber-600">{totalQuestions}</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Questions</div>
              </div>
            </div>

            {/* Topic Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Performance by Chapter
              </h4>

              {WORLDS.map((world) => {
                const stats = gameState.topicStats[world.id] || { correct: 0, total: 0, timeSpentSeconds: 0 };
                const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                const isWeak = stats.total >= 3 && pct < 65;

                return (
                  <div key={world.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {world.id === 1 ? '👑' : world.id === 2 ? '🌲' : world.id === 3 ? '🏝️' : world.id === 4 ? '📐' : '🏔️'}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-800">{world.name}</div>
                          <div className="text-[10px] text-slate-500">{world.chapter}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-xs font-black ${pct >= 75 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-slate-400'}`}>
                          {stats.total > 0 ? `${pct}%` : 'Not tested'}
                        </span>
                        <div className="text-[10px] text-slate-400 font-medium">{stats.correct}/{stats.total} right</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {isWeak && (
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-1 rounded-xl">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                        <span>Recommended for practice: Review this chapter</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reset Data */}
            <div className="pt-2">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all game progress and analytics?')) {
                    onResetProgress();
                    onClose();
                  }
                }}
                className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 text-xs font-extrabold rounded-2xl flex items-center justify-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Child Learning Data</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

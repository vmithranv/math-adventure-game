import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  X, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StagePlayEngine = ({ 
  level, 
  stage, 
  onClose, 
  onCompleteStage, 
  onAddReward,
  onLevelFullyCompleted
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Learning Aids
  const [showHintModal, setShowHintModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  
  // End of stage summary
  const [isStageWon, setIsStageWon] = useState(false);

  // Generate 10 bite-sized questions for self-paced learning
  useEffect(() => {
    const qCount = 10;
    const generated = [];
    for (let i = 0; i < qCount; i++) {
      generated.push(level.generator(stage.id));
    }
    setQuestions(generated);
  }, [level, stage]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (opt) => {
    if (isAnswerChecked) return;
    setSelectedOption(opt);
  };

  const checkAnswer = () => {
    if (selectedOption === null || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const correct = String(selectedOption) === String(currentQ.answer);
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 10);
      setCorrectCount(prev => prev + 1);

      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 }
      });
    } else {
      // Gentle encouragement: auto-show friendly step-by-step solution
      setShowSolutionModal(true);
    }
  };

  const handleNextQuestion = () => {
    setShowSolutionModal(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleStageVictory();
    }
  };

  const handleStageVictory = () => {
    setIsStageWon(true);
    
    // Encouraging star rating (at least 2 stars for completing, 3 for 80%+ accuracy)
    let stars = 2;
    if (correctCount >= 8) stars = 3;

    onAddReward(stars * 10, score + 20);
    onCompleteStage(level.id, stage.id, stars, score);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // If this was Stage 4 (final stage of Level), check for gift unlock!
    if (stage.id === 4 && onLevelFullyCompleted) {
      onLevelFullyCompleted(level);
    }
  };

  if (!currentQ && !isStageWon) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-bold text-slate-600">Summoning Fun Questions...</p>
      </div>
    );
  }

  // STAGE VICTORY MODAL
  if (isStageWon) {
    const stars = correctCount >= 8 ? 3 : 2;

    return (
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-slate-800 animate-fade-in">
        <div className="max-w-sm w-full bg-white border border-amber-200 rounded-3xl p-6 text-center shadow-2xl space-y-4">
          <div className="text-5xl animate-bounce">
            🎉
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
              Stage Completed! 🌟
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-2">{stage.title}</h2>
            <p className="text-xs text-slate-500 font-medium">{level.name}</p>
          </div>

          {/* 3 Stars Animation */}
          <div className="flex justify-center gap-2 py-1">
            {[1, 2, 3].map((star) => (
              <span 
                key={star} 
                className={`text-4xl transition-all transform ${
                  star <= stars ? 'scale-110 drop-shadow-md' : 'opacity-25 grayscale'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          <p className="text-xs text-emerald-700 font-bold bg-emerald-50 py-1.5 px-3 rounded-xl border border-emerald-200">
            Great job! You solved {correctCount} out of 10 correctly!
          </p>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black rounded-2xl shadow-md transition active:scale-95 text-sm"
          >
            Claim Stars & Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col justify-between overflow-hidden text-slate-800">
      {/* Top Navigation & Status Bar */}
      <div className="p-3 bg-white border-b border-slate-200/80 flex items-center justify-between shadow-xs">
        <button 
          onClick={onClose}
          className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar (No stressful countdown timer!) */}
        <div className="flex-1 mx-3 max-w-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-indigo-600 font-extrabold">{score} pts</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setShowHintModal(true)}
          className="flex items-center gap-1 text-[11px] font-black text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-full transition active:scale-95 shadow-xs"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>Need a Hint?</span>
        </button>
      </div>

      {/* Main Question Card Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full">
            {level.name} • Stage {stage.id}
          </span>
        </div>

        {/* Question Prompt */}
        <div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 text-white rounded-3xl p-5 shadow-md shadow-cyan-600/10 mb-4">
          <h2 className="text-base font-extrabold leading-snug whitespace-pre-line drop-shadow-xs">
            {currentQ.question}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isRight = String(opt) === String(currentQ.answer);

            let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-slate-50/50 shadow-xs';
            if (isAnswerChecked) {
              if (isRight) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-xs';
              } else if (isSelected) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-800 font-bold shadow-xs';
              } else {
                btnStyle = 'bg-slate-100/60 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-indigo-50/90 border-indigo-500 text-indigo-900 font-bold ring-2 ring-indigo-500/20 shadow-xs';
            }

            return (
              <button
                key={idx}
                disabled={isAnswerChecked}
                onClick={() => handleSelectOption(opt)}
                className={`w-full p-3.5 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between active:scale-[0.99] ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswerChecked && isRight && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswerChecked && isSelected && !isRight && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-sm">
        <div className="max-w-md mx-auto">
          {!isAnswerChecked ? (
            <button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-sm shadow-md transition-all active:scale-95 ${
                selectedOption !== null
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {isCorrect ? '✨ Wonderful! That is correct!' : 'Don\'t worry! Here is how to solve it:'}
                </span>
                {!isCorrect && (
                  <button
                    onClick={() => setShowSolutionModal(true)}
                    className="text-xs font-bold text-amber-700 underline"
                  >
                    View Steps
                  </button>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black rounded-2xl shadow-md transition active:scale-95 text-sm flex items-center justify-center gap-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FRIENDLY STEP-BY-STEP SOLUTION MODAL */}
      {showSolutionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 max-w-sm w-full rounded-3xl p-5 shadow-2xl flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 text-indigo-600">
                <HelpCircle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-slate-900">How to solve this easily</h3>
              </div>
              <button 
                onClick={() => setShowSolutionModal(false)}
                className="p-1 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-700 space-y-2 whitespace-pre-line leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 font-mono">
              {currentQ.solution}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs text-emerald-800">
              <span className="font-bold">Correct Answer: </span>
              <span>{currentQ.answer}</span>
            </div>

            <button
              onClick={() => setShowSolutionModal(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition"
            >
              I Understand Now!
            </button>
          </div>
        </div>
      )}

      {/* SHOW HINT MODAL */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-amber-200 max-w-sm w-full rounded-3xl p-5 shadow-2xl flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 text-amber-600">
                <Lightbulb className="w-5 h-5" />
                <h3 className="text-sm font-bold text-slate-900">Helpful Math Tip</h3>
              </div>
              <button 
                onClick={() => setShowHintModal(false)}
                className="p-1 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed bg-amber-50 p-3.5 rounded-2xl border border-amber-200/60">
              {currentQ.hint}
            </div>

            <button
              onClick={() => setShowHintModal(false)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl transition"
            >
              Got it, let me try!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

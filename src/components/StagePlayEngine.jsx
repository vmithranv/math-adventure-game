import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Lightbulb, 
  Flame, 
  X, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  HelpCircle,
  Clock,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StagePlayEngine = ({ 
  world, 
  stage, 
  onClose, 
  onCompleteStage, 
  onAddReward 
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Learning Aids
  const [showHintModal, setShowHintModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  
  // End of stage summary
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStageWon, setIsStageWon] = useState(false);
  const [startTime] = useState(Date.now());

  // Generate 15 questions upon stage load
  useEffect(() => {
    const qCount = 15;
    const generated = [];
    for (let i = 0; i < qCount; i++) {
      generated.push(world.generator(stage.id));
    }
    setQuestions(generated);
  }, [world, stage]);

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
      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = 10 + Math.min(newStreak, 5) * 2;
      setScore(prev => prev + points);
      setCorrectAnswersCount(prev => prev + 1);

      // Mini confetti on streak multiple of 3
      if (newStreak % 3 === 0) {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.7 }
        });
      }
    } else {
      setStreak(0);
      const remainingHearts = hearts - 1;
      setHearts(remainingHearts);
      
      // Auto-trigger Step-by-Step Solution modal to maximize self-learning!
      setShowSolutionModal(true);

      if (remainingHearts <= 0) {
        // Run out of hearts
        setIsGameOver(true);
      }
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
      // Completed all questions in the stage!
      handleStageVictory();
    }
  };

  const handleStageVictory = () => {
    setIsStageWon(true);
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);
    
    // Star rating logic based on accuracy & remaining hearts:
    // 3 hearts remaining = 3 stars
    // 2 hearts remaining = 2 stars
    // 1 heart remaining = 1 star
    let calculatedStars = 1;
    if (hearts === 3) calculatedStars = 3;
    else if (hearts === 2) calculatedStars = 2;

    const earnedCoins = calculatedStars * 15 + (stage.isBoss ? 25 : 10);
    const earnedXP = score + calculatedStars * 20;

    onAddReward(earnedCoins, earnedXP);
    onCompleteStage(
      world.id, 
      stage.id, 
      calculatedStars, 
      score, 
      correctAnswersCount + (isCorrect ? 1 : 0), 
      questions.length, 
      timeSpentSeconds
    );

    // Big victory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (!currentQ && !isGameOver && !isStageWon) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-bold text-slate-300">Summoning Math Questions...</p>
      </div>
    );
  }

  // GAME OVER MODAL (0 Hearts)
  if (isGameOver && !isStageWon) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-4 text-white animate-fade-in">
        <div className="max-w-sm w-full bg-slate-900 border border-rose-900/50 rounded-3xl p-6 text-center shadow-2xl space-y-4">
          <div className="text-5xl animate-bounce">💔</div>
          <h2 className="text-xl font-black text-rose-400">All Hearts Lost!</h2>
          <p className="text-xs text-slate-300">
            Don't worry! Math heroes learn from every try. Review your concepts and take on the stage again!
          </p>

          <div className="py-2 bg-slate-800/80 rounded-2xl flex justify-around text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">Solved</span>
              <span className="text-sm font-bold text-white">{correctAnswersCount}/{questions.length}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">XP Earned</span>
              <span className="text-sm font-bold text-amber-400">+{score} XP</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg transition active:scale-95 text-sm"
          >
            Return to World Map
          </button>
        </div>
      </div>
    );
  }

  // STAGE VICTORY MODAL
  if (isStageWon) {
    const calculatedStars = hearts === 3 ? 3 : hearts === 2 ? 2 : 1;

    return (
      <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-4 text-white animate-fade-in">
        <div className="max-w-sm w-full bg-slate-900 border border-amber-500/40 rounded-3xl p-6 text-center shadow-2xl space-y-5">
          <div className="text-5xl animate-bounce">
            {stage.isBoss ? '👑' : '🎉'}
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-600/50 px-2.5 py-0.5 rounded-full">
              {stage.isBoss ? 'Boss Defeated!' : 'Stage Complete!'}
            </span>
            <h2 className="text-xl font-black text-white mt-1.5">{stage.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{world.name}</p>
          </div>

          {/* 3 Stars Animation */}
          <div className="flex justify-center gap-2 py-1">
            {[1, 2, 3].map((star) => (
              <span 
                key={star} 
                className={`text-4xl transition-all transform ${
                  star <= calculatedStars ? 'scale-110 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]' : 'opacity-25 grayscale'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">Coins Won</span>
              <span className="text-sm font-black text-amber-300">+{calculatedStars * 15 + (stage.isBoss ? 25 : 10)} 🪙</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Stage XP</span>
              <span className="text-sm font-black text-indigo-400">+{score + calculatedStars * 20} XP</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-extrabold rounded-2xl shadow-lg transition active:scale-95 text-sm"
          >
            Claim Rewards & Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 bg-slate-950 flex flex-col justify-between overflow-hidden text-white">
      {/* Top Navigation & Status Bar */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Dots / Bar */}
        <div className="flex-1 mx-3 max-w-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
            <span>Q{currentIndex + 1} of {questions.length}</span>
            <span className="text-amber-400">{score} pts</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Streak & Hearts */}
        <div className="flex items-center gap-2">
          {streak > 1 && (
            <div className="flex items-center gap-0.5 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full text-xs font-bold text-amber-400 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{streak}x</span>
            </div>
          )}

          <div className="flex items-center gap-0.5">
            {[1, 2, 3].map((h) => (
              <Heart 
                key={h}
                className={`w-4 h-4 transition ${
                  h <= hearts 
                    ? 'text-rose-500 fill-rose-500 drop-shadow' 
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Question Card Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* World and Stage tag */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2.5 py-0.5 rounded-full">
            {world.name} • Stage {stage.id}
          </span>

          <button
            onClick={() => setShowHintModal(true)}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 rounded-full transition active:scale-95"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Show Hint</span>
          </button>
        </div>

        {/* Question Prompt */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl mb-4">
          <h2 className="text-base font-bold text-slate-100 leading-snug whitespace-pre-line">
            {currentQ.question}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isRight = String(opt) === String(currentQ.answer);

            let btnStyle = 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-indigo-500';
            if (isAnswerChecked) {
              if (isRight) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold';
              } else {
                btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-indigo-950 border-indigo-400 text-indigo-200 font-bold ring-2 ring-indigo-500/30';
            }

            return (
              <button
                key={idx}
                disabled={isAnswerChecked}
                onClick={() => handleSelectOption(opt)}
                className={`w-full p-3.5 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between active:scale-[0.99] ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswerChecked && isRight && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswerChecked && isSelected && !isRight && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 bg-slate-900/95 border-t border-slate-800">
        <div className="max-w-md mx-auto">
          {!isAnswerChecked ? (
            <button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-sm shadow-lg transition-all active:scale-95 ${
                selectedOption !== null
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isCorrect ? '✨ Excellent! That is correct!' : '❌ Not quite right!'}
                </span>
                {!isCorrect && (
                  <button
                    onClick={() => setShowSolutionModal(true)}
                    className="text-xs font-bold text-amber-300 underline"
                  >
                    View Explanation
                  </button>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black rounded-2xl shadow-lg transition active:scale-95 text-sm flex items-center justify-center gap-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* STEP-BY-STEP SOLUTION MODAL (Crucial Learning Aid) */}
      {showSolutionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 max-w-sm w-full rounded-3xl p-5 shadow-2xl flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-indigo-400">
                <HelpCircle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Step-by-Step Solution</h3>
              </div>
              <button 
                onClick={() => setShowSolutionModal(false)}
                className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-2 whitespace-pre-line leading-relaxed bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono">
              {currentQ.solution}
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl text-xs text-emerald-300">
              <span className="font-bold">Correct Answer: </span>
              <span>{currentQ.answer}</span>
            </div>

            <button
              onClick={() => setShowSolutionModal(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition"
            >
              I Understand Now!
            </button>
          </div>
        </div>
      )}

      {/* SHOW HINT MODAL */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-amber-500/40 max-w-sm w-full rounded-3xl p-5 shadow-2xl flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-amber-300">
                <Lightbulb className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Helpful Concept Hint</h3>
              </div>
              <button 
                onClick={() => setShowHintModal(false)}
                className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-200 leading-relaxed bg-amber-950/20 p-3.5 rounded-2xl border border-amber-500/20">
              {currentQ.hint}
            </div>

            <button
              onClick={() => setShowHintModal(false)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition"
            >
              Got it, let me try!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

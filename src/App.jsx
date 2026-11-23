import React, { useState } from 'react';
import { useGameState } from './context/GameStateContext';
import { TopHeader } from './components/TopHeader';
import { AdventureMap } from './components/AdventureMap';
import { TrophyRoomModal } from './components/TrophyRoomModal';
import { ParentDashboardModal } from './components/ParentDashboardModal';
import { StagePlayEngine } from './components/StagePlayEngine';

export function App() {
  const {
    gameState,
    addReward,
    recordStageCompletion,
    buyAvatar,
    selectAvatar,
    resetAllProgress,
    setParentPin,
    isStageUnlocked
  } = useGameState();

  // Active modal views
  const [activeStageSession, setActiveStageSession] = useState(null); // { world, stage }
  const [isTrophyOpen, setIsTrophyOpen] = useState(false);
  const [isParentOpen, setIsParentOpen] = useState(false);

  const handleSelectStage = (world, stage) => {
    setActiveStageSession({ world, stage });
  };

  const handleCloseStage = () => {
    setActiveStageSession(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center selection:bg-indigo-500 selection:text-white">
      {/* Mobile-first viewport container (max-w-md matches mobile proportions 375x812 - 428px) */}
      <div className="w-full max-w-md bg-slate-900 min-h-screen border-x border-slate-800 flex flex-col relative shadow-2xl pb-10">
        
        {/* Sticky Header */}
        <TopHeader
          gameState={gameState}
          onOpenTrophy={() => setIsTrophyOpen(true)}
          onOpenParent={() => setIsParentOpen(true)}
        />

        {/* Main Adventure Progression Map */}
        <main className="flex-1">
          <AdventureMap
            gameState={gameState}
            onSelectStage={handleSelectStage}
            isStageUnlocked={isStageUnlocked}
          />
        </main>

        {/* Stage Gameplay Modal */}
        {activeStageSession && (
          <StagePlayEngine
            world={activeStageSession.world}
            stage={activeStageSession.stage}
            onClose={handleCloseStage}
            onCompleteStage={recordStageCompletion}
            onAddReward={addReward}
          />
        )}

        {/* Trophy Room & In-App Shop */}
        {isTrophyOpen && (
          <TrophyRoomModal
            gameState={gameState}
            onClose={() => setIsTrophyOpen(false)}
            onBuyAvatar={buyAvatar}
            onSelectAvatar={selectAvatar}
          />
        )}

        {/* Parent Analytics Dashboard (PIN Protected) */}
        {isParentOpen && (
          <ParentDashboardModal
            gameState={gameState}
            onClose={() => setIsParentOpen(false)}
            onResetProgress={resetAllProgress}
            onSetParentPin={setParentPin}
          />
        )}
      </div>
    </div>
  );
}

export default App;

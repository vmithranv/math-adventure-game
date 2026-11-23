import React, { useState } from 'react';
import { useGameState } from './context/GameStateContext';
import { TopHeader } from './components/TopHeader';
import { PlayMap } from './components/PlayMap';
import { AbacusLab } from './components/AbacusLab';
import { MyGiftsShelf, MysteryGiftModal } from './components/MyGifts';
import { BottomNav } from './components/BottomNav';
import { StagePlayEngine } from './components/StagePlayEngine';
import { TrophyRoomModal } from './components/TrophyRoomModal';
import { ParentDashboardModal } from './components/ParentDashboardModal';

export function App() {
  const {
    gameState,
    addReward,
    recordStageCompletion,
    unlockGift,
    isStageUnlocked
  } = useGameState();

  // Navigation: 'map' | 'abacus' | 'gifts'
  const [activeTab, setActiveTab] = useState('map');

  // Active Stage session
  const [activeStageSession, setActiveStageSession] = useState(null); // { level, stage }

  // Mystery Gift modal
  const [activeGiftModal, setActiveGiftModal] = useState(null); // { gift, level }

  // Modals for TopHeader shortcuts
  const [isTrophyOpen, setIsTrophyOpen] = useState(false);
  const [isParentOpen, setIsParentOpen] = useState(false);

  const handleSelectStage = (level, stage) => {
    setActiveStageSession({ level, stage });
  };

  const handleCloseStage = () => {
    setActiveStageSession(null);
  };

  const handleLevelFullyCompleted = (level) => {
    if (level.gift && !gameState.claimedLevelGifts.includes(level.id)) {
      unlockGift(level.gift, level.id);
      setActiveGiftModal({ gift: level.gift, level });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex justify-center selection:bg-indigo-500 selection:text-white font-sans antialiased">
      <div className="w-full max-w-md bg-white min-h-screen border-x border-slate-200/80 flex flex-col relative shadow-xl pb-16">
        
        {/* Header */}
        <TopHeader
          gameState={gameState}
          onOpenTrophy={() => setIsTrophyOpen(true)}
          onOpenParent={() => setIsParentOpen(true)}
        />

        {/* Tab 1: Play Map */}
        {activeTab === 'map' && (
          <main className="flex-1 bg-slate-50/60">
            <PlayMap
              gameState={gameState}
              onSelectStage={handleSelectStage}
              isStageUnlocked={isStageUnlocked}
            />
          </main>
        )}

        {/* Tab 2: Abacus Lab */}
        {activeTab === 'abacus' && (
          <main className="flex-1 bg-slate-50/60">
            <AbacusLab
              onEarnBonusStars={(pts) => addReward(pts, pts * 2)}
            />
          </main>
        )}

        {/* Tab 3: My Gifts Shelf */}
        {activeTab === 'gifts' && (
          <main className="flex-1 bg-slate-50/60">
            <MyGiftsShelf
              unlockedGifts={gameState.unlockedGifts}
              playerName={gameState.playerName}
            />
          </main>
        )}

        {/* Bottom Navigation Bar (Play Map, Abacus Lab, My Gifts) */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          giftsCount={gameState.unlockedGifts.length}
        />

        {/* Active Stage Play Modal */}
        {activeStageSession && (
          <StagePlayEngine
            level={activeStageSession.level}
            stage={activeStageSession.stage}
            onClose={handleCloseStage}
            onCompleteStage={recordStageCompletion}
            onAddReward={addReward}
            onLevelFullyCompleted={handleLevelFullyCompleted}
          />
        )}

        {/* Mystery Gift Unwrapping Modal */}
        {activeGiftModal && (
          <MysteryGiftModal
            gift={activeGiftModal.gift}
            level={activeGiftModal.level}
            playerName={gameState.playerName}
            onClose={() => {
              setActiveGiftModal(null);
              setActiveTab('gifts'); // Switch to gifts shelf to admire her new gift!
            }}
          />
        )}

        {/* Trophy Room Modal */}
        {isTrophyOpen && (
          <TrophyRoomModal
            gameState={gameState}
            onClose={() => setIsTrophyOpen(false)}
            onBuyAvatar={() => {}}
            onSelectAvatar={() => {}}
          />
        )}

        {/* Parent Dashboard Modal */}
        {isParentOpen && (
          <ParentDashboardModal
            gameState={gameState}
            onClose={() => setIsParentOpen(false)}
            onResetProgress={() => {}}
            onSetParentPin={() => {}}
          />
        )}
      </div>
    </div>
  );
}

export default App;

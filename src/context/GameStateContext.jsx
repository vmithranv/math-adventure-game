import { useState, useEffect } from 'react';

const STORAGE_KEY = 'math_adventure_class6_save_v2';

const defaultState = {
  playerName: 'Math Star',
  avatar: 'math_wizard',
  unlockedAvatars: ['math_wizard'],
  coins: 50,
  xp: 0,
  stageProgress: {}, // { "1_1": { stars: 3, score: 100 } }
  unlockedGifts: [], // [{ id, name, type, desc, icon }]
  claimedLevelGifts: [] // [1, 2] level ids
};

export const useGameState = () => {
  const [gameState, setGameState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not load saved state from localStorage', e);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
      console.warn('Could not persist state to localStorage', e);
    }
  }, [gameState]);

  const addReward = (earnedCoins, earnedXP) => {
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + earnedCoins,
      xp: prev.xp + earnedXP
    }));
  };

  const recordStageCompletion = (levelId, stageId, stars, score) => {
    setGameState(prev => {
      const key = `${levelId}_${stageId}`;
      const existing = prev.stageProgress[key] || { stars: 0, score: 0 };
      return {
        ...prev,
        stageProgress: {
          ...prev.stageProgress,
          [key]: {
            stars: Math.max(existing.stars, stars),
            score: Math.max(existing.score, score)
          }
        }
      };
    });
  };

  const unlockGift = (gift, levelId) => {
    setGameState(prev => {
      if (prev.claimedLevelGifts.includes(levelId)) return prev;
      return {
        ...prev,
        claimedLevelGifts: [...prev.claimedLevelGifts, levelId],
        unlockedGifts: [...prev.unlockedGifts, gift]
      };
    });
  };

  const isStageUnlocked = (levelId, stageId) => {
    if (levelId === 1 && stageId === 1) return true;
    if (stageId > 1) {
      const prevKey = `${levelId}_${stageId - 1}`;
      return (gameState.stageProgress[prevKey]?.stars || 0) > 0;
    }
    if (stageId === 1 && levelId > 1) {
      // Must beat stage 4 of previous level
      const prevLevelBossKey = `${levelId - 1}_4`;
      return (gameState.stageProgress[prevLevelBossKey]?.stars || 0) > 0;
    }
    return false;
  };

  return {
    gameState,
    addReward,
    recordStageCompletion,
    unlockGift,
    isStageUnlocked
  };
};

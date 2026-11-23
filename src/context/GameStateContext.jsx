import { useState, useEffect } from 'react';

const STORAGE_KEY = 'math_adventure_class6_save_v1';

const defaultState = {
  playerName: 'Math Champion',
  avatar: 'math_wizard',
  unlockedAvatars: ['math_wizard'],
  coins: 50,
  xp: 0,
  currentStreak: 1,
  highestStreak: 1,
  // Stage progress: { [worldId_stageId]: { stars: 3, highscore: 100, attempts: 1 } }
  stageProgress: {},
  // Topic stats for Parent Dashboard: { [worldId]: { correct: 10, total: 12, timeSpentSeconds: 150 } }
  topicStats: {
    1: { correct: 0, total: 0, timeSpentSeconds: 0 },
    2: { correct: 0, total: 0, timeSpentSeconds: 0 },
    3: { correct: 0, total: 0, timeSpentSeconds: 0 },
    4: { correct: 0, total: 0, timeSpentSeconds: 0 },
    5: { correct: 0, total: 0, timeSpentSeconds: 0 }
  },
  unlockedBadges: [],
  parentPin: '1234'
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
    setGameState(prev => {
      const newCoins = prev.coins + earnedCoins;
      const newXP = prev.xp + earnedXP;
      const newBadges = [...prev.unlockedBadges];
      if (newCoins >= 200 && !newBadges.includes('rich_scholar')) {
        newBadges.push('rich_scholar');
      }
      return {
        ...prev,
        coins: newCoins,
        xp: newXP,
        unlockedBadges: newBadges
      };
    });
  };

  const recordStageCompletion = (worldId, stageId, stars, score, correctCount, totalCount, timeSpent) => {
    setGameState(prev => {
      const key = `${worldId}_${stageId}`;
      const existing = prev.stageProgress[key] || { stars: 0, highscore: 0, attempts: 0 };
      const updatedProgress = {
        ...prev.stageProgress,
        [key]: {
          stars: Math.max(existing.stars, stars),
          highscore: Math.max(existing.highscore, score),
          attempts: existing.attempts + 1
        }
      };

      const prevTopic = prev.topicStats[worldId] || { correct: 0, total: 0, timeSpentSeconds: 0 };
      const updatedTopicStats = {
        ...prev.topicStats,
        [worldId]: {
          correct: prevTopic.correct + correctCount,
          total: prevTopic.total + totalCount,
          timeSpentSeconds: prevTopic.timeSpentSeconds + timeSpent
        }
      };

      // Check badges
      const newBadges = [...prev.unlockedBadges];
      if (!newBadges.includes('first_stage')) newBadges.push('first_stage');
      if (stars === 3 && !newBadges.includes('heart_keeper')) newBadges.push('heart_keeper');
      if (stageId === 4 && !newBadges.includes('boss_slayer')) newBadges.push('boss_slayer');

      return {
        ...prev,
        stageProgress: updatedProgress,
        topicStats: updatedTopicStats,
        unlockedBadges: newBadges
      };
    });
  };

  const buyAvatar = (avatarId, cost) => {
    if (gameState.coins >= cost && !gameState.unlockedAvatars.includes(avatarId)) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - cost,
        unlockedAvatars: [...prev.unlockedAvatars, avatarId],
        avatar: avatarId
      }));
      return true;
    }
    return false;
  };

  const selectAvatar = (avatarId) => {
    if (gameState.unlockedAvatars.includes(avatarId)) {
      setGameState(prev => ({ ...prev, avatar: avatarId }));
    }
  };

  const resetAllProgress = () => {
    setGameState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const setParentPin = (newPin) => {
    setGameState(prev => ({ ...prev, parentPin: newPin }));
  };

  // Stage unlocked check
  const isStageUnlocked = (worldId, stageId) => {
    if (worldId === 1 && stageId === 1) return true;
    if (stageId > 1) {
      // Must beat previous stage in same world
      const prevStageKey = `${worldId}_${stageId - 1}`;
      return (gameState.stageProgress[prevStageKey]?.stars || 0) > 0;
    }
    if (stageId === 1 && worldId > 1) {
      // Must beat Boss of previous world
      const prevWorldBossKey = `${worldId - 1}_4`;
      return (gameState.stageProgress[prevWorldBossKey]?.stars || 0) > 0;
    }
    return false;
  };

  return {
    gameState,
    addReward,
    recordStageCompletion,
    buyAvatar,
    selectAvatar,
    resetAllProgress,
    setParentPin,
    isStageUnlocked
  };
};

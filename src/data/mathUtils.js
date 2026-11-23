// Helper utilities for Math Adventures Question Generator

export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const shuffle = (arr) => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// Generates 4 distinct choices including the correct one
export const generateOptions = (correctAnswer, generateWrong) => {
  const options = new Set([correctAnswer]);
  let attempts = 0;
  while (options.size < 4 && attempts < 50) {
    attempts++;
    const wrong = generateWrong();
    if (wrong !== undefined && wrong !== null && wrong !== correctAnswer) {
      options.add(wrong);
    }
  }
  // Fallbacks if uniqueness fails
  let counter = 1;
  while (options.size < 4) {
    if (typeof correctAnswer === 'number') {
      options.add(correctAnswer + counter);
    } else {
      options.add(`Option ${options.size + 1}`);
    }
    counter++;
  }
  return shuffle(Array.from(options));
};

export const INDIAN_NAMES = ['Aarav', 'Diya', 'Rohan', 'Ananya', 'Virat', 'Pooja', 'Aditya', 'Meera', 'Kabir', 'Ishita', 'Arjun', 'Saanvi'];
export const INDIAN_CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur'];
export const CRICKET_TEAMS = ['India', 'Australia', 'England', 'South Africa', 'New Zealand'];

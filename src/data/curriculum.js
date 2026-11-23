import { generateWorld1Question } from './world1Questions.js';
import { generateWorld2Question } from './world2Questions.js';
import { generateWorld3Question } from './world3Questions.js';
import { generateWorld4Question } from './world4Questions.js';
import { generateWorld5Question } from './world5Questions.js';

export const WORLDS = [
  {
    id: 1,
    name: 'Number Kingdom',
    chapter: 'Knowing Our Numbers & Whole Numbers',
    themeColor: 'from-amber-500 to-orange-600',
    cardBg: 'bg-amber-500/10 border-amber-500/30 text-amber-500',
    icon: 'Crown',
    generator: generateWorld1Question,
    stages: [
      { id: 1, title: 'Lakhs, Crores & Millions', subtitle: 'Indian vs. International Place Value' },
      { id: 2, title: 'Rounding & Roman Numerals', subtitle: 'Estimating & Ancient Symbols' },
      { id: 3, title: 'Properties of Numbers', subtitle: 'Commutative, Associative & Distributive' },
      { id: 4, title: 'Boss: Royal Treasury', subtitle: 'Multi-step Number Word Problems', isBoss: true }
    ]
  },
  {
    id: 2,
    name: 'Factor Forest',
    chapter: 'Playing with Numbers',
    themeColor: 'from-emerald-500 to-green-600',
    cardBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',
    icon: 'Trees',
    generator: generateWorld2Question,
    stages: [
      { id: 1, title: 'Primes & Divisibility', subtitle: 'Rules for 2, 3, 4, 5, 6, 8, 9, 11' },
      { id: 2, title: 'Prime Factorisation', subtitle: 'Breaking Down Into Prime Building Blocks' },
      { id: 3, title: 'Finding HCF & LCM', subtitle: 'Highest Common Factor & Lowest Common Multiple' },
      { id: 4, title: 'Boss: Ancient Tree Mystery', subtitle: 'Real-life HCF/LCM Word Problems', isBoss: true }
    ]
  },
  {
    id: 3,
    name: 'Fraction & Decimal Islands',
    chapter: 'Fractions & Decimals',
    themeColor: 'from-cyan-500 to-blue-600',
    cardBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500',
    icon: 'Compass',
    generator: generateWorld3Question,
    stages: [
      { id: 1, title: 'Fraction Types & Forms', subtitle: 'Proper, Improper, Mixed & Equivalent' },
      { id: 2, title: 'Unlike Fractions Addition', subtitle: 'Adding & Subtracting with LCM' },
      { id: 3, title: 'Decimal Decoders', subtitle: 'Tenths, Hundredths & Place Value' },
      { id: 4, title: 'Boss: Island Trader', subtitle: 'Money (₹), Length (m) & Weight (kg) Conversions', isBoss: true }
    ]
  },
  {
    id: 4,
    name: 'Geometry & Mensuration Valley',
    chapter: 'Basic Geometry, Perimeter & Area',
    themeColor: 'from-purple-500 to-indigo-600',
    cardBg: 'bg-purple-500/10 border-purple-500/30 text-purple-500',
    icon: 'Shapes',
    generator: generateWorld4Question,
    stages: [
      { id: 1, title: 'Angles & Triangles', subtitle: 'Acute, Right, Obtuse, Reflex & Angle Sum' },
      { id: 2, title: 'Polygon Perimeter', subtitle: 'Regular Hexagons, Squares & Rectangles' },
      { id: 3, title: 'Area Explorers', subtitle: 'Squares & Rectangles with Visual Grids' },
      { id: 4, title: 'Boss: The Master Architect', subtitle: 'Fencing & Flooring Cost in ₹', isBoss: true }
    ]
  },
  {
    id: 5,
    name: 'Algebra & Ratio Peak',
    chapter: 'Introduction to Algebra, Ratio & Proportion',
    themeColor: 'from-rose-500 to-pink-600',
    cardBg: 'bg-rose-500/10 border-rose-500/30 text-rose-500',
    icon: 'Mountain',
    generator: generateWorld5Question,
    stages: [
      { id: 1, title: 'Matchstick Patterns', subtitle: 'Discovering Variables and Rules' },
      { id: 2, title: 'Equation Solvers', subtitle: 'One-step Linear Equations' },
      { id: 3, title: 'Ratio & Equivalent Ratios', subtitle: 'Simplest Form & Splitting Quantities' },
      { id: 4, title: 'Boss: Peak Summit Challenge', subtitle: 'Unitary Method Word Problems', isBoss: true }
    ]
  }
];

export const AVATARS = [
  { id: 'math_wizard', name: 'Aryabhata Jr.', icon: '🧙‍♂️', cost: 0, desc: 'The wise master of Indian Mathematics' },
  { id: 'tiger_hero', name: 'Bengal Tiger', icon: '🐯', cost: 50, desc: 'Fearless problem solver with lightning reflexes' },
  { id: 'space_explorer', name: 'ISRO Explorer', icon: '🚀', cost: 100, desc: 'Calculates orbital math and trajectories' },
  { id: 'cricket_star', name: 'Cricket Champion', icon: '🏏', cost: 150, desc: 'Master of run rates and averages' },
  { id: 'robot_genius', name: 'AI Bot 3000', icon: '🤖', cost: 200, desc: 'Supercomputer brain that loves equations' }
];

export const BADGES = [
  { id: 'first_stage', title: 'First Steps', icon: '🌱', desc: 'Completed your first math stage' },
  { id: 'heart_keeper', title: 'Flawless Heart', icon: '💖', desc: 'Completed a stage with 0 mistakes' },
  { id: 'boss_slayer', title: 'Boss Conqueror', icon: '⚔️', desc: 'Defeated any World Boss Battle' },
  { id: 'rich_scholar', title: 'Coin Hoarder', icon: '💰', desc: 'Earned more than 200 Math Coins' },
  { id: 'grandmaster', title: 'Grand Mathematician', icon: '👑', desc: 'Unlocked all 5 Worlds' }
];

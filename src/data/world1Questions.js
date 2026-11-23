import { randInt, pickRandom, shuffle, generateOptions, INDIAN_NAMES, INDIAN_CITIES } from './mathUtils.js';

// Helper for Roman Numerals
const toRoman = (num) => {
  const romanMap = [
    { val: 1000, str: 'M' }, { val: 900, str: 'CM' },
    { val: 500, str: 'D' }, { val: 400, str: 'CD' },
    { val: 100, str: 'C' }, { val: 90, str: 'XC' },
    { val: 50, str: 'L' }, { val: 40, str: 'XL' },
    { val: 10, str: 'X' }, { val: 9, str: 'IX' },
    { val: 5, str: 'V' }, { val: 4, str: 'IV' },
    { val: 1, str: 'I' }
  ];
  let res = '';
  for (const { val, str } of romanMap) {
    while (num >= val) {
      res += str;
      num -= val;
    }
  }
  return res;
};

// WORLD 1: NUMBER KINGDOM
export const generateWorld1Question = (stageId) => {
  const name = pickRandom(INDIAN_NAMES);
  const city = pickRandom(INDIAN_CITIES);

  // Stage 1: Indian vs. International Place Value System (Lakhs, Crores, Millions)
  if (stageId === 1) {
    const qType = randInt(1, 3);
    if (qType === 1) {
      // Lakhs to Thousands or Millions
      const lakhs = randInt(2, 95);
      return {
        question: `How many thousands make ${lakhs} Lakh?`,
        options: generateOptions(`${lakhs * 100} thousands`, () => `${pickRandom([lakhs * 10, lakhs * 1000, lakhs + 10, lakhs * 50])} thousands`),
        answer: `${lakhs * 100} thousands`,
        hint: `Remember: 1 Lakh = 1,00,000, which has 5 zeros. 1 Thousand = 1,000 (3 zeros). Divide 1,00,000 by 1,000 to find how many thousands are in 1 lakh!`,
        solution: `Step 1: 1 Lakh = 1,00,000.\nStep 2: 1 Thousand = 1,000.\nStep 3: 1,00,000 ÷ 1,000 = 100 thousands.\nSo, ${lakhs} Lakh = ${lakhs} × 100 = ${lakhs * 100} thousands.`
      };
    } else if (qType === 2) {
      // Crores to Millions
      const crores = randInt(1, 9);
      const millions = crores * 10;
      return {
        question: `In the International System, ${crores} Crore is equal to how many Millions?`,
        options: generateOptions(`${millions} Million`, () => `${pickRandom([crores, crores * 100, crores * 5, millions + 5])} Million`),
        answer: `${millions} Million`,
        hint: `1 Crore = 1,00,00,000 (7 zeros). 1 Million = 1,000,000 (6 zeros). Compare their zeros!`,
        solution: `Step 1: 1 Crore = 10,000,000 in International grouping.\nStep 2: 1 Million = 1,000,000.\nStep 3: 1 Crore = 10 Millions.\nTherefore, ${crores} Crore = ${crores} × 10 = ${millions} Million.`
      };
    } else {
      // Number comma placement
      const num = randInt(12, 98) * 100000 + randInt(10, 89) * 1000 + randInt(100, 999);
      const str = num.toString();
      // Indian: XX,YY,ZZZ
      const indianStyle = `${str.slice(0, 2)},${str.slice(2, 4)},${str.slice(4)}`;
      // International: X,YYY,ZZZ
      const intlStyle = `${str.slice(0, 1)},${str.slice(1, 4)},${str.slice(4)}`;
      const isAskingIndian = randInt(0, 1) === 1;

      return {
        question: isAskingIndian 
          ? `Choose the correct commas according to the Indian System for ${num}:`
          : `Choose the correct commas according to the International System for ${num}:`,
        options: generateOptions(
          isAskingIndian ? indianStyle : intlStyle,
          () => {
            const r = randInt(1, 3);
            if (r === 1) return isAskingIndian ? intlStyle : indianStyle;
            if (r === 2) return `${str.slice(0, 3)},${str.slice(3, 5)},${str.slice(5)}`;
            return `${str.slice(0, 4)},${str.slice(4)}`;
          }
        ),
        answer: isAskingIndian ? indianStyle : intlStyle,
        hint: isAskingIndian 
          ? `Indian system: First comma after 3 digits from right, then after every 2 digits (Hundreds, Thousands, Lakhs).`
          : `International system: Commas after every 3 digits from right (Hundreds, Thousands, Millions).`,
        solution: isAskingIndian
          ? `In the Indian System, commas start after hundreds (3 digits from right), then every 2 digits (thousands, lakhs): ${indianStyle}.`
          : `In the International System, commas are placed after every 3 digits from right: ${intlStyle}.`
      };
    }
  }

  // Stage 2: Estimation, Rounding Off & Roman Numerals
  if (stageId === 2) {
    const qType = randInt(1, 2);
    if (qType === 1) {
      // Rounding off
      const base = randInt(120, 980);
      const roundTo = pickRandom([10, 100]);
      let rounded;
      if (roundTo === 10) {
        rounded = Math.round(base / 10) * 10;
      } else {
        rounded = Math.round(base / 100) * 100;
      }
      return {
        question: `Round off ${base} to the nearest ${roundTo}:`,
        options: generateOptions(rounded, () => rounded + pickRandom([-20, -10, 10, 20, 50, -50])),
        answer: rounded,
        hint: `Look at the digit just to the right of the place you are rounding to. If it is 5 or more, round up; if less than 5, round down.`,
        solution: `Rounding ${base} to nearest ${roundTo}:\nExamine digit at the ${roundTo === 10 ? 'ones' : 'tens'} place.\nSince it is ${base % roundTo >= roundTo / 2 ? '≥ 5' : '< 5'}, ${base} rounds to ${rounded}.`
      };
    } else {
      // Roman Numerals
      const romanVal = randInt(14, 98);
      const romanStr = toRoman(romanVal);
      const askToNumber = randInt(0, 1) === 1;

      return {
        question: askToNumber 
          ? `What is the value of Roman numeral ${romanStr}?`
          : `What is the Roman numeral for ${romanVal}?`,
        options: generateOptions(
          askToNumber ? romanVal : romanStr,
          () => askToNumber ? romanVal + pickRandom([-2, -1, 1, 2, 5, 10]) : toRoman(romanVal + pickRandom([-2, 1, 2, 5]))
        ),
        answer: askToNumber ? romanVal : romanStr,
        hint: `Key symbols: X = 10, L = 50, C = 100, V = 5, I = 1. Subtraction applies when smaller precedes larger (e.g. XL = 40, IX = 9).`,
        solution: `Breaking down ${romanVal}:\nTens part + Ones part.\n${romanVal} = ${romanStr}.`
      };
    }
  }

  // Stage 3: Properties of Whole Numbers (Commutative, Associative, Distributive)
  if (stageId === 3) {
    const qType = randInt(1, 3);
    if (qType === 1) {
      // Distributive property calculation
      const a = randInt(12, 45);
      const b = pickRandom([102, 105, 98]);
      const split = b > 100 ? [100, b - 100, '+'] : [100, 100 - b, '-'];
      const ans = a * b;
      return {
        question: `Find the value of ${a} × ${b} using the Distributive Property:`,
        options: generateOptions(ans, () => ans + pickRandom([-10, 10, -20, 20, 100])),
        answer: ans,
        hint: `Write ${b} as (${split[0]} ${split[2]} ${split[1]}), then multiply ${a} with both parts!`,
        solution: `Using Distributive Property:\n${a} × ${b} = ${a} × (${split[0]} ${split[2]} ${split[1]})\n= (${a} × ${split[0]}) ${split[2]} (${a} × ${split[1]})\n= ${a * split[0]} ${split[2]} ${a * split[1]}\n= ${ans}.`
      };
    } else if (qType === 2) {
      // Identity / Property Identification
      const a = randInt(15, 80);
      const b = randInt(15, 80);
      const props = [
        { exp: `${a} + ${b} = ${b} + ${a}`, name: 'Commutative property of addition' },
        { exp: `(${a} × 5) × 2 = ${a} × (5 × 2)`, name: 'Associative property of multiplication' },
        { exp: `${a} × (${b} + 5) = (${a} × ${b}) + (${a} × 5)`, name: 'Distributive property of multiplication over addition' },
        { exp: `${a} × 1 = ${a}`, name: 'Multiplicative identity' }
      ];
      const selected = pickRandom(props);
      return {
        question: `Which property of whole numbers is shown by:\n"${selected.exp}"?`,
        options: generateOptions(selected.name, () => pickRandom(props).name),
        answer: selected.name,
        hint: `Notice whether numbers are changing places (commutative), grouped with brackets (associative), or multiplied across brackets (distributive).`,
        solution: `The statement ${selected.exp} demonstrates the ${selected.name}.`
      };
    } else {
      // Rearrangement for fast addition/multiplication
      const a = pickRandom([25, 4, 20, 50, 8, 125]);
      let b, match;
      if (a === 25) { match = 4; b = randInt(13, 77); }
      else if (a === 4) { match = 25; b = randInt(13, 77); }
      else if (a === 20) { match = 5; b = randInt(13, 77); }
      else if (a === 50) { match = 2; b = randInt(13, 77); }
      else { match = 125; b = randInt(3, 19); }
      const ans = a * match * b;
      return {
        question: `Evaluate easily by suitable rearrangement: ${a} × ${b} × ${match}`,
        options: generateOptions(ans, () => ans + pickRandom([-100, 100, 200, -200, 1000])),
        answer: ans,
        hint: `Group ${a} and ${match} together because their product is a round number (${a * match})!`,
        solution: `Step 1: Group (${a} × ${match}) × ${b}.\nStep 2: ${a * match} × ${b}.\nStep 3: = ${ans}.`
      };
    }
  }

  // Stage 4: Boss Battle — Multi-step Number Word Problems
  const ticketsSold = randInt(1200, 4500);
  const ticketPrice = pickRandom([50, 100, 200, 250]);
  const expenses = randInt(5000, 25000);
  const totalRevenue = ticketsSold * ticketPrice;
  const netProfit = totalRevenue - expenses;

  const scenarios = [
    {
      q: `At a charity cricket match in ${city}, ${ticketsSold} tickets were sold at ₹${ticketPrice} each. If stadium arrangement cost ₹${expenses}, what was the net money raised?`,
      ans: `₹${netProfit}`,
      optGen: () => `₹${netProfit + pickRandom([-1000, 1000, -5000, 5000, ticketPrice * 10])}`,
      hint: `Step 1: Calculate total collection from tickets. Step 2: Subtract the arrangement costs.`,
      sol: `Step 1: Total collection = ${ticketsSold} × ₹${ticketPrice} = ₹${totalRevenue}.\nStep 2: Net money raised = ₹${totalRevenue} - ₹${expenses} = ₹${netProfit}.`
    },
    {
      q: `${name} has ₹${randInt(50, 90) * 1000} in a bank account. ${name} deposited ₹${randInt(15, 35) * 1000} on Monday and withdrew ₹${randInt(10, 25) * 1000} on Thursday. How much balance remains?`,
      calc: () => {
        const start = randInt(50, 90) * 1000;
        const dep = randInt(15, 35) * 1000;
        const wdr = randInt(10, 25) * 1000;
        const rem = start + dep - wdr;
        return {
          q: `${name} has ₹${start.toLocaleString('en-IN')} in a bank account. ${name} deposited ₹${dep.toLocaleString('en-IN')} on Monday and withdrew ₹${wdr.toLocaleString('en-IN')} on Thursday. How much balance remains?`,
          ans: `₹${rem.toLocaleString('en-IN')}`,
          hint: `Add deposits to the starting balance, then subtract withdrawals.`,
          sol: `Start = ₹${start}\nAdd deposit = ₹${start} + ₹${dep} = ₹${start + dep}\nSubtract withdrawal = ₹${start + dep} - ₹${wdr} = ₹${rem}.`
        };
      }
    }
  ];

  const battle = scenarios[1].calc();
  return {
    question: battle.q,
    options: generateOptions(battle.ans, () => `₹${(randInt(40, 110) * 1000).toLocaleString('en-IN')}`),
    answer: battle.ans,
    hint: battle.hint,
    solution: battle.sol
  };
};

import { randInt, pickRandom, generateOptions, INDIAN_NAMES } from './mathUtils.js';

const gcd = (a, b) => (!b ? a : gcd(b, a % b));

// WORLD 5: ALGEBRA & RATIO PEAK
export const generateWorld5Question = (stageId) => {
  const name = pickRandom(INDIAN_NAMES);

  // Stage 1: Matchstick Patterns & Introduction to Variables
  if (stageId === 1) {
    const patternType = pickRandom(['L', 'C', 'F', 'triangle', 'square']);
    if (patternType === 'L') {
      const sticksPerShape = 2;
      const n = randInt(4, 15);
      return {
        question: `To make one letter 'L', we need 2 matchsticks. What is the algebraic rule for the number of matchsticks needed for 'n' number of L's? Also, how many sticks are needed for ${n} L's?`,
        options: generateOptions(`Rule: 2n, Sticks: ${sticksPerShape * n}`, () => `Rule: ${pickRandom(['n + 2', '3n', 'n - 2'])}, Sticks: ${pickRandom([2 * n + 2, 3 * n, 2 * n - 2])}`),
        answer: `Rule: 2n, Sticks: ${sticksPerShape * n}`,
        hint: `Each 'L' takes 2 sticks. For n such L's, multiply 2 by n. Substitute n = ${n}.`,
        solution: `1 'L' = 2 matchsticks.\nFor 'n' patterns, sticks required = 2 × n = 2n.\nFor n = ${n}, sticks = 2 × ${n} = ${sticksPerShape * n}.`
      };
    } else if (patternType === 'triangle') {
      const n = randInt(4, 12);
      return {
        question: `A separate triangle is made using 3 matchsticks. How many matchsticks are required to make 'n' separate triangles? Calculate for n = ${n}:`,
        options: generateOptions(`Rule: 3n, Sticks: ${3 * n}`, () => `Rule: ${pickRandom(['n + 3', '4n', '3n + 1'])}, Sticks: ${pickRandom([3 * n + 3, 4 * n, 3 * n - 3])}`),
        answer: `Rule: 3n, Sticks: ${3 * n}`,
        hint: `Multiply sticks per triangle (3) with the variable 'n'.`,
        solution: `Number of sticks = 3 × n = 3n.\nFor n = ${n}, sticks = 3 × ${n} = ${3 * n}.`
      };
    } else {
      // Variable expressions
      const xVal = randInt(3, 10);
      const addVal = randInt(4, 15);
      const expAns = xVal + addVal;
      return {
        question: `If ${name} has 'x' marbles and friend gifts ${addVal} more marbles, the total expression is (x + ${addVal}). What is the value when x = ${xVal}?`,
        options: generateOptions(expAns, () => expAns + pickRandom([-3, 3, -5, 5, 2])),
        answer: expAns,
        hint: `Substitute x = ${xVal} into the algebraic expression (x + ${addVal}).`,
        solution: `Expression = x + ${addVal}.\nSubstitute x = ${xVal}:\n${xVal} + ${addVal} = ${expAns}.`
      };
    }
  }

  // Stage 2: Solving Simple One-Step Linear Equations
  if (stageId === 2) {
    const op = pickRandom(['+', '-', '*', '/']);
    if (op === '+') {
      const ansX = randInt(3, 20);
      const b = randInt(5, 25);
      const total = ansX + b;
      return {
        question: `Solve for x: x + ${b} = ${total}`,
        options: generateOptions(ansX, () => ansX + pickRandom([-4, -2, 2, 4, b])),
        answer: ansX,
        hint: `To isolate x, subtract ${b} from both sides: x = ${total} - ${b}.`,
        solution: `x + ${b} = ${total}\nx = ${total} - ${b}\nx = ${ansX}.`
      };
    } else if (op === '-') {
      const ansX = randInt(10, 35);
      const b = randInt(3, 12);
      const diff = ansX - b;
      return {
        question: `Solve for x: x - ${b} = ${diff}`,
        options: generateOptions(ansX, () => ansX + pickRandom([-3, 3, -5, 5, 2])),
        answer: ansX,
        hint: `Add ${b} to both sides: x = ${diff} + ${b}.`,
        solution: `x - ${b} = ${diff}\nx = ${diff} + ${b}\nx = ${ansX}.`
      };
    } else if (op === '*') {
      const ansX = randInt(3, 12);
      const b = pickRandom([3, 4, 5, 6, 7, 8]);
      const prod = ansX * b;
      return {
        question: `Solve for y: ${b}y = ${prod}`,
        options: generateOptions(ansX, () => ansX + pickRandom([-2, -1, 1, 2, 3])),
        answer: ansX,
        hint: `Divide both sides by ${b}: y = ${prod} ÷ ${b}.`,
        solution: `${b}y = ${prod}\ny = ${prod} ÷ ${b}\ny = ${ansX}.`
      };
    } else {
      const ansX = randInt(12, 40);
      const b = pickRandom([2, 3, 4, 5]);
      const q = ansX / b;
      // Ensure divisible
      const realAns = randInt(4, 12);
      const denom = pickRandom([2, 3, 4, 5]);
      const rhs = realAns;
      return {
        question: `Solve for z: z / ${denom} = ${rhs}`,
        options: generateOptions(realAns * denom, () => realAns * denom + pickRandom([-denom, denom, -2 * denom, 2 * denom])),
        answer: realAns * denom,
        hint: `Multiply both sides by ${denom}: z = ${rhs} × ${denom}.`,
        solution: `z / ${denom} = ${rhs}\nz = ${rhs} × ${denom}\nz = ${realAns * denom}.`
      };
    }
  }

  // Stage 3: Ratios & Equivalent Ratios
  if (stageId === 3) {
    const qType = randInt(1, 2);
    if (qType === 1) {
      // Simplest form of ratio
      const common = pickRandom([2, 3, 4, 5, 6, 8]);
      const r1 = randInt(2, 7);
      const r2 = randInt(2, 7);
      if (r1 === r2) {
        return {
          question: `Find the simplest form of the ratio ${common * 3} : ${common * 3}:`,
          options: ['1 : 1', '2 : 2', '3 : 3', '0 : 0'],
          answer: '1 : 1',
          hint: `Divide both numbers by their Highest Common Factor!`,
          solution: `Divide both by ${common * 3} = 1 : 1.`
        };
      }
      const g = gcd(r1, r2);
      const s1 = r1 / g;
      const s2 = r2 / g;
      const v1 = s1 * common;
      const v2 = s2 * common;

      return {
        question: `What is the simplest form of the ratio ${v1} : ${v2}?`,
        options: generateOptions(`${s1} : ${s2}`, () => `${s1 + pickRandom([1, -1]) || 1} : ${s2 + pickRandom([1, 2])}`),
        answer: `${s1} : ${s2}`,
        hint: `Divide both terms by their HCF (${gcd(v1, v2)}).`,
        solution: `HCF of ${v1} and ${v2} is ${gcd(v1, v2)}.\n${v1} ÷ ${gcd(v1, v2)} = ${s1}\n${v2} ÷ ${gcd(v1, v2)} = ${s2}\nSimplest ratio = ${s1} : ${s2}.`
      };
    } else {
      // Ratio division problem
      const partA = randInt(2, 5);
      const partB = randInt(2, 5);
      const totalParts = partA + partB;
      const multiplier = randInt(10, 40) * 10;
      const totalAmount = totalParts * multiplier;
      const shareA = partA * multiplier;
      const shareB = partB * multiplier;

      return {
        question: `₹${totalAmount} is divided between ${name} and Kabir in the ratio ${partA} : ${partB}. What is ${name}'s share?`,
        options: generateOptions(`₹${shareA}`, () => `₹${shareA + pickRandom([-multiplier, multiplier, -2 * multiplier, 2 * multiplier])}`),
        answer: `₹${shareA}`,
        hint: `Total parts = ${partA} + ${partB} = ${totalParts}. One part = Total ÷ ${totalParts}. Then multiply by ${partA}!`,
        solution: `Total parts = ${partA} + ${partB} = ${totalParts}.\nValue of 1 part = ₹${totalAmount} ÷ ${totalParts} = ₹${multiplier}.\n${name}'s share (${partA} parts) = ${partA} × ₹${multiplier} = ₹${shareA}.`
      };
    }
  }

  // Stage 4: Boss Battle — Unitary Method Word Problems
  const battleScenario = pickRandom(['books', 'petrol', 'workers', 'train']);

  if (battleScenario === 'books') {
    const count1 = pickRandom([4, 5, 6, 8]);
    const costPerItem = pickRandom([25, 30, 45, 50, 75]);
    const cost1 = count1 * costPerItem;
    const count2 = pickRandom([3, 7, 9, 10, 12]);
    const cost2 = count2 * costPerItem;

    return {
      question: `If the cost of ${count1} identical mathematics notebooks is ₹${cost1}, what will be the cost of ${count2} such notebooks?`,
      options: generateOptions(`₹${cost2}`, () => `₹${cost2 + pickRandom([-costPerItem, costPerItem, -costPerItem * 2, costPerItem * 2])}`),
      answer: `₹${cost2}`,
      hint: `Unitary Method: Step 1: Find the cost of 1 notebook (Total cost ÷ ${count1}). Step 2: Multiply by ${count2}!`,
      solution: `Step 1: Cost of 1 notebook = ₹${cost1} ÷ ${count1} = ₹${costPerItem}.\nStep 2: Cost of ${count2} notebooks = ${count2} × ₹${costPerItem} = ₹${cost2}.`
    };
  } else if (battleScenario === 'petrol') {
    const litres1 = pickRandom([4, 5, 8]);
    const kmPerLitre = pickRandom([15, 20, 25]);
    const dist1 = litres1 * kmPerLitre;
    const litres2 = pickRandom([6, 9, 10, 12]);
    const dist2 = litres2 * kmPerLitre;

    return {
      question: `A car travels ${dist1} km using ${litres1} litres of petrol. How far will it travel using ${litres2} litres of petrol?`,
      options: generateOptions(`${dist2} km`, () => `${dist2 + pickRandom([-kmPerLitre, kmPerLitre, -2 * kmPerLitre, 2 * kmPerLitre])} km`),
      answer: `${dist2} km`,
      hint: `Step 1: Find distance covered in 1 litre (${dist1} ÷ ${litres1}). Step 2: Multiply by ${litres2} litres!`,
      solution: `Step 1: Distance for 1 litre = ${dist1} km ÷ ${litres1} = ${kmPerLitre} km/litre.\nStep 2: Distance for ${litres2} litres = ${litres2} × ${kmPerLitre} = ${dist2} km.`
    };
  } else {
    // Train distance
    const hours1 = pickRandom([2, 3, 4]);
    const speed = pickRandom([60, 75, 80, 90]);
    const dist1 = hours1 * speed;
    const hours2 = pickRandom([5, 6, 7]);
    const dist2 = hours2 * speed;

    return {
      question: `An Indian Railways superfast train covers ${dist1} km in ${hours1} hours at constant speed. How many km will it travel in ${hours2} hours?`,
      options: generateOptions(`${dist2} km`, () => `${dist2 + pickRandom([-speed, speed, -speed / 2, speed / 2])} km`),
      answer: `${dist2} km`,
      hint: `Find distance traveled in 1 hour first (${dist1} ÷ ${hours1}), then multiply by ${hours2} hours.`,
      solution: `Step 1: Speed per hour = ${dist1} km ÷ ${hours1} = ${speed} km/h.\nStep 2: Distance in ${hours2} hours = ${speed} × ${hours2} = ${dist2} km.`
    };
  }
};

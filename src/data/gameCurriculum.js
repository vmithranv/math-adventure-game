import { randInt, pickRandom, shuffle, generateOptions, INDIAN_NAMES } from './mathUtils.js';

// LEVEL 1: Addition & Subtraction Express
export const generateLevel1Question = (stageId) => {
  const name = pickRandom(INDIAN_NAMES);

  // Stage 1: Quick 2-digit & 3-digit mental addition
  if (stageId === 1) {
    const is3Digit = randInt(0, 1) === 1;
    const a = is3Digit ? randInt(120, 480) : randInt(25, 89);
    const b = is3Digit ? randInt(110, 390) : randInt(15, 75);
    const ans = a + b;
    return {
      question: `What is ${a} + ${b}?`,
      options: generateOptions(ans, () => ans + pickRandom([-10, 10, -20, 20, -5, 5])),
      answer: ans,
      hint: `Tip: Try adding the tens first, then add the ones! (e.g., ${Math.floor(a/10)*10} + ${Math.floor(b/10)*10} = ${Math.floor(a/10)*10 + Math.floor(b/10)*10})`,
      solution: `Step 1: Add the ones digits: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}.\nStep 2: Add the tens & hundreds.\nTotal: ${a} + ${b} = ${ans}.`
    };
  }

  // Stage 2: 4-digit & 5-digit addition with carry-over
  if (stageId === 2) {
    const a = randInt(2450, 8950);
    const b = randInt(1380, 7890);
    const ans = a + b;
    return {
      question: `Find the sum of ${a.toLocaleString('en-IN')} and ${b.toLocaleString('en-IN')}:`,
      options: generateOptions(ans.toLocaleString('en-IN'), () => (ans + pickRandom([-100, 100, -1000, 1000, 10])).toLocaleString('en-IN')),
      answer: ans.toLocaleString('en-IN'),
      hint: `Start from the ones column on the extreme right and remember to carry over whenever a column adds up to 10 or more!`,
      solution: `Line up the digits by place value:\n  ${a}\n+ ${b}\n______\n= ${ans}. Carry-over digits are added to the next column on the left.`
    };
  }

  // Stage 3: Subtraction with borrowing (including zeros like 5000 - 2348)
  if (stageId === 3) {
    const isZeroBorrow = randInt(0, 1) === 1;
    let a, b;
    if (isZeroBorrow) {
      const thousands = pickRandom([3000, 4000, 5000, 6000, 8000, 10000]);
      a = thousands;
      b = randInt(1250, thousands - 250);
    } else {
      a = randInt(4500, 9500);
      b = randInt(1200, a - 500);
    }
    const ans = a - b;
    return {
      question: `Subtract: ${a.toLocaleString('en-IN')} - ${b.toLocaleString('en-IN')}`,
      options: generateOptions(ans.toLocaleString('en-IN'), () => (ans + pickRandom([-10, 10, -100, 100, 20])).toLocaleString('en-IN')),
      answer: ans.toLocaleString('en-IN'),
      hint: isZeroBorrow ? `When subtracting from zeros (like 0 - 8), borrow 1 from the next non-zero digit on the left. The middle zeros become 9 and the last zero becomes 10!` : `Start from the rightmost digit. If top digit is smaller than bottom digit, borrow 1 from the tens place.`,
      solution: `Line up the columns and borrow from left to right:\n  ${a}\n- ${b}\n______\n= ${ans}.`
    };
  }

  // Stage 4: Fun Word Problems (shopping with ₹, pocket money, school trips)
  const scenarios = [
    {
      q: `${name} had ₹${randInt(500, 900)}. She bought a cute storybook for ₹${randInt(120, 250)} and art pencils for ₹${randInt(80, 150)}. How much money does she have left?`,
      generate: () => {
        const start = randInt(500, 900);
        const book = randInt(120, 250);
        const pencils = randInt(80, 150);
        const spent = book + pencils;
        const left = start - spent;
        return {
          q: `${name} had ₹${start}. She bought a cute storybook for ₹${book} and art pencils for ₹${pencils}. How much money does she have left?`,
          ans: `₹${left}`,
          hint: `First add the money spent on book and pencils, then subtract that total from ₹${start}!`,
          sol: `Step 1: Total spent = ₹${book} + ₹${pencils} = ₹${spent}.\nStep 2: Money left = ₹${start} - ₹${spent} = ₹${left}.`
        };
      }
    },
    {
      q: `For a school picnic to the amusement park, ${randInt(350, 480)} girls and ${randInt(320, 450)} boys joined. How many students went on the picnic in total?`,
      generate: () => {
        const girls = randInt(350, 480);
        const boys = randInt(320, 450);
        const tot = girls + boys;
        return {
          q: `For a school picnic to the amusement park, ${girls} girls and ${boys} boys joined. How many students went in total?`,
          ans: `${tot} students`,
          hint: `Combine both groups by adding the number of girls and boys together!`,
          sol: `Total students = ${girls} + ${boys} = ${tot} students.`
        };
      }
    }
  ];
  const item = pickRandom(scenarios).generate();
  return {
    question: item.q,
    options: generateOptions(item.ans, () => {
      const match = item.ans.match(/\d+/);
      const num = match ? parseInt(match[0]) : 500;
      const fake = num + pickRandom([-10, 10, -20, 20, 50, -50]);
      return item.ans.startsWith('₹') ? `₹${fake}` : `${fake} students`;
    }),
    answer: item.ans,
    hint: item.hint,
    solution: item.sol
  };
};

// LEVEL 2: Multiplication & Division Arena
export const generateLevel2Question = (stageId) => {
  const name = pickRandom(INDIAN_NAMES);

  // Stage 1: Multiplication Tables Dodge (tables 6 to 20)
  if (stageId === 1) {
    const table = randInt(6, 19);
    const mult = randInt(3, 12);
    const ans = table * mult;
    return {
      question: `What is ${table} × ${mult}?`,
      options: generateOptions(ans, () => ans + pickRandom([-table, table, -2, 2, -10, 10])),
      answer: ans,
      hint: `Tip: You can break ${table} × ${mult} into smaller parts, or recall the ${table} times table!`,
      solution: `${table} multiplied by ${mult} = ${ans}.`
    };
  }

  // Stage 2: 3-digit × 2-digit multiplication
  if (stageId === 2) {
    const a = randInt(125, 450);
    const b = randInt(12, 35);
    const ans = a * b;
    return {
      question: `Calculate: ${a} × ${b}`,
      options: generateOptions(ans.toLocaleString('en-IN'), () => (ans + pickRandom([-100, 100, -50, 50, 200])).toLocaleString('en-IN')),
      answer: ans.toLocaleString('en-IN'),
      hint: `Multiply ${a} by the ones digit of ${b} first, then multiply by the tens digit and add both partial products!`,
      solution: `Step 1: ${a} × ${b % 10} = ${a * (b % 10)}.\nStep 2: ${a} × ${Math.floor(b / 10) * 10} = ${a * (Math.floor(b / 10) * 10)}.\nStep 3: Add both results = ${ans}.`
    };
  }

  // Stage 3: Long Division (finding Quotient and Remainder)
  if (stageId === 3) {
    const divisor = pickRandom([4, 5, 6, 7, 8, 9, 12]);
    const quotient = randInt(15, 65);
    const remainder = randInt(1, divisor - 1);
    const dividend = divisor * quotient + remainder;

    return {
      question: `Divide ${dividend} by ${divisor}. What are the Quotient and Remainder?`,
      options: generateOptions(
        `Q = ${quotient}, R = ${remainder}`,
        () => `Q = ${quotient + pickRandom([-2, -1, 1, 2])}, R = ${randInt(0, divisor - 1)}`
      ),
      answer: `Q = ${quotient}, R = ${remainder}`,
      hint: `Divide ${dividend} by ${divisor}. Check how many times ${divisor} fits completely (Quotient) and what is left over (Remainder).`,
      solution: `Step 1: ${divisor} goes into ${dividend} exactly ${quotient} times because ${divisor} × ${quotient} = ${divisor * quotient}.\nStep 2: Remainder = ${dividend} - ${divisor * quotient} = ${remainder}.\nAnswer: Quotient = ${quotient}, Remainder = ${remainder}.`
    };
  }

  // Stage 4: Mixed Arithmetic Challenge (+, −, ×, ÷ combined using BODMAS)
  const a = randInt(10, 30);
  const b = randInt(2, 6);
  const c = randInt(2, 5);
  const d = randInt(5, 20);
  // (a + b * c) - d
  const ans = (a + b * c) - d;
  return {
    question: `Evaluate using BODMAS: ${a} + ${b} × ${c} - ${d}`,
    options: generateOptions(ans, () => ans + pickRandom([-5, 5, -10, 10, 2])),
    answer: ans,
    hint: `Remember BODMAS: Do Multiplication first (${b} × ${c}), then Addition, and finally Subtraction!`,
    solution: `Step 1: Multiplication first: ${b} × ${c} = ${b * c}.\nStep 2: Expression becomes: ${a} + ${b * c} - ${d}.\nStep 3: Add: ${a + b * c} - ${d} = ${ans}.`
  };
};

// LEVEL 3: Number System & Factors (Class 6 Basics)
export const generateLevel3Question = (stageId) => {
  // Stage 1: Indian Place Value
  if (stageId === 1) {
    const places = [
      { name: 'Thousands', val: 1000 },
      { name: 'Ten Thousands', val: 10000 },
      { name: 'Lakhs', val: 100000 },
      { name: 'Ten Lakhs', val: 1000000 },
      { name: 'Crores', val: 10000000 }
    ];
    const picked = pickRandom(places);
    const digit = randInt(2, 9);
    return {
      question: `In the number ${(digit * picked.val + 4523).toLocaleString('en-IN')}, what is the place value of digit ${digit}?`,
      options: generateOptions(picked.name, () => pickRandom(places).name),
      answer: picked.name,
      hint: `Count the places from right: Ones, Tens, Hundreds, Thousands, Ten Thousands, Lakhs, Ten Lakhs, Crores!`,
      solution: `Starting from the right:\nOnes -> Tens -> Hundreds -> Thousands ... The digit ${digit} is located at the ${picked.name} place.`
    };
  }

  // Stage 2: Prime vs Composite
  if (stageId === 2) {
    const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    const composites = [12, 14, 15, 16, 18, 20, 21, 25, 27, 33, 35, 49];
    const isAskingPrime = randInt(0, 1) === 1;

    if (isAskingPrime) {
      const correctPrime = pickRandom(primes);
      return {
        question: `Which of the following numbers is a Prime Number?`,
        options: generateOptions(correctPrime, () => pickRandom(composites)),
        answer: correctPrime,
        hint: `A prime number has only 2 factors: 1 and itself. It cannot be divided evenly by 2, 3, 5, etc.!`,
        solution: `${correctPrime} has only two factors: 1 and ${correctPrime}. Hence, it is a Prime Number.`
      };
    } else {
      const correctComp = pickRandom(composites);
      return {
        question: `Which of the following is a Composite Number?`,
        options: generateOptions(correctComp, () => pickRandom(primes)),
        answer: correctComp,
        hint: `A composite number has more than 2 factors and can be broken into smaller factors.`,
        solution: `${correctComp} has factors other than 1 and itself (e.g. it is divisible by ${correctComp % 2 === 0 ? '2' : correctComp % 3 === 0 ? '3' : '5'}).`
      };
    }
  }

  // Stage 3: Easy Divisibility Rules (2, 3, 5, 9, 10)
  if (stageId === 3) {
    const rule = pickRandom([3, 5, 9, 10]);
    if (rule === 3 || rule === 9) {
      const mult = randInt(15, 60) * rule;
      return {
        question: `Which of these numbers is divisible by ${rule}?`,
        options: generateOptions(mult, () => randInt(15, 60) * rule + randInt(1, rule - 1)),
        answer: mult,
        hint: `Divisibility by ${rule}: Add all the digits together. If the sum is a multiple of ${rule}, the whole number is divisible!`,
        solution: `For ${mult}, sum of digits = ${mult.toString().split('').join(' + ')} = ${mult.toString().split('').reduce((a, b) => a + parseInt(b), 0)}, which is divisible by ${rule}.`
      };
    } else {
      const mult = randInt(20, 80) * rule;
      return {
        question: `Which number is completely divisible by ${rule}?`,
        options: generateOptions(mult, () => randInt(20, 80) * rule + randInt(1, rule - 1)),
        answer: mult,
        hint: rule === 5 ? `A number is divisible by 5 if its last digit is 0 or 5.` : `A number is divisible by 10 if its last digit is 0.`,
        solution: `Rule for ${rule}: Look at the unit digit. ${mult} ends in ${mult % 10}, so it is divisible by ${rule}.`
      };
    }
  }

  // Stage 4: Simple HCF & LCM puzzles
  const isHcf = randInt(0, 1) === 1;
  const common = pickRandom([2, 3, 4, 5, 6]);
  const a = common * pickRandom([2, 3]);
  const b = common * pickRandom([4, 5]);

  const gcdCalc = (x, y) => (!y ? x : gcdCalc(y, x % y));
  const lcmCalc = (x, y) => (x * y) / gcdCalc(x, y);

  if (isHcf) {
    const ans = gcdCalc(a, b);
    return {
      question: `Find the Highest Common Factor (HCF) of ${a} and ${b}:`,
      options: generateOptions(ans, () => ans + pickRandom([-1, 1, 2, -2, common + 1])),
      answer: ans,
      hint: `The HCF is the largest number that divides both ${a} and ${b} without leaving a remainder.`,
      solution: `Factors of ${a} and ${b}:\nThe largest number that divides both is ${ans}.`
    };
  } else {
    const ans = lcmCalc(a, b);
    return {
      question: `Find the Lowest Common Multiple (LCM) of ${a} and ${b}:`,
      options: generateOptions(ans, () => ans + pickRandom([-common, common, -2 * common, 2 * common])),
      answer: ans,
      hint: `The LCM is the smallest number that appears in the times tables of BOTH ${a} and ${b}!`,
      solution: `Multiples of ${a} and ${b} share their lowest common multiple at ${ans}.`
    };
  }
};

// LEVEL 4: Fractions & Decimals Island
export const generateLevel4Question = (stageId) => {
  // Stage 1: Visual Fractions
  if (stageId === 1) {
    const den = pickRandom([3, 4, 6, 8]);
    const num = randInt(1, den - 1);
    return {
      question: `A delicious round chocolate pizza is cut into ${den} equal slices. Ananya eats ${num} slices. What fraction of the pizza did she eat?`,
      options: generateOptions(`${num}/${den}`, () => `${randInt(1, den - 1)}/${den + pickRandom([-1, 1, 2])}`),
      answer: `${num}/${den}`,
      hint: `Fraction = (Slices eaten) / (Total equal slices in the whole pizza).`,
      solution: `Eaten slices = ${num}.\nTotal equal slices = ${den}.\nFraction eaten = ${num}/${den}.`
    };
  }

  // Stage 2: Adding & Subtracting Simple Fractions
  if (stageId === 2) {
    const den = pickRandom([5, 6, 7, 8, 9, 10]);
    const n1 = randInt(1, 3);
    const n2 = randInt(1, den - n1 - 1);
    const sum = n1 + n2;
    return {
      question: `Add like fractions: ${n1}/${den} + ${n2}/${den} = ?`,
      options: generateOptions(`${sum}/${den}`, () => `${sum + pickRandom([-1, 1, 2])}/${den}`),
      answer: `${sum}/${den}`,
      hint: `When denominators are the same, keep the denominator as it is and just add the numerators! (${n1} + ${n2})`,
      solution: `Since denominators are equal (${den}), add numerators: (${n1} + ${n2})/${den} = ${sum}/${den}.`
    };
  }

  // Stage 3: Decimals in Daily Life (₹/Paise, cm/m)
  if (stageId === 3) {
    const isMoney = randInt(0, 1) === 1;
    if (isMoney) {
      const rupees = randInt(10, 85);
      const paise = pickRandom([25, 50, 75, 5, 10]);
      const ans = `₹${(rupees + paise / 100).toFixed(2)}`;
      return {
        question: `Express ${rupees} rupees and ${paise} paise in rupees using decimals:`,
        options: generateOptions(ans, () => `₹${(rupees + pickRandom([paise + 10, paise - 5, paise * 10]) / 100).toFixed(2)}`),
        answer: ans,
        hint: `1 Rupee = 100 Paise. So ${paise} paise = ₹0.${paise < 10 ? '0' + paise : paise}.`,
        solution: `${paise} paise = ₹${(paise / 100).toFixed(2)}.\nTotal = ₹${rupees} + ₹${(paise / 100).toFixed(2)} = ${ans}.`
      };
    } else {
      const m = randInt(2, 9);
      const cm = pickRandom([15, 30, 45, 60, 80]);
      const ans = `${(m + cm / 100).toFixed(2)} m`;
      return {
        question: `Convert ${m} metres and ${cm} cm into metres using decimals:`,
        options: generateOptions(ans, () => `${(m + pickRandom([cm + 10, cm - 10, 5]) / 100).toFixed(2)} m`),
        answer: ans,
        hint: `1 metre = 100 cm. Therefore, ${cm} cm = ${cm}/100 m = 0.${cm} m.`,
        solution: `${m} m + ${cm}/100 m = ${ans}.`
      };
    }
  }

  // Stage 4: Comparing & Ordering Decimals
  const base = randInt(3, 12);
  const d1 = parseFloat(`${base}.${randInt(1, 4)}`);
  const d2 = parseFloat(`${base}.${randInt(6, 9)}`);
  const max = Math.max(d1, d2);
  return {
    question: `Which of these two decimals is greater: ${d1} or ${d2}?`,
    options: [`${max}`, `${Math.min(d1, d2)}`, 'Both are equal', 'Cannot be determined'],
    answer: `${max}`,
    hint: `Both have the same whole number (${base}). Look at the tenths digit right after the dot: ${Math.floor((d1 % 1) * 10)} vs ${Math.floor((d2 % 1) * 10)}!`,
    solution: `Comparing tenths place: ${max} has a greater tenths digit than ${Math.min(d1, d2)}, so ${max} is greater.`
  };
};

// LEVEL 5: Shapes, Angles & Measurement
export const generateLevel5Question = (stageId) => {
  // Stage 1: Identifying Angles
  if (stageId === 1) {
    const angleTypes = [
      { deg: 45, type: 'Acute Angle (Less than 90°)' },
      { deg: 90, type: 'Right Angle (Exactly 90°)' },
      { deg: 120, type: 'Obtuse Angle (Between 90° and 180°)' },
      { deg: 180, type: 'Straight Angle (Exactly 180°)' }
    ];
    const picked = pickRandom(angleTypes);
    return {
      question: `An angle measuring ${picked.deg}° is called an:`,
      options: angleTypes.map(a => a.type),
      answer: picked.type,
      hint: `Acute is sharp (<90°), Right is an L-corner (90°), Obtuse is wide (>90°), and Straight is a straight line (180°)!`,
      solution: `${picked.deg}° is classified as an ${picked.type}.`
    };
  }

  // Stage 2: Perimeter of Shapes
  if (stageId === 2) {
    const shape = pickRandom(['square', 'rectangle']);
    if (shape === 'square') {
      const s = randInt(4, 15);
      const p = 4 * s;
      return {
        question: `What is the perimeter of a square photo frame of side ${s} cm?`,
        options: generateOptions(`${p} cm`, () => `${p + pickRandom([-4, 4, -8, 8])} cm`),
        answer: `${p} cm`,
        hint: `A square has 4 equal sides. Perimeter = 4 × side!`,
        solution: `Perimeter = 4 × ${s} cm = ${p} cm.`
      };
    } else {
      const l = randInt(8, 16);
      const b = randInt(4, l - 1);
      const p = 2 * (l + b);
      return {
        question: `Find the perimeter of a rectangle with length ${l} cm and breadth ${b} cm:`,
        options: generateOptions(`${p} cm`, () => `${p + pickRandom([-4, 4, -6, 6])} cm`),
        answer: `${p} cm`,
        hint: `Perimeter of rectangle = 2 × (Length + Breadth).`,
        solution: `Perimeter = 2 × (${l} + ${b}) = 2 × ${l + b} = ${p} cm.`
      };
    }
  }

  // Stage 3: Area of Squares & Rectangles
  if (stageId === 3) {
    const l = randInt(5, 12);
    const b = randInt(3, 8);
    const area = l * b;
    return {
      question: `Find the area of a rectangular study table of length ${l} m and width ${b} m:`,
      options: generateOptions(`${area} sq m`, () => `${area + pickRandom([-l, l, -b, b, 10])} sq m`),
      answer: `${area} sq m`,
      hint: `Area of a rectangle = Length × Breadth. Think of it as a grid of ${l} by ${b} square boxes!`,
      solution: `Area = ${l} × ${b} = ${area} sq m.`
    };
  }

  // Stage 4: Real-life Garden & Room Problems
  const l = randInt(10, 25);
  const b = randInt(6, l - 2);
  const perim = 2 * (l + b);
  const costPerM = pickRandom([10, 15, 20]);
  const totCost = perim * costPerM;
  return {
    question: `A school vegetable garden is ${l} m long and ${b} m wide. How much will it cost to fence around its boundary at ₹${costPerM} per metre?`,
    options: generateOptions(`₹${totCost}`, () => `₹${totCost + pickRandom([-costPerM * 4, costPerM * 4, -50, 50])}`),
    answer: `₹${totCost}`,
    hint: `Boundary means Perimeter! First find Perimeter = 2 × (L + B), then multiply by ₹${costPerM}.`,
    solution: `Step 1: Perimeter = 2 × (${l} + ${b}) = ${perim} m.\nStep 2: Total cost = ${perim} × ₹${costPerM} = ₹${totCost}.`
  };
};

// LEVEL 6: Intro to Ratios & Simple Algebra
export const generateLevel6Question = (stageId) => {
  const name = pickRandom(INDIAN_NAMES);

  // Stage 1: Number & Pattern Puzzles
  if (stageId === 1) {
    const diff = pickRandom([3, 4, 5, 6, 7]);
    const start = randInt(2, 10);
    const s1 = start;
    const s2 = start + diff;
    const s3 = start + diff * 2;
    const missing = start + diff * 3;
    const s5 = start + diff * 4;

    return {
      question: `Find the missing number in the pattern: ${s1}, ${s2}, ${s3}, ___, ${s5}`,
      options: generateOptions(missing, () => missing + pickRandom([-diff, diff, -2, 2, 1])),
      answer: missing,
      hint: `Look at how much is being added each time! (Notice the jump between ${s1} and ${s2}).`,
      solution: `Each step increases by ${diff}.\nMissing number = ${s3} + ${diff} = ${missing}.`
    };
  }

  // Stage 2: Simple Equations
  if (stageId === 2) {
    const ansX = randInt(3, 15);
    const b = randInt(4, 18);
    const tot = ansX + b;
    return {
      question: `Solve for x: x + ${b} = ${tot}`,
      options: generateOptions(ansX, () => ansX + pickRandom([-3, 3, -5, 5, 2])),
      answer: ansX,
      hint: `To find x, subtract ${b} from ${tot}: x = ${tot} - ${b}.`,
      solution: `x + ${b} = ${tot}\nx = ${tot} - ${b}\nx = ${ansX}.`
    };
  }

  // Stage 3: Easy Ratios
  if (stageId === 3) {
    const p1 = randInt(1, 3);
    const p2 = randInt(2, 4);
    const mult = randInt(4, 10);
    const c1 = p1 * mult;
    const c2 = p2 * mult;
    const total = c1 + c2;

    return {
      question: `${total} sweets are shared between ${name} and her friend in the ratio ${p1} : ${p2}. How many sweets does ${name} get?`,
      options: generateOptions(`${c1} sweets`, () => `${c1 + pickRandom([-mult, mult, -2, 2])} sweets`),
      answer: `${c1} sweets`,
      hint: `Total ratio parts = ${p1} + ${p2} = ${p1 + p2}. Find 1 part: ${total} ÷ ${p1 + p2}. Then multiply by ${p1}!`,
      solution: `Total parts = ${p1} + ${p2} = ${p1 + p2}.\n1 part = ${total} ÷ ${p1 + p2} = ${mult} sweets.\n${name}'s share (${p1} parts) = ${p1} × ${mult} = ${c1} sweets.`
    };
  }

  // Stage 4: Grand Champion Mixed Quiz
  const cost1 = pickRandom([15, 20, 25, 30]);
  const numItems = randInt(3, 6);
  const totalCost = cost1 * numItems;
  const askItems = randInt(7, 10);
  const grandAnswer = cost1 * askItems;

  return {
    question: `Grand Challenge: If ${numItems} colourful geometry boxes cost ₹${totalCost}, what is the cost of ${askItems} such boxes?`,
    options: generateOptions(`₹${grandAnswer}`, () => `₹${grandAnswer + pickRandom([-cost1, cost1, -2 * cost1, 2 * cost1])}`),
    answer: `₹${grandAnswer}`,
    hint: `Use the Unitary Method: Step 1: Find the cost of 1 box (₹${totalCost} ÷ ${numItems}). Step 2: Multiply by ${askItems}!`,
    solution: `Cost of 1 box = ₹${totalCost} ÷ ${numItems} = ₹${cost1}.\nCost of ${askItems} boxes = ${askItems} × ₹${cost1} = ₹${grandAnswer}.`
  };
};

export const LEVELS = [
  {
    id: 1,
    name: 'Addition & Subtraction Express',
    chapter: 'Mental Math & Multi-digit Arithmetic',
    themeColor: 'from-pink-500 to-rose-600',
    icon: '🚂',
    generator: generateLevel1Question,
    stages: [
      { id: 1, title: '2 & 3 Digit Mental Addition', subtitle: 'Quick mental warm-up' },
      { id: 2, title: '4 & 5 Digit Carry-over', subtitle: 'Adding larger numbers' },
      { id: 3, title: 'Borrowing with Zeros', subtitle: 'Conquering zero subtraction' },
      { id: 4, title: 'Shopping Word Problems', subtitle: 'Fun daily life math', isBoss: true }
    ],
    gift: {
      id: 'gift_puppy',
      name: 'Astro Puppy 🐶',
      type: 'companion',
      desc: 'An adorable space pup who loves mental arithmetic!',
      icon: '🐶'
    }
  },
  {
    id: 2,
    name: 'Multiplication & Division Arena',
    chapter: 'Tables, Multi-digit & Long Division',
    themeColor: 'from-amber-500 to-orange-600',
    icon: '⚡',
    generator: generateLevel2Question,
    stages: [
      { id: 1, title: 'Tables Dodge (6 to 20)', subtitle: 'Fast table recall' },
      { id: 2, title: '3-Digit × 2-Digit Math', subtitle: 'Step-by-step products' },
      { id: 3, title: 'Long Division & Remainders', subtitle: 'Quotient and Remainder' },
      { id: 4, title: 'BODMAS Mixed Challenge', subtitle: 'Order of operations', isBoss: true }
    ],
    gift: {
      id: 'gift_owl',
      name: 'Robo Owl 🦉',
      type: 'companion',
      desc: 'A super-smart mechanical owl with instant calculations!',
      icon: '🦉'
    }
  },
  {
    id: 3,
    name: 'Number System & Factors',
    chapter: 'Place Values, Primes & Divisibility',
    themeColor: 'from-emerald-500 to-teal-600',
    icon: '🔢',
    generator: generateLevel3Question,
    stages: [
      { id: 1, title: 'Indian Place Values', subtitle: 'Thousands, Lakhs & Crores' },
      { id: 2, title: 'Prime vs Composite', subtitle: 'Discovering prime building blocks' },
      { id: 3, title: 'Divisibility Shortcuts', subtitle: 'Rules for 2, 3, 5, 9, 10' },
      { id: 4, title: 'HCF & LCM Puzzles', subtitle: 'Common factors and multiples', isBoss: true }
    ],
    gift: {
      id: 'gift_theme_candy',
      name: 'Candy Pastel Theme 🍬',
      type: 'theme',
      desc: 'A sweet and cheerful candy wonderland style!',
      icon: '🍬'
    }
  },
  {
    id: 4,
    name: 'Fractions & Decimals Island',
    chapter: 'Fractions, Metric & Money Decimals',
    themeColor: 'from-cyan-500 to-blue-600',
    icon: '🏝️',
    generator: generateLevel4Question,
    stages: [
      { id: 1, title: 'Visual Pizza Fractions', subtitle: 'Understanding parts of a whole' },
      { id: 2, title: 'Adding Like Fractions', subtitle: 'Simple fraction sums' },
      { id: 3, title: 'Decimals in Daily Life', subtitle: '₹/Paise and metres/cm' },
      { id: 4, title: 'Comparing Decimals', subtitle: 'Tenths & hundredths ordering', isBoss: true }
    ],
    gift: {
      id: 'gift_unicorn',
      name: 'Magic Unicorn 🦄',
      type: 'companion',
      desc: 'Spreads rainbow sparkles whenever you solve fractions!',
      icon: '🦄'
    }
  },
  {
    id: 5,
    name: 'Shapes, Angles & Measurement',
    chapter: 'Angles, Perimeters & Area Grids',
    themeColor: 'from-purple-500 to-indigo-600',
    icon: '📐',
    generator: generateLevel5Question,
    stages: [
      { id: 1, title: 'Identifying Angles', subtitle: 'Acute, Right, Obtuse & Straight' },
      { id: 2, title: 'Perimeter of Polygons', subtitle: 'Boundary calculations' },
      { id: 3, title: 'Area of Rectangles & Squares', subtitle: 'Grid box measurements' },
      { id: 4, title: 'Garden & Room Problems', subtitle: 'Real-world fencing & flooring', isBoss: true }
    ],
    gift: {
      id: 'gift_trophy_gold',
      name: 'Golden Champion Trophy 🏆',
      type: 'trophy',
      desc: 'Official Math Champion Gold Trophy awarded for Grade 6 geometry mastery!',
      icon: '🏆'
    }
  },
  {
    id: 6,
    name: 'Intro to Ratios & Simple Algebra',
    chapter: 'Patterns, Variables & Ratios',
    themeColor: 'from-rose-500 to-pink-600',
    icon: '🌟',
    generator: generateLevel6Question,
    stages: [
      { id: 1, title: 'Number & Pattern Puzzles', subtitle: 'Find the secret rule' },
      { id: 2, title: 'Simple One-Step Equations', subtitle: 'Finding unknown x' },
      { id: 3, title: 'Sharing in Easy Ratios', subtitle: 'Splitting sweets & items' },
      { id: 4, title: 'Grand Champion Mixed Quiz', subtitle: 'Unitary method & overall review', isBoss: true }
    ],
    gift: {
      id: 'gift_certificate',
      name: 'Grand Math Master Certificate 📜',
      type: 'certificate',
      desc: 'Prestigious CBSE Grade 6 Grand Mathematician Honor Certificate!',
      icon: '📜'
    }
  }
];

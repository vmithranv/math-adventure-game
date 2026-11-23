import { randInt, pickRandom, generateOptions, INDIAN_NAMES } from './mathUtils.js';

// Helper GCD / LCM
const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

// Helper prime factorisation
const getPrimeFactors = (n) => {
  const factors = [];
  let d = 2;
  while (d * d <= n) {
    while (n % d === 0) {
      factors.push(d);
      n /= d;
    }
    d++;
  }
  if (n > 1) factors.push(n);
  return factors;
};

// Check prime
const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

// WORLD 2: FACTOR FOREST
export const generateWorld2Question = (stageId) => {
  const name = pickRandom(INDIAN_NAMES);

  // Stage 1: Prime & Composite, Divisibility Rules (2, 3, 4, 5, 6, 8, 9, 10, 11)
  if (stageId === 1) {
    const qType = randInt(1, 3);
    if (qType === 1) {
      // Prime vs Composite
      const candidate = pickRandom([17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 21, 27, 33, 35, 39, 49, 51, 57, 63]);
      const prime = isPrime(candidate);
      return {
        question: `Is the number ${candidate} Prime or Composite?`,
        options: ['Prime Number', 'Composite Number', 'Neither Prime nor Composite', 'Twin Prime'],
        answer: prime ? 'Prime Number' : 'Composite Number',
        hint: `A prime number has exactly 2 factors: 1 and itself. A composite number has more than 2 factors.`,
        solution: prime
          ? `${candidate} has only two factors: 1 and ${candidate}. Hence, it is a Prime Number.`
          : `${candidate} has factors other than 1 and itself (e.g. divisible by ${candidate % 3 === 0 ? '3' : candidate % 5 === 0 ? '5' : '7'}). Hence, it is a Composite Number.`
      };
    } else if (qType === 2) {
      // Divisibility rule (3, 9, 11)
      const ruleChoice = pickRandom([3, 9, 11]);
      if (ruleChoice === 3 || ruleChoice === 9) {
        const multiple = randInt(15, 65) * ruleChoice;
        return {
          question: `Which of the following numbers is divisible by ${ruleChoice}?`,
          options: generateOptions(multiple, () => {
            const wrong = randInt(15, 65) * ruleChoice + randInt(1, ruleChoice - 1);
            return wrong;
          }),
          answer: multiple,
          hint: `Rule of ${ruleChoice}: If the sum of the digits of a number is a multiple of ${ruleChoice}, then the number is divisible by ${ruleChoice}.`,
          solution: `Sum of digits of ${multiple} = ${multiple.toString().split('').join(' + ')} = ${multiple.toString().split('').reduce((a, b) => a + parseInt(b), 0)}, which is divisible by ${ruleChoice}.`
        };
      } else {
        // Divisibility by 11
        // Form a number divisible by 11
        const num11 = randInt(15, 80) * 11;
        return {
          question: `Which of the following numbers is divisible by 11?`,
          options: generateOptions(num11, () => randInt(15, 80) * 11 + randInt(1, 10)),
          answer: num11,
          hint: `Rule for 11: Find difference between sum of digits in odd places and sum of digits in even places. If difference is 0 or multiple of 11, it's divisible!`,
          solution: `Check ${num11}: The difference between the sum of digits in odd positions and even positions is a multiple of 11 (or 0).`
        };
      }
    } else {
      // Divisibility by 4 or 6
      const rule = pickRandom([4, 6]);
      const valid = randInt(25, 95) * rule;
      return {
        question: `Which number is completely divisible by ${rule}?`,
        options: generateOptions(valid, () => randInt(25, 95) * rule + randInt(1, rule - 1)),
        answer: valid,
        hint: rule === 4 ? `Divisibility by 4: Look at the last two digits. If they form a multiple of 4, the number is divisible.` : `Divisibility by 6: The number must be divisible by BOTH 2 (even number) and 3 (sum of digits divisible by 3).`,
        solution: rule === 4
          ? `For ${valid}, the last two digits (${valid % 100}) are divisible by 4.`
          : `For ${valid}, it is an even number AND the sum of its digits is divisible by 3. Hence divisible by 6.`
      };
    }
  }

  // Stage 2: Prime Factorisation
  if (stageId === 2) {
    const num = pickRandom([24, 36, 48, 60, 72, 84, 90, 100, 120]);
    const factors = getPrimeFactors(num);
    const correctStr = factors.join(' × ');

    return {
      question: `What is the complete Prime Factorisation of ${num}?`,
      options: generateOptions(correctStr, () => {
        const dummy = [...factors];
        if (dummy.length > 2) {
          dummy.pop();
          dummy.push(dummy[dummy.length - 1] + 1);
        } else {
          dummy.push(2);
        }
        return dummy.join(' × ');
      }),
      answer: correctStr,
      hint: `Keep dividing ${num} by the smallest prime numbers (2, 3, 5...) repeatedly until the quotient is 1.`,
      solution: `Prime factorisation of ${num}:\nDividing successively by primes:\n${num} = ${correctStr}. All factors must be prime numbers!`
    };
  }

  // Stage 3: Finding HCF & LCM
  if (stageId === 3) {
    const isHcf = randInt(0, 1) === 1;
    const common = pickRandom([4, 6, 8, 9, 12]);
    const m1 = pickRandom([2, 3, 5]);
    const m2 = pickRandom([7, 11, 13]);
    const a = common * m1;
    const b = common * m2;
    const ansGcd = gcd(a, b);
    const ansLcm = lcm(a, b);

    if (isHcf) {
      return {
        question: `Find the Highest Common Factor (HCF) of ${a} and ${b}:`,
        options: generateOptions(ansGcd, () => pickRandom([ansGcd + 2, ansGcd - 1 || 1, ansGcd * 2, common / 2 || 2])),
        answer: ansGcd,
        hint: `HCF is the largest number that divides both ${a} and ${b} without leaving a remainder.`,
        solution: `Factors of ${a} and ${b}:\nPrime factors of ${a} = ${getPrimeFactors(a).join(' × ')}\nPrime factors of ${b} = ${getPrimeFactors(b).join(' × ')}\nCommon prime factors = ${ansGcd}.`
      };
    } else {
      const x = pickRandom([6, 8, 12, 15]);
      const y = pickRandom([9, 10, 18, 20]);
      const calcLcm = lcm(x, y);
      return {
        question: `Find the Lowest Common Multiple (LCM) of ${x} and ${y}:`,
        options: generateOptions(calcLcm, () => calcLcm + pickRandom([-12, 12, -24, 24, 30])),
        answer: calcLcm,
        hint: `LCM is the smallest positive number that is a multiple of both ${x} and ${y}.`,
        solution: `Multiples of ${x} and ${y}:\nPrime factorisation:\n${x} = ${getPrimeFactors(x).join(' × ')}\n${y} = ${getPrimeFactors(y).join(' × ')}\nLCM(${x}, ${y}) = ${calcLcm}.`
      };
    }
  }

  // Stage 4: Boss Battle — Real-life HCF/LCM Word Problems
  const battleType = pickRandom(['bells', 'tiles', 'ribbon']);

  if (battleType === 'bells') {
    const b1 = pickRandom([6, 9, 12]);
    const b2 = pickRandom([8, 15, 18]);
    const bellLcm = lcm(b1, b2);
    return {
      question: `Two temple bells in a town toll at intervals of ${b1} minutes and ${b2} minutes respectively. If they toll together now, after how many minutes will they toll together next?`,
      options: generateOptions(`${bellLcm} minutes`, () => `${bellLcm + pickRandom([-6, 6, -12, 12, 24])} minutes`),
      answer: `${bellLcm} minutes`,
      hint: `Since the bells toll periodically, the next common time they toll together is given by their LCM (Lowest Common Multiple)!`,
      solution: `Step 1: Identify that this problem requires finding the LCM of ${b1} and ${b2}.\nStep 2: Prime factors:\n${b1} = ${getPrimeFactors(b1).join(' × ')}\n${b2} = ${getPrimeFactors(b2).join(' × ')}\nStep 3: LCM(${b1}, ${b2}) = ${bellLcm}.\nThey toll together after ${bellLcm} minutes.`
    };
  } else if (battleType === 'tiles') {
    const sideGcd = pickRandom([15, 20, 25, 30]);
    const length = sideGcd * randInt(3, 6);
    const breadth = sideGcd * randInt(2, 5);
    const tileHcf = gcd(length, breadth);
    return {
      question: `A room floor has length ${length} cm and breadth ${breadth} cm. What is the largest side length of a square tile that can pave the floor without cutting?`,
      options: generateOptions(`${tileHcf} cm`, () => `${tileHcf + pickRandom([-5, 5, -10, 10])} cm`),
      answer: `${tileHcf} cm`,
      hint: `To find the largest tile size that fits both dimensions exactly, find the HCF (Highest Common Factor) of length and breadth!`,
      solution: `Step 1: The largest square tile side = HCF of length (${length} cm) and breadth (${breadth} cm).\nStep 2: HCF(${length}, ${breadth}) = ${tileHcf} cm.\nHence, the maximum square tile side is ${tileHcf} cm.`
    };
  } else {
    // Ribbon / Oil cans
    const can1 = pickRandom([40, 60, 80]);
    const can2 = pickRandom([75, 90, 100]);
    const canHcf = gcd(can1, can2);
    return {
      question: `Two tankers contain ${can1} litres and ${can2} litres of milk. What is the maximum capacity of a container that can measure the milk of both tankers an exact number of times?`,
      options: generateOptions(`${canHcf} litres`, () => `${canHcf + pickRandom([-5, 5, -2, 2, 10])} litres`),
      answer: `${canHcf} litres`,
      hint: `Maximum capacity to measure both containers exactly requires finding the HCF of ${can1} and ${can2}.`,
      solution: `Step 1: Container capacity = HCF(${can1}, ${can2}).\nStep 2: Factors of ${can1} and ${can2} yield HCF = ${canHcf}.\nAnswer = ${canHcf} litres.`
    };
  }
};

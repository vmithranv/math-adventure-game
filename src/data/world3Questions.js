import { randInt, pickRandom, generateOptions, INDIAN_NAMES } from './mathUtils.js';

const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

// WORLD 3: FRACTION & DECIMAL ISLANDS
export const generateWorld3Question = (stageId) => {
  const name = pickRandom(INDIAN_NAMES);

  // Stage 1: Equivalent, Proper, Improper & Mixed Fractions
  if (stageId === 1) {
    const qType = randInt(1, 3);
    if (qType === 1) {
      // Fraction classification
      const num = randInt(2, 12);
      const den = randInt(2, 12);
      if (num === den) {
        return {
          question: `What type of fraction is ${num}/${den}?`,
          options: ['Equal to 1 (Whole)', 'Proper Fraction', 'Mixed Fraction', 'Decimal Fraction'],
          answer: 'Equal to 1 (Whole)',
          hint: `When numerator equals denominator, the fraction equals 1.`,
          solution: `Since the numerator (${num}) equals denominator (${den}), ${num}/${den} = 1.`
        };
      }
      const isProper = num < den;
      return {
        question: `The fraction ${num}/${den} is an example of a:`,
        options: ['Proper Fraction', 'Improper Fraction', 'Mixed Fraction', 'Unit Fraction'],
        answer: isProper ? 'Proper Fraction' : 'Improper Fraction',
        hint: isProper 
          ? `In a Proper Fraction, the numerator is strictly smaller than the denominator.`
          : `In an Improper Fraction, the numerator is greater than or equal to the denominator.`,
        solution: `${num}/${den}: Numerator is ${num} and Denominator is ${den}. Since ${num} ${isProper ? '<' : '>'} ${den}, it is a ${isProper ? 'Proper Fraction' : 'Improper Fraction'}.`
      };
    } else if (qType === 2) {
      // Mixed to improper or improper to mixed
      const whole = randInt(2, 6);
      const rem = randInt(1, 4);
      const den = randInt(rem + 1, 7);
      const num = whole * den + rem;

      return {
        question: `Convert the improper fraction ${num}/${den} into a mixed fraction:`,
        options: generateOptions(`${whole} ${rem}/${den}`, () => `${whole + pickRandom([-1, 1])} ${rem}/${den}`),
        answer: `${whole} ${rem}/${den}`,
        hint: `Divide numerator by denominator: Quotient becomes the whole number, and remainder becomes the new numerator!`,
        solution: `Divide ${num} by ${den}:\nQuotient = ${whole}, Remainder = ${rem}.\nSo, ${num}/${den} = ${whole} ${rem}/${den}.`
      };
    } else {
      // Equivalent fractions
      const a = randInt(1, 5);
      const b = randInt(a + 1, 8);
      const mult = randInt(2, 5);
      const eqA = a * mult;
      const eqB = b * mult;

      return {
        question: `Find the value of 'x' in the equivalent fraction: ${a}/${b} = x/${eqB}`,
        options: generateOptions(eqA, () => eqA + pickRandom([-2, -1, 1, 2, mult])),
        answer: eqA,
        hint: `Check what number ${b} was multiplied by to get ${eqB}. Multiply the numerator ${a} by that same number!`,
        solution: `Denominator is multiplied by ${mult} (${b} × ${mult} = ${eqB}).\nMultiply numerator by ${mult}: x = ${a} × ${mult} = ${eqA}.`
      };
    }
  }

  // Stage 2: Addition & Subtraction of Unlike Fractions
  if (stageId === 2) {
    const d1 = pickRandom([2, 3, 4, 5, 6]);
    const d2 = pickRandom([3, 4, 5, 7, 8].filter(x => x !== d1));
    const commonDen = lcm(d1, d2);
    const n1 = randInt(1, d1 - 1);
    const n2 = randInt(1, d2 - 1);
    const isAdd = randInt(0, 1) === 1;

    let resNum, ansStr;
    if (isAdd) {
      resNum = n1 * (commonDen / d1) + n2 * (commonDen / d2);
      const g = gcd(resNum, commonDen);
      ansStr = `${resNum / g}/${commonDen / g}`;
      return {
        question: `Calculate: ${n1}/${d1} + ${n2}/${d2}`,
        options: generateOptions(ansStr, () => {
          const fakeNum = resNum + pickRandom([-2, -1, 1, 2, 3]);
          const g2 = gcd(Math.abs(fakeNum), commonDen);
          return `${fakeNum / g2}/${commonDen / g2}`;
        }),
        answer: ansStr,
        hint: `Step 1: Find LCM of denominators ${d1} and ${d2} (${commonDen}). Step 2: Convert to like fractions and add numerators!`,
        solution: `LCM of ${d1} and ${d2} = ${commonDen}.\n${n1}/${d1} = ${n1 * (commonDen / d1)}/${commonDen}\n${n2}/${d2} = ${n2 * (commonDen / d2)}/${commonDen}\nSum = (${n1 * (commonDen / d1)} + ${n2 * (commonDen / d2)})/${commonDen} = ${resNum}/${commonDen} = ${ansStr}.`
      };
    } else {
      // Ensure positive result
      let f1_num = n1, f1_den = d1, f2_num = n2, f2_den = d2;
      if (f1_num / f1_den < f2_num / f2_den) {
        [f1_num, f2_num] = [f2_num, f1_num];
        [f1_den, f2_den] = [f2_den, f1_den];
      }
      const cDen = lcm(f1_den, f2_den);
      let subNum = f1_num * (cDen / f1_den) - f2_num * (cDen / f2_den);
      if (subNum === 0) subNum = 1; // Safeguard
      const g = gcd(subNum, cDen);
      ansStr = `${subNum / g}/${cDen / g}`;

      return {
        question: `Calculate: ${f1_num}/${f1_den} - ${f2_num}/${f2_den}`,
        options: generateOptions(ansStr, () => `${(subNum + pickRandom([1, 2, 3]))}/${cDen}`),
        answer: ansStr,
        hint: `Find the common denominator (LCM), convert both fractions, and subtract the smaller numerator from the larger one.`,
        solution: `LCM of ${f1_den} and ${f2_den} = ${cDen}.\n= (${f1_num * (cDen / f1_den)} - ${f2_num * (cDen / f2_den)})/${cDen} = ${ansStr}.`
      };
    }
  }

  // Stage 3: Understanding Decimals (Tenths, Hundredths, Place Value)
  if (stageId === 3) {
    const qType = randInt(1, 3);
    if (qType === 1) {
      // Place value of a digit
      const ones = randInt(1, 9);
      const tenths = randInt(1, 9);
      const hundredths = randInt(1, 9);
      const dec = parseFloat(`${ones}.${tenths}${hundredths}`);
      return {
        question: `In the number ${dec}, what is the place value of digit ${tenths}?`,
        options: ['Tenths (1/10)', 'Hundredths (1/100)', 'Ones', 'Tens'],
        answer: 'Tenths (1/10)',
        hint: `The first digit to the right of the decimal point is the 'tenths' place!`,
        solution: `In ${dec}:\nDigit ${ones} is in Ones place.\nDigit ${tenths} is in Tenths place (value ${tenths}/10 = 0.${tenths}).\nDigit ${hundredths} is in Hundredths place.`
      };
    } else if (qType === 2) {
      // Decimal to fraction or vice versa
      const num = randInt(3, 45);
      const den = pickRandom([10, 100]);
      const decVal = (num / den).toFixed(den === 10 ? 1 : 2);
      return {
        question: `Express ${num}/${den} as a decimal:`,
        options: generateOptions(decVal, () => (num / (den === 10 ? 100 : 10)).toFixed(2)),
        answer: decVal,
        hint: `Dividing by 10 moves the decimal point 1 place left; dividing by 100 moves it 2 places left.`,
        solution: `${num} divided by ${den} = ${decVal}.`
      };
    } else {
      // Comparing decimals
      const base = randInt(2, 9);
      const d1 = parseFloat(`${base}.${randInt(1, 5)}`);
      const d2 = parseFloat(`${base}.${randInt(6, 9)}`);
      const max = Math.max(d1, d2);
      return {
        question: `Which decimal is greater: ${d1} or ${d2}?`,
        options: [`${max}`, `${Math.min(d1, d2)}`, 'Both are equal', 'Cannot be determined'],
        answer: `${max}`,
        hint: `Compare the tenths digit first since the whole number parts are equal.`,
        solution: `Comparing ${d1} and ${d2}:\nTenths digit of ${max} is larger than tenths digit of ${Math.min(d1, d2)}.\nHence, ${max} is greater.`
      };
    }
  }

  // Stage 4: Boss Battle — Money (₹/Paise), Length (m/cm), and Weight (kg/g) Conversions
  const battleCategory = pickRandom(['money', 'length', 'weight']);

  if (battleCategory === 'money') {
    const rupees = randInt(25, 95);
    const paise = pickRandom([5, 10, 25, 50, 75]);
    const totalDec = `₹${(rupees + paise / 100).toFixed(2)}`;
    return {
      question: `${name} bought school stationery worth ${rupees} rupees and ${paise} paise. Express this total cost in rupees using decimals:`,
      options: generateOptions(totalDec, () => `₹${(rupees + pickRandom([paise + 10, paise - 5, paise * 10]) / 100).toFixed(2)}`),
      answer: totalDec,
      hint: `1 Rupee = 100 Paise. Therefore, 1 Paisa = ₹(1/100) = ₹0.01.`,
      solution: `Step 1: ${paise} paise = ₹(${paise}/100) = ₹${(paise / 100).toFixed(2)}.\nStep 2: Total = ₹${rupees} + ₹${(paise / 100).toFixed(2)} = ${totalDec}.`
    };
  } else if (battleCategory === 'length') {
    const m = randInt(3, 15);
    const cm = pickRandom([20, 45, 60, 75, 8]);
    const ansM = `${(m + cm / 100).toFixed(2)} m`;
    return {
      question: `A cloth piece measures ${m} metres ${cm} cm. Express its length completely in metres using decimals:`,
      options: generateOptions(ansM, () => `${(m + pickRandom([cm + 10, cm - 10, cm * 2]) / 100).toFixed(2)} m`),
      answer: ansM,
      hint: `1 metre = 100 cm. So 1 cm = 0.01 m.`,
      solution: `Step 1: ${cm} cm = ${cm}/100 m = ${(cm / 100).toFixed(2)} m.\nStep 2: ${m} m + ${(cm / 100).toFixed(2)} m = ${ansM}.`
    };
  } else {
    // Weight
    const kg = randInt(2, 9);
    const g = pickRandom([250, 500, 750, 125, 50]);
    const ansKg = `${(kg + g / 1000).toFixed(3)} kg`;
    return {
      question: `${name}'s mother bought a bag of mangoes weighing ${kg} kg and ${g} grams. Express this total weight in kilograms:`,
      options: generateOptions(ansKg, () => `${(kg + pickRandom([g + 100, g - 50, g * 2]) / 1000).toFixed(3)} kg`),
      answer: ansKg,
      hint: `1 kg = 1,000 g. So 1 g = 1/1000 kg = 0.001 kg.`,
      solution: `Step 1: ${g} g = ${g}/1000 kg = ${(g / 1000).toFixed(3)} kg.\nStep 2: ${kg} kg + ${(g / 1000).toFixed(3)} kg = ${ansKg}.`
    };
  }
};

import { randInt, pickRandom, generateOptions, INDIAN_NAMES } from './mathUtils.js';

// WORLD 4: GEOMETRY & MENSURATION VALLEY
export const generateWorld4Question = (stageId) => {
  const name = pickRandom(INDIAN_NAMES);

  // Stage 1: Angles (Acute, Obtuse, Right, Reflex) & Triangles
  if (stageId === 1) {
    const qType = randInt(1, 3);
    if (qType === 1) {
      // Angle classification
      const angle = pickRandom([35, 45, 60, 90, 115, 135, 160, 180, 210, 280, 315]);
      let type;
      if (angle < 90) type = 'Acute Angle';
      else if (angle === 90) type = 'Right Angle';
      else if (angle < 180) type = 'Obtuse Angle';
      else if (angle === 180) type = 'Straight Angle';
      else type = 'Reflex Angle';

      return {
        question: `An angle measuring ${angle}° is classified as a:`,
        options: ['Acute Angle', 'Right Angle', 'Obtuse Angle', 'Reflex Angle'],
        answer: type,
        hint: `Acute < 90°, Right = 90°, Obtuse is between 90° & 180°, Reflex is between 180° & 360°.`,
        solution: `${angle}° is ${type} because it is ${
          angle < 90 ? 'less than 90°' :
          angle === 90 ? 'exactly 90°' :
          angle < 180 ? 'greater than 90° and less than 180°' :
          angle === 180 ? 'a straight 180° line' : 'greater than 180° and less than 360°'
        }.`
      };
    } else if (qType === 2) {
      // Triangle angle sum property
      const a1 = randInt(30, 80);
      const a2 = randInt(30, 140 - a1);
      const a3 = 180 - (a1 + a2);
      return {
        question: `Two angles of a triangle are ${a1}° and ${a2}°. Find the measure of the third angle:`,
        options: generateOptions(`${a3}°`, () => `${a3 + pickRandom([-10, 10, -15, 15, 20])}°`),
        answer: `${a3}°`,
        hint: `The sum of all three interior angles of a triangle is always 180°!`,
        solution: `Angle Sum Property:\nAngle 1 + Angle 2 + Angle 3 = 180°\n${a1}° + ${a2}° + Angle 3 = 180°\nAngle 3 = 180° - (${a1 + a2})° = ${a3}°.`
      };
    } else {
      // Triangle classification by sides
      const triType = pickRandom(['equilateral', 'isosceles', 'scalene']);
      if (triType === 'equilateral') {
        const s = randInt(4, 12);
        return {
          question: `A triangle has side lengths ${s} cm, ${s} cm, and ${s} cm. What type of triangle is it?`,
          options: ['Equilateral Triangle', 'Isosceles Triangle', 'Scalene Triangle', 'Right-angled Triangle'],
          answer: 'Equilateral Triangle',
          hint: `If all three sides are equal in length, it is equilateral.`,
          solution: `All 3 sides have equal length (${s} cm), so it is an Equilateral Triangle.`
        };
      } else if (triType === 'isosceles') {
        const s = randInt(5, 12);
        const diff = randInt(2, 4);
        return {
          question: `A triangle has side lengths ${s} cm, ${s} cm, and ${s + diff} cm. What type of triangle is it?`,
          options: ['Isosceles Triangle', 'Equilateral Triangle', 'Scalene Triangle', 'Acute Triangle'],
          answer: 'Isosceles Triangle',
          hint: `If exactly two sides are of equal length, what do we call it?`,
          solution: `Exactly two sides are equal (${s} cm each), so it is an Isosceles Triangle.`
        };
      } else {
        const s1 = randInt(4, 7);
        const s2 = s1 + 1;
        const s3 = s1 + 2;
        return {
          question: `A triangle has sides ${s1} cm, ${s2} cm, and ${s3} cm (all different). It is a:`,
          options: ['Scalene Triangle', 'Equilateral Triangle', 'Isosceles Triangle', 'Equiangular Triangle'],
          answer: 'Scalene Triangle',
          hint: `A triangle with all three unequal sides is called a scalene triangle.`,
          solution: `All three sides have different lengths, so it is a Scalene Triangle.`
        };
      }
    }
  }

  // Stage 2: Perimeter of Regular & Irregular Polygons
  if (stageId === 2) {
    const polygon = pickRandom(['square', 'equilateral_triangle', 'regular_hexagon', 'rectangle']);
    if (polygon === 'square') {
      const side = randInt(4, 25);
      const perim = 4 * side;
      return {
        question: `Find the perimeter of a square chess board having side ${side} cm:`,
        options: generateOptions(`${perim} cm`, () => `${perim + pickRandom([-4, 4, -8, 8, side])} cm`),
        answer: `${perim} cm`,
        hint: `Perimeter of a square = 4 × side.`,
        solution: `Perimeter = 4 × side = 4 × ${side} cm = ${perim} cm.`
      };
    } else if (polygon === 'regular_hexagon') {
      const side = randInt(3, 15);
      const perim = 6 * side;
      return {
        question: `A regular hexagon has each side measuring ${side} cm. What is its total perimeter?`,
        options: generateOptions(`${perim} cm`, () => `${perim + pickRandom([-6, 6, -12, 12])} cm`),
        answer: `${perim} cm`,
        hint: `A regular hexagon has 6 equal sides. Perimeter = 6 × side.`,
        solution: `A regular hexagon has 6 equal sides.\nPerimeter = 6 × side = 6 × ${side} cm = ${perim} cm.`
      };
    } else {
      const l = randInt(8, 20);
      const b = randInt(4, l - 1);
      const perim = 2 * (l + b);
      return {
        question: `Find the perimeter of a rectangular playground with length ${l} m and breadth ${b} m:`,
        options: generateOptions(`${perim} m`, () => `${perim + pickRandom([-4, 4, -8, 8, 10])} m`),
        answer: `${perim} m`,
        hint: `Perimeter of rectangle = 2 × (Length + Breadth).`,
        solution: `Perimeter = 2 × (L + B) = 2 × (${l} + ${b}) = 2 × ${l + b} = ${perim} m.`
      };
    }
  }

  // Stage 3: Area of Rectangles and Squares (with visual grid representation)
  if (stageId === 3) {
    const isSquare = randInt(0, 1) === 1;
    if (isSquare) {
      const s = randInt(4, 15);
      const area = s * s;
      return {
        question: `What is the area of a square field of side ${s} metres?`,
        options: generateOptions(`${area} sq m`, () => `${area + pickRandom([-s, s, 2 * s, -10, 10])} sq m`),
        answer: `${area} sq m`,
        hint: `Area of a square = side × side.`,
        solution: `Area of square = side × side = ${s} × ${s} = ${area} sq m.`
      };
    } else {
      const l = randInt(6, 18);
      const b = randInt(3, l - 1);
      const area = l * b;
      return {
        question: `A classroom carpet has length ${l} m and width ${b} m. Calculate its area:`,
        options: generateOptions(`${area} sq m`, () => `${area + pickRandom([-l, l, -b, b, 12])} sq m`),
        answer: `${area} sq m`,
        hint: `Area of rectangle = Length × Breadth.`,
        solution: `Area = Length × Breadth = ${l} × ${b} = ${area} sq m.`
      };
    }
  }

  // Stage 4: Boss Battle — Fencing & Flooring Cost Calculations in ₹
  const battleType = pickRandom(['fencing', 'flooring']);
  if (battleType === 'fencing') {
    const l = randInt(15, 40);
    const b = randInt(10, l - 2);
    const perimeter = 2 * (l + b);
    const ratePerMetre = pickRandom([15, 20, 25, 30, 50]);
    const totalCost = perimeter * ratePerMetre;

    return {
      question: `${name} wants to fence a rectangular garden of length ${l} m and breadth ${b} m with barbed wire. If wire fencing costs ₹${ratePerMetre} per metre, find the total fencing cost:`,
      options: generateOptions(`₹${totalCost}`, () => `₹${totalCost + pickRandom([-ratePerMetre * 5, ratePerMetre * 5, -500, 500])}`),
      answer: `₹${totalCost}`,
      hint: `Step 1: Fencing goes around the boundary, so find the Perimeter first! Step 2: Multiply perimeter by cost per metre.`,
      solution: `Step 1: Perimeter = 2 × (${l} + ${b}) = 2 × ${l + b} = ${perimeter} m.\nStep 2: Total cost = Perimeter × Rate = ${perimeter} × ₹${ratePerMetre} = ₹${totalCost}.`
    };
  } else {
    // Flooring cost
    const l = randInt(5, 12);
    const b = randInt(4, l);
    const area = l * b;
    const ratePerSqM = pickRandom([50, 100, 120, 150]);
    const totalCost = area * ratePerSqM;

    return {
      question: `A hall measures ${l} m long and ${b} m wide. How much will it cost to tile the floor at ₹${ratePerSqM} per sq metre?`,
      options: generateOptions(`₹${totalCost}`, () => `₹${totalCost + pickRandom([-ratePerSqM * 2, ratePerSqM * 2, -1000, 1000])}`),
      answer: `₹${totalCost}`,
      hint: `Step 1: Flooring covers the inner surface, so find the Area first! Step 2: Multiply area by rate per sq m.`,
      solution: `Step 1: Area of hall = Length × Breadth = ${l} × ${b} = ${area} sq m.\nStep 2: Cost = Area × Rate = ${area} × ₹${ratePerSqM} = ₹${totalCost}.`
    };
  }
};

export const KITCHEN = {
  overnightOats: {
    preview: 'Stir the oats tonight. Fruit goes on in the morning.',
    locked: [
      'Use rolled oats, not instant.',
      'Mix oats with yogurt or milk, cover, and chill 8 hours.',
      'Berries and extra yogurt go on when you eat so they stay bright.',
    ],
  },
  shrimpTacos: {
    preview: 'Hot pan. Two minutes a side. Do not crowd the shrimp.',
    locked: [
      'Pat shrimp dry. Salt them.',
      'Warm the tortillas in a dry pan while the shrimp cook.',
      'Cabbage, salsa, and lime go on after the shrimp come off the heat.',
    ],
  },
  salmon: {
    preview: 'Oven at 425. Green beans first, then the fish.',
    locked: [
      'Toss the beans with the oil. Roast 8 to 10 minutes.',
      'Add the salmon. Roast 10 to 12 minutes more, until it flakes.',
      'Lemon on the plate at the end, not in the oven the whole time.',
    ],
  },
  lemonChicken: {
    preview: 'Oven at 425. Potato and chicken first. Broccoli later.',
    locked: [
      'Toss thighs and the cut potato with oil and lemon.',
      'Roast 15 minutes, then add the broccoli.',
      'Keep going until the chicken is 165 inside, about 12 more minutes.',
    ],
  },
  rotisserieBowl: {
    preview: 'Warm the quinoa. Do not recook the chicken.',
    locked: [
      'Heat quinoa with a splash of water.',
      'Pull the chicken into bite-size pieces.',
      'Cauli rice and salsa stay cold on the side.',
    ],
  },
}

const BY_NAME = {
  'Overnight oats': 'overnightOats',
  'Shrimp tacos': 'shrimpTacos',
  'Salmon and green beans': 'salmon',
  'Lemon chicken and potato': 'lemonChicken',
  'Rotisserie bowl': 'rotisserieBowl',
}

export function kitchenFor(meal) {
  if (!meal) return null
  return KITCHEN[meal.id] || KITCHEN[BY_NAME[meal.name]] || null
}

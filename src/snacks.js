function f(name, grams, protein, carbs, fat, aisle, extra = {}) {
  return { name, grams, protein, carbs, fat, aisle, ...extra }
}

export const SNACK_MEALS = {
  appleCottage: {
    id: 'appleCottage', name: 'Apple and cottage cheese', time: '3 min', slot: 'snack',
    foods: [
      f('Apple', 120, 0.4, 16, 0.2, 'Produce', { house: '1 small apple' }),
      f('Cottage cheese', 110, 12, 4, 2.5, 'Dairy', { house: '1/2 cup cottage cheese' }),
      f('Almond butter', 16, 3.5, 3, 9, 'Pantry', { house: '1 Tbsp almond butter' }),
    ],
  },
  grapesTurkey: {
    id: 'grapesTurkey', name: 'Grapes and turkey', time: '3 min', slot: 'snack',
    foods: [
      f('Grapes', 100, 0.7, 18, 0.2, 'Produce', { house: '20 grapes' }),
      f('Sliced turkey deli', 56, 10, 1, 1, 'Protein', { house: '2 oz turkey' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheese' }),
    ],
  },
  berriesCottage: {
    id: 'berriesCottage', name: 'Berries and cottage cheese', time: '3 min', slot: 'snack',
    foods: [
      f('Mixed berries', 100, 1, 12, 0.4, 'Produce', { house: '3/4 cup berries' }),
      f('Cottage cheese', 110, 12, 4, 2.5, 'Dairy', { house: '1/2 cup cottage cheese' }),
    ],
  },
  riceCake: {
    id: 'riceCake', name: 'Rice cake and turkey', time: '3 min', slot: 'snack',
    foods: [
      f('Rice cake', 9, 0.7, 7, 0.1, 'Pantry', { house: '1 rice cake' }),
      f('Sliced turkey deli', 56, 10, 1, 1, 'Protein', { house: '2 oz turkey' }),
      f('Almond butter', 16, 3.5, 3, 9, 'Pantry', { house: '1 Tbsp almond butter' }),
    ],
  },
  datesCheese: {
    id: 'datesCheese', name: 'Dates and cheese', time: '2 min', slot: 'snack',
    foods: [
      f('Dates', 24, 0.4, 18, 0, 'Produce', { house: '3 dates' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheese' }),
    ],
  },
  yogurtSnack: {
    id: 'yogurtSnack', name: 'Yogurt cup', time: '2 min', slot: 'snack',
    foods: [
      f('Plain Greek yogurt', 170, 17, 6, 0.8, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Mixed berries', 50, 0.5, 6, 0.2, 'Produce', { house: '1/2 cup berries' }),
    ],
  },
  stringApple: {
    id: 'stringApple', name: 'String cheese and apple', time: '2 min', slot: 'snack',
    foods: [
      f('String cheese', 28, 7, 0.8, 6.7, 'Dairy', { house: '1 string cheese' }),
      f('Apple', 150, 0.4, 21, 0.3, 'Produce', { house: '1 medium apple' }),
    ],
  },
  celeryAlmond: {
    id: 'celeryAlmond', name: 'Celery and almond butter', time: '3 min', slot: 'snack',
    foods: [
      f('Celery', 80, 0.6, 2.4, 0.2, 'Produce', { house: '2 celery sticks' }),
      f('Almond butter', 16, 3.5, 3, 9, 'Pantry', { house: '1 Tbsp almond butter' }),
    ],
  },
  shakeSnack: {
    id: 'shakeSnack', name: 'Fairlife shake', time: '1 min', slot: 'snack',
    foods: [
      f('Fairlife shake', 240, 19, 7, 2.9, 'Dairy', { house: '1 Fairlife shake' }),
    ],
  },
  chocolateYogurt: {
    id: 'chocolateYogurt', name: 'Yogurt and dark chocolate', time: '2 min', slot: 'snack',
    foods: [
      f('Plain Greek yogurt', 170, 17, 6, 0.8, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Dark chocolate', 20, 1.6, 9, 8.6, 'Pantry', { house: '2 squares chocolate' }),
    ],
  },
}

export const SNACKS = Object.keys(SNACK_MEALS)

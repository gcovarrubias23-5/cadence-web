function f(name, grams, protein, carbs, fat, aisle, extra = {}) {
  return { name, grams, protein, carbs, fat, aisle, ...extra }
}

export const SNACK_MEALS = {
  appleCottage: {
    id: 'appleCottage', name: 'Apple and cottage cheese', time: '3 min', slot: 'snack',
    steps: ['1 small apple.', '1/2 cup cottage cheese.', '1 Tbsp almond butter.'],
    foods: [
      f('Apple', 120, 0.4, 16, 0.2, 'Produce', { house: '1 small apple' }),
      f('Cottage cheese', 110, 12, 4, 2.5, 'Dairy', { house: '1/2 cup cottage cheese' }),
      f('Almond butter', 16, 3.5, 3, 9, 'Pantry', { house: '1 Tbsp almond butter' }),
    ],
  },
  grapesTurkey: {
    id: 'grapesTurkey', name: 'Grapes and turkey', time: '3 min', slot: 'snack',
    steps: ['20 grapes.', '2 oz turkey.', '1 oz cheese.'],
    foods: [
      f('Grapes', 100, 0.7, 18, 0.2, 'Produce', { house: '20 grapes' }),
      f('Sliced turkey deli', 56, 10, 1, 1, 'Protein', { house: '2 oz turkey' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheese' }),
    ],
  },
  berriesCottage: {
    id: 'berriesCottage', name: 'Berries and cottage cheese', time: '3 min', slot: 'snack',
    steps: ['3/4 cup berries.', '1/2 cup cottage cheese.'],
    foods: [
      f('Mixed berries', 100, 1, 12, 0.4, 'Produce', { house: '3/4 cup berries' }),
      f('Cottage cheese', 110, 12, 4, 2.5, 'Dairy', { house: '1/2 cup cottage cheese' }),
    ],
  },
  riceCake: {
    id: 'riceCake', name: 'Rice cake and turkey', time: '3 min', slot: 'snack',
    steps: ['1 rice cake.', '2 oz turkey.', '1 Tbsp almond butter.'],
    foods: [
      f('Rice cake', 9, 0.7, 7, 0.1, 'Pantry', { house: '1 rice cake' }),
      f('Sliced turkey deli', 56, 10, 1, 1, 'Protein', { house: '2 oz turkey' }),
      f('Almond butter', 16, 3.5, 3, 9, 'Pantry', { house: '1 Tbsp almond butter' }),
    ],
  },
  datesCheese: {
    id: 'datesCheese', name: 'Dates and cheese', time: '2 min', slot: 'snack',
    steps: ['3 dates.', '1 oz cheese.'],
    foods: [
      f('Dates', 24, 0.4, 18, 0, 'Produce', { house: '3 dates' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheese' }),
    ],
  },
  yogurtSnack: {
    id: 'yogurtSnack', name: 'Yogurt cup', time: '2 min', slot: 'snack',
    steps: ['3/4 cup Greek yogurt.', '1/2 cup berries.'],
    foods: [
      f('Plain Greek yogurt', 170, 17, 6, 0.8, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Mixed berries', 50, 0.5, 6, 0.2, 'Produce', { house: '1/2 cup berries' }),
    ],
  },
}

export const SNACKS = Object.keys(SNACK_MEALS)

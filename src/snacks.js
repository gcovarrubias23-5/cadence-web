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
      f('Sliced turkey deli', 56, 10, 1, 1, 'Protein', { house: '2 oz roasted turkey' }),
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
      f('Sliced turkey deli', 56, 10, 1, 1, 'Protein', { house: '2 oz roasted turkey' }),
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
    id: 'shakeSnack', name: 'Protein shake', time: '2 min', slot: 'snack',
    foods: [
      f('Protein powder', 30, 24, 3, 1.5, 'Pantry', { house: '1 scoop protein' }),
      f('Milk', 240, 8, 12, 5, 'Dairy', { house: '1 cup milk' }),
    ],
  },
  chocolateYogurt: {
    id: 'chocolateYogurt', name: 'Yogurt and dark chocolate', time: '2 min', slot: 'snack',
    foods: [
      f('Plain Greek yogurt', 170, 17, 6, 0.8, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Dark chocolate', 20, 1.6, 9, 8.6, 'Pantry', { house: '2 squares chocolate' }),
    ],
  },
  // Dairy-free snacks. Food names match the pantry so grocery amounts and
  // skip rules (egg, soy, fish, sesame, peanut) read them the same way.
  turkeyRollups: {
    id: 'turkeyRollups', name: 'Turkey and cucumber roll-ups', time: '4 min', slot: 'snack',
    foods: [
      f('Sliced turkey deli', 85, 15.3, 0.9, 1.5, 'Protein', { house: '4 turkey slices' }),
      f('Cucumber', 100, 0.7, 3.6, 0.1, 'Produce', { house: '1/2 cucumber, cut in spears' }),
      f('Avocado', 30, 0.6, 2.7, 4.5, 'Produce', { house: '1/5 avocado' }),
    ],
  },
  eggsOrange: {
    id: 'eggsOrange', name: 'Hard-boiled eggs and an orange', time: '2 min', slot: 'snack',
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 hard-boiled eggs' }),
      f('Orange', 130, 1.2, 15.6, 0.1, 'Produce', { house: '1 orange' }),
    ],
  },
  edamameSnack: {
    id: 'edamameSnack', name: 'Salted edamame', time: '4 min', slot: 'snack',
    foods: [
      f('Edamame', 155, 18.6, 14, 7.8, 'Protein', { house: '1 cup shelled edamame' }),
    ],
  },
  tunaRiceCakes: {
    id: 'tunaRiceCakes', name: 'Tuna on rice cakes', time: '3 min', slot: 'snack',
    foods: [
      f('Tuna pouch', 74, 15.5, 0, 0.7, 'Protein', { house: '1 tuna pouch' }),
      f('Rice cake', 18, 1.3, 14.4, 0.5, 'Pantry', { house: '2 rice cakes' }),
      f('Cucumber', 50, 0.4, 1.8, 0.1, 'Produce', { house: '4 cucumber slices' }),
    ],
  },
  chickenHummus: {
    id: 'chickenHummus', name: 'Chicken, hummus, and snap peas', time: '3 min', slot: 'snack',
    foods: [
      f('Cooked chicken breast', 85, 26.4, 0, 3.1, 'Protein', { house: '3 oz chicken' }),
      f('Hummus', 45, 3.6, 6.3, 4.5, 'Pantry', { house: '3 Tbsp hummus' }),
      f('Sugar snap peas', 60, 1.7, 4.2, 0.1, 'Produce', { house: '1 cup snap peas' }),
    ],
  },
  applePeanut: {
    id: 'applePeanut', name: 'Apple and peanut butter', time: '2 min', slot: 'snack',
    foods: [
      f('Apple', 150, 0.5, 21, 0.3, 'Produce', { house: '1 medium apple' }),
      f('Peanut butter', 32, 8, 6.4, 16, 'Pantry', { house: '2 Tbsp peanut butter' }),
    ],
  },
  turkeyEggs: {
    id: 'turkeyEggs', name: 'Turkey and hard-boiled eggs', time: '2 min', slot: 'snack',
    foods: [
      f('Sliced turkey deli', 56, 10, 0.6, 1, 'Protein', { house: '2 oz roasted turkey' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 hard-boiled eggs' }),
    ],
  },
}

export const SNACKS = Object.keys(SNACK_MEALS)

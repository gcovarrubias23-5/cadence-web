function f(name, grams, protein, carbs, fat, aisle, extra = {}) {
  return { name, grams, protein, carbs, fat, aisle, ...extra }
}

export const STYLE_MEALS = {
  ketoEggsAvocado: {
    id: 'ketoEggsAvocado', name: 'Eggs and avocado', time: '8 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Eggs', 150, 19, 1.5, 15, 'Protein', { house: '3 large eggs' }),
      f('Avocado', 70, 1.4, 6, 10, 'Produce', { house: '1/2 avocado' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoYogurtCucumber: {
    id: 'ketoYogurtCucumber', name: 'Yogurt and cucumber', time: '4 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Plain Greek yogurt', 200, 20, 7, 1, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Cucumber', 80, 0.5, 3, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoSalmonGreens: {
    id: 'ketoSalmonGreens', name: 'Salmon and broccoli', time: '25 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Salmon fillet', 170, 34, 0, 22, 'Protein', { house: '6 oz salmon' }),
      f('Broccoli, cooked', 156, 3.7, 11, 0.6, 'Produce', { house: '1 cup cooked broccoli' }),
      f('Olive oil', 10, 0, 0, 10, 'Pantry', { house: '2 tsp oil' }),
      f('Lemon', 15, 0.2, 1.5, 0.1, 'Produce', { house: '2 lemon wedges' }),
    ],
  },
  ketoSteakEggs: {
    id: 'ketoSteakEggs', name: 'Steak and eggs', time: '18 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Flank steak', 170, 36, 0, 13, 'Protein', { house: '6 oz steak' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  ketoBurgerBowl: {
    id: 'ketoBurgerBowl', name: 'Burger bowl', time: '15 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Ground turkey 93%', 170, 32, 0, 14, 'Protein', { house: '6 oz turkey' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheddar' }),
      f('Romaine', 60, 0.8, 2, 0.1, 'Produce', { house: '1 handful lettuce' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoShrimpCabbage: {
    id: 'ketoShrimpCabbage', name: 'Shrimp and cabbage', time: '12 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Shrimp', 140, 27, 1, 2, 'Protein', { house: 'about 10 shrimp' }),
      f('Cabbage slaw', 70, 1, 5, 0.1, 'Produce', { house: '1 cup cabbage' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '2 tsp oil' }),
      f('Lime', 20, 0.2, 2, 0.1, 'Produce', { house: '1 lime wedge' }),
    ],
  },
  ketoCheeseSnack: {
    id: 'ketoCheeseSnack', name: 'Cheese and turkey', time: '3 min', slot: 'snack', style: 'keto',
    foods: [
      f('Sliced turkey deli', 56, 10, 1, 1, 'Protein', { house: '2 oz turkey' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheese' }),
    ],
  },
  ketoEggSnack: {
    id: 'ketoEggSnack', name: 'Eggs and cheddar', time: '8 min', slot: 'snack', style: 'keto',
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheddar' }),
    ],
  },
  carnSteakEggs: {
    id: 'carnSteakEggs', name: 'Steak and eggs', time: '18 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Flank steak', 180, 38, 0, 14, 'Protein', { house: '6 oz steak' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 10, 0, 0, 11, 'Dairy', { house: '2 tsp butter' }),
    ],
  },
  carnSalmonButter: {
    id: 'carnSalmonButter', name: 'Salmon and butter', time: '20 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Salmon fillet', 170, 34, 0, 22, 'Protein', { house: '6 oz salmon' }),
      f('Butter', 10, 0, 0, 11, 'Dairy', { house: '2 tsp butter' }),
    ],
  },
  carnBeefEggs: {
    id: 'carnBeefEggs', name: 'Beef and eggs', time: '15 min', slot: 'lunch', style: 'carnivore',
    foods: [
      f('Lean ground beef', 170, 34, 0, 14, 'Protein', { house: '6 oz beef' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
    ],
  },
  carnChickenEggs: {
    id: 'carnChickenEggs', name: 'Chicken and eggs', time: '10 min', slot: 'lunch', style: 'carnivore',
    foods: [
      f('Rotisserie chicken', 140, 38, 0, 10, 'Protein', { house: '5 oz chicken' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
    ],
  },
  carnEggs: {
    id: 'carnEggs', name: 'Eggs and cheddar', time: '8 min', slot: 'breakfast', style: 'carnivore',
    foods: [
      f('Eggs', 150, 19, 1.5, 15, 'Protein', { house: '3 large eggs' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheddar' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnYogurt: {
    id: 'carnYogurt', name: 'Plain yogurt', time: '2 min', slot: 'breakfast', style: 'carnivore',
    foods: [
      f('Plain Greek yogurt', 220, 22, 8, 1, 'Dairy', { house: '1 cup yogurt' }),
    ],
  },
  carnTurkeyCheese: {
    id: 'carnTurkeyCheese', name: 'Turkey and cheese', time: '3 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('Sliced turkey deli', 56, 10, 1, 1, 'Protein', { house: '2 oz turkey' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheese' }),
    ],
  },
  carnEggSnack: {
    id: 'carnEggSnack', name: 'Two eggs', time: '6 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
    ],
  },
}

export const STYLE_BY_SLOT = {
  breakfast: ['ketoEggsAvocado', 'ketoYogurtCucumber', 'carnEggs', 'carnYogurt'],
  lunch: ['ketoBurgerBowl', 'ketoShrimpCabbage', 'carnBeefEggs', 'carnChickenEggs'],
  dinner: ['ketoSalmonGreens', 'ketoSteakEggs', 'carnSteakEggs', 'carnSalmonButter'],
  snack: ['ketoCheeseSnack', 'ketoEggSnack', 'carnTurkeyCheese', 'carnEggSnack'],
}

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
  ketoSmokedSalmon: {
    id: 'ketoSmokedSalmon', name: 'Smoked salmon and eggs', time: '10 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Smoked salmon', 85, 15, 0, 3.4, 'Protein', { house: '3 oz smoked salmon' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoCottageBowl: {
    id: 'ketoCottageBowl', name: 'Cottage and olives', time: '4 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Cottage cheese', 220, 24, 7, 5, 'Dairy', { house: '1 cup cottage cheese' }),
      f('Olives', 40, 0.3, 2, 4, 'Pantry', { house: '10 olives' }),
      f('Cucumber', 60, 0.4, 2, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
    ],
  },
  ketoHalloumiEggs: {
    id: 'ketoHalloumiEggs', name: 'Halloumi and eggs', time: '12 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Halloumi', 56, 12, 1, 14, 'Dairy', { house: '2 oz halloumi' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
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
  ketoPorkBroccoli: {
    id: 'ketoPorkBroccoli', name: 'Pork and broccoli', time: '25 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Pork tenderloin', 140, 36, 0, 5.6, 'Protein', { house: '5 oz pork' }),
      f('Broccoli, cooked', 156, 3.7, 11, 0.6, 'Produce', { house: '1 cup cooked broccoli' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '2 tsp oil' }),
    ],
  },
  ketoCodGreens: {
    id: 'ketoCodGreens', name: 'Cod and green beans', time: '22 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Cod', 170, 31, 0, 1.2, 'Protein', { house: '6 oz cod' }),
      f('Green beans, cooked', 125, 2.3, 9, 0.3, 'Produce', { house: '1 cup green beans' }),
      f('Olive oil', 10, 0, 0, 10, 'Pantry', { house: '2 tsp oil' }),
      f('Lemon', 15, 0.2, 1.5, 0.1, 'Produce', { house: '2 lemon wedges' }),
    ],
  },
  ketoChickenThigh: {
    id: 'ketoChickenThigh', name: 'Chicken thigh and greens', time: '30 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Chicken thigh', 180, 32, 0, 16, 'Protein', { house: '2 small thighs' }),
      f('Cauliflower, cooked', 124, 2.2, 6, 0.4, 'Produce', { house: '1 cup cauliflower' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '2 tsp oil' }),
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
  ketoTunaBowl: {
    id: 'ketoTunaBowl', name: 'Tuna and cucumber', time: '6 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Canned tuna', 113, 25, 0, 1, 'Protein', { house: '1 can tuna' }),
      f('Cucumber', 80, 0.5, 3, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '2 tsp oil' }),
      f('Lemon', 15, 0.2, 1.5, 0.1, 'Produce', { house: '2 lemon wedges' }),
    ],
  },
  ketoChickenSalad: {
    id: 'ketoChickenSalad', name: 'Chicken lettuce plate', time: '8 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Rotisserie chicken', 140, 38, 0, 10, 'Protein', { house: '5 oz chicken' }),
      f('Romaine', 80, 1, 2.6, 0.2, 'Produce', { house: '2 handfuls lettuce' }),
      f('Avocado', 50, 1, 4, 7, 'Produce', { house: '1/3 avocado' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoAhiPlate: {
    id: 'ketoAhiPlate', name: 'Ahi and greens', time: '12 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Ahi tuna', 140, 35, 0, 1.4, 'Protein', { house: '5 oz ahi' }),
      f('Cucumber', 80, 0.5, 3, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
      f('Avocado', 50, 1, 4, 7, 'Produce', { house: '1/3 avocado' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
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
  ketoOlivesCheese: {
    id: 'ketoOlivesCheese', name: 'Olives and cheese', time: '2 min', slot: 'snack', style: 'keto',
    foods: [
      f('Olives', 40, 0.3, 2, 4, 'Pantry', { house: '10 olives' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheese' }),
    ],
  },
  ketoSmokedSnack: {
    id: 'ketoSmokedSnack', name: 'Smoked salmon bites', time: '3 min', slot: 'snack', style: 'keto',
    foods: [
      f('Smoked salmon', 85, 15, 0, 3.4, 'Protein', { house: '3 oz smoked salmon' }),
      f('Cucumber', 50, 0.3, 2, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
    ],
  },
  ketoYogurtSnack: {
    id: 'ketoYogurtSnack', name: 'Yogurt and cucumber snack', time: '3 min', slot: 'snack', style: 'keto',
    foods: [
      f('Plain Greek yogurt', 170, 17, 6, 0.7, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Cucumber', 50, 0.3, 2, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
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
  carnPorkEggs: {
    id: 'carnPorkEggs', name: 'Pork and eggs', time: '18 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Pork tenderloin', 140, 36, 0, 5.6, 'Protein', { house: '5 oz pork' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnBeefButter: {
    id: 'carnBeefButter', name: 'Ground beef and butter', time: '15 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Lean ground beef', 180, 36, 0, 15, 'Protein', { house: '6 oz beef' }),
      f('Butter', 10, 0, 0, 11, 'Dairy', { house: '2 tsp butter' }),
    ],
  },
  carnCodButter: {
    id: 'carnCodButter', name: 'Cod and butter', time: '18 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Cod', 170, 31, 0, 1.2, 'Protein', { house: '6 oz cod' }),
      f('Butter', 14, 0, 0, 15, 'Dairy', { house: '1 Tbsp butter' }),
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
  carnTurkeyEggs: {
    id: 'carnTurkeyEggs', name: 'Turkey and eggs', time: '12 min', slot: 'lunch', style: 'carnivore',
    foods: [
      f('Ground turkey 93%', 170, 32, 0, 14, 'Protein', { house: '6 oz turkey' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
    ],
  },
  carnTunaEggs: {
    id: 'carnTunaEggs', name: 'Tuna and eggs', time: '8 min', slot: 'lunch', style: 'carnivore',
    foods: [
      f('Canned tuna', 113, 25, 0, 1, 'Protein', { house: '1 can tuna' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnShrimpButter: {
    id: 'carnShrimpButter', name: 'Shrimp and butter', time: '12 min', slot: 'lunch', style: 'carnivore',
    foods: [
      f('Shrimp', 140, 27, 1, 2, 'Protein', { house: 'about 10 shrimp' }),
      f('Butter', 10, 0, 0, 11, 'Dairy', { house: '2 tsp butter' }),
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
  carnSalmonEggs: {
    id: 'carnSalmonEggs', name: 'Smoked salmon and eggs', time: '10 min', slot: 'breakfast', style: 'carnivore',
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Smoked salmon', 85, 15, 0, 3.4, 'Protein', { house: '3 oz smoked salmon' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnCottage: {
    id: 'carnCottage', name: 'Cottage and eggs', time: '8 min', slot: 'breakfast', style: 'carnivore',
    foods: [
      f('Cottage cheese', 220, 24, 7, 5, 'Dairy', { house: '1 cup cottage cheese' }),
      f('Eggs', 50, 6.5, 0.5, 5, 'Protein', { house: '1 large egg' }),
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
  carnCheeseSnack: {
    id: 'carnCheeseSnack', name: 'Cheddar and eggs', time: '6 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('Eggs', 50, 6.5, 0.5, 5, 'Protein', { house: '1 large egg' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheese' }),
    ],
  },
  carnYogurtSnack: {
    id: 'carnYogurtSnack', name: 'Yogurt cup', time: '1 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('Plain Greek yogurt', 170, 17, 6, 0.7, 'Dairy', { house: '3/4 cup yogurt' }),
    ],
  },
  carnSalmonSnack: {
    id: 'carnSalmonSnack', name: 'Smoked salmon', time: '2 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('Smoked salmon', 85, 15, 0, 3.4, 'Protein', { house: '3 oz smoked salmon' }),
      f('Butter', 5, 0, 0, 5, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
}

export const STYLE_BY_SLOT = {
  breakfast: ['ketoEggsAvocado', 'ketoYogurtCucumber', 'ketoSmokedSalmon', 'ketoCottageBowl', 'ketoHalloumiEggs', 'carnEggs', 'carnYogurt', 'carnSalmonEggs', 'carnCottage'],
  lunch: ['ketoBurgerBowl', 'ketoShrimpCabbage', 'ketoTunaBowl', 'ketoChickenSalad', 'ketoAhiPlate', 'carnBeefEggs', 'carnChickenEggs', 'carnTurkeyEggs', 'carnTunaEggs', 'carnShrimpButter'],
  dinner: ['ketoSalmonGreens', 'ketoSteakEggs', 'ketoPorkBroccoli', 'ketoCodGreens', 'ketoChickenThigh', 'carnSteakEggs', 'carnSalmonButter', 'carnPorkEggs', 'carnBeefButter', 'carnCodButter'],
  snack: ['ketoCheeseSnack', 'ketoEggSnack', 'ketoOlivesCheese', 'ketoSmokedSnack', 'ketoYogurtSnack', 'carnTurkeyCheese', 'carnEggSnack', 'carnCheeseSnack', 'carnYogurtSnack', 'carnSalmonSnack'],
}

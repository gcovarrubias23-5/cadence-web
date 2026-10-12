function f(name, grams, protein, carbs, fat, aisle, extra = {}) {
  return { name, grams, protein, carbs, fat, aisle, ...extra }
}

export const MORE_MEALS = {
  ketoSausageEggs: {
    id: 'ketoSausageEggs', name: 'Sausage and eggs', time: '12 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Chicken sausage', 85, 14, 3, 7, 'Protein', { house: '1 chicken sausage' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
    ],
  },
  ketoFetaEggs: {
    id: 'ketoFetaEggs', name: 'Feta and eggs', time: '10 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Feta', 28, 4, 1, 6, 'Dairy', { house: '1 oz feta' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
    ],
  },
  ketoTurkeyBreakfast: {
    id: 'ketoTurkeyBreakfast', name: 'Turkey and eggs plate', time: '12 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Ground turkey 93%', 120, 23, 0, 10, 'Protein', { house: '4 oz turkey' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoSteakGreens: {
    id: 'ketoSteakGreens', name: 'Steak and broccoli', time: '20 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Flank steak', 140, 30, 0, 11, 'Protein', { house: '5 oz steak' }),
      f('Broccoli, cooked', 156, 3.7, 11, 0.6, 'Produce', { house: '1 cup broccoli' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '2 tsp oil' }),
    ],
  },
  ketoShrimpAvocado: {
    id: 'ketoShrimpAvocado', name: 'Shrimp and avocado', time: '12 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Shrimp', 140, 27, 1, 2, 'Protein', { house: 'about 10 shrimp' }),
      f('Avocado', 70, 1.4, 6, 10, 'Produce', { house: '1/2 avocado' }),
      f('Cucumber', 60, 0.4, 2, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
    ],
  },
  ketoPorkGreens: {
    id: 'ketoPorkGreens', name: 'Pork and green beans', time: '22 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Pork tenderloin', 140, 36, 0, 5.6, 'Protein', { house: '5 oz pork' }),
      f('Green beans, cooked', 125, 2.3, 9, 0.3, 'Produce', { house: '1 cup green beans' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '2 tsp oil' }),
    ],
  },
  ketoBisonCauli: {
    id: 'ketoBisonCauli', name: 'Bison and cauliflower', time: '22 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Bison', 140, 39, 0, 2.8, 'Protein', { house: '5 oz bison' }),
      f('Cauliflower, cooked', 124, 2.2, 6, 0.4, 'Produce', { house: '1 cup cauliflower' }),
      f('Olive oil', 10, 0, 0, 10, 'Pantry', { house: '2 tsp oil' }),
    ],
  },
  ketoAhiBroccoli: {
    id: 'ketoAhiBroccoli', name: 'Ahi and broccoli', time: '15 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Ahi tuna', 140, 35, 0, 1.4, 'Protein', { house: '5 oz ahi' }),
      f('Broccoli, cooked', 156, 3.7, 11, 0.6, 'Produce', { house: '1 cup broccoli' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '2 tsp oil' }),
    ],
  },
  ketoTurkeyCauli: {
    id: 'ketoTurkeyCauli', name: 'Turkey and cauliflower', time: '18 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Ground turkey 93%', 170, 32, 0, 14, 'Protein', { house: '6 oz turkey' }),
      f('Cauliflower, cooked', 124, 2.2, 6, 0.4, 'Produce', { house: '1 cup cauliflower' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoStringCheese: {
    id: 'ketoStringCheese', name: 'String cheese and turkey', time: '2 min', slot: 'snack', style: 'keto',
    foods: [
      f('String cheese', 28, 7, 0.8, 6.7, 'Dairy', { house: '1 string cheese' }),
      f('Sliced turkey deli', 56, 10, 1, 1, 'Protein', { house: '2 oz turkey' }),
    ],
  },
  ketoEggsOlives: {
    id: 'ketoEggsOlives', name: 'Eggs and olives', time: '8 min', slot: 'snack', style: 'keto',
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Olives', 40, 0.3, 2, 4, 'Pantry', { house: '10 olives' }),
    ],
  },
  carnBeefBreakfast: {
    id: 'carnBeefBreakfast', name: 'Beef and eggs breakfast', time: '14 min', slot: 'breakfast', style: 'carnivore',
    foods: [
      f('Lean ground beef', 120, 24, 0, 10, 'Protein', { house: '4 oz beef' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnChickenBreakfast: {
    id: 'carnChickenBreakfast', name: 'Chicken and eggs breakfast', time: '10 min', slot: 'breakfast', style: 'carnivore',
    foods: [
      f('Rotisserie chicken', 100, 27, 0, 7, 'Protein', { house: '4 oz chicken' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 5, 0, 0, 5, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnSteakBreakfast: {
    id: 'carnSteakBreakfast', name: 'Steak and eggs breakfast', time: '16 min', slot: 'breakfast', style: 'carnivore',
    foods: [
      f('Flank steak', 120, 25, 0, 9, 'Protein', { house: '4 oz steak' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnSalmonEggsLunch: {
    id: 'carnSalmonEggsLunch', name: 'Salmon and eggs', time: '14 min', slot: 'lunch', style: 'carnivore',
    foods: [
      f('Salmon fillet', 140, 28, 0, 18, 'Protein', { house: '5 oz salmon' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
    ],
  },
  carnSteakCheese: {
    id: 'carnSteakCheese', name: 'Steak and cheddar', time: '16 min', slot: 'lunch', style: 'carnivore',
    foods: [
      f('Flank steak', 140, 30, 0, 11, 'Protein', { house: '5 oz steak' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheddar' }),
      f('Butter', 5, 0, 0, 5, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnCodEggs: {
    id: 'carnCodEggs', name: 'Cod and eggs', time: '14 min', slot: 'lunch', style: 'carnivore',
    foods: [
      f('Cod', 140, 25, 0, 1, 'Protein', { house: '5 oz cod' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnShrimpEggs: {
    id: 'carnShrimpEggs', name: 'Shrimp and eggs', time: '14 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Shrimp', 140, 27, 1, 2, 'Protein', { house: 'about 10 shrimp' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnTurkeyButter: {
    id: 'carnTurkeyButter', name: 'Turkey and butter', time: '15 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Ground turkey 93%', 180, 34, 0, 15, 'Protein', { house: '6 oz turkey' }),
      f('Butter', 10, 0, 0, 11, 'Dairy', { house: '2 tsp butter' }),
    ],
  },
  carnChickenButter: {
    id: 'carnChickenButter', name: 'Chicken and butter', time: '10 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Rotisserie chicken', 180, 49, 0, 13, 'Protein', { house: '6 oz chicken' }),
      f('Butter', 10, 0, 0, 11, 'Dairy', { house: '2 tsp butter' }),
    ],
  },
  carnStringCheese: {
    id: 'carnStringCheese', name: 'String cheese', time: '1 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('String cheese', 28, 7, 0.8, 6.7, 'Dairy', { house: '1 string cheese' }),
      f('Sliced turkey deli', 28, 5, 0.5, 0.5, 'Protein', { house: '1 oz turkey' }),
    ],
  },
  carnCottageSnack: {
    id: 'carnCottageSnack', name: 'Cottage cheese cup', time: '1 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('Cottage cheese', 110, 12, 4, 2.5, 'Dairy', { house: '1/2 cup cottage cheese' }),
    ],
  },
  carnBeefCheese: {
    id: 'carnBeefCheese', name: 'Beef and cheddar', time: '12 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('Lean ground beef', 80, 16, 0, 7, 'Protein', { house: '3 oz beef' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheddar' }),
    ],
  },
}

export const MORE_BY_SLOT = {
  breakfast: ['ketoSausageEggs', 'ketoFetaEggs', 'ketoTurkeyBreakfast', 'carnBeefBreakfast', 'carnChickenBreakfast', 'carnSteakBreakfast'],
  lunch: ['ketoSteakGreens', 'ketoShrimpAvocado', 'ketoPorkGreens', 'carnSalmonEggsLunch', 'carnSteakCheese', 'carnCodEggs'],
  dinner: ['ketoBisonCauli', 'ketoAhiBroccoli', 'ketoTurkeyCauli', 'carnShrimpEggs', 'carnTurkeyButter', 'carnChickenButter'],
  snack: ['ketoStringCheese', 'ketoEggsOlives', 'carnStringCheese', 'carnCottageSnack', 'carnBeefCheese'],
}

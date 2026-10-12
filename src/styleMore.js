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
  ketoBaconEggs: {
    id: 'ketoBaconEggs', name: 'Bacon and eggs', time: '12 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Bacon', 40, 6, 0.5, 12, 'Protein', { house: '2 slices bacon' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
    ],
  },
  ketoCheddarOmelet: {
    id: 'ketoCheddarOmelet', name: 'Cheddar omelet', time: '10 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Eggs', 150, 19, 1.5, 15, 'Protein', { house: '3 large eggs' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheddar' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  ketoSmokedSalmonEggs: {
    id: 'ketoSmokedSalmonEggs', name: 'Smoked salmon eggs plate', time: '8 min', slot: 'breakfast', style: 'keto',
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Smoked salmon', 85, 15, 0, 3.4, 'Protein', { house: '3 oz smoked salmon' }),
      f('Avocado', 50, 1, 4, 7, 'Produce', { house: '1/3 avocado' }),
    ],
  },
  ketoChickenAvocado: {
    id: 'ketoChickenAvocado', name: 'Chicken and avocado', time: '8 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Rotisserie chicken', 140, 38, 0, 10, 'Protein', { house: '5 oz chicken' }),
      f('Avocado', 70, 1.4, 6, 10, 'Produce', { house: '1/2 avocado' }),
      f('Romaine', 60, 0.8, 2, 0.1, 'Produce', { house: '1 handful lettuce' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoTunaAvocado: {
    id: 'ketoTunaAvocado', name: 'Tuna and avocado', time: '6 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Canned tuna', 113, 25, 0, 1, 'Protein', { house: '1 can tuna' }),
      f('Avocado', 70, 1.4, 6, 10, 'Produce', { house: '1/2 avocado' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoLambGreens: {
    id: 'ketoLambGreens', name: 'Lamb and broccoli', time: '20 min', slot: 'lunch', style: 'keto',
    foods: [
      f('Ground lamb', 140, 28, 0, 16, 'Protein', { house: '5 oz lamb' }),
      f('Broccoli, cooked', 156, 3.7, 11, 0.6, 'Produce', { house: '1 cup broccoli' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoRibeyeAsparagus: {
    id: 'ketoRibeyeAsparagus', name: 'Ribeye and asparagus', time: '20 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Ribeye', 170, 32, 0, 20, 'Protein', { house: '6 oz ribeye' }),
      f('Asparagus, cooked', 90, 2.5, 4, 0.2, 'Produce', { house: '1 cup asparagus' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  ketoPorkChopsCauli: {
    id: 'ketoPorkChopsCauli', name: 'Pork chops and cauliflower', time: '22 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Pork chops', 170, 35, 0, 12, 'Protein', { house: '6 oz pork chops' }),
      f('Cauliflower, cooked', 124, 2.2, 6, 0.4, 'Produce', { house: '1 cup cauliflower' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '2 tsp oil' }),
    ],
  },
  ketoSalmonCauli: {
    id: 'ketoSalmonCauli', name: 'Salmon and cauliflower', time: '22 min', slot: 'dinner', style: 'keto',
    foods: [
      f('Salmon fillet', 170, 34, 0, 22, 'Protein', { house: '6 oz salmon' }),
      f('Cauliflower, cooked', 124, 2.2, 6, 0.4, 'Produce', { house: '1 cup cauliflower' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  ketoOlivesTurkey: {
    id: 'ketoOlivesTurkey', name: 'Olives and turkey', time: '2 min', slot: 'snack', style: 'keto',
    foods: [
      f('Olives', 40, 0.3, 2, 4, 'Pantry', { house: '10 olives' }),
      f('Sliced turkey deli', 56, 10, 1, 1, 'Protein', { house: '2 oz turkey' }),
    ],
  },
  ketoCheeseCucumber: {
    id: 'ketoCheeseCucumber', name: 'Cheese and cucumber', time: '3 min', slot: 'snack', style: 'keto',
    foods: [
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheddar' }),
      f('Cucumber', 60, 0.4, 2, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
    ],
  },
  carnBaconEggs: {
    id: 'carnBaconEggs', name: 'Bacon and eggs', time: '12 min', slot: 'breakfast', style: 'carnivore',
    foods: [
      f('Bacon', 40, 6, 0.5, 12, 'Protein', { house: '2 slices bacon' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 5, 0, 0, 5, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnPorkEggsBreakfast: {
    id: 'carnPorkEggsBreakfast', name: 'Pork and eggs breakfast', time: '14 min', slot: 'breakfast', style: 'carnivore',
    foods: [
      f('Pork tenderloin', 120, 30, 0, 5, 'Protein', { house: '4 oz pork' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnLambEggs: {
    id: 'carnLambEggs', name: 'Lamb and eggs', time: '14 min', slot: 'lunch', style: 'carnivore',
    foods: [
      f('Ground lamb', 140, 28, 0, 16, 'Protein', { house: '5 oz lamb' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 5, 0, 0, 5, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnRibeyeButter: {
    id: 'carnRibeyeButter', name: 'Ribeye and butter', time: '16 min', slot: 'lunch', style: 'carnivore',
    foods: [
      f('Ribeye', 140, 26, 0, 18, 'Protein', { house: '5 oz ribeye' }),
      f('Butter', 10, 0, 0, 11, 'Dairy', { house: '2 tsp butter' }),
    ],
  },
  carnChickenThighButter: {
    id: 'carnChickenThighButter', name: 'Chicken thigh and butter', time: '20 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Chicken thigh', 180, 32, 0, 16, 'Protein', { house: '2 small thighs' }),
      f('Butter', 10, 0, 0, 11, 'Dairy', { house: '2 tsp butter' }),
    ],
  },
  carnGroundBeefCheese: {
    id: 'carnGroundBeefCheese', name: 'Ground beef and cheddar', time: '15 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Lean ground beef', 170, 34, 0, 14, 'Protein', { house: '6 oz beef' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheddar' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnPorkButter: {
    id: 'carnPorkButter', name: 'Pork and butter', time: '18 min', slot: 'dinner', style: 'carnivore',
    foods: [
      f('Pork tenderloin', 170, 43, 0, 7, 'Protein', { house: '6 oz pork' }),
      f('Butter', 10, 0, 0, 11, 'Dairy', { house: '2 tsp butter' }),
    ],
  },
  carnBaconCheese: {
    id: 'carnBaconCheese', name: 'Bacon and cheddar', time: '8 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('Bacon', 30, 4.5, 0.4, 9, 'Protein', { house: '1.5 slices bacon' }),
      f('Cheddar', 28, 7, 0.3, 9, 'Dairy', { house: '1 oz cheddar' }),
    ],
  },
  carnEggButter: {
    id: 'carnEggButter', name: 'Eggs and butter', time: '6 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Butter', 7, 0, 0, 8, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
  carnCottageButter: {
    id: 'carnCottageButter', name: 'Cottage and butter', time: '1 min', slot: 'snack', style: 'carnivore',
    foods: [
      f('Cottage cheese', 110, 12, 4, 2.5, 'Dairy', { house: '1/2 cup cottage cheese' }),
      f('Butter', 5, 0, 0, 5, 'Dairy', { house: '1 tsp butter' }),
    ],
  },
}

export const MORE_BY_SLOT = {
  breakfast: ['ketoSausageEggs', 'ketoFetaEggs', 'ketoTurkeyBreakfast', 'ketoBaconEggs', 'ketoCheddarOmelet', 'ketoSmokedSalmonEggs', 'carnBeefBreakfast', 'carnChickenBreakfast', 'carnSteakBreakfast', 'carnBaconEggs', 'carnPorkEggsBreakfast'],
  lunch: ['ketoSteakGreens', 'ketoShrimpAvocado', 'ketoPorkGreens', 'ketoChickenAvocado', 'ketoTunaAvocado', 'ketoLambGreens', 'carnSalmonEggsLunch', 'carnSteakCheese', 'carnCodEggs', 'carnLambEggs', 'carnRibeyeButter'],
  dinner: ['ketoBisonCauli', 'ketoAhiBroccoli', 'ketoTurkeyCauli', 'ketoRibeyeAsparagus', 'ketoPorkChopsCauli', 'ketoSalmonCauli', 'carnShrimpEggs', 'carnTurkeyButter', 'carnChickenButter', 'carnChickenThighButter', 'carnGroundBeefCheese', 'carnPorkButter'],
  snack: ['ketoStringCheese', 'ketoEggsOlives', 'ketoOlivesTurkey', 'ketoCheeseCucumber', 'carnStringCheese', 'carnCottageSnack', 'carnBeefCheese', 'carnBaconCheese', 'carnEggButter', 'carnCottageButter'],
}

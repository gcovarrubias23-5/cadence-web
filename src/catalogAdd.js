function f(name, grams, protein, carbs, fat, aisle, extra = {}) {
  return { name, grams, protein, carbs, fat, aisle, ...extra }
}

export const ADD_MEALS = {
  smokedSalmonEggs: {
    id: 'smokedSalmonEggs', name: 'Smoked salmon and eggs', time: '10 min', slot: 'breakfast',
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Smoked salmon', 85, 15, 0, 3.4, 'Protein', { house: '3 oz smoked salmon' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
    ],
  },
  englishMuffinEgg: {
    id: 'englishMuffinEgg', name: 'Egg on an English muffin', time: '10 min', slot: 'breakfast',
    foods: [
      f('English muffin', 57, 4.5, 28, 1.1, 'Pantry', { house: '1 English muffin' }),
      f('Eggs', 50, 6.3, 0.4, 5, 'Protein', { house: '1 large egg' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheddar' }),
    ],
  },
  cottageBerryToast: {
    id: 'cottageBerryToast', name: 'Cottage toast and berries', time: '6 min', slot: 'breakfast',
    foods: [
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
      f('Cottage cheese', 110, 12, 4, 2.5, 'Dairy', { house: '1/2 cup cottage cheese' }),
      f('Mixed berries', 70, 0.7, 9, 0.3, 'Produce', { house: '1/2 cup berries' }),
    ],
  },
  fairlifeBanana: {
    id: 'fairlifeBanana', name: 'Fairlife and banana', time: '3 min', slot: 'breakfast',
    foods: [
      f('Fairlife shake', 240, 19, 7, 2.9, 'Dairy', { house: '1 Fairlife shake' }),
      f('Banana', 118, 1.3, 27, 0.4, 'Produce', { house: '1 banana' }),
    ],
  },
  porkRicePlate: {
    id: 'porkRicePlate', name: 'Pork and rice', time: '18 min', slot: 'lunch',
    foods: [
      f('Pork tenderloin', 140, 36, 0, 5.6, 'Protein', { house: '5 oz pork' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Green beans, cooked', 125, 2.3, 9, 0.3, 'Produce', { house: '1 cup green beans' }),
    ],
  },
  chickpeaChicken: {
    id: 'chickpeaChicken', name: 'Chicken and chickpea pasta', time: '20 min', slot: 'lunch',
    foods: [
      f('Cooked chicken breast', 140, 31, 0, 3, 'Protein', { house: '5 oz chicken' }),
      f('Chickpea pasta, cooked', 140, 18, 45, 4.9, 'Pantry', { house: '1 cup chickpea pasta' }),
      f('Marinara skip', 0, 0, 0, 0, 'Pantry', { house: '', pantry: true }),
      f('Broccoli, cooked', 156, 3.7, 11, 0.6, 'Produce', { house: '1 cup broccoli' }),
    ],
  },
  hummusPita: {
    id: 'hummusPita', name: 'Hummus pita plate', time: '8 min', slot: 'lunch',
    foods: [
      f('Pita', 60, 5.4, 33, 0.7, 'Pantry', { house: '1 pita' }),
      f('Hummus', 45, 3.6, 6, 4.5, 'Pantry', { house: '3 Tbsp hummus' }),
      f('Cucumber', 80, 0.5, 3, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
      f('Chickpeas', 80, 7, 22, 2, 'Pantry', { house: '1/2 cup chickpeas' }),
    ],
  },
  turkeyPita: {
    id: 'turkeyPita', name: 'Turkey pita', time: '8 min', slot: 'lunch',
    foods: [
      f('Pita', 60, 5.4, 33, 0.7, 'Pantry', { house: '1 pita' }),
      f('Sliced turkey deli', 85, 15, 1, 1.5, 'Protein', { house: '4 slices turkey' }),
      f('Romaine', 40, 0.5, 1.2, 0.1, 'Produce', { house: '1 handful lettuce' }),
      f('Apple', 150, 0.4, 21, 0.3, 'Produce', { house: '1 medium apple' }),
    ],
  },
  porkSweetPotato: {
    id: 'porkSweetPotato', name: 'Pork and sweet potato', time: '30 min', slot: 'dinner',
    foods: [
      f('Pork tenderloin', 140, 36, 0, 5.6, 'Protein', { house: '5 oz pork' }),
      f('Sweet potato, cooked', 200, 4, 40, 0.4, 'Produce', { house: '1 cup sweet potato' }),
      f('Asparagus', 100, 2.2, 3.9, 0.1, 'Produce', { house: '8 asparagus spears' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  codAsparagus: {
    id: 'codAsparagus', name: 'Cod and asparagus', time: '22 min', slot: 'dinner',
    foods: [
      f('Cod', 170, 31, 0, 1.2, 'Protein', { house: '6 oz cod' }),
      f('Asparagus', 100, 2.2, 3.9, 0.1, 'Produce', { house: '8 asparagus spears' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '2 tsp oil' }),
    ],
  },
  chickenCauliSkillet: {
    id: 'chickenCauliSkillet', name: 'Chicken cauliflower skillet', time: '20 min', slot: 'dinner',
    foods: [
      f('Ground chicken', 150, 34, 0, 12, 'Protein', { house: '5 oz ground chicken' }),
      f('Cauliflower rice, raw', 150, 2.9, 7.5, 0.5, 'Produce', { house: '1 1/2 cups cauli rice' }),
      f('Bell pepper, cooked', 135, 1.4, 8, 0.3, 'Produce', { house: '1 cup cooked pepper' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  halloumiVeg: {
    id: 'halloumiVeg', name: 'Halloumi and vegetables', time: '18 min', slot: 'dinner',
    foods: [
      f('Halloumi', 56, 12, 1, 14, 'Dairy', { house: '2 oz halloumi' }),
      f('Chickpeas', 80, 7, 22, 2, 'Pantry', { house: '1/2 cup chickpeas' }),
      f('Zucchini, raw', 100, 1.2, 3.1, 0.3, 'Produce', { house: '1 cup zucchini' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
}

export const ADD_BY_SLOT = {
  breakfast: ['smokedSalmonEggs', 'englishMuffinEgg', 'cottageBerryToast', 'fairlifeBanana'],
  lunch: ['porkRicePlate', 'chickpeaChicken', 'hummusPita', 'turkeyPita'],
  dinner: ['porkSweetPotato', 'codAsparagus', 'chickenCauliSkillet', 'halloumiVeg'],
}

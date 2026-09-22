function f(name, grams, protein, carbs, fat, aisle, extra = {}) {
  return { name, grams, protein, carbs, fat, aisle, ...extra }
}

export const EXTRA_MEALS = {
  overnightOats: {
    id: 'overnightOats', name: 'Overnight oats', time: '5 min night before', slot: 'breakfast',
    steps: ['Stir 1 cup overnight oats.', 'Top with 1/2 cup berries and 1/2 cup Greek yogurt.'],
    foods: [
      f('Overnight oats', 200, 10, 32, 6, 'Pantry', { house: '1 cup overnight oats' }),
      f('Mixed berries', 70, 0.7, 9, 0.3, 'Produce', { house: '1/2 cup berries' }),
      f('Plain Greek yogurt', 110, 11, 4, 0.4, 'Dairy', { house: '1/2 cup yogurt' }),
    ],
  },
  chiaBowl: {
    id: 'chiaBowl', name: 'Chia pudding bowl', time: '5 min night before', slot: 'breakfast',
    steps: ['Spoon 1 cup chia pudding.', 'Add kiwi and 1 Tbsp almond butter.'],
    foods: [
      f('Chia pudding', 200, 8, 24, 14, 'Pantry', { house: '1 cup chia pudding' }),
      f('Kiwi', 75, 0.8, 11, 0.4, 'Produce', { house: '1 kiwi' }),
      f('Almond butter', 16, 3.5, 3, 9, 'Pantry', { house: '1 Tbsp almond butter' }),
    ],
  },
  skyrMango: {
    id: 'skyrMango', name: 'Skyr and mango', time: '4 min', slot: 'breakfast',
    steps: ['1 cup skyr.', '1 cup frozen mango, thawed.', '2 Tbsp granola.'],
    foods: [
      f('Skyr', 170, 19, 7, 0.3, 'Dairy', { house: '1 cup skyr' }),
      f('Frozen mango', 165, 1.3, 25, 0.7, 'Produce', { house: '1 cup mango' }),
      f('Granola', 20, 2, 13, 3.3, 'Pantry', { house: '2 Tbsp granola' }),
    ],
  },
  proteinBagelEgg: {
    id: 'proteinBagelEgg', name: 'Protein bagel and eggs', time: '10 min', slot: 'breakfast',
    steps: ['Toast 1 protein bagel.', 'Scramble 2 eggs.', 'Add a handful of spinach.'],
    foods: [
      f('Protein bagel', 85, 15, 32, 1.7, 'Pantry', { house: '1 protein bagel' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
    ],
  },
  rotisserieBowl: {
    id: 'rotisserieBowl', name: 'Rotisserie bowl', time: '8 min', slot: 'lunch',
    steps: ['5 oz rotisserie chicken.', '1 cup quinoa.', '1 cup cauli rice and salsa.'],
    foods: [
      f('Rotisserie chicken', 140, 38, 0, 10, 'Protein', { house: '5 oz rotisserie chicken' }),
      f('Quinoa, cooked', 185, 8, 39, 3.5, 'Pantry', { house: '1 cup quinoa' }),
      f('Cauliflower rice, raw', 100, 1.9, 5, 0.3, 'Produce', { house: '1 cup cauli rice' }),
      f('Salsa', 40, 0.6, 3, 0.2, 'Pantry', { house: '3 Tbsp salsa' }),
    ],
  },
  whippedCottage: {
    id: 'whippedCottage', name: 'Whipped cottage bowl', time: '5 min', slot: 'lunch',
    steps: ['Blend 1 cup cottage cheese.', 'Top with peaches and 2 rice cakes.'],
    foods: [
      f('Whipped cottage cheese', 220, 24, 8, 5, 'Dairy', { house: '1 cup whipped cottage' }),
      f('Peach', 150, 1.4, 15, 0.5, 'Produce', { house: '1 peach' }),
      f('Rice cake', 18, 1.3, 14, 0.5, 'Pantry', { house: '2 rice cakes' }),
    ],
  },
  ahiBowl: {
    id: 'ahiBowl', name: 'Ahi bowl', time: '12 min', slot: 'lunch',
    steps: ['5 oz ahi.', '1 cup rice.', 'Edamame, cucumber, and 1 tsp oil.'],
    foods: [
      f('Ahi tuna', 140, 35, 0, 1.4, 'Protein', { house: '5 oz ahi' }),
      f('White rice, cooked', 158, 4, 44, 0.5, 'Pantry', { house: '1 cup white rice' }),
      f('Edamame', 80, 9.6, 7, 4, 'Protein', { house: '1/2 cup edamame' }),
      f('Cucumber', 80, 0.5, 3, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  edamameRice: {
    id: 'edamameRice', name: 'Edamame rice plate', time: '10 min', slot: 'lunch',
    steps: ['1 cup edamame.', '3/4 cup rice.', 'Hummus and snap peas.'],
    foods: [
      f('Edamame', 155, 19, 14, 8, 'Protein', { house: '1 cup edamame' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Hummus', 45, 3.6, 6, 4.5, 'Pantry', { house: '3 Tbsp hummus' }),
      f('Sugar snap peas', 60, 1.7, 4, 0.1, 'Produce', { house: '1 cup snap peas' }),
    ],
  },
  tofuQuinoa: {
    id: 'tofuQuinoa', name: 'Tofu and quinoa', time: '20 min', slot: 'dinner',
    steps: ['Crisp 5 oz tofu in 1 tsp oil.', 'Serve with 1 cup quinoa and cooked broccoli.'],
    foods: [
      f('Extra firm tofu', 140, 24, 4, 13, 'Protein', { house: '5 oz tofu' }),
      f('Quinoa, cooked', 185, 8, 39, 3.5, 'Pantry', { house: '1 cup quinoa' }),
      f('Broccoli, cooked', 156, 3.7, 11, 0.6, 'Produce', { house: '1 cup cooked broccoli' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  chickenSausageSheet: {
    id: 'chickenSausageSheet', name: 'Chicken sausage sheet pan', time: '25 min', slot: 'dinner',
    steps: ['Roast 2 chicken sausages with sweet potato and cooked peppers.'],
    foods: [
      f('Chicken sausage', 170, 27, 5, 14, 'Protein', { house: '2 chicken sausages' }),
      f('Sweet potato, cooked', 200, 4, 40, 0.4, 'Produce', { house: '1 cup sweet potato' }),
      f('Bell pepper, cooked', 135, 1.4, 8, 0.3, 'Produce', { house: '1 cup cooked pepper' }),
    ],
  },
  bisonFarro: {
    id: 'bisonFarro', name: 'Bison and farro', time: '25 min', slot: 'dinner',
    steps: ['Cook 5 oz bison.', '1 cup farro.', 'Side of cooked green beans.'],
    foods: [
      f('Bison', 140, 39, 0, 2.8, 'Protein', { house: '5 oz bison' }),
      f('Farro, cooked', 180, 7, 47, 1.4, 'Pantry', { house: '1 cup farro' }),
      f('Green beans, cooked', 125, 2.3, 9, 0.3, 'Produce', { house: '1 cup cooked green beans' }),
    ],
  },
}

export const EXTRA_BY_SLOT = {
  breakfast: ['overnightOats', 'chiaBowl', 'skyrMango', 'proteinBagelEgg'],
  lunch: ['rotisserieBowl', 'whippedCottage', 'ahiBowl', 'edamameRice'],
  dinner: ['tofuQuinoa', 'chickenSausageSheet', 'bisonFarro'],
}

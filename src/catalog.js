function f(name, grams, protein, carbs, fat, aisle, extra = {}) {
  return { name, grams, protein, carbs, fat, aisle, ...extra }
}

export const MEALS = {
  yogurtGrapes: {
    id: 'yogurtGrapes',
    name: 'Greek yogurt bowl',
    time: '5 min',
    slot: 'breakfast',
    steps: ['Spoon yogurt. Add 15 grapes and granola.'],
    foods: [
      f('Plain Greek yogurt', 200, 20, 7, 1, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Grapes', 80, 0.6, 14, 0.2, 'Produce', { house: '15 grapes' }),
      f('Granola', 30, 3, 19, 5, 'Pantry', { house: '3 Tbsp granola' }),
    ],
  },
  yogurtBanana: {
    id: 'yogurtBanana',
    name: 'Yogurt + banana',
    time: '5 min',
    slot: 'breakfast',
    steps: ['Yogurt, half banana, 2 Tbsp granola.'],
    foods: [
      f('Plain Greek yogurt', 200, 20, 7, 1, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Banana', 60, 0.7, 14, 0.2, 'Produce', { house: '1/2 banana' }),
      f('Granola', 20, 2, 13, 3.3, 'Pantry', { house: '2 Tbsp granola' }),
    ],
  },
  eggToast: {
    id: 'eggToast',
    name: 'Egg scramble + toast',
    time: '12 min',
    slot: 'breakfast',
    steps: ['2 eggs, handful of spinach, 1 slice cheese, 1 toast.'],
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
    ],
  },
  pancakes: {
    id: 'pancakes',
    name: 'Pancakes + egg',
    time: '20 min',
    slot: 'breakfast',
    steps: ['2 small pancakes, 1 fried egg, 8 strawberries.'],
    foods: [
      f('Pancake mix', 60, 4.5, 39, 2.2, 'Pantry', { house: '2 small pancakes' }),
      f('Eggs', 50, 6.3, 0.4, 5, 'Protein', { house: '1 large egg' }),
      f('Strawberries', 80, 0.5, 6, 0.2, 'Produce', { house: '8 strawberries' }),
    ],
  },
  turkeySandwich: {
    id: 'turkeySandwich',
    name: 'Turkey sandwich + fruit',
    time: '8 min',
    slot: 'lunch',
    steps: ['Turkey and cheddar on 2 slices. Apple and carrots.'],
    foods: [
      f('Sourdough', 60, 5, 28, 1.2, 'Pantry', { house: '2 slices bread' }),
      f('Sliced turkey deli', 85, 15, 1, 1.5, 'Protein', { house: '4 slices turkey' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
      f('Apple', 150, 0.4, 21, 0.3, 'Produce', { house: '1 medium apple' }),
      f('Carrots', 60, 0.6, 6, 0.2, 'Produce', { house: '8 baby carrots' }),
    ],
  },
  leftoverChicken: {
    id: 'leftoverChicken',
    name: 'Leftover lemon chicken',
    time: '5 min',
    slot: 'lunch',
    steps: ['Reheat extra thigh. Rice and broccoli.'],
    foods: [
      f('Chicken thigh', 140, 25, 0, 13, 'Protein', { leftover: true, house: '1 leftover thigh' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Broccoli', 80, 2.1, 5, 0.3, 'Produce', { house: '1 cup broccoli' }),
    ],
  },
  leftoverTaco: {
    id: 'leftoverTaco',
    name: 'Taco bowl leftover',
    time: '5 min',
    slot: 'lunch',
    steps: ['Reheat extra turkey bowl. 2 slices avocado.'],
    foods: [
      f('Ground turkey 93%', 100, 19, 0, 8, 'Protein', { leftover: true, house: 'leftover turkey' }),
      f('Brown rice, cooked', 120, 2.4, 26, 0.4, 'Pantry', { leftover: true, house: '1/2 cup leftover rice' }),
      f('Black beans', 60, 4.5, 10.5, 0.3, 'Pantry', { leftover: true, house: '1/4 cup leftover beans' }),
      f('Avocado', 30, 0.6, 2.4, 4.2, 'Produce', { house: '2 slices avocado' }),
    ],
  },
  leftoverSalmon: {
    id: 'leftoverSalmon',
    name: 'Salmon rice box',
    time: '5 min',
    slot: 'lunch',
    steps: ['Flake leftover salmon over rice and beans.'],
    foods: [
      f('Salmon fillet', 85, 17, 0, 11, 'Protein', { leftover: true, house: '1/2 leftover fillet' }),
      f('Brown rice, cooked', 120, 2.4, 26, 0.4, 'Pantry', { leftover: true, house: '1/2 cup leftover rice' }),
      f('Black beans', 80, 6, 14, 0.4, 'Pantry', { house: '1/3 cup beans' }),
    ],
  },
  leftoverSteak: {
    id: 'leftoverSteak',
    name: 'Steak taco leftover',
    time: '8 min',
    slot: 'lunch',
    steps: ['Warm leftover steak. 2 tortillas, avocado, salsa.'],
    foods: [
      f('Flank steak', 90, 19, 0, 7, 'Protein', { leftover: true, house: 'leftover steak' }),
      f('Corn tortillas', 46, 2.6, 20, 1.3, 'Pantry', { house: '2 small tortillas' }),
      f('Avocado', 30, 0.6, 2.4, 4.2, 'Produce', { house: '2 slices avocado' }),
      f('Salsa', 30, 0.4, 2.2, 0.1, 'Pantry', { house: '2 Tbsp salsa' }),
    ],
  },
  eggLunch: {
    id: 'eggLunch',
    name: 'Egg toast + fruit',
    time: '10 min',
    slot: 'lunch',
    steps: ['Toast, egg, cheese, apple.'],
    foods: [
      f('Eggs', 50, 6.3, 0.4, 5, 'Protein', { house: '1 large egg' }),
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
      f('Apple', 150, 0.4, 21, 0.3, 'Produce', { house: '1 medium apple' }),
    ],
  },
  lemonChicken: {
    id: 'lemonChicken',
    name: 'Sheet-pan lemon chicken',
    time: '35 min',
    slot: 'dinner',
    steps: ['425 F. Roast 3 thighs, potato, broccoli. Eat 2. Box 1 for later.'],
    foods: [
      f('Chicken thigh', 180, 32, 0, 16, 'Protein', { house: '2 small chicken thighs' }),
      f('Chicken thigh', 140, 25, 0, 13, 'Protein', { prep: true, house: '1 extra thigh' }),
      f('Potatoes', 180, 3.5, 32, 0.2, 'Produce', { house: '1 medium potato' }),
      f('Broccoli', 150, 4, 9, 0.5, 'Produce', { house: '2 cups broccoli' }),
      f('Olive oil', 10, 0, 0, 10, 'Pantry', { pantry: true, house: '2 tsp oil' }),
      f('Lemon', 30, 0.3, 3, 0.1, 'Produce', { house: '1/2 lemon' }),
    ],
  },
  tacoBowl: {
    id: 'tacoBowl',
    name: 'Turkey taco bowl',
    time: '25 min',
    slot: 'dinner',
    steps: ['Brown turkey. Rice, beans, slaw, salsa, avocado. Box extra.'],
    foods: [
      f('Ground turkey 93%', 150, 28, 0, 12, 'Protein', { house: '5 oz turkey' }),
      f('Ground turkey 93%', 100, 19, 0, 8, 'Protein', { prep: true, house: 'extra turkey' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Black beans', 80, 6, 14, 0.4, 'Pantry', { house: '1/3 cup beans' }),
      f('Cabbage slaw', 70, 1, 5, 0.1, 'Produce', { house: '1 cup cabbage' }),
      f('Salsa', 40, 0.6, 3, 0.2, 'Pantry', { house: '3 Tbsp salsa' }),
      f('Avocado', 50, 1, 4, 7, 'Produce', { house: '1/3 avocado' }),
    ],
  },
  salmon: {
    id: 'salmon',
    name: 'Sheet-pan salmon',
    time: '22 min',
    slot: 'dinner',
    steps: ['Roast green beans, then salmon. Save half a fillet.'],
    foods: [
      f('Salmon fillet', 170, 34, 0, 22, 'Protein', { house: '1 palm-size fillet' }),
      f('Salmon fillet', 85, 17, 0, 11, 'Protein', { prep: true, house: '1/2 fillet extra' }),
      f('Green beans', 150, 2.7, 10, 0.3, 'Produce', { house: '2 handfuls green beans' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Lemon', 20, 0.2, 2, 0.1, 'Produce', { house: '2 lemon wedges' }),
    ],
  },
  bolognese: {
    id: 'bolognese',
    name: 'Turkey Bolognese',
    time: '35 min',
    slot: 'dinner',
    steps: ['Brown turkey with onion and garlic. Tomatoes 20 min. Pasta tonight. Save sauce.'],
    foods: [
      f('Ground turkey 93%', 150, 28, 0, 12, 'Protein', { house: '5 oz turkey' }),
      f('Ground turkey 93%', 90, 17, 0, 7, 'Protein', { prep: true, house: 'extra sauce' }),
      f('Crushed tomatoes', 200, 3, 14, 0.4, 'Pantry', { house: '3/4 cup tomatoes' }),
      f('Onion', 60, 0.7, 6, 0.1, 'Produce', { house: '1/2 small onion' }),
      f('Dry pasta', 75, 10, 56, 1.2, 'Pantry', { house: '1 heaping cup dry pasta' }),
      f('Parmesan', 15, 5, 0.4, 4, 'Dairy', { house: '2 Tbsp parmesan' }),
      f('Romaine', 80, 1, 2.5, 0.2, 'Produce', { house: '2 handfuls lettuce' }),
    ],
  },
  pastaNight: {
    id: 'pastaNight',
    name: 'Pasta night',
    time: '15 min',
    slot: 'dinner',
    steps: ['Boil pasta. Leftover sauce. Salad.'],
    foods: [
      f('Ground turkey 93%', 90, 17, 0, 7, 'Protein', { leftover: true, house: '1 ladle leftover sauce' }),
      f('Crushed tomatoes', 120, 1.8, 8.4, 0.2, 'Pantry', { leftover: true, house: '1/2 cup leftover sauce' }),
      f('Dry pasta', 75, 10, 56, 1.2, 'Pantry', { house: '1 heaping cup dry pasta' }),
      f('Romaine', 80, 1, 2.5, 0.2, 'Produce', { house: '2 handfuls lettuce' }),
    ],
  },
  steakTacos: {
    id: 'steakTacos',
    name: 'Steak tacos',
    time: '25 min',
    slot: 'dinner',
    steps: ['Cook steak. Eat most tonight. Box some. 3 tortillas, slaw, salsa.'],
    foods: [
      f('Flank steak', 180, 38, 0, 14, 'Protein', { house: '1 palm of steak' }),
      f('Flank steak', 90, 19, 0, 7, 'Protein', { prep: true, house: 'extra steak' }),
      f('Corn tortillas', 70, 4, 30, 2, 'Pantry', { house: '3 small tortillas' }),
      f('Cabbage slaw', 70, 1, 5, 0.1, 'Produce', { house: '1 cup cabbage' }),
      f('Salsa', 40, 0.6, 3, 0.2, 'Pantry', { house: '3 Tbsp salsa' }),
      f('Avocado', 50, 1, 4, 7, 'Produce', { house: '1/3 avocado' }),
    ],
  },
  chili: {
    id: 'chili',
    name: 'Turkey chili',
    time: '40 min',
    slot: 'dinner',
    steps: ['Brown turkey and onion. Beans, tomatoes, broth 25 min. Cheese on top.'],
    foods: [
      f('Ground turkey 93%', 150, 28, 0, 12, 'Protein', { house: '5 oz turkey' }),
      f('Black beans', 120, 9, 21, 0.6, 'Pantry', { house: '1/2 cup beans' }),
      f('Crushed tomatoes', 200, 3, 14, 0.4, 'Pantry', { house: '3/4 cup tomatoes' }),
      f('Onion', 60, 0.7, 6, 0.1, 'Produce', { house: '1/2 small onion' }),
      f('Chicken broth', 120, 1, 1, 0.2, 'Pantry', { house: '1/2 cup broth' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheddar, shredded' }),
    ],
  },
}

export const BREAKFASTS = ['yogurtGrapes', 'yogurtBanana', 'eggToast', 'pancakes']
export const LUNCHES = ['turkeySandwich', 'leftoverChicken', 'leftoverTaco', 'leftoverSalmon', 'leftoverSteak', 'eggLunch']
export const DINNERS = ['lemonChicken', 'tacoBowl', 'salmon', 'bolognese', 'pastaNight', 'steakTacos', 'chili']

export const DEFAULT_WEEK = [
  { id: 'mon', day: 'Monday', breakfast: 'yogurtGrapes', lunch: 'turkeySandwich', dinner: 'lemonChicken' },
  { id: 'tue', day: 'Tuesday', breakfast: 'eggToast', lunch: 'leftoverChicken', dinner: 'tacoBowl' },
  { id: 'wed', day: 'Wednesday', breakfast: 'yogurtGrapes', lunch: 'leftoverTaco', dinner: 'salmon' },
  { id: 'thu', day: 'Thursday', breakfast: 'eggToast', lunch: 'leftoverSalmon', dinner: 'bolognese' },
  { id: 'fri', day: 'Friday', breakfast: 'yogurtBanana', lunch: 'eggLunch', dinner: 'pastaNight' },
  { id: 'sat', day: 'Saturday', breakfast: 'pancakes', lunch: 'eggLunch', dinner: 'steakTacos' },
  { id: 'sun', day: 'Sunday', breakfast: 'eggToast', lunch: 'leftoverSteak', dinner: 'chili' },
]

export const WEEK_LABEL = 'This week'

export function mealOf(id) {
  return MEALS[id]
}

export function optionsFor(slot) {
  if (slot === 'breakfast') return BREAKFASTS.map((id) => MEALS[id])
  if (slot === 'lunch') return LUNCHES.map((id) => MEALS[id])
  return DINNERS.map((id) => MEALS[id])
}

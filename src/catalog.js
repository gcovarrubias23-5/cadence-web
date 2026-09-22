function f(name, grams, protein, carbs, fat, aisle, extra = {}) {
  return { name, grams, protein, carbs, fat, aisle, ...extra }
}

export const MEALS = {
  yogurtGrapes: {
    id: 'yogurtGrapes', name: 'Yogurt bowl with grapes', time: '5 min', slot: 'breakfast',
    steps: ['Put 3/4 cup Greek yogurt in a bowl.', 'Add 15 grapes and 3 Tbsp granola.'],
    foods: [
      f('Plain Greek yogurt', 200, 20, 7, 1, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Grapes', 80, 0.6, 14, 0.2, 'Produce', { house: '15 grapes' }),
      f('Granola', 30, 3, 19, 5, 'Pantry', { house: '3 Tbsp granola' }),
    ],
  },
  yogurtBanana: {
    id: 'yogurtBanana', name: 'Yogurt bowl with banana', time: '5 min', slot: 'breakfast',
    steps: ['3/4 cup yogurt.', 'Slice 1/2 banana on top. Add 2 Tbsp granola.'],
    foods: [
      f('Plain Greek yogurt', 200, 20, 7, 1, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Banana', 60, 0.7, 14, 0.2, 'Produce', { house: '1/2 banana' }),
      f('Granola', 20, 2, 13, 3.3, 'Pantry', { house: '2 Tbsp granola' }),
    ],
  },
  yogurtBerries: {
    id: 'yogurtBerries', name: 'Yogurt bowl with berries', time: '5 min', slot: 'breakfast',
    steps: ['3/4 cup yogurt.', 'Add 1/2 cup berries and 2 Tbsp granola.'],
    foods: [
      f('Plain Greek yogurt', 200, 20, 7, 1, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Mixed berries', 70, 0.7, 9, 0.3, 'Produce', { house: '1/2 cup berries' }),
      f('Granola', 20, 2, 13, 3.3, 'Pantry', { house: '2 Tbsp granola' }),
    ],
  },
  eggToast: {
    id: 'eggToast', name: 'Eggs and toast', time: '12 min', slot: 'breakfast',
    steps: ['Scramble 2 eggs with a handful of spinach.', 'Melt in 1 slice of cheese.', 'Toast 1 slice of bread.'],
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
    ],
  },
  eggAvocado: {
    id: 'eggAvocado', name: 'Eggs and avocado toast', time: '12 min', slot: 'breakfast',
    steps: ['Toast 1 slice of bread.', 'Mash 1/4 avocado on it.', 'Fry 2 eggs and set on top.'],
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
      f('Avocado', 40, 0.8, 3, 6, 'Produce', { house: '1/4 avocado' }),
    ],
  },
  oatmeal: {
    id: 'oatmeal', name: 'Oatmeal and eggs', time: '10 min', slot: 'breakfast',
    steps: ['Cook 1/2 cup dry oats with water.', 'Stir in 1/2 banana.', 'Fry 2 eggs on the side.'],
    foods: [
      f('Dry oats', 40, 5, 27, 3, 'Pantry', { house: '1/2 cup dry oats' }),
      f('Banana', 60, 0.7, 14, 0.2, 'Produce', { house: '1/2 banana' }),
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
    ],
  },
  proteinShake: {
    id: 'proteinShake', name: 'Shake and toast', time: '5 min', slot: 'breakfast',
    steps: ['Blend 1 scoop protein, 1 cup milk, 1/2 banana.', 'Toast 1 slice of bread with 1 tsp peanut butter.'],
    foods: [
      f('Protein powder', 30, 24, 3, 1.5, 'Pantry', { house: '1 scoop protein' }),
      f('Milk', 240, 8, 12, 5, 'Dairy', { house: '1 cup milk' }),
      f('Banana', 60, 0.7, 14, 0.2, 'Produce', { house: '1/2 banana' }),
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
      f('Peanut butter', 16, 4, 3, 8, 'Pantry', { house: '1 tsp peanut butter' }),
    ],
  },
  pancakes: {
    id: 'pancakes', name: 'Pancakes and eggs', time: '20 min', slot: 'breakfast',
    steps: ['Cook 2 small pancakes.', 'Fry 1 egg.', 'Put 8 strawberries on the side.'],
    foods: [
      f('Pancake mix', 60, 4.5, 39, 2.2, 'Pantry', { house: '2 small pancakes' }),
      f('Eggs', 50, 6.3, 0.4, 5, 'Protein', { house: '1 large egg' }),
      f('Strawberries', 80, 0.5, 6, 0.2, 'Produce', { house: '8 strawberries' }),
    ],
  },
  turkeySandwich: {
    id: 'turkeySandwich', name: 'Turkey sandwich', time: '8 min', slot: 'lunch',
    steps: ['Use 2 slices of bread.', 'Stack 4 slices turkey and 1 slice cheese.', 'Eat with 1 apple and 8 baby carrots.'],
    foods: [
      f('Sourdough', 60, 5, 28, 1.2, 'Pantry', { house: '2 slices bread' }),
      f('Sliced turkey deli', 85, 15, 1, 1.5, 'Protein', { house: '4 slices turkey' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
      f('Apple', 150, 0.4, 21, 0.3, 'Produce', { house: '1 medium apple' }),
      f('Carrots', 60, 0.6, 6, 0.2, 'Produce', { house: '8 baby carrots' }),
    ],
  },
  chickenSalad: {
    id: 'chickenSalad', name: 'Chicken salad plate', time: '12 min', slot: 'lunch',
    steps: ['Use 5 oz cooked chicken.', 'Bowl: 2 handfuls lettuce, 1/2 cup tomatoes, 1/2 cup rice.', 'Drizzle 2 tsp oil.'],
    foods: [
      f('Cooked chicken breast', 140, 31, 0, 3, 'Protein', { house: '1 palm of chicken' }),
      f('Romaine', 80, 1, 2.5, 0.2, 'Produce', { house: '2 handfuls lettuce' }),
      f('Tomato', 80, 0.7, 4, 0.2, 'Produce', { house: '1/2 cup chopped tomato' }),
      f('Brown rice, cooked', 100, 2, 22, 0.4, 'Pantry', { house: '1/2 cup cooked rice' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '2 tsp oil' }),
    ],
  },
  tunaWrap: {
    id: 'tunaWrap', name: 'Tuna wrap', time: '8 min', slot: 'lunch',
    steps: ['Mix 1 can tuna with 1 Tbsp yogurt.', 'Spoon into 1 large tortilla with lettuce.', 'Eat with 1 apple.'],
    foods: [
      f('Canned tuna', 113, 25, 0, 1, 'Protein', { house: '1 can tuna, drained' }),
      f('Plain Greek yogurt', 20, 2, 0.7, 0.1, 'Dairy', { house: '1 Tbsp yogurt' }),
      f('Flour tortilla', 50, 4, 24, 3, 'Pantry', { house: '1 large tortilla' }),
      f('Romaine', 40, 0.5, 1.2, 0.1, 'Produce', { house: '1 handful lettuce' }),
      f('Apple', 150, 0.4, 21, 0.3, 'Produce', { house: '1 medium apple' }),
    ],
  },
  burritoBowl: {
    id: 'burritoBowl', name: 'Chicken burrito bowl', time: '15 min', slot: 'lunch',
    steps: ['Warm 5 oz chicken.', 'Bowl: 3/4 cup rice, 1/3 cup beans, salsa, 1/4 avocado.'],
    foods: [
      f('Cooked chicken breast', 140, 31, 0, 3, 'Protein', { house: '1 palm of chicken' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Black beans', 80, 6, 14, 0.4, 'Pantry', { house: '1/3 cup beans' }),
      f('Salsa', 40, 0.6, 3, 0.2, 'Pantry', { house: '3 Tbsp salsa' }),
      f('Avocado', 40, 0.8, 3, 6, 'Produce', { house: '1/4 avocado' }),
    ],
  },
  eggLunch: {
    id: 'eggLunch', name: 'Egg toast and fruit', time: '10 min', slot: 'lunch',
    steps: ['Toast 1 slice of bread.', 'Fry 2 eggs. Add 1 slice of cheese.', 'Eat with 1 apple.'],
    foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
      f('Apple', 150, 0.4, 21, 0.3, 'Produce', { house: '1 medium apple' }),
    ],
  },
  greekPlate: {
    id: 'greekPlate', name: 'Greek plate', time: '10 min', slot: 'lunch',
    steps: ['5 oz chicken, 1/2 cup cucumber, 8 cherry tomatoes, 1 oz feta.', '2 Tbsp hummus on the side.'],
    foods: [
      f('Cooked chicken breast', 140, 31, 0, 3, 'Protein', { house: '1 palm of chicken' }),
      f('Cucumber', 80, 0.5, 3, 0.1, 'Produce', { house: '1/2 cup cucumber' }),
      f('Cherry tomatoes', 80, 0.7, 4, 0.2, 'Produce', { house: '8 cherry tomatoes' }),
      f('Feta', 28, 4, 1, 6, 'Dairy', { house: '1 oz feta' }),
      f('Hummus', 30, 2, 4, 2.5, 'Pantry', { house: '2 Tbsp hummus' }),
    ],
  },
  soupSandwich: {
    id: 'soupSandwich', name: 'Soup and half sandwich', time: '10 min', slot: 'lunch',
    steps: ['Heat 1 cup chicken soup.', 'Half sandwich: 1 slice bread, 3 slices turkey, 1 slice cheese.'],
    foods: [
      f('Chicken soup', 240, 8, 14, 4, 'Pantry', { house: '1 cup soup' }),
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
      f('Sliced turkey deli', 65, 12, 1, 1, 'Protein', { house: '3 slices turkey' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
    ],
  },
  lemonChicken: {
    id: 'lemonChicken', name: 'Lemon chicken and potato', time: '35 min', slot: 'dinner',
    steps: ['Heat oven to 425.', 'Put 2 chicken thighs, 1 cut potato, and 2 cups broccoli on a pan.', 'Toss with 2 tsp oil and juice of 1/2 lemon.', 'Roast 25 to 30 minutes, until the chicken is 165 inside.'],
    foods: [
      f('Chicken thigh', 180, 32, 0, 16, 'Protein', { house: '2 small chicken thighs' }),
      f('Potatoes', 180, 3.5, 32, 0.2, 'Produce', { house: '1 medium potato' }),
      f('Broccoli', 150, 4, 9, 0.5, 'Produce', { house: '2 cups broccoli' }),
      f('Olive oil', 10, 0, 0, 10, 'Pantry', { house: '2 tsp oil' }),
      f('Lemon', 30, 0.3, 3, 0.1, 'Produce', { house: '1/2 lemon' }),
    ],
  },
  tacoBowl: {
    id: 'tacoBowl', name: 'Turkey taco bowl', time: '25 min', slot: 'dinner',
    steps: ['Brown 5 oz ground turkey.', 'Add 3/4 cup rice, 1/3 cup beans, 1 cup cabbage, 3 Tbsp salsa.', 'Top with 1/3 avocado.'],
    foods: [
      f('Ground turkey 93%', 150, 28, 0, 12, 'Protein', { house: '5 oz turkey' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Black beans', 80, 6, 14, 0.4, 'Pantry', { house: '1/3 cup beans' }),
      f('Cabbage slaw', 70, 1, 5, 0.1, 'Produce', { house: '1 cup cabbage' }),
      f('Salsa', 40, 0.6, 3, 0.2, 'Pantry', { house: '3 Tbsp salsa' }),
      f('Avocado', 50, 1, 4, 7, 'Produce', { house: '1/3 avocado' }),
    ],
  },
  salmon: {
    id: 'salmon', name: 'Salmon and green beans', time: '22 min', slot: 'dinner',
    steps: ['Heat oven to 425.', 'Toss 2 handfuls green beans with 1 tsp oil. Roast 10 minutes.', 'Add 1 salmon fillet. Roast 10 to 12 minutes more.', 'Serve with 3/4 cup rice and 2 lemon wedges.'],
    foods: [
      f('Salmon fillet', 170, 34, 0, 22, 'Protein', { house: '1 palm-size fillet' }),
      f('Green beans', 150, 2.7, 10, 0.3, 'Produce', { house: '2 handfuls green beans' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Lemon', 20, 0.2, 2, 0.1, 'Produce', { house: '2 lemon wedges' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  bolognese: {
    id: 'bolognese', name: 'Turkey pasta', time: '35 min', slot: 'dinner',
    steps: ['Brown 5 oz turkey with 1/2 small onion and 2 garlic cloves.', 'Add 3/4 cup crushed tomatoes. Simmer 20 minutes.', 'Boil 1 heaping cup dry pasta.', 'Toss together. 2 Tbsp parmesan and a side salad.'],
    foods: [
      f('Ground turkey 93%', 150, 28, 0, 12, 'Protein', { house: '5 oz turkey' }),
      f('Crushed tomatoes', 200, 3, 14, 0.4, 'Pantry', { house: '3/4 cup tomatoes' }),
      f('Onion', 60, 0.7, 6, 0.1, 'Produce', { house: '1/2 small onion' }),
      f('Garlic', 6, 0.4, 1.3, 0, 'Produce', { house: '2 garlic cloves' }),
      f('Dry pasta', 75, 10, 56, 1.2, 'Pantry', { house: '1 heaping cup dry pasta' }),
      f('Parmesan', 15, 5, 0.4, 4, 'Dairy', { house: '2 Tbsp parmesan' }),
      f('Romaine', 80, 1, 2.5, 0.2, 'Produce', { house: '2 handfuls lettuce' }),
    ],
  },
  steakTacos: {
    id: 'steakTacos', name: 'Steak tacos', time: '25 min', slot: 'dinner',
    steps: ['Cook 6 oz steak in a hot pan, 3 to 4 minutes a side.', 'Warm 3 small tortillas.', 'Slice the steak. Add cabbage, salsa, and 1/3 avocado.'],
    foods: [
      f('Flank steak', 180, 38, 0, 14, 'Protein', { house: '1 palm of steak' }),
      f('Corn tortillas', 70, 4, 30, 2, 'Pantry', { house: '3 small tortillas' }),
      f('Cabbage slaw', 70, 1, 5, 0.1, 'Produce', { house: '1 cup cabbage' }),
      f('Salsa', 40, 0.6, 3, 0.2, 'Pantry', { house: '3 Tbsp salsa' }),
      f('Avocado', 50, 1, 4, 7, 'Produce', { house: '1/3 avocado' }),
    ],
  },
  chili: {
    id: 'chili', name: 'Turkey chili', time: '40 min', slot: 'dinner',
    steps: ['Brown 5 oz turkey with 1/2 small onion.', 'Add 1/2 cup beans, 3/4 cup tomatoes, 1/2 cup broth.', 'Simmer 25 minutes.', 'Shred 1 slice of cheddar on top.'],
    foods: [
      f('Ground turkey 93%', 150, 28, 0, 12, 'Protein', { house: '5 oz turkey' }),
      f('Black beans', 120, 9, 21, 0.6, 'Pantry', { house: '1/2 cup beans' }),
      f('Crushed tomatoes', 200, 3, 14, 0.4, 'Pantry', { house: '3/4 cup tomatoes' }),
      f('Onion', 60, 0.7, 6, 0.1, 'Produce', { house: '1/2 small onion' }),
      f('Chicken broth', 120, 1, 1, 0.2, 'Pantry', { house: '1/2 cup broth' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheddar' }),
    ],
  },
  stirFry: {
    id: 'stirFry', name: 'Chicken stir fry', time: '20 min', slot: 'dinner',
    steps: ['Cut 6 oz chicken into strips. Cook in 1 tsp oil until done.', 'Add 2 cups mixed vegetables. Cook 5 minutes.', 'Stir in 2 Tbsp teriyaki. Serve over 3/4 cup rice.'],
    foods: [
      f('Chicken breast', 170, 36, 0, 4, 'Protein', { house: '1 palm of chicken' }),
      f('Stir-fry vegetables', 180, 4, 12, 0.5, 'Produce', { house: '2 cups mixed vegetables' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Teriyaki sauce', 30, 1, 6, 0, 'Pantry', { house: '2 Tbsp teriyaki' }),
      f('Olive oil', 5, 0, 0, 5, 'Pantry', { house: '1 tsp oil' }),
    ],
  },
  bakedFish: {
    id: 'bakedFish', name: 'Baked fish and potatoes', time: '30 min', slot: 'dinner',
    steps: ['Heat oven to 400.', 'Put 1 white fish fillet and 1 cut potato on a pan with 2 tsp oil.', 'Bake 20 to 25 minutes.', 'Add a handful of lettuce.'],
    foods: [
      f('White fish fillet', 170, 32, 0, 3, 'Protein', { house: '1 palm-size fillet' }),
      f('Potatoes', 180, 3.5, 32, 0.2, 'Produce', { house: '1 medium potato' }),
      f('Romaine', 60, 0.8, 2, 0.1, 'Produce', { house: '1 handful lettuce' }),
      f('Olive oil', 10, 0, 0, 10, 'Pantry', { house: '2 tsp oil' }),
    ],
  },
  burgerNight: {
    id: 'burgerNight', name: 'Turkey burger', time: '20 min', slot: 'dinner',
    steps: ['Form 6 oz turkey into a patty. Cook 5 minutes a side.', 'Toast a bun. Add lettuce and tomato.', 'Eat with 8 baby carrots.'],
    foods: [
      f('Ground turkey 93%', 170, 32, 0, 14, 'Protein', { house: '6 oz turkey patty' }),
      f('Burger bun', 50, 5, 26, 3, 'Pantry', { house: '1 bun' }),
      f('Romaine', 30, 0.4, 1, 0.1, 'Produce', { house: '1 leaf lettuce' }),
      f('Tomato', 40, 0.4, 2, 0.1, 'Produce', { house: '2 slices tomato' }),
      f('Carrots', 60, 0.6, 6, 0.2, 'Produce', { house: '8 baby carrots' }),
    ],
  },
}

export const BREAKFASTS = ['yogurtGrapes', 'yogurtBanana', 'yogurtBerries', 'eggToast', 'eggAvocado', 'oatmeal', 'proteinShake', 'pancakes']
export const LUNCHES = ['turkeySandwich', 'chickenSalad', 'tunaWrap', 'burritoBowl', 'eggLunch', 'greekPlate', 'soupSandwich']
export const DINNERS = ['lemonChicken', 'tacoBowl', 'salmon', 'bolognese', 'steakTacos', 'chili', 'stirFry', 'bakedFish', 'burgerNight']

export const DEFAULT_WEEK = [
  { id: 'mon', day: 'Monday', breakfast: 'yogurtGrapes', lunch: 'turkeySandwich', dinner: 'lemonChicken' },
  { id: 'tue', day: 'Tuesday', breakfast: 'eggToast', lunch: 'chickenSalad', dinner: 'tacoBowl' },
  { id: 'wed', day: 'Wednesday', breakfast: 'oatmeal', lunch: 'burritoBowl', dinner: 'salmon' },
  { id: 'thu', day: 'Thursday', breakfast: 'yogurtBerries', lunch: 'tunaWrap', dinner: 'stirFry' },
  { id: 'fri', day: 'Friday', breakfast: 'proteinShake', lunch: 'greekPlate', dinner: 'bolognese' },
  { id: 'sat', day: 'Saturday', breakfast: 'pancakes', lunch: 'eggLunch', dinner: 'steakTacos' },
  { id: 'sun', day: 'Sunday', breakfast: 'eggAvocado', lunch: 'soupSandwich', dinner: 'chili' },
]

export const WEEK_LABEL = 'This week'

export function mealOf(id) {
  return MEALS[id] || MEALS.yogurtGrapes
}

export function optionsFor(slot) {
  const ids = slot === 'breakfast' ? BREAKFASTS : slot === 'lunch' ? LUNCHES : DINNERS
  return ids.map((id) => MEALS[id])
}

export const WEEK_LABEL = 'Week of Sep 22'

function f(name, grams, protein, carbs, fat, aisle, extra = {}) {
  return { name, grams, protein, carbs, fat, aisle, ...extra }
}

export const DAYS = [
  {
    id: 'mon', day: 'Monday',
    breakfast: { name: 'Greek yogurt bowl', time: '5 min', steps: ['Yogurt, 15 grapes, granola, honey.'], foods: [
      f('Plain Greek yogurt', 200, 20, 7, 1, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Grapes', 80, 0.6, 14, 0.2, 'Produce', { house: '15 grapes' }),
      f('Granola', 30, 3, 19, 5, 'Pantry', { house: '3 Tbsp granola' }),
      f('Honey', 10, 0, 8, 0, 'Pantry', { pantry: true, house: '1 tsp honey' }),
    ]},
    lunch: { name: 'Turkey sandwich + fruit', time: '8 min', steps: ['Turkey and cheddar on 2 slices. Apple and carrots.'], foods: [
      f('Sourdough', 60, 5, 28, 1.2, 'Pantry', { house: '2 slices bread' }),
      f('Sliced turkey deli', 85, 15, 1, 1.5, 'Protein', { house: '4 slices turkey' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
      f('Apple', 150, 0.4, 21, 0.3, 'Produce', { house: '1 medium apple' }),
      f('Carrots', 60, 0.6, 6, 0.2, 'Produce', { house: '8 baby carrots' }),
    ]},
    dinner: { name: 'Sheet-pan lemon chicken', time: '35 min', steps: ['425 F. Roast 3 thighs, potato, broccoli 25-30 min. Eat 2 thighs. Box 1 for Tuesday.'], foods: [
      f('Chicken thigh', 180, 32, 0, 16, 'Protein', { house: '2 small chicken thighs' }),
      f('Chicken thigh', 140, 25, 0, 13, 'Protein', { prep: true, house: '1 extra thigh for Tuesday' }),
      f('Potatoes', 180, 3.5, 32, 0.2, 'Produce', { house: '1 medium potato' }),
      f('Broccoli', 150, 4, 9, 0.5, 'Produce', { house: '2 cups broccoli' }),
      f('Olive oil', 10, 0, 0, 10, 'Pantry', { pantry: true, house: '2 tsp oil' }),
      f('Lemon', 30, 0.3, 3, 0.1, 'Produce', { house: '1/2 lemon' }),
    ]},
  },
  {
    id: 'tue', day: 'Tuesday',
    breakfast: { name: 'Egg scramble + toast', time: '12 min', steps: ['2 eggs, spinach, cheese, 1 toast.'], foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
    ]},
    lunch: { name: 'Leftover lemon chicken', time: '5 min', steps: ['Reheat Monday thigh. Rice and broccoli.'], foods: [
      f('Chicken thigh', 140, 25, 0, 13, 'Protein', { leftover: true, house: '1 leftover thigh' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Broccoli', 80, 2.1, 5, 0.3, 'Produce', { house: '1 cup broccoli' }),
    ]},
    dinner: { name: 'Turkey taco bowl', time: '25 min', steps: ['Brown turkey. Bowl with rice, beans, slaw, salsa, avocado. Box extra for Wednesday.'], foods: [
      f('Ground turkey 93%', 150, 28, 0, 12, 'Protein', { house: '5 oz turkey' }),
      f('Ground turkey 93%', 100, 19, 0, 8, 'Protein', { prep: true, house: 'extra turkey for Wednesday' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Brown rice, cooked', 120, 2.4, 26, 0.4, 'Pantry', { prep: true, house: '1/2 cup extra rice' }),
      f('Black beans', 80, 6, 14, 0.4, 'Pantry', { house: '1/3 cup beans' }),
      f('Black beans', 60, 4.5, 10.5, 0.3, 'Pantry', { prep: true, house: '1/4 cup extra beans' }),
      f('Cabbage slaw', 70, 1, 5, 0.1, 'Produce', { house: '1 cup cabbage' }),
      f('Salsa', 40, 0.6, 3, 0.2, 'Pantry', { house: '3 Tbsp salsa' }),
      f('Avocado', 50, 1, 4, 7, 'Produce', { house: '1/3 avocado' }),
    ]},
  },
  {
    id: 'wed', day: 'Wednesday',
    breakfast: { name: 'Greek yogurt bowl', time: '5 min', steps: ['Same as Monday.'], foods: [
      f('Plain Greek yogurt', 200, 20, 7, 1, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Grapes', 80, 0.6, 14, 0.2, 'Produce', { house: '15 grapes' }),
      f('Granola', 30, 3, 19, 5, 'Pantry', { house: '3 Tbsp granola' }),
    ]},
    lunch: { name: 'Taco bowl leftover', time: '5 min', steps: ['Reheat Tuesday extra. 2 slices avocado.'], foods: [
      f('Ground turkey 93%', 100, 19, 0, 8, 'Protein', { leftover: true, house: 'Tuesday leftover turkey' }),
      f('Brown rice, cooked', 120, 2.4, 26, 0.4, 'Pantry', { leftover: true, house: '1/2 cup leftover rice' }),
      f('Black beans', 60, 4.5, 10.5, 0.3, 'Pantry', { leftover: true, house: '1/4 cup leftover beans' }),
      f('Avocado', 30, 0.6, 2.4, 4.2, 'Produce', { house: '2 slices avocado' }),
    ]},
    dinner: { name: 'Sheet-pan salmon', time: '22 min', steps: ['425 F. Beans then salmon. Save half fillet for Thursday.'], foods: [
      f('Salmon fillet', 170, 34, 0, 22, 'Protein', { house: '1 palm-size fillet' }),
      f('Salmon fillet', 85, 17, 0, 11, 'Protein', { prep: true, house: '1/2 fillet for Thursday' }),
      f('Green beans', 150, 2.7, 10, 0.3, 'Produce', { house: '2 handfuls green beans' }),
      f('Brown rice, cooked', 150, 3, 33, 0.5, 'Pantry', { house: '3/4 cup cooked rice' }),
      f('Brown rice, cooked', 120, 2.4, 26, 0.4, 'Pantry', { prep: true, house: '1/2 cup extra rice' }),
      f('Lemon', 20, 0.2, 2, 0.1, 'Produce', { house: '2 lemon wedges' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { pantry: true, house: '1 1/2 tsp oil' }),
    ]},
  },
  {
    id: 'thu', day: 'Thursday',
    breakfast: { name: 'Egg scramble + toast', time: '12 min', steps: ['Same as Tuesday.'], foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
    ]},
    lunch: { name: 'Salmon rice box', time: '5 min', steps: ['Leftover salmon over rice and beans.'], foods: [
      f('Salmon fillet', 85, 17, 0, 11, 'Protein', { leftover: true, house: '1/2 leftover fillet' }),
      f('Brown rice, cooked', 120, 2.4, 26, 0.4, 'Pantry', { leftover: true, house: '1/2 cup leftover rice' }),
      f('Black beans', 80, 6, 14, 0.4, 'Pantry', { house: '1/3 cup beans' }),
    ]},
    dinner: { name: 'Turkey Bolognese', time: '35 min', steps: ['Brown turkey, onion, garlic. Tomatoes 20 min. Pasta tonight. Save sauce for Friday.'], foods: [
      f('Ground turkey 93%', 150, 28, 0, 12, 'Protein', { house: '5 oz turkey tonight' }),
      f('Ground turkey 93%', 180, 34, 0, 14, 'Protein', { prep: true, house: 'extra turkey for Friday' }),
      f('Crushed tomatoes', 200, 3, 14, 0.4, 'Pantry', { house: '3/4 cup tomatoes' }),
      f('Crushed tomatoes', 240, 3.6, 17, 0.5, 'Pantry', { prep: true, house: '1 extra cup tomatoes' }),
      f('Onion', 60, 0.7, 6, 0.1, 'Produce', { house: '1/2 small onion' }),
      f('Garlic', 6, 0.4, 1.3, 0, 'Produce', { house: '2 garlic cloves' }),
      f('Dry pasta', 75, 10, 56, 1.2, 'Pantry', { house: '1 heaping cup dry pasta' }),
      f('Parmesan', 15, 5, 0.4, 4, 'Dairy', { house: '2 Tbsp parmesan' }),
      f('Romaine', 80, 1, 2.5, 0.2, 'Produce', { house: '2 handfuls lettuce' }),
    ]},
  },
  {
    id: 'fri', day: 'Friday',
    breakfast: { name: 'Yogurt bowl', time: '5 min', steps: ['Yogurt, half banana, granola.'], foods: [
      f('Plain Greek yogurt', 200, 20, 7, 1, 'Dairy', { house: '3/4 cup yogurt' }),
      f('Banana', 60, 0.7, 14, 0.2, 'Produce', { house: '1/2 banana' }),
      f('Granola', 20, 2, 13, 3.3, 'Pantry', { house: '2 Tbsp granola' }),
    ]},
    lunch: { name: 'Bolognese leftover', time: '12 min', steps: ['Small pasta. Half the leftover sauce.'], foods: [
      f('Ground turkey 93%', 90, 17, 0, 7, 'Protein', { leftover: true, house: '1 ladle leftover sauce' }),
      f('Crushed tomatoes', 120, 1.8, 8.4, 0.2, 'Pantry', { leftover: true, house: '1/2 cup leftover sauce' }),
      f('Dry pasta', 70, 9, 52, 1.1, 'Pantry', { house: '1 cup dry pasta' }),
      f('Parmesan', 10, 3.3, 0.3, 2.7, 'Dairy', { house: '1 Tbsp parmesan' }),
    ]},
    dinner: { name: 'Pasta night', time: '15 min', steps: ['Pasta, last of the sauce, salad.'], foods: [
      f('Ground turkey 93%', 90, 17, 0, 7, 'Protein', { leftover: true, house: '1 ladle leftover sauce' }),
      f('Crushed tomatoes', 120, 1.8, 8.4, 0.2, 'Pantry', { leftover: true, house: '1/2 cup leftover sauce' }),
      f('Dry pasta', 75, 10, 56, 1.2, 'Pantry', { house: '1 heaping cup dry pasta' }),
      f('Romaine', 80, 1, 2.5, 0.2, 'Produce', { house: '2 handfuls lettuce' }),
      f('Olive oil', 8, 0, 0, 8, 'Pantry', { pantry: true, house: '1 1/2 tsp oil' }),
    ]},
  },
  {
    id: 'sat', day: 'Saturday',
    breakfast: { name: 'Pancakes + egg', time: '20 min', steps: ['2 small pancakes, 1 egg, 8 strawberries.'], foods: [
      f('Pancake mix', 60, 4.5, 39, 2.2, 'Pantry', { house: '2 small pancakes' }),
      f('Eggs', 50, 6.3, 0.4, 5, 'Protein', { house: '1 large egg' }),
      f('Strawberries', 80, 0.5, 6, 0.2, 'Produce', { house: '8 strawberries' }),
      f('Butter', 5, 0, 0, 5.5, 'Dairy', { house: '1 tsp butter' }),
    ]},
    lunch: { name: 'Egg toast + fruit', time: '10 min', steps: ['Toast, egg, cheese, apple.'], foods: [
      f('Eggs', 50, 6.3, 0.4, 5, 'Protein', { house: '1 large egg' }),
      f('Sourdough', 30, 2.5, 14, 0.6, 'Pantry', { house: '1 slice bread' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheese' }),
      f('Apple', 150, 0.4, 21, 0.3, 'Produce', { house: '1 medium apple' }),
    ]},
    dinner: { name: 'Steak tacos', time: '25 min', steps: ['Cook steak. Eat most tonight. Box some for Sunday. 3 tortillas.'], foods: [
      f('Flank steak', 180, 38, 0, 14, 'Protein', { house: '1 palm of steak' }),
      f('Flank steak', 90, 19, 0, 7, 'Protein', { prep: true, house: '1/2 palm extra for Sunday' }),
      f('Corn tortillas', 70, 4, 30, 2, 'Pantry', { house: '3 small tortillas' }),
      f('Cabbage slaw', 70, 1, 5, 0.1, 'Produce', { house: '1 cup cabbage' }),
      f('Salsa', 40, 0.6, 3, 0.2, 'Pantry', { house: '3 Tbsp salsa' }),
      f('Avocado', 50, 1, 4, 7, 'Produce', { house: '1/3 avocado' }),
      f('Lime', 20, 0.2, 2, 0.1, 'Produce', { house: '2 lime wedges' }),
    ]},
  },
  {
    id: 'sun', day: 'Sunday',
    breakfast: { name: 'Egg scramble + fruit', time: '12 min', steps: ['2 eggs, spinach, half banana.'], foods: [
      f('Eggs', 100, 13, 1, 10, 'Protein', { house: '2 large eggs' }),
      f('Baby spinach', 40, 1.1, 1.4, 0.2, 'Produce', { house: '1 handful spinach' }),
      f('Banana', 60, 0.7, 14, 0.2, 'Produce', { house: '1/2 banana' }),
    ]},
    lunch: { name: 'Steak taco leftover', time: '8 min', steps: ['Leftover steak, 2 tortillas, avocado, salsa.'], foods: [
      f('Flank steak', 90, 19, 0, 7, 'Protein', { leftover: true, house: 'leftover steak' }),
      f('Corn tortillas', 46, 2.6, 20, 1.3, 'Pantry', { house: '2 small tortillas' }),
      f('Avocado', 30, 0.6, 2.4, 4.2, 'Produce', { house: '2 slices avocado' }),
      f('Salsa', 30, 0.4, 2.2, 0.1, 'Pantry', { house: '2 Tbsp salsa' }),
    ]},
    dinner: { name: 'Turkey chili', time: '40 min', steps: ['Brown turkey and onion. Beans, tomatoes, broth 25 min. Cheese on top.'], foods: [
      f('Ground turkey 93%', 150, 28, 0, 12, 'Protein', { house: '5 oz turkey' }),
      f('Black beans', 120, 9, 21, 0.6, 'Pantry', { house: '1/2 cup beans' }),
      f('Crushed tomatoes', 200, 3, 14, 0.4, 'Pantry', { house: '3/4 cup tomatoes' }),
      f('Onion', 60, 0.7, 6, 0.1, 'Produce', { house: '1/2 small onion' }),
      f('Chicken broth', 120, 1, 1, 0.2, 'Pantry', { house: '1/2 cup broth' }),
      f('Cheddar', 20, 5, 0.2, 7, 'Dairy', { house: '1 slice cheddar, shredded' }),
    ]},
  },
]

function item(name, aisle, kind, p, c, f, house, base = 100) {
  return { name, aisle, kind, protein: p, carbs: c, fat: f, house, base }
}

export const PANTRY = [
  item('Eggs', 'Protein', 'protein', 13, 1, 10, '2 large eggs', 100),
  item('Cooked chicken breast', 'Protein', 'protein', 31, 0, 3.6, '1 palm of chicken', 140),
  item('Chicken thigh', 'Protein', 'protein', 18, 0, 9, '2 small thighs', 180),
  item('Ground turkey 93%', 'Protein', 'protein', 19, 0, 8, '5 oz turkey', 150),
  item('Salmon fillet', 'Protein', 'protein', 20, 0, 13, '1 palm-size fillet', 170),
  item('Canned tuna', 'Protein', 'protein', 22, 0, 0.9, '1 can drained', 113),
  item('Canned salmon', 'Protein', 'protein', 20, 0, 5, '1 can drained', 113),
  item('Shrimp', 'Protein', 'protein', 19, 0.2, 1.4, 'about 10 shrimp', 140),
  item('Flank steak', 'Protein', 'protein', 21, 0, 8, '1 palm of steak', 180),
  item('White fish fillet', 'Protein', 'protein', 19, 0, 1.8, '1 palm-size fillet', 170),
  item('Sliced turkey deli', 'Protein', 'protein', 18, 1, 1.8, '4 slices', 85),
  item('Protein powder', 'Pantry', 'protein', 80, 10, 5, '1 scoop', 30),
  item('Plain Greek yogurt', 'Dairy', 'protein', 10, 3.6, 0.4, '3/4 cup', 200),
  item('Cottage cheese', 'Dairy', 'protein', 11, 3.4, 2.3, '1 cup', 220),
  item('Milk', 'Dairy', 'protein', 3.3, 5, 2, '1 cup', 240),
  item('Cheddar', 'Dairy', 'fat', 25, 1.3, 33, '1 slice', 20),
  item('Feta', 'Dairy', 'fat', 14, 4, 21, '1 oz', 28),
  item('Parmesan', 'Dairy', 'fat', 36, 3, 25, '2 Tbsp', 15),
  item('Butter', 'Dairy', 'fat', 0.9, 0.1, 81, '1 tsp', 5),
  item('Avocado', 'Produce', 'fat', 2, 9, 15, '1/4 avocado', 40),
  item('Peanut butter', 'Pantry', 'fat', 25, 20, 50, '1 Tbsp', 16),
  item('Olive oil', 'Pantry', 'fat', 0, 0, 100, '1 tsp', 5),
  item('Banana', 'Produce', 'carbs', 1.1, 23, 0.3, '1/2 banana', 60),
  item('Apple', 'Produce', 'carbs', 0.3, 14, 0.2, '1 medium apple', 150),
  item('Grapes', 'Produce', 'carbs', 0.7, 18, 0.2, '15 grapes', 80),
  item('Mixed berries', 'Produce', 'carbs', 1, 12, 0.4, '1/2 cup berries', 70),
  item('Strawberries', 'Produce', 'carbs', 0.7, 8, 0.3, '8 strawberries', 80),
  item('Orange', 'Produce', 'carbs', 0.9, 12, 0.1, '1 orange', 130),
  item('Baby spinach', 'Produce', 'carbs', 2.9, 3.6, 0.4, '1 handful', 40),
  item('Romaine', 'Produce', 'carbs', 1.2, 3.3, 0.3, '2 handfuls', 80),
  item('Tomato', 'Produce', 'carbs', 0.9, 3.9, 0.2, '1/2 cup chopped', 80),
  item('Cherry tomatoes', 'Produce', 'carbs', 0.9, 3.9, 0.2, '8 cherry tomatoes', 80),
  item('Cucumber', 'Produce', 'carbs', 0.7, 3.6, 0.1, '1/2 cup', 80),
  item('Carrots', 'Produce', 'carbs', 0.9, 10, 0.2, '8 baby carrots', 60),
  item('Broccoli', 'Produce', 'carbs', 2.8, 7, 0.4, '2 cups', 150),
  item('Green beans', 'Produce', 'carbs', 1.8, 7, 0.2, '2 handfuls', 150),
  item('Cabbage slaw', 'Produce', 'carbs', 1.3, 6, 0.1, '1 cup', 70),
  item('Potatoes', 'Produce', 'carbs', 2, 17, 0.1, '1 medium potato', 180),
  item('Onion', 'Produce', 'carbs', 1.1, 9, 0.1, '1/2 small onion', 60),
  item('Pineapple', 'Produce', 'carbs', 0.5, 13, 0.1, '1/2 cup', 80),
  item('Dry oats', 'Pantry', 'carbs', 13, 67, 7, '1/2 cup dry', 40),
  item('Granola', 'Pantry', 'carbs', 10, 64, 16, '3 Tbsp', 30),
  item('Sourdough', 'Pantry', 'carbs', 8, 47, 2, '1 slice', 30),
  item('Brown rice, cooked', 'Pantry', 'carbs', 2.6, 23, 0.9, '1/2 cup cooked', 100),
  item('Dry pasta', 'Pantry', 'carbs', 13, 75, 1.5, '1 heaping cup dry', 75),
  item('Flour tortilla', 'Pantry', 'carbs', 8, 48, 6, '1 large tortilla', 50),
  item('Corn tortillas', 'Pantry', 'carbs', 6, 44, 3, '2 small tortillas', 46),
  item('Black beans', 'Pantry', 'carbs', 8.9, 23, 0.5, '1/3 cup', 80),
  item('Salsa', 'Pantry', 'carbs', 1.5, 7, 0.2, '3 Tbsp', 40),
  item('Crackers', 'Pantry', 'carbs', 9, 70, 10, '6 crackers', 20),
  item('Pretzels', 'Pantry', 'carbs', 10, 80, 3, '10 pretzels', 30),
]

export function foodsOf(kind) {
  return PANTRY.filter((p) => p.kind === kind)
}

export function portionFromPantry(item, grams) {
  const g = Number(grams) || item.base
  const n = g / 100
  return {
    name: item.name,
    aisle: item.aisle,
    grams: g,
    protein: item.protein * n,
    carbs: item.carbs * n,
    fat: item.fat * n,
    house: item.house,
  }
}

function note(preview, locked) {
  return { preview, locked }
}

export const KITCHEN = {
  yogurtGrapes: note('No heat. Bowl only.', [
    'Spoon the yogurt into a bowl.',
    'Add the grapes.',
    'Granola last so it stays crisp.',
  ]),
  yogurtBanana: note('No heat. Bowl only.', [
    'Spoon the yogurt into a bowl.',
    'Slice the banana on top.',
    'Granola last so it stays crisp.',
  ]),
  yogurtBerries: note('No heat. Bowl only.', [
    'Spoon the yogurt into a bowl.',
    'Add the berries.',
    'Granola last so it stays crisp.',
  ]),
  eggToast: note('One skillet plus a toaster.', [
    'Toast the bread.',
    'Set a nonstick skillet on medium. Soften the spinach 30 seconds.',
    'Add the eggs. Stir until just set.',
    'Take the pan off the heat. Melt the cheese on the eggs.',
    'Eggs on the toast.',
  ]),
  eggAvocado: note('Toaster plus a skillet.', [
    'Toast the bread.',
    'Mash the avocado on the toast with a pinch of salt.',
    'Fry the eggs in a lightly oiled nonstick skillet on medium until the whites set.',
    'Eggs on the avocado.',
  ]),
  oatmeal: note('Pot for oats. Skillet for eggs.', [
    'Simmer the oats in water, stirring, until thick.',
    'Slice the banana into the pot off the heat.',
    'Fry the eggs in a nonstick skillet on medium.',
    'Eggs on the side of the oats.',
  ]),
  proteinShake: note('Blender plus a toaster.', [
    'Blend protein, milk, and banana until smooth.',
    'Toast the bread.',
    'Spread the peanut butter on the toast.',
  ]),
  pancakes: note('Nonstick skillet or griddle.', [
    'Heat the pan on medium. A drop of water should dance.',
    'Cook small pancakes until bubbles set, then flip.',
    'Fry the egg in the same pan.',
    'Berries on the side.',
  ]),
  overnightOats: note('Make this the night before.', [
    'Add the oats to a jar or lidded bowl.',
    'Stir in the yogurt or milk until every oat is wet.',
    'Cover and chill at least 8 hours.',
    'In the morning, stir once. Berries on top so they stay bright.',
  ]),
  chiaBowl: note('Make this the night before.', [
    'Stir chia with milk or yogurt until no dry pockets remain.',
    'Chill at least 4 hours, better overnight.',
    'Stir again. Kiwi and almond butter on top.',
  ]),
  skyrMango: note('No heat unless the mango is frozen solid.', [
    'If the mango is frozen, thaw it on the counter 10 minutes or microwave 20 seconds.',
    'Skyr in the bowl. Mango on top. Granola last.',
  ]),
  proteinBagelEgg: note('Toaster plus a skillet.', [
    'Toast the bagel.',
    'Scramble the eggs on medium in a nonstick skillet.',
    'Wilt the spinach in the same pan at the end.',
    'Eggs on the bagel.',
  ]),
  turkeySandwich: note('No cook. Board only.', [
    'Lay out the bread.',
    'Turkey, then cheese.',
    'Apple and carrots on the side.',
  ]),
  chickenSalad: note('Chicken already cooked.', [
    'Slice or pull the chicken.',
    'Bowl: lettuce, tomato, rice, chicken.',
    'Oil on top. Toss at the table.',
  ]),
  tunaWrap: note('No heat.', [
    'Drain the tuna. Mix with the yogurt.',
    'Warm the tortilla 10 seconds in a dry pan if you want it soft.',
    'Tuna and lettuce in the wrap. Orange on the side.',
  ]),
  shrimpTacos: note('Hot pan. Fast cook.', [
    'Pat the shrimp dry with a paper towel and salt them.',
    'Heat a skillet on medium-high. Add a thin film of oil when the pan is hot.',
    'Cook the shrimp in one layer, 2 minutes a side. Do not crowd the pan.',
    'Warm the tortillas in a dry pan.',
    'Build: shrimp, cabbage, salsa, lime.',
  ]),
  cottageBowl: note('No heat.', [
    'Cottage cheese in a bowl.',
    'Pineapple on top. Pretzels on the side so they stay crisp.',
  ]),
  salmonPlate: note('No heat. Drain well.', [
    'Drain the salmon. Flake it with a fork.',
    'Plate: cucumber, tomatoes, crackers, feta, salmon.',
  ]),
  tomatoGrilledCheese: note('Pot for soup. Skillet for the sandwich.', [
    'Warm the soup on low. Do not boil.',
    'Butter the outside of the bread. Cheese inside.',
    'Grill in a skillet on medium until both sides are brown and the cheese melts.',
  ]),
  rotisserieBowl: note('Warm the grain. Do not recook the chicken.', [
    'Warm the quinoa with a splash of water.',
    'Pull the chicken into bite-size pieces.',
    'Bowl: quinoa, chicken, cauli rice, salsa.',
  ]),
  whippedCottage: note('Two minutes with a blender or fork.', [
    'Blend or whip the cottage cheese until smooth.',
    'Peach on top. Rice cakes on the side.',
  ]),
  ahiBowl: note('Hot pan. Ahi stays rare in the center.', [
    'Pat the ahi dry. Salt it.',
    'Heat a thin film of oil in a skillet until it shimmers.',
    'Sear 1 minute a side. Pull it. Slice.',
    'Rice in the bowl. Ahi, edamame, cucumber. Rest of the oil stays in the pan.',
  ]),
  edamameRice: note('Warm the rice and edamame.', [
    'Warm the rice. Warm the edamame in a splash of water or the microwave.',
    'Plate: rice, edamame, hummus, snap peas.',
  ]),
  lemonChicken: note('One sheet pan. Potato and chicken first. Broccoli later.', [
    'Heat the oven to 425.',
    'Line a rimmed sheet pan with parchment. If you only have foil, spray or oil it.',
    'Cut the potato. Toss thighs and potato with oil, salt, and lemon in a bowl, then onto the paper.',
    'One layer. Roast 15 minutes.',
    'Add the broccoli. Roast 12 to 15 minutes more.',
    'Chicken is done at 165 in the thickest part. Rest 3 minutes. Spoon the pan juices over.',
  ]),
  tacoBowl: note('Skillet for the turkey.', [
    'Heat a skillet on medium-high. Add the turkey in a thin layer.',
    'Wait for brown color before you stir. Salt as it cooks.',
    'Warm the rice and beans.',
    'Bowl: rice, turkey, beans, cabbage, salsa, avocado.',
  ]),
  salmon: note('One sheet pan. Beans first, then the fish.', [
    'Heat the oven to 425.',
    'Line a rimmed sheet pan with parchment. Foil works if you spray it so the fish does not stick.',
    'Toss the green beans with the oil on the paper. Roast 8 to 10 minutes.',
    'Push the beans aside. Salmon on the same paper, skin side down if it has skin.',
    'Roast 10 to 12 minutes more, until the thickest part flakes.',
    'Rice on the plate. Lemon on the fish at the table.',
  ]),
  bolognese: note('Pot for sauce. Pot for pasta.', [
    'Brown the turkey with onion and garlic. Do not steam it.',
    'Add the tomatoes. Simmer 20 minutes, lid off.',
    'Boil the pasta in salted water until just tender. Drain.',
    'Toss pasta with sauce. Parmesan on top. Lettuce on the side.',
  ]),
  steakTacos: note('Hot pan for the steak.', [
    'Pat the steak dry. Salt it.',
    'Heat a skillet until it is very hot. Thin film of oil.',
    '3 to 4 minutes a side for a pink center. Rest 5 minutes. Slice across the grain.',
    'Warm the tortillas. Cabbage, salsa, avocado on top.',
  ]),
  chili: note('One pot.', [
    'Brown the turkey with the onion.',
    'Add beans, tomatoes, and broth. Simmer 25 minutes, stirring now and then.',
    'Cheddar on top when you serve.',
  ]),
  stirFry: note('Hot skillet or wok.', [
    'Cut the chicken into strips. Pat dry.',
    'Heat the oil until it shimmers. Cook the chicken until it is white through.',
    'Add the vegetables. Cook 5 minutes, still a little crisp.',
    'Stir in the teriyaki off the high heat. Rice on the plate first.',
  ]),
  bakedFish: note('One sheet pan.', [
    'Heat the oven to 400.',
    'Line a rimmed sheet pan with parchment. Oil the paper if you use foil.',
    'Potato and fish on the pan with the oil. Roast 20 to 25 minutes, until the fish flakes.',
    'Lettuce on the side.',
  ]),
  burgerNight: note('Skillet or grill pan.', [
    'Form the patty. Press a small dimple in the center so it stays flat.',
    'Cook 5 minutes a side on medium-high, until 165 inside.',
    'Toast the bun in the same pan. Lettuce and tomato on the burger. Carrots on the side.',
  ]),
  tofuQuinoa: note('Hot skillet for the tofu.', [
    'Pat the tofu dry. Cut into slabs.',
    'Heat the oil. Do not move the tofu for 3 to 4 minutes a side.',
    'Warm the quinoa. Broccoli on the side.',
  ]),
  chickenSausageSheet: note('One sheet pan.', [
    'Heat the oven to 425.',
    'Line a rimmed sheet pan with parchment.',
    'Sweet potato out first, 10 minutes.',
    'Add sausage and peppers. Roast 12 to 15 minutes more, until the sausage is hot through.',
  ]),
  bisonFarro: note('Skillet for the bison.', [
    'Heat a skillet on medium-high. Salt the bison.',
    'Cook to just pink or 145 inside. Rest 3 minutes.',
    'Warm the farro and green beans.',
  ]),
  appleCottage: note('No heat.', [
    'Slice the apple. Cottage cheese in a bowl. Nut butter on the side or stirred in.',
  ]),
  grapesTurkey: note('No heat.', [
    'Plate grapes, turkey, and cheese.',
  ]),
  berriesCottage: note('No heat.', [
    'Cottage cheese in a bowl. Berries on top.',
  ]),
  riceCake: note('No heat.', [
    'Rice cake, turkey, nut butter.',
  ]),
  datesCheese: note('No heat.', [
    'Dates and cheese on a small plate.',
  ]),
  yogurtSnack: note('No heat.', [
    'Yogurt in a cup. Berries on top.',
  ]),
}

const BY_NAME = {
  'Yogurt bowl with grapes': 'yogurtGrapes',
  'Yogurt bowl with banana': 'yogurtBanana',
  'Yogurt bowl with berries': 'yogurtBerries',
  'Eggs and toast': 'eggToast',
  'Eggs and avocado toast': 'eggAvocado',
  'Oatmeal and eggs': 'oatmeal',
  'Shake and toast': 'proteinShake',
  'Pancakes and eggs': 'pancakes',
  'Overnight oats': 'overnightOats',
  'Chia pudding bowl': 'chiaBowl',
  'Skyr and mango': 'skyrMango',
  'Protein bagel and eggs': 'proteinBagelEgg',
  'Turkey sandwich': 'turkeySandwich',
  'Chicken salad plate': 'chickenSalad',
  'Tuna wrap': 'tunaWrap',
  'Shrimp tacos': 'shrimpTacos',
  'Cottage cheese bowl': 'cottageBowl',
  'Salmon and cucumber plate': 'salmonPlate',
  'Tomato soup and grilled cheese': 'tomatoGrilledCheese',
  'Rotisserie bowl': 'rotisserieBowl',
  'Whipped cottage bowl': 'whippedCottage',
  'Ahi bowl': 'ahiBowl',
  'Edamame rice plate': 'edamameRice',
  'Lemon chicken and potato': 'lemonChicken',
  'Turkey taco bowl': 'tacoBowl',
  'Salmon and green beans': 'salmon',
  'Turkey pasta': 'bolognese',
  'Steak tacos': 'steakTacos',
  'Turkey chili': 'chili',
  'Chicken stir fry': 'stirFry',
  'Baked fish and potatoes': 'bakedFish',
  'Turkey burger': 'burgerNight',
  'Tofu and quinoa': 'tofuQuinoa',
  'Chicken sausage sheet pan': 'chickenSausageSheet',
  'Bison and farro': 'bisonFarro',
  'Apple and cottage cheese': 'appleCottage',
  'Grapes and turkey': 'grapesTurkey',
  'Berries and cottage cheese': 'berriesCottage',
  'Rice cake and turkey': 'riceCake',
  'Dates and cheese': 'datesCheese',
  'Yogurt cup': 'yogurtSnack',
}

export function kitchenFor(meal) {
  if (!meal) return null
  return KITCHEN[meal.id] || KITCHEN[BY_NAME[meal.name]] || null
}

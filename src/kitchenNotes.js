function note(preview, locked, extra = {}) {
  return {
    preview,
    locked,
    time: extra.time || '',
    done: extra.done || '',
    ahead: extra.ahead || '',
  }
}

export const KITCHEN = {
  yogurtGrapes: note('Bowl only. No heat.', [
    'Spoon the yogurt into a bowl.',
    'Add the grapes.',
    'Granola last so it stays crisp.',
  ], { time: '3 min' }),
  yogurtBanana: note('Bowl only. No heat.', [
    'Spoon the yogurt into a bowl.',
    'Slice the banana on top.',
    'Granola last so it stays crisp.',
  ], { time: '3 min' }),
  yogurtBerries: note('Bowl only. No heat.', [
    'Spoon the yogurt into a bowl.',
    'Add the berries.',
    'Granola last so it stays crisp.',
  ], { time: '3 min' }),
  eggToast: note('Toaster plus one skillet.', [
    'Toast the bread.',
    'Warm a nonstick skillet on medium. Soften the spinach 30 seconds.',
    'Add the eggs. Stir until just set, still glossy.',
    'Off the heat, melt the cheese on the eggs.',
    'Eggs on the toast.',
  ], { time: '8 min', done: 'Eggs look set, not dry.' }),
  eggAvocado: note('Toaster plus one skillet.', [
    'Toast the bread.',
    'Mash the avocado on the toast with a pinch of salt.',
    'Fry the eggs in a lightly oiled skillet on medium until the whites set.',
    'Eggs on the avocado.',
  ], { time: '8 min', done: 'Whites set. Yolks as you like them.' }),
  oatmeal: note('Pot for oats. Skillet for eggs.', [
    'Simmer the oats in water, stirring, until thick.',
    'Slice the banana into the pot off the heat.',
    'Fry the eggs in a nonstick skillet on medium.',
    'Eggs beside the oats.',
  ], { time: '10 min', done: 'Oats thick. Eggs just set.' }),
  proteinShake: note('Blender plus a toaster.', [
    'Blend protein, milk, and banana until smooth.',
    'Toast the bread.',
    'Spread the peanut butter on the toast.',
  ], { time: '5 min' }),
  pancakes: note('Nonstick skillet or griddle.', [
    'Heat the pan on medium. A drop of water should dance.',
    'Cook small pancakes until bubbles set, then flip.',
    'Fry the egg in the same pan.',
    'Berries on the side.',
  ], { time: '12 min', done: 'Pancakes spring back. Egg set.' }),
  overnightOats: note('Stir tonight. Eat cold.', [
    'Oats in a jar or lidded bowl.',
    'Stir in yogurt or milk until every oat is wet.',
    'Cover and chill at least 8 hours.',
    'Morning: stir once. Berries on top so they stay bright.',
  ], { time: '5 min tonight', ahead: 'Needs the night in the fridge.', done: 'Oats are soft, not soupy.' }),
  chiaBowl: note('Stir tonight. Eat cold.', [
    'Stir chia with milk or yogurt until no dry pockets remain.',
    'Chill at least 4 hours, better overnight.',
    'Stir again. Kiwi and almond butter on top.',
  ], { time: '5 min tonight', ahead: 'Needs at least 4 hours cold.', done: 'Pudding holds a spoon.' }),
  skyrMango: note('Bowl only.', [
    'If the mango is frozen, thaw 10 minutes on the counter or 20 seconds in the microwave.',
    'Skyr in the bowl. Mango on top. Granola last.',
  ], { time: '4 min' }),
  proteinBagelEgg: note('Toaster plus a skillet.', [
    'Toast the bagel.',
    'Scramble the eggs on medium in a nonstick skillet.',
    'Wilt the spinach in the same pan at the end.',
    'Eggs on the bagel.',
  ], { time: '10 min', done: 'Eggs glossy, spinach just wilted.' }),
  turkeySandwich: note('Board only. No heat.', [
    'Lay out the bread.',
    'Turkey, then cheese.',
    'Apple and carrots on the side.',
  ], { time: '4 min' }),
  chickenSalad: note('Chicken already cooked.', [
    'Slice or pull the chicken.',
    'Bowl: lettuce, tomato, rice, chicken.',
    'Oil on top. Toss at the table.',
  ], { time: '8 min' }),
  tunaWrap: note('No heat, unless you warm the tortilla.', [
    'Drain the tuna. Mix with the yogurt.',
    'Warm the tortilla 10 seconds in a dry pan if you want it soft.',
    'Tuna and lettuce in the wrap. Orange on the side.',
  ], { time: '6 min' }),
  shrimpTacos: note('Hot pan. Fast cook.', [
    'Pat the shrimp dry. Salt them.',
    'Heat a skillet on medium-high. Thin film of oil when the pan is hot.',
    'Shrimp in one layer, 2 minutes a side. Do not crowd the pan.',
    'Warm the tortillas in a dry pan.',
    'Build: shrimp, cabbage, salsa, lime.',
  ], { time: '12 min', done: 'Shrimp pink and curled. No gray spots.' }),
  cottageBowl: note('Bowl only.', [
    'Cottage cheese in a bowl.',
    'Pineapple on top. Pretzels on the side so they stay crisp.',
  ], { time: '3 min' }),
  salmonPlate: note('No heat. Drain well.', [
    'Drain the salmon. Flake it with a fork.',
    'Plate: cucumber, tomatoes, crackers, feta, salmon.',
  ], { time: '5 min' }),
  tomatoGrilledCheese: note('Pot for soup. Skillet for the sandwich.', [
    'Warm the soup on low. Do not boil.',
    'Butter the outside of the bread. Cheese inside.',
    'Grill on medium until both sides are brown and the cheese melts.',
  ], { time: '12 min', done: 'Cheese melted. Bread brown, not black.' }),
  rotisserieBowl: note('Warm the grain. Do not recook the chicken.', [
    'Warm the quinoa with a splash of water.',
    'Pull the chicken into bite-size pieces.',
    'Bowl: quinoa, chicken, cauli rice, salsa.',
  ], { time: '8 min' }),
  whippedCottage: note('Two minutes with a blender or a fork.', [
    'Blend or whip the cottage cheese until smooth.',
    'Peach on top. Rice cakes on the side.',
  ], { time: '4 min' }),
  ahiBowl: note('Hot pan. Center stays rare.', [
    'Pat the ahi dry. Salt it.',
    'Heat a thin film of oil until it shimmers.',
    'Sear 1 minute a side. Pull it. Slice.',
    'Rice in the bowl. Ahi, edamame, cucumber.',
  ], { time: '10 min', done: 'Outside browned. Center still pink.' }),
  edamameRice: note('Warm the rice and edamame.', [
    'Warm the rice.',
    'Warm the edamame in a splash of water or the microwave.',
    'Plate: rice, edamame, hummus, snap peas.',
  ], { time: '6 min' }),
  lemonChicken: note('One sheet pan. Potato first. Broccoli later.', [
    'Heat the oven to 425.',
    'Line a rimmed sheet pan with parchment. Foil works if you oil it.',
    'Cut the potato. Toss thighs and potato with oil, salt, and lemon. One layer on the paper.',
    'Roast 15 minutes.',
    'Add the broccoli. Roast 12 to 15 minutes more.',
    'Rest 3 minutes. Spoon the pan juices over.',
  ], { time: '35 min', done: 'Chicken 165 in the thickest part. Potato tender.' }),
  tacoBowl: note('Skillet for the turkey.', [
    'Heat a skillet on medium-high. Turkey in a thin layer.',
    'Wait for brown before you stir. Salt as it cooks.',
    'Warm the rice and beans.',
    'Bowl: rice, turkey, beans, cabbage, salsa, avocado.',
  ], { time: '18 min', done: 'Turkey browned, no pink left.' }),
  salmon: note('One sheet pan. Beans first, then the fish.', [
    'Heat the oven to 425.',
    'Line a rimmed sheet pan with parchment. Oil foil if that is what you have.',
    'Toss the green beans with oil on the paper. Roast 8 to 10 minutes.',
    'Push the beans aside. Salmon on the paper, skin down if it has skin.',
    'Roast 10 to 12 minutes more.',
    'Rice on the plate. Lemon on the fish at the table.',
  ], { time: '25 min', done: 'Thickest part of the salmon flakes.' }),
  bolognese: note('Pot for sauce. Pot for pasta.', [
    'Brown the turkey with onion and garlic. Do not steam it.',
    'Add the tomatoes. Simmer 20 minutes, lid off.',
    'Boil the pasta in salted water until just tender. Drain.',
    'Toss pasta with sauce. Parmesan on top. Lettuce on the side.',
  ], { time: '30 min', done: 'Sauce thick. Pasta just tender.' }),
  steakTacos: note('Hot pan for the steak.', [
    'Pat the steak dry. Salt it.',
    'Heat a skillet until very hot. Thin film of oil.',
    '3 to 4 minutes a side for a pink center. Rest 5 minutes. Slice across the grain.',
    'Warm the tortillas. Cabbage, salsa, avocado on top.',
  ], { time: '20 min', done: 'Steak rested. Slice is pink if you want it that way.' }),
  chili: note('One pot.', [
    'Brown the turkey with the onion.',
    'Add beans, tomatoes, and broth. Simmer 25 minutes, stirring now and then.',
    'Cheddar on top when you serve.',
  ], { time: '35 min', done: 'Chili thick enough to sit on a spoon.' }),
  stirFry: note('Hot skillet or wok.', [
    'Cut the chicken into strips. Pat dry.',
    'Heat the oil until it shimmers. Cook the chicken until it is white through.',
    'Add the vegetables. Cook 5 minutes, still a little crisp.',
    'Stir in the teriyaki off the high heat. Rice on the plate first.',
  ], { time: '20 min', done: 'Chicken white through. Veg still crisp.' }),
  bakedFish: note('One sheet pan.', [
    'Heat the oven to 400.',
    'Line a rimmed sheet pan with parchment. Oil the paper if you use foil.',
    'Potato and fish on the pan with the oil. Roast 20 to 25 minutes.',
    'Lettuce on the side.',
  ], { time: '30 min', done: 'Fish flakes. Potato tender.' }),
  burgerNight: note('Skillet or grill pan.', [
    'Form the patty. Press a small dimple in the center so it stays flat.',
    'Cook 5 minutes a side on medium-high.',
    'Toast the bun in the same pan. Lettuce and tomato on the burger. Carrots on the side.',
  ], { time: '15 min', done: 'Patty 165 inside.' }),
  tofuQuinoa: note('Hot skillet for the tofu.', [
    'Pat the tofu dry. Cut into slabs.',
    'Heat the oil. Do not move the tofu for 3 to 4 minutes a side.',
    'Warm the quinoa. Broccoli on the side.',
  ], { time: '15 min', done: 'Tofu browned on both faces.' }),
  chickenSausageSheet: note('One sheet pan.', [
    'Heat the oven to 425.',
    'Line a rimmed sheet pan with parchment.',
    'Sweet potato out first, 10 minutes.',
    'Add sausage and peppers. Roast 12 to 15 minutes more.',
  ], { time: '30 min', done: 'Sausage hot through. Potato soft.' }),
  bisonFarro: note('Skillet for the bison.', [
    'Heat a skillet on medium-high. Salt the bison.',
    'Cook to just pink or 145 inside. Rest 3 minutes.',
    'Warm the farro and green beans.',
  ], { time: '18 min', done: 'Bison rested. Farro warm.' }),
  appleCottage: note('No heat.', [
    'Slice the apple. Cottage cheese in a bowl. Nut butter on the side or stirred in.',
  ], { time: '3 min' }),
  grapesTurkey: note('No heat.', [
    'Plate grapes, turkey, and cheese.',
  ], { time: '2 min' }),
  berriesCottage: note('No heat.', [
    'Cottage cheese in a bowl. Berries on top.',
  ], { time: '2 min' }),
  riceCake: note('No heat.', [
    'Rice cake, turkey, nut butter.',
  ], { time: '2 min' }),
  datesCheese: note('No heat.', [
    'Dates and cheese on a small plate.',
  ], { time: '2 min' }),
  yogurtSnack: note('No heat.', [
    'Yogurt in a cup. Berries on top.',
  ], { time: '2 min' }),
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

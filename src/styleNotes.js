function note(preview, locked, extra = {}) {
  return { preview, locked, time: extra.time || '', done: extra.done || '', ahead: extra.ahead || '' }
}

export const STYLE_NOTES = {
  ketoSausageEggs: note('Skillet. Sausage first.', [
    'Warm a skillet on medium. Sausage until hot through.',
    'Push aside. Eggs until the whites set.',
    'Spinach in for the last 20 seconds.',
  ], { time: '12 min', done: 'Sausage hot. Whites set.' }),
  ketoFetaEggs: note('Skillet. Cheese off the heat.', [
    'Scramble the eggs on medium until just set.',
    'Off the heat, crumble feta on top.',
    'Spinach on the side or wilted in the pan.',
  ], { time: '10 min', done: 'Eggs glossy. Feta soft.' }),
  ketoTurkeyBreakfast: note('Skillet. Turkey first.', [
    'Brown the turkey on medium-high. Salt as it cooks.',
    'Push aside. Fry the eggs until the whites set.',
  ], { time: '12 min', done: 'Turkey browned. Whites set.' }),
  ketoSteakGreens: note('Hot skillet. Broccoli first or microwave.', [
    'Warm the broccoli with the oil.',
    'Pat the steak dry. Salt it. Sear 3 to 4 minutes a side.',
    'Rest the steak. Slice across the grain.',
  ], { time: '20 min', done: 'Steak rested. Broccoli tender.' }),
  ketoShrimpAvocado: note('Hot pan. Fast shrimp.', [
    'Pat the shrimp dry. Salt them.',
    'Hot skillet, thin oil. 2 minutes a side.',
    'Cucumber and avocado on the plate.',
  ], { time: '12 min', done: 'Shrimp pink and curled.' }),
  ketoPorkGreens: note('Skillet or sheet pan.', [
    'Salt the pork. Cook 4 to 5 minutes a side or to 145.',
    'Rest 3 minutes. Green beans with the oil.',
  ], { time: '22 min', done: 'Pork 145. Beans tender.' }),
  ketoBisonCauli: note('Hot skillet for the bison.', [
    'Salt the bison. Cook to just pink or 145. Rest 3 minutes.',
    'Warm the cauliflower with the oil.',
  ], { time: '22 min', done: 'Bison rested. Cauliflower warm.' }),
  ketoAhiBroccoli: note('Hot pan. Center stays rare.', [
    'Pat the ahi dry. Salt it. Sear 1 minute a side.',
    'Broccoli warmed with the oil. Slice the ahi.',
  ], { time: '15 min', done: 'Outside browned. Center still pink.' }),
  ketoTurkeyCauli: note('Skillet. Cheese optional.', [
    'Brown the turkey. Wait for color before you stir.',
    'Cauliflower with the oil on the side.',
  ], { time: '18 min', done: 'Turkey browned, no pink left.' }),
  ketoStringCheese: note('No heat.', [
    'String cheese and turkey on a plate.',
  ], { time: '2 min' }),
  ketoEggsOlives: note('Skillet or hard-boiled.', [
    'Fry or scramble the eggs until the whites set.',
    'Olives on the side.',
  ], { time: '8 min', done: 'Whites set.' }),
  carnBeefBreakfast: note('Skillet. Beef first.', [
    'Brown the beef. Salt as it cooks.',
    'Push aside. Butter. Eggs until the whites set.',
  ], { time: '14 min', done: 'Beef browned. Whites set.' }),
  carnChickenBreakfast: note('Chicken is cooked. Eggs need the pan.', [
    'Warm the chicken if you want it hot.',
    'Fry the eggs in butter until the whites set.',
  ], { time: '10 min', done: 'Whites set.' }),
  carnSteakBreakfast: note('Hot skillet. Steak first.', [
    'Pat the steak dry. Salt it. 3 to 4 minutes a side. Rest.',
    'Same pan, butter, eggs until the whites set.',
  ], { time: '16 min', done: 'Steak rested. Whites set.' }),
  carnSalmonEggsLunch: note('Fish first, then eggs.', [
    'Salmon skin-down if it has skin. 4 minutes a side or until it flakes.',
    'Eggs in the same pan until the whites set.',
  ], { time: '14 min', done: 'Salmon flakes. Whites set.' }),
  carnSteakCheese: note('Hot skillet. Cheese at the end.', [
    'Pat the steak dry. Salt it. 3 to 4 minutes a side. Rest.',
    'Cheddar on the hot steak so it softens.',
  ], { time: '16 min', done: 'Steak rested. Cheese soft.' }),
  carnCodEggs: note('Gentle heat for the cod.', [
    'Cod in a lightly buttered pan on medium. 4 minutes a side.',
    'Eggs beside it until the whites set.',
  ], { time: '14 min', done: 'Cod flakes. Whites set.' }),
  carnShrimpEggs: note('Hot pan. Fast shrimp.', [
    'Pat the shrimp dry. Butter. 2 minutes a side.',
    'Eggs in the same pan until the whites set.',
  ], { time: '14 min', done: 'Shrimp pink. Whites set.' }),
  carnTurkeyButter: note('Skillet. Butter at the end.', [
    'Brown the turkey. Wait for color before you stir.',
    'Off the heat, stir in the butter.',
  ], { time: '15 min', done: 'Turkey browned, no pink left.' }),
  carnChickenButter: note('Already cooked. Just warm it.', [
    'Warm the chicken.',
    'Butter on the hot chicken.',
  ], { time: '10 min', done: 'Chicken hot. Butter melted.' }),
  carnStringCheese: note('No heat.', [
    'String cheese and turkey.',
  ], { time: '1 min' }),
  carnCottageSnack: note('No heat.', [
    'Cottage cheese in a cup.',
  ], { time: '1 min' }),
  carnBeefCheese: note('Skillet. Cheese off the heat.', [
    'Brown the beef. Salt as it cooks.',
    'Off the heat, melt the cheddar on top.',
  ], { time: '12 min', done: 'Beef browned. Cheese melted.' }),
}

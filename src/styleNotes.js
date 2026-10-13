function note(preview, locked, extra = {}) {
  return { preview, locked, time: extra.time || '', done: extra.done || '', ahead: extra.ahead || '' }
}

export const STYLE_NOTES = {
  ketoSausageEggs: note('Skillet. Sausage first so the pan is hot for the eggs.', [
    'Heat a skillet over medium. Cook the sausage until hot through and lightly browned, about 4–5 minutes.',
    'Push it aside. Crack in the eggs and cook until the whites are fully set.',
    'Add the spinach for the last 20 seconds until just wilted.',
  ], { time: '12 min', done: 'Sausage is hot. Egg whites are set.' }),
  ketoFetaEggs: note('Skillet. Cheese off the heat.', [
    'Scramble the eggs on medium until just set.',
    'Off the heat, crumble feta on top.',
    'Spinach on the side or wilted in the pan.',
  ], { time: '10 min', done: 'Eggs glossy. Feta soft.' }),
  ketoTurkeyBreakfast: note('Skillet. Turkey first.', [
    'Brown the turkey on medium-high. Salt as it cooks.',
    'Push aside. Fry the eggs until the whites set.',
  ], { time: '12 min', done: 'Turkey browned. Whites set.' }),
  ketoSteakGreens: note('Hot skillet. Broccoli can be warmed in the pan or microwave.', [
    'Warm the broccoli with the oil until tender.',
    'Pat the steak dry and salt it. Sear 3–4 minutes per side over medium-high.',
    'Rest the steak 3–5 minutes, then slice against the grain.',
  ], { time: '20 min', done: 'Steak has rested. Broccoli is tender.' }),
  ketoShrimpAvocado: note('Hot pan. Fast shrimp.', [
    'Pat the shrimp dry and salt them.',
    'Heat a skillet over medium-high with a thin film of oil. Cook shrimp 2 minutes per side until pink and curled.',
    'Plate with cucumber and avocado.',
  ], { time: '12 min', done: 'Shrimp are pink and curled.' }),
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
  carnBeefBreakfast: note('Skillet. Beef first so the pan is hot for the eggs.', [
    'Heat a skillet over medium-high. Brown the beef, salting as it cooks, until no pink remains.',
    'Push the beef aside. Add the butter and fry the eggs until the whites are fully set.',
  ], { time: '14 min', done: 'Beef is browned. Egg whites are set.' }),
  carnChickenBreakfast: note('Chicken is cooked. Eggs need the pan.', [
    'Warm the chicken if you want it hot.',
    'Fry the eggs in butter until the whites set.',
  ], { time: '10 min', done: 'Whites set.' }),
  carnSteakBreakfast: note('Hot skillet. Steak first, then eggs in the same pan.', [
    'Pat the steak dry and salt it. Sear 3–4 minutes per side. Rest.',
    'In the same pan over medium, add butter and fry the eggs until the whites are fully set.',
  ], { time: '16 min', done: 'Steak has rested. Egg whites are set.' }),
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
  ketoBaconEggs: note('Skillet. Bacon first.', [
    'Cook the bacon over medium until crisp, about 5–6 minutes. Drain excess fat if you like.',
    'Push aside. Cook the eggs until the whites are fully set.',
    'Add the spinach for the last 20 seconds until just wilted.',
  ], { time: '12 min', done: 'Bacon is crisp. Egg whites are set.' }),
  ketoCheddarOmelet: note('Skillet. Cheese goes in off the heat so it melts without overcooking.', [
    'Beat the eggs. Heat a nonstick skillet over medium and cook until the eggs are almost set, about 2 minutes.',
    'Add the cheddar, fold the omelet, and take it off the heat so the cheese melts gently.',
  ], { time: '10 min', done: 'Omelet is set. Cheese is melted.' }),
  ketoSmokedSalmonEggs: note('Eggs on the side.', [
    'Fry or scramble the eggs until the whites set.',
    'Smoked salmon and avocado on the plate.',
  ], { time: '8 min', done: 'Whites set.' }),
  ketoChickenAvocado: note('No cook for the chicken.', [
    'Warm the chicken if you want it hot.',
    'Avocado and lettuce on the plate. Oil over.',
  ], { time: '8 min' }),
  ketoTunaAvocado: note('No heat.', [
    'Tuna and avocado mixed or side by side. Oil over.',
  ], { time: '6 min' }),
  ketoLambGreens: note('Skillet. Lamb first.', [
    'Brown the lamb. Salt as it cooks.',
    'Broccoli with the oil on the side or in the pan.',
  ], { time: '20 min', done: 'Lamb browned. Broccoli tender.' }),
  ketoRibeyeAsparagus: note('Hot skillet. Steak first.', [
    'Pat the ribeye dry and salt it. Sear 4–5 minutes per side over medium-high. Rest 5 minutes.',
    'Warm the asparagus with the butter until tender.',
  ], { time: '20 min', done: 'Steak has rested. Asparagus is tender.' }),
  ketoPorkChopsCauli: note('Skillet or sheet pan.', [
    'Salt the chops. Cook 4 to 5 minutes a side or to 145. Rest.',
    'Cauliflower with the oil.',
  ], { time: '22 min', done: 'Pork 145. Cauliflower warm.' }),
  ketoSalmonCauli: note('Fish first.', [
    'Salmon skin-down if it has skin. 4 minutes a side or until it flakes.',
    'Cauliflower with the oil on the side.',
  ], { time: '22 min', done: 'Salmon flakes. Cauliflower warm.' }),
  ketoOlivesTurkey: note('No heat.', [
    'Olives and turkey on a plate.',
  ], { time: '2 min' }),
  ketoCheeseCucumber: note('No heat.', [
    'Cheddar and cucumber slices.',
  ], { time: '3 min' }),
  carnBaconEggs: note('Skillet. Bacon first.', [
    'Cook bacon until crisp.',
    'Push aside. Butter. Eggs until the whites set.',
  ], { time: '12 min', done: 'Bacon crisp. Whites set.' }),
  carnPorkEggsBreakfast: note('Skillet. Pork first.', [
    'Salt the pork. Cook 3 to 4 minutes a side or to 145. Rest.',
    'Same pan, butter, eggs until the whites set.',
  ], { time: '14 min', done: 'Pork 145. Whites set.' }),
  carnLambEggs: note('Skillet. Lamb first.', [
    'Brown the lamb. Salt as it cooks.',
    'Push aside. Butter. Eggs until the whites set.',
  ], { time: '14 min', done: 'Lamb browned. Whites set.' }),
  carnRibeyeButter: note('Hot skillet.', [
    'Pat the ribeye dry. Salt it. Sear 4 minutes a side. Rest.',
    'Butter on the hot steak.',
  ], { time: '16 min', done: 'Steak rested. Butter melted.' }),
  carnChickenThighButter: note('Skillet or oven. Skin-side down first for crisp skin.', [
    'Salt the thighs. Cook skin-side down over medium until the skin is crisp, then flip and cook to 165°F. Rest 3 minutes.',
    'Add the butter to the hot chicken so it melts over the top.',
  ], { time: '20 min', done: 'Chicken reaches 165°F. Butter is melted.' }),
  carnGroundBeefCheese: note('Skillet. Cheese off the heat so it melts without drying the beef.', [
    'Brown the beef over medium-high, salting as it cooks, until no pink remains.',
    'Off the heat, melt the cheddar on top. Add butter if you want.',
  ], { time: '15 min', done: 'Beef is browned. Cheese is melted.' }),
  carnPorkButter: note('Skillet.', [
    'Salt the pork. Cook 4 to 5 minutes a side or to 145. Rest.',
    'Butter on the hot pork.',
  ], { time: '18 min', done: 'Pork 145. Butter melted.' }),
  carnBaconCheese: note('No heat or warm bacon.', [
    'Bacon and cheddar on a plate.',
  ], { time: '8 min' }),
  carnEggButter: note('Skillet.', [
    'Fry the eggs in butter until the whites set.',
  ], { time: '6 min', done: 'Whites set.' }),
  carnBeefBatch: note('Batch brown, portion with the fat.', [
    'Brown 3–5 lb of 80/20 ground beef with salt over medium-high. Let it color before you stir.',
    'Portion into containers with some of the rendered fat.',
    'To serve: reheat a portion in a skillet over medium until hot. Optional: mix in a little cooked liver.',
  ], { time: '15 min reheat', done: 'Beef is hot through. Fat is melted back in.' }),
  carnChuckRoast: note('Slow-cook or braise once. Portion with juices.', [
    'Salt a chuck roast or brisket. Slow-cook or braise until tender, then shred or slice.',
    'Store with some of the juices.',
    'To serve: reheat a portion with a spoonful of juices until hot.',
  ], { time: '10 min reheat', done: 'Meat is hot and still moist.' }),
  carnBaconHardEggs: note('Cook a package of bacon and a dozen eggs once.', [
    'Cook a full package of bacon until crisp. Hard-boil a dozen eggs.',
    'Portion 3–4 strips of bacon and 2–3 eggs per container.',
    'To serve: warm the bacon briefly if you want it hot. Eggs can stay cold.',
  ], { time: '5 min', done: 'Bacon is warm if you want it. Eggs are ready.' }),
  carnThighsBatch: note('Roast or air-fry a tray of skin-on thighs.', [
    'Salt bone-in, skin-on chicken thighs. Roast or air-fry until the skin is crisp and the meat reaches 165°F.',
    'Store skin-side up.',
    'To serve: reheat and briefly re-crisp the skin under a broiler or in a hot skillet if you want.',
  ], { time: '8 min reheat', done: 'Thighs are hot. Skin can be re-crisped if desired.' }),
  carnRibeyePortion: note('Cook several steaks to medium-rare. Best within 2–3 days.', [
    'Salt ribeyes or NY strips. Cook to medium-rare. Cool quickly and refrigerate.',
    'To serve: reheat gently in a skillet and finish with butter.',
  ], { time: '8 min reheat', done: 'Steak is warm through. Butter is melted on top.' }),
  carnPorkBelly: note('Roast or pan-cook until crisp outside and tender inside.', [
    'Salt pork belly or thick-cut bacon. Roast or pan-cook until the outside is crisp and the inside is tender.',
    'Portion and store.',
    'To serve: reheat in a skillet until the edges crisp again.',
  ], { time: '10 min reheat', done: 'Outside is crisp. Inside is hot.' }),
  carnSalmonPortion: note('Cook earlier in the week. Fish is more perishable.', [
    'Pan-sear or bake skin-on salmon in butter until it flakes.',
    'Portion and refrigerate. Best eaten within 2–3 days.',
    'To serve: reheat gently or eat cold. Keep canned sardines as a no-cook backup.',
  ], { time: '10 min', done: 'Salmon flakes and is hot (or cold if preferred).' }),
  carnLiverBeef: note('Mix 10–20% liver into a ground beef batch.', [
    'Cook beef liver until just done. Chop or blend it.',
    'Mix 10–20% into a batch of browned ground beef so the flavor stays mild.',
    'Portion and store. Reheat a portion in a skillet.',
  ], { time: '12 min', done: 'Mixture is hot. Liver is evenly mixed.' }),
  carnLambPortion: note('Roast a shoulder or batch of chops for variety.', [
    'Salt a lamb shoulder or chops. Roast until tender.',
    'Slice or portion and store.',
    'To serve: reheat a portion until hot.',
  ], { time: '10 min reheat', done: 'Lamb is hot and tender.' }),
  carnScramblePack: note('Scramble a large batch in bacon fat. Portion with extra bacon.', [
    'Cook a batch of bacon. Scramble eggs in the bacon fat until just set.',
    'Portion the scramble with extra cooked bacon into containers.',
    'To serve: reheat gently in a skillet or microwave until hot.',
  ], { time: '8 min reheat', done: 'Scramble is hot. Bacon is crisp or warm.' }),

}

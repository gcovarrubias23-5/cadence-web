export const KITCHEN = {
  overnightOats: {
    preview: 'Make this the night before.',
    locked: [
      'Add the oats to a jar or bowl.',
      'Stir in the yogurt (or milk) until every oat is wet.',
      'Cover and chill at least 8 hours.',
      'In the morning, stir once. Add the berries on top so they stay bright.',
    ],
  },
  shrimpTacos: {
    preview: 'Hot pan. Fast cook.',
    locked: [
      'Pat the shrimp dry and salt them.',
      'Heat a pan until a drop of water jumps.',
      'Cook the shrimp in one layer, 2 minutes a side. Do not crowd the pan.',
      'Warm the tortillas in a dry pan.',
      'Build: shrimp, cabbage, salsa, lime. Nothing sits in the pan after it is cooked.',
    ],
  },
  salmon: {
    preview: 'One pan. Beans first, then the fish.',
    locked: [
      'Heat the oven to 425. Line a pan.',
      'Toss the green beans with the oil. Spread them out. Roast 8 to 10 minutes.',
      'Move the beans to the side. Set the salmon on the same pan.',
      'Roast 10 to 12 minutes more, until the thickest part flakes and looks just opaque.',
      'Rice on the plate. Lemon on the fish at the table, not in the oven the whole time.',
    ],
  },
  lemonChicken: {
    preview: 'One pan. Potato and chicken first. Broccoli later.',
    locked: [
      'Heat the oven to 425.',
      'Cut the potato. Toss the thighs and potato with oil, salt, and lemon juice.',
      'Spread on a pan. Roast 15 minutes.',
      'Add the broccoli around the chicken. Roast 12 to 15 minutes more.',
      'Chicken is done at 165 in the thickest part. Rest 3 minutes. Spoon the pan juices over.',
    ],
  },
  rotisserieBowl: {
    preview: 'Warm the grain. Do not recook the chicken.',
    locked: [
      'Warm the quinoa with a splash of water until hot.',
      'Pull the rotisserie chicken into bite-size pieces.',
      'Bowl: quinoa, chicken, cauli rice, salsa.',
      'Eat the cauli rice cold or flash it in the same pan for 2 minutes if you want it warm.',
    ],
  },
}

const BY_NAME = {
  'Overnight oats': 'overnightOats',
  'Shrimp tacos': 'shrimpTacos',
  'Salmon and green beans': 'salmon',
  'Lemon chicken and potato': 'lemonChicken',
  'Rotisserie bowl': 'rotisserieBowl',
}

export function kitchenFor(meal) {
  if (!meal) return null
  return KITCHEN[meal.id] || KITCHEN[BY_NAME[meal.name]] || null
}

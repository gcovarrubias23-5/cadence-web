export const KITCHEN = {
  overnightOats: {
    preview: 'Make this the night before.',
    locked: [
      'Add the oats to a jar or lidded bowl.',
      'Stir in the yogurt (or milk) until every oat is wet.',
      'Cover and chill at least 8 hours.',
      'In the morning, stir once. Add the berries on top so they stay bright.',
    ],
  },
  shrimpTacos: {
    preview: 'Hot pan. Fast cook.',
    locked: [
      'Pat the shrimp dry with a paper towel and salt them.',
      'Set a skillet over medium-high. No oil yet until the pan is hot.',
      'Add a thin film of oil. Cook the shrimp in one layer, 2 minutes a side. Do not crowd the pan.',
      'Warm the tortillas in a dry second pan or over the same burner after the shrimp come off.',
      'Build: shrimp, cabbage, salsa, lime.',
    ],
  },
  salmon: {
    preview: 'One sheet pan. Beans first, then the fish.',
    locked: [
      'Heat the oven to 425.',
      'Line a rimmed sheet pan with parchment paper. Foil works if you spray it so the fish does not stick.',
      'Toss the green beans with the oil on the paper. Spread them out. Roast 8 to 10 minutes.',
      'Push the beans to the side. Set the salmon on the same paper, skin side down if it has skin.',
      'Roast 10 to 12 minutes more, until the thickest part flakes and looks just opaque.',
      'Rice on the plate. Lemon on the fish at the table.',
    ],
  },
  lemonChicken: {
    preview: 'One sheet pan. Potato and chicken first. Broccoli later.',
    locked: [
      'Heat the oven to 425.',
      'Line a rimmed sheet pan with parchment paper. If you only have foil, spray or oil it.',
      'Cut the potato. Toss the thighs and potato with oil, salt, and lemon juice in a bowl first, then onto the paper.',
      'Spread in one layer. Roast 15 minutes.',
      'Add the broccoli around the chicken. Roast 12 to 15 minutes more.',
      'Chicken is done at 165 in the thickest part. Rest 3 minutes. Spoon the pan juices over.',
    ],
  },
  rotisserieBowl: {
    preview: 'Warm the grain. Do not recook the chicken.',
    locked: [
      'Warm the quinoa in a small pot or bowl with a splash of water until hot.',
      'Pull the rotisserie chicken into bite-size pieces. No extra pan needed.',
      'Bowl: quinoa, chicken, cauli rice, salsa.',
      'Eat the cauli rice cold, or warm it 2 minutes in a nonstick skillet.',
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

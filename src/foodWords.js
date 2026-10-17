// Shared food-word patterns, so "egg" and "butter" mean the same thing in
// skip rules, portions, and plate display.

// Whole egg or egg white; not eggplant, not "veggie".
export const EGG = /\begg(?!plant)|eggs\b/i

// Dairy butter; not peanut/almond/cashew/other nut, seed, soy, apple, or cocoa butter.
export const DAIRY_BUTTER = /(?<!(?:nut|seed|almond|cashew|pecan|pistachio|macadamia|sunflower|sun|soy|apple|pumpkin|cocoa|shea)\s?)butter/i

export function isWholeEgg(name = '') {
  return EGG.test(name) && !/egg white/i.test(name)
}

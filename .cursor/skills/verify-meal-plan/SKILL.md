---
name: verify-meal-plan
description: "Check a change to Cadence's week generator, skip/diet filters, portion scaling, or shopping list against the meal-plan properties. Use when editing src/rotateWeek.js, src/plan.js, src/avoid.js, src/dietStyle.js, src/macros.js, src/snacks.js, src/catalog*.js, src/styleMore.js, or src/weekSpin.js."
---

# Verify the meal plan

Cadence promises five things about every week it builds. A break shows up on a
person's phone as a repeated plate, a food they told us they can't eat, a day
over their calories, or a shopping list that doesn't match the plates.

There is no prover for this JavaScript, so the check is **property-based
testing on the real code**: fast-check (pinned in package.json) generates
hundreds of seeds, skip sets, diet styles, macro targets, and arbitrary stored
weeks, calls the functions in `src/`, and shrinks any failure to a small
counterexample. This covers the generated input space, not every input (see Scope).

## Does my change touch this?

Yes if the diff touches any file in the description, or adds/renames meals or
foods (ids, names, `aisle`, `foods`), or changes `SLOTS`, `poolOf`,
`optionsFor`, `firstSafe`, `dedupeWeek`, `cleanWeek`, `buildVariedWeek`,
`factorsForDay`, `scaleForSlot`, `dayTotals`, `groceryFromWeek`,
`resolveFood`, `scaleFood`, `mealHitsAvoid`, or `mealFitsStyle`.

Quick test: `git diff <sync commit> --stat -- src/rotateWeek.js src/plan.js src/avoid.js src/dietStyle.js src/macros.js src/snacks.js src/catalog.js src/catalogExtras.js src/catalogAdd.js src/catalogStyle.js src/styleMore.js src/weekSpin.js`

## Run it

```
npm run test:properties     # ~3 s, the 12 property and regression tests (also part of npm test / npm run check / CI)
npm run verify:mutations    # ~15 s, proves each property can still fail
```

`npm run check` runs vitest, so the properties run on every branch in CI
(.github/workflows: `npm ci` then `npm run check`). `verify:mutations` is not
in check; run it after editing the property tests or the code they cover.
It refuses to run while `src/` has uncommitted edits and restores each file.

## The properties (test/properties/mealPlan.property.test.js)

| ID | Promise (plain words) | Harm if broken | Code |
|----|----|----|----|
| P1a | A generated day never shows the same meal twice. | The "Grapes and turkey three times on Monday" bug (PR #6). | `buildVariedWeek` in src/rotateWeek.js |
| P1b | Repairing any stored week removes same-day repeats and keeps the plate the person just chose. | Old saved weeks keep the repeat; a person's choice gets overwritten. | `dedupeWeek`, `firstSafe` in src/plan.js |
| P2a | No meal appears more than ceil(uses / meals in its list) times a week; the 3 snacks share one list. | Same plate all week while others sit unused. | `buildVariedWeek` least-used pick, `poolOf` |
| P2b | A slot is left empty ("Choose a plate") only when no meal is left for it that day. | Empty plates for no reason. | `buildVariedWeek` `if (!open.length)` |
| P3a | Generated weeks never contain a skipped food (by the skip rules, and for dairy also by the independent rule "no food in the Dairy aisle") and never a meal outside the chosen style. | Allergy/intolerance exposure; keto/carnivore broken. | `optionsFor`, `safeMeals`, `mealHitsAvoid` (src/avoid.js), `mealFitsStyle` (src/dietStyle.js) |
| P3b | `cleanWeek` removes every skipped/off-style meal from a stored week; when nothing safe is left, or the stored id is unknown, the slot becomes empty. (Was finding F1, fixed; regression tests in the `F1 regressions` block.) | Same as P3a after a person changes skips or style. | `cleanWeek`, `firstSafe` fallback, `mealOf` fallback |
| P4 | After portion scaling, a day never shows more kcal than the target (`goal.kcal`). The code does not promise to reach the target (factors clamp to 0.35–2.2), only not to exceed it. | Over-eating vs. the plan. | `factorsForDay`, `scaleForSlot`, `dayTotals` in src/macros.js |
| P5 | Each shopping-list line equals the summed scaled grams of that food (by aisle + name) across the week's plates, with no extra, missing, or duplicate lines; `leftover`/`pantry` foods are excluded. | Buying too little/too much, or missing items. | `groceryFromWeek`, `resolveFood`, `scaleFood` |

Generators: seed in [-100000, 100000]; any subset of the 9 skips in
`AVOIDS`; style '', 'keto', 'carnivore'; protein 40–300 g, carbs 0–450 g,
fat 15–180 g; stored weeks of 7 days with any catalog meal id or '' per slot.
300 runs per property (150 for P5).

## Findings

No open findings.

**F1 (fixed on fix/saved-week-skips): `cleanWeek` could put a skipped food back into the week.**
Before the fix, when a slot had no safe meal, `firstSafe` returned a hard-coded
fallback without checking skips, and `mealOf` turned unknown ids into
`MEALS.yogurtBerries`. Counterexamples, now regression tests:
1. Carnivore, skip Dairy: lunch became `carnBeefEggs`, an id no catalog has, which showed as Yogurt and berries.
2. Keto, skip Dairy + Egg: breakfast became `ketoEggsAvocado` (eggs).
3. Carnivore, skip Dairy + Egg: snacks became `carnTurkeyCheese` (cheese).
Now `firstSafe` returns '' when no safe meal is open, `mealOf` returns null
for unknown ids, and `cleanWeek` clears unknown ids, so the slot shows
"Choose a plate", the same as an empty slot from `buildVariedWeek`.

## Mutation evidence (scripts/mutate-meal-plan.sh, all caught at sync commit)

P1 day check removed from buildVariedWeek; P1 dedupeWeek stops replacing
repeats; P2 least-used pick replaced by any open meal; P2 Sunday late snack
dropped although meals remain; P3 optionsFor ignores skips; P3 optionsFor
ignores diet style; P3 dairy rule loses "yogurt"; P4 over-target shrink
loosened to 125%; P5 grocery skips produce; P5 grocery ignores portion scaling;
F1 firstSafe falls back to a fixed meal again; F1 mealOf turns unknown ids into
yogurt again (12 of 12 caught). Before the F1 fix, P3b and the 4 F1 regression
tests failed on the old src/plan.js.
(A mutant removing "cheese" from the dairy rule is equivalent: other words
still match every cheese in the catalog, so nothing changes.)

## Real bug or modeling error?

Read the shrunk counterexample (fast-check prints seed/skips/style or the
stored week). Rebuild it in node with the same call
(`buildVariedWeek([], avoid, seed, style)` etc. with `test/memoryStorage.js`
installed). If the app would show that plate to a person, it is a real bug:
report it, don't loosen the property. If the property assumes something the
code never promised (for example a new intentional rule), update the property
and this file together and say so in the PR. Never delete a property or swap
`it` for `it.fails`/`skip` to get green without recording it under Findings.

## Out of scope

Custom (user-made) meals are not generated; `adaptWeek.js`, `weekPlan.js`
prep/leftover meals, `shopQty` unit rounding, `shopPaste`/Instacart text,
locked meals in `factorsForDay`, and React UI are not checked. Skip detection
is only as good as the regexes in src/avoid.js (P3 checks dairy independently
by aisle; other skips rely on those regexes).

## Coverage record

Files: src/rotateWeek.js, src/plan.js, src/avoid.js, src/dietStyle.js,
src/macros.js, src/snacks.js, src/catalog.js, src/catalogExtras.js,
src/catalogAdd.js, src/catalogStyle.js, src/styleMore.js.
Sync commit: 454dae5 (verified on branch verify/meal-plan-properties, based on
fix/no-repeat-meals cd5aec6). Move the sync commit forward only after running
both commands above on the new commit and confirming each property still
describes the code (including the F1 status).
For bigger drift, use /maintain-formal-verification-skill.

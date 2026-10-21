#!/usr/bin/env bash
# Mutation check for test/properties/mealPlan.property.test.js.
# Applies one deliberate bug at a time to src/, runs the property tests, and
# expects them to FAIL. Restores the file after each run. Never commit a mutant.
set -u
cd "$(dirname "$0")/.."
if ! git diff --quiet -- src; then echo "src/ has uncommitted changes; commit or stash first"; exit 2; fi
T=test/properties/mealPlan.property.test.js
pass=0; fail=0
mutate() { # name file perl-substitution test-filter
  local name="$1" file="$2" sub="$3" filter="$4"
  perl -0pi -e "$sub" "$file"
  if git diff --quiet -- "$file"; then echo "MUTATION DID NOT APPLY: $name"; fail=$((fail+1)); return; fi
  if npx vitest run "$T" -t "$filter" >/dev/null 2>&1; then
    echo "SURVIVED (bad): $name"; fail=$((fail+1))
  else
    echo "caught: $name"; pass=$((pass+1))
  fi
  git checkout -- "$file"
}
mutate "P1 day check removed from buildVariedWeek" src/rotateWeek.js 's/\.filter\(\(id\) => !today\.has\(id\)\)//' "P1"
mutate "P1 dedupeWeek stops replacing repeats" src/plan.js 's/if \(seen\.has\(id\)\) next/if (false \&\& seen.has(id)) next/' "P1"
mutate "P2 least-used pick replaced by any open meal" src/rotateWeek.js 's/const ties = open\.filter\(\(id\) => used\(id\) === least\)/const ties = open/' "P2"
mutate "P2 Sunday late snack dropped although meals remain" src/rotateWeek.js 's/if \(!open\.length\) \{/if (!open.length || (di === 6 \&\& si === 5)) {/' "P2"
mutate "P3 optionsFor ignores skips" src/plan.js 's/\], avoid\)\.filter\(\(m\) => mealFitsStyle\(m, style\)\)/], []).filter((m) => mealFitsStyle(m, style))/' "P3 skips and diet style never leak generated"
mutate "P3 optionsFor ignores diet style" src/plan.js 's/\], avoid\)\.filter\(\(m\) => mealFitsStyle\(m, style\)\)/], avoid)/' "P3 skips and diet style never leak generated"
mutate "P3 dairy rule loses yogurt" src/avoid.js 's/dairy: \[\/yogurt\|/dairy: [\//' "P3 skips and diet style never leak generated"
mutate "P4 over-target shrink removed" src/macros.js 's/if \(shown > target\) \{/if (shown > target * 1.25) {/' "P4"
mutate "P5 grocery skips produce" src/macros.js 's/if \(food\.leftover \|\| food\.pantry\) return/if (food.leftover || food.pantry || food.aisle === "Produce") return/' "P5"
mutate "P5 grocery ignores portion scaling" src/macros.js 's/prev\.grams \+= scaled\.grams/prev.grams += resolved.grams/' "P5"
echo "caught $pass, problems $fail"
[ "$fail" -eq 0 ]

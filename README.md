# Math Ink · Tutor Mode

A student-led algebra workspace in one file: [`math-ink.html`](math-ink.html). Open it in a modern browser. No installation or account is required.

## Work a problem

1. Type or handwrite the original equation, then press **Enter** or **Check My Step**. For example: `16 - 3p = 2/3p + 5`.
2. Choose **+ − × ÷**, enter your operand, and select **Set up operation**. Each side appears vertically with the operation underneath, a horizontal line, and an empty result field.
3. Calculate and enter **both** results. **Check My Step** saves them only when both match your chosen operation. Incorrect or missing results remain editable. You cannot stack another operation until you finish or cancel this one.
4. Continue with another operation, or type/handwrite an equivalent next equation. Three progressive hints offer guidance without filling answers.
5. Open **Verify your final answer**, enter the variable value you found, and set up substitution. Calculate both sides of the *original* equation yourself. The app checks your calculations and whether the sides agree.

Math Ink never displays a generated algebra solution or fills the answer fields. The checker uses exact rational arithmetic, not floating-point guesses or sampled variable values.

## Thinking tools

- **Math keypad:** inserts at the cursor in the last selected math input; includes variables, fractions, parentheses, signs, and backspace.
- **Fraction / LCD helper:** computes a common denominator, then checks a numerator you supply for an equivalent fraction. For example, practice `-3 = ? / 3`.
- **Reciprocal helper:** checks your proposed reciprocal. You explicitly choose whether to use it on both sides.
- **Sign check:** requires a sign choice when multiplication/division involves a negative and a numeric right side.
- **Scratchpad:** optional independent ink, with undo and clear. It is not recognized or transmitted.
- **Progress:** cumulative checked steps, retries, hints, verified problems, skill counts, and recent mistake notes are stored in this browser's local storage. Worksheet history and ink are session-only. **New problem** clears the worksheet but retains progress.

## Handwriting and history

Enable **Handwriting input** for the original drawing canvas, symbol corrections, alternatives, and fraction recognition. The canvas supports mouse, touch, and pen. Use Undo/Clear for drawing and Enter to check the recognized equation. Review recognized symbols before submitting.

Equation history, Paper/Inline/Classic layouts, and plain-text/LaTeX copy exports remain available. Checked operations are retained vertically in history. Editing/deleting a Tutor Mode line removes its following dependent steps so you can recheck them. In free writing, history lines are independently editable as before.

Turn off **Tutor Mode** for unrestricted mathematical writing and the original operation workflow. Turning it back on uses the latest equation as a new verification baseline; earlier free-writing steps are not retroactively checked.

## Supported math and notation

Tutor checks support **one-variable linear equations**, integer/decimal/fraction coefficients, parentheses, distribution, and implicit multiplication such as `3p` or `2(x+1)`. Basic braced LaTeX fractions are accepted. `2/3p` means `(2/3)p`; use explicit parentheses to disambiguate division. Numeric calculations are exact, so rounded answers may not pass.

Nonlinear expressions, multiple variables, variable denominators, functions, and inequalities are not checked; use free writing for those. Multiplying/dividing both sides by zero or a variable is blocked in Tutor Mode. Numerical integer powers up to 10 are supported. Inputs are limited to 300 characters.

The app checks mathematical equivalence, not whether a step is the shortest or most simplified form. Students still choose their strategy and enter all results.

## Connectivity and privacy

- Tutor checks, hints, keypad, helpers, scratchpad, and progress work locally, including offline.
- Typesetting loads KaTeX from cdnjs; without it, math falls back to plain notation.
- The **handwriting input** uses Google's handwriting service (`inputtools.google.com`). Its ink strokes are sent for recognition and need connectivity. This existing undocumented service can change or become unavailable; typed input remains usable.
- Browser storage may be unavailable in private/restricted modes; the current session still works. Storage is specific to the browser and origin/file behavior.

## Validation

Run the dependency-free tests with Node.js:

```sh
node --test tests/tutor-math.test.cjs
```

Tests cover exact fractions/decimals, distribution, signs, equation solution-set preservation (including identities/contradictions), side-specific operation checks, unsupported math, and fraction rendering consistency.

Browser smoke checks covered the full `16-3p=2/3p+5` workflow through student-entered `p=3` and `7=7` verification, wrong results, pending-operation guards, required signs, reciprocal and LCD/fraction helpers, keypad insertion, direct equivalent steps, handwriting symbol recognition/undo, and scratchpad controls.

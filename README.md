# Math Ink

Draw math with your mouse or trackpad and get typed, typeset output instantly. Then keep working the problem line by line, like on paper. Everything lives in a single file: [`math-ink.html`](math-ink.html). There is nothing to install.

## Run it

Download or clone this repo and double-click `math-ink.html` (or `open math-ink.html`).
Works in Safari, Chrome and Firefox. Handwriting recognition and the typeset display need an internet connection.

## What it does

- **Handwriting to math:** digits, letters, operators and symbols (+ − × ÷ = ≤ ≥ ≠ ± π ∞, Greek letters…).
- **2-D layout:** stacked fractions (flat bar or diagonal slash), exponents and subscripts, square roots.
- **Line-by-line working:** press **Enter** (or *Next line*) to lock a line; the next one starts below it. Click a locked line to redraw it.
- **Do the same to both sides:** pick `+ − × ÷` and a value (or type a shorthand like `-1`, `*2` in the keyboard box); the app writes the operation applied to both sides, unsimplified. You simplify on the next line. The app never solves for you.
- **Keyboard input:** type a line instead (`12 - 1/5 r = 2r + 1`, `sqrt(x)`, `pi`, or LaTeX).
- **Corrections:** a symbol strip under the canvas shows alternatives for each detected symbol. Click a `?` in the typeset to type its value.
- **Output:** plain text and LaTeX (aligned) for all lines, with Copy buttons.
- **Layouts:** Paper (default), Inline row, Classic. Switch from the header.

## Notes

- Recognition uses Google's handwriting service (`inputtools.google.com`), an undocumented endpoint that may change or stop working. Ink strokes are sent to it as you draw.
- Typeset rendering uses [KaTeX](https://katex.org) from cdnjs.
- Typed input is a simple converter, not a full equation parser.

# Weiß Schwarz Probability Calculator

* runs 100% in browser
* shareable via url, the whole state gets stored in the url

## Current Limitations

* ignores level-up

## Examples

DISCLAIMER: no idea if correct

* [3x Ichika 5HY/W83](https://kokutoru.github.io/ws-probability-calculator/?JJCHJfoamKkY5Xvf99yLEqP*14dCUvikDI30S4AK57iY-jWEqVXigV4OrBFb-fwBQ4NVYuf_frSQ0Ql-GoU46bFQwi2z_x3Nf7NS0f2PTt72g9fn0LPCA)
* [3x Itsuki 5HY/W90](https://kokutoru.github.io/ws-probability-calculator/?mTAdHkyYWiBFjPnSoo9QChNSyPiqZOjsRVTmuHoN*f4xGATxpCl9gkQX_GndfDf..6mU3di3SERXVvTbZmzmQ)
* [1x Yuyu + 2x Riri ALL/S76](https://kokutoru.github.io/ws-probability-calculator/?DZKAmn1GByl.9WP5beoc5J4Wp7rfGZKu7-8k-OXrerd*pkqVSvuSRo2M1hx5tZbb7D5*Dlxy*PWv8gwj.8xcVFvdNKRjE4B1PZ0Nf0CiMMv8LDD0)

## Code

right now the following commands are supported:

* `attack DMG`
    * does an attack with trigger check
* `attack cx` / `attack not cx` / `attack trg` / `attack not trg`
    * same as `attack DMG` but does it for each cx, not cx, trg, or not trg from `attack`, `burn`, `mill` or `reveal`
* `burn DMG`
    * does an attack without trigger check
* `burn cx` / `burn not cx` / `burn trg` / `burn not trg`
    * same as `burn DMG` but does it for each cx, not cx, trg, or not trg from `attack`, `burn`, `mill` or `reveal`
* `mill COUNT`
    * mill cards from opponent (but it into waiting room)
* `mill cx` / `mill not cx` / `mill trg` / `mill not trg`
    * same as `mill COUNT` but does it for each cx, not cx, trg, or not trg from `attack`, `burn`, `mill` or `reveal`
* `damage DMG`
    * fix damage to opponent
* `damage cx` / `damage not cx` / `damage trg` / `damage not trg`
    * same as `damage DMG` but does it for each cx, not cx, trg, or not trg from `attack`, `burn`, `mill` or `reveal`
* `repeat REPEATS`
    * repeats everything that is indented after
* `each cx` / `each not cx` / `each trg` / `each not trg`
    * for each cx from `attack`, `burn`, `mill` or `reveal`
* `if cx` / `if not cx` / `if trg` / `if not trg` / `if cx and trg` / `if trg and cx` / `if not cx and trg` / `if trg and not cx` / `if cx and not trg` / `if not trg and cx` / `if not cx and not trg` / `if not trg and not cx`
    * if `attack`, `burn` has a cx (cancel)
    * if `reveal`, `mill` has at least 1 cx
    * if `attack` has a trg (+1 soul)
* `else`
    * the opposite of the `if` or `each` above
* `reveal COUNT`
    * reveals `COUNT` cards from opponent deck
    * can be used to check for `cx` with `if cx`
* `reveal`
    * same as `reveal 1`
* `procedure NAME`
    * defines a procedure can be executed with `execute NAME`
* `execute NAME`
    * executes a `procedure`, recursive executes are disallowed

everything that is not detected as a command gets ignored, can be used as comment..

## Overview

displays the weighted average damage for the given cx-count and deck-size.
you can click on the cells and headers to select them for the [Probabilites](#probabilites).

## Probabilites

displays the probability for equal or more than x-dmg.
you can click on the column header to change what [Overview](#overview) displays.

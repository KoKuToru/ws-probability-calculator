# Weiß Schwarz Probability Calculator

* runs 100% in browser
* shareable via url, the whole state gets stored in the url

## Current Limitations

* only `attack` and `burn` is supported right now
* own deck starts with `my_trg = 15` and `my_not_trg = 35`
* own waitingroom starts with `w_my_trg = 0` and `w_my_not_trg = 0`
* opponent waitingroom starts with `w_op_cx = 8 - op_cx` and `w_op_not_cx = 50 - op_cx - op_not_cx`

## Code

right now the following commands are supported:

* `attack DMG`
    * does an attack with trigger check
* `burn DMG`
    * does an attack without trigger check

everything that is not detected as a command gets ignored, can be used as comment..

## Overview

displays the weighted average damage for the given cx-count and deck-size.
you can click on the cells and headers to select them for the [Probabilites](#probabilites).

## Probabilites

displays the probability for equal or more than x-dmg.
you can click on the column header to change what [Overview](#overview) displays.

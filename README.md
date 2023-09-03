# Weiß Schwarz Probability Calculator

* runs 100% in browser
* shareable via url, the whole state gets stored in the url

## Current Limitations

* only `attack` and `burn` is supported right now
* own deck starts with `trg = 15` and `not_trg = 35`
* own waitingroom starts with `trg = 0` and `not_trg = 0`
* opponent waitingroom starts with `cx = 8 - op_cx` and `not_cx = 50 - op_cx - op_not_cx`

## Code

right now the following commands are supported:

* `attack DMG`
    * does a attack with trigger check
* `burn DMG`
    * does a attack without trigger check

everthing that is not detected as a command gets ignorered, can be used as comment..

## Overview

displays the weighted average damage for the given cx-count and deck-size.
you can click on the cells and headers to select them for the [Probabilites](#probabilites).

## Probabilites

displays the probability for equal or more than x-dmg.
you can click on the column header to select the representation of [Overview](#overview).

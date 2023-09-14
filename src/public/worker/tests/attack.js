import { CX, NOT_CX, TRG, NOT_TRG } from '../step.js';
import State from '../state.js';

export default [{
  code: [['attack', [3], []]],
  outputs: [
    {
      state: new State({ op_cx: 10, op_not_cx:  0, my_trg:  0, my_not_trg: 10 }),
      results: [
        [ NOT_TRG + CX, { op_cx: 9, op_not_cx: 0, my_trg: 0, my_not_trg: 9, w_op_cx: 1,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ]
      ]
    },
    {
      state: new State({ op_cx:  0, op_not_cx: 10, my_trg:  0, my_not_trg: 10 }),
      results: [
        [ NOT_TRG + NOT_CX.repeat(3), { op_cx: 0, op_not_cx: 7, my_trg: 0, my_not_trg: 9, w_op_cx: 0,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ]
      ]
    },
    {
      state: new State({ op_cx: 10, op_not_cx:  0, my_trg: 10, my_not_trg:  0 }),
      results: [
        [ TRG + CX, { op_cx: 9, op_not_cx: 0, my_trg: 9, my_not_trg: 0, w_op_cx: 1,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ]
      ]
    },

    {
      state: new State({ op_cx:  0, op_not_cx: 10, my_trg: 10, my_not_trg:  0 }),
      results: [
        [ TRG + NOT_CX.repeat(4), { op_cx: 0, op_not_cx: 6, my_trg: 9, my_not_trg: 0, w_op_cx: 0,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ]
      ]
    },

    {
      state: new State({ op_cx: 10, op_not_cx: 10, my_trg: 10, my_not_trg:  0 }),
      results: [
        [ TRG + CX,                    { op_cx: 9, op_not_cx:10, my_trg: 9, my_not_trg: 0, w_op_cx: 1,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ TRG + NOT_CX.repeat(1) + CX, { op_cx: 9, op_not_cx: 9, my_trg: 9, my_not_trg: 0, w_op_cx: 1,  w_op_not_cx: 1, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ TRG + NOT_CX.repeat(2) + CX, { op_cx: 9, op_not_cx: 8, my_trg: 9, my_not_trg: 0, w_op_cx: 1,  w_op_not_cx: 2, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ TRG + NOT_CX.repeat(3) + CX, { op_cx: 9, op_not_cx: 7, my_trg: 9, my_not_trg: 0, w_op_cx: 1,  w_op_not_cx: 3, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ TRG + NOT_CX.repeat(4),      { op_cx:10, op_not_cx: 6, my_trg: 9, my_not_trg: 0, w_op_cx: 0,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ],
      ]
    },
    {
      state: new State({ op_cx: 10, op_not_cx: 10, my_trg:  0, my_not_trg: 10 }),
      results: [
        [ NOT_TRG + CX,                    { op_cx: 9, op_not_cx:10, my_trg: 0, my_not_trg: 9, w_op_cx: 1,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ NOT_TRG + NOT_CX.repeat(1) + CX, { op_cx: 9, op_not_cx: 9, my_trg: 0, my_not_trg: 9, w_op_cx: 1,  w_op_not_cx: 1, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ NOT_TRG + NOT_CX.repeat(2) + CX, { op_cx: 9, op_not_cx: 8, my_trg: 0, my_not_trg: 9, w_op_cx: 1,  w_op_not_cx: 2, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ NOT_TRG + NOT_CX.repeat(3),      { op_cx:10, op_not_cx: 7, my_trg: 0, my_not_trg: 9, w_op_cx: 0,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ],
      ]
    },

    {
      state: new State({ op_cx: 10, op_not_cx: 10, my_trg: 10, my_not_trg: 10 }),
      results: [
        [ TRG + CX,                        { op_cx: 9, op_not_cx:10, my_trg: 9, my_not_trg:10, w_op_cx: 1,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ TRG + NOT_CX.repeat(1) + CX,     { op_cx: 9, op_not_cx: 9, my_trg: 9, my_not_trg:10, w_op_cx: 1,  w_op_not_cx: 1, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ TRG + NOT_CX.repeat(2) + CX,     { op_cx: 9, op_not_cx: 8, my_trg: 9, my_not_trg:10, w_op_cx: 1,  w_op_not_cx: 2, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ TRG + NOT_CX.repeat(3) + CX,     { op_cx: 9, op_not_cx: 7, my_trg: 9, my_not_trg:10, w_op_cx: 1,  w_op_not_cx: 3, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ TRG + NOT_CX.repeat(4),          { op_cx:10, op_not_cx: 6, my_trg: 9, my_not_trg:10, w_op_cx: 0,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ NOT_TRG + CX,                    { op_cx: 9, op_not_cx:10, my_trg:10, my_not_trg: 9, w_op_cx: 1,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ NOT_TRG + NOT_CX.repeat(1) + CX, { op_cx: 9, op_not_cx: 9, my_trg:10, my_not_trg: 9, w_op_cx: 1,  w_op_not_cx: 1, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ NOT_TRG + NOT_CX.repeat(2) + CX, { op_cx: 9, op_not_cx: 8, my_trg:10, my_not_trg: 9, w_op_cx: 1,  w_op_not_cx: 2, w_my_trg: 0, w_my_not_trg: 0 } ],
        [ NOT_TRG + NOT_CX.repeat(3),      { op_cx:10, op_not_cx: 7, my_trg:10, my_not_trg: 9, w_op_cx: 0,  w_op_not_cx: 0, w_my_trg: 0, w_my_not_trg: 0 } ],
      ]
    },

    // with reshuffle
    {
      state: new State({ op_cx: 1, op_not_cx: 1, my_trg: 1, my_not_trg: 1, w_op_cx: 1, w_op_not_cx: 1, w_my_trg: 1, w_my_not_trg: 1 }),
      results: [
        [ TRG + CX,                            { op_cx: 0, op_not_cx: 1, my_trg: 0, my_not_trg: 1, w_op_cx: 2,  w_op_not_cx: 1, w_my_trg: 1, w_my_not_trg: 1 } ],

        [ TRG + NOT_CX + CX + /*R*/CX,         { op_cx: 0, op_not_cx: 1, my_trg: 0, my_not_trg: 1, w_op_cx: 1,  w_op_not_cx: 1, w_my_trg: 1, w_my_not_trg: 1 } ], // should be reshuffle before or after putting cancel into waiting room?
        [ TRG + NOT_CX + CX + /*R*/NOT_CX,     { op_cx: 1, op_not_cx: 0, my_trg: 0, my_not_trg: 1, w_op_cx: 1,  w_op_not_cx: 1, w_my_trg: 1, w_my_not_trg: 1 } ], // should be reshuffle before or after putting cancel into waiting room?

        [ NOT_TRG + CX,                        { op_cx: 0, op_not_cx: 1, my_trg: 1, my_not_trg: 0, w_op_cx: 2,  w_op_not_cx: 1, w_my_trg: 1, w_my_not_trg: 1 } ],

        [ NOT_TRG + NOT_CX + CX + /*R*/CX,     { op_cx: 0, op_not_cx: 1, my_trg: 1, my_not_trg: 0, w_op_cx: 1,  w_op_not_cx: 1, w_my_trg: 1, w_my_not_trg: 1 } ], // should be reshuffle before or after putting cancel into waiting room?
        [ NOT_TRG + NOT_CX + CX + /*R*/NOT_CX, { op_cx: 1, op_not_cx: 0, my_trg: 1, my_not_trg: 0, w_op_cx: 1,  w_op_not_cx: 1, w_my_trg: 1, w_my_not_trg: 1 } ], // should be reshuffle before or after putting cancel into waiting room?
      ]
    },

    // extra
    {
      state: new State({ op_cx: 10, op_not_cx: 10, my_trg: 10, my_not_trg: 10, w_op_cx: 10, w_op_not_cx: 10, w_my_trg: 10, w_my_not_trg: 10 }),
    }

  ]
}, {
  code: [
    ['attack', [3], []],
    ['attack', [3], []],
    ['attack', [3], []],
    ['attack', [3], []],
    ['attack', [3], []],
    ['attack', [3], []],
    ['attack', [3], []],
  ],
  outputs: [{ state: new State({ op_cx: 4, op_not_cx: 4, my_trg: 4, my_not_trg: 4, w_op_cx: 4, w_op_not_cx: 4, w_my_trg: 4, w_my_not_trg: 4 }) }]
}];

import State from '../state.js';

const reshuffle = { w_op_cx: 4, w_op_not_cx: 4, w_my_trg: 4, w_my_not_trg: 4  };

const tests = [
  new State({ op_cx: 10, op_not_cx:  0, my_trg:  0, my_not_trg: 10, ...reshuffle}),
  new State({ op_cx:  0, op_not_cx: 10, my_trg:  0, my_not_trg: 10, ...reshuffle}),
  new State({ op_cx: 10, op_not_cx:  0, my_trg: 10, my_not_trg:  0, ...reshuffle}),
  new State({ op_cx:  0, op_not_cx: 10, my_trg: 10, my_not_trg:  0, ...reshuffle}),
  new State({ op_cx: 10, op_not_cx: 10, my_trg: 10, my_not_trg:  0, ...reshuffle}),
  new State({ op_cx: 10, op_not_cx: 10, my_trg:  0, my_not_trg: 10, ...reshuffle}),
  new State({ op_cx: 10, op_not_cx: 10, my_trg: 10, my_not_trg: 10, ...reshuffle}),
  // with reshuffle
  new State({ op_cx: 1, op_not_cx: 1, my_trg: 1, my_not_trg: 1, ...reshuffle }),
  // more
  new State({ op_cx: 4, op_not_cx: 4, my_trg: 4, my_not_trg: 4, ...reshuffle }),
  new State({ op_cx: 2, op_not_cx: 2, my_trg: 4, my_not_trg: 4, ...reshuffle }),
];

export default [{
  code: [['burn', [3], []]],
  tests
}, {
  code: [['repeat', [4], [['burn', [4], []]]]],
  tests
}];

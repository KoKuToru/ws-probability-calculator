import Action from './js/action.js';
import Probability from './js/probability.js';
import State from './js/state.js';

self.addEventListener('message', function({data}) {
    let action = new Action();
    for (const code of data.code) {
        if (code.endsWith('!')) {
            action = action.extraAttack(parseInt(code));
        } else {
            action = action.soulAttack(parseInt(code));
        }
    }
    // execute
    const istate = new State({
        op_cx: data.op_cx,
        op_size: data.op_size,
        my_trg: data.my_trg,
        my_size: data.my_size,

        settings: Object.freeze({
            // settings:
            op_refresh_cx: data.op_refresh_cx,
            op_refresh_size: data.op_refresh_size,
            my_refresh_trg: data.my_refresh_trg,
            my_refresh_size: data.my_refresh_size
        })
    });

    let dmg = [];
    for (const state of action.execute(istate)) {
        const p = state.probability;
        const arr = (dmg[state.dmg] ??= []);
        const idx = arr.findIndex(x => x.denominator === p.denominator);
        if (idx === -1) {
            arr.push(p);
            continue;
        }
        const tmp = arr[idx].add(p);
        arr[idx] = tmp;
    }

    dmg = Array.from(dmg);
    for (let i = 0; i < dmg.length; ++i) {
        if (dmg[i] === undefined) {
            dmg[i] = 0;
            continue;
        }
        dmg[i] = dmg[i].reduce((p, c) => p.add(c)).toNumber();
    }

    let mean = 0;
    for (let i = 0; i < dmg.length; i++) {
        mean += i * dmg[i];
    }
    if (mean > 0) {
        mean /= dmg.reduce((c, p) => c + p);
    }

    this.self.postMessage({
        data,
        dmg,
        mean,
        zero: [...dmg, 0][0] * 100,
        one_or_more: [0, ...dmg.slice(1)].reduce((p, c) => p + c) * 100
    });
});
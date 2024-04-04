#include "utils/engine.hpp"

#ifndef __wasi__
int main() {

    std::cout << "test permutations:" << std::endl;
    each_permutation([](PermutationState& state) {
        state.reset();
        std::cout << "state: " << state.check() << ", " << state.check() << ", " << state.check() << std::endl;
    });

    std::cout << "test reshuffle:" << std::endl;
    each_reshuffle([](ReshuffleState& state) {
        state.reset();
        std::cout << "state: " << state.check() << ", " << state.check() << ", " << state.check() << std::endl;
    });

    Engine e;

    // https://kokutoru.github.io/ws-probability-calculator/?19CfTZk5gsF4j2H47ub0DMnHfxqyAYR4JViZooBC0i8ZL8ABGRJoCD_HzX5lLrHSCfyS1kLzndNfF5Ajfo*bNqfMPlipp9iJq.t02HN1nS3FmS-_9
    std::cout << "test 1:" << std::endl;
    e.reset();
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 2; ++j) {
            e.mill(3); e.push(CX); e.flush();
            e.check(0, EQUALS, 1); e.burn(1); e.flush();
            e.check(0, EQUALS, 2); e.burn(2); e.flush();
            e.check(0, EQUALS, 3); e.burn(3); e.flush();
            e.pop(1);    e.flush();
        }
        e.attack(3); e.flush();
    }
    for (int i = 0; i < 2; ++i) {
        e.mill(3); e.push(CX); e.flush();
        e.check(0, EQUALS, 1); e.burn(1); e.flush();
        e.check(0, EQUALS, 2); e.burn(2); e.flush();
        e.check(0, EQUALS, 3); e.burn(3); e.flush();
        e.pop(1);    e.flush();
        e.attack(3); e.flush();
    }
    e.dump();

    // https://kokutoru.github.io/ws-probability-calculator/?1Zm9oALVLYstU31n7Z5Lecdbv6I1i*frnf6an6f.ZYmnN_tD1SjX8dRMO-iu4jVOu-C1E8h5ckMO-cixoxAY_j-
    std::cout << "test 2:" << std::endl;
    e.reset();
    for (int j = 0; j < 3; ++j) {
        e.burn(1); e.flush();
        e.burn(4); e.flush();
        e.attack(3); e.flush();
    }
    e.dump();
}
#else
    static Engine e;

    __attribute__((export_name("reset"), visibility("default"), flatten))
    extern "C" void reset() {
        e.reset();
    }

    __attribute__((export_name("burn"), visibility("default"), flatten))
    extern "C" void burn(int try_dmg) {
        e.burn(try_dmg);
    }

    __attribute__((export_name("attack"), visibility("default"), flatten))
    extern "C" void attack(int try_dmg) {
        e.attack(try_dmg);
    }

    __attribute__((export_name("dmg"), visibility("default"), flatten))
    extern "C" void damage(int dmg) {
        e.damage(dmg);
    }

    __attribute__((export_name("mill"), visibility("default"), flatten))
    extern "C" void mill(int amount) {
        e.mill(amount);
    }

    __attribute__((export_name("pop"), visibility("default"), flatten))
    extern "C" void pop(int amount) {
        e.pop(amount);
    }

    __attribute__((export_name("push"), visibility("default"), flatten))
    extern "C" void push(int what) {
        e.push(static_cast<WHAT>(what));
    }

    __attribute__((export_name("check"), visibility("default"), flatten))
    extern "C" void check(int stack, int op, int value) {
        e.check(stack, static_cast<WHAT>(op), value);
    }

    __attribute__((export_name("flush"), visibility("default"), flatten))
    extern "C" void flush() {
        e.flush();
    }

    __attribute__((export_name("dump"), visibility("default"), flatten))
    extern "C" void dump() {
        e.dump();
    }
#endif
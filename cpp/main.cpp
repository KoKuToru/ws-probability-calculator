#include "utils/engine.hpp"

#ifndef __wasi__
int main() {
    std::cout << "test permutations:" << std::endl;
    each_permutation([](PermutationState& state) {
        state.reset();
        int a = *state.check(std::array{0, 1});
        int b = *state.check(std::array{0, 1});
        int c = *state.check(std::array{0, 1});
       if (state.skip()) {
            std::cout << "skip: ";
        } else {
            std::cout << "take: ";
        }
        if (b == 2) {
            std::cout << a << ", " << c << std::endl;
        } else {
            std::cout << a << ", " << b << ", " << c << std::endl;
        }
    });

    std::cout << "test reshuffle:" << std::endl;
    each_reshuffle([](ReshuffleState& state) {
        state.reset();
        int a = *state.check(std::array{0, 1});
        int b = 2;
        if (!a) {
            b = *state.check(std::array{0, 1});
        }
        int c = *state.check(std::array{0, 1});
        if (state.skip()) {
            std::cout << "skip: ";
        } else {
            std::cout << "take: ";
        }
        if (b == 2) {
            std::cout << a << ", " << c << std::endl;
        } else {
            std::cout << a << ", " << b << ", " << c << std::endl;
        }
    });

    Engine e;

    // https://kokutoru.github.io/ws-probability-calculator/?19CfTZk5gsF4j2H47ub0DMnHfxqyAYR4JViZooBC0i8ZL8ABGRJoCD_HzX5lLrHSCfyS1kLzndNfF5Ajfo*bNqfMPlipp9iJq.t02HN1nS3FmS-_9
    std::cout << "test 1:" << std::endl;
    e.reset();
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 2; ++j) {
            e.mill(3); e.push(PUSH_ECX); e.flush();
            e.check(0, EQUALS, 1); e.burn(1); e.flush();
            e.check(0, EQUALS, 2); e.burn(2); e.flush();
            e.check(0, EQUALS, 3); e.burn(3); e.flush();
            e.pop(1);    e.flush();
        }
        e.attack(3); e.flush();
    }
    for (int i = 0; i < 2; ++i) {
        e.mill(3); e.push(PUSH_ECX); e.flush();
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

    // https://kokutoru.github.io/ws-probability-calculator/?*oIHmSg4u2R2fhiOwEoU8Fat4dRdgszu9XcL4YYTp4UHUKOv_.L-0gIOz9o4tiPA1Et68UG2Kclr3Of*f4f4
    std::cout << "test 3:" << std::endl;
    e.reset(
        2, 4 - 2,
        6, 46 - 6,
        15, 50 - 15,
        0, 0
    );
    e.mill(2); e.push(PUSH_ICX); e.flush();
    e.check(0, EQUALS, 0); e.damage(3); e.flush();
    e.pop(1); e.flush();
    e.burn(3); e.flush();
    e.burn(3); e.flush();
    e.burn(3); e.flush();
    e.dump();
}
#else

    Engine* lazy_engine() {
        static Engine* e = nullptr;
        if (e) [[likely]] {
            return e;
        }
        // not using new directly because it adds lots of stuff to wasm
        void* memory = malloc(sizeof(Engine));
        assert_oom(memory != nullptr);
        e = new(memory) Engine();
        return e;
    }

    __attribute__((export_name("reset"), visibility("default"), flatten))
    extern "C" void reset(
        int op_cx,
        int op_ncx,
        int w_op_cx,
        int w_op_ncx,
        int my_trg,
        int my_ntrg,
        int w_my_trg,
        int w_my_ntrg
    ) {
        lazy_engine()->reset(
            op_cx, op_ncx,
            w_op_cx, w_op_ncx,
            my_trg, my_ntrg,
            w_my_trg, w_my_ntrg
        );
    }

    __attribute__((export_name("burn"), visibility("default"), flatten))
    extern "C" void burn(int try_dmg) {
        lazy_engine()->burn(try_dmg);
    }

    __attribute__((export_name("attack"), visibility("default"), flatten))
    extern "C" void attack(int try_dmg) {
        lazy_engine()->attack(try_dmg);
    }

    __attribute__((export_name("damage"), visibility("default"), flatten))
    extern "C" void damage(int dmg) {
        lazy_engine()->damage(dmg);
    }

    __attribute__((export_name("mill"), visibility("default"), flatten))
    extern "C" void mill(int amount) {
        lazy_engine()->mill(amount);
    }

    __attribute__((export_name("reveal"), visibility("default"), flatten))
    extern "C" void reveal(int amount, bool remove_cx) {
        lazy_engine()->reveal(amount, remove_cx);
    }

    __attribute__((export_name("reshuffle"), visibility("default"), flatten))
    extern "C" void reshuffle() {
        lazy_engine()->reshuffle();
    }

    __attribute__((export_name("pop"), visibility("default"), flatten))
    extern "C" void pop(int amount) {
        lazy_engine()->pop(amount);
    }

    __attribute__((export_name("push"), visibility("default"), flatten))
    extern "C" void push(int what) {
        lazy_engine()->push(static_cast<WHAT>(what));
    }

    __attribute__((export_name("check"), visibility("default"), flatten))
    extern "C" void check(int stack, int op, int value) {
        lazy_engine()->check(stack, static_cast<WHAT>(op), value);
    }

    __attribute__((export_name("flush"), visibility("default"), flatten))
    extern "C" void flush() {
        lazy_engine()->flush();
    }

    __attribute__((export_name("dump"), visibility("default"), flatten))
    extern "C" void dump() {
        lazy_engine()->dump();
    }
#endif
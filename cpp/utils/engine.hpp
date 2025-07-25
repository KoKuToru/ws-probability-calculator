#ifndef ENGINE_H
#define ENGINE_H

#include <cstdint>
#include <concepts>
#include <array>

#include "assert.h"
#include "state.hpp"
#include "state_stream.hpp"
#include "each.hpp"
#include "each_reshuffle.hpp"
#include "each_permutation.hpp"

#ifndef __wasi__
    #include <iostream>
    #include <iomanip>
#else
    __attribute__((__import_module__("engine"), __import_name__("dump")))
    extern "C" void wasm_dump(const double* array, int size);
#endif


template<typename F>
concept execute_callback_inplace = requires(F f) {
    { f((State*){}) } -> std::same_as<void>;
};


template<typename F>
concept execute_callback_copy = requires(F f, const State* x, StateStream& y) {
    { f(x, y) } -> std::same_as<void>;
};

template<typename F>
concept execute_callback = requires(F f) {
    requires(execute_callback_inplace<F> || execute_callback_copy<F>);
};

struct Engine {

    Engine() {
        reset();
    }

    void reset(
        int op_cx = 8,
        int op_ncx = 22,
        int w_op_cx = 0,
        int w_op_ncx = 20,
        int my_trg = 15,
        int my_ntrg = 35,
        int w_my_trg = 0,
        int w_my_ntrg = 0
    ) {
        inputs.reset();
        inputs->clear(
            0, //< stack
            0, 0, 0, 0, //< pending stats
            my_trg, my_ntrg, //< my deck
            w_my_trg,  w_my_ntrg, //< my waiting room
            op_cx, op_ncx, //< op deck
            w_op_cx,  w_op_ncx  //< op waiting room
        );
        inputs->add(0, 1); //<- intial state
        inputs.commit();
        output.reset();
    }

    Engine(Engine&&) = delete;
    Engine(const Engine&) = delete;
    Engine& operator=(Engine&&) = delete;
    Engine& operator=(const Engine&) = delete;

    void dump(bool header = true) {
        uint32_t size = 0;
        for (const State* state : inputs) {
            for (size_t i = 0; i < state->count; ++i) {
                auto dmg = state->dmg(i);
                size = std::max(size, dmg);
            }
        }
        size += 1;
        double* result = reinterpret_cast<double*>(calloc(1, size * sizeof(double)));
        assert_oom(result != nullptr);
        for (const State* state : inputs) {
            for (size_t i = 0; i < state->count; ++i) {
                auto dmg = state->dmg(i);
                auto prob = state->probability(i);
                result[dmg] += prob;
            }
        }
        #ifndef __wasi__
        if (header) {
            for (size_t i = 0; i < size; ++i) {
                if (i != 0) {
                    std::stringstream ss;
                    ss <<  ">=" << i;
                    std::cout << std::setw(8) << ss.str();
                    std::cout << '|';
                    continue;
                }
                std::cout << std::setw(8) << i;
                std::cout << '|';
            }
            std::cout << std::endl;
            for (size_t i = 0; i < size; ++i) {
                std::cout << std::setw(8) << std::setfill('-') <<  "-:";
                std::cout << '|';
            }
            std::cout << std::endl;
        }
        for (size_t i = 0; i < size; ++i) {
            double p = 0;
            for (size_t j = i; j < size; ++j) {
                p += result[j];
                if (i == 0) {
                    break;
                }
            }
            std::cout <<std::setw(8) << std::setfill(' ') << std::setprecision(4) << std::fixed << p * 100;
            std::cout << '|';
        }
        std::cout << std::endl;
        #else
        wasm_dump(result, size);
        #endif
        free(result);
    }

    void attack(int try_dmg) {
        assert(try_dmg > 0);
        execute(
            [=](const State* state, StateStream& output) {
                assert(state->p_my_trg == 0);
                assert(state->p_my_ntrg == 0);
                assert(state->p_op_cx == 0);
                assert(state->p_op_ncx == 0);
                for (int trigger : std::array{1, 0})
                each(try_dmg + trigger + 1, [&](int n) {
                    each_reshuffle([&](ReshuffleState& reshuffle) {
                        reshuffle.reset();

                        int dmg = try_dmg + trigger;
                        int reshuffled = 0;
                        Fraction probability = 1;

                        output = *state;

                        if (!output->my_take(DECK, PENDING, trigger ? TRG : NTRG, probability)) {
                            // pick failed
                            return;
                        }
                        output->my_stock(trigger, !trigger);
                        if (output->my_reshuffle()) {
                            if (
                                auto card = reshuffle.check(std::array{TRG, NTRG});
                                !card || !output->my_take(DECK, CLOCK, *card, probability)
                            ) {
                                // pick failed
                                return;
                            }
                        }
                        if (output->my_trg <= 0 && output->my_ntrg <= 0) {
                            // XXX: nothing in deck..
                            return;
                        }

                        for (int m = 0; m < n; ++m) {
                            if (!output->op_take(DECK, PENDING, NCX, probability)) {
                                // pick failed
                                return;
                            }
                            if (output->op_reshuffle()) {
                                reshuffled += 1;
                                if (
                                    auto card = reshuffle.check(std::array{CX, NCX});
                                    !card || !output->op_take(DECK, CLOCK, *card, probability)
                                ) {
                                    // pick failed
                                    return;
                                }
                            }
                            if (output->op_cx <= 0 && output->op_ncx <= 0) {
                                // XXX: nothing in deck..
                                return;
                            }
                        }

                        if (n < try_dmg + trigger) {
                            // cancel
                            dmg = 0;
                            if (!output->op_take(DECK, PENDING, CX, probability)) {
                                // pick failed
                                return;
                            }
                            if (output->op_reshuffle()) {
                                reshuffled += 1;
                                 if (
                                    auto card = reshuffle.check(std::array{CX, NCX});
                                    !card || !output->op_take(DECK, CLOCK, *card, probability)
                                ) {
                                    // pick failed
                                    return;
                                }
                            }
                            if (output->op_cx <= 0 && output->op_ncx <= 0) {
                                // XXX: nothing in deck..
                                return;
                            }
                        }

                        if (reshuffle.skip()) {
                            return;
                        }

                        if (dmg == 0) {
                            output->op_waitingroom(output->p_op_cx, output->p_op_ncx);
                        } else {
                            output->op_clock(output->p_op_cx, output->p_op_ncx);
                        }

                        output->update(dmg + reshuffled, probability);
                        output.commit();
                    });
                });
            }
        );
    }

    void burn(int try_dmg) {
        assert(try_dmg > 0);
        execute(
            [=](const State* state, StateStream& output) {
                assert(state->p_my_trg == 0);
                assert(state->p_my_ntrg == 0);
                assert(state->p_op_cx == 0);
                assert(state->p_op_ncx == 0);
                each(try_dmg + 1, [&](int n) {
                    each_reshuffle([&](ReshuffleState& reshuffle) {
                        reshuffle.reset();

                        int dmg = try_dmg;
                        int reshuffled = 0;
                        Fraction probability = 1;

                        output = *state;

                        for (int m = 0; m < n; ++m) {
                            if (!output->op_take(DECK, PENDING, NCX, probability)) {
                                return;
                            }
                            if (output->op_reshuffle()) {
                                reshuffled += 1;
                                 if (
                                    auto card = reshuffle.check(std::array{CX, NCX});
                                    !card || !output->op_take(DECK, CLOCK, *card, probability)
                                ) {
                                    // pick failed
                                    return;
                                }
                            }
                            if (output->op_cx <= 0 && output->op_ncx <= 0) {
                                // XXX: nothing in deck..
                                return;
                            }
                        }

                        if (n < try_dmg) {
                            // cancel
                            dmg = 0;
                            if (!output->op_take(DECK, PENDING, CX, probability)) {
                                // pick failed
                                return;
                            }
                            if (output->op_reshuffle()) {
                                reshuffled += 1;
                                if (
                                    auto card = reshuffle.check(std::array{CX, NCX});
                                    !card || !output->op_take(DECK, CLOCK, *card, probability)
                                ) {
                                    // pick failed
                                    return;
                                }
                            }
                            if (output->op_cx <= 0 && output->op_ncx <= 0) {
                                // XXX: nothing in deck..
                                return;
                            }
                        }

                        if (reshuffle.skip()) {
                            return;
                        }

                        if (dmg == 0) {
                            output->op_waitingroom(output->p_op_cx, output->p_op_ncx);
                        } else {
                            output->op_clock(output->p_op_cx, output->p_op_ncx);
                        }

                        output->update(dmg + reshuffled, probability);
                        output.commit();
                    });
                });
            }
        );
    }

    void mill(int count) {
        assert(count > 0);
        execute(
            [=](const State* state, StateStream& output) {
                assert(state->p_my_trg == 0);
                assert(state->p_my_ntrg == 0);
                assert(state->p_op_cx == 0);
                assert(state->p_op_ncx == 0);
                each_permutation([&](PermutationState& permutation) {
                    each_reshuffle([&](ReshuffleState& reshuffle) {
                        permutation.reset();
                        reshuffle.reset();

                        int reshuffled = 0;
                        Fraction probability = 1;

                        output = *state;

                        for (int i = 0; i < count; ++i) {
                            if (
                                auto card = permutation.check(std::array{CX, NCX});
                                !card || !output->op_take(DECK, PENDING, *card, probability)
                            ) {
                                // pick failed
                                return;
                            }
                            if (output->op_reshuffle()) {
                                reshuffled += 1;
                                if (
                                    auto card = reshuffle.check(std::array{CX, NCX});
                                    !card || !output->op_take(DECK, CLOCK, *card, probability)
                                ) {
                                    // pick failed
                                    return;
                                }
                            }
                            if (output->op_cx <= 0 && output->op_ncx <= 0) {
                                // XXX: nothing in deck..
                                return;
                            }
                        }

                        if (permutation.skip() || reshuffle.skip()) {
                            return;
                        }

                        output->op_waitingroom(output->p_op_cx, output->p_op_ncx);

                        output->update(reshuffled, probability);
                        output.commit();
                    });
                });
            }
        );
    }

    void reveal(int count, bool remove_cx) {
        assert(count > 0);
        execute(
            [=](const State* state, StateStream& output) {
                assert(state->p_my_trg == 0);
                assert(state->p_my_ntrg == 0);
                assert(state->p_op_cx == 0);
                assert(state->p_op_ncx == 0);
                each_permutation([&](PermutationState& permutation) {
                    permutation.reset();

                    Fraction probability = 1;

                    output = *state;

                    for (int i = 0; i < count; ++i) {
                        if (
                            auto card = permutation.check(std::array{CX, NCX});
                            !card || !output->op_take(DECK, PENDING, *card, probability)
                        ) {
                            // pick failed
                            return;
                        }
                        if (output->op_cx <= 0 && output->op_ncx <= 0) {
                            // XXX: nothing in deck..
                            break;
                        }
                    }

                    if (permutation.skip()) {
                        return;
                    }

                    if (remove_cx) {
                        output->op_reveal(0, output->p_op_ncx);
                        output->op_waitingroom(output->p_op_cx, 0);
                    } else {
                        output->op_reveal(output->p_op_cx, output->p_op_ncx);
                    }

                    output->update(0, probability);
                    output.commit();
                });
            }
        );
    }

    void reshuffle() {
        execute(
            [=](const State* state, StateStream& output) {
                assert(state->p_my_trg == 0);
                assert(state->p_my_ntrg == 0);
                assert(state->p_op_cx == 0);
                assert(state->p_op_ncx == 0);

                output = *state;
                output->op_deck_reshuffle();
                output.commit();
            }
        );
    }

    void damage(int dmg) {
        execute(
            [=](State* state) {
                assert(state->p_my_trg == 0);
                assert(state->p_my_ntrg == 0);
                assert(state->p_op_cx == 0);
                assert(state->p_op_ncx == 0);
                state->update(dmg, 1);
            }
        );
    }

    void push(WHAT what) {
        assert(
            what == PUSH_ECX ||
            what == PUSH_ENCX ||
            what == PUSH_ICX ||
            what == PUSH_INCX ||
            what == PUSH_ETRG ||
            what == PUSH_ENTRG ||
            what == PUSH_ITRG ||
            what == PUSH_INTRG
        );
        auto idx = stack_size;
        assert(idx * 4 < 47);
        stack_size += 1;
        execute(
            [=](State* state) {
                decltype(state->stack) v;
                switch (what) {
                    case PUSH_ECX:
                        v = state->p_op_cx;
                        break;
                    case PUSH_ENCX:
                        v = state->p_op_ncx;
                        break;
                    case PUSH_ICX:
                        v = (state->p_op_cx != 0) ? 1 : 0;
                        break;
                    case PUSH_INCX:
                        v = (state->p_op_cx == 0) ? 1 : 0;
                        break;
                    case PUSH_ETRG:
                        v = state->p_my_trg;
                        break;
                    case PUSH_ENTRG:
                        v = state->p_my_ntrg;
                        break;
                    case PUSH_ITRG:
                        v = (state->p_my_trg != 0) ? 1 : 0;
                        break;
                    case PUSH_INTRG:
                        v = (state->p_my_trg == 0) ? 1 : 0;
                        break;
                    default:
                        return;
                }
                assert(v >= 0 && v <= 0x0F);
                state->stack |= v << (idx * 4);
            }
        );
    }

    void pop(int amount) {
        assert(stack_size >= amount);
        auto stack_size = this->stack_size -= amount;
        execute(
            [=](State* state) {
                assert(state->p_my_trg == 0);
                assert(state->p_my_ntrg == 0);
                assert(state->p_op_cx == 0);
                assert(state->p_op_ncx == 0);
                state->stack &= ~(~decltype(state->stack){} << (stack_size * 4));
            }
        );
    }

    void check(int stack, WHAT what, int value) {
        assert(stack >= 0 && stack * 4 < 47);
        assert(value >= 0 && value <= 0x0F);
        assert(this->stack_size >= stack);
        execute(
            [=](State* state) {
                assert(state->p_my_trg == 0);
                assert(state->p_my_ntrg == 0);
                assert(state->p_op_cx == 0);
                assert(state->p_op_ncx == 0);
                int stack_value = (state->stack >> (stack * 4)) & 0x0F;
                switch (what) {
                    case NOT_EQUALS:
                        state->active &= stack_value != value;
                        break;
                    case EQUALS:
                        state->active &= stack_value == value;
                        break;
                    case LESS:
                        state->active &= stack_value < value;
                        break;
                    case LESS_EQUALS:
                        state->active &= stack_value <= value;
                        break;
                    case GREATER:
                        state->active &= stack_value > value;
                        break;
                    case GREATER_EQUALS:
                        state->active &= stack_value >= value;
                        break;
                    default:
                        state->active = false;
                }
            }
        );
    }

    void flush() {
        // remove pending stuff
        for (State* state : inputs) {
            if (state->active) {
                state->p_my_trg = 0;
                state->p_my_ntrg = 0;
                state->p_op_cx = 0;
                state->p_op_ncx = 0;
            }
        }
        inputs.sort();

        // merge
        output.reset();
        bool first = true;
        for (const State* state : inputs) {
            if (first) {
                output = *state;
                first = false;
                continue;
            }
            if (!output->active || output->operator!=(*state)) {
                output->active = 1;
                output.commit();
                output = *state;
                continue;
            }
            output->add(*state);
        }
        if (!first) {
            output->active = 1;
            output.commit();
        }
        inputs.swap(output);
    }

    private:

    int stack_size = 0;

    StateStream inputs;
    StateStream output;

    template<execute_callback F>
    void execute(F func) {
        if constexpr (execute_callback_inplace<F>) {
            for (State* state : inputs) {
                if (state->active) {
                    func(state);
                }
            }
        } else if constexpr (execute_callback_copy<F>) {
            output.reset();
            for (const State* state : inputs) {
                if (state->active) {
                    func(state, output);
                } else {
                    output = *state;
                    output.commit();
                }
            }
            inputs.swap(output);
        }
    }
};

#endif
#ifndef PERMUTATION_H
#define PERMUTATION_H

#include <concepts>
#include <cstdint>

#include <iostream>

struct PermutationState {
    void reset() {
        idx = 1;
    }
    void next() {
        idx = 0;
        state += 1;
    }
    bool check() {
        assert(idx != 0); //<- check if reset got called
        const auto v = state & idx;
        mask |= idx;
        idx <<= 1;
        return v;
    }
    bool done() {
        return (state & mask) == 0;
    }

    PermutationState() {}
    PermutationState(PermutationState&&) = delete;
    PermutationState(const PermutationState&) = delete;
    PermutationState& operator=(PermutationState&&) = delete;
    PermutationState& operator=(const PermutationState&) = delete;

    private:
    uint64_t state = 0;
    uint64_t idx   = 0;
    uint64_t mask  = 0;
};

template<typename F>
concept permutation_callback = requires(F f, PermutationState& r) {
    { f(r) } -> std::same_as<void>;
};


template<permutation_callback F>
void each_permutation(F c) {
    PermutationState r;
    do {
        c(r);
        r.next();
    } while (!r.done());
}

#endif
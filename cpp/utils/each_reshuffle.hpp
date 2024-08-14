#ifndef RESHUFFLE_H
#define RESHUFFLE_H

#include <concepts>
#include <cstdint>

#include <iostream>

#include "each_permutation.hpp"

struct ReshuffleState: PermutationState {};

template<typename F>
concept reshuffle_callback = requires(F f, ReshuffleState& r) {
    { f(r) } -> std::same_as<void>;
};


template<reshuffle_callback F>
void each_reshuffle(F c) {
    ReshuffleState r;
    do {
        c(r);
        r.next();
    } while (!r.done());
}

#endif
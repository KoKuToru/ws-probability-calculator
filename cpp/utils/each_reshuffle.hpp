#ifndef RESHUFFLE_H
#define RESHUFFLE_H

#include <concepts>
#include <cstdint>

#include <iostream>

struct ReshuffleState {
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

    ReshuffleState() {}
    ReshuffleState(ReshuffleState&&) = delete;
    ReshuffleState(const ReshuffleState&) = delete;
    ReshuffleState& operator=(ReshuffleState&&) = delete;
    ReshuffleState& operator=(const ReshuffleState&) = delete;

    private:
    uint64_t state = 0;
    uint64_t idx   = 0;
    uint64_t mask  = 0;
};

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
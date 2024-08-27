#ifndef PERMUTATION_H
#define PERMUTATION_H

#include <concepts>
#include <cstdint>
#include <optional>

struct PermutationState {
    void reset() {
        idx = 0;
        cmask = 0;
    }
    void next() {
        idx = idx_unset;
        state += 1;
        mask |= cmask;
    }
    template<typename T, size_t S> std::optional<T> check(std::array<T, S> values) {
        assert(idx != idx_unset); //<- check if reset got called
        const auto size = values.size();
        const auto vfull = ~decltype(state){};
        const auto vmask = vfull >> __builtin_clzll(size - 1);
        assert(vfull >> idx >= vmask); //<- check if in range
        const auto v = (state >> idx) & vmask;
        if (v >= size) {
            // SKIP
            return std::nullopt;
        }
        cmask |= vmask << idx;
        idx += 1;
        return values[v];
    }
    bool done() {
        return (state & mask) == 0;
    }
    bool skip() {
        return (state & (mask ^ cmask)) != 0;
    }

    PermutationState() {}
    PermutationState(PermutationState&&) = delete;
    PermutationState(const PermutationState&) = delete;
    PermutationState& operator=(PermutationState&&) = delete;
    PermutationState& operator=(const PermutationState&) = delete;

    private:
    uint64_t state  = 0;
    uint64_t mask   = 0;
    uint64_t cmask  = 0;
    uint16_t idx    = 0;
    static constexpr uint16_t idx_unset = ~decltype(idx){};
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
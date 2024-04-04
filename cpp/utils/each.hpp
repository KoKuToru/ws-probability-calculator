#ifndef EACH_H
#define EACH_H

#include <concepts>

template<typename F>
concept each_callback = requires(F f) {
    { f(int{}) } -> std::same_as<void>;
};

template<typename T>
concept numeric = requires(T t) {
    { std::is_integral_v<T> };
};

template<numeric T, each_callback F>
void each(T n, F c) {
    for (T i = T{}; i < n; ++i) {
        c(i);
    }
}

#endif
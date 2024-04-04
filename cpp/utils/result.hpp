#ifndef RESULT_H
#define RESULT_H

#include <cstdint>
#include "fraction.hpp"

struct Result {
    Fraction probability;
    uint32_t dmg;
};

#endif
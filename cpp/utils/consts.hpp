#ifndef CONSTS_H
#define CONSTS_H

#include <cstdio>

constexpr size_t STATE_CHUNK_SIZE = 1048576; // 1MiB;

enum WHAT {
    NOTHING = 0,
    NEQUALS = 1,
    EQUALS = 2,
    CX = 3,
    NCX = 4,
    TRG = 5,
    NTRG = 6,
    DECK = 7,
    WAITINGROOM = 8,
    PENDING = 9,
    CLOCK = 10,
    STOCK = 11
};

#endif
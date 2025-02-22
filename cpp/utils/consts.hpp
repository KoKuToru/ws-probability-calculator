#ifndef CONSTS_H
#define CONSTS_H

#include <cstdio>

constexpr size_t STATE_CHUNK_SIZE = 1048576; // 1MiB;

enum WHAT {
    EQUALS         = 1,
    NOT_EQUALS     = 2,
    LESS           = 3,
    LESS_EQUALS    = 4,
    GREATER        = 5,
    GREATER_EQUALS = 6,

    PUSH_ECX  = 7,
    PUSH_ENCX = 8,
    PUSH_ICX  = 9,
    PUSH_INCX = 10,

    PUSH_ETRG  = 20,
    PUSH_ENTRG = 21,
    PUSH_ITRG  = 22,
    PUSH_INTRG = 23,

    DECK        = 11,
    WAITINGROOM = 12,
    PENDING     = 13,
    CLOCK       = 14,
    STOCK       = 15,

    CX = 16,
    NCX = 17,
    TRG = 18,
    NTRG = 19
};

#endif
#ifndef STATE_H
#define STATE_H

#include <cstdint>
#include <cstring>
#include <cassert>

#include "consts.hpp"
#include "result.hpp"
#include "fraction.hpp"

struct StateBase {
    // 0x00:
    uint64_t stack  :47;
    uint64_t active :1;

    // 0x08 pending:
    uint64_t p_my_trg  :4;
    uint64_t p_my_ntrg :4;
    uint64_t p_op_cx   :4;
    uint64_t p_op_ncx  :4;

    // 0x10:
    uint8_t my_trg     :4;
    uint8_t w_my_trg   :4;
    uint8_t my_ntrg;
    uint8_t w_my_ntrg;

    // 0x18 opponent:
    uint8_t op_cx      :4;
    uint8_t w_op_cx    :4;
    uint8_t op_ncx;
    uint8_t w_op_ncx;
} __attribute__((packed));

struct State : StateBase {
    // 0x20:
    int32_t count;

    private:

    // 0x40
    Result result[];

    Result* get_result(int idx) {
        assert (idx >= 0 && idx < count);
        return result + idx;
    }

    const Result* get_result(int idx) const {
        assert (idx >= 0 && idx < count);
        return result + idx;
    }

    int compare_with(const State& other) const {
        // ignore the count & result
        return std::memcmp(reinterpret_cast<const unsigned char*>(this), reinterpret_cast<const unsigned char*>(&other), sizeof(StateBase));
    }

    public:

    uint32_t& dmg(int idx) {
        return get_result(idx)->dmg;
    }

    Fraction& probability(int idx) {
        return get_result(idx)->probability;
    }

    uint32_t dmg(int idx) const {
        return get_result(idx)->dmg;
    }

    Fraction probability(int idx) const {
        return get_result(idx)->probability;
    }

    void add(int ndmg, Fraction nprobability) {
        for (size_t i = 0; i < count; ++i) {
            if (dmg(i) == ndmg) {
                probability(i) += nprobability;
                return;
            }
        }
        assert(count != 0xFFFFFFFF);
        int idx = count++;
        assert(byte_size() <= STATE_CHUNK_SIZE);
        dmg(idx) = ndmg;
        probability(idx) = nprobability;
    }

    void update(int ndmg, Fraction nprobability) {
        for (size_t idx = 0; idx < count; ++idx) {
            dmg(idx) += ndmg;
            probability(idx) *= nprobability;
        }
    }

    void add(const State& other) {;
        for (size_t i = 0; i < other.count; ++i) {
            add(other.dmg(i), other.probability(i));
        }
    }

    int byte_size() const {
        int size = sizeof(State) + count * sizeof(Result);
        size = (size + 7) / 8 * 8;
        return size;
    }

    State& operator=(const State& other) {
        std::memmove(reinterpret_cast<unsigned char*>(this), reinterpret_cast<const unsigned char*>(&other), other.byte_size());
        return *this;
    }

    // comparision operators ignore the size & result
    bool operator==(const State& other) const {
        return compare_with(other) == 0;
    }
    bool operator!=(const State& other) const {
        return compare_with(other) != 0;
    }
    bool operator<(const State& other) const {
        return compare_with(other) < 0;
    }
    bool operator<=(const State& other) const {
        return compare_with(other) <= 0;
    }
    bool operator>(const State& other) const {
        return compare_with(other) > 0;
    }
    bool operator>=(const State& other) const {
        return compare_with(other) >= 0;
    }

    State(State&&) = delete;
    State(const State&) = delete;

    void clear(
        uint32_t n_stack = 0,
        uint8_t  n_p_my_trg  = 0,
        uint8_t  n_p_my_ntrg = 0,
        uint8_t  n_p_op_cx   = 0,
        uint8_t  n_p_op_ncx  = 0,
        uint8_t  n_my_trg = 15,
        uint8_t  n_my_ntrg = 35,
        uint8_t  n_w_my_trg = 0,
        uint8_t  n_w_my_ntrg = 0,
        uint8_t  n_op_cx = 8,
        uint8_t  n_op_ncx = 22,
        uint8_t  n_w_op_cx = 0,
        uint8_t  n_w_op_ncx = 12
    ) {
        assert (n_my_trg    <= 0x0F);
        assert (n_op_cx     <= 0x0F);
        assert (n_p_my_trg  <= 0x0F);
        assert (n_p_my_ntrg <= 0x0F);
        assert (n_p_op_cx   <= 0x0F);
        assert (n_p_op_ncx  <= 0x0F);
        count = 0;
        stack = n_stack;
        active = 1;
        p_my_trg  = n_p_my_trg;
        p_my_ntrg = n_p_my_ntrg;
        p_op_cx   = n_p_op_cx;
        p_op_ncx  = n_p_op_ncx;
        my_trg  = n_my_trg;
        my_ntrg = n_my_ntrg;
        op_cx  = n_op_cx;
        op_ncx = n_op_ncx;
        w_my_trg  = n_w_my_trg;
        w_my_ntrg = n_w_my_ntrg;
        w_op_cx  = n_w_op_cx;
        w_op_ncx = n_w_op_ncx;
    }

    void my_stock(int trg, int ntrg) {
        // does nothing
        // XXX: if we would implement this.. the order of the cards in stock matters
    }

    void my_waitingroom(int trg, int ntrg) {
        w_my_trg += trg;
        w_my_ntrg += ntrg;
    }

    void my_clock(int trg, int ntrg) {
        // does nothing
        // XXX: if we would implement this.. the order of the cards in clock matters
    }

    bool my_take(WHAT source, WHAT target, WHAT what, Fraction& probability) {
        assert(what == TRG || what == NTRG);
        assert(source == DECK);
        assert(target == WAITINGROOM || target == PENDING || target == CLOCK);

        switch (what) {
            case TRG:
                if (my_trg < 1) {
                    // can't pick
                    return false;
                }
                probability *= Fraction(my_trg, my_trg + my_ntrg);
                my_trg -= 1;
                switch (target) {
                    case WAITINGROOM:
                        my_waitingroom(1, 0);
                        break;
                    case PENDING:
                        assert(p_my_trg < 0x0F);
                        p_my_trg += 1;
                        break;
                    case CLOCK:
                        my_clock(1, 0);
                        break;
                    case STOCK:
                        my_stock(1, 0);
                        break;
                    default:
                        assert(true);
                }
                break;
            case NTRG:
                if (my_ntrg < 1) {
                    // can't pick
                    return false;
                }
                probability *= Fraction(my_ntrg, my_trg + my_ntrg);
                my_ntrg -= 1;
                switch (target) {
                    case WAITINGROOM:
                        my_waitingroom(0, 1);
                        break;
                    case PENDING:
                        assert(p_my_ntrg < 0x0F);
                        p_my_ntrg += 1;
                        break;
                    case CLOCK:
                        my_clock(0, 1);
                        break;
                    case STOCK:
                        my_stock(0, 1);
                        break;
                    default:
                        assert(true);
                }
                break;
            default:
                assert(true);
        }
        return true;
    }

    bool my_reshuffle() {
        if (my_trg > 0 || my_ntrg > 0) {
            return false;
        }
        // reshuffle
        my_trg = w_my_trg;
        my_ntrg = w_my_ntrg;
        w_my_trg = 0;
        w_my_ntrg = 0;
        return true;
    }

    void op_stock(int cx, int ncx) {
        // does nothing
        // XXX: if we would implement this.. the order of the cards in stock matters
    }

    void op_waitingroom(int cx, int ncx) {
        w_op_cx += cx;
        w_op_ncx += ncx;
    }

    void op_clock(int cx, int ncx) {
        // does nothing
        // XXX: if we would implement this.. the order of the cards in clock matters
    }

    bool op_reshuffle() {
        if (op_cx > 0 || op_ncx > 0) {
            return false;
        }
        // reshuffle
        op_cx = w_op_cx;
        op_ncx = w_op_ncx;
        w_op_cx = 0;
        w_op_ncx = 0;
        return true;
    }

    bool op_take(WHAT source, WHAT target, WHAT what, Fraction& probability) {
        assert(what == CX || what == NCX);
        assert(source == DECK);
        assert(target == WAITINGROOM || target == PENDING || target == CLOCK);

        switch (what) {
            case CX:
                if (op_cx < 1) {
                    // can't pick
                    return false;
                }
                probability *= Fraction(op_cx, op_cx + op_ncx);
                op_cx -= 1;
                switch (target) {
                    case WAITINGROOM:
                        op_waitingroom(1, 0);
                        break;
                    case PENDING:
                        assert(p_op_cx < 0x0F);
                        p_op_cx += 1;
                        break;
                    case CLOCK:
                        op_clock(1, 0);
                        break;
                    case STOCK:
                        op_stock(1, 0);
                        break;
                    default:
                        assert(true);
                }
                break;
            case NCX:
                if (op_ncx < 1) {
                    // can't pick
                    return false;
                }
                probability *= Fraction(op_ncx, op_cx + op_ncx);
                op_ncx -= 1;
                switch (target) {
                    case WAITINGROOM:
                        op_waitingroom(0, 1);
                        break;
                    case PENDING:
                        assert(p_op_ncx < 0x0F);
                        p_op_ncx += 1;
                        break;
                    case CLOCK:
                        op_clock(0, 1);
                        break;
                    case STOCK:
                        op_stock(0, 1);
                        break;
                    default:
                        assert(true);
                }
                break;
            default:
                assert(true);
        }
        return true;
    }
};

#endif
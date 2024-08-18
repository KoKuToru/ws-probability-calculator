#ifndef STATE_STREAM_H
#define STATE_STREAM_H

#include <cstdint>
#include <cstring>
#include <algorithm>

#include "assert.h"
#include "consts.hpp"
#include "state.hpp"

struct StateStream {

    StateStream() {
        tmp = reinterpret_cast<State*>(malloc(STATE_CHUNK_SIZE));
        assert(tmp != nullptr);
        next = reinterpret_cast<State*>(malloc(STATE_CHUNK_SIZE));
        assert(next != nullptr);

        chunk_reserved = STATE_CHUNK_SIZE / sizeof(State*);
        chunk = reinterpret_cast<State**>(malloc(chunk_reserved * sizeof(State*)));
        assert(chunk != nullptr);
        std::fill(chunk, chunk + chunk_reserved, nullptr);
        chunk[0] = next;
        chunk_idx = 0;

        order_reserved = STATE_CHUNK_SIZE / sizeof(State*);
        order = reinterpret_cast<State**>(malloc(order_reserved * sizeof(State*)));
        assert(order != nullptr);
        order_idx = 0;
    }

    ~StateStream() {
        free(tmp);
        for (size_t i = 0; i < chunk_reserved; ++i) {
            if (!chunk[i]) {
                break;
            }
            free(chunk[i]);
        }
    }

    StateStream(StateStream&&) = delete;
    StateStream(const StateStream&) = delete;
    StateStream& operator=(StateStream&&) = delete;
    StateStream& operator=(const StateStream&) = delete;

    State* operator->() {
        return tmp;
    }
    const State* operator->() const {
        return tmp;
    }

    StateStream& operator=(const State& x) {
        *tmp = x;
        return *this;
    }

    void reset() {
        chunk_idx = 0;
        order_idx = 0;
        next = nullptr;
    }

    void commit() {
        if (chunk_idx >= chunk_reserved) {
            // allocate more memory for chunk list
            chunk_reserved += STATE_CHUNK_SIZE / sizeof(State*);
            chunk = reinterpret_cast<State**>(realloc(chunk, chunk_reserved * sizeof(State*)));
            assert(chunk != nullptr);
            std::fill(chunk + chunk_idx, chunk + chunk_reserved, nullptr);
        }
        if (!chunk[chunk_idx]) {
            // allocate chunk
            next = reinterpret_cast<State*>(malloc(STATE_CHUNK_SIZE));
            assert(next != nullptr);
            chunk[chunk_idx] = next;
        }
        if (!next) {
            next = chunk[chunk_idx];
        }
        auto required_size = tmp->byte_size();
        assert(required_size < STATE_CHUNK_SIZE);
        auto available_size = uintptr_t(chunk[chunk_idx]) + STATE_CHUNK_SIZE - uintptr_t(next);
        assert(available_size <= STATE_CHUNK_SIZE);
        if (required_size > available_size) {
            chunk_idx += 1;
            next = nullptr;
            commit();
            return;
        }
        if (order_idx >= order_reserved) {
            // allocate more memory for order list
            order_reserved += STATE_CHUNK_SIZE / sizeof(State*);
            order = reinterpret_cast<State**>(realloc(order, order_reserved * sizeof(State*)));
            assert(order != nullptr);
        }

        // put it in
        *next = *tmp;
        order[order_idx] = next;
        assert(order_idx != 0xFFFFFFFF);
        order_idx += 1;

        // set next to next
        next = reinterpret_cast<State*>(uintptr_t(next) + required_size);
    }

    void sort() {
        std::sort(order, order + order_idx, [](State* a, State* b) {
            return *a < *b;
        });
    }

    State** begin() {
        return order;
    }
    State** end() {
        return order + order_idx;
    }

    const State** begin() const {
        return const_cast<const State**>(order);
    }
    const State** end() const {
        return const_cast<const State**>(order + order_idx);
    }

    void swap(StateStream& other) {
        std::swap(tmp, other.tmp);
        std::swap(next, other.next);
        std::swap(chunk, other.chunk);
        std::swap(chunk_idx, other.chunk_idx);
        std::swap(chunk_reserved, other.chunk_reserved);
        std::swap(order, other.order);
        std::swap(order_idx, other.order_idx);
        std::swap(order_reserved, other.order_reserved);
    }

    private:
    State* tmp;
    State* next;

    State** chunk;
    int chunk_idx;
    int chunk_reserved;

    State** order;
    int order_idx;
    int order_reserved;
};

#endif
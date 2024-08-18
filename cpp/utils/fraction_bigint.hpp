#ifndef FRACTION_H
#define FRACTION_H

#include <cmath>
#include <numeric>
#include <tuple>
#include <functional>
#include <ranges>
#include <algorithm>

#ifndef __wasi__
    #error "only works in wasm"
#endif

constexpr size_t BIGINT_INT_COUNT = 6;

__attribute__((__import_module__("bigint"), __import_name__("add")))
extern "C" void wasm_bigint_add(uint32_t* res, const uint32_t* a, const uint32_t* b, int size);
__attribute__((__import_module__("bigint"), __import_name__("sub")))
extern "C" void wasm_bigint_sub(uint32_t* res, const uint32_t* a, const uint32_t* b, int size);
__attribute__((__import_module__("bigint"), __import_name__("div")))
extern "C" void wasm_bigint_div(uint32_t* res, const uint32_t* a, const uint32_t* b, int size);
__attribute__((__import_module__("bigint"), __import_name__("mul")))
extern "C" void wasm_bigint_mul(uint32_t* res, const uint32_t* a, const uint32_t* b, int size);
__attribute__((__import_module__("bigint"), __import_name__("mod")))
extern "C" void wasm_bigint_mod(uint32_t* res, const uint32_t* a, const uint32_t* b, int size);
__attribute__((__import_module__("bigint"), __import_name__("gcd")))
extern "C" void wasm_bigint_gcd(uint32_t* res, const uint32_t* a, const uint32_t* b, int size);
__attribute__((__import_module__("bigint"), __import_name__("double")))
extern "C" void wasm_bigint_double(double* res, const uint32_t* a, int size);

struct BigInt {
    BigInt(): data({}) {}
    BigInt(uint64_t v): data({}) {
        data[BIGINT_INT_COUNT - 1] = v;
        data[BIGINT_INT_COUNT - 2] = v >> 32;
    }
    BigInt(BigInt&& v): data(v.data) {}
    BigInt(const BigInt& v): data(v.data) {}

    BigInt& operator=(BigInt v) {
        data = v.data;
        return *this;
    }

    BigInt operator+(BigInt v) const {
        BigInt res;
        wasm_bigint_add(res.data.data(), data.data(), v.data.data(), BIGINT_INT_COUNT);
        return res;
    }
    BigInt& operator+=(BigInt v) {
        operator=(operator+(v));
        return *this;
    }

    BigInt operator-(BigInt v) const {
        BigInt res;
        wasm_bigint_sub(res.data.data(), data.data(), v.data.data(), BIGINT_INT_COUNT);
        return res;
    }
    BigInt& operator-=(BigInt v) {
        operator=(operator-(v));
        return *this;
    }

    BigInt operator*(BigInt v) const {
        BigInt res;
        wasm_bigint_mul(res.data.data(), data.data(), v.data.data(), BIGINT_INT_COUNT);
        return res;
    }
    BigInt& operator*=(BigInt v) {
        operator=(operator*(v));
        return *this;
    }

    BigInt operator/(BigInt v) const {
        BigInt res;
        wasm_bigint_div(res.data.data(), data.data(), v.data.data(), BIGINT_INT_COUNT);
        return res;
    }
    BigInt& operator/=(BigInt v) {
        operator=(operator/(v));
        return *this;
    }

    BigInt operator%(BigInt v) const {
        BigInt res;
        wasm_bigint_mod(res.data.data(), data.data(), v.data.data(), BIGINT_INT_COUNT);
        return res;
    }
    BigInt operator%=(BigInt v) {
        operator=(operator%(v));
        return *this;
    }

    static BigInt gcd(BigInt a, BigInt b) {
        BigInt r;
        wasm_bigint_gcd(r.data.data(), a.data.data(), b.data.data(), BIGINT_INT_COUNT);
        return r;
    }

    static BigInt lcm(BigInt a, BigInt b) {
        return (a * b) / BigInt::gcd(a, b);
    }

    bool operator==(BigInt v) const {
        return data == v.data;
    }
    bool operator!=(BigInt v) const {
        return data != v.data;
    }
    bool operator>(BigInt v) const {
        return data > v.data;
    }
    bool operator>=(BigInt v) const {
        return data >= v.data;
    }
    bool operator<(BigInt v) const {
        return data < v.data;
    }
    bool operator<=(BigInt v) const {
        return data <= v.data;
    }

    explicit operator double() const {
        double res;
        wasm_bigint_double(&res, data.data(), BIGINT_INT_COUNT);
        return res;
    }

    private:
    std::array<uint32_t, BIGINT_INT_COUNT> data;
};

struct Fraction {
    Fraction(): Fraction(1)
    {}
    Fraction(const Fraction& other): Fraction(other.numerator, other.denominator)
    {}
    Fraction(uint64_t numerator): Fraction(BigInt(numerator))
    {}
    Fraction(BigInt numerator):
        numerator(numerator),
        denominator(1)
    {}
    Fraction(BigInt numerator, BigInt denominator):
        numerator(numerator),
        denominator(denominator)
    { rescale(); }
    Fraction& operator=(const Fraction& other) {
        numerator = other.numerator;
        denominator = other.denominator;
        return *this;
    }
    Fraction& operator*=(const Fraction& other) {
        this->operator=(this->operator*(other));
        return *this;
    }
    Fraction operator*(const Fraction& other) {
        Fraction a = {numerator, other.denominator};
        Fraction b = {other.numerator, denominator};
        return {
            a.numerator * b.numerator,
            a.denominator * b.denominator
        };
    }
    Fraction& operator+=(const Fraction& other) {
        this->operator=(this->operator+(other));
        return *this;
    }
    Fraction operator+(const Fraction& other) {
        if (denominator == other.denominator) {
            return {
                numerator + other.numerator,
                denominator
            };
        }
        return {
            numerator * other.denominator + other.numerator * denominator,
            denominator * other.denominator
        };
    }
    operator double() const {
        return double(numerator) / double(denominator);
    }

    private:

    BigInt numerator;
    BigInt denominator;

    void rescale() {
        auto scale = BigInt::gcd(numerator, denominator);
        numerator /= scale;
        denominator /= scale;
    }
};

#endif
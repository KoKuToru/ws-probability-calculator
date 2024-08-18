#ifndef FRACTION_H
#define FRACTION_H

#include <cmath>
#include <numeric>
#include "assert.h"
/*
    is there even any benefit in doing this ?..
    with this execution takes twice as long

    unlike JS implementation doesn't use BigInt
    for exact precision

    but is more accurate than fraction_simple !
*/
struct Fraction {
    Fraction():
        numerator(1),
        denominator(1)
    { rescale(); }
    Fraction(const Fraction& other):
        numerator(other.numerator),
        denominator(other.denominator)
    { rescale(); }
    Fraction(long double numerator, long double denominator = 1):
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
        assert(numerator >= 0);
        assert(denominator > 0);
        return numerator / denominator;
    }

    private:

    long double numerator;
    long double denominator;

    void rescale() {
        assert(numerator >= 0);
        assert(denominator > 0);
        // ensure nothing overflows
        const auto m = sqrt(std::numeric_limits<decltype(numerator)>::max());
        if (numerator > m || denominator > m) {
            const auto f = std::min(m / numerator, m / denominator);
            numerator   *= f;
            denominator *= f;
        }
    }
};

#endif
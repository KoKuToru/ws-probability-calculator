#ifndef FRACTION_H
#define FRACTION_H

#include <cstdint>
#include "bigint.hpp"

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
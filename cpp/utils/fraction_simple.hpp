#ifndef FRACTION_H
#define FRACTION_H

struct Fraction {
    Fraction():
        numerator(1)
    {}
    Fraction(const Fraction& other):
        numerator(other.numerator)
    {}
    Fraction(long double numerator, long double denominator = 1):
        numerator(numerator / denominator)
    {}
    Fraction& operator=(const Fraction& other) {
        numerator = other.numerator;
        return *this;
    }
    Fraction& operator*=(const Fraction& other) {
        this->operator=(this->operator*(other));
        return *this;
    }
    Fraction operator*(const Fraction& other) {
        return { numerator * other.numerator };
    }
    Fraction& operator+=(const Fraction& other) {
        this->operator=(this->operator+(other));
        return *this;
    }
    Fraction operator+(const Fraction& other) {
        return { numerator + other.numerator };
    }
    operator long double() const {
        return numerator;
    }
    private:
    long double numerator;
};

#endif
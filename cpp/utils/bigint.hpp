#ifndef BIGINT
#define BIGINT

#include <cstdint>

#ifndef __wasi__
    #error "only works in wasm"
#endif

__attribute__((__import_module__("bigint"), __import_name__("create")))
extern "C" void wasm_bigint_create(uint32_t* out_id, uint32_t high, uint32_t low);
__attribute__((__import_module__("bigint"), __import_name__("copy")))
extern "C" void wasm_bigint_copy(uint32_t* out_id, uint32_t id);
__attribute__((__import_module__("bigint"), __import_name__("destroy")))
extern "C" void wasm_bigint_destroy(uint32_t id);
__attribute__((__import_module__("bigint"), __import_name__("add")))
extern "C" void wasm_bigint_add(uint32_t* out_id, uint32_t a_id, uint32_t b_id);
__attribute__((__import_module__("bigint"), __import_name__("sub")))
extern "C" void wasm_bigint_sub(uint32_t* out_id, uint32_t a_id, uint32_t b_id);
__attribute__((__import_module__("bigint"), __import_name__("div")))
extern "C" void wasm_bigint_div(uint32_t* out_id, uint32_t a_id, uint32_t b_id);
__attribute__((__import_module__("bigint"), __import_name__("mul")))
extern "C" void wasm_bigint_mul(uint32_t* out_id, uint32_t a_id, uint32_t b_id);
__attribute__((__import_module__("bigint"), __import_name__("mod")))
extern "C" void wasm_bigint_mod(uint32_t* out_id, uint32_t a_id, uint32_t b_id);
__attribute__((__import_module__("bigint"), __import_name__("gcd")))
extern "C" void wasm_bigint_gcd(uint32_t* out_id, uint32_t a_id, uint32_t b_id);
__attribute__((__import_module__("bigint"), __import_name__("double")))
extern "C" void wasm_bigint_double(double* out_double, uint32_t a_id);
__attribute__((__import_module__("bigint"), __import_name__("equal")))
extern "C" void wasm_bigint_equal(uint32_t* out_id, uint32_t a_id, uint32_t b_id);
__attribute__((__import_module__("bigint"), __import_name__("greater")))
extern "C" void wasm_bigint_greater(uint32_t* out_id, uint32_t a_id, uint32_t b_id);
__attribute__((__import_module__("bigint"), __import_name__("less")))
extern "C" void wasm_bigint_less(uint32_t* out_id, uint32_t a_id, uint32_t b_id);

struct BigInt {
    BigInt(): id(0) {}
    BigInt(uint64_t v) {
        wasm_bigint_create(
            &id,
            (uint32_t)((v >> 32) & 0xFFFFFFFF),
            (uint32_t)(v & 0xFFFFFFFF)
        );
    }
    BigInt(BigInt&& v): id(v.id) {
        v.id = 0;
    }
    BigInt(const BigInt& v) {
        wasm_bigint_copy(&id, v.id);
    }
    ~BigInt() {
        if (id != 0) [[likely]] {
            wasm_bigint_destroy(id);
            id = 0;
        }
    }

    BigInt& operator=(BigInt&& v) {
        if (this == &v) [[unlikely]] {
            return *this;
        }
        this->~BigInt();
        id = v.id;
        v.id = 0;
        return *this;
    }

    BigInt& operator=(const BigInt& v) {
        if (this == &v) [[unlikely]] {
            return *this;
        }
        this->~BigInt();
        wasm_bigint_copy(&id, v.id);
        return *this;
    }

    BigInt operator+(const BigInt& v) const {
        BigInt res;
        wasm_bigint_add(&res.id, id, v.id);
        return res;
    }
    BigInt& operator+=(const BigInt& v) {
        decltype(id) tmp;
        wasm_bigint_add(&tmp, id, v.id);
        this->~BigInt();
        id = tmp;
        return *this;
    }

    BigInt operator-(const BigInt& v) const {
        BigInt res;
        wasm_bigint_sub(&res.id, id, v.id);
        return res;
    }
    BigInt& operator-=(const BigInt& v) {
        decltype(id) tmp;
        wasm_bigint_sub(&tmp, id, v.id);
        this->~BigInt();
        id = tmp;
        return *this;
    }

    BigInt operator*(const BigInt& v) const {
        BigInt res;
        wasm_bigint_mul(&res.id, id, v.id);
        return res;
    }
    BigInt& operator*=(const BigInt& v) {
        decltype(id) tmp;
        wasm_bigint_mul(&tmp, id, v.id);
        this->~BigInt();
        id = tmp;
        return *this;
    }

    BigInt operator/(const BigInt& v) const {
        BigInt res;
        wasm_bigint_div(&res.id, id, v.id);
        return res;
    }
    BigInt& operator/=(const BigInt& v) {
        decltype(id) tmp;
        wasm_bigint_div(&tmp, id, v.id);
        this->~BigInt();
        id = tmp;
        return *this;
    }

    BigInt operator%(const BigInt& v) const {
        BigInt res;
        wasm_bigint_mod(&res.id, id, v.id);
        return res;
    }
    BigInt operator%=(const BigInt& v) {
        decltype(id) tmp;
        wasm_bigint_mod(&tmp, id, v.id);
        this->~BigInt();
        id = tmp;
        return *this;
    }

    static BigInt gcd(const BigInt& a, const BigInt& b) {
        BigInt r;
        wasm_bigint_gcd(&r.id, a.id, b.id);
        return r;
    }

    static BigInt lcm(const BigInt& a, const BigInt& b) {
        return (a * b) / BigInt::gcd(a, b);
    }

    bool operator==(const BigInt& v) const {
        uint32_t res;
        wasm_bigint_equal(&res, id, v.id);
        return res;
    }
    bool operator!=(const BigInt& v) const {
        uint32_t res;
        wasm_bigint_equal(&res, id, v.id);
        return !res;
    }
    bool operator>(const BigInt& v) const {
        uint32_t res;
        wasm_bigint_greater(&res, id, v.id);
        return res;
    }
    bool operator>=(const BigInt& v) const {
        uint32_t res;
        wasm_bigint_less(&res, v.id, id);
        return res;
    }
    bool operator<(const BigInt& v) const {
        uint32_t res;
        wasm_bigint_less(&res, id, v.id);
        return res;
    }
    bool operator<=(const BigInt& v) const {
        uint32_t res;
        wasm_bigint_greater(&res, v.id, id);
        return res;
    }

    explicit operator double() const {
        double res;
        wasm_bigint_double(&res, id);
        return res;
    }

    private:
        uint32_t id;
};

#endif
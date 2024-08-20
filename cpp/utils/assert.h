#ifndef WS_ASSERT
#define WS_ASSERT

#ifndef __wasi__

    #include <iostream>
    #include <signal.h>

    void inline _assert(bool condition, const char* message, const char* file, int line) {
        if (condition) [[likely]]  {
            return;
        }
        std::cerr
            << file << ":"
            << line << " "
            << message << std::endl;
        raise(SIGTRAP);
    }

#else
    #include <string>

    __attribute__((__import_module__("engine"), __import_name__("assert")))
    extern "C" void wasm_assert(const char* message, int message_size, const char* file, int line_size, unsigned int line);
    __attribute__((__import_module__("engine"), __import_name__("oom")))
    extern "C" void wasm_oom(const char* message, int message_size, const char* file, int line_size, unsigned int line);

    void inline _assert(bool condition, const char* message, const char* file, int line) {
        if (condition) [[likely]] {
            return;
        }
        wasm_assert(message, strlen(message), file, strlen(file), line);
    }

    void inline _oom(bool condition, const char* message, const char* file, int line) {
        if (condition) [[likely]] {
            return;
        }
        wasm_oom(message, strlen(message), file, strlen(file), line);
    }

    #define assert_oom(condition) _oom(condition, #condition, __FILE__, __LINE__)
#endif

#ifndef assert
    #define assert(condition) _assert(condition, #condition, __FILE__, __LINE__)
#endif
#ifndef assert_oom
    #define assert_oom(condition) _assert(condition, #condition, __FILE__, __LINE__)
#endif

//#define assert(condition) {}

#endif
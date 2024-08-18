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

    void inline _assert(bool condition, const char* message, const char* file, int line) {
        if (condition) [[likely]] {
            return;
        }
        wasm_assert(message, strlen(message), file, strlen(file), line);
    }
#endif

#define assert(condition) _assert(condition, #condition, __FILE__, __LINE__)
//#define assert(condition) {}

#endif
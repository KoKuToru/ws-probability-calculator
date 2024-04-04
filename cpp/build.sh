if command -v wasm-opt &> /dev/null; then
    echo "wasm-opt      found in path, clang++ might fail!"
fi
if command -v wasm-validate &> /dev/null; then
    echo "wasm-validate found in path, clang++ might fail!"
fi

build_dir="$1"
if [[ -z "$build_dir" ]]; then
    build_dir="."
fi

clang++ main.cpp \
    -msimd128\
    -mbulk-memory\
    -mtail-call\
    -mmutable-globals\
    -mnontrapping-fptoint\
    -mreference-types\
    -msign-ext\
    -mextended-const\
    -mrelaxed-simd\
    -Wl,--strip-all\
    -mexec-model=reactor\
    -Wall\
    -flto\
    -DNDEBUG\
    --std=c++23\
    -Oz\
    --target=wasm32-unknown-wasi\
    -fno-exceptions\
    -fno-rtti\
    -ffinite-math-only\
    -ffinite-loops\
    -fno-math-errno\
    -fno-wrapv\
    -fmerge-all-constants\
    -fno-honor-nans\
    -fno-honor-infinities\
    --sysroot /usr/share/wasi-sysroot\
    -o "$build_dir/engine.wasm"

#clang++ main.cpp -mexec-model=reactor -Wall -flto -std=c++23 -O0 -fno-limit-debug-info -g3 --target=wasm32-unknown-wasi -fno-exceptions -fno-rtti --sysroot /usr/share/wasi-sysroot -o engine.wasm

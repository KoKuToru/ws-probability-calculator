#!/bin/bash

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

# tail-call not supported by wizer

clang++ main.cpp \
    -msimd128\
    -mbulk-memory\
    -mno-tail-call\
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

mkdir -p .tools
pushd .tools > /dev/null
wget -qnc https://github.com/bytecodealliance/wizer/releases/download/v5.0.0/wizer-v5.0.0-x86_64-linux.tar.xz
tar -xf wizer-v5.0.0-x86_64-linux.tar.xz
PATH="$PWD/wizer-v5.0.0-x86_64-linux":$PATH

wget -qnc https://github.com/WebAssembly/binaryen/releases/download/version_117/binaryen-version_117-node.tar.gz
tar -xf binaryen-version_117-node.tar.gz
echo -e "#/bin/bash\nnode '$PWD/binaryen-version_117/wasm-opt.js' \"\$@\"" > wasm-opt
chmod +x wasm-opt
PATH=$PWD:$PATH
popd > /dev/null

wizer -f _initialize --wasm-bulk-memory true --wasm-multi-memory true --wasm-simd true "$build_dir/engine.wasm" -o "$build_dir/engine_wizer.wasm"
wasm-opt --converge --gufa-optimizing --once-reduction --precompute-propagate  --enable-bulk-memory --enable-simd -cw -Oz "$build_dir/engine_wizer.wasm" -o "$build_dir/engine_wizer_opt.wasm"
mv "$build_dir/engine_wizer_opt.wasm" "$build_dir/engine.wasm"
rm "$build_dir/engine_wizer.wasm"
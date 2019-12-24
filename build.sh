#!/bin/sh
ROOT_DIR="$PWD"
APP_VER="1.0.1"

process_build() {
    echo "Check binary"
    file $BUILD_DIR/ds.wasm
    echo "Bind in 2-way feed"
    cd $BUILD_DIR
    wasm-bindgen --target web --no-typescript --out-dir . ds.wasm
    file ds_bg.wasm
    echo "Remake $WEB_WASM_DIR dir"
    cd $ROOT_DIR
    rm -rf $WEB_WASM_DIR
    mkdir $WEB_WASM_DIR
    echo "Copy build to $WEB_WASM_DIR dir"
    cp $BUILD_DIR/ds.js $WEB_WASM_DIR
    cp $BUILD_DIR/ds_bg.wasm $WEB_WASM_DIR
}

if [[ "$1" == "" ]]; then 
    echo "Options missing! \n"
  else 
    cd $ROOT_DIR
    WEB_WASM_DIR="web/wasm"
	case "$1" in
    '-d')
        BUILD_DIR="target/wasm32-unknown-unknown/debug"
        echo "Generate debug wasm build"
		cargo build --target wasm32-unknown-unknown
        process_build
		echo "Done!"
    ;;
    '-r')
		BUILD_DIR="target/wasm32-unknown-unknown/release"
        echo "Generate release wasm build"
		cargo build --target wasm32-unknown-unknown --release
        process_build
		echo "Done!"
	;;
    '-t')
        echo "Test rust build"
        cargo test
        echo "Done!"
    ;;
	'-s')
		echo "Start static HTTP server"
		node web/vitaarak.js -d=web/ -u=localhost -p=8080
	;;
    '-v')
        echo "Builder   version $APP_VER"
    ;;
    '-h')
        echo "Options:"
        echo " -d    to generate debug build"
        echo " -r    to generate release build"
        echo " -s    to start static http server"
        echo " -t    to test rust source code"
        echo " -v    to see the current version of the app"
        echo " -h    to see the menu of command line options"
        echo "Please choose accordingly."
    ;;
    esac
fi
exit 0
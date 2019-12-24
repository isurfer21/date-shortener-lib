import { encode, decode, default as init } from '../wasm/ds.js';

class Style {
    static addClass(elementRef, classNames) {
        if (elementRef.classList) {
            var classes = classNames.split(' ');
            elementRef.classList.add(...classes);
        } else {
            elementRef.className += ' ' + classNames;
        }
    }
    static removeClass(elementRef, classNames) {
        if (elementRef.classList) {
            var classes = classNames.split(' ');
            elementRef.classList.remove(...classes);
        } else {
            elementRef.className = elementRef.className.replace(new RegExp('(^|\\b)' + classNames.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
}

class Menu {
    static defaultState(tabId) {
        let menu = document.querySelectorAll('#menu a');
        for (let i = 0; i < menu.length; i++) {
            let menuId = menu[i].hash.substr(1);
            if (tabId == menuId) {
                Style.removeClass(document.getElementById(tabId), 'hide');
            } else {
                Style.addClass(document.getElementById(menuId), 'hide');
            }
        }
    }
    static addControl() {
        let menu = document.querySelectorAll('#menu a');
        for (let i = 0; i < menu.length; i++) {
            menu[i].addEventListener('click', (e) => {
                e.preventDefault();
                let tabId = e.target.hash.substr(1);
                Menu.defaultState(tabId);
            });
        }
    }
}

class EnDec {
    static encode(e) {
        let dateStr = document.getElementById('actdate').value;
        if (!!dateStr) {
            let dateArr = dateStr.split('-');
            let d = parseInt(dateArr[2]),
                m = parseInt(dateArr[1]),
                y = parseInt(dateArr[0]);
            let result = encode(d, m, y, true);
            let tmp = result.split('->');
            document.getElementById('tracelog').innerHTML = tmp.join('<br>&darr;<br>');
            let output = tmp[tmp.length - 1].trim();
            document.getElementById('encdate').value = output;
        } else {
            document.getElementById('tracelog').innerHTML = '';
        }
    }
    static decode(e) {
        let dateStr = document.getElementById('encdate').value.trim();
        if (!!dateStr) {
            let result = decode(dateStr, true);
            let tmp = result.split('->').reverse();
            document.getElementById('tracelog').innerHTML = tmp.join('<br>&uarr;<br>');
            let dateArr = tmp[0].split('-');
            let d = parseInt(dateArr[0]),
                m = parseInt(dateArr[1]),
                y = parseInt(dateArr[2]);
            d = (d < 10) ? '0' + d : d;
            m = (m < 10) ? '0' + m : m;
            y = (y < 100) ? '00' + y : y;
            let output = [y, m, d].join('-');
            document.getElementById('actdate').value = output;
        } else {
            document.getElementById('tracelog').innerHTML = '';
        }
    }
}

function main() {
    Menu.defaultState('app');
    Menu.addControl();

    let btnEncode = document.getElementById('encode');
    btnEncode.addEventListener('click', EnDec.encode);

    let btnDecode = document.getElementById('decode');
    btnDecode.addEventListener('click', EnDec.decode);
}

async function run() {
    await init('../wasm/ds_bg.wasm');

    // make the function available to the browser
    window.encode = encode;
    window.decode = decode;

    main();
}

run();
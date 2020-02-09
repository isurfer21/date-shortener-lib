import { encode, decode, default as init } from '../wasm/ds.js';

const APPNAME = 'DATE SHORTENER';
const APPVER = '1.0.0';

class Args {
    constructor(param) {
        this.argv = param;
    }
    parse(shortArg, longArg, typeArg, defaultVal) {
        let argVal;
        if (!!this.argv[shortArg] && typeof this.argv[shortArg] == typeArg) {
            argVal = this.argv[shortArg];
        } else if (!!this.argv[longArg] && typeof this.argv[longArg] == typeArg) {
            argVal = this.argv[longArg];
        } else {
            argVal = defaultVal;
        }
        return argVal;
    }
}

class EnDec {
    static encode(actdate, steps) {
        if (!!actdate) {
            let dateArr = actdate.split(/[\,\.\-\/]/);
            let d = parseInt(dateArr[0]),
                m = parseInt(dateArr[1]),
                y = parseInt(dateArr[2]);
            return encode(d, m, y, steps);
        } else {
            return "Invalid encode's argument";
        }
    }
    static decode(encdate, steps) {
        if (!!encdate) {
            let dateStr = encdate.trim();
            return decode(dateStr, steps);
        } else {
            return "Invalid decode's argument";
        }
    }
}

export function ds(param) {
    const args = new Args(param);
    const argVersion = args.parse('version', 'v', 'boolean', false),
        argHelp = args.parse('help', 'h', 'boolean', false),
        argEncode = args.parse('encode', 'e', 'string', null),
        argDecode = args.parse('decode', 'd', 'string', null),
        argToday = args.parse('today', 't', 'boolean', false),
        argSteps = args.parse('steps', 's', 'boolean', false);

    if (argHelp) {
        return `${APPNAME}
It is a tool to shorten (encode) the date and expand (decode) shortened date back to original date.

Usage: ds [options]

Options:
    -h, --help                 display the help menu
    -v, --version              display the application version
    -e, --encode DD-MM-YYYY    encode the provided date
    -d, --decode DMY           decode the provided code
    -t, --today                encode today's date
    -s, --steps                show with steps

Examples: 
 $ ds -v 
 $ ds -t 
 $ ds -t -s 
 $ ds -e 15/08/19 
 $ ds -e 15/08/2019 -s 
 $ ds -d f8j 
 $ ds -d f8kj -s 
    `;
    } else if (argVersion) {
        return `${APPNAME} (Version ${APPVER})
Copyright (c) 2019 Abhishek Kumar.
Licensed under the MIT License.
`;
    } else if (argToday) {
        let now = new Date();
        let d = now.getDate();
        let m = now.getMonth() + 1;
        let y = now.getFullYear();
        return encode(d, m, y, argSteps);
    } else if (!!argEncode) {
        return EnDec.encode(argEncode, argSteps);
    } else if (!!argDecode) {
        return EnDec.decode(argDecode, argSteps);
    } else {
        return 'Arguments missing';
    }
}

init();
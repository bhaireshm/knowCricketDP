"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;
/**
* @param obj - accepts only object
*/
function print(title, obj) {
    let l = ((o) => {
        let w = 0;
        for (let k in o) {
            let l = `${k}`.length;
            w = l > w ? l : w;
        }
        return w;
    })(obj);
    console.log(title);
    for (let k in obj) {
        let s = ' '.repeat(l - `${k}`.length);
        console.log(` ${k.toUpperCase()}${s} : ${obj[k]}`);
    }
}
exports.print = print;

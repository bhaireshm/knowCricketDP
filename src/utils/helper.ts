/**
* @param obj - accepts only object
*/
export function print(title: string, obj: any) {
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
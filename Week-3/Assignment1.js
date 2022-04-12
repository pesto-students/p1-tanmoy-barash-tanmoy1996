function memoize(fn){
    const cache = new Map();
    return function(...args){
        const key =args.toString();
        if(cache.has(key)){
            return cache.get(key);
        }
        cache.set(key,fn(...args));
        return cache.get(key);
    }
}

function add(a=0,b=0){
    return a+b;
}
function time(fn){
    console.time();
    fn();
    console.timeEnd();
}

const memoizeAdd = memoize(add)
time(()=> {memoizeAdd(100,100)});
time(()=> {memoizeAdd(100)});
time(()=> {memoizeAdd(100,200)});
time(()=> {memoizeAdd(100,100)});

let obj = {
    _i: 0,
    [Symbol.iterator]() {
        return this;
    },
    next(){
        return {value: this.fib(this._i++), done: this._i>10};
    },
    fib(val){
        if(val<2)
            return val;
        else
            return this.fib(val-1)+this.fib(val-2);
    }
}

for(const el of obj){
    console.log(el);
}
function createStack() {
    let items=[];

    return {
        getItems(){
            return items;
        },
        push(item){
            items.push(item);
        },
        pop(item){
            items.pop(item);
        }
    }

}
const stack = createStack();
stack.push(10);
stack.push(15);
stack.push(5);
stack.pop();
console.log(stack.getItems());
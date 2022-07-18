class Node{
    constructor(val){
        this.data = val;
        this.next = null;
    }
}
class List{
    constructor(){
        this.head=null;
        this.size=0;
    }
    create(arr){
        var l = arr.length;
        for(var i=0;i<l;i++)
        {
            this.add(arr[i])
        }
    }
    add(val){
        var current;
        var node = new Node(val)
        if(this.head==null){
            this.head = node;
        }
        else{
            current = this.head;
            while(current.next){
                current=current.next;
            }
            current.next = node;
            this.size++;
        }
    }
    display(){
        var current = this.head;
            console.log("The list is: ")
            while(current.next){
                console.log(`${current.data}`)
                current=current.next;
            }
            console.log(`${current.data}`)
    }
    reverse(){
        if(this.size<2)
        return;
        var beforeCurrent2 = this.head;
        var beforeCurrent1 = this.head.next;
        var current = this.head.next.next;
        
        while(current.next){
            beforeCurrent1.next = beforeCurrent2;
            beforeCurrent2=beforeCurrent1;
            beforeCurrent1=current;
            current=current.next
        }
        beforeCurrent1.next = beforeCurrent2;
        current.next = beforeCurrent1;
        this.head.next=null;
        this.head = current;
    }
}

var list = new List();
list.create([1,2,3,4,5,6]);
list.display();
list.reverse();
console.log("Reversed:")
list.display();

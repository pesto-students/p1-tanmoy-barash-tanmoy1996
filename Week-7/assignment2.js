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
    rotate(idx){
        var current = this.head;
        var start,end;
        while(current.next){
            if(--idx==0){
                end= current;
                start = current.next;
            }
            current=current.next;
        }
        current.next=this.head;
        end.next=null;
        this.head=start;
    }
}
var list = new List();
list.create([1,2,3,4,5,6,7,8]);
list.display();
list.rotate(4);
list.display();
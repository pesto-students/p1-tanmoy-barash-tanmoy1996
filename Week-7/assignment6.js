// Implimenting Queue using 2 stack

var queue=new Array(5);
var temp = new Array(5);
var max=queue.length;
var top=-1;
var tempTop=-1;
function enqueue(value){
    if(top==-1 ){
        top=0;
        queue[top]=value;
        console.log(`Enqueued Value:${queue[top]}`);
    }
    else if(top==max-1){
        console.log("Queue Overflowen");
    }
    else{
        top++;
        queue[top]=value;
        console.log(`Enqueued Value:${queue[top]}`);
    }
}
function dequeue(){
    if(top==-1){
        console.log("Queue Underflowen");
    }
    else if(top==0){
        console.log(`Dqueued Value: ${queue[top]}`);
        top=-1;
    }
    else{
        while(top>=0)
        {
            temp[++tempTop]=queue[top--];
        }
        console.log(`Dqueued Value: ${temp[tempTop]}`);
        tempTop--;
        while(tempTop>=0)
        {
            queue[++top]=temp[tempTop--];
        }
    }
}
function display(){
    if(top==-1){
        console.log("Queue Underflowen");
    }
    else{
        for(let i=top;i>=0;i--){
            console.log(`${i}- ${queue[i]}`);
        }
    }
}
dequeue();
enqueue(10);
enqueue(20);
enqueue(30);
enqueue(40);
enqueue(50);
display();
enqueue(60);
dequeue();
dequeue();
dequeue();
dequeue();
dequeue();
dequeue();
display();
enqueue(60);
display();
function sum (a ,b){
    return this.a+this.b;
}

//Bind creats a new function
const sumB = sum.bind({a:10,b:15}) 
console.log("Binding: ", sumB());


//calling pass a object without creating a new function
console.log("Calling: ",sum.call({a:15,b:20}));

//apply uses array as parameter
var numbers = [1,2,3,5,4];
var max = Math.max.apply(null, numbers);
var max1 = Math.max.call(null,...numbers);
console.log("Max from Apply: ",max);
console.log("Max1 from Call: ",max1);




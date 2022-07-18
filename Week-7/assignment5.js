function checkMax(n,arr){
    var val = arr.find((el)=>{return el>n});
    return val?val:-1

}
function nextGreaterElement(arr){
    var newArr=[];
    var l = arr.length;
    for(let i=0;i<l;i++){
        var n = arr[0]
        arr.splice(0,1)
        newArr[i] = checkMax(n,arr) 
    }
    return newArr;
}

console.log(nextGreaterElement([1,3,2,4]))
console.log(nextGreaterElement([6,8,0,1,3]))
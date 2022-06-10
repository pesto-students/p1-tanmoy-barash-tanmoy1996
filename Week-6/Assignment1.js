function contiguousSum(arr){
    var max = 0;
    var subMax = 0;
    for(let i in arr){
        subMax+=arr[i];
        if(subMax < 0)
            subMax = 0;
        if(max<subMax)
            max=subMax
        }
    return max;
}
console.log(contiguousSum([-2,1,-3,4,-1,2,1,-5,4]));
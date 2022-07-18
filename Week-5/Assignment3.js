function hasDuplicate(arr){
    var bool = false;
    console.log("Array: ",arr);
    const elements = new Set();
    arr.forEach(el => {
        if(elements.has(el))
        {
            bool = true;
        }
        else{
            elements.add(el);
        }
    });
    return bool;
}


console.log(hasDuplicate([1,5,-1,4]))

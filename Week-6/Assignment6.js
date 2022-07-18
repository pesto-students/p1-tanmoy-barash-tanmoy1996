function close(arr,n){
    let sumClose = Infinity;
    let size = arr.length;
    for(let i=0; i<size; i++){
        for(let j=i+1; j<size; j++){
            for(let k=j+1; k<size; k++){
                var sum = arr[i]+arr[j]+arr[k];
                // console.log("Sum: ",sum);
                // console.log("SumClose: ",sumClose);
                if(Math.abs(sum-n)<Math.abs(sumClose-n)){
                    sumClose=sum;
                }
            }
        }
    }
    return sumClose;
}

console.log(close([-1, 2, 1, -4],1))
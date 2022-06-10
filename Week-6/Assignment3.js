function sort(arr)
{
    var sarr=[]
    var lo=0, mid=0, hi=0;
    for(let i in arr)
    {
        if(arr[i]==0){
            sarr.splice(lo++,0,0); 
            mid++;
            hi++;
        }
        if(arr[i]==1){
            sarr.splice(mid++,0,1); 
            hi++;
        }
        if(arr[i]==0){
            sarr.splice(hi++,0,2);
        }
    }
    return sarr;
}

console.log(sort([0, 2, 1, 2, 0]))
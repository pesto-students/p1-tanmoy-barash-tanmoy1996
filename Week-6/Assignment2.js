function spiral(arr){
    var spi=[];
    var n = arr.length;
    var row=0;
    var col=-1;
    while(n>0)
    {
        for(let i =0; i<n;i++){
            spi.push(arr[row][++col])
        }
        for(let i =0; i<n-1;i++){
            spi.push(arr[++row][col])
        }
        for(let i =0; i<n-1;i++){
            spi.push(arr[row][--col])
        }
        for(let i =0; i<n-2;i++){
            spi.push(arr[--row][col])
        }
        n-=2;
    }
    return spi;
}

console.log(spiral([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]))
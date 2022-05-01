function getNumber(){
    var num= Math.round(Math.random()*100);
    return new Promise((res,rej)=>{
        if(num%5==0)
            rej(num);
        else
            res(num);
    })
} 

getNumber()
    .then((res)=>console.log(`Random Number is: ${res}`))
    .catch((rej)=>console.log(`No is divisible by 5: ${rej}`))
    .finally(()=>console.log(`Promise Handled`));


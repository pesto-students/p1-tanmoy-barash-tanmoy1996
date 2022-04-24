const getname = () => new Promise((res,rej)=>{
    var num= Math.round(Math.random()*100);
    if(num%5==0)
        rej(num);
    else
        res(num);
})

getname()
    .then((res)=>console.log(`Random Number is: ${res}`))
    .catch((rej)=>console.log(`No is divisible by 5: ${rej}`))
    .finally(()=>console.log(`Promise Handled`));


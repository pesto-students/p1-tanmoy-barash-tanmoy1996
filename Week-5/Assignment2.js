const vowels=['A','E','I','O','U'];
const vow = new Map([ ["A", 0], ["E", 0], ["I", 0], ["O", 0], ["U", 0] ]);
function isVowel(ch){
    const idx =  vowels.find(el=>ch==el)
    if(vow.has(ch)){
        var val = vow.get(ch)
        vow.set(ch,++val)
    }
    return idx?idx:false;
}
function vowelCount(str){
    var m = new Map();
    var s =str.split("");
    s.forEach(el => {
        isVowel(el.toUpperCase())
    });
    console.log("vow: ",vow);
}

vowelCount("Aabei")
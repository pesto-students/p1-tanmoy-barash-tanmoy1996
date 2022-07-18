function upload()
{
    var images= document.getElementById('pic').files;
    var allPics=''
    for(var i=0; i<images.length;i++)
    {
        var src = URL.createObjectURL(images[i]);
        var img= `<img src="${src}" alt="Pic${i}" width="150px"/>`
        allPics+=img

    }
    document.getElementById('gallery').innerHTML=allPics;
}
function login()
{
    var username= document.getElementById('username').value;
    var email= document.getElementById('email').value;
    console.log("username: ",username);
    console.log("email: ",email);

}
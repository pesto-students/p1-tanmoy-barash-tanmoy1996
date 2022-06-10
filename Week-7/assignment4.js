function checkParenthesis(str){
    var stack=[];
    var top=-1;
    for(i in str){
        // console.log(str[i])
        if(top==-1){
            top=0;
            stack[top]=str[i];
        }
        else if(stack[top]=='[' && str[i]==']' || stack[top]=='{' && str[i]=='}' || stack[top]=='(' && str[i]==')'){
            top--;
        }
        else{
            top++;
            stack[top]=str[i]
        }
    }
    // console.log(top);
    return top==-1?true:false;


}
console.log(checkParenthesis("[()]{}{()}"));
console.log(checkParenthesis("[(])"));
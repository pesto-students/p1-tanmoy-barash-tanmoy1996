const initState ={
    isLightOn:true
}
const rootReducer = (state = initState,action)=>{
    console.log(action.type);
    if(action.type=='TOGGLE'){
        return {
            isLightOn: !state.isLightOn
        };
    }
    return state;
}

export default rootReducer
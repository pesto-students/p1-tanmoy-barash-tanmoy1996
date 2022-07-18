const initState ={
    steps:0
}
const rootReducer = (state = initState,action)=>{
    console.log(action.type);
    if(action.type=='ADD_STEP'){
        return {
            steps: ++state.steps
        };
    }
    else if(action.type=='RESET_STEPS'){
        return {
            steps: 0
        };
    }
    return state;
}

export default rootReducer
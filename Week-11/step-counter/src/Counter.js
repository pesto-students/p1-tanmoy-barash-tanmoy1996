import './index.css'
import {connect} from 'react-redux'

function Counter(props) {
  // console.log(props);
  const {steps, addStep, resetSteps}=props

  const add = () => {
    addStep();
  };
  const reset = () => {
    resetSteps();
  };
  return (
    <div>
      <h3>You've walked {steps} steps today!</h3>
      <button className="btn purple" onClick={add}>Add a Step</button>
      <br/>
      <button className="btn" onClick={reset}>Reset Steps</button>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {
    steps:state.steps
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    addStep: ()=>{ dispatch({type: 'ADD_STEP'})},
    resetSteps: ()=>{ dispatch({type: 'RESET_STEPS'})}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)

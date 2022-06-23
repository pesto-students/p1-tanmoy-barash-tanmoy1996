import './index.css'
import {connect} from 'react-redux'

function Room(props) {
  // console.log(props);
  const {isLightOn, toggleSwitch}=props

  const flipLight = () => {
    toggleSwitch();
  };

  const lightedness = isLightOn ? "lit" : "dark";
  return (
    <div className={`room ${lightedness}`}>
      the room is {lightedness}
      <br />
      <button onClick={flipLight}>flip</button>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {
    isLightOn:state.isLightOn
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    toggleSwitch: ()=>{ dispatch({type: 'TOGGLE'})}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Room)

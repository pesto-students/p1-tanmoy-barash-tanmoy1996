import React, { Component } from 'react'
import axios from 'axios';
import './style.css'

const url = 'http://localhost:3001/api/'

export default class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities:[{name:'Select',id:''}],
    };
  }
  componentDidMount() {
    this.getCities();
  }
  async getCities(){
    await axios.get(`${url}cities`)
    .then(res=>{
      if(res.status===200){
        this.setState({cities:[...this.state.cities,...res.data.cities]})
      }
    })
  }
  render() {
    const {cities}= this.state;
    return (
      <div>
        <select 
        className='selector' 
        onChange={(e)=>this.props.filterBy(e.target.value)}
        value={this.props.selected}>
          {
            cities.map((op,idx)=>{
              return <option key={idx} value={op.id}>{op.name}</option>
            })
          }
        </select>
        
      </div>
    )
  }
}


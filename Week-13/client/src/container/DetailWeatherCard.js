import React from 'react';
import axios from "axios";
import SelectDate from './SelectDate';
import { FiWind } from 'react-icons/fi';
import { MdWaterDrop } from 'react-icons/md';
import { FaCloud } from 'react-icons/fa';


import './style.css';

const url = 'http://localhost:3001/api/'

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current:{},
      forecast:{},
      name:'',
    };
  }
  componentDidMount() {
    this.getDetailWeather();
  }
  getDetailWeather(){
    if(this.props.cityId !=''){
      axios.get(`${url}weather?cityId=${this.props.cityId}`)
      .then(res=>{
        if(res.status===200){
          this.setState({name:res.data.data.location.name, current:res.data.data.current, forecast:res.data.data.forecast})
        }
      });
    }
  }
  async filterBy(date){
    if(date !==''){
      console.log(date)
    }
  }
  render() {
    let {name,current,forecast} = this.state;
    return (
      <div>
        <div className='d-flex justify-end'>
          {
            // api was not free for testing
            false &&
            <SelectDate filterByDate={this.filterBy.bind(this)}/>
          }
        </div>
        <div className="wcard">
          <div className="justify-space-around">
              <div>{current.condition &&
                <img className="wicon" src={current.condition.icon} alt="weather icon"></img>}
              </div>
            <div className='text-center'>
              <h2>{name}</h2>
              <h1>{current.temp_c?current.temp_c+'°C':null}</h1>
                <p>  {current.feelslike_c?'feels like '+current.feelslike_c+'°C':null} </p>
            </div>
            <div>
              {/* wind speed */}
              <div className="d-flex align-center">
                <FiWind/>
                <p className="pl-1 textLarge2">{current.wind_kph? current.wind_kph:null} </p>
                <p className="pl-1 textSmall mt-3">{current.wind_kph? 'kmph':null} </p>
              </div>
              {/* clouds */}
              <div className="d-flex align-center">
                <FaCloud/>
                <p className="pl-1 textLarge2">{current.cloud? current.cloud:null} </p>
                <p className="pl-1 textSmall mt-3">{current.cloud? '%':null} </p>
              </div>
              {/* humidity */}
              <div className="d-flex align-center">
                <MdWaterDrop/>
                <p className="pl-1 textLarge2">{current.humidity? current.humidity:null} </p>
                <p className="pl-1 textSmall mt-3">{current.humidity? '%':null} </p>
              </div>
            </div>
          </div>

            { forecast.forecastday &&
              <div>
              <h3>Forcast</h3>
                {forecast.forecastday.map((day,idx)=>{
                  if(idx==0){
                    return;
                  }
                  return (
                    <div className="d-flex" key={idx}>
                    <div className="text-center">{day.day.condition &&
                      <img className="iconsmall" src={day.day.condition.icon} alt="weather icon"></img>}
                      <p className="textLarge pa-0 ma-0">
                        <span>{ parseInt(day.day.mintemp_c)+'°' }</span>
                        / 
                        <span>{ parseInt(day.day.maxtemp_c)+'°' }</span>
                        </p>
                      <p className="textMid text-center">{new Date(day.date).toString().substring(0,10)}</p>
                    </div>
                    <div className="d-flex scroll ml-3">
                    {
                      day.hour.map((h,i)=>{
                        if(i%2==0){
                          return (
                            <div key={i} className="hour text-center">{h.condition &&
                              <img className="iconsmall" src={h.condition.icon} alt="weather icon"></img>}
                              <p className="textMid text-center">{h.time.substring(11)}</p>
                              <p className="textMid text-center">{h.condition.text}</p>
                            </div>
                          )
                        }
                      })
                    }
                    </div>
                    
                  </div>
                  )
                })}
                
              </div>
            }
        </div>
      </div>
    );
  }
}

export default Weather;
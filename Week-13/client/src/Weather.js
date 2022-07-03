import React from 'react';
import axios from "axios";
import { FiWind, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdWaterDrop } from 'react-icons/md';
import { FaCloud } from 'react-icons/fa';


import './Weather.css';

const url = 'http://localhost:3001/api/'

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities:[],
      city: 'Kolkata',
      temp: 'C',
      current:{},
      forecast:{},
    };
  }
  componentDidMount() {
    axios.get(`${url}cities`)
    .then(res=>{
      if(res.status===200){
        let cities = res.data.cities;
        this.setState({cities:cities})
        this.cityChange();
      }
    })
  }
  cityChange() {
    var city = document.querySelector('#city').value;
    if(city !=''){
      axios.get(`${url}weather?city=${city}`)
      .then(res=>{
        if(res.status===200){
          this.setState({city:city, current:res.data.data.current, forecast:res.data.data.forecast})
        }
      });
    }
  }

  render() {
    let {cities,current,forecast,temp} = this.state;
    return (
      <div className="weather">
        <div className="card">
          <div className="justify-center line1">
            <p>Right now in </p>
            <select className="city" name="city" id="city" onChange={()=>{this.cityChange()}}>
              {cities.map((city,idx)=>{
                return <option value={city} key={idx}>{city}</option>
              })}
            </select>
            <p>, it's {current.condition?current.condition.text:''}</p>
          </div>

          <div className="justify-space-around">
              <div>{current.condition &&
                <img className="icon" src={current.condition.icon} alt="weather icon"></img>}
              </div>
            <div className='currentStatus'>
              <h1>{current.temp_c && temp==='C'?current.temp_c+'°':null}</h1>
              <h1>{current.temp_f && temp==='F'?current.temp_f+'°':null}</h1>
                <p>  {current.feelslike_c && temp==='C'?'feels like '+current.feelslike_c+'°':null} </p>
                <p>{current.feelslike_f && temp==='F'?'feels like '+current.feelslike_f+'°':null} </p>
            </div>
            <div>
              {/* wind speed */}
              <div className="d-flex">
                <FiWind/>
                <p className="pl textLarge2">{current.wind_kph? current.wind_kph:null} </p>
                <p className="pl textSmall">{current.wind_kph? 'kmph':null} </p>
              </div>
              {/* clouds */}
              <div className="d-flex">
                <FaCloud/>
                <p className="pl textLarge2">{current.cloud? current.cloud:null} </p>
                <p className="pl textSmall">{current.cloud? '%':null} </p>
              </div>
              {/* humidity */}
              <div className="d-flex">
                <MdWaterDrop/>
                <p className="pl textLarge2">{current.humidity? current.humidity:null} </p>
                <p className="pl textSmall">{current.humidity? '%':null} </p>
              </div>
            </div>
          </div>

            { forecast.forecastday &&
              <div className="justify-space-around">
                <button className="btnIcon"> <FiChevronLeft/> </button>
                {forecast.forecastday.map((day,idx)=>{
                  if(idx==0){
                    return;
                  }
                  return (
                    <div key={idx} className="text-center mt">
                    {/* <TiWeatherPartlySunny/> */}
                    <div>{day.day.condition &&
                      <img className="iconsmall" src={day.day.condition.icon} alt="weather icon"></img>}
                    </div>
                    <p className="textLarge">
                      <span>{ temp==='C'?parseInt(day.day.mintemp_c)+'°':null }</span>
                      <span>{ temp==='F'?parseInt(day.day.mintemp_f)+'°':null }</span> 
                      / 
                      <span>{ temp==='C'?parseInt(day.day.maxtemp_c)+'°':null }</span>
                      <span>{ temp==='F'?parseInt(day.day.maxtemp_f)+'°':null }</span>
                      </p>
                    <p className="textMid">{new Date(day.date).toString().substring(0,10)}</p>
                  </div>
                  )
                })}
                <button className="btnIcon"> <FiChevronRight/> </button>
              </div>
            }

          <div className="justify-center mt">
            <button className="btn" onClick={()=>this.setState({temp:'F'})}> °F </button>
            <button className="btn" onClick={()=>this.setState({temp:'C'})}> °C </button>
          </div>
        </div>
    </div>
    );
  }
}

export default Weather;
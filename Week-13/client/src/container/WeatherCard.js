import React from 'react'
import { MdWaterDrop } from 'react-icons/md';
import { FaCloud } from 'react-icons/fa';

import './style.css'
import '../App.css'

export default function WeatherCard(props) {
  // console.log(props.obj);
  return (
    <div className='card cursor-pointer' onClick={(e)=>props.filterBy(props.obj.id)}>
      <h1>{props.obj.name}</h1>
      <h3>{props.obj.main.temp}°C</h3>
      <p>{props.obj.main.temp_min}°C / {props.obj.main.temp_max}°C</p>
      <div className="d-flex align-center">
        <MdWaterDrop/>
        <p className='ml-1'>{props.obj.main.humidity}</p>
      </div>
      <div className="d-flex align-center">
        <FaCloud/>
        <p className='ml-1'>{props.obj.clouds.all}%</p>
      </div>
      <h4>{props.obj.weather[0].main}</h4>      
    </div>
  )
}

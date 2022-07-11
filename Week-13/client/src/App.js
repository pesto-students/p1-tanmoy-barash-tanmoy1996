import React, { PureComponent } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from './container/Button';
import Reset from './container/Reset';
import Selector from './container/Selector';
import WeatherCard from './container/WeatherCard';
import DetailWeatherCard from './container/DetailWeatherCard';

import axios from 'axios';

import './App.css'

const url = 'http://localhost:3001/api/'
export default class App extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      page:1,
      citiesWeather:[],
      filterId:-1,
      filteredCity:'',
    }
  }
  componentDidMount() {
    this.getCitiesWeather();
  }
  componentDidUpdate() {
    if(this.state.filterId >-1){
      this.getCityWeatherById();
    }
    else if(!this.state.citiesWeather[this.state.page*3-1]){
      this.getCitiesWeather();
    }
  }
  async getCityWeatherById(){
    await axios.get(`${url}cityId?id=${this.state.filterId}`)
    .then(res=>{
      if(res.status===200){
        this.setState({...this.state,filterId:-1,filteredCity:res.data.data})
      }
    })
  }
  async getCitiesWeather(){
    await axios.get(`${url}cw?page=${this.state.page}`)
    .then(res=>{
      if(res.status===200){
        this.setState({...this.state,citiesWeather:[...this.state.citiesWeather,...res.data.data]})
      }
    })
  }
  async filterBy(value){
    if(value !==''){
      this.setState({...this.state,filterId:parseInt(value)});
    }
    else{
      this.setState({...this.state,filteredCity:''});
    }
  }
  next(){
    this.setState({...this.state,page:this.state.page+1})
  }
  prev(){
    this.setState({...this.state,page:this.state.page-1})
  }
  render() {
    const {page,citiesWeather,filteredCity} = this.state;
    return (
      <div className='App d-flex justify-center align-center'>
        <div>
          {/* filter */}
          <div className='d-flex justify-end align-center mb-3'>
            {
              filteredCity !='' ?
              <Reset filterBy={this.filterBy.bind(this)}/>
              :
              <>
                Filter By City
                <Selector filterBy={this.filterBy.bind(this)} selected={filteredCity.id}/>
              </>
            }
            
          </div>
          {/* pages */}
          <div className='d-flex align-center'>
            { filteredCity =='' &&
              <Button action={this.prev.bind(this)} disabled={page===1}>
                <FiChevronLeft />
              </Button>
            }
              {
                filteredCity =='' ?
                citiesWeather.filter((c,i)=>{if(i>=(page*3-3) && i<page*3){ return true}}).map((c,idx)=>{
                  return <WeatherCard key={idx} obj={c} filterBy={this.filterBy.bind(this)}/>
                })
                : <DetailWeatherCard cityId={filteredCity.id}/>
              }
              { filteredCity =='' &&
                <Button action={this.next.bind(this)} disabled={page===4}>
                  <FiChevronRight/>
                </Button>
              }
          </div>
        </div>
      </div>
    )
  }
}
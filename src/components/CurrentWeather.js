import React, { Component } from 'react';

export default class Current extends Component {
  _openModal = () => {
    this.props._openModal()
  }
  render(){
    const currentWeather = this.props.currentWeather
    const city           = this.props.city
    const unit           = this.props.unit
    
    const temp = currentWeather.main ? Math.round(currentWeather.main.temp) :'0' 
    const temp_min = currentWeather.main ? currentWeather.main.temp_min :'0' 
    const humidity = currentWeather.main ? currentWeather.main.humidity :'0' 

    return (
      <div className="current-weather">
        <div id="city">{city}<span onClick={this._openModal}><img src={require('../find.svg')} alt="search icon"/></span></div>
        <div className="current-weather-wrapper">
          <div id="temp-min">&#8600; {temp_min}{unit}</div>
          <div id="humidity"><span><img src={require('../drop.svg')} alt="humidity icon"/></span> {humidity}%H</div>
          <div id="temp">{temp}{unit}</div>
        </div>
      </div>
    )
  }
}
import React, { Component } from 'react';

class Forecast extends Component {
    extractDate(date){
        return date.split(' ')[0].split('-');
    }
    render() 
    {
        const forecast = this.props.forecast
        return (
            <ul className="forecast">
                {
                    forecast.map((forecast, index)=>{
                    const day      = this.extractDate(forecast.dt_txt)

                    return <li key={index} className="forecast_day">
                            <div id="date">{day[2]+'/'+day[1]}</div>
                            <div id="temp"><span>{Math.round(forecast.main.temp)} </span></div>                    
                            <div id="weather-description">{forecast.weather[0].description} </div>
                            <div id="lower-temp">&#8600; {Math.round(forecast.main.temp_min)} {this.props.unit}</div>
                            <div id="humidity">H: {forecast.main.humidity} %</div>
                        </li>
                    })
                }
            </ul>
        )
    }   
}
export default Forecast;

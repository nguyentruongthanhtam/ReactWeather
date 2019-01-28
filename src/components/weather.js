import React, { Component } from 'react';
import Forecast from './Forecast';
import CurrentWeather from './CurrentWeather';
import SearchBar from './SearchBar';
const FLICKR_API_KEY = process.env.REACT_APP_FLICKR_KEY
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_KEY
class Weather extends Component {
    constructor(props){
        super(props)
        this.state = {
            city: null,
            forecast: [],
            currentWeather: {},
            photo: {
                src: '',
                owner: '',
            },
            unit: ['°C','°F'],
            modal: true
        }
    }
    initCity(city){
        this.setState({city:city})
        this.getWeatherData(city,this.state.unit[0]);
    }
    // Fetch Photo from Flickr API based on the coordinate
    getPhoto(lon,lat){
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=1&lat=${lat}&lon=${lon}&extras=owner_name&per_page=200&sort=interestingness-desc`)
        .then(res => res.json())
        .then(data => {
            if(data.stat === 'ok'){
                var photo = data.photos.photo[Math.floor(Math.random()*data.photos.photo.length)];
                var id = photo.id;
                fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${FLICKR_API_KEY}&photo_id=${id}&format=json&nojsoncallback=1`)
                .then(res => res.json()).then(response => {
                    if(response.stat === 'ok'){

                        // Get small size image for small screen 
                        const size = window.innerWidth <= 420 ? response.sizes.size.length - 6 : response.sizes.size.length - 2// small size screen

                        const url = response.sizes.size[size].source; 
                        const photoSource = {src: url, owner: photo.ownername}
                        this.setState({photo: photoSource})
                   } 
                }).catch(err=>{
                    console.log(err);  
                })
            }
        })
    }

    // get weather from OpenWEather API base on the city name and unit
    getWeatherData (city,unit){
        var queryUnit = unit ==='°C' ? 'metric' : 'imperial';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appId=${WEATHER_API_KEY}&units=${queryUnit}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                currentWeather: data
            })
            // Get photo of the coordinate
            this.getPhoto(data.coord.lon,data.coord.lat);
        }).catch(error=>{
            this.setState({city: 'city not found'})
        })     
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appId=${WEATHER_API_KEY}&units=${queryUnit}`)
        .then(res => res.json())
        .then(data => {
            var forecastArray = [];
            var step = 8; // get the forecast at the same hour
            for(var i=0 ;i<data.list.length; i+=step){
                forecastArray.push(data.list[i]);
            }
            this.setState({
                forecast: forecastArray
            })
        })
        .catch(error=>{
            this.setState({city: 'city not found'})
        })     
    }
    // Toggle City choosing panel
    _onOpenModal = () => {
        this.setState({
            modal: true
        })
    }
    // On city changed 
    _onCityChosen = (chosen_city) => {
        this.setState({
            modal: false,
            city : chosen_city
        })
        this.getWeatherData(chosen_city,this.state.unit[0]);
    }

    // On unit changed
    toggleUnits = (e) => {
        var units = this.state.unit.reverse();
        this.setState({unit: units});
        this.getWeatherData(this.state.city,this.state.unit[0])
    }
    // Render modal function
    renderModal()
    {
        if(this.state.modal)
        return <SearchBar onCityChosen={this._onCityChosen}></SearchBar>   
    }
    // Render method of the weather component
    render() {
    
        // States of background image  
    var photoSrc   = this.state.photo.src
    var photoOwner = this.state.photo.owner
    
      //   State of the forecast component
    var forecast = this.state.forecast
    var unit     = this.state.unit
    
    //   State of the current weather
    var currentWeather = this.state.currentWeather
    var city           = this.state.city
    
    return (
        <div id="wrapper"
            data-owner={photoOwner}
            style={{backgroundImage: `url(${photoSrc})`}} >

            {/* The information section contains the weather info */}
            <div id="information">
                {/* 5-day forecast component */}
                <Forecast forecast= {forecast}/>

                {/* Current weather component */}
                <CurrentWeather 
                    unit = {unit[0]}
                    currentWeather = {currentWeather}
                    city = {city}
                    _openModal = {this._onOpenModal} />
            </div>

            {/* Choosing unit button */}
            <p className="unit" onClick={this.toggleUnits}>{unit[0]}</p>

            {/* Choossing city Modal */
                this.renderModal()
            }
            
        </div>
    );
  }
}

export default Weather;

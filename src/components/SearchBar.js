import React, { Component } from 'react';
import anime from 'animejs'
class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            city: '',
        }
    }
    componentDidMount()
    {
        anime({
            targets: ['#modal','#modal input', '#modal span'],
            easing: 'easeInOutSine',
            duration: 300,
            opacity: [0.5,1],
            delay: anime.stagger(100),
        })
    }
    // change city name
    _onchange = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    searchAnimation()
    {
        // return the chosen city name to the parent 
        const goBack = () => {
            return this.props.onCityChosen(this.state.city)
        }
        // Animation sequence of the weather icon
        anime.timeline({easing: 'easeInOutSine'})
        .add({
            targets: '#modal input',
            duration: 150,
            width: 0
        })
        .add({
            targets: '#modal img',
            opacity: 0,
            duration: 150,
        })
        .add({
            targets: '#modal svg .cls-1',
            opacity: [0,1],
            fill: ['rgba(0,0,0,0)' , '#fbed63'],
            translateY: ['+30',0],
            delay: 150,
            duration: 500,
        })
        .add({
            targets: '#modal svg .cls-3',
            opacity: [0,1],
            fill: ['rgba(0,0,0,0)' , '#fff'],
            translateX: ['-30',0],
            duration: 500,
        })
        .add({
            targets: '#modal svg .cls-1',
            opacity: 0,
            duration: 500,
        })
        .add({
            targets: '#modal svg .cls-3',
            translateX: 30,
            duration: 500,
        })
        .add({
            targets: '#modal svg .cls-2',
            translateY: ['-40',0],
            opacity: 1,
            duration: 500,
        })
        .add({
            targets: '#modal',
            duration: 350,
            background: 'rgba(100,100,100,0)',
            complete: ()=>{
                // go back to parent component when animation completed
                goBack()
            }
        })
    }
    search = (e) => {
        this.searchAnimation()
    }
  render() {
    return (
      <div id="modal">
        {/* City name input field */}
        <input  
            type="text" 
            placeholder="Show the weather of.." 
            name="search-bar" 
            onChange={this._onchange}     
            ref={this.cityInput}
        />
        {/* Search Button */}
        <span onClick={this.search}><img src={require('../find.svg')} alt="search icon"/></span>
        {/* Weather Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 211.76"><title>Weather</title><g id="Layer_2" data-name="Layer 2"><g id="Sunny"><circle className="cls-1" cx="138.5" cy="77.5" r="77.5"/><g id="Rain"><line className="cls-2" x1="53.01" y1="180.99" x2="85" y2="149"/><line className="cls-2" x1="119.01" y1="175.99" x2="156.49" y2="138.51"/><line className="cls-2" x1="164.01" y1="185.99" x2="201.49" y2="148.51"/><line className="cls-2" x1="114.01" y1="209.99" x2="136.5" y2="187.5"/><line className="cls-2" x1="73.01" y1="202.99" x2="95.5" y2="180.5"/></g><path className="cls-3" d="M195,125.91a36.09,36.09,0,0,0-36.09-36.09,35.69,35.69,0,0,0-7.21.73,21.48,21.48,0,0,0-36.19-12.42,22.78,22.78,0,0,0-39.72-7.44A38,38,0,0,0,21.53,105a38.58,38.58,0,0,0,.78,7.72A24.68,24.68,0,0,0,24.06,162v0H163.34v-.28A36.09,36.09,0,0,0,195,125.91Z"/></g></g></svg>
      </div>
    );
  }
}

// <style>.cls-1{fill:#fbed63;}.cls-2{fill:#fff;}</style>
export default SearchBar;

import { render } from '@testing-library/react';
import React from 'react';


type Gps = {
    latitude: number 
    longitude: number
    weatherData: any
    temp: number 
    wind: number
    description: string
    humidity: number
}

export default class UserPosition extends React.Component< {}, Gps >  {
    constructor(props: {}) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
            weatherData: 0,
            temp: 0,
            wind: 0,
            description: "",
            humidity: 0

        }
        this.weatherCheck = this.weatherCheck.bind(this)
    }
    

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            console.log(this.state.latitude);
            console.log(this.state.longitude);
        }
        );
        
    }

    weatherCheck() {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=b8e15013886caf192c16ed2b4c284e3d`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                weatherData: data,
                temp: data.list[0].main.temp,
                wind: data.list[1].wind.speed,
                description: data.list[1].weather[0].description,
                humidity: data.list[0].main.humidity
            })
            console.log(this.state.weatherData.list[0].main.humidity);
            
            
        })
        .catch(console.log)
    }



    render() {
        return(
            <div>
                <br/>
                   <h1>Location based Weather</h1>
                   <br/>
                   <br/>
                    <button onClick={this.weatherCheck}><h1>Click Here to Check the Weather Where You Are</h1></button>
                    <br/>
                    <div>
                    {this.state.description? <h3>{this.state.description}</h3> : "Or just look outside" }
                    {this.state.temp? <h3>Temp: { (this.state.temp / 6.44).toFixed(0)}</h3> : ""}
                    {this.state.wind? <h3>Wind Speed: {this.state.wind} MPH</h3> : "" }
                    {this.state.humidity? <h3>Humidity: {this.state.humidity} %</h3> : "" }
                    
                    </div>
                </div>
            )
        }

}


  



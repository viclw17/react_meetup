import React, { Component } from 'react'

import Grid from 'material-ui/Grid'

import Form from './components/Form'
import Title from './components/Title'
import Weather from './components/Weather'
import './App.css'

const API_KEY='7632e42ce8517015c82865ac8b228f27'

class App extends Component {
  state = {
    temperature: null,
    city: null,
    country: null,
    humidity: null,
    description: null,
    minTemp: null,
    maxTemp: null,
    error: null
  }

  getWeather = async (event) => {
    event.preventDefault()

    console.log(this.state)

    const city = event.target.elements.city.value
    const country = event.target.elements.country.value

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`

    const api_call = await fetch(url)

    const data = await api_call.json()

    console.log(data)

    if (city && country && data.cod !== '404') {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        error: ''
      })
    } else if (city && country) {
      this.setState({
        temperature: null,
        city: null,
        country: null,
        humidity: null,
        description: null,
        minTemp: null,
        maxTemp: null,
        error: 'City not found!'
      })
    } else {
      this.setState({
        temperature: null,
        city: null,
        country: null,
        humidity: null,
        description: null,
        minTemp: null,
        maxTemp: null,
        error: 'Please fill in the form fields!'
      })
    }
  }

  render () {
    return (
      <div className='wrapper'>
        <div className='main'>
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <Title />
            </Grid>
            <Grid item xs={7} className='information-container'>
              <Form
                getWeather={this.getWeather}
              />
              <Weather
                temperature={this.state.temperature}
                country={this.state.country}
                city={this.state.city}
                humidity={this.state.humidity}
                description={this.state.description}
                minTemp={this.state.minTemp}
                maxTemp={this.state.maxTemp}
                error={this.state.error}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default App

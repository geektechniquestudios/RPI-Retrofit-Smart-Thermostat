import React, { Component } from 'react'
import MainSlider from './MainSlider'
import FadeIn from 'react-fade-in'
import ParticleContainer from './ParticleContainer'
import SpinnerContainer from './SpinnerContainer'
import Fader from 'react-fader'


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 70,
      isConnected: false,
      isLoading: true,
      isBeingChanged: false,
      snowfall: 0,
      firstTemperature: 0,
      isFirstLoad: true
    }
  }

  componentDidMount() {
    this.fetchTemperature()
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   return this.state.temperature !== nextState.temperature
  //   if(this.state.isFirstLoad === true) return true
  //   return this.state.temperature !== nextState.temperature
  // }

  fetchTemperature = () => {
    fetch('http://10.0.0.6:8080/get_temperature')
      .then(res => res.json())
      .then(data => {
        this.setState({
          temperature: data.temperature,
          firstTemperature: data.temperature,
          isLoading: false,
          isConnected: true,
        })
      })
      .catch(e => {
        console.log(e)
        this.fetchTemperature()
      })
    // this.interval = setInterval(() => {
    //     this.checkForChange();
    // }, 1500)
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  checkForChange = () => {
    this.setState({isFirstLoad: false})
    console.log(`checking for temp change`)
    fetch('http://10.0.0.6:8080/get_temperature')
      .then(res => res.json())
      .then(data => this.setState({
        isBeingChanged: data.isBeingChanged,
        temperature: data.temperature,
        isConnected: true
      }))
      .catch(this.setState({ isConnected: false }))
  }

  connectionHandler = isConnected => {
    this.setState({
      isConnected: isConnected,
      isLoading: !isConnected,
    })
  }

  temperatureHandler = temperature => {
    this.setState({ temperature })
    this.manageSnow(temperature)
  }

  manageSnow = (temperature) => {
    if (temperature < 69) {
      let snowfall = temperature - 58
      snowfall = ((snowfall * -1) + 12) * 2
      if (temperature == 60) snowfall = 90
      console.log(`new snowfall ${snowfall}`)
      this.setState({ snowfall })
    } else this.setState({ snowfall: 0 })
  }


  render() {
    return (
      <>
        {!this.state.isLoading &&
          // <div style={{marginTop: window.innerHeight / 2 - Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9) / 2  }}>
          <div>
            <FadeIn transitionDuration={2200}>
              <MainSlider
                temperature={this.state.firstTemperature}//{this.state.temperature}
                isConnected={this.state.isConnected}
                connectionHandler={this.connectionHandler}
                temperatureHandler={this.temperatureHandler}
              />
            </FadeIn>
          </div>
        }
        <ParticleContainer
          temperature={this.state.temperature}
          snowfall={this.state.snowfall}
        />

        <Fader>
          <SpinnerContainer
            isLoading={this.state.isLoading}
            isBeingChanged={this.state.isBeingChanged}
            className="spinners"
          />
        </Fader>
      </>
    )
  }
}

export default MainPage;
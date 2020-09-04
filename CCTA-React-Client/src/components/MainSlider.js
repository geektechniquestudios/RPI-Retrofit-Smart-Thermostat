import React, { Component } from 'react'
import { CircleSlider } from "react-circle-slider"
import { scaleLinear } from "d3-scale"
import _, { debounce } from 'lodash';


const tipColor = scaleLinear()
  .domain([-11, -2, 0, 11])
  .range(['#03fcf4', '#ccfaff', '#f4fa9d', '#de3e26'])

class MainSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: 70,
      color: "",
      subColor: "",
    }
    this.mostRecentTemp = 0
    this.secondMostRecentTemp = 1
    this.debouncedTemperature = debounce(() => this.sendUpdatedTemperature(this.state.temperature), 400)

  }

  handleChange = temperature => {
    if (this.mostRecentTemp === temperature) return
    this.secondMostRecentTemp = this.mostRecentTemp
    this.mostRecentTemp = temperature
    console.log(`Changed value ${temperature}`)
    this.setState({
      temperature: temperature,
      color: tipColor(temperature - 71),
      subColor: tipColor(temperature - 69),
    })
    this.props.temperatureHandler(temperature)
    this.debouncedTemperature()
  }

  sendUpdatedTemperature = temperature => {
    const putRequest = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temperature: temperature }),
    }

    console.log(`Sending temp to thermostat: ${temperature}`)
    fetch('http://10.0.0.6:8080/update_temperature', putRequest)
      .catch(e => {
        console.log(e)
        this.props.connectionHandler(false)
      })
  }

  updateTemperature = () => {
    fetch('http://10.0.0.6:8080/get_temperature')
      .then(res => res.json())
      .then(data => this.setState({ temperature: data }))
      .then(this.props.connectionHandler(true))
      .catch(e => {
        console.log(e)
        this.props.connectionHandler(false)
        this.updateTemperature()
      })
  }

  componentDidMount() {
    this.setState({
      color: tipColor(this.props.temperature - 71),
      subColor: tipColor(this.props.temperature - 69)
    })
    this.props.temperatureHandler(this.props.temperature)
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <CircleSlider
          value={this.props.temperature}
          onChange={this.handleChange}
          size={Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9)}
          knobRadius={27}
          knobColor={this.state.color}
          progressWidth={20}
          circleWidth={15}
          circleColor=""
          tooltipColor={this.state.color}
          gradientColorFrom={this.state.color}
          gradientColorTo={this.state.subColor}
          showTooltip={this.props.isConnected}
          tooltipSize={Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9) / 3}
          min={60}
          max={80}
        />
      </div>
    )
  }
}

export default MainSlider
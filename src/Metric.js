import React, { Component } from 'react';
import './Metric.css';
import SensorMetric from './SensorMetric.js'

class Metric extends Component {

  state = {
    house: {
      upstairs: ['bedroom1', 'bedroom2'],
      firstFloor: ['kitchen', 'porch'],
      basement: ['basement']
    },
    garden: {
      coldFrames: ['coldFrame1', 'coldFrame2', 'coldFrame3'],
      gardenBeds: ['gardenBed1', 'gardenBed2', 'gardenBed3'],
      compostPiles: ['oldestBin', 'primaryBin', 'intermediateBin']
    },
    coop: {
      door: ['door'],
      heater: ['heater'],
      feeder: ['feeder'],
      waterer: ['waterer']
    },
    locations: {}
  }

  componentDidMount() {
    var locations = []
    var query = '?l='
    if (this.props.space != '') {
      query = '?l=' + this.props.space
    } else if (this.props.area != '') {
      locations = this.state[[this.props.region]][[this.props.area]]
      locations.map((location) => {
        query = query + location + '&l='
      })
      query = query.substring(0, query.length-3)
    } else {
      var areas = this.state[[this.props.region]]
      Object.keys(areas).map((area) => {
        locations = this.state[[this.props.region]][[area]]
        locations.map((location) => {
          query = query + location + '&l='
        })
      })
      query = query.substring(0, query.length-3)
    }
    fetch("http://localhost:5000/sensor/metric" + query)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isMetricsLoaded: true,
            sensorMetrics: result.items
          }, () => {this.organizeByLocation()});
        },
        (error) => {
          this.setState({
            isMetricsLoaded: true,
            error
          })
        }
      )
  }

  organizeByLocation() {
    var sensors = this.state.sensorMetrics
    var newLocations = {}
    sensors.map((sensor) => {
      var location = sensor['location']
      var id = sensor['sensor_id']
      if (newLocations[[location]]) {
        var sensors = newLocations[[location]]
        sensors[[id]] = sensor
        newLocations[[location]] = sensors
      } else {
        newLocations[[location]] = {[id]: sensor}
      }
    })
    this.setState({
      locations: newLocations
    })
  }

  render() {
    const { error, isMetricsLoaded } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isMetricsLoaded && !this.state.locations) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="metric-body">
          {console.log(this.state.locations)}
          {(Object.keys(this.state.locations).length > 0) ?
            <div>
              <div>
                <h2>{this.props.region}</h2>
                {(this.props.area != '') ?
                <div>
                  <h3>{this.props.area}</h3>
                  {Object.keys(this.state.locations).map((location) => {
                    return (
                      <div>
                        <h4>
                          {location}
                        </h4>
                        {Object.keys(this.state['locations'][[location]]).map((sensor) => {
                        return (
                          <SensorMetric measurements={this.state.['locations'][[location]][[sensor]]['measurement']} sensor={sensor} />
                        )
                        })}
                      </div>
                    )
                  })}
                </div>
                :
                <div>
                  {(Object.keys(this.state[[this.props.region]])).map((area) => {
                    return (
                      <div>
                        <h3>{area}</h3>
                        {this.state[[this.props.region]][[area]].map((space) => {
                          return (
                            <div>
                              {Object.keys(this.state.locations).map((presentlocation) => {
                                if (space == presentlocation) {
                                  return (
                                    <div>
                                      <h4>{space}</h4>
                                      {Object.keys(this.state['locations'][[space]]).map((sensor) => {
                                      return (
                                        <SensorMetric measurements={this.state.['locations'][[space]][[sensor]]['measurement']} sensor={sensor} />
                                      )
                                      })}
                                    </div>
                                  )
                                }
                              })}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>}
              </div>
            </div>
            : <div/>}
          <h2>You're in Metrics land now!</h2>
          <div>here is the region {this.props.region}</div>
          <div>here is the area {this.props.area}</div>
          <div>here is the space {this.props.space}</div>
        </div>
      );
    }
  }
}

export default Metric;

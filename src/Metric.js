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
    const requestOptions = {
      headers: {'Authorization': 'Basic '+btoa(this.props.username + ':' + this.props.password)},
    }
    fetch(this.props.url + "/api/v1/sensor/metric" + query, requestOptions)
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

  metricCallbackFunction(displayComponent, sensor) {
    var sensorData = {}
    this.state.sensorMetrics.map((sensorMetric) => {
      if (sensorMetric['sensor_id'] == sensor['sensor']) {
        sensorData = sensorMetric
      }
    })
    this.props.metricCallback(
      displayComponent,
      this.props.region,
      this.props.area,
      this.props.space,
      sensorData
    )
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
          {(Object.keys(this.state.locations).length > 0) ?
            <div>
              <div>
                <h2 className="metric-region">{this.props.region.charAt(0).toUpperCase() + this.props.region.slice(1)}</h2>
                {(this.props.area != '') ?
                <div>
                  <a className="collapse-false"><i class="fas fa-chevron-up"></i></a><h3 className="metric-area">{this.props.area}</h3>
                  {Object.keys(this.state.locations).map((location) => {
                    return (
                      <div>
                        <a className="collapse-false"><i class="fas fa-chevron-up"></i></a><h4 className="metric-space">{location}</h4>
                        {Object.keys(this.state['locations'][[location]]).map((sensor) => {
                        return (
                          <SensorMetric
                            measurements={this.state.['locations'][[location]][[sensor]]['measurement']}
                            sensor={sensor}
                            alert={this.state.locations[[location]][[sensor]]['alert']}
                            sensorMetricCallback = {this.metricCallbackFunction.bind(this)}
                          />
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
                        <div className="metric-area-wrapper">
                          <a className="collapse-false"><i class="fas fa-chevron-up"></i></a><h3 className="metric-area">{area}</h3>
                        </div>
                        {this.state[[this.props.region]][[area]].map((space) => {
                          return (
                            <div>
                              {Object.keys(this.state.locations).map((presentlocation) => {
                                if (space == presentlocation) {
                                  return (
                                    <div>
                                      <div className="metric-space-wrapper">
                                        <a className="collapse-false"><i class="fas fa-chevron-up"></i></a><h4 className="metric-space">{space}</h4>
                                      </div>
                                      {Object.keys(this.state['locations'][[space]]).map((sensor) => {
                                      return (
                                        <SensorMetric
                                          measurements={this.state.['locations'][[space]][[sensor]]['measurement']}
                                          sensor={sensor}
                                          alert={this.state.locations[[space]][[sensor]]['alert']}
                                          sensorMetricCallback = {this.metricCallbackFunction.bind(this)}
                                        />
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
            :
            <div>This region doesn't have any sensors.</div>
          }
        </div>
      );
    }
  }
}

export default Metric;

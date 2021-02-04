import React, { Component } from 'react';
import './MetricDetail.css';

class MetricDetail extends Component {

  state = {
    error: null
  }

  componentDidMount() {
    var query = '?s=' + this.props.sensor['sensor_id']
    fetch("http://localhost:5000/sensor/metric/detail" + query)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isMetricsLoaded: true,
            sensorMetrics: result.items
          });
        },
        (error) => {
          this.setState({
            isMetricsLoaded: true,
            error
          })
        }
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
        <div>
          {console.log('this is the metrics', this.state.sensorMetrics)}
          <div>You Made it to the Detailed Metrics for the {this.props.sensor['sensor_id']} Sensor</div>
          {Object.keys(this.state.sensorMetrics[0]['measurement']).map((measurement) => {
            return(
              <div>
                <div>{measurement}</div>
                <div>The Graph</div>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

export default MetricDetail;

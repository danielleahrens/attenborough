import React, { Component } from 'react';
import {
  LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Legend
} from 'recharts';
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
          }, () => {this.structureData()});
        },
        (error) => {
          this.setState({
            isMetricsLoaded: true,
            error
          })
        }
      )
  }

  structureData() {
    var data = {}
    console.log('heres state', this.state)
    Object.keys(this.state.sensorMetrics[0]['measurement']).map((measurement) => {
      data[[measurement]] = []
      this.state.sensorMetrics[0]['measurement'][[measurement]].map((dataPoint) => {
        if (dataPoint[2]) {
          var vertex = {'name': dataPoint[0], 'pt': dataPoint[2].toFixed(2)}
          if (this.state.sensorMetrics[0]['alert']) {
            vertex['alertHigh'] = this.state.sensorMetrics[0]['alert'][[measurement]]['upper']
            vertex['alertLow'] = this.state.sensorMetrics[0]['alert'][[measurement]]['lower']
          }
          data[[measurement]].unshift(vertex)
        }
      })
    })
    console.log('heres the data object', data)
    this.setState({data: data})
  }

  render() {
    const { error, isMetricsLoaded } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isMetricsLoaded && !this.state.locations || !this.state.data) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="detail">
          {console.log('this is the metrics', this.state)}
          <div>You Made it to the Detailed Metrics for the {this.props.sensor['sensor_id']} Sensor</div>
          {Object.keys(this.state.data).map((measurement) => {
            var data = this.state.data
            return(
              <div>
                <div>{measurement.charAt(0).toUpperCase() + measurement.slice(1)}</div>
                  <LineChart
                    width={1700}
                    height={400}
                    data={data[[measurement]]}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Legend />
                    <Line type="monotone" dataKey="pt" stroke="#ff7300" yAxisId={0} />
                    <Line type="monotone" dataKey="alertHigh" stroke="#8884d8" yAxisID={0}/>
                    <Line type="monotone" dataKey="alertLow" stroke="#8884d8" yAxisID={0}/>
                  </LineChart>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

export default MetricDetail;

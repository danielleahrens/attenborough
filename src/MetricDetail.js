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
    const requestOptions = {
      headers: {'Authorization': 'Basic '+btoa(this.props.username + ':' + this.props.password)},
    }
    fetch("http://192.168.1.10:80/sensor/metric/detail" + query, requestOptions)
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
            vertex['alertHigh'] = this.state.sensorMetrics[0]['alert'][[measurement]]['upper']['limit']
            vertex['alertLow'] = this.state.sensorMetrics[0]['alert'][[measurement]]['lower']['limit']
          }
          data[[measurement]].unshift(vertex)
        }
      })
    })
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
          <h2 className="detail-h2">Up to One Week of Measurement Data for the {this.props.sensor['sensor_id']} Sensor</h2>
          {Object.keys(this.state.data).map((measurement) => {
            var data = this.state.data
            return(
              <div>
                <h3 className="detail-h3">{measurement.charAt(0).toUpperCase() + measurement.slice(1)}</h3>
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
                    <Line type="monotone" dataKey="pt" stroke="#2feb32" yAxisId={0} />
                    <Line type="monotone" dataKey="alertHigh" stroke="#eb2f2f" yAxisID={0}/>
                    <Line type="monotone" dataKey="alertLow" stroke="#382feb" yAxisID={0}/>
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

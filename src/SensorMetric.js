import React, { Component } from 'react';
import './SensorMetric.css';

class SensorMetric extends Component {

  render() {
    const { sensor, measurements, alert } = this.props
    return(
      <div>
        {(measurements) ?
          <div>
            <div className="metric-sensor">
              <h5>{sensor}</h5>
              <div className="metric-sensor-actions-wrapper">
              <div className="metric-sensor-action">
                <a onClick={() => {this.props.sensorMetricCallback('MetricDetail', {sensor})}}>
                  <b>More Detail</b>
                </a>
              </div>
                <div className="metric-sensor-action">
                  <a onClick={() => {this.props.sensorMetricCallback('Alert', {sensor})}}>
                    <b>Update Alert</b>
                  </a>
                </div>
                <div className="metric-sensor-action">
                  <a onClick={() => {this.props.sensorMetricCallback('Location', {sensor})}}>
                    <b>Update Location</b>
                  </a>
                </div>
              </div>
            </div>
            <div className="metric-measurements-wrapper">
              <div className="metric-measurements">
                <h6 className="metric-measurement-type">Current</h6>
                <div className="metric-measurement-wrapper">
                  {Object.keys(measurements).map((measurement) => {
                    return (
                      <div className={
                        (alert && measurements[[measurement]]['current'] > alert[[measurement]]['upper']['limit']
                        || alert && measurements[[measurement]]['current'] < alert[[measurement]]['lower']['limit'])
                        ? "metric-measurement metric-measurement-alert" : "metric-measurement metric-measurement-ok"
                      }>
                        <p>{measurement.charAt(0).toUpperCase() + measurement.slice(1)}:</p>
                        <p>{measurements[[measurement]]['current']} {measurements[[measurement]]['uom']}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="metric-measurements">
                <h6 className="metric-measurement-type">24 Hour High</h6>
                <div className="metric-measurement-wrapper">
                  {Object.keys(measurements).map((measurement) => {
                    return (
                      <div className={
                        (alert && measurements[[measurement]]['current'] > alert[[measurement]]['upper']['limit'])
                        ? "metric-measurement metric-measurement-alert" : "metric-measurement metric-measurement-ok"
                      }>
                        <p>{measurement.charAt(0).toUpperCase() + measurement.slice(1)}:</p>
                        <p>{measurements[[measurement]]['high']} {measurements[[measurement]]['uom']}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="metric-measurements">
                <h6 className="metric-measurement-type">24 Hour Low</h6>
                <div className="metric-measurement-wrapper">
                  {Object.keys(measurements).map((measurement) => {
                    return (
                      <div className={
                        (alert && measurements[[measurement]]['current'] < alert[[measurement]]['lower']['limit'])
                        ? "metric-measurement metric-measurement-alert" : "metric-measurement metric-measurement-ok"
                      }>
                        <p>{measurement.charAt(0).toUpperCase() + measurement.slice(1)}:</p>
                        <p>{measurements[[measurement]]['low']} {measurements[[measurement]]['uom']}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          :
          <div>
            <h5 className="metric-sensor-h5">{sensor}</h5>
            <p className="metric-measurement-error">The {sensor} sensor hasn't logged any measurements in the last 24 hours.</p>
          </div>
          }
      </div>
    )
  }

}

export default SensorMetric;

import React, { Component } from 'react';
import './SensorMetric.css';

class SensorMetric extends Component {

  render() {
    const { sensor, measurements } = this.props
    return(
      <div>
        {(measurements) ?
          <div>
            <div className="metric-sensor">
              <h5>{sensor}</h5>
              <div className="metric-sensor-actions-wrapper">
                <div className="metric-sensor-action">More Detail</div>
                <div className="metric-sensor-action">
                  <a onClick={() => {this.props.sensorMetricCallback('Alert', {sensor})}}>
                    Update Alert
                  </a>
                </div>
                <div className="metric-sensor-action">Update Location</div>
              </div>
            </div>
            <div className="metric-measurements-wrapper">
              <div className="metric-measurements">
                <h6 className="metric-measurement-type">Current</h6>
                <div className="metric-measurement-wrapper">
                  {Object.keys(measurements).map((measurement) => {
                    return (
                      <div className="metric-measurement">
                        <p>{measurement}</p>
                        <p>{measurements[[measurement]]['current']}</p>
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
                      <div className="metric-measurement">
                        <p>{measurement}</p>
                        <p>{measurements[[measurement]]['high']}</p>
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
                      <div className="metric-measurement">
                        <p>{measurement}</p>
                        <p>{measurements[[measurement]]['low']}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          : <div/>}

      </div>
    )
  }

}

export default SensorMetric;

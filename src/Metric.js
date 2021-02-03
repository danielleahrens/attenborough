import React, { Component } from 'react';
import './Metric.css';

class Metric extends Component {

  state = {
    house: {
      upstairs: ['bedroom1', 'bedroom2'],
      firstFloor: ['kitchen', 'porch'],
      basement: []
    },
    garden: {
      coldFrames: ['coldFrame1', 'coldFrame2', 'coldFrame3'],
      gardenBeds: ['gardenBed1', 'gardenBed2', 'gardenBed3'],
      compostPiles: ['oldestBin', 'primaryBin', 'intermediateBin']
    },
    coop: {
      door: [],
      heatingLamp: [],
      feeder: [],
      waterer: []
    }
  }

  render() {
    return (
      <div className="metric-body">
        <h2>You're in Metrics land now!</h2>
        <div>here is the region {this.props.region}</div>
        <div>here is the area {this.props.area}</div>
        <div>here is the space {this.props.space}</div>
      </div>
    );
  }
}

export default Metric;

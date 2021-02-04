import React from 'react';
import './App.css';
import Farm from './Farm.js'
import Metric from './Metric.js'
import MetricDetail from './MetricDetail.js'
import Alert from './Alert.js'
import Location from './Location.js'

class App extends React.Component {

  state = {
    display: '',
    region: '',
    area: '',
    space: ''
  }

  componentDidMount() {
    this.setState({
      display: 'Farm',
    })
  }

  callbackFunction(displayComponent, region, area, space, sensor) {
    this.setState(state => ({
      display: displayComponent,
      region: region,
      area: area,
      space: space,
      sensor: sensor
    }));
  }

  render() {
    return (
      <div className="app">
        <header className="app-header"><h1><a onClick={() => {this.setState({display:'Farm'})}}>Welcome to the IoT Farm!</a></h1></header>
        <body>
          {(this.state.display === 'Farm') ?
            <Farm farmCallback = {this.callbackFunction.bind(this)} />
          : <div />}
          {(this.state.display === 'Metric') ?
            <Metric
              region = {this.state.region}
              area = {this.state.area}
              space = {this.state.space}
              metricCallback = {this.callbackFunction.bind(this)}
            />
          : <div />}
          {(this.state.display === 'MetricDetail') ?
            <MetricDetail
              sensor = {this.state.sensor}
              region = {this.state.region}
              area = {this.state.area}
              space = {this.state.space}
              metricDetailCallback = {this.callbackFunction.bind(this)}
            />
          : <div />}
          {(this.state.display === 'Alert') ?
            <Alert
              sensor = {this.state.sensor}
              region = {this.state.region}
              area = {this.state.area}
              space = {this.state.space}
              alertCallback = {this.callbackFunction.bind(this)}
            />
          : <div />}
          {(this.state.display === 'Location') ?
            <Location
              sensor = {this.state.sensor}
              region = {this.state.region}
              area = {this.state.area}
              space = {this.state.space}
              locationCallback = {this.callbackFunction.bind(this)}
            />
          : <div />}
        </body>
      </div>
    );
  }
}

export default App;

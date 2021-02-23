import React from 'react';
import './App.css';
import Farm from './Farm.js'
import Metric from './Metric.js'
import MetricDetail from './MetricDetail.js'
import Alert from './Alert.js'
import Location from './Location.js'

class App extends React.Component {

  state = {
    display: 'Farm',
    region: '',
    area: '',
    space: '',
    url: 'https://cenozoa.danielleahrens.com'
    // url: 'http://localhost:5000'
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

  handleChange(key, e) {
    var stateObj = {}
    stateObj[key] = e.target.value
    this.setState(stateObj)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({display: 'Farm'})
  }

  render() {
    return (
      <div className="app">
        <header className="app-header"><h1><a onClick={() => {this.setState({display:'Farm'})}}>Welcome to the Cenozoa IoT Farm!</a></h1></header>
        <body>
          {(this.state.display === 'Farm') ?
            <Farm
              username = {this.state.username}
              password = {this.state.password}
              url = {this.state.url}
              farmCallback = {this.callbackFunction.bind(this)}
            />
          : <div />}
          {(this.state.display === 'Metric') ?
            <Metric
              region = {this.state.region}
              area = {this.state.area}
              space = {this.state.space}
              url = {this.state.url}
              metricCallback = {this.callbackFunction.bind(this)}
            />
          : <div />}
          {(this.state.display === 'MetricDetail') ?
            <MetricDetail
              sensor = {this.state.sensor}
              region = {this.state.region}
              area = {this.state.area}
              space = {this.state.space}
              url = {this.state.url}
              metricDetailCallback = {this.callbackFunction.bind(this)}
            />
          : <div />}
          {(this.state.display === 'Alert') ?
            <Alert
              sensor = {this.state.sensor}
              region = {this.state.region}
              area = {this.state.area}
              space = {this.state.space}
              url = {this.state.url}
              alertCallback = {this.callbackFunction.bind(this)}
            />
          : <div />}
          {(this.state.display === 'Location') ?
            <Location
              sensor = {this.state.sensor}
              region = {this.state.region}
              area = {this.state.area}
              space = {this.state.space}
              url = {this.state.url}
              locationCallback = {this.callbackFunction.bind(this)}
            />
          : <div />}
        </body>
      </div>
    );
  }
}

export default App;

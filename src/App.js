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
    space: '',
    url: 'http://localhost:5000'
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
        <header className="app-header"><h1><a onClick={() => {this.setState({display:'Farm'})}}>Welcome to the IoT Farm!</a></h1></header>
        <body>
          {(this.state.display === '') ?
            <form className="app-auth">
              <h2 className="app-auth-title">Sign-in</h2>
              <div className="app-creds-wrapper">
                <div className="app-creds-title">Username: </div>
                <input type="text" onChange={(e) => {this.handleChange('username', e)}}></input>
              </div>
              <div className="app-creds-wrapper">
                <div className="app-creds-title">Password: </div>
                <input type="password" onChange={(e) => {this.handleChange('password', e)}}></input>
              </div>
              <div className="app-auth-button-wrapper">
                <input className="app-auth-button" type="submit" onClick={(e) => {this.handleSubmit(e)}}></input>
              </div>
            </form>
          : <div/>}
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
              username = {this.state.username}
              password = {this.state.password}
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
              username = {this.state.username}
              password = {this.state.password}
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
              username = {this.state.username}
              password = {this.state.password}
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
              username = {this.state.username}
              password = {this.state.password}
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

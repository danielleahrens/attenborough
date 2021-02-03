import React, { Component } from 'react';
import './Alert.css';

class Alert extends Component {

  state = {
    errorMessage: null
  }

  componentDidMount() {
    var alert = this.props.sensor.alert
    this.setState({
      alert: alert
    })
  }

  handleChange(e, measurement, limitType) {
    console.log('value: ', e.target.value, 'measurement: ', measurement, 'limit type', limitType)
    var newAlert = {}
    if (this.state.alert) {
      newAlert = this.state.alert
      if (newAlert[[measurement]]) {
        newAlert[[measurement]][[limitType]] = parseFloat(e.target.value)
      } else {
        newAlert[[measurement]] = {[limitType]: parseFloat(e.target.value)}
      }
    } else {
      newAlert[[measurement]] = {[limitType]: parseFloat(e.target.value)}
    }
    this.setState({
      alert: newAlert
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('here is state', this.state)
    var measurements = Object.keys(this.props.sensor.measurement)
    console.log('here is measurements', measurements)
    measurements.map((measurement) => {
      console.log('here is a measurement', measurement)
      if (!this.state.alert[[measurement]]) {
        console.log('ERROR: measurement type missing')
        this.setState({errorMessage: "ERROR: All measurements types must have an alert fields filled in to submit"})
      } else if (
        !this.state.alert[[measurement]]['upper'] ||
        !this.state.alert[[measurement]]['lower'] ||
        !this.state.alert[[measurement]]['time_s']
      ) {
        console.log('ERROR: limit type missing')
        this.setState({errorMessage: "ERROR: All limit types fields must be filled in to submit"})
      } else {
        console.log('No errors present')
        this.setState({errorMessage: null})
      }
    })
    const timer = setTimeout(() => {
      this.updateAlert()
    }, 1000);
  }

  updateAlert() {
    console.log('here is error message', this.state.errorMessage)
    if (!this.state.errorMessage) {
      console.log('going to updateAlert now, heres state', this.state)
      this.props.alertCallback('Metric', this.props.region, this.props.area, this.props.space, '')
    } else {
      console.log('error exists')
    }
  }

  render() {
    return (
      <div>
        <h2>Update {this.props.sensor['sensor_id']}'s Alerts</h2>
        {(this.props.sensor['alert']) ?
        <form>
          {Object.keys(this.props.sensor['alert']).map((measurement) => {
            return (
              <div>
                <h3>{measurement}</h3>
                <div className="alert-limits-wrapper">
                  <div className="alert-limit-wrapper">
                    <h4 className="alert-limit-title">Upper Limit:</h4>
                    <input
                      className="alert-limit-input"
                      type="number"
                      placeholder={this.props.sensor['alert'][[measurement]]['upper']}
                      onChange={(e) => {this.handleChange(e, measurement, 'upper')}}
                    />
                  </div>
                  <div className="alert-limit-wrapper">
                    <h4 className="alert-limit-title">Lower Limit:</h4>
                    <input
                      className="alert-limit-input"
                      type="number"
                      placeholder={this.props.sensor['alert'][[measurement]]['lower']}
                      onChange={(e) => {this.handleChange(e, measurement, 'lower')}}
                    />
                  </div>
                  <div className="alert-limit-wrapper">
                    <h4 className="alert-limit-title">Time Limit:</h4>
                    <input
                      className="alert-limit-input"
                      type="number"
                      placeholder={this.props.sensor['alert'][[measurement]]['time_s']}
                      onChange={(e) => {this.handleChange(e, measurement, 'time_s')}}
                    />
                  </div>
                </div>
              </div>
            )
          })}
          {(this.state.errorMessage) ? <div>{this.state.errorMessage}</div> : <div/>}
          <input type="submit" value="Submit" onClick={(e) => {this.handleSubmit(e)}}></input>
        </form>
        :
        <form>
          {Object.keys(this.props.sensor['measurement']).map((measurement) => {
            return (
              <div>
                <h3>{measurement}</h3>
                <div className="alert-limits-wrapper">
                  <div className="alert-limit-wrapper">
                    <h4 className="alert-limit-title">Upper Limit:</h4>
                    <input
                      className="alert-limit-input"
                      type="number"
                      onChange={(e) => {this.handleChange(e, measurement, 'upper')}}
                    />
                  </div>
                  <div className="alert-limit-wrapper">
                    <h4 className="alert-limit-title">Lower Limit:</h4>
                    <input
                      className="alert-limit-input"
                      type="number"
                      onChange={(e) => {this.handleChange(e, measurement, 'lower')}}
                    />
                  </div>
                  <div className="alert-limit-wrapper">
                    <h4 className="alert-limit-title">Time Limit:</h4>
                    <input
                      className="alert-limit-input"
                      type="number"
                      onChange={(e) => {this.handleChange(e, measurement, 'time_s')}}
                    />
                  </div>
                </div>
              </div>
            )
          })}
          {(this.state.errorMessage) ? <div>{this.state.errorMessage}</div> : <div/>}
          <input type="submit" value="Submit" onClick={(e) => {this.handleSubmit(e)}}></input>
        </form>
      }
      </div>
    )
  }

}

export default Alert;

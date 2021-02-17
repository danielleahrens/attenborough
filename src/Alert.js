import React, { Component } from 'react';
import './Alert.css';

class Alert extends Component {

  state = {
    errorMessage: null,
  }

  componentDidMount() {
    if(Object.keys(this.props.sensor).includes('alert')) {
      var alert = this.props.sensor.alert
      this.setState({
        alert: alert
      })
    } else {
      this.setState({
        alert: {}
      })
    }
  }

  handleChange(e, measurement, limitType) {
    var newAlert = this.state.alert
    if (newAlert[[measurement]]) {
      newAlert[[measurement]][[limitType]] = {'limit': parseFloat(e.target.value), 'alerting': 'False'}
    } else {
      newAlert[[measurement]] = {[limitType]: {'limit': parseFloat(e.target.value), 'alerting': 'False'}}
    }
    this.setState({
      alert: newAlert
    })
  }

  handleAuth(e, key) {
    var auth = {}
    auth[key] = e.target.value
    this.setState(auth)
  }

  handleSubmit(e) {
    e.preventDefault();
    var measurements = Object.keys(this.props.sensor.measurement)
    measurements.map((measurement) => {
      if (!this.state.alert[[measurement]]) {
        console.log('ERROR: measurement type missing')
        this.setState({errorMessage: "ERROR: All measurements types must have an alert fields filled in to submit"})
      } else if (
        !this.state.alert[[measurement]]['upper'] ||
        !this.state.alert[[measurement]]['lower']
      ) {
        console.log('ERROR: limit type missing')
        this.setState({errorMessage: "ERROR: All limit types fields must be filled in to submit"})
      } else if (!this.state.username || !this.state.password) {
        console.log('ERROR: credentials missing')
        this.setState({errorMessage: "ERROR: authentication required to submit"})
      } else {
        this.setState({errorMessage: null})
      }
    })
    const timer = setTimeout(() => {
      this.updateAlert()
    }, 1000);
  }

  updateAlert() {
    if (!this.state.errorMessage) {
      var body = {}
      body['sensor_id'] = [this.props.sensor['sensor_id']]
      body['sensor_type'] = this.props.sensor['sensor_type']
      body['alert'] = this.state.alert

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+btoa(this.state.username + ':' + this.state.password)
        },
        body: JSON.stringify(body)
      }
      fetch(this.props.url + '/api/v1/sensor/metric/alert', requestOptions)
        .then(response => {
          if(!response.ok) {
            throw new Error(response.status);
          } else {
            this.props.alertCallback('Metric', this.props.region, this.props.area, this.props.space, '')
          }
        })
        .catch((error) => {
          console.log('ERROR: an error occurred while updating the alert limits.', error)
          this.setState({errorMessage: 'An error occurred while updating the alert limits, please ensure you have the appropriate credentials and try again.'})
        })

    } else {
      console.log('ERROR: missing form data, will not submit update request')
    }
  }

  render() {
    return (
      <div className="alert">
        <h2>Update {this.props.sensor['sensor_id']}'s Alerts</h2>
        {(this.props.sensor['alert']) ?
        <form>
          {Object.keys(this.props.sensor['alert']).map((measurement) => {
            return (
              <div>
                <h3>{measurement}</h3>
                <div className="alert-limits-wrapper">
                  <div className="alert-limit-wrapper">
                    <h4 className="alert-limit-title">Lower Limit:</h4>
                    <input
                      className="alert-limit-input"
                      type="number"
                      placeholder={this.props.sensor['alert'][[measurement]]['lower']['limit']}
                      onChange={(e) => {this.handleChange(e, measurement, 'lower')}}
                    />
                  </div>
                  <div className="alert-limit-wrapper">
                    <h4 className="alert-limit-title">Upper Limit:</h4>
                    <input
                      className="alert-limit-input"
                      type="number"
                      placeholder={this.props.sensor['alert'][[measurement]]['upper']['limit']}
                      onChange={(e) => {this.handleChange(e, measurement, 'upper')}}
                    />
                  </div>
                </div>
              </div>
            )
          })}
          <div className="alert-auth-title">Authentication required to update alert levels</div>
          <div className="alert-auth-wrapper">
            <div className="alert-limit-wrapper">
              <h4 className="alert-limit-title">Username: </h4>
              <input
                className="alert-limit-input"
                type="text"
                onChange={(e) => {this.handleAuth(e, 'username')}}
              />
            </div>
            <div className="alert-limit-wrapper">
              <h4 className="alert-limit-title">Password: </h4>
              <input
                className="alert-limit-input"
                type="password"
                onChange={(e) => {this.handleAuth(e, 'password')}}
              />
            </div>
          </div>
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
                    <h4 className="alert-limit-title">Lower Limit:</h4>
                    <input
                      className="alert-limit-input"
                      type="number"
                      onChange={(e) => {this.handleChange(e, measurement, 'lower')}}
                    />
                  </div>
                  <div className="alert-limit-wrapper">
                    <h4 className="alert-limit-title">Upper Limit:</h4>
                    <input
                      className="alert-limit-input"
                      type="number"
                      onChange={(e) => {this.handleChange(e, measurement, 'upper')}}
                    />
                  </div>
                </div>
              </div>
            )
          })}
          <div className="alert-auth-title">Authentication required to update alert levels</div>
          <div className="alert-auth-wrapper">
            <div className="alert-limit-wrapper">
              <h4 className="alert-limit-title">Username: </h4>
              <input
                className="alert-limit-input"
                type="text"
                onChange={(e) => {this.handleAuth(e, 'username')}}
              />
            </div>
            <div className="alert-limit-wrapper">
              <h4 className="alert-limit-title">Password: </h4>
              <input
                className="alert-limit-input"
                type="password"
                onChange={(e) => {this.handleAuth(e, 'password')}}
              />
            </div>
          </div>
          {(this.state.errorMessage) ? <div>{this.state.errorMessage}</div> : <div/>}
          <input type="submit" value="Submit" onClick={(e) => {this.handleSubmit(e)}}></input>
        </form>
      }
      </div>
    )
  }

}

export default Alert;

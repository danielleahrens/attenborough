import React, { Component } from 'react';
import './Location.css';

class Location extends Component {

  state = {
    errorMessage: null,
  }

  componentDidMount() {
    if(Object.keys(this.props.sensor).includes('location')) {
      var location = this.props.sensor.location
      this.setState({
        location: location
      })
    } else {
      this.setState({
        location: ''
      })
    }
  }

  handleChange(e) {
    this.setState({location: e.target.value})
  }

  handleAuth(e, key) {
    var auth = {}
    auth[key] = e.target.value
    this.setState(auth)
  }

  handleSubmit(e) {
    e.preventDefault()
    if (
      !this.state.username ||
      !this.state.password
    ) {
      console.log('ERROR: credentials missing')
      this.setState({errorMessage: 'ERROR: authentication required to submit'})
    } else {
      this.updateLocation()
    }
  }

  updateLocation() {
    var body = {}
    body['sensor_id'] = [this.props.sensor['sensor_id']]
    body['sensor_type'] = this.props.sensor['sensor_type']
    body['location'] = this.state.location
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+btoa(this.state.username + ':' + this.state.password)
      },
      body: JSON.stringify(body)
    }
    fetch(this.props.url + '/api/v1/sensor/location', requestOptions)
      .then(response => {
        if(!response.ok) {
          throw new Error(response.status);
        } else {
          if(this.props.region) {
            this.props.locationCallback('Metric', this.props.region, this.props.area, this.props.space, '')
          } else {
            this.props.locationCallback('Farm', '', '', '', '')
          }
        }
      })
      .catch((error) => {
        console.log('ERROR: an error occurred while updating the sensor location.', error)
        this.setState({errorMessage: 'An error occurred while updating the sensor location, please ensure you have the appropriate credentials and try again.'})
      })
  }

  render() {
    return (
      <div className="location">
        {(this.props.sensor) ?
          <div>
            <h2>Update Location of the {this.props.sensor['sensor_id']} Sensor</h2>
            <form>
              <div className="location-form-items-wrapper">
                <h3 className="location-form-item">Location:</h3>
                {(this.props.sensor.location) ?
                  <input
                    className="location-form-item"
                    type="text"
                    placeholder={this.props.sensor.location}
                    onChange={(e) => {this.handleChange(e)}}
                  />
                :
                  <input
                    className="location-form-item"
                    type="text"
                    onChange={(e) => {this.handleChange(e)}}
                  />
                }
              </div>
              <div className="location-auth-title">Authentication required to update sensor location</div>
              <div className="location-auth-wrapper">
                <div className="location-limit-wrapper">
                  <h3 className="location-limit-title">Username: </h3>
                  <input
                    className="location-limit-input"
                    type="text"
                    onChange={(e) => {this.handleAuth(e, 'username')}}
                  />
                </div>
                <div className="location-limit-wrapper">
                  <h3 className="alert-limit-title">Password: </h3>
                  <input
                    className="location-limit-input"
                    type="password"
                    onChange={(e) => {this.handleAuth(e, 'password')}}
                  />
                </div>
              </div>
              {(this.state.errorMessage) ? <div>{this.state.errorMessage}</div> : <div/>}
              <input type="submit" value="Submit" onClick={(e) => {this.handleSubmit(e)}}/>
            </form>
          </div>
        : <div/>}
      </div>
    )
  }
}

export default Location;

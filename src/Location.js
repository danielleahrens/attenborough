import React, { Component } from 'react';
import './Location.css';

class Location extends Component {

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

  handleSubmit(e) {
    e.preventDefault()
    var body = {}
    body['sensor_id'] = [this.props.sensor['sensor_id']]
    body['sensor_type'] = this.props.sensor['sensor_type']
    body['location'] = this.state.location
    console.log('body', body)
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Authorization': 'Basic '+btoa(this.props.username + ':' + this.props.password)
      },
      body: JSON.stringify(body)
    }
    fetch('http://192.168.1.10:80/sensor', requestOptions)
      .then(response => console.log(response.json()))
    if(this.props.region) {
      this.props.locationCallback('Metric', this.props.region, this.props.area, this.props.space, '')
    } else {
      this.props.locationCallback('Farm', '', '', '', '')
    }
  }

  render() {
    return (
      <div className="location">
        {console.log('this is state', this.state)}
        {(this.props.sensor) ?
          <div>
            <div>Update Location of the {this.props.sensor['sensor_id']} Sensor</div>
            <form>
              <div className="location-form-items-wrapper">
                <div className="location-form-item">Location:</div>
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
              <input type="submit" value="Submit" onClick={(e) => {this.handleSubmit(e)}}/>
            </form>
          </div>
        : <div/>}
      </div>
    )
  }
}

export default Location;

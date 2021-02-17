import React, { Component } from 'react';
import './Farm.css';

class Farm extends Component {

  state = {
    isLoaded: false,
    error:null,
    sensors: [],
    locations: {
      bedroom1: {
        region: 'house',
        area: 'upstairs',
        sensors: {}
      },
      bedroom2: {
        region: 'house',
        area: 'upstairs',
        sensors: {}
      },
      kitchen: {
        region: 'house',
        area: 'firstFloor',
        sensors: {}
      },
      porch: {
        region: 'house',
        area: 'firstFloor',
        sensors: {}
      },
      basement: {
        region: 'house',
        area: 'basement',
        sensors: {}
      },
      coldFrame1: {
        region: 'garden',
        area: 'coldFrames',
        sensors: {}
      },
      coldFrame2: {
        region: 'garden',
        area: 'coldFrames',
        sensors: {}
      },
      coldFrame3: {
        region: 'garden',
        area: 'coldFrames',
        sensors: {}
      },
      gardenBed1: {
        region: 'garden',
        area: 'gardenBeds',
        sensors: {}
      },
      gardenBed2: {
        region: 'garden',
        area: 'gardenBeds',
        sensors: {}
      },
      gardenBed3: {
        region: 'garden',
        area: 'gardenBeds',
        sensors: {}
      },
      oldestBin: {
        region: 'garden',
        area: 'compostPiles',
        sensors: {}
      },
      primaryBin: {
        region: 'garden',
        area: 'compostPiles',
        sensors: {}
      },
      intermediateBin: {
        region: 'garden',
        area: 'compostPiles',
        sensors: {}
      },
      door: {
        region: 'coop',
        area: 'door',
        sensors: {}
      },
      heater: {
        region: 'coop',
        area: 'heatingLamp',
        sensors: {}
      },
      feeder: {
        region: 'coop',
        area: 'feeder',
        sensors: {}
      },
      waterer: {
        region: 'coop',
        area: 'waterer',
        sensors: {}
      }
    }
  }

  componentDidMount() {
    const requestOptions = {
      headers: {'Authorization': 'Basic '+btoa(this.props.username + ':' + this.props.password)},
    }
    fetch(this.props.url + "/api/v1/sensor", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            sensors: result.items
          }, () => {this.organizeByLocation()});
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  organizeByLocation() {
    var locations = Object.keys(this.state.locations)
    var updateSensors = this.state.sensors
    var newLocations = this.state.locations
    locations.map((location) => {
      var newSensors = {}
      var currentSensors = this.state.locations[location]['sensors']
      updateSensors.map((updateSensor) => {
        if (updateSensor['location'] === location) {
          newSensors[updateSensor['sensor_id']] = updateSensor
        }
      })
      newLocations[location]['sensors'] = newSensors
    })
    this.setState({
      locations: newLocations
    })
  }

  render() {
    const { error, isLoaded } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="farm-body">
          <div className="farm-body-wrapper">
            <div className="farm-region">
              <h2 className="farm-region-h2"><a className="farm-region-label" onClick={() => {this.props.farmCallback('Metric', 'house', '', '')}}>House</a></h2>
              <div className="house-region">
                <div className="house-attic"></div>
                <div className="house-area">
                  <h3 className="farm-region-h3"><a className="house-area-label" onClick={() => {this.props.farmCallback('Metric', 'house', 'upstairs', '')}}>Upstairs</a></h3>
                  <div className="house-space-wrapper">
                    {(Object.keys(this.state.locations['bedroom1']['sensors']).length > 0) ?
                      <div className="house-space">
                        <h4 className="farm-region-h4"><a className="house-space-label" onClick={() => {this.props.farmCallback('Metric', 'house', 'upstairs', 'bedroom1')}}>Bedroom 1</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.bedroom1.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div /> }
                    {(Object.keys(this.state.locations['bedroom2']['sensors']).length > 0) ?
                      <div className="house-space">
                        <h4 className="farm-region-h4"><a className="house-space-label" onClick={() => {this.props.farmCallback('Metric', 'house', 'upstairs', 'bedroom2')}}>Bedroom 2</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.bedroom2.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div />}
                  </div>
                </div>
                <div className="house-area">
                  <h3 className="farm-region-h3"><a className="house-area-label" onClick={() => {this.props.farmCallback('Metric', 'house', 'firstFloor', '')}}>First Floor</a></h3>
                  <div className="house-space-wrapper">
                    {(Object.keys(this.state.locations['kitchen']['sensors']).length > 0) ?
                      <div className="house-space">
                        <h4 className="farm-region-h4"><a className="house-space-label" onClick={() => {this.props.farmCallback('Metric', 'house', 'firstFloor', 'kitchen')}}>Kitchen</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.kitchen.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div/>}
                    {(Object.keys(this.state.locations['porch']['sensors']).length > 0) ?
                      <div className="house-space">
                        <h4 className="farm-region-h4"><a className="house-space-label" onClick={() => {this.props.farmCallback('Metric', 'house', 'firstFloor', 'porch')}}>Porch</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.porch.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                     : <div/>}
                  </div>
                </div>
                <div className="house-area">
                  <h3 className="farm-region-h3"><a className="house-area-label" onClick={() => {this.props.farmCallback('Metric', 'house', 'basement', '')}}>Basement</a></h3>
                  {(Object.keys(this.state.locations['basement']['sensors']).length > 0) ?
                    <div className="sensors">
                      {Object.keys(this.state.locations.basement.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                    </div>
                  : <div />}
                </div>
              </div>
            </div>
            <div className="farm-region">
              <h2 className="farm-region-h2"><a className="farm-region-label" onClick={() => {this.props.farmCallback('Metric', 'garden', '', '')}}>Garden</a></h2>
              <div className="garden-region">
                <div className="garden-area">
                  <h3 className="farm-region-h3"><a className="garden-area-label" onClick={() => {this.props.farmCallback('Metric', 'garden', 'coldFrames', '')}}>Cold Frames</a></h3>
                  <div className="garden-space-wrapper">
                    {(Object.keys(this.state.locations['coldFrame1']['sensors']).length > 0) ?
                      <div className="garden-space">
                        <h4 className="farm-region-h4"><a onClick={() => {this.props.farmCallback('Metric', 'garden', 'coldFrames', 'coldFrame1')}}>Cold Frame 1</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.coldFrame1.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div/>}
                    {(Object.keys(this.state.locations['coldFrame2']['sensors']).length > 0) ?
                      <div className="garden-space">
                        <h4 className="farm-region-h4"><a onClick={() => {this.props.farmCallback('Metric', 'garden', 'coldFrames', 'coldFrame2')}}>Cold Frame 2</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.coldFrame2.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div />}
                    {(Object.keys(this.state.locations['coldFrame3']['sensors']).length > 0) ?
                      <div className="garden-space">
                        <h4 className="farm-region-h4"><a onClick={() => {this.props.farmCallback('Metric', 'garden', 'coldFrames', 'coldFrame3')}}>Cold Frame 3</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.coldFrame3.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div />}
                  </div>
                </div>
                <div className="garden-area">
                  <h3 className="farm-region-h3"><a className="garden-area-label" onClick={() => {this.props.farmCallback('Metric', 'garden', 'gardenBeds', '')}}>Garden Beds</a></h3>
                  <div className="garden-space-wrapper">
                    {(Object.keys(this.state.locations['gardenBed1']['sensors']).length > 0) ?
                      <div className="garden-space">
                        <h4 className="farm-region-h4"><a onClick={() => {this.props.farmCallback('Metric', 'garden', 'gardenBeds', 'gardenBed1')}}>Garden Bed 1</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.gardenBed1.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div />}
                    {(Object.keys(this.state.locations['gardenBed2']['sensors']).length > 0) ?
                      <div className="garden-space">
                        <h4 className="farm-region-h4"><a onClick={() => {this.props.farmCallback('Metric', 'garden', 'gardenBeds', 'gardenBed2')}}>Garden Bed 2</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.gardenBed2.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div />}
                    {(Object.keys(this.state.locations['gardenBed3']['sensors']).length > 0) ?
                      <div className="garden-space">
                        <h4 className="farm-region-h4"><a onClick={() => {this.props.farmCallback('Metric', 'garden', 'gardenBeds', 'gardenBed3')}}>Garden Bed 3</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.gardenBed3.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div />}
                  </div>
                </div>
                <div className="garden-area">
                  <h3 className="farm-region-h3"><a className="garden-area-label" onClick={() => {this.props.farmCallback('Metric', 'garden', 'compostPile', '')}}>Compost Pile</a></h3>
                  <div className="garden-space-wrapper">
                    {(Object.keys(this.state.locations['oldestBin']['sensors']).length > 0) ?
                      <div className="garden-space">
                        <h4 className="farm-region-h4"><a onClick={() => {this.props.farmCallback('Metric', 'garden', 'compostPile', 'oldestBin')}}>Oldest Compost Bin</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.oldestBin.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div />}
                    {(Object.keys(this.state.locations['primaryBin']['sensors']).length > 0) ?
                      <div className="garden-space">
                        <h4 className="farm-region-h4"><a onClick={() => {this.props.farmCallback('Metric', 'garden', 'compostPile', 'primaryBin')}}>Primary Compost Bin</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.primaryBin.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div />}
                    {(Object.keys(this.state.locations['intermediateBin']['sensors']).length > 0) ?
                      <div className="garden-space">
                        <h4 className="farm-region-h4"><a onClick={() => {this.props.farmCallback('Metric', 'garden', 'compostPile', 'intermediateBin')}}>Intermediate Compost Bin</a></h4>
                        <div className="sensors">
                          {Object.keys(this.state.locations.intermediateBin.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                        </div>
                      </div>
                    : <div />}
                  </div>
                </div>
              </div>
            </div>
            <div className="farm-region">
              <h2 className="farm-region-h2"><a className="farm-region-label" onClick={() => {this.props.farmCallback('Metric', 'coop', '', '')}}>Chicken Coop</a></h2>
              <div className="coop-attic"></div>
              <div className="coop-region">
                {(Object.keys(this.state.locations['door']['sensors']).length > 0) ?
                <div className="coop-area">
                  <h3 className="farm-region-h3">Door</h3>
                  <div className="coop-space-wrapper">
                    <div className="coop-space">
                      <div className="sensors">
                        {Object.keys(this.state.locations.door.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                      </div>
                    </div>
                  </div>
                </div>
                : <div/>}
                {(Object.keys(this.state.locations['heater']['sensors']).length > 0) ?
                <div className="coop-area">
                  <h3 className="farm-region-h3">Heating Lamp</h3>
                  <div className="coop-space-wrapper">
                    <div className="coop-space">
                      <div className="sensors">
                        {Object.keys(this.state.locations.heater.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                      </div>
                    </div>
                  </div>
                </div>
                : <div/>}
                {(Object.keys(this.state.locations['feeder']['sensors']).length > 0) ?
                <div className="coop-area">
                  <h3 className="farm-region-h3">Feeder</h3>
                  <div className="coop-space-wrapper">
                    <div className="coop-space">
                      <div className="sensors">
                        {Object.keys(this.state.locations.feeder.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                      </div>
                    </div>
                  </div>
                </div>
                : <div/>}
                {(Object.keys(this.state.locations['waterer']['sensors']).length > 0) ?
                <div className="coop-area">
                  <h3 className="farm-region-h3">Waterer</h3>
                  <div className="coop-space-wrapper">
                    <div className="coop-space">
                      <div className="sensors">
                        {Object.keys(this.state.locations.waterer.sensors).map((sensor) => {return <div className="sensor">{sensor}</div>})}
                      </div>
                    </div>
                  </div>
                </div>
                : <div/>}
              </div>
            </div>
          </div>
          <div className="farm-no-region">
            <h2 className="farm-region-h2"><a className="farm-region-label">Unallocated Sensors</a></h2>
            {this.state.sensors.map((sensor) => {
              return (
                <div className="sensors">
                  {(!Object.keys(sensor).includes('location')) ?
                    <a className="sensor" onClick={() => {this.props.farmCallback('Location', '', '', '', sensor)}}>{sensor['sensor_id']}</a>
                  : <div/>}
                </div>
              )
            })}
          </div>
        </div>
      );
    }
  }
}

export default Farm;

import React from 'react';
import './App.css';
import Farm from './Farm.js'
import Metric from './Metric.js'

class App extends React.Component {

  state = {
    display: '',
    region: 'testRegion',
    area: 'testArea',
    space: 'testSpace'
  }

  componentDidMount() {
    this.setState({
      display: 'Farm',
    })
  }

  callbackFunction(displayComponent, region, area, space) {
    this.setState(state => ({
      display: displayComponent,
      region: region,
      area: area,
      space: space
    }));
  }

  render() {
    return (
      <div className="farm">
        <header className="farm-header"><h1><a onClick={() => {this.setState({display:'Farm'})}}>Welcome to the Farm!</a></h1></header>
        <body>
          {(this.state.display === 'Farm') ? <Farm farmCallback = {this.callbackFunction.bind(this)} /> : <div />}
          {(this.state.display === 'Metric') ? <Metric region = {this.state.region} area = {this.state.area} space = {this.state.space}/> : <div />}
        </body>
      </div>
    );
  }
}

export default App;

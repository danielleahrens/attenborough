import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="farm">
      <header className="farm-header"><h1>Welcome to the Farm!</h1></header>
      <body className="farm-body">
        <div className="farm-body-wrapper">
          <div className="farm-region">
            <h2>House</h2>
            <div className="house-region">
              <div className="house-attic"></div>
              <div className="house-level">
                <h3>Upstairs</h3>
                <div className="sensors">
                  <div className="sensor">brownBat</div>
                </div>
              </div>
              <div className="house-level">
                <h3>First Floor</h3>
                <div className="sensors">
                  <div className="sensor">fruitBat</div>
                  <div className="sensor">hoaryBat</div>
                </div>
              </div>
              <div className="house-level">
                <h3>Basement</h3>
                <div className="sensors">
                  <div className="sensor">vampireBat</div>
                  <div className="sensor">horseshoeBat</div>
                </div>
              </div>
            </div>
          </div>
          <div className="farm-region">
            <h2>Garden</h2>
            <div className="garden-region">
              <div className="garden-space">
                <h3>Cold Frames</h3>
              </div>
              <div className="garden-space">
                <h3>Garden Beds</h3>
              </div>
              <div className="garden-space">
                <h3>Compost Pile</h3>
              </div>
            </div>
          </div>
          <div className="farm-region">
            <h2>Chicken Coop</h2>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;

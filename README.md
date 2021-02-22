# Attenborough

Attenborough is a single page react app and the user interface for the Cenozoa IoT Farm Platform (https://cenozoa.danielleahrens.com). It is the portal through which the status of all IoT sensors can be viewed and information (i.e. location and alert levels) updated. 

![cenozoa_diagram](https://user-images.githubusercontent.com/31782840/108779365-bf1c8a80-7534-11eb-91d8-64da8f6bad4e.png)

This UI is a part of the Cenozoa IoT Farm Platform (https://cenozoa.danielleahrens.com) the component parts include:
- Web Server: https://github.com/danielleahrens/cenozoa
- User Interface: https://github.com/danielleahrens/attenborough
- Temp/Humidity Sensor: https://github.com/danielleahrens/batCave

## UI Features

### Landing page: 
Displays an overview of sensors and their locations

![Cenozoa UI landing page](https://user-images.githubusercontent.com/31782840/108758915-aeaae680-7519-11eb-86fc-20b29c1f921a.png)

### Metrics page: 
From the landing page, select the region (i.e. house, garden), space (i.e. first floor, basement) or area (i.e. kitchen, porch) on the farm to see the metric information about the sensors in that zone. The current, 24 hour high and 24 hour low sensor measurements (i.e. temperature and humidity) are displayed. The measurements will be colored red or green depending on whether they are outside the alert range. 

All sensors in the house:
![All sensors in the house](https://user-images.githubusercontent.com/31782840/108758953-b9fe1200-7519-11eb-92f0-f5e2960f43f0.png)

All sensors in the kitchen:
![All sensors in the kitchen](https://user-images.githubusercontent.com/31782840/108758948-b8cce500-7519-11eb-9e9f-0d3c7c61e2ac.png)

Sensors with alerting states:
![Sensors with alerting states](https://user-images.githubusercontent.com/31782840/108759031-d306c300-7519-11eb-9c75-c421cef9d258.png)

### Alert Limits page:
View the current alert limits for a given sensor (if they're set) and update those limits. Updating the alert limits requires additional authentication beyond the basic authentication from initial log in.

![Update alert limits page](https://user-images.githubusercontent.com/31782840/108758942-b66a8b00-7519-11eb-834c-61c0b0761247.png)

### Update Sensor's Location page:
View the current location for a given sensor (if it is set) and update the location. Updating the location requires additional authentication beyond the basic authentication from initial log in.

![Update sensor location page](https://user-images.githubusercontent.com/31782840/108758935-b4a0c780-7519-11eb-9619-9febb20971c6.png)

### Detailed Metrics page:

## Run and Build Instructions

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


# Weather Forecast with Map Integration

This is a simple weather forecast web application that integrates OpenWeatherMap and OpenStreetMap to display current weather data and a 3-hour forecast for a given city. The application includes interactive map features and provides detailed weather information for user-selected locations.

## Features

- **Search Weather by City**: Enter a city name to get the current weather and a 3-hour forecast.
- **Interactive Map**: Displays the location on the map with temperature overlay using OpenStreetMap and Leaflet.
- **3-Hour Weather Forecast**: Shows a 3-hour weather forecast for the selected city, including temperature, humidity, wind speed, and more.
- **User Location Detection**: Automatically detects the user's location and displays the current weather and forecast for that location.

## Technologies Used

- **HTML/CSS**: For the basic structure and styling of the web page.
- **JavaScript**: For the application logic and API interaction.
- **OpenWeatherMap API**: Provides current weather data and forecast.
- **Leaflet.js**: For map integration using OpenStreetMap.

## Getting Started

### Prerequisites

You need to have a modern web browser with JavaScript enabled.

### Setup

1. Clone or download the repository.
2. Make sure you have the following files in the project folder:
    - `index.html`
    - `script.js`
    - `style.css`
3. Open the `index.html` file in a web browser to run the application.

### Usage

1. Enter a city name in the input field and either press "Enter" or click on the "Search" button to view the weather details.
2. The map will update to show the location of the city, and the weather data will be displayed below.
3. If no city is entered, the application will use a default location for initial display.

## Customization

- **Change API Key**: Update the `API_KEY` constant in the `script.js` file with your own OpenWeatherMap API key.
- **Initial Map Location**: Modify the coordinates in the `initializeMap` function in `script.js` to change the default map location.

## Keyboard Support

- **Enter Key**: Users can press the "Enter" key after typing in the city name to trigger the search.
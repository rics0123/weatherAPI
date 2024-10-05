// API Key and URLs for the APIs
const API_KEY = 'b1874e8463abeeb77801729dc9ce5eac';
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to get current weather data
async function getCurrentWeather(lat, lon) {
    const url = `${CURRENT_WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        displayCurrentWeather(data); // Display the current weather data in the location container
    } catch (error) {
        console.error('Error fetching current weather data:', error.message);
        alert('Failed to fetch current weather data. Please check the console for more details.');
    }
}

// Function to display current weather details
function displayCurrentWeather(data) {
    const cityName = data.name;
    const countryName = data.sys.country;
    const currentTemp = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = getWeatherIcon(data.weather[0].icon);

    // Display city name, country, and current weather information in the location container
    document.getElementById('location').innerHTML = `
        <strong>${cityName}, ${countryName}</strong><br>
        <img src="${icon}" alt="Weather Icon" style="vertical-align: middle; width: 50px;">
        <p>Temperature: ${currentTemp}°C</p>
        <p>Weather: ${weatherDescription}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

// Function to get 3-hour weather forecast data
async function getThreeHourForecast(lat, lon) {
    const url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        displayThreeHourForecast(data);
    } catch (error) {
        console.error('Error fetching 3-hour forecast data:', error.message);
        alert('Failed to fetch 3-hour forecast data. Please check the console for more details.');
    }
}

// Function to display 3-hour forecast details (show only specific times of the day)
function displayThreeHourForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous data

    // Filter forecasts to show only one entry per day at 12:00 PM (midday)
    const filteredForecasts = data.list.filter((forecast) => {
        const forecastTime = new Date(forecast.dt * 1000).getHours();
        return forecastTime === 12; // Show only forecasts at 12:00 PM
    });

    // Iterate over the filtered forecasts and display relevant information
    filteredForecasts.forEach((forecast) => {
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-item');

        // Extract and format forecast data
        const forecastTime = new Date(forecast.dt * 1000).toLocaleString();
        const temp = forecast.main.temp;
        const weatherDescription = forecast.weather[0].description;
        const icon = getWeatherIcon(forecast.weather[0].icon);

        forecastElement.innerHTML = `
            <p><strong>${forecastTime}</strong></p>
            <p>Temperature: ${temp}°C</p>
            <p>${weatherDescription}</p>
            <img src="${icon}" alt="Weather Icon">
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// Get the weather icon URL
function getWeatherIcon(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

// Function to get user's location and initialize weather data
function initializeWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getCurrentWeather(lat, lon); // Fetch and display current weather data
                getThreeHourForecast(lat, lon); // Fetch and display 3-hour forecast data
                document.getElementById('coordinates').textContent = `Coordinates: ${lat.toFixed(4)}N, ${lon.toFixed(4)}E`;
            },
            (error) => {
                console.error('Error fetching location:', error.message);
                alert('Failed to get your location. Using default location for weather data.');
                // If location access is denied or unavailable, use a default location
                const defaultLat = 10.8505; // Default latitude for Asia/Kolkata
                const defaultLon = 76.2711; // Default longitude for Asia/Kolkata
                getCurrentWeather(defaultLat, defaultLon);
                getThreeHourForecast(defaultLat, defaultLon);
                document.getElementById('coordinates').textContent = `Coordinates: ${defaultLat}N, ${defaultLon}E`;
            }
        );
    } else {
        // Geolocation is not supported, use a default location
        console.error('Geolocation is not supported by this browser.');
        alert('Geolocation is not supported by your browser. Using default location.');
        const defaultLat = 10.8505;
        const defaultLon = 76.2711;
        getCurrentWeather(defaultLat, defaultLon);
        getThreeHourForecast(defaultLat, defaultLon);
        document.getElementById('coordinates').textContent = `Coordinates: ${defaultLat}N, ${defaultLon}E`;
    }
}

// Initialize weather data on page load
initializeWeather();

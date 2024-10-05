const API_KEY = 'b1874e8463abeeb77801729dc9ce5eac';
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const windLayerUrl = `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`; // Wind pressure overlay

// Initialize Leaflet map
let map;
function initializeMap(lat, lon) {
    if (map) {
        map.setView([lat, lon], 12);
    } else {
        map = L.map('map').setView([lat, lon], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
        L.tileLayer(windLayerUrl, { opacity: 0.5, attribution: '© OpenWeatherMap' }).addTo(map);
    }
}

// Fetch current weather data
async function getCurrentWeather(lat, lon) {
    const url = `${CURRENT_WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        displayCurrentWeather(data);
        initializeMap(lat, lon);
    } catch (error) {
        console.error('Error fetching current weather data:', error.message);
        alert('Failed to fetch current weather data.');
    }
}

// Fetch weather data by city name
async function getWeatherByCity(city) {
    const url = `${CURRENT_WEATHER_URL}?q=${city}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        displayCurrentWeather(data);
        const { lat, lon } = data.coord;
        initializeMap(lat, lon);
        getThreeHourForecastByCity(city);
    } catch (error) {
        console.error('Error fetching weather data by city:', error.message);
        alert('Failed to fetch weather data for the entered city.');
    }
}

// Initialize map on page load
initializeMap(14.6604, 121.1171); // Default coordinates (e.g., Marikina)

// Fetch 3-hour forecast data by city name
async function getThreeHourForecastByCity(city) {
    const url = `${FORECAST_URL}?q=${city}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        displayThreeHourForecast(data);
    } catch (error) {
        console.error('Error fetching 3-hour forecast data:', error.message);
        alert('Failed to fetch 3-hour forecast data.');
    }
}

// Trigger search on Enter key press
document.getElementById('location-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const city = document.getElementById('location-input').value.trim();
        if (city) getWeatherByCity(city);
        else alert('Please enter a valid city name.');
    }
});

// Fetch and display 3-hour forecast data
async function getThreeHourForecast(lat, lon) {
    const url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        displayThreeHourForecast(data);
    } catch (error) {
        console.error('Error fetching 3-hour forecast data:', error.message);
        alert('Failed to fetch 3-hour forecast data.');
    }
}

// Display current weather details
function displayCurrentWeather(data) {
    const cityName = data.name;
    const countryName = data.sys.country;
    const currentTemp = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = getWeatherIcon(data.weather[0].icon);

    document.getElementById('location').innerHTML = `
        <strong>${cityName}, ${countryName}</strong><br>
        <img src="${icon}" alt="Weather Icon" style="vertical-align: middle; width: 50px;">
        <p>Temperature: ${currentTemp}°C</p>
        <p>Weather: ${weatherDescription}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

// Display 3-hour forecast (first 6 entries)
function displayThreeHourForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    const limitedForecasts = data.list.slice(0, 6);

    limitedForecasts.forEach((forecast) => {
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-item');

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

// Get weather icon URL
function getWeatherIcon(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

// Get user's location and initialize weather data
function initializeWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: lat, longitude: lon } = position.coords;
                getCurrentWeather(lat, lon);
                getThreeHourForecast(lat, lon);
                document.getElementById('coordinates').textContent = `Coordinates: ${lat.toFixed(4)}N, ${lon.toFixed(4)}E`;
            },
            () => {
                const defaultLat = 10.8505; // Default coordinates
                const defaultLon = 76.2711;
                getCurrentWeather(defaultLat, defaultLon);
                getThreeHourForecast(defaultLat, defaultLon);
                document.getElementById('coordinates').textContent = `Coordinates: ${defaultLat}N, ${defaultLon}E`;
            }
        );
    } else {
        const defaultLat = 10.8505;
        const defaultLon = 76.2711;
        getCurrentWeather(defaultLat, defaultLon);
        getThreeHourForecast(defaultLat, defaultLon);
        document.getElementById('coordinates').textContent = `Coordinates: ${defaultLat}N, ${defaultLon}E`;
    }
}

initializeWeather(); // Initialize on page load

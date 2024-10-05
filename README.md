Features:
Displays the current weather data including temperature, humidity, wind speed, and weather description.
Shows the 3-hour weather forecast for the next several days.
Auto-detects user's current location using geolocation and displays weather information for that location.
Fallback to a default location if geolocation is not supported or denied by the user.
Simple and responsive UI design.

Prerequisites:
An active OpenWeatherMap API key.
Basic knowledge of HTML, CSS, and JavaScript.

Project Structure:
index.html: The main HTML file containing the structure of the application.
script.js: JavaScript file that handles API calls, geolocation, and dynamic content updates.
style.css: CSS file for styling the application.

Setup:
Clone the repository or download the project files.

Open index.html in your favorite text editor.

Replace the placeholder API key in script.js with your own OpenWeatherMap API key:

const API_KEY = APIKey
Open index.html in a web browser. Allow location access if prompted to see the weather data for your current location.

Usage:
Launch the application by opening index.html in any modern web browser.
View current weather information in the Location section.
See the 3-hour forecast for the next few days in the 3-Hour Forecast section.
If geolocation is not enabled, the application will display weather information for the default location set in the script.js file.
Integrating Additional APIs

2. Country Information API
To display more information about the user's country, such as population or region, integrate the REST Countries API.

Use the getCountryInfo function to fetch and display country-specific data.

Known Issues:
Some browsers may block the geolocation API due to security settings or if the page is served over HTTP instead of HTTPS.
The app defaults to a predefined location if geolocation is denied or not supported.

Future Enhancements:
Country Flag Integration: Display country flags using services like Flagpedia.
Currency Conversion: Add currency exchange rates based on the user's location.
Air Quality Data: Include AQI and pollution levels using the IQAir API.

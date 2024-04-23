// Weather.jsx

import { useState} from 'react';
import axios from 'axios';
import '../Style/Weather.css'; // Import the Weather.css file for styling

// ... (previous imports and code)

const Weather = () => {
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const apiKey = '58e52ffaed5848f7934df39d23758681';
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
  
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching weather data. Please check the city name.');
        setLoading(false);
      }
    };
  
    const handleButtonClick = () => {
      fetchData();
    };
  
    return (
      <div className="weather-container">
        <div className="weather-header">
          <h2>Weather Information for Agriculture</h2>
          <p>Enter the city name to check the current weather for optimal farming conditions.</p>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter City Name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button onClick={handleButtonClick}>Get Weather</button>
        </div>
        {loading && <p>Loading weather data...</p>}
        {error && <p>Error fetching weather data</p>}
        {weatherData && (
          <div className="weather-info">
            <h3 className="city-name">Weather in {weatherData.name}</h3>
            <div className="temperature">{Math.round(weatherData.main.temp)} °C</div>
            <p className="weather-description">{weatherData.weather[0].description}</p>
            <div className="additional-info">
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              {/* Add more weather information as needed */}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Weather;
  
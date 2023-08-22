import React, { useState } from "react";
import axios from "axios";
import styles from "./App.module.css";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`/weather?location=${location}`);
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Please enter a valid city name");
    }
  };

  return (
    <div className={styles.mainPage}>
      {/* Search card */}
      <div className={styles.searchCard}>
        <p className={styles.title}>
          Use our weather app to see the weather around the world
        </p>
        <p className={styles.paragraph}>City Name</p>
        <div className={styles.searchElement}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={
              weatherData &&
              (() => {
                setLocation("");
              })
            }
            className={styles.searchBar}
          />
          <button onClick={fetchWeather} className={styles.searchButton}>
            Check
          </button>
        </div>
      </div>
      {/* Weather card */}
      {weatherData && (
        <div className={styles.weatherCard}>
          <h3>{weatherData.location.name}</h3>
          <h4>{weatherData.location.country}</h4>
          <h1>{weatherData.current.temp_c}°C</h1>
          <div className={styles.details}>
            <div className={styles.detailsItem}>
              <p>Precipitation</p>
              <p>
                <strong>{weatherData.current.precip_mm} mm</strong>
              </p>
            </div>
            <div className={styles.detailsItem}>
              <p>Humidity</p>
              <p>
                <strong>{weatherData.current.humidity}%</strong>
              </p>
            </div>
            <div className={styles.detailsItem}>
              <p>Wind</p>
              <p>
                <strong>{weatherData.current.gust_kph} km/h</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

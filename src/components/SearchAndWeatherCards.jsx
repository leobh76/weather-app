import React from "react";
import styles from "./SearchAndWeatherCards.module.css";

const SearchCard = () => {
  const [showWeatherCard, setShowWeatherCard] = React.useState(false);

  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [precipitation, setPrecipitation] = React.useState("");
  const [humidity, setHumidity] = React.useState("");
  const [wind, setWind] = React.useState("");

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const apiCall = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=90e9aa3641dd4b31a09190503231208&q=${city}&aqi=no`
      );
      const response = await apiCall.json();
      setCity(response.location.name);
      setCountry(response.location.country);
      setTemperature(response.current.temp_c);
      setPrecipitation(response.current.precip_mm);
      setHumidity(response.current.humidity);
      setWind(response.current.wind_kph);
    } catch (err) {
      alert("Please enter a valid city name!");
      setShowWeatherCard(false);
    }
  };

  return (
    <>
      {/* Search card */}
      <div className={styles.searchCard}>
        <p className={styles.title}>
          Use our weather app to see the weather around the world
        </p>
        <p className={styles.paragraph}>City Name</p>
        <div className={styles.searchElement}>
          <input
            // If user clicks outside of the search bar, hide the weather card
            onFocus={() => setShowWeatherCard(false)}
            onChange={updateCity}
            className={styles.searchBar}
            type="search"
          />
          <button
            type="submit"
            onClick={
              // If city is not empty, get weather data
              city !== ""
                ? (e) => {
                    getWeather(e);
                    setShowWeatherCard(true);
                  }
                : () => alert("Please enter a city name!")
            }
            className={styles.searchButton}
          >
            Check
          </button>
        </div>
      </div>

      {/* Weather Card */}
      <div
        className={showWeatherCard ? styles.weatherCard : styles.displayNone}
      >
        <h3>{city}</h3>
        <h4>{country}</h4>
        <h1>{temperature}°C</h1>
        <div className={styles.details}>
          <div className={styles.detailsItem}>
            <p>Precipitation</p>
            <p>
              <strong>{precipitation} mm</strong>
            </p>
          </div>
          <div className={styles.detailsItem}>
            <p>Humidity</p>
            <p>
              <strong>{humidity}%</strong>
            </p>
          </div>
          <div className={styles.detailsItem}>
            <p>Wind</p>
            <p>
              <strong>{wind} km/h</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;

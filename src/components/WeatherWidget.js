import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchForecast } from "../store/weather";

const WeatherWidget = ({ cityId, weatherData, forecastData }) => {
  const dispatch = useDispatch();
  const [showForecast, setShowForecast] = useState(false);
  const [forecastDates, setForecastDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleShowForecast = () => {
    if (!forecastData) {
      dispatch(fetchForecast(cityId));
    }
    setShowForecast(true);
  };

  const handleCloseForecast = () => {
    setShowForecast(false);
  };

  const { name, weather, main, wind, clouds } = weatherData;
  const currentTempCelsius = main ? (main.temp - 273.15).toFixed(2) : "";

  // Extract unique dates from forecast data
  useEffect(() => {
    if (forecastData && forecastData.list) {
      const dates = forecastData.list.map((item) => item.dt_txt.split(" ")[0]);
      const uniqueDates = [...new Set(dates)].slice(0, 5); // Take first 5 unique dates
      setForecastDates(uniqueDates);
      if (uniqueDates.length > 0) {
        setSelectedDate(uniqueDates[0]); // Default to the first date
      }
    }
  }, [forecastData]);

  // Filter forecast entries by selected date
  const filteredForecast =
    forecastData && forecastData.list
      ? forecastData.list.filter((item) => item.dt_txt.startsWith(selectedDate))
      : [];

  // Helper function to format YYYY-MM-DD to a more readable date
  const formatDate = (dateStr) => {
    // dateStr format: "YYYY-MM-DD"
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="card-text">
          <strong>Condition:</strong> {weather && weather[0].main} -{" "}
          {weather && weather[0].description}
        </p>
        <p className="card-text">
          <strong>Temperature:</strong> {currentTempCelsius} °C
        </p>
        <p className="card-text">
          <strong>Wind:</strong> {wind && wind.speed} m/s
        </p>
        <p className="card-text">
          <strong>Clouds:</strong> {clouds && clouds.all}%
        </p>
        {!showForecast && (
          <button
            className="btn btn-secondary mt-2"
            onClick={handleShowForecast}
          >
            See Forecast
          </button>
        )}

        {showForecast && forecastData && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="h5 mb-0">Weather Forecast</h3>
              <button
                className="btn btn-light btn-sm"
                onClick={handleCloseForecast}
              >
                Close
              </button>
            </div>

            <div className="mb-3">
              {forecastDates.map((date) => (
                <button
                  key={date}
                  className={`btn me-2 mb-2 ${
                    selectedDate === date ? "btn-secondary" : "btn-light"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Date & Time</th>
                    <th>Description</th>
                    <th>Temp (°C)</th>
                    <th>Min Temp (°C)</th>
                    <th>Max Temp (°C)</th>
                    <th>Wind (m/s)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredForecast.map((item) => {
                    const forecastTempCelsius = (
                      item.main.temp - 273.15
                    ).toFixed(2);
                    const minTempCelsius = (
                      item.main.temp_min - 273.15
                    ).toFixed(2);
                    const maxTempCelsius = (
                      item.main.temp_max - 273.15
                    ).toFixed(2);

                    return (
                      <tr key={item.dt}>
                        <td>{item.dt_txt}</td>
                        <td>{item.weather[0].description}</td>
                        <td>{forecastTempCelsius}</td>
                        <td>{minTempCelsius}</td>
                        <td>{maxTempCelsius}</td>
                        <td>{item.wind.speed}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;

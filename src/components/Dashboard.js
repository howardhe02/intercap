import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "../store/weather";
import { cities } from "../data/cities";
import WeatherWidget from "./WeatherWidget";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentWeather, forecast, loading, error } = useSelector(
    (state) => state.weather
  );
  const [selectedCityId, setSelectedCityId] = useState(cities[0].id);

  useEffect(() => {
    dispatch(fetchCurrentWeather(selectedCityId));
  }, [selectedCityId, dispatch]);

  return (
    <div className="container mt-5">
      <h1 className="display-4 mb-4">Weather Dashboard</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <label className="form-label">
            Select City:
            <select
              className="form-select mt-2"
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name} ({city.country})
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {currentWeather && (
        <WeatherWidget
          cityId={selectedCityId}
          weatherData={currentWeather}
          forecastData={forecast}
        />
      )}
    </div>
  );
};

export default Dashboard;

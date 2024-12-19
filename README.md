# Weather Dashboard

A web application that displays the current weather and 5-day weather forecast for selected cities using the OpenWeatherMap API. Users can view weather details such as temperature, wind speed, and weather conditions for specific dates.

---

## **Technologies Used**
- **Frontend**: React, Bootstrap
- **State Management**: Redux Toolkit
- **API**: OpenWeatherMap API
- **Middleware**: Custom API middleware for asynchronous requests

---

## **Project Structure**
```
src/
  ├── components/
  │     ├── Dashboard.js     # Main dashboard layout
  │     └── WeatherWidget.js # Displays current weather & 5-day forecast
  ├── store/
  │     ├── createStore.js   # Redux store configuration
  │     ├── weather.js       # Redux slice for weather state
  │     ├── api.js           # API action creators
  │     └── middleware/
  │           └── api.js     # Custom middleware for API requests
  ├── data/
  │     └── cities.js        # List of cities and their OpenWeatherMap city IDs
  └── App.js                 # Main entry point for the app
```

---

## **Installation**
1. **Clone the repository**
   ```bash
   https://github.com/howardhe02/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

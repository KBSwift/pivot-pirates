import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RootLayout() {
  const location = useLocation();
  const [weatherData, setWeatherData] = useState(null);

  const isLoginPage = location.pathname === "/login";

  const fetchWeatherData = async () => {
    try {
      const cityName = "Saint Louis"; 
      const encodedCityName = encodeURIComponent(cityName);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCityName}&units=imperial&appid=04efccd56250ed065cecf0b55afcfa3e`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Conditionally render the navbar/header
  const renderNavbar = () => {
    if (!isLoginPage) {
      return (
        <nav>
          <h1>NutraStride+WeatherFit</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="nutralog">NutraLog</NavLink>
          <NavLink to="stridelog">StrideLog</NavLink>
          <NavLink to="goals">Goals</NavLink>
          <NavLink to="login">Login</NavLink>
          {weatherData && (
            <div className="weather-widget">
              <p>
                {weatherData.main.temp}°F, {weatherData.weather[0].description}
              </p>
            </div>
          )}
        </nav>
      );
    }
  };

  return (
    <div className="root-layout">
      <header>{renderNavbar()}</header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

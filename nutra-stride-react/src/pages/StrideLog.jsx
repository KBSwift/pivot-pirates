import { useState, useEffect } from "react";
import axios from "axios";

export default function StrideLog() {
  const [milesRun, setMilesRun] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [submittedMiles, setSubmittedMiles] = useState(null);
  const [submittedSteps, setSubmittedSteps] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleMilesRunChange = (e) => {
    setMilesRun(e.target.value);
  };

  const handlStepCountChange = (e) => {
    setStepCount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmittedMiles(milesRun);
    setSubmittedSteps(stepCount);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const cityName = "Saint Louis"; // Replace with your desired city name
        const encodedCityName = encodeURIComponent(cityName);

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodedCityName}&units=imperial&appid=04efccd56250ed065cecf0b55afcfa3e`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  const renderTemperatureMessage = () => {
    if (!weatherData || !weatherData.main || !weatherData.main.temp) {
      return null;
    }
  
    const temperature = weatherData.main.temp;
  
    let message = '';
  
    if (temperature < 32) {
      message = "It's below freezing outside. Plan an indoor workout today or bundle up in layers for your run!";
    } else if (temperature >= 32 && temperature <= 40) {
      message = "Wear long sleeves! It's cold out!";
    } else if (temperature > 40 && temperature <= 50) {
      message = "The weather is perfect for a run today!";
    } else if (temperature > 50 && temperature <= 60) {
      message = "The weather is fine for a run if you have one planned.";
    } else if (temperature > 60 && temperature <= 70) {
      message = "The weather is fairly warm outside.";
    } else if (temperature > 70 && temperature <= 80) {
      message = "It's a warm day. Make sure you're hydrated!";
    } else {
      message = "It's a hot day for a run outside. Proceed with caution!";
    }
  
    return <p className="temperature-message">Tip: {message}</p>;
  };
  

  return (
    <div>
      <h2>StrideLog</h2>
      {renderTemperatureMessage()}
      <form onSubmit={handleSubmit}>
        <label htmlFor="miles">
          {" "}
          Total Miles Run:
          <input
            id="miles"
            type="number"
            value={milesRun}
            onChange={handleMilesRunChange}
          />
        </label>
        <br />
        <label htmlFor="steps">
          Step Count:
          <input
            id="steps"
            type="number"
            value={stepCount}
            onChange={handlStepCountChange}
          />
        </label>
        <br />
        <button type="submit">Log Activity</button>
      </form>

      <h2 className="stridecount">Total miles: {submittedMiles}</h2>
      <h2 className="stridecount">Total steps: {submittedSteps}</h2>
    </div>
  );
}

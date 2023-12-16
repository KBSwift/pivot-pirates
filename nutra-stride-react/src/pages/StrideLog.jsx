import { useState } from "react";

export default function StrideLog() {
  const [milesRun, setMilesRun] = useState(0);
  const [stepCount, setStepCount] = useState(0);

  const handleMilesRunChange = (e) => {
    setMilesRun(e.target.value);
  };

  const handlStepCountChange = (e) => {
    setStepCount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO: Handle submit for activity logging
  };

  //TODO: Add useEffect hook to fetch weather data using API

  return (
    <div>
      <h2>StrideLog</h2>
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
    </div>
  );
}

import { useState } from "react";

export default function StrideLog() {
  const [milesRun, setMilesRun] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [submittedMiles, setSubmittedMiles] = useState(null);
  const [submittedSteps, setSubmittedSteps] = useState(null);

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

      <h2 className="stridecount">Total miles: {submittedMiles}</h2>
      <h2 className="stridecount">Total steps: {submittedSteps}</h2>
    </div>
  );
}

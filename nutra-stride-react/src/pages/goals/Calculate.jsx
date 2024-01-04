import { useState, useEffect } from "react";

export default function Calculate() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goal, setGoal] = useState("maintain");
  const [calculatedTDEE, setCalculatedTDEE] = useState(0);

  const calculateTDEE = () => {
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);

    if (isNaN(parsedWeight) || isNaN(parsedHeight)) {
      console.error("Invalid weight or height");
      return;
    }

    const bmr =
      gender === "male"
        ? 66.47 + 6.23 * parsedWeight + 12.7 * parsedHeight - 6.8 * age
        : 655.1 + 4.35 * parsedWeight + 4.7 * parsedHeight - 4.7 * age;

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    const goalMultipliers = {
      lose: 0.8,
      maintain: 1.0,
      gain: 1.2,
    };

    const adjustedTDEE = tdee * goalMultipliers[goal];

    setCalculatedTDEE(adjustedTDEE);
    console.log(`Calculated TDEE is ${adjustedTDEE}`);
  };

  useEffect(() => {
    // Fetch initial TDEE on page load
    calculateTDEE();
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div className="calculate">
      <h2>Calculate your TDEE</h2>
      <form>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Weight (lbs):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <br />
        <label>
          Height (in):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <br />
        <label>
          Activity Level:
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly active</option>
            <option value="moderate">Moderately active</option>
            <option value="active">Very active</option>
            <option value="veryActive">Extremely active</option>
          </select>
        </label>
        <br />
        <label>
          Goal:
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={calculateTDEE}>
          Calculate TDEE
        </button>
      </form>

      <h2 id="tdee">TDEE: {Math.floor(calculatedTDEE)}</h2>
    </div>
  );
}

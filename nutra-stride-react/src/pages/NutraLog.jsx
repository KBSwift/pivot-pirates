import { useState } from "react";

export default function NutraLog() {
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");

  const logFood = () => {
    //food logging logic
    console.log(`Logging food: ${foodItem}, calories ${calories}`);
  };

  const handleFoodChange = (e) => {
    setFoodItem(e.target.value);
  };
  const handleCalorieChange = (e) => {
    setCalories(e.target.value);
  };

  return (
    <div className="nutralog">
      <h2>NutraLog</h2>
      <form action="">
        <label htmlFor="foodItem">
          Food item:
          <input
            id="foodItem"
            type="text"
            value={foodItem}
            onChange={handleFoodChange}
          />
        </label>
        <br />
        <label htmlFor="calories">
          Calories
          <input
            id="calories"
            type="number"
            value={calories}
            onChange={handleCalorieChange}
          />
        </label>
        <br />
        <button onClick={logFood}>Log item</button>
      </form>
    </div>
  );
}

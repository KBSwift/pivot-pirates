import { useState } from "react";

const NutraLog = () => {
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [logError, setLogError] = useState(null);
  const [loggedItems, setLoggedItems] = useState([]);

  const logFood = async () => {
    const appId = "8dd733fb";
    const appKey = "439705ccac3ff7fb3c5efbeee90d7e4f";

    const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingr: [foodItem], // An array of food items to analyze
        }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log("Data from API:", data); 

        // Update the list of logged items
        setLoggedItems((prevItems) => [
          ...prevItems,
          { foodItem, calories: data.calories },
        ]);

        // Update state with the calories information
        setCalories(data.calories);
        console.log(`Logged food: ${foodItem}, calories: ${data.calories}`);
      } else {
        const data = await response.json();
        setLogError(data.message);
        console.error("Food logging failed:", data.message);
      }
    } catch (error) {
      setLogError("An unexpected error occurred during food logging.");
      console.error("Error during food logging:", error);
    }
  };

  const handleFoodChange = (e) => {
    setFoodItem(e.target.value);
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
        <button onClick={logFood}>Log item</button>
        {calories && <p>Calories: {calories}</p>}
        {logError && <p style={{ color: "red" }}>{logError}</p>}
        {loggedItems.length > 0 && (
          <div>
            <h3>Logged Items</h3>
            <ul>
              {loggedItems.map((item, index) => (
                <li key={index}>
                  {item.foodItem} - Calories: {item.calories}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default NutraLog;

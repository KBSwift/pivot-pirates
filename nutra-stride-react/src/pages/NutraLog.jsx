import { useState } from "react";
import axios from "axios";

const NutraLog = () => {
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [logError, setLogError] = useState(null);
  const [loggedItems, setLoggedItems] = useState([]);

  const logFood = async (e) => {
    e.preventDefault();

    // Your API credentials and URL
    const appId = "8dd733fb";
    const appKey = "439705ccac3ff7fb3c5efbeee90d7e4f";
    const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}`;

    try {
      // Make a GET request using Axios
      const response = await axios.get(`${apiUrl}&ingr=${foodItem}`);
      const data = response.data;

      if (response.status === 200) {
        // Update the list of logged items
        setLoggedItems((prevItems) => [
          ...prevItems,
          { foodItem, calories: data.calories },
        ]);

        // Update state with the calories information
        setCalories(data.calories);
        console.log(`Logged food: ${foodItem}, calories: ${data.calories}`);
      } else {
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

  const handleDeleteItem = (index) => {
    const updatedItems = [...loggedItems];
    updatedItems.splice(index, 1);
    setLoggedItems(updatedItems);
  };

  const getTotalCalories = () => {
    return loggedItems.reduce(
      (total, item) => total + parseFloat(item.calories),
      0
    );
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

        {logError && <p style={{ color: "red" }}>{logError}</p>}
        {loggedItems.length > 0 && (
          <div>
            <h3>Logged Items</h3>
            <ul>
              {loggedItems.map((item, index) => (
                <li key={index}>
                  {item.foodItem} - Calories: {item.calories}
                  <button onClick={() => handleDeleteItem(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <h3>Total calories: {getTotalCalories()}</h3>
          </div>
        )}
      </form>
    </div>
  );
};

export default NutraLog;

import { useState, useEffect } from "react";
import axios from "axios";

export default function NutraLog() {
  const [foodItem, setFoodItem] = useState("");
  const [logError, setLogError] = useState(null);
  const [loggedItems, setLoggedItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchLoggedItems();
  }, []);

  const fetchLoggedItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/fooditems");
      if (response.status === 200) {
        setLoggedItems(response.data);
      } else {
        setLogError("Failed to fetch logged items");
      }
    } catch (error) {
      setLogError("An unexpected error occurred during fetching.");
      console.error("Error during fetching:", error);
    }
  };

  const logFood = async (e) => {
    e.preventDefault();

    const appId = "8dd733fb";
    const appKey = "439705ccac3ff7fb3c5efbeee90d7e4f";

    try {
      const edamamResponse = await axios.get(
        `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${foodItem}`
      );

      if (edamamResponse.status === 200) {
        const response = await axios.post(
          "http://localhost:8080/api/fooditems",
          {
            name: foodItem,
            calories: parseFloat(edamamResponse.data.calories).toFixed(1),
            protein: parseFloat(
              edamamResponse.data.totalNutrients.PROCNT.quantity
            ).toFixed(1),
            fats: parseFloat(
              edamamResponse.data.totalNutrients.FAT.quantity
            ).toFixed(1),
            carbs: parseFloat(
              edamamResponse.data.totalNutrients.CHOCDF.quantity
            ).toFixed(1),
          }
        );

        if (response.status === 200) {
          setLoggedItems((prevItems) => [...prevItems, response.data]);
          setFoodItem("");
        } else {
          setLogError("Failed to log food item");
        }
      } else {
        setLogError("Failed to fetch nutrition data");
      }
    } catch (error) {
      setLogError("An unexpected error occurred during food logging.");
      console.error("Error during food logging:", error);
    }
  };

  const handleFoodChange = (e) => {
    setFoodItem(e.target.value);
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/fooditems/${id}`
      );

      if (response.status === 204) {
        setLoggedItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
      } else {
        setLogError("Failed to delete food item");
      }
    } catch (error) {
      setLogError("An unexpected error occurred during deletion.");
      console.error("Error during deletion:", error);
    }
  };

  const updateFoodItem = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/fooditems/${id}`,
        updatedData
      );

      if (response.status === 200) {
        const updatedItem = response.data;
        setLoggedItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
          )
        );
        setEditingItemId(null);
      } else {
        setLogError("Failed to update food item");
      }
    } catch (error) {
      setLogError("An unexpected error occurred during update.");
      console.error("Error during update:", error);
    }
  };

  const handleEditItem = (id) => {
    setEditingItemId(id);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleUpdateItem = async (id) => {
    const updatedData = {
      name: prompt(
        "Enter updated name",
        loggedItems.find((item) => item.id === id)?.name
      ),
      calories: parseFloat(
        prompt(
          "Enter updated calories",
          loggedItems.find((item) => item.id === id)?.calories
        )
      ).toFixed(1),
      protein: parseFloat(
        prompt(
          "Enter updated protein",
          loggedItems.find((item) => item.id === id)?.protein
        )
      ).toFixed(1),
      fats: parseFloat(
        prompt(
          "Enter updated fats",
          loggedItems.find((item) => item.id === id)?.fats
        )
      ).toFixed(1),
      carbs: parseFloat(
        prompt(
          "Enter updated carbs",
          loggedItems.find((item) => item.id === id)?.carbs
        )
      ).toFixed(1),
    };

    if (
      Object.values(updatedData).every(
        (value) => value !== null && value !== undefined
      )
    ) {
      updateFoodItem(id, updatedData);
    } else {
      setLogError("Invalid input. Food item not updated.");
    }
  };

  const getTotal = (nutrient) => {
    return Math.floor(
      loggedItems.reduce((total, item) => total + parseFloat(item[nutrient]), 0)
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
              {loggedItems.map((item) => (
                <li key={item.id}>
                  {editingItemId === item.id ? (
                    <>
                      <input
                        type="text"
                        value={foodItem}
                        onChange={(e) => setFoodItem(e.target.value)}
                      />
                      <button onClick={() => handleUpdateItem(item.id)}>
                        Update
                      </button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {item.name} - Calories: {item.calories}, Protein:
                      {item.protein}, Fats: {item.fats}, Carbs: {item.carbs}
                      <button onClick={() => handleEditItem(item.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteItem(item.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <h3>
              Total calories: {getTotal("calories")}, Total protein:{" "}
              {getTotal("protein")}, Total fats: {getTotal("fats")}, Total
              carbs: {getTotal("carbs")}
            </h3>
          </div>
        )}
      </form>
    </div>
  );
}

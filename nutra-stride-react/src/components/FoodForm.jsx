import { useState } from "react";
import axios from "axios";

export default function FoodForm() {
  const [food, setFood] = useState({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/foods", food);
      console.log("Food added/updated: ", response.data);

      const edamamResponse = await axios.get(
        `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(
          food.name
        )}&app_id=8dd733fb&app_key=
                439705ccac3ff7fb3c5efbeee90d7e4fY`
      );
      const edamamData = edamamResponse.data.parsed[0].food;
      setFood({
        ...food,
        calories: edamamData.nutrients.ENERC_KCAL || 0,
        protein: edamamData.nutrients.PROCNT || 0,
        carbs: edamamData.nutrients.CHOCDF || 0,
        fat: edamamData.nutrients.FAT || 0,
      });
    } catch (error) {
      console.error("ERROR adding/updating food item: ", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Food Name:
        <input
          type="text"
          name="name"
          value={food.name}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>

      {/* Display additional nutritional information */}
      <div>
        <h2>Nutritional Information</h2>
        <p>Calories: {food.calories}</p>
        <p>Protein: {food.protein}</p>
        <p>Carbs: {food.carbs}</p>
        <p>Fat: {food.fat}</p>
      </div>
    </form>
  );
}

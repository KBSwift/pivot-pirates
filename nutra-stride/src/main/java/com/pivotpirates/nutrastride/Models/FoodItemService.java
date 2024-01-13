package com.pivotpirates.nutrastride.Models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;


@Service
public class FoodItemService {
    private final FoodItemRepository foodItemRepository;

    @Autowired
    public FoodItemService(FoodItemRepository foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }

    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public FoodItem createFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    public void deleteFoodItem(Long id) {
        foodItemRepository.deleteById(id);
    }

    public Optional<FoodItem> getFoodItemById(Long id) {
        return foodItemRepository.findById(id);
    }

    public FoodItem updateFoodItem(Long id, FoodItem updatedFoodItem) {
        Optional<FoodItem> optionalFoodItem = foodItemRepository.findById(id);
        if (optionalFoodItem.isPresent()) {
            FoodItem existingFoodItem = optionalFoodItem.get();
            // Update properties of existingFoodItem with values from updatedFoodItem
            existingFoodItem.setName(updatedFoodItem.getName());
            existingFoodItem.setCalories(updatedFoodItem.getCalories());
            existingFoodItem.setProtein(updatedFoodItem.getProtein());
            existingFoodItem.setFats(updatedFoodItem.getFats());
            existingFoodItem.setCarbs(updatedFoodItem.getCarbs());
            // Save the updated FoodItem
            return foodItemRepository.save(existingFoodItem);
        } else {
            return null;
        }
    }
}
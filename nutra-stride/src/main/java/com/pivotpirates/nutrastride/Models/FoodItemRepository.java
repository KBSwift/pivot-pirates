package com.pivotpirates.nutrastride.Models;

import org.hibernate.service.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByName(String name);
}
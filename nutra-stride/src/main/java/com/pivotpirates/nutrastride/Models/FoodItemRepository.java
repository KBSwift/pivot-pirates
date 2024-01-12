package com.pivotpirates.nutrastride.Models;

import org.hibernate.service.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    // You can add custom queries here if needed
}
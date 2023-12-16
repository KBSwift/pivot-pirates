package com.pivotpirates.nutrastride.Models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository {
    User findByUsername(String username);

    Optional<User> findById(Integer userId);

    void save(User newUser);
}

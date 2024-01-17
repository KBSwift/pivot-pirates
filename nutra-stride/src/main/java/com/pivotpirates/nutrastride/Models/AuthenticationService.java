package com.pivotpirates.nutrastride.Models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticateUser(String username, String password) {
        // Retrieve user with given username from the database
        Users user = userRepository.findByUsername(username);

        // Check if the user exists
        if (user == null) {
            return false; // User not found
        }

        // Check if the provided password matches the hashed password
        return user.isMatchingPassword(password);
    }
}

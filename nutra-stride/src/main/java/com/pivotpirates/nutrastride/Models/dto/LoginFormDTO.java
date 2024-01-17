package com.pivotpirates.nutrastride.Models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.jetbrains.annotations.NotNull;

public class LoginFormDTO {

        @NotNull
        @NotBlank
        @Size(min = 3, max = 20, message = "Invalid username. Must be between 3 and 20 characters.")
        private String username;

        @NotNull
        @NotBlank
        @Size(min = 5, max = 30, message = "Invalid password. Must be between 5 and 30 characters.")
        private String password;

        public String getUsername() {
            System.out.println("Get Username called: " + username);
            return username;
        }

        public void setUsername(String username) {
            System.out.println("Loginform User: " + username);
            this.username = username;
            System.out.println("Username set to: " + username);
        }

        public String getPassword() {
            System.out.println("Get Password called: " + password);
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
            System.out.println("Password set to: " + password);
        }

}


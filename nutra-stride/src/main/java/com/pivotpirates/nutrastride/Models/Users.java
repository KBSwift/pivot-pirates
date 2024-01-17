package com.pivotpirates.nutrastride.Models;

import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "users", schema = "nutra_stride")
public class Users extends AbstractEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    @NotNull
    private String username;

    @Column(name = "pw_hash")
    @NotNull
    private String pwHash;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Long getId() {
        return id;
    }

    public Users() {
    }

    public Users(String username, String password) {
        this.username = username;
        this.pwHash = encoder.encode(password);
    }

    public String getUsername() {
        return username;
    }

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }

    public static Users registerUser(UserRepository userRepository, String username, String password) {
        // Check if the username already exists
        if (userRepository.findByUsername(username) != null) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Hash the password
        String hashedPassword = encoder.encode(password);

        // Save the user to the database
        Users newUser = new Users(username, hashedPassword);
        userRepository.save(newUser);

        return newUser;
    }

    public static boolean loginUser(UserRepository userRepository, String username, String password) {
        Users user = userRepository.findByUsername(username);
        return user != null && user.isMatchingPassword(password);
    }
}

package com.pivotpirates.nutrastride.Models;

import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "users", schema = "nutra_stride")
public class Users extends AbstractEntity{

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String username;

    @NotNull
    private String pwHash;

    public Long getId() {
        return id;
    }

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

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
}
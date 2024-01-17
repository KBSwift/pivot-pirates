//package com.pivotpirates.nutrastride.Models;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class MyUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) {
//        System.out.println("Searching for user with username: " + username);
//        Users user = userRepository.findByUsername(username);
//
//        if (user == null) {
//            System.out.println("User not found for username: " + username);
//        } else {
//            System.out.println("Found user: " + user.getUsername());
//        }
//        return new MyUserPrincipal(user);    }
//}
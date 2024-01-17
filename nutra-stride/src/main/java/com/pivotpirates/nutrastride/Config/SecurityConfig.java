//package com.pivotpirates.nutrastride.Config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests(authorizeRequests ->
//                        authorizeRequests
//                                .requestMatchers(HttpMethod.GET, "/api/fooditems").authenticated()
//                                .requestMatchers("/login","/register","/error", "/api/fooditems/**").permitAll()
//                                .anyRequest().permitAll()
//                )
//                 .formLogin(login ->
//                login
//                        .loginPage("/login")
//                        .permitAll()
//        )
//                .logout(logout ->
//                        logout
//                                .permitAll()
//                );
//                //.httpBasic(withDefaults());
//
//        http.csrf().disable();
//        http.headers().frameOptions().disable();
//
//        return http.build();
//    }
//}

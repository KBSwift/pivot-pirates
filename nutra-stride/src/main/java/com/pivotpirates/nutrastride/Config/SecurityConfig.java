package com.pivotpirates.nutrastride.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers(HttpMethod.GET, "/api/fooditems").authenticated()
<<<<<<< HEAD
                                .requestMatchers("/login","/register","/error", "/api/fooditems/**" ).permitAll()
=======
                                .requestMatchers("/login","/register","/error", "/api/fooditems/**").permitAll()
>>>>>>> 18fe3d029c2826b427045382625108bdc9b1912b
                                .anyRequest().permitAll()
                )
                 .formLogin(login ->
                login
                        .loginPage("/login")
                        .permitAll()
        )
                .logout(logout ->
                        logout
                                .permitAll()
                );
                //.httpBasic(withDefaults());

        http.csrf().disable();
        http.headers().frameOptions().disable();

        return http.build();
    }
}

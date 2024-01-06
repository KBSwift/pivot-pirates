package com.pivotpirates.nutrastride.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
                                .requestMatchers("/register").permitAll()
                                .anyRequest().authenticated()
                )
                .httpBasic(withDefaults());

        http.csrf().disable();

        http.headers().frameOptions().disable();

        return http.build();
    }
}

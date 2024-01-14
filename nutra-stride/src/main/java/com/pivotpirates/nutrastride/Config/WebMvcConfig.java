package com.pivotpirates.nutrastride.Config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Exclude /api/** from resource handling
        registry.addResourceHandler("/api/**")
                .addResourceLocations("classpath:/static/")  // Adjust the resource location based on your project structure
                .setCachePeriod(0);  // Disable caching for simplicity, adjust as needed
    }
}

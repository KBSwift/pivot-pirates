package com.pivotpirates.nutrastride;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.pivotpirates.nutrastride"})
public class NutraStrideApplication {

	public static void main(String[] args) {
		SpringApplication.run(NutraStrideApplication.class, args);
	}

}

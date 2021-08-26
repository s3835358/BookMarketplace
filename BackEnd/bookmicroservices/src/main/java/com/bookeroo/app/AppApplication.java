package com.bookeroo.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/* 
 *	@SpringBootApplication indicates that this is the primary config class
 *	It also instructs spring boot to scan for components and autoconfig.
 */
@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}
	
}

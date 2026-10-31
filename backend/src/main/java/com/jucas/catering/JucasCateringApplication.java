package com.jucas.catering;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JucasCateringApplication {

    public static void main(String[] args) {
        SpringApplication.run(JucasCateringApplication.class, args);
        System.out.println("==================================================");
        System.out.println("🍽️  Jucas Catering AI Backend is LIVE on Port 8085");
        System.out.println("📊  H2 Database Console: http://localhost:8085/h2-console");
        System.out.println("🤖  AI Agent Endpoint:   http://localhost:8085/api/chat");
        System.out.println("📦  Orders Endpoint:     http://localhost:8085/api/orders");
        System.out.println("==================================================");
    }
}

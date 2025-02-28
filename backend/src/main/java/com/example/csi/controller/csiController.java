package com.example.csi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;

@RestController
public class csiController {
    @GetMapping("/get")
    public String init() {
        System.out.println("Hello, World!");
        return "Hello, World!";
    }

    @PostConstruct
    public void post() {
        // This method will be called after the bean's properties have been initialized
    }

}

package com.example.csi.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/metadata")

public class metadataController {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.key}")
    private String supabaseKey;

    private final RestTemplate restTemplate;

    public metadataController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Helper method to create common headers; THIS IS SUPABASE SPECIFIC
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("apikey", supabaseKey);
        headers.set("Authorization", "Bearer " + supabaseKey);
        return headers;
    }

    @GetMapping("/test")
    public ResponseEntity<String> getHello() {
        return ResponseEntity.ok("Hello, World! <br> You are now in the metadata Subpages! <br> This being located at: backend/src/main/java/com/example/csi/controller/metadataController.java");
    }
    
    // gets Column names

    @GetMapping("/columns/{tableName}")
    public ResponseEntity<?> getTableColumns(@PathVariable String tableName) {
        try {
            String url = supabaseUrl + "/rest/v1/" + tableName + "?select=*&";

            HttpHeaders headers = createHeaders();
            headers.set("Prefer", "return=representation");  // Ensures metadata is returned

            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                ObjectMapper mapper = new ObjectMapper();
                List<Map<String, Object>> records = mapper.readValue(response.getBody(), new TypeReference<>() {});
                
                if (!records.isEmpty()) {
                    Set<String> columnNames = records.get(0).keySet();
                    return ResponseEntity.ok(columnNames);
                }
            }
            return ResponseEntity.ok(Collections.emptySet());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }




}

package com.example.csi.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


@RestController

public class csiController {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.key}")
    private String supabaseKey;

    private final RestTemplate restTemplate;

    public csiController(RestTemplate restTemplate) {
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
        return ResponseEntity.ok("Hello, World!  <br> You are in the CSIController Subpages :)");
    }


    @GetMapping("/get/{tableName}")
    public ResponseEntity<?> getTableData(@PathVariable String tableName) {
        try {
            String getUrl = supabaseUrl + "/rest/v1/" + tableName;
            HttpEntity<Void> entity = new HttpEntity<>(createHeaders());
            
            ResponseEntity<String> response = restTemplate.exchange(getUrl, HttpMethod.GET, entity, String.class);
            return response.getStatusCode().is2xxSuccessful()
                    ? ResponseEntity.ok(response.getBody())
                    : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve data from table: " + tableName);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/post/{tableName}")
public ResponseEntity<?> postToTable(@PathVariable String tableName, @RequestBody Object requestBody) {
    try {
        String metadataUrl = "http://localhost:8080/metadata/columns/" + tableName; // Updated URL
        HttpEntity<Void> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> metadataResponse = restTemplate.exchange(metadataUrl, HttpMethod.GET, entity, String.class);

        if (!metadataResponse.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch metadata for table: " + tableName);
        }

        String postUrl = supabaseUrl + "/rest/v1/" + tableName;
        HttpEntity<Object> postEntity = new HttpEntity<>(requestBody, createHeaders());
        ResponseEntity<String> postResponse = restTemplate.exchange(postUrl, HttpMethod.POST, postEntity, String.class);

        if (postResponse.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.ok("Successfully added data to table: " + tableName);
        } else {
            // Include metadata response in case of failure to insert data
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to insert data into table: " + tableName + ". Metadata: " + metadataResponse.getBody());
        }
    } catch (Exception e) {
        String metadataUrl = "http://localhost:8080/metadata/columns/" + tableName;
        HttpEntity<Void> entity = new HttpEntity<>(createHeaders());
        try {
            ResponseEntity<String> metadataResponse = restTemplate.exchange(metadataUrl, HttpMethod.GET, entity, String.class);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("There has been an Error, please ensure you have these values in your post request : \nMetadata: " + metadataResponse.getBody() + "\n \n \n --- \n " + "Error: " + e.getMessage() );
        } catch (Exception metadataException) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage() + ". Failed to fetch metadata.");
        }
    }
}
}

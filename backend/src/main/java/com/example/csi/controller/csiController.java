// You can change this, but just add things, do not delete things here
package com.example.csi.controller;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

import com.example.csi.annotation.ApiDescription;

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
    @ApiDescription("Returns a greeting message to the user.")
    public ResponseEntity<String> getHello() {
        return ResponseEntity.ok("Hello, World!  <br> You are in the CSIController Subpages :)");
    }

    @GetMapping("/start")
    public ResponseEntity<String> getMethodName(@RequestParam String param) {
        return ResponseEntity.ok("Sucessfully Started Backend Server!");
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


    @GetMapping("get/hotels/{location}")
    public ResponseEntity<?> getHotelsByLocation(@PathVariable String location) {
        try {
            String getUrl = supabaseUrl + "/rest/v1/hotel?address=eq." + URLEncoder.encode(location, StandardCharsets.UTF_8);
            HttpEntity<Void> entity = new HttpEntity<>(createHeaders());

            ResponseEntity<String> response = restTemplate.exchange(getUrl, HttpMethod.GET, entity, String.class);

            return response.getStatusCode().is2xxSuccessful()
                    ? ResponseEntity.ok(response.getBody())
                    : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve data from hotels table.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }


    @PostMapping("/post/{tableName}")
    public ResponseEntity<?> postToTable(@PathVariable String tableName, @RequestBody Object requestBody) {
        try {
            String metadataUrl = "https://test-deployment-iq7z.onrender.com/metadata/columns/" + tableName; // Updated URL
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
            String metadataUrl = "https://test-deployment-iq7z.onrender.com/metadata/columns/" + tableName;
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
    
    
    
    @DeleteMapping("/delete/{tableName}/{id}")
    public ResponseEntity<?> deleteFromTable(@PathVariable String tableName, @PathVariable String id) {
        try {

            // I want the PK value so that I can dynamically find what to delete 
            String metadataUrl = "https://test-deployment-iq7z.onrender.com/metadata/primaryKey/" + tableName;
            HttpEntity<Void> entity = new HttpEntity<>(createHeaders());
            ResponseEntity<String> metadataResponse = restTemplate.exchange(metadataUrl, HttpMethod.GET, entity, String.class);
    
            if (!metadataResponse.getStatusCode().is2xxSuccessful() || metadataResponse.getBody() == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch primary key for table: " + tableName);
            }

            // You clean the string from tables
            String primaryKey = metadataResponse.getBody().replaceAll("[\\[\\]\"]", "");
    
            HttpHeaders headers = createHeaders();
            headers.set("Prefer", "return=representation");
            HttpEntity<Void> deleteEntity = new HttpEntity<>(headers);
    
            String deleteUrl = supabaseUrl + "/rest/v1/" + tableName + "?" + primaryKey + "=eq." + id;
            ResponseEntity<String> deleteResponse = restTemplate.exchange(deleteUrl, HttpMethod.DELETE, deleteEntity, String.class);
    
            if (deleteResponse.getStatusCode().is2xxSuccessful()) {
                if (deleteResponse.getBody() == null || deleteResponse.getBody().equals("[]")) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No record found to delete with id: " + id + "(Status = 404)");
                } else {
                    return ResponseEntity.ok("Successfully deleted record from table: " + tableName + "(Status = 200)");
                }
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Failed to delete record from table: " + tableName + " (Error code: " + deleteResponse.getStatusCode().value() + ")");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage() + " (Error code: 500)");
            }
    }


    @PutMapping("/update/{tableName}")
    public ResponseEntity<?> updateTableData(@PathVariable String tableName, @RequestBody Map<String, Object> requestBody) {
        try {
            String metadataUrl = "https://test-deployment-iq7z.onrender.com/metadata/primaryKey/" + tableName;
            HttpEntity<Void> entity = new HttpEntity<>(createHeaders());
            ResponseEntity<String> metadataResponse = restTemplate.exchange(metadataUrl, HttpMethod.GET, entity, String.class);

            if (!metadataResponse.getStatusCode().is2xxSuccessful() || metadataResponse.getBody() == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch primary key for table: " + tableName);
            }

            String primaryKey = metadataResponse.getBody().replaceAll("[\\[\\]\"]", "");

          
            Object idObj = requestBody.get(primaryKey);
            if (idObj == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Primary key (id) is required in the request body.");
            }

            String id = String.valueOf(idObj); 

            HttpHeaders headers = createHeaders();
            headers.set("Prefer", "return=representation");
            headers.setContentType(MediaType.APPLICATION_JSON);

        
            HttpEntity<Map<String, Object>> PUTEntity = new HttpEntity<>(requestBody, headers);
            String PUTUrl = supabaseUrl + "/rest/v1/" + tableName + "?" + primaryKey + "=eq." + id;
            ResponseEntity<String> PUTResponse = restTemplate.exchange(PUTUrl, HttpMethod.PUT, PUTEntity, String.class);

            if (PUTResponse.getStatusCode().is2xxSuccessful()) {
                if (PUTResponse.getBody() == null || PUTResponse.getBody().equals("[]")) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No record found to update with id: " + id + " (Status = 404)");
                } else {
                    return ResponseEntity.ok("Successfully updated " + requestBody.keySet() + " in table: " + tableName + " (Status = 200)");
                }
            } else {
                return ResponseEntity.status(PUTResponse.getStatusCode())
                    .body("Failed to update data in table: " + tableName + " (Error code: " + PUTResponse.getStatusCode().value() + ")");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error: " + e.getMessage() + " (Error code: 500)");
        }
    }



}

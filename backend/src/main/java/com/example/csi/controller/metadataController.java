package com.example.csi.controller;

import java.util.*;
import java.util.stream.Collectors;

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
        return ResponseEntity.ok("Hello, World! <br> You are now in the metadata Subpages!");
    }

    // Get all Table names
    @GetMapping("/tables")
    public ResponseEntity<?> getAllTables() {
        try {
            String url = supabaseUrl + "/rest/v1/rpc/get_all_table_names";

            HttpHeaders headers = createHeaders();
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                ObjectMapper mapper = new ObjectMapper();
                List<Map<String, Object>> tables = mapper.readValue(response.getBody(), new TypeReference<>() {});
                
                Set<String> tableNames = tables.stream()
                    .map(table -> (String) table.get("table_name"))
                    .collect(Collectors.toSet());
                return ResponseEntity.ok(tableNames);
            }
            return ResponseEntity.ok(Collections.emptySet());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // Get Columns for a Table
    @GetMapping("/columns/{tableName}")
    public ResponseEntity<?> getTableColumns(@PathVariable String tableName) {
        try {
            String url = supabaseUrl + "/rest/v1/" + tableName + "?select=*";

            HttpHeaders headers = createHeaders();
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

    // Get Primary Keys for a Table
    @GetMapping("/primaryKey/{tableName}")
    public ResponseEntity<?> getPrimaryKey(@PathVariable String tableName) {
        try {
            String url = supabaseUrl + "/rest/v1/rpc/get_primary_key?table_name=" + tableName;

            HttpHeaders headers = createHeaders();
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                ObjectMapper mapper = new ObjectMapper();
                List<Map<String, Object>> primaryKey = mapper.readValue(response.getBody(), new TypeReference<>() {});
                
                Set<String> pkColumns = primaryKey.stream()
                    .map(pk -> (String) pk.get("column_name"))
                    .collect(Collectors.toSet());
                return ResponseEntity.ok(pkColumns);
            }
            return ResponseEntity.ok(Collections.emptySet());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // Get Foreign Keys for a Table
    @GetMapping("/foreignKeys/{tableName}")
    public ResponseEntity<?> getForeignKeys(@PathVariable String tableName) {
        try {
            String url = supabaseUrl + "/rest/v1/rpc/get_foreign_keys?table_name=" + tableName;

            HttpHeaders headers = createHeaders();
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                ObjectMapper mapper = new ObjectMapper();
                List<Map<String, Object>> foreignKeys = mapper.readValue(response.getBody(), new TypeReference<>() {});
                
                return ResponseEntity.ok(foreignKeys);
            }
            return ResponseEntity.ok(Collections.emptyList());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // Get Table Tree Structure (Table, Columns, PK, FK)
    @GetMapping("/tableTree")
    public ResponseEntity<?> getTableTree() {
        try {
            String url = supabaseUrl + "/rest/v1/rpc/get_all_table_names";

            HttpHeaders headers = createHeaders();
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                ObjectMapper mapper = new ObjectMapper();
                List<Map<String, Object>> tables = mapper.readValue(response.getBody(), new TypeReference<>() {});
                
                List<Map<String, Object>> tree = new ArrayList<>();
                
                for (Map<String, Object> table : tables) {
                    String tableName = (String) table.get("table_name");
                    
                    Map<String, Object> tableInfo = new HashMap<>();
                    tableInfo.put("tableName", tableName);
                    tableInfo.put("columns", getTableColumns(tableName).getBody());
                    tableInfo.put("primaryKey", getPrimaryKey(tableName).getBody());
                    tableInfo.put("foreignKeys", getForeignKeys(tableName).getBody());
                    
                    tree.add(tableInfo);
                }
                
                return ResponseEntity.ok(tree);
            }
            return ResponseEntity.ok(Collections.emptyList());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}

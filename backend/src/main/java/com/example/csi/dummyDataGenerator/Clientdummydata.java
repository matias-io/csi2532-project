// I made this file so as to generate fake data for my testing of the update and delete methods in client

package com.example.csi.dummyDataGenerator;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Random;

public class Clientdummydata {

    // Arrays of sample names and addresses
    private static final String[] FIRST_NAMES = {"John", "Jane", "Michael", "Sara", "David", "Emily"};
    private static final String[] LAST_NAMES = {"Doe", "Smith", "Johnson", "Brown", "Williams", "Jones"};
    private static final String[] STREET_NAMES = {"Main St", "Oak St", "Pine St", "Maple Ave", "Elm St"};
    private static final String[] CITIES = {"Springfield", "Denver", "Boston", "Austin", "Chicago"};
    private static final String[] STATES = {"CA", "NY", "TX", "FL", "IL"};
    private static final Random random = new Random();

    private static String generateFullName() {
        String firstName = FIRST_NAMES[random.nextInt(FIRST_NAMES.length)];
        String lastName = LAST_NAMES[random.nextInt(LAST_NAMES.length)];
        return firstName + " " + lastName;
    }

    private static String generateAddress() {
        String street = random.nextInt(9999) + " " + STREET_NAMES[random.nextInt(STREET_NAMES.length)];
        String city = CITIES[random.nextInt(CITIES.length)];
        String state = STATES[random.nextInt(STATES.length)];
        return street + ", " + city + ", " + state;
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            String url = "https://test-deployment-iq7z.onrender.com/post/client"; 

            String fullName = generateFullName();
            String address = generateAddress();
            String socialSecurityNumber = String.valueOf(i);  

            String jsonInputString = String.format(
                    "{\"full_name\": \"%s\", \"address\": \"%s\", \"social_security_number\": \"%s\"}",
                    fullName, address, socialSecurityNumber);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonInputString))
                    .build();

            try {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println("Response Code: " + response.statusCode());
                System.out.println("Response Body: " + response.body());
            } catch (Exception e) {
                e.printStackTrace();  
            }
        }
    }
}

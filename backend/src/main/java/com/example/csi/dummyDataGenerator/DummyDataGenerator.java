package com.example.csi.dummyDataGenerator;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class DummyDataGenerator {

    private static final Random random = new Random();
    private static final HttpClient client = HttpClient.newHttpClient();

    private static void sendPostRequest(String url, String json) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("POST " + url + " => " + response.statusCode());
            System.out.println(response.body());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static String randomPhone() {
        return "613-" + (1000 + random.nextInt(9000));
    }

    private static String randomEmail(String name) {
        return name.toLowerCase().replace(" ", ".") + "@mail.com";
    }

    private static String randomDate() {
        LocalDate start = LocalDate.of(2023, 1, 1);
        return start.plusDays(random.nextInt(365)).toString();
    }

    private static void createChains() {
        for (int i = 0; i < 3; i++) {
            String name = "Chain " + (i + 1);
            int bureauId = i + 1; // Adjust to ensure bureauId exists in main_hotel
            String json = String.format("{\"email\": \"%s\", \"telephone\": \"%s\", \"nom\": \"%s\", \"nombre_hotels\": %d, \"bureau_id\": %d}",
                    randomEmail(name), randomPhone(), name, random.nextInt(5) + 1, bureauId);
            sendPostRequest("https://test-deployment-iq7z.onrender.com/post/chain", json);
        }
    }
    

    public static List<Integer> createHotels(List<Integer> chainIds) {
        List<Integer> hotelIds = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            int chainId = chainIds.get(random.nextInt(chainIds.size()));
            String json = String.format("{\"chain_id\": %d, \"adresse\": \"Hotel Addr %d\", \"nombre_chambres\": %d, \"email\": \"%s\", \"telephone\": \"%s\", \"etoile\": %d}",
                    chainId, i + 1, 10 + random.nextInt(50), randomEmail("hotel" + i), randomPhone(), 1 + random.nextInt(5));
            String response = sendPostRequestAndGetResponse("https://test-deployment-iq7z.onrender.com/post/hotel", json);
            int hotelId = parseHotelIdFromResponse(response);
            hotelIds.add(hotelId);
        }
        return hotelIds;
    }

    public static void createRooms(List<Integer> hotelIds) {
        for (int i = 0; i < 10; i++) {
            int hotelId = hotelIds.get(random.nextInt(hotelIds.size()));
            String[] views = {"mer", "montagne", "aucune"};
            String json = String.format("{\"numero_chambre\": %d, \"hotel_id\": %d, \"capacite\": \"%d\", \"prix\": %.2f, \"vue\": \"%s\", \"etendu\": %b, \"commodites\": \"WiFi,TV\", \"problemes\": \"None\"}",
                    100 + i, hotelId, 1 + random.nextInt(4), 50 + random.nextDouble() * 100, views[random.nextInt(3)], random.nextBoolean());
            sendPostRequest("https://test-deployment-iq7z.onrender.com/post/room", json);
        }
    }

    public static void createClients() {
        for (int i = 0; i < 10; i++) {
            String name = "Client " + i;
            String json = String.format("{\"full_name\": \"%s\", \"address\": \"Client St %d\", \"social_security_number\": \"%d\", \"date_registration\": \"%s\"}",
                    name, i + 10, 1000 + i, randomDate());
            sendPostRequest("https://test-deployment-iq7z.onrender.com/post/client", json);
        }
    }

    public static void createReservations() {
        for (int i = 0; i < 5; i++) {
            String startDate = randomDate();
            String endDate = LocalDate.parse(startDate).plusDays(random.nextInt(5) + 1).toString();
            String json = String.format("{\"client_id\": %d, \"hotel_id\": %d, \"numero_chambre\": %d, \"date_debut\": \"%s\", \"date_fin\": \"%s\"}",
                    1 + random.nextInt(10), 1 + random.nextInt(5), 100 + random.nextInt(10), startDate, endDate);
            sendPostRequest("https://test-deployment-iq7z.onrender.com/post/reservation", json);
        }
    }

    public static void createEmployees() {
        for (int i = 0; i < 5; i++) {
            String name = "Emp " + i;
            String json = String.format("{\"hotel_id\": %d, \"nom\": \"%s\", \"adresse\": \"Employee St %d\", \"nas\": \"%d\", \"role\": \"Receptionist\"}",
                    1 + random.nextInt(5), name, i + 1, 10000 + i);
            sendPostRequest("https://test-deployment-iq7z.onrender.com/post/employee", json);
        }
    }

    public static void createLocations() {
        for (int i = 0; i < 5; i++) {
            String start = randomDate();
            String end = LocalDate.parse(start).plusDays(random.nextInt(3) + 1).toString();
            String json = String.format("{\"client_id\": %d, \"hotel_id\": %d, \"numero_chambre\": %d, \"employe_id\": %d, \"date_debut\": \"%s\", \"date_fin\": \"%s\"}",
                    1 + random.nextInt(10), 1 + random.nextInt(5), 100 + random.nextInt(10), 1 + random.nextInt(5), start, end);
            sendPostRequest("https://test-deployment-iq7z.onrender.com/post/location", json);
        }
    }

    public static void createArchives() {
        for (int i = 1; i <= 5; i++) {
            String json = String.format("{\"location_id\": %d, \"nombre_reservation\": %d, \"nombre_location\": %d}", i, random.nextInt(3), random.nextInt(3));
            sendPostRequest("https://test-deployment-iq7z.onrender.com/post/archive", json);
        }
    }

    // Utility method to send POST requests and return the response
    private static String sendPostRequestAndGetResponse(String url, String json) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    // Parse chain_id from the response
    private static int parseChainIdFromResponse(String response) {
        // Assuming the response contains a "chain_id" field
        // Parse the ID from the response here
        return Integer.parseInt(response); // Modify as per actual response format
    }

    // Parse hotel_id from the response
    private static int parseHotelIdFromResponse(String response) {
        // Assuming the response contains a "hotel_id" field
        // Parse the ID from the response here
        return Integer.parseInt(response); // Modify as per actual response format
    }

    public static void main(String[] args) {
        chainIds = createChains();
        List<Integer> hotelIds = createHotels(chainIds);
        createRooms(hotelIds);
        createClients();
        createEmployees();
        createReservations();
        createLocations();
        createArchives();
    }
}

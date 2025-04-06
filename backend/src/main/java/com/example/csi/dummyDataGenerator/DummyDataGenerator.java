// package com.example.csi.dummyDataGenerator;
// import java.io.OutputStream;
// import java.net.HttpURLConnection;
// import java.net.URL;
// import java.util.*;

// import com.fasterxml.jackson.databind.ObjectMapper;

// public class DummyDataGenerator {
//     private static final String BASE_URL = "https://test-deployment-iq7z.onrender.com/post/";
//     private static final ObjectMapper objectMapper = new ObjectMapper();

//     public static void main(String[] args) throws Exception {
//         postToEndpoint("HotelChain", generateHotelChain());
//         postToEndpoint("Hotel", generateHotel());
//         postToEndpoint("Room", generateRoom());
//         postToEndpoint("Guest", generateGuest());
//         postToEndpoint("Employee", generateEmployee());
//         postToEndpoint("Reservation", generateReservation());
//         postToEndpoint("Rental", generateRental());
//         postToEndpoint("Archive", generateArchive());
//     }

//     private static void postToEndpoint(String table, Map<String, Object> data) throws Exception {
//         String url = BASE_URL + table;
//         String jsonInputString = objectMapper.writeValueAsString(data);

//         HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
//         con.setRequestMethod("POST");
//         con.setRequestProperty("Content-Type", "application/json; utf-8");
//         con.setDoOutput(true);

//         try (OutputStream os = con.getOutputStream()) {
//             os.write(jsonInputString.getBytes());
//             os.flush();
//         }

//         System.out.println("POST to " + url + " -> Status: " + con.getResponseCode());
//         con.disconnect();
//     }

//     private static Map<String, Object> generateHotelChain() {
//         Map<String, Object> data = new HashMap<>();
//         data.put("central_office_address", "123 King St, Toronto");
//         data.put("num_hotels", 5);
//         data.put("contact_email", "info@chainexample.com");
//         data.put("contact_number", "123-456-7890");
//         return data;
//     }

//     private static Map<String, Object> generateHotel() {
//         Map<String, Object> data = new HashMap<>();
//         data.put("rating", 4);
//         data.put("num_rooms", 100);
//         data.put("address", "456 Queen St, Ottawa");
//         data.put("contact_email", "hotel@chainexample.com");
//         data.put("contact_number", "987-654-3210");
//         return data;
//     }

//     private static Map<String, Object> generateRoom() {
//         Map<String, Object> data = new HashMap<>();

//         data.put("price", 129.99);
//         data.put("amenities", "WiFi,TV,AC");
//         data.put("capacity", 2);
//         data.put("view", "City");
//         data.put("issues", null);
//         data.put("extendable", true);
//         return data;
//     }

//     private static Map<String, Object> generateGuest() {
//         Map<String, Object> data = new HashMap<>();
//         data.put("full_name", "Jane Doe");
//         data.put("address", "789 River Rd, Montreal");
//         data.put("sin", "123456789");
//         data.put("checkin_date", "2025-04-10");
//         return data;
//     }

//     private static Map<String, Object> generateEmployee() {
//         Map<String, Object> data = new HashMap<>();
//         data.put("full_name", "John Smith");
//         data.put("address", "1010 Maple Ave, Toronto");
//         data.put("sin", "987654321");
//         data.put("role", "Manager");
//         return data;
//     }

//     private static Map<String, Object> generateReservation() {
//         Map<String, Object> data = new HashMap<>();
//         data.put("guest_id", 1);
//         data.put("room_id", 1);
//         data.put("checkin_date", "2025-04-12");
//         data.put("checkout_date", "2025-04-15");
//         data.put("status", "Confirmed");
//         return data;
//     }

//     private static Map<String, Object> generateRental() {
//         Map<String, Object> data = new HashMap<>();
//         data.put("reservation_id", 1);
//         data.put("guest_id", 1);
//         data.put("room_id", 1);
//         data.put("checkin_date", "2025-04-12");
//         data.put("checkout_date", "2025-04-15");
//         data.put("employee_id", 1);
//         return data;
//     }

//     private static Map<String, Object> generateArchive() {
//         Map<String, Object> data = new HashMap<>();
//         data.put("reservation_id", 1);
//         data.put("rental_id", 1);
//         return data;
//     }
// }

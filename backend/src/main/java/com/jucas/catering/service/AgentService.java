package com.jucas.catering.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.jucas.catering.model.ChatRequest;
import com.jucas.catering.model.ChatResponse;
import com.jucas.catering.model.Order;
import com.jucas.catering.model.PricingRequest;
import com.jucas.catering.model.PricingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
public class AgentService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    @Value("${groq.api.url}")
    private String groqApiUrl;

    @Value("${groq.model}")
    private String groqModel;

    private final PricingDecisionService pricingService;
    private final OrderService orderService;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    private static final String SYSTEM_PROMPT = """
            You are Jucas AI, a warm, professional, intelligent catering assistant for Jucas Premium Catering Services.
            
            JUCAS MENU PACKAGES:
            - Royal Indian Feast: Rs.500/head (min 100 guests)
            - Continental Elegance: Rs.650/head (min 50 guests)
            - Chinese Fiesta: Rs.450/head (min 50 guests)
            - South Indian Delight: Rs.350/head (min 50 guests)
            - Live BBQ & Grill: Rs.750/head (min 30 guests)
            - Vegan & Wellness: Rs.550/head (min 30 guests)
            
            AVAILABLE ADD-ONS:
            - Welcome Drinks (+Rs.80/head)
            - Dessert Counter (+Rs.120/head)
            - Live Pasta Station (+Rs.100/head)
            - Mocktail Bar (+Rs.150/head)
            
            DYNAMIC PRICING & VOLUME DISCOUNT RULES (Calculated automatically by your internal tool):
            - 100 to 249 guests: 5% volume discount
            - 250 to 499 guests: 10% volume discount
            - 500+ guests: 15% VIP volume discount
            - Promo code 'JUCAS2026' or 'SATURDAY': +5% extra discount
            
            CONVERSATION FLOW:
            1) Ask customer's name
            2) Event type (Wedding, Corporate, Birthday, etc.)
            3) Event date
            4) Number of guests
            5) Preferred cuisine / package & dietary preference (Veg / Non-Veg / Mixed / Vegan)
            6) Recommend suitable menu package and highlight volume discount benefits!
            7) Offer add-ons
            8) Phone number
            9) Final confirmation
            
            When order is completely confirmed by customer, output strictly at the end:
            ORDER_CONFIRMED:{"customerName":"...","phone":"...","eventType":"...","eventDate":"...","guests":NUMBER,"cuisine":"...","dietary":"...","budgetPerHead":NUMBER,"recommendedMenu":"...","addOns":"...","totalAmount":NUMBER,"discountAmount":NUMBER,"discountReason":"..."}
            
            RULES:
            - Be polite and enthusiastic. Maximum 3 sentences per response.
            - Ask ONE question at a time.
            - Always use Rs. for pricing and 1 emoji per message.
            """;

    @Autowired
    public AgentService(PricingDecisionService pricingService, OrderService orderService) {
        this.pricingService = pricingService;
        this.orderService = orderService;
        this.objectMapper = new ObjectMapper();
        this.httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .connectTimeout(Duration.ofSeconds(15))
                .followRedirects(HttpClient.Redirect.NORMAL)
                .build();
    }

    public ChatResponse processChat(ChatRequest request) {
        try {
            // Build messages payload for Groq OpenAI-compatible endpoint
            ObjectNode payload = objectMapper.createObjectNode();
            payload.put("model", groqModel);
            payload.put("temperature", 0.7);
            payload.put("max_tokens", 500);

            ArrayNode messagesArray = payload.putArray("messages");

            // Ensure System Prompt is at the beginning
            ObjectNode sysNode = messagesArray.addObject();
            sysNode.put("role", "system");
            sysNode.put("content", SYSTEM_PROMPT);

            if (request.getMessages() != null) {
                for (ChatRequest.ChatMessage msg : request.getMessages()) {
                    if (!"system".equalsIgnoreCase(msg.getRole())) {
                        ObjectNode msgNode = messagesArray.addObject();
                        msgNode.put("role", msg.getRole());
                        msgNode.put("content", msg.getContent());
                    }
                }
            }

            // Execute HTTP Request with retry for connection stability
            String jsonPayload = objectMapper.writeValueAsString(payload);
            HttpResponse<String> httpResponse = null;
            Exception lastException = null;

            for (int attempt = 1; attempt <= 3; attempt++) {
                try {
                    HttpRequest httpRequest = HttpRequest.newBuilder()
                            .uri(URI.create(groqApiUrl))
                            .version(HttpClient.Version.HTTP_1_1)
                            .header("Content-Type", "application/json")
                            .header("Accept", "application/json")
                            .header("User-Agent", "JucasCatering-AI/1.0 (Java)")
                            .header("Authorization", "Bearer " + groqApiKey)
                            .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                            .timeout(Duration.ofSeconds(30))
                            .build();

                    httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
                    if (httpResponse.statusCode() == 200) {
                        break;
                    }
                } catch (Exception ex) {
                    lastException = ex;
                    Thread.sleep(500); // Small backoff before retry
                }
            }

            if (httpResponse == null) {
                throw (lastException != null) ? lastException : new RuntimeException("Failed to connect to Groq API");
            }

            if (httpResponse.statusCode() != 200) {
                return new ChatResponse("😕 Groq API error (" + httpResponse.statusCode() + "): " + httpResponse.body());
            }

            JsonNode root = objectMapper.readTree(httpResponse.body());
            String rawReply = root.path("choices").path(0).path("message").path("content").asText("");

            // Clean out reasoning / thinking tags if present
            rawReply = rawReply.replaceAll("(?i)<think>[\\s\\S]*?</think>", "").trim();

            ChatResponse chatResponse = new ChatResponse();
            chatResponse.setReply(rawReply);

            // Check if AI Agent confirmed an order
            if (rawReply.contains("ORDER_CONFIRMED:")) {
                int idx = rawReply.indexOf("ORDER_CONFIRMED:");
                String cleanReply = rawReply.substring(0, idx).trim();
                String orderJson = rawReply.substring(idx + "ORDER_CONFIRMED:".length()).trim();

                int startBrace = orderJson.indexOf('{');
                int endBrace = orderJson.lastIndexOf('}');
                if (startBrace >= 0 && endBrace > startBrace) {
                    String jsonPart = orderJson.substring(startBrace, endBrace + 1);
                    JsonNode orderNode = objectMapper.readTree(jsonPart);

                    Order newOrder = new Order();
                    newOrder.setCustomerName(orderNode.path("customerName").asText("Customer"));
                    newOrder.setPhone(orderNode.path("phone").asText(""));
                    newOrder.setEventType(orderNode.path("eventType").asText(""));
                    newOrder.setEventDate(orderNode.path("eventDate").asText(""));
                    newOrder.setGuests(orderNode.path("guests").asInt(100));
                    newOrder.setCuisine(orderNode.path("cuisine").asText(""));
                    newOrder.setDietary(orderNode.path("dietary").asText(""));
                    newOrder.setBudgetPerHead(orderNode.path("budgetPerHead").asDouble(500.0));
                    newOrder.setRecommendedMenu(orderNode.path("recommendedMenu").asText(""));
                    newOrder.setAddOns(orderNode.path("addOns").asText("None"));
                    newOrder.setTotalAmount(orderNode.path("totalAmount").asDouble(0.0));
                    newOrder.setDiscountAmount(orderNode.path("discountAmount").asDouble(0.0));
                    newOrder.setDiscountReason(orderNode.path("discountReason").asText(""));

                    // Save to H2 Database
                    Order saved = orderService.createOrder(newOrder);

                    chatResponse.setReply(cleanReply.isEmpty() ? "Your order has been confirmed and saved to our database! 🎉" : cleanReply);
                    chatResponse.setToolUsed(true);
                    chatResponse.setToolName("create_order_database");
                    chatResponse.setConfirmedOrder(saved);
                }
            }

            return chatResponse;

        } catch (Exception e) {
            e.printStackTrace();
            return new ChatResponse("Error processing AI Agent response: " + e.getMessage());
        }
    }
}

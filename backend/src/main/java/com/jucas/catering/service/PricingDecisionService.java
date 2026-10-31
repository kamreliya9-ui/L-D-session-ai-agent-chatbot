package com.jucas.catering.service;

import com.jucas.catering.model.PricingRequest;
import com.jucas.catering.model.PricingResponse;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PricingDecisionService {

    // Standard Menu Rates
    private static final Map<String, Double> MENU_RATES = new LinkedHashMap<>();
    // Add-On Rates
    private static final Map<String, Double> ADDON_RATES = new LinkedHashMap<>();

    static {
        MENU_RATES.put("Royal Indian Feast", 500.0);
        MENU_RATES.put("Indian", 500.0);
        MENU_RATES.put("Continental Elegance", 650.0);
        MENU_RATES.put("Continental", 650.0);
        MENU_RATES.put("Chinese Fiesta", 450.0);
        MENU_RATES.put("Chinese", 450.0);
        MENU_RATES.put("South Indian Delight", 350.0);
        MENU_RATES.put("South Indian", 350.0);
        MENU_RATES.put("Live BBQ & Grill", 750.0);
        MENU_RATES.put("BBQ", 750.0);
        MENU_RATES.put("Vegan & Wellness", 550.0);
        MENU_RATES.put("Vegan", 550.0);

        ADDON_RATES.put("Welcome Drinks", 80.0);
        ADDON_RATES.put("Dessert Counter", 120.0);
        ADDON_RATES.put("Live Pasta", 100.0);
        ADDON_RATES.put("Mocktail Bar", 150.0);
    }

    /**
     * Decision-Making Engine for Dynamic Pricing & Discounts
     */
    public PricingResponse calculatePricing(PricingRequest request) {
        PricingResponse response = new PricingResponse();

        String menuKey = request.getMenuName() != null ? request.getMenuName().trim() : "Royal Indian Feast";
        double baseRate = findBaseRate(menuKey);
        int guests = (request.getGuests() != null && request.getGuests() > 0) ? request.getGuests() : 100;

        // Calculate Add-ons
        double addOnsRate = 0.0;
        List<String> appliedAddons = request.getAddOns() != null ? request.getAddOns() : Collections.emptyList();
        for (String addon : appliedAddons) {
            addOnsRate += findAddonRate(addon);
        }

        double grossPerHead = baseRate + addOnsRate;
        double subtotal = grossPerHead * guests;

        // Dynamic Decision Rules for Discounts
        List<String> appliedDiscounts = new ArrayList<>();
        double totalDiscountPercent = 0.0;

        // Rule 1: Volume-Based Tiered Discount
        if (guests >= 500) {
            totalDiscountPercent += 15.0;
            appliedDiscounts.add("Mega Event VIP Discount: 15% off (500+ guests)");
        } else if (guests >= 250) {
            totalDiscountPercent += 10.0;
            appliedDiscounts.add("Grand Gathering Volume Discount: 10% off (250+ guests)");
        } else if (guests >= 100) {
            totalDiscountPercent += 5.0;
            appliedDiscounts.add("Celebration Volume Discount: 5% off (100+ guests)");
        }

        // Rule 2: Promotional / Early-Bird Code
        String promo = request.getPromoCode() != null ? request.getPromoCode().trim().toUpperCase() : "";
        if ("JUCAS2026".equals(promo) || "SATURDAY".equals(promo) || "DIVYANG".equals(promo)) {
            totalDiscountPercent += 5.0;
            appliedDiscounts.add("Promotional Voucher '" + promo + "': +5% additional discount");
        }

        // Calculate Discount Amount
        double discountAmount = Math.round((subtotal * (totalDiscountPercent / 100.0)) * 100.0) / 100.0;
        double finalTotal = subtotal - discountAmount;
        double effectivePerHead = Math.round((finalTotal / guests) * 100.0) / 100.0;

        response.setMenuName(menuKey);
        response.setGuests(guests);
        response.setBasePricePerHead(baseRate);
        response.setAddOnsPricePerHead(addOnsRate);
        response.setGrossPerHead(grossPerHead);
        response.setSubtotal(subtotal);
        response.setDiscountPercentage(totalDiscountPercent);
        response.setDiscountAmount(discountAmount);
        response.setDiscountReason(String.join(" | ", appliedDiscounts));
        response.setFinalTotal(finalTotal);
        response.setEffectivePricePerHead(effectivePerHead);
        response.setAppliedDiscounts(appliedDiscounts);

        return response;
    }

    private double findBaseRate(String name) {
        for (Map.Entry<String, Double> entry : MENU_RATES.entrySet()) {
            if (name.toLowerCase().contains(entry.getKey().toLowerCase())) {
                return entry.getValue();
            }
        }
        return 500.0; // Default Royal Indian Feast
    }

    private double findAddonRate(String name) {
        for (Map.Entry<String, Double> entry : ADDON_RATES.entrySet()) {
            if (name.toLowerCase().contains(entry.getKey().toLowerCase())) {
                return entry.getValue();
            }
        }
        return 0.0;
    }
}

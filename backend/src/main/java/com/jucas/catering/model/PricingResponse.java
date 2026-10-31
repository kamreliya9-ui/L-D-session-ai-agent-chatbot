package com.jucas.catering.model;

import java.util.List;

public class PricingResponse {
    private String menuName;
    private int guests;
    private double basePricePerHead;
    private double addOnsPricePerHead;
    private double grossPerHead;
    private double subtotal;
    private double discountPercentage;
    private double discountAmount;
    private String discountReason;
    private double finalTotal;
    private double effectivePricePerHead;
    private List<String> appliedDiscounts;

    public PricingResponse() {
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public int getGuests() {
        return guests;
    }

    public void setGuests(int guests) {
        this.guests = guests;
    }

    public double getBasePricePerHead() {
        return basePricePerHead;
    }

    public void setBasePricePerHead(double basePricePerHead) {
        this.basePricePerHead = basePricePerHead;
    }

    public double getAddOnsPricePerHead() {
        return addOnsPricePerHead;
    }

    public void setAddOnsPricePerHead(double addOnsPricePerHead) {
        this.addOnsPricePerHead = addOnsPricePerHead;
    }

    public double getGrossPerHead() {
        return grossPerHead;
    }

    public void setGrossPerHead(double grossPerHead) {
        this.grossPerHead = grossPerHead;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public String getDiscountReason() {
        return discountReason;
    }

    public void setDiscountReason(String discountReason) {
        this.discountReason = discountReason;
    }

    public double getFinalTotal() {
        return finalTotal;
    }

    public void setFinalTotal(double finalTotal) {
        this.finalTotal = finalTotal;
    }

    public double getEffectivePricePerHead() {
        return effectivePricePerHead;
    }

    public void setEffectivePricePerHead(double effectivePricePerHead) {
        this.effectivePricePerHead = effectivePricePerHead;
    }

    public List<String> getAppliedDiscounts() {
        return appliedDiscounts;
    }

    public void setAppliedDiscounts(List<String> appliedDiscounts) {
        this.appliedDiscounts = appliedDiscounts;
    }
}

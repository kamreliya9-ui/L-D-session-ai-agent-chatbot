package com.jucas.catering.model;

import java.util.List;

public class PricingRequest {
    private String menuName;
    private Integer guests;
    private List<String> addOns;
    private String promoCode;

    public PricingRequest() {
    }

    public PricingRequest(String menuName, Integer guests, List<String> addOns, String promoCode) {
        this.menuName = menuName;
        this.guests = guests;
        this.addOns = addOns;
        this.promoCode = promoCode;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public Integer getGuests() {
        return guests;
    }

    public void setGuests(Integer guests) {
        this.guests = guests;
    }

    public List<String> getAddOns() {
        return addOns;
    }

    public void setAddOns(List<String> addOns) {
        this.addOns = addOns;
    }

    public String getPromoCode() {
        return promoCode;
    }

    public void setPromoCode(String promoCode) {
        this.promoCode = promoCode;
    }
}

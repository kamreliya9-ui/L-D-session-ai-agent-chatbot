package com.jucas.catering.controller;

import com.jucas.catering.model.PricingRequest;
import com.jucas.catering.model.PricingResponse;
import com.jucas.catering.service.PricingDecisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pricing")
public class PricingController {

    private final PricingDecisionService pricingService;

    @Autowired
    public PricingController(PricingDecisionService pricingService) {
        this.pricingService = pricingService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<PricingResponse> calculatePricing(@RequestBody PricingRequest request) {
        PricingResponse response = pricingService.calculatePricing(request);
        return ResponseEntity.ok(response);
    }
}

package com.jucas.catering.service;

import com.jucas.catering.model.Order;
import com.jucas.catering.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Order> getOrderByCode(String orderCode) {
        return orderRepository.findByOrderCode(orderCode);
    }

    public Order createOrder(Order order) {
        if (order.getOrderCode() == null || order.getOrderCode().isBlank()) {
            long count = orderRepository.count();
            String code = String.format("JUC-%04d", count + 1);
            order.setOrderCode(code);
        }
        if (order.getStatus() == null) {
            order.setStatus("confirmed");
        }
        return orderRepository.save(order);
    }

    public Map<String, Object> getAnalyticsSummary() {
        Map<String, Object> stats = new HashMap<>();
        long totalOrders = orderRepository.countTotalOrders();
        Double totalRevenue = orderRepository.sumTotalRevenue();
        Long totalGuests = orderRepository.sumTotalGuests();

        stats.put("totalOrders", totalOrders);
        stats.put("totalRevenue", totalRevenue != null ? totalRevenue : 0.0);
        stats.put("totalGuests", totalGuests != null ? totalGuests : 0L);

        return stats;
    }
}

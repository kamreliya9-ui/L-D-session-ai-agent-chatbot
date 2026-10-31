package com.jucas.catering.repository;

import com.jucas.catering.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderCode(String orderCode);

    List<Order> findAllByOrderByCreatedAtDesc();

    @Query("SELECT COUNT(o) FROM Order o")
    long countTotalOrders();

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0.0) FROM Order o")
    Double sumTotalRevenue();

    @Query("SELECT COALESCE(SUM(o.guests), 0) FROM Order o")
    Long sumTotalGuests();
}

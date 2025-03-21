package com.wirpo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wirpo.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

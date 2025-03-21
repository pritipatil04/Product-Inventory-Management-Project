package com.wirpo.repo;

import com.wirpo.domain.Product;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    @DisplayName("Save Product Test")
    void saveProduct() {
        Product product = new Product(null, "Laptop", "High-end gaming laptop", "Dell", 75000, 10);
        Product savedProduct = productRepository.save(product);

        assertNotNull(savedProduct.getId());
        assertEquals("Laptop", savedProduct.getName());
    }

    

    @Test
    @DisplayName("Find All Products Test")
    void findAllProducts() {
        productRepository.save(new Product(null, "TV", "Smart TV", "Sony", 50000, 15));
        productRepository.save(new Product(null, "Washing Machine", "Automatic", "LG", 30000, 5));

        List<Product> products = productRepository.findAll();
        assertEquals(2, products.size());
    }

    @Test
    @DisplayName("Delete Product Test")
    void deleteProduct() {
        Product product = new Product(null, "Headphones", "Wireless", "JBL", 3000, 25);
        Product savedProduct = productRepository.save(product);

        productRepository.deleteById(savedProduct.getId());
        Optional<Product> deletedProduct = productRepository.findById(savedProduct.getId());

        assertFalse(deletedProduct.isPresent());
    }
}

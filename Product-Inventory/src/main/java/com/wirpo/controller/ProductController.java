package com.wirpo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.wirpo.domain.Product;
import com.wirpo.repo.ProductRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    // Public: View all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Public: View product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // Protected: Add a product (requires authentication)
    @PostMapping
    public Product addProduct(@RequestBody Product product, Authentication authentication) {
        return productRepository.save(product);
    }

    // Protected: Update a product (requires authentication)
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct, Authentication authentication) {
        updatedProduct.setId(id);
        return productRepository.save(updatedProduct);
    }

    // Protected: Delete a product (requires authentication)
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteProduct(@PathVariable Long id, Authentication authentication) {
        try {
            productRepository.deleteById(id); // Delete the product
            Map<String, String> response = new HashMap<>();
            response.put("message", "Product deleted successfully!"); // Send a success message in the response
            return ResponseEntity.ok(response); // Return 200 OK with the response body
        } catch (Exception e) {
            // Handle any error and send a failure message
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error deleting product.");
            return ResponseEntity.status(500).body(errorResponse); // Return 500 Internal Server Error
        }
    }
}

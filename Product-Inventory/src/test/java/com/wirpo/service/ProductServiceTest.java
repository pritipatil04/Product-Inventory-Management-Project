package com.wirpo.service;

import com.wirpo.domain.Product;
import com.wirpo.repo.ProductRepository;

import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Add Product Test")
    void addProduct() {
        Product product = new Product(null, "Tablet", "Latest model", "Apple", 60000, 12);
        when(productRepository.save(product)).thenReturn(product);

        Product savedProduct = productService.addProduct(product);

        assertNotNull(savedProduct);
        assertEquals("Tablet", savedProduct.getName());
    }

  

    @Test
    @DisplayName("Get All Products Test")
    void getAllProducts() {
        when(productRepository.findAll()).thenReturn(Arrays.asList(
                new Product(1L, "AC", "Split AC", "Voltas", 40000, 5),
                new Product(2L, "Microwave", "Convection", "Samsung", 15000, 10)
        ));

        assertEquals(2, productService.getAllProducts().size());
    }

    @Test
    @DisplayName("Delete Product Test")
    void deleteProduct() {
        doNothing().when(productRepository).deleteById(1L);
        assertDoesNotThrow(() -> productService.deleteProduct(1L));
        verify(productRepository, times(1)).deleteById(1L);
    }
}

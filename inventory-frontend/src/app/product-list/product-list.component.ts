import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = []; // To store filtered products based on search
  searchTerm: string = '';
  

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts(); // Load products when the page loads
  }
  

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        console.log('Products fetched:', data); // Log the fetched products
        this.products = data;  // Update the product list
        this.filteredProducts = data;  // Initialize filteredProducts to show all products initially
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }

  onSearchChange() {
    if (this.searchTerm.trim() === '') {
      this.filteredProducts = this.products;  // Show all products if search is empty
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || // Filter by product name
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filter by product description
      );
    }
  }


  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe(
      () => {
        this.loadProducts(); // Refresh the product list after adding a product
      },
      (error) => {
        console.error("Error adding product:", error);
      }
    );
  }

  viewProduct(id?: number) {
    if (id !== undefined) {
      this.router.navigate(['/product', id]); // Navigate to the product details page
    } else {
      console.error("Invalid product ID for viewing.");
    }
  }

  editProduct(id?: number) {
    if (id !== undefined) {
      this.router.navigate(['/edit-product', id]); // Navigate to the edit page
    } else {
      console.error("Invalid product ID for editing.");
    }
  }

  deleteProduct(id?: number) {
    if (id !== undefined && confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        (response) => {
          console.log('Product deleted response:', response); // Log the response for debugging
          alert('Product deleted successfully');
          this.loadProducts(); // Reload product list after deletion
        },
        (error) => {
          console.error("Error deleting product:", error);
          alert('There was an error deleting the product.'); // Show the error message
        }
      );
    } else {
      console.error("Invalid product ID for deletion.");
    }
  }
}  
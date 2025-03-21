import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';  // Import the interface

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: number = 0;  // Initialize productId to 0 or another default value
  product: Product = {
    name: '',               // Initialize product name as empty
    description: '',        // Initialize description as empty
    manufacturer: '',       // Initialize manufacturer as empty
    price: 0,               // Initialize price to 0
    quantity: 0,    
             // Initialize quantity to 0
  };  // Initialize product object with default values

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // If editing an existing product, get its data
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((data: Product) => {
        this.product = data;  // Set the product data
      });
    }
  }

  onSubmit(): void {
    if (this.productId) {
      // Update the existing product
      this.productService.updateProduct(this.productId, this.product).subscribe(() => {
        this.router.navigate(['/products']);  // Redirect to product list after update
      });
    } else {
      // Add new product
      this.productService.addProduct(this.product).subscribe(() => {
        this.router.navigate(['/inventory']);  // Redirect to product list after adding
      });
    }
  }
}

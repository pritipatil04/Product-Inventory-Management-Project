import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    name: '',
    description: '',
    manufacturer: '',
    price: 0,
    quantity: 0
    
  };
  constructor(public router: Router, private productService: ProductService) {}  

  addProduct() {
    if (!this.product.name || !this.product.description || !this.product.manufacturer || this.product.price <= 0 || this.product.quantity <= 0) {
      alert("Please fill out all fields correctly.");
      return;
    }
  
    console.log("📢 Attempting to add product:", this.product);
  
    this.productService.addProduct(this.product).subscribe({
      next: (response) => {
        console.log('✅ Product added successfully:', response);
        alert('Product added successfully!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('❌ Error adding product:', err);
        alert('Failed to add product. Please check the console for details.');
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';  // Import your service to fetch product details

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productId!: number;
  product: any; // To store the fetched product data
  loading: boolean = true; // To show loading state
  error: string = ''; // To store any error message

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Retrieve the product ID from the route parameters
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    // Fetch the product details using the product service
    this.productService.getProductById(this.productId).subscribe(
      (data) => {
        this.product = data;  // Assign the fetched product data
        this.loading = false;  // Set loading to false once data is fetched
      },
      (error) => {
        console.error('Error fetching product details:', error);
        this.error = 'Error fetching product details';
        this.loading = false;
      }
    );
  }
}

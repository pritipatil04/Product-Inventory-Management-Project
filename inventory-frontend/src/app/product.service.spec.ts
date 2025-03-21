import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from './product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no outstanding requests remain
  });

  it('should retrieve all products from the API via GET', () => {
    const dummyProducts: Product[] = [
      { id: 1, name: 'Laptop', description: 'Gaming Laptop', manufacturer: 'Dell', price: 75000, quantity: 10 },
      { id: 2, name: 'Mobile', description: 'Latest Model', manufacturer: 'Samsung', price: 50000, quantity: 15 }
    ];

    service.getAllProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should add a new product via POST', () => {
    const newProduct: Product = {
      id: 3,
      name: 'Tablet',
      description: 'Android Tablet',
      manufacturer: 'Apple',
      price: 40000,
      quantity: 5
      
    };

    service.addProduct(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should delete a product via DELETE', () => {
    const productId = 1;

    service.deleteProduct(productId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});

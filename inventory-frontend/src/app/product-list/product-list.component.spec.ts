import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../product.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getAllProducts', 'deleteProduct']);

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ProductService, useValue: mockProductService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should load products on init', () => {
    const dummyProducts: Product[] = [
      { id: 1, name: 'Laptop', description: 'Gaming Laptop', manufacturer: 'Dell', price: 75000, quantity: 10 },
      { id: 2, name: 'Smartphone', description: 'Latest Model', manufacturer: 'Samsung', price: 50000, quantity: 15 }
    ];
    
    mockProductService.getAllProducts.and.returnValue(of(dummyProducts));
    component.ngOnInit();

    expect(component.products.length).toBe(2);
    expect(component.products).toEqual(dummyProducts);
  });

  it('should delete a product', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Simulate user clicking "OK"
    
    mockProductService.deleteProduct.and.returnValue(of({}));
    component.deleteProduct(1);

    expect(mockProductService.deleteProduct).toHaveBeenCalledWith(1);
  });

  it('should filter products by search term', () => {
    component.products = [
      { id: 1, name: 'Laptop', description: 'Gaming Laptop', manufacturer: 'Dell', price: 75000, quantity: 10 },
      { id: 2, name: 'Mobile', description: 'Latest Model', manufacturer: 'Samsung', price: 50000, quantity: 15}
    ];
    
    component.searchTerm = 'Laptop';
    component.onSearchChange();

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Laptop');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorProductDetailComponent } from './vendor-product-detail.component';

describe('VendorProductDetailComponent', () => {
  let component: VendorProductDetailComponent;
  let fixture: ComponentFixture<VendorProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorProductDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

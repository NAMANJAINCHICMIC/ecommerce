import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddItemComponent } from './vendor-add-item.component';

describe('VendorAddItemComponent', () => {
  let component: VendorAddItemComponent;
  let fixture: ComponentFixture<VendorAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAddItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

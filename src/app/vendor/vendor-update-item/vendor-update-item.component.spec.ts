import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpdateItemComponent } from './vendor-update-item.component';

describe('VendorUpdateItemComponent', () => {
  let component: VendorUpdateItemComponent;
  let fixture: ComponentFixture<VendorUpdateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorUpdateItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorUpdateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

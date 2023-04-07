import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpdateProfileComponent } from './vendor-update-profile.component';

describe('VendorUpdateProfileComponent', () => {
  let component: VendorUpdateProfileComponent;
  let fixture: ComponentFixture<VendorUpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorUpdateProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorViewProfileComponent } from './vendor-view-profile.component';

describe('VendorViewProfileComponent', () => {
  let component: VendorViewProfileComponent;
  let fixture: ComponentFixture<VendorViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorViewProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewProfileComponent } from './customer-view-profile.component';

describe('CustomerViewProfileComponent', () => {
  let component: CustomerViewProfileComponent;
  let fixture: ComponentFixture<CustomerViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerViewProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

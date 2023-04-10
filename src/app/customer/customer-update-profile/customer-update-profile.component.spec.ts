import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdateProfileComponent } from './customer-update-profile.component';

describe('CustomerUpdateProfileComponent', () => {
  let component: CustomerUpdateProfileComponent;
  let fixture: ComponentFixture<CustomerUpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerUpdateProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

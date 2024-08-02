import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCouponComponent } from './generate-coupon.component';

describe('GenerateCouponComponent', () => {
  let component: GenerateCouponComponent;
  let fixture: ComponentFixture<GenerateCouponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateCouponComponent]
    });
    fixture = TestBed.createComponent(GenerateCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInfoComponent } from './send-info.component';

describe('SendInfoComponent', () => {
  let component: SendInfoComponent;
  let fixture: ComponentFixture<SendInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendInfoComponent]
    });
    fixture = TestBed.createComponent(SendInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

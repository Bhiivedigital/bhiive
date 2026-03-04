import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerdetailsComponent } from './careerdetails.component';

describe('CareerdetailsComponent', () => {
  let component: CareerdetailsComponent;
  let fixture: ComponentFixture<CareerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricvacypolicyComponent } from './pricvacypolicy.component';

describe('PricvacypolicyComponent', () => {
  let component: PricvacypolicyComponent;
  let fixture: ComponentFixture<PricvacypolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricvacypolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricvacypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

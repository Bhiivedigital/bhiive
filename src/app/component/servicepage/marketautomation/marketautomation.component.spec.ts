import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketautomationComponent } from './marketautomation.component';

describe('MarketautomationComponent', () => {
  let component: MarketautomationComponent;
  let fixture: ComponentFixture<MarketautomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketautomationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketautomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

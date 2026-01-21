import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileservicesidebarComponent } from './mobileservicesidebar.component';

describe('MobileservicesidebarComponent', () => {
  let component: MobileservicesidebarComponent;
  let fixture: ComponentFixture<MobileservicesidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileservicesidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileservicesidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

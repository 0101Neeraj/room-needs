import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentAlerts } from './rent-alerts';

describe('RentAlerts', () => {
  let component: RentAlerts;
  let fixture: ComponentFixture<RentAlerts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentAlerts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentAlerts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

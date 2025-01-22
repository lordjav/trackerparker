import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveParkingComponent } from './active-parking.component';

describe('ActiveParkingComponent', () => {
  let component: ActiveParkingComponent;
  let fixture: ComponentFixture<ActiveParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveParkingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

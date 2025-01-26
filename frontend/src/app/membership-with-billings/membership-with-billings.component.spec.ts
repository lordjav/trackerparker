import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipWithBillingsComponent } from './membership-with-billings.component';

describe('MembershipWithBillingsComponent', () => {
  let component: MembershipWithBillingsComponent;
  let fixture: ComponentFixture<MembershipWithBillingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipWithBillingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipWithBillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

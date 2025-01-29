import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Membership } from '../model/membership';
import { MembershipBill } from '../model/membership-bill';
import { MembershipService } from '../service/membership.service';
import { catchError } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddBillingComponent } from '../add-billing/add-billing.component';

@Component({
  selector: 'app-membership-with-billings',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    DatePipe,
    MatTableModule,
],
  providers: [DialogComponent, MatDialog],
  templateUrl: './membership-with-billings.component.html',
  styleUrl: './membership-with-billings.component.css'
})
export class MembershipWithBillingsComponent {
  @Input({transform: (value: string) => Number(value)}) id!: number;

  membership: Membership | undefined;

  membershipBillings: Array<MembershipBill> = [];

  displayedColumns: string[] = ['id', 'billedBy', 'billingDate', 'comment'];

  dialog = inject(DialogComponent);
  addBillingDialog = inject(MatDialog);
  
  constructor(private membershipService: MembershipService) {}

  ngOnInit() {
    this.getMembershipWithBillings();
  }

  getMembershipWithBillings() {
    this.membershipService.getMembershipWithBillingsById(this.id).pipe(
      catchError((err, caught) => {
        this.dialog.openDialog(
          "Error",
          `Hubo un error: ${err.error}`,
          "OK",
          30000
        );
        console.error(err);
        return caught;
      }
    )).subscribe(response => {
      this.membership = response.membership;      
      this.membershipBillings = response.membershipBillings;
    });
  }

  addBilling() {
      const dialogRef = this.addBillingDialog.open(AddBillingComponent, {
        data: {id: this.id}
      });
  }
}

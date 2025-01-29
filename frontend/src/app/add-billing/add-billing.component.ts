import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembershipService } from '../service/membership.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-billing',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogClose,
    MatInputModule,
  ],
  templateUrl: './add-billing.component.html',
  styleUrl: './add-billing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBillingComponent {

  data = inject(MAT_DIALOG_DATA);

  addBillingForm = new FormGroup({
    billedBy: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
    membershipId: new FormControl(this.data.id)
  })

  private snackBar = inject(MatSnackBar);

  readonly dialogRef = inject(MatDialogRef<AddBillingComponent>);  
  
  constructor(
    private membershipService: MembershipService,
    private router: Router
  ) {}

  saveBilling() {
    this.membershipService.saveBilling(this.addBillingForm.value)
      .pipe(
        catchError((err, caught) => {
          this.snackBar.open(
            `Hubo un error: ${err.error}`,
            "OK",
            {duration: 30000}
          ); 
            console.error(err);
            return caught;
        })
      ).subscribe(response => {
        this.dialogRef.close();
        this.snackBar.open(
          `Nuevo registro de pago con código ${response.id} agregado.`,
          "OK",
          {duration: 30000}
        );
      })
  };
}

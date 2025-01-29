import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MembershipService } from '../service/membership.service';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-membership',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogClose,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './add-membership.component.html',
  styleUrl: './add-membership.component.css'
})
export class AddMembershipComponent {

  addMembershipForm = new FormGroup({
    client: new FormControl('', [Validators.required]),
    clientId: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)
    ]),
    clientPhone: new FormControl('', [Validators.maxLength(16)]),
    clientEmail: new FormControl('', [Validators.email]),
    vehicleType: new FormControl('', [Validators.required]),
    plate: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)
    ]),
    periodicity: new FormControl('', [Validators.required]),
  });

  private snackBar = inject(MatSnackBar);

  readonly dialogRef = inject(MatDialogRef<AddMembershipComponent>);

  constructor(private membershipService: MembershipService) {}

  saveMembership() {
    if (this.addMembershipForm.value) {
      this.membershipService.saveNewMembership(this.addMembershipForm.value)
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
            `Nuevo vehículo ${response.plate} de ${response.client} agregado.`, 
            "OK", 
            {duration: 30000}
          );
        })
    };
  }
}

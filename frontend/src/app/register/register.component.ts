import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParkingService } from '../service/parking.service';
import { MatButtonModule } from '@angular/material/button';
import { catchError } from 'rxjs';
import { Parking } from '../model/interface/parking.type';
import { DatePipe } from '@angular/common';
import { ElapsedTimePipe } from '../pipes/elapsed-time.pipe';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatButtonModule,
    DatePipe,
    ElapsedTimePipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  
  parkingSearchForm = new FormGroup({
    plate: new FormControl('', [
      Validators.required, 
      Validators.maxLength(6), 
      Validators.minLength(6)]
    ),
    chargedBy: new FormControl('Javier')
  });
  
  existingParking: Parking | null = null;
  
  timeInParking: number | null = null;
  
  constructor(private snackBar: MatSnackBar, 
    private parkingService: ParkingService) {}
    
  processParking() {
    this.parkingService.fetchParking(this.parkingSearchForm.value)
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
        const parkingRes = response.body;
        const parkingResStatus = response.status;
        if (parkingResStatus === 201) {
          this.snackBar.open(
            `Vehículo ${parkingRes!.plate} ingresado exitosamente`, 
            "OK", 
            {duration: 30000}
          );
        }
        else if (parkingResStatus === 200) {
          this.existingParking = parkingRes;
          let now = new Date();
          this.timeInParking = (now.getTime() - new Date(parkingRes!.entryTime).getTime());
          this.parkingSearchForm.get('plate')?.setValue('');
        }
      });
  }

  invoiceParking() {
    if (this.existingParking) {
      this.parkingService.invoiceParking(this.existingParking)
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
        const parkingRes = response.body;
        const parkingResStatus = response.status;
        if (parkingResStatus === 202) {
          this.snackBar.open(
            `Vehículo ${parkingRes!.plate} facturado exitosamente en $${parkingRes!.charge} pesos`, 
            "OK", 
            {duration: 30000}
          );
          this.existingParking = null;
          this.timeInParking = null;
        }
      });
    }
  }
}


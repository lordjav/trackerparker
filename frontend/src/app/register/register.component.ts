import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ParkingService } from '../service/parking.service';
import { MatButtonModule } from '@angular/material/button';
import { catchError } from 'rxjs';
import { Parking } from '../model/parking.type';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ElapsedTimePipe } from '../pipes/elapsed-time.pipe';
import { DialogComponent } from '../dialog/dialog.component';

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
    CurrencyPipe,
    ElapsedTimePipe
  ],
  providers: [DialogComponent],
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

  currentInvoice: number | null = null;

  dialog = inject(DialogComponent);

  constructor(private parkingService: ParkingService) {}
    
  processParking() {
    this.parkingService.fetchParking(this.parkingSearchForm.value)
      .pipe(
        catchError((err, caught) => {
          this.dialog.openDialog(
          "Error",
          `Hubo un error: ${err.error}`,
          "OK",
          30000
          ); 
          console.error(err);
          return caught;
        })        
    ).subscribe(response => {
        const parkingRes = response.body;
        const parkingResStatus = response.status;
        if (parkingResStatus === 201) {
          this.dialog.openDialog(
            "Ingreso exitoso", 
            `Vehículo ${parkingRes!.plate} ingresado exitosamente`,
            "OK",
            30000
          );
        }
        else if (parkingResStatus === 200) {
          this.existingParking = parkingRes;
          let now = new Date();
          this.timeInParking = (now.getTime() - new Date(parkingRes!.entryTime).getTime());
          this.currentInvoice = this.timeInParking / 60000;
          this.parkingSearchForm.get('plate')?.setValue('');
        }
      });
  }

  invoiceParking() {
    if (this.existingParking) {
      this.parkingService.invoiceParking(this.existingParking)
        .pipe(
          catchError((err, caught) => {
            this.dialog.openDialog(
              "Error",
              `Hubo un error: ${err.error}`,
              "OK",
              30000
            ); 
            console.error(err);
            return caught;
          })
      ).subscribe(response => {
        const parkingRes = response.body;
        const parkingResStatus = response.status;
        if (parkingResStatus === 202) {
          this.dialog.openDialog(
            "Facturación exitosa",
            `Vehículo ${parkingRes!.plate} facturado exitosamente en $${parkingRes!.charge} pesos`, 
            "OK", 
            30000
          );
          this.existingParking = null;
          this.timeInParking = null;
        }
      });
    }
  }

  
}


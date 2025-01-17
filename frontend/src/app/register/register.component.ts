import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule, FormControl, Validators, FormGroup} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ParkingService} from '../service/parking.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  
  parkingSearchForm = new FormGroup({
    plate: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    chargedBy: new FormControl('Javier')
  });  
  constructor(private snackBar: MatSnackBar, 
    private parkingService: ParkingService) {}
  
  
  /*searchParking() {  
  } */ 
  
  createParking(){    
    this.parkingService.createNewParking(this.parkingSearchForm.value).subscribe(res => {
      this.snackBar.open(`Vehículo ${this.parkingSearchForm.get('plate')?.value} ingresado exitosamente`, "Ok");
      this.parkingSearchForm.get('plate')?.setValue('');
    }, error => {
      this.snackBar.open(`Hubo un error: ${error.error}`);
      console.error(error);
    })
  }
}

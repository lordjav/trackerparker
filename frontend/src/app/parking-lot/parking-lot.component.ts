import { Component } from '@angular/core';
import { ActiveParkingComponent } from '../active-parking/active-parking.component';
import { Parking } from '../model/interface/parking.type';
import { ParkingService } from '../service/parking.service';
import { catchError } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-parking-lot',
  imports: [
    ActiveParkingComponent,
    MatSnackBarModule,
    MatCardModule,
  ],
  templateUrl: './parking-lot.component.html',
  styles: `
    mat-card {
      display: flex; 
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between; 
      margin: 10px; 
      padding: 10px;
      }
  `
})
export class ParkingLotComponent {
  
  activeParkingList: Parking[] = [];

  constructor(
    private parkingService: ParkingService,
    private snackBar: MatSnackBar
  ) {}

  
  getActiveParking() {
    this.parkingService.getActiveParking().pipe(
      catchError((err, caught) => {
        this.snackBar.open(`Hubo un error: ${err.error}`, "Ok", {duration: 30000});
        console.error(err);
        return caught;
      })).subscribe(response => {
        this.activeParkingList = response;
      }
    )
  }

  ngOnInit() {
    this.getActiveParking();
  }
}

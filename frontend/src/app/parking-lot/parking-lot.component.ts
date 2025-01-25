import { Component, inject } from '@angular/core';
import { ActiveParkingComponent } from '../active-parking/active-parking.component';
import { Parking } from '../model/parking.type';
import { ParkingService } from '../service/parking.service';
import { catchError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-parking-lot',
  imports: [
    ActiveParkingComponent,
    MatCardModule,
  ],
  templateUrl: './parking-lot.component.html',
  styles: `
    mat-card {
      display: flex; 
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;      
      margin: 10px;
      padding: 20px;
      }
  `
})
export class ParkingLotComponent {
  
  activeParkingList: Parking[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private parkingService: ParkingService) {}

  
  getActiveParking() {
    this.parkingService.getActiveParking().pipe(
      catchError((err, caught) => {
        this.openDialog(
          "Error",
          `Hubo un error: ${err.error}`,
          "OK",
        ); 
        console.error(err);
        return caught;
      })).subscribe(response => {
        this.activeParkingList = response;
      }
    )
  }

  openDialog(dialogTitle:any, dialogContent:any, dialogButtonText:any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: dialogTitle,
        content: dialogContent,
        button: dialogButtonText
      }
    });

    setTimeout(() => {
      dialogRef.close();
    }, 30000);
  }

  ngOnInit() {
    this.getActiveParking();
  }
}

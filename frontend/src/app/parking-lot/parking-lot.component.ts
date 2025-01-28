import { Component, inject } from '@angular/core';
import { ActiveParkingComponent } from '../active-parking/active-parking.component';
import { Parking } from '../model/parking.type';
import { ParkingService } from '../service/parking.service';
import { catchError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-parking-lot',
  imports: [
    ActiveParkingComponent,
    MatCardModule,
  ],
  providers: [DialogComponent],
  templateUrl: './parking-lot.component.html',
  styleUrl: 'parking-lot.component.css'
})
export class ParkingLotComponent {
  
  activeParkingList: Parking[] = [];

  dialog = inject(DialogComponent);

  constructor(private parkingService: ParkingService) {}

  ngOnInit() {
    this.getActiveParking();
  }
  
  getActiveParking() {
    this.parkingService.getActiveParking().pipe(
      catchError((err, caught) => {
        this.dialog.openDialog(
          "Error",
          `Hubo un error: ${err.error}`,
          "OK",
          30000
        ); 
        console.error(err);
        return caught;
      })).subscribe(response => {
        this.activeParkingList = response;
      }
    )
  }
}

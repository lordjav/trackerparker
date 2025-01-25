import { Component, inject } from '@angular/core';
import { ParkingService } from '../service/parking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { Parking } from '../model/parking.type';
import { MatCardModule} from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-history',
  imports: [
    MatCardModule, 
    MatTableModule, 
    MatInputModule, 
    MatFormFieldModule, 
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './history.component.html',
  styles: `mat-card {margin: 10px; padding: 10px;}`
})
export class HistoryComponent {
  displayedColumns: string[] = [
    'id', 
    'plate', 
    'entryTime', 
    'exitTime', 
    'charge', 
    'chargedBy'
  ];
  dataSource = new MatTableDataSource();

  readonly dialog = inject(MatDialog);  
  
  constructor(
    private parkingsService: ParkingService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {    
    this.getparkings();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getparkings() {
    this.parkingsService.getAllParkings()
    .pipe(catchError((err, caught) => {
      this.openDialog(
        "Error",
        `Hubo un error: ${err.error}`,
        "OK"
      );
      console.error(err);
      return caught;
    })).subscribe(parkings => {            
      this.dataSource = new MatTableDataSource<Parking | unknown>(parkings);
    });
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
}

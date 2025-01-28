import { Component, Injectable, ViewChild } from '@angular/core';
import { ParkingService } from '../service/parking.service';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Parking } from '../model/parking.type';
import { MatCardModule} from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { HalResponse } from '../model/hal-response';

@Injectable()
export class MyCustomPaginatorIntl extends MatPaginatorIntl {

  override itemsPerPageLabel = 'Registros por página';
}

@Component({
  selector: 'app-history',
  imports: [
    MatCardModule, 
    MatTableModule, 
    MatProgressSpinnerModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatPaginatorModule,
    DatePipe,
    CurrencyPipe
  ],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
  templateUrl: './history.component.html',
  styles: `
    mat-card {margin: 10px; padding: 10px;}
    #still-parking {color: red;}
    .example-loading-shade {
      display:flex;       
      justify-content:center; 
      align-items:center;
      flex-direction: column;
    }
  `
})
export class HistoryComponent {
  displayedColumns: string[] = [
    'id', 
    'plate', 
    'entryTime', 
    'exitTime', 
    'charge', 
    'chargedBy',
    'comment'
  ];

  parkings: Parking[] = [];

  dataSource!: MatTableDataSource<Parking>;

  resultsLength = 0;
  isLoadingResults = true;

  showFirstLastButtons = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  constructor(private parkingService: ParkingService) {}

  ngAfterViewInit() {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.parkingService.getAllParkingsPageable(
          this.paginator.pageIndex,
          this.paginator.pageSize
        ).pipe(catchError(() => of(null)));
      }),
      map((response: HalResponse | null) => {
        this.isLoadingResults = false;

        if (response === null) {
          return [];
        }
        this.resultsLength = response.page.totalElements;
        return response._embedded.parkingList;
      }),
    )
    .subscribe((parkings) => {
      this.dataSource = new MatTableDataSource(parkings);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

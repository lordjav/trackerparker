import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parking } from '../model/parking.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  BASIC_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  fetchParking(data:any): Observable<HttpResponse<Parking>> {
    return this.http.post<any>(this.BASIC_URL + 'parking', data, {observe: 'response'});
  }

  getAllParkings() {
    return this.http.get<Array<Parking>>(this.BASIC_URL + 'parking');
  }

  invoiceParking(data:any): Observable<HttpResponse<Parking>> {
    return this.http.post<Parking>(this.BASIC_URL + 'parking/invoice', data, {observe: 'response'});
  }

  getActiveParking() {
    return this.http.get<Array<Parking>>(this.BASIC_URL + 'parking/active');
  }
}

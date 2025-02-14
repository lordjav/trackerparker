import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parking } from '../model/parking.type';
import { Observable } from 'rxjs';
import { HalResponse } from '../model/hal-response';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  BASIC_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  fetchParking(data:any): Observable<HttpResponse<Parking>> {
    return this.http.post<any>(this.BASIC_URL + '/parking', data, {observe: 'response'});
  }

  getAllParkingsPageable(pageNumber: number, pageSize: number): Observable<HalResponse> {
    return this.http.get<HalResponse>(`${this.BASIC_URL}/parking?page=${pageNumber}&size=${pageSize}`);
  }

  invoiceParking(parking:Parking): Observable<HttpResponse<Parking>> {
    return this.http.put<Parking>(this.BASIC_URL + '/parking/invoice', parking, {observe: 'response'});
  }

  getActiveParking() {
    return this.http.get<Array<Parking>>(this.BASIC_URL + '/parking/active');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  BASIC_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  createNewParking(data:any): Observable<any> {
    return this.http.post(this.BASIC_URL + 'parking', data);
  }
}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Membership } from '../model/interface/membership';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http: HttpClient) { }

  BASIC_URL = 'http://localhost:8080/membership';

  getAllMemberships() {
    return this.http.get<Array<Membership>>(this.BASIC_URL);
  }
}

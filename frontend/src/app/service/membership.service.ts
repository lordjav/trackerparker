import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Membership } from '../model/membership';
import { MembershipWithBillings } from '../model/membership-with-billings';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http: HttpClient) { }

  BASIC_URL = 'http://localhost:8080/membership';

  getAllMemberships() {
    return this.http.get<Array<Membership>>(this.BASIC_URL);
  }

  getMembershipWithBillingsById(membershipId: number) {
    return this.http.get<MembershipWithBillings>(this.BASIC_URL + `/${membershipId}`);
  }
}

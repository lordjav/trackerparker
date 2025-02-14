import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Membership } from '../model/membership';
import { MembershipWithBillings } from '../model/membership-with-billings';
import { MembershipBill } from '../model/membership-bill';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http: HttpClient) { }

  BASIC_URL = 'http://localhost:8080';

  getAllMemberships() {
    return this.http.get<Array<Membership>>(`${this.BASIC_URL}/membership`);
  }

  getMembershipWithBillingsById(membershipId: number) {
    return this.http.get<MembershipWithBillings>(`${this.BASIC_URL}/membership/${membershipId}`);
  }

  saveNewMembership(data: any) {
    return this.http.post<Membership>(`${this.BASIC_URL}/membership`, data)
  }

  saveBilling(data: any) {
    return this.http.post<MembershipBill>(`${this.BASIC_URL}/membership/bill`, data)
  }
}

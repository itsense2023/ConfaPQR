import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BodyResponse } from '../models/shared/body-response.inteface';
import { ILogin } from '../models/login/login.interface';
import { RoutesApp } from '../enums/routes.enum';
import { SessionStorageItems } from '../enums/session-storage-items.enum';
import { ApplicantTypeList, RequestTypeList, UserList } from '../models/users.interface';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class Users {
  constructor(private http: HttpClient) {}

  getUsersList() {
    // Set the authorization token in the headers
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    console.log(token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<UserList[]>>(
      `${environment.API_PUBLIC}${RoutesApp.USERS_LIST}`,
      { headers }
    );
  }

  inactivateUser(payload: UserList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<UserList[]>>(
      `${environment.API_PUBLIC}${RoutesApp.INACTIVATE_USER}`,
      payload,
      { headers }
    );
  }

  invisibleUser(payload: UserList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<UserList[]>>(
      `${environment.API_PUBLIC}${RoutesApp.INVISIBLE_USER}`,
      payload,
      { headers }
    );
  }

  getApplicantTypesList() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<ApplicantTypeList[]>>(
      `${environment.API_PUBLIC}${RoutesApp.APPLICANT_TYPE_LIST}`,
      { headers }
    );
  }

  //INACTIVATE_APPLICANT
  inactivateApplicant(payload: ApplicantTypeList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<ApplicantTypeList[]>>(
      `${environment.API_PUBLIC}${RoutesApp.INACTIVATE_APPLICANT}`,
      payload,
      { headers }
    );
  }

  getRequestTypesList() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<RequestTypeList[]>>(
      `${environment.API_PUBLIC}${RoutesApp.REQUEST_TYPE_LIST}`,
      { headers }
    );
  }
  inactivateRequest(payload: RequestTypeList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<RequestTypeList[]>>(
      `${environment.API_PUBLIC}${RoutesApp.INACTIVATE_REQUEST}`,
      payload,
      { headers }
    );
  }
}

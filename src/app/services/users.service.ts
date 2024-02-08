import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BodyResponse } from '../models/shared/body-response.inteface';
import { ILogin } from '../models/login/login.interface';
import { RoutesApp } from '../enums/routes.enum';
import { SessionStorageItems } from '../enums/session-storage-items.enum';
import {
  ApplicantTypeList,
  AssociateApplicantRequest,
  AssociationApplicantRequestList,
  CreateApplicantType,
  CreateRequestType,
  RequestTypeList,
  UserCreate,
  UserList,
} from '../models/users.interface';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class Users {
  constructor(private http: HttpClient) {}

  getUsersList() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<UserList[]>>(
      `${environment.API_PUBLIC}${RoutesApp.USERS_LIST}`,
      { headers }
    );
  }
  createUser(payload: UserCreate) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${RoutesApp.CREATE_USER}`,
      payload,
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
  createApplicantType(payload: CreateApplicantType) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${RoutesApp.CREATE_APPLICANT_TYPE}`,
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
  createRequestType(payload: CreateRequestType) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${RoutesApp.CREATE_REQUEST_TYPE}`,
      payload,
      { headers }
    );
  }
  getApplicantTypeRequestsAssociation() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<AssociationApplicantRequestList[]>>(
      `${environment.API_PUBLIC}${RoutesApp.APPLICANTYPE_REQUESTYPE}`,
      { headers }
    );
  }
  //INACTIVE_ASSOCIATE_REQUEST_APPLICANT
  inactivateAssociationApplicantRequest(payload: AssociationApplicantRequestList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${RoutesApp.INACTIVE_ASSOCIATE_REQUEST_APPLICANT}`,
      payload,
      { headers }
    );
  }
  createAssociationApplicantRequest(payload: AssociateApplicantRequest) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${RoutesApp.ASSOCIATE_REQUEST_APPLICANT}`,
      payload,
      { headers }
    );
  }
}

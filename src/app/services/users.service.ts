import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BodyResponse, ZionResponse } from '../models/shared/body-response.inteface';
import { ILogin } from '../models/login/login.interface';
import { EndPointRoute, RoutesApp } from '../enums/routes.enum';
import { SessionStorageItems } from '../enums/session-storage-items.enum';
import {
  ApplicantTypeList,
  AssignUserRequest,
  AssociateApplicantRequest,
  AssociationApplicantRequestList,
  CategoryList,
  CreateApplicantType,
  CreateRequestType,
  ModalityList,
  RequestHistoric,
  RequestFormList,
  RequestTypeList,
  RequestsDetails,
  RequestsList,
  UserCreate,
  UserList,
  NotificationList,
  NotificationActionList,
  NotificationReceiversList,
  QualityDimensionList,
} from '../models/users.interface';

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
      `${environment.API_PUBLIC}${EndPointRoute.USERS_LIST}`,
      { headers }
    );
  }
  getRequestList() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<RequestsList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.ALL_REQUESTS}`,
      { headers }
    );
  }
  getRequestListByAssignedUser(assigned_user: string) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<RequestsList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.ALL_REQUESTS_BY_ASSIGNED_USER}/${assigned_user}`,
      { headers }
    );
  }
  getRequestDetails(payload: number) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<RequestsDetails>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_DETAILS}/${payload}`,
      { headers }
    );
  }
  getRequestHistoric(payload: number) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<RequestHistoric[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_HISTORIC}/${payload}`,
      { headers }
    );
  }
  assignUserToRequest(payload: AssignUserRequest) {
    console.log(payload);
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.ASSIGN_USER_TO_REQUEST}`,
      payload,
      { headers }
    );
  }
  createUser(payload: UserCreate) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<ZionResponse>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_USER}`,
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
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_USER}`,
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
      `${environment.API_PUBLIC}${EndPointRoute.INVISIBLE_USER}`,
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
      `${environment.API_PUBLIC}${EndPointRoute.APPLICANT_TYPE_LIST}`,
      { headers }
    );
  }
  inactivateApplicant(payload: ApplicantTypeList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<ApplicantTypeList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_APPLICANT}`,
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
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_APPLICANT_TYPE}`,
      payload,
      { headers }
    );
  }
  modifyApplicantType(payload: CreateApplicantType) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.MODIFY_APPLICANT_TYPE}`,
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
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_TYPE_LIST}`,
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
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_REQUEST}`,
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
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_REQUEST_TYPE}`,
      payload,
      { headers }
    );
  }
  modifyRequestType(payload: CreateRequestType) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.MODIFY_REQUEST_TYPE}`,
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
      `${environment.API_PUBLIC}${EndPointRoute.APPLICANTYPE_REQUESTYPE}`,
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
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVE_ASSOCIATE_REQUEST_APPLICANT}`,
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
      `${environment.API_PUBLIC}${EndPointRoute.ASSOCIATE_REQUEST_APPLICANT}`,
      payload,
      { headers }
    );
  }
  getModalityList() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<ModalityList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.MODALITY_LIST}`,
      { headers }
    );
  }
  createModality(payload: ModalityList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_MODALITY}`,
      payload,
      { headers }
    );
  }
  modifyModality(payload: ModalityList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.UPDATE_MODALITY}`,
      payload,
      { headers }
    );
  }
  inactivateModality(payload: ModalityList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_MODALITY}`,
      payload,
      { headers }
    );
  }
  getCategoryList() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<CategoryList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.CATEGORY_LIST}`,
      { headers }
    );
  }
  createCategory(payload: CategoryList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_CATEGORY}`,
      payload,
      { headers }
    );
  }

  modifyCategory(payload: CategoryList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.UPDATE_CATEGORY}`,
      payload,
      { headers }
    );
  }
  inactivateCategory(payload: CategoryList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_CATEGORY}`,
      payload,
      { headers }
    );
  }
  getCategoryListByModality(modality_id: number) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<CategoryList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.CATEGORIES_BY_MODALITY}/${modality_id}`,
      { headers }
    );
  }
  getQualityDimensionsList() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<QualityDimensionList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.QUALITY_DIMENSION_LIST}`,
      { headers }
    );
  }
  getRequestsTypeByApplicantType(payload: number) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<RequestTypeList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_BY_APPLICANT}/${payload}`,
      { headers }
    );
  }

  getFormById(applicant_id: number) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_LIST}${applicant_id}`,
      { headers }
    );
  }

  createRequest(payload: RequestFormList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<number>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_REQUEST}`,
      payload,
      { headers }
    );
  }
  getNotificationActionList() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<NotificationActionList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.NOTIFICATION_ACTION_LIST}`,
      { headers }
    );
  }
  getNotificationReceiversList() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<NotificationReceiversList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.NOTIFICATION_RECEIVER_LIST}`,
      { headers }
    );
  }
  getNotificationList() {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.get<BodyResponse<NotificationList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.NOTIFICATION_LIST}`,
      { headers }
    );
  }
  createNotification(payload: NotificationList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_NOTIFICATION}`,
      payload,
      { headers }
    );
  }

  modifyNotification(payload: NotificationList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.UPDATE_NOTIFICATION}`,
      payload,
      { headers }
    );
  }
  inactivateNotification(payload: NotificationList) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_NOTIFICATION}`,
      payload,
      { headers }
    );
  }
  answerRequest(payload: AssignUserRequest) {
    const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.ANSWER_REQUEST}`,
      payload,
      { headers }
    );
  }
}

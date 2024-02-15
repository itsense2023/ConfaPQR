import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BodyResponse } from '../models/shared/body-response.inteface';
import { ILogin } from '../models/login/login.interface';
import { RoutesApp } from '../enums/routes.enum';
import { SessionStorageItems } from '../enums/session-storage-items.enum';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(payload: ILogin) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${RoutesApp.LOGIN}`,
      payload
    );
  }

  isLoggedIn() {
    const sessionToken = sessionStorage.getItem(SessionStorageItems.SESSION);
    return sessionToken ? true : false;
  }
}

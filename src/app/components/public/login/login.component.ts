import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ILogin } from '../../../models/login/login.interface';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesApp } from '../../../enums/routes.enum';
import { SessionStorageItems } from '../../../enums/session-storage-items.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  ingredient!: string;
  visibleDialog = false;
  message = '';
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  userForm: FormGroup;

  login() {
    if (this.userForm.invalid) {
      return;
    }

    const payload: ILogin = {
      usuario: this.userForm.controls['usuario'].value,
      contrasena: this.userForm.controls['contrasena'].value,
      sistema: 54,
    };

    this.loginService.login(payload).subscribe({
      next: (response: BodyResponse<string>) => {
        if (response.code === 200) {
          sessionStorage.setItem(SessionStorageItems.SESSION, response.data);
          this.router.navigate([RoutesApp.REQUEST_MANAGER]);
        } else {
          this.message = response.data;
          this.visibleDialog = true;
        }
        console.log('Respuesta exitosa:', response);
      },
      error: (err: any) => {
        this.message = 'Sistema no disponible';
        this.visibleDialog = true;
      },
      complete: () => {
        console.log('La suscripción ha sido completada.');
      },
    });
  }

  closeDialog() {
    this.visibleDialog = false;
  }
}

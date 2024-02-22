import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { CategoryList } from '../../../models/users.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  data!: IRequestManager[];
  categoryList!: CategoryList[];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogCategory = false;
  message = '';
  parameter = [''];
  buttonmsg = '';
  category_details!: CategoryList;
  enableAction: boolean = false;
  read_only: boolean = false;
  enableCreate: boolean = false;

  constructor(
    private userService: Users,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategoryTable();
  }

  getCategoryTable() {
    this.userService.getCategoryList().subscribe({
      next: (response: BodyResponse<CategoryList[]>) => {
        if (response.code === 200) {
          this.categoryList = response.data;
          this.categoryList.forEach(item => {
            item.is_active = item.is_active === 1 ? true : false;
          });
        } else {
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('La suscripción ha sido completada.');
      },
    });
  }

  inActiveCategory(category_details: CategoryList) {
    if (!category_details.is_active) {
      this.message = '¿Seguro que desea Inactivar categoría?';
      this.visibleDialog = true;
      category_details.is_active = 0;
    } else {
      this.message = '¿Seguro que desea Activar categoría?';
      this.visibleDialog = true;
      category_details.is_active = 1;
    }
    this.category_details = category_details;
  }
  displayModality(category_details: CategoryList) {
    this.visibleDialogCategory = true;
    this.buttonmsg = '';
    this.message = 'Detalles de categoría';
    this.read_only = true;
    this.enableCreate = false;
    this.category_details = category_details;
  }
  editModality(category_details: CategoryList) {
    this.visibleDialogCategory = true;
    this.buttonmsg = 'Modificar';
    this.message = 'Modificar categoría';
    this.read_only = false;
    this.enableCreate = false;
    this.category_details = category_details;
  }
  createModality() {
    this.visibleDialogCategory = true;
    this.buttonmsg = 'Crear';
    this.message = 'Crear categoría';
    this.read_only = false;
    this.enableCreate = true;
  }

  closeDialogModality(value: boolean) {
    this.visibleDialogCategory = false;
    this.enableAction = value;
    if (value) {
      //
    }
  }
  setParameter(category_details: CategoryList) {
    console.log(category_details);
    if (!this.enableAction || this.read_only) {
      return;
    } else if (this.enableCreate) {
      this.userService.createCategory(category_details).subscribe({
        next: (response: BodyResponse<string>) => {
          if (response.code === 200) {
          } else {
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.ngOnInit();
          console.log('La suscripción ha sido completada.');
        },
      });
    } else {
      this.userService.modifyCategory(category_details).subscribe({
        next: (response: BodyResponse<string>) => {
          if (response.code === 200) {
          } else {
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.ngOnInit();
          console.log('La suscripción ha sido completada.');
        },
      });
    }
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      this.userService.inactivateCategory(this.category_details).subscribe({
        next: (response: BodyResponse<string>) => {
          if (response.code === 200) {
          } else {
            if ((this.category_details.is_active = 1)) {
              this.category_details.is_active = 0;
            } else {
              this.category_details.is_active = 1;
            }
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.ngOnInit();
          console.log('La suscripción ha sido completada.');
        },
      });
    }
  }
}

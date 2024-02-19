import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryList, ModalityList } from '../../../models/users.interface';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrl: './modal-category.component.scss',
})
export class ModalCategoryComponent implements OnInit {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() visible: boolean = false;
  @Input() read_only: boolean = false;
  @Input() categoryForm?: CategoryList;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<CategoryList>();
  inputValue: string[] = [''];
  modalityList!: ModalityList[];
  constructor(
    private formBuilder: FormBuilder,
    private userService: Users
  ) {
    this.formGroup = this.formBuilder.group({
      category_id: ['', Validators.required],
      category_name: ['', Validators.required],
      tipology_name: ['', Validators.required],
      cause_name: ['', Validators.required],
      modality_id: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    console.log(this.read_only);
    this.getModalityTable();
    if (this.buttonmsg !== 'Crear' && this.categoryForm) {
      this.categoryForm.modality_id = 2;
      console.log('categoryForm:', this.categoryForm);
      //this.formGroup.get('modality_id')!.setValue(2);
      //console.log('modality_id:', this.formGroup.get('modality_id')!.value);
      this.formGroup.patchValue(this.categoryForm);
    } else {
      this.formGroup.reset();
    }
  }

  formGroup: FormGroup<any> = new FormGroup<any>({});
  showDialog() {
    this.visible = true;
  }
  getModalityTable() {
    this.userService.getModalityList().subscribe({
      next: (response: BodyResponse<ModalityList[]>) => {
        if (response.code === 200) {
          this.modalityList = response.data;
          this.modalityList.forEach(item => {
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
  closeDialog(value: boolean) {
    this.setRta.emit(value);
    const payload: CategoryList = {
      category_id: this.formGroup.controls['category_id'].value,
      category_name: this.formGroup.controls['category_name'].value,
      tipology_name: this.formGroup.controls['tipology_name'].value,
      cause_name: this.formGroup.controls['cause_name'].value,
      modality_id: this.formGroup.controls['modality_name'].value, //['modality_id'],
    };
    console.log(payload);
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
}

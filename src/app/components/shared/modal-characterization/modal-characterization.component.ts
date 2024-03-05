import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ApplicantTypeList,
  CategoryList,
  CharacterizationCreate,
  ModalityList,
  NotificationActionList,
  NotificationList,
  NotificationReceiversList,
  QualityDimensionList,
  RequestTypeList,
} from '../../../models/users.interface';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-characterization',
  templateUrl: './modal-characterization.component.html',
  styleUrl: './modal-characterization.component.scss',
})
export class ModalCharacterizationComponent implements OnInit {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() visible: boolean = false;
  @Input() read_only: boolean = false;
  @Input() request_id?: number;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<CharacterizationCreate>();
  //notificationActionsList: NotificationActionList[] = [];
  inputValue: string[] = [''];
  modalityList!: ModalityList[];
  //notificationReceiversList: NotificationReceiversList[] = [];
  //formGroup: FormGroup;
  applicantTypeList: ApplicantTypeList[] = [];
  requestTypeList: RequestTypeList[] = [];
  categoryList: CategoryList[] = [];
  qualityList: QualityDimensionList[] = [];

  constructor(
    private userService: Users,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.formGroup = new FormGroup({
      request_id: new FormControl(null),
      applicant_type_id: new FormControl(null, [Validators.required]),
      request_type_id: new FormControl(null, [Validators.required]),
      is_pqr: new FormControl(null, [Validators.required]),
      quality_dimension_id: new FormControl(null),
      modality_id: new FormControl(null, [Validators.required]),
      category_id: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void {
    console.log(this.read_only);
    this.getRequestTypesList();
    this.getApplicantTypesList();
    this.getQualityDimensionsTable();
    this.getModalityTable();
    //this.formGroup.get('tipology_name')?.addValidators(Validators.pattern('^[^#$%&]+$'));
    //this.formGroup.get('cause_name')?.addValidators(Validators.pattern('^[^#$%&]+$'));
  }

  formGroup: FormGroup<any> = new FormGroup<any>({});
  showDialog() {
    this.visible = true;
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  getRequestTypesList() {
    this.userService.getRequestTypesList().subscribe({
      next: (response: BodyResponse<RequestTypeList[]>) => {
        if (response.code === 200) {
          this.requestTypeList = response.data.filter(obj => obj.is_active !== 0);
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
  getApplicantTypesList() {
    this.userService.getApplicantTypesList().subscribe({
      next: (response: BodyResponse<ApplicantTypeList[]>) => {
        if (response.code === 200) {
          this.applicantTypeList = response.data.filter(obj => obj.is_active !== 0);
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
  getQualityDimensionsTable() {
    this.userService.getQualityDimensionsList().subscribe({
      next: (response: BodyResponse<QualityDimensionList[]>) => {
        if (response.code === 200) {
          this.qualityList = response.data.filter(obj => obj.is_active !== 0);
        } else {
          this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
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
  getModalityTable() {
    this.userService.getModalityList().subscribe({
      next: (response: BodyResponse<ModalityList[]>) => {
        if (response.code === 200) {
          this.modalityList = response.data.filter(obj => obj.is_active !== 0);
        } else {
          this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
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
  getCategoryTableByModality(modality_id: number) {
    this.userService.getCategoryListByModality(modality_id).subscribe({
      next: (response: BodyResponse<CategoryList[]>) => {
        if (response.code === 200) {
          this.categoryList = response.data.filter(obj => obj.is_active !== 0);
        } else {
          this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
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
    console.log(this.formGroup);
    const payload: CharacterizationCreate = {
      request_id: +this.formGroup.controls['request_id'].value,
      applicant_type_id: this.formGroup.controls['applicant_type_id'].value,
      request_type_id: this.formGroup.controls['request_type_id'].value,
      is_pqr: this.formGroup.controls['is_pqr'].value,
      quality_dimension_id: this.formGroup.controls['quality_dimension_id'].value,
      modality_id: this.formGroup.controls['modality_id'].value,
      category_id: this.formGroup.controls['category_id'].value,
    };
    console.log(payload);
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
}

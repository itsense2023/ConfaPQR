import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ApplicantTypeList,
  CategoryList,
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
  @Input() notificationForm?: NotificationList;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<NotificationList>();
  notificationActionsList: NotificationActionList[] = [];
  inputValue: string[] = [''];
  modalityList!: ModalityList[];
  notificationReceiversList: NotificationReceiversList[] = [];
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
      notification_id: new FormControl(null),
      notification_name: new FormControl(null, [Validators.required]),
      notification_message: new FormControl(null, [Validators.required]),
      action_id: new FormControl(null, [Validators.required]),
      notification_receiver_id: new FormControl(null),
      notification_receiver: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void {
    console.log(this.read_only);
    this.getNotificationActionsTable();
    this.getNotificationReceiversTable();
    this.getRequestTypesList();
    this.getApplicantTypesList();
    this.getQualityDimensionsTable();
    this.getModalityTable();
    if (this.buttonmsg !== 'Crear' && this.notificationForm) {
      this.formGroup.patchValue(this.notificationForm);
    } else {
      this.formGroup.reset();
    }
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
  getNotificationActionsTable() {
    this.userService.getNotificationActionList().subscribe({
      next: (response: BodyResponse<NotificationActionList[]>) => {
        if (response.code === 200) {
          this.notificationActionsList = response.data;
          this.notificationActionsList.forEach(item => {
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
  getNotificationReceiversTable() {
    this.userService.getNotificationReceiversList().subscribe({
      next: (response: BodyResponse<NotificationReceiversList[]>) => {
        if (response.code === 200) {
          this.notificationReceiversList = response.data;
          this.notificationReceiversList.forEach(item => {
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
    console.log(this.formGroup);
    const payload: NotificationList = {
      //notification_id: +this.formGroup.controls['notification_id'].value,
      notification_name: this.formGroup.controls['notification_name'].value,
      notification_message: this.formGroup.controls['notification_message'].value,
      action_id: this.formGroup.controls['action_id'].value,
      notification_receiver_id: this.formGroup.controls['notification_receiver_id'].value,
      notification_receiver: [this.formGroup.controls['notification_receiver'].value],
    };
    console.log(payload);
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
}

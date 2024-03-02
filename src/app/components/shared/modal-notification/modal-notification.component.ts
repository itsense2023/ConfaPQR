import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CategoryList,
  ModalityList,
  NotificationActionList,
  NotificationList,
  NotificationReceiversList,
} from '../../../models/users.interface';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrl: './modal-notification.component.scss',
})
export class ModalNotificationComponent implements OnInit {
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

  constructor(
    private userService: Users,
    private formBuilder: FormBuilder
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

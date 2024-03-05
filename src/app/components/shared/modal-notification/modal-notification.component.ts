import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  recipients: string[] = [];
  //formGroup: FormGroup;

  constructor(
    private userService: Users,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = new FormGroup({
      notification_id: new FormControl(null),
      notification_name: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      notification_message: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[^#$%&]+$'),
      ]),
      action_id: new FormControl(null, Validators.required),
      notification_receiver_id: new FormControl(null),
      notification_receiver: new FormControl(null, [
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
      ]),
    });
  }

  ngOnInit(): void {
    console.log(this.read_only);
    this.getNotificationActionsTable();
    this.getNotificationReceiversTable();
    if (this.buttonmsg !== 'Crear' && this.notificationForm) {
      console.log(this.notificationForm);
      this.formGroup.patchValue(this.notificationForm);
      console.log(this.formGroup);
      this.recipients = this.notificationForm.notification_receiver as string[];
      this.formGroup.get('notification_receiver')?.setValue('');
    } else {
      this.formGroup.reset();
    }
  }

  formGroup: FormGroup<any> = new FormGroup<any>({});
  showDialog() {
    this.visible = true;
  }

  addRecipients() {
    this.recipients.push(this.formGroup.get('notification_receiver')?.value);
    this.formGroup.get('notification_receiver')?.setValue('');
  }

  getNotificationActionsTable() {
    this.userService.getNotificationActionList().subscribe({
      next: (response: BodyResponse<NotificationActionList[]>) => {
        if (response.code === 200) {
          this.notificationActionsList = response.data;
          this.notificationActionsList.forEach(item => {
            // console.log(item);
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
            // console.log(item);
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
    //console.log(this.formGroup.value);
    const payload: NotificationList = {
      //notification_id: +this.formGroup.controls['notification_id'].value,
      notification_name: this.formGroup.controls['notification_name'].value,
      notification_message: this.formGroup.controls['notification_message'].value,
      action_id: this.formGroup.get('action_id')?.value,
      notification_receiver_id: this.formGroup.get('notification_receiver_id')?.value || null,
      notification_receiver: this.recipients || null,
    };
    console.log(payload);
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
}

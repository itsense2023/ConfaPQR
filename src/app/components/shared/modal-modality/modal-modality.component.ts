import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplicantTypeList, ModalityList, RequestTypeList } from '../../../models/users.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../services/users.service';

@Component({
  selector: 'app-modal-modality',
  templateUrl: './modal-modality.component.html',
  styleUrl: './modal-modality.component.scss',
})
export class ModalModalityComponent implements OnInit {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() visible: boolean = false;
  @Input() read_only: boolean = false;
  @Input() modalityForm?: ModalityList;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<ModalityList>();
  applicantTypeList: ApplicantTypeList[] = [];
  requestTypeList: RequestTypeList[] = [];
  inputValue: string[] = [''];

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      modality_id: ['', Validators.required],
      modality_name: ['', Validators.required],
      category_name: ['', Validators.required],
      tipology_name: ['', Validators.required],
      cause: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    console.log(this.read_only);
    if (this.modalityForm) {
      this.formGroup.patchValue(this.modalityForm);
    }
  }

  formGroup: FormGroup<any> = new FormGroup<any>({});
  showDialog() {
    this.visible = true;
    console.log(this.applicantTypeList);
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    const payload: ModalityList = {
      modality_id: this.formGroup.controls['modality_id'].value,
      modality_name: this.formGroup.controls['modality_name'].value,
      category_name: this.formGroup.controls['category_name'].value,
      tipology_name: this.formGroup.controls['tipology_name'].value,
      cause: this.formGroup.controls['cause'].value,
    };
    console.log(payload);
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-data-treatment',
  templateUrl: './modal-data-treatment.component.html',
  styleUrl: './modal-data-treatment.component.scss',
})
export class ModalDataTreatmentComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<boolean>();
  message = '';
  inputValue: boolean = false;
  showDialog() {
    this.visible = true;
  }
  formGroup: FormGroup<any> = new FormGroup<any>({});

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      inputValue: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.formGroup.reset();
    this.message = '';
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    this.inputValue = this.formGroup.controls['inputValue'].value;
    this.setRtaParameter.emit(this.inputValue);
    this.visible = false;
  }
}

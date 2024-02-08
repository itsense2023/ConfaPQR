import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrl: './modal-input.component.scss',
})
export class ModalInputComponent {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() parameter = [''];
  @Input() visible: boolean = false;
  @Input() twoFields: boolean = false;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<string[]>();
  inputValue1: string = '';
  inputValue2: string = '';
  inputValue: string[] = [''];
  showDialog() {
    this.visible = true;
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    this.inputValue = [this.inputValue1, this.inputValue2];
    this.setRtaParameter.emit(this.inputValue);
    this.visible = false;
  }
}

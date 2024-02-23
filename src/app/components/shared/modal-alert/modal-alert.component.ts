import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrl: './modal-alert.component.scss',
})
export class ModalAlertComponent {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() visible: boolean = false;
  @Input() informative: boolean = false;
  @Input() severity = '';
  @Output() setRta = new EventEmitter<boolean>();

  showDialog() {
    this.visible = true;
    console.log(this.severity);
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    this.visible = false;
  }
}

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
  expandMessage: boolean = false;
  showDialog() {
    this.visible = true;
  }
  formGroup: FormGroup<any> = new FormGroup<any>({});

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      inputValue: [false, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.formGroup.reset();
    this.message =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus in massa. At tempor commodo ullamcorper a lacus vestibulum. Integer enim neque volutpat ac tincidunt vitae semper quis. Eu consequat ac felis donec et odio pellentesque diam volutpat. Urna cursus eget nunc scelerisque viverra mauris. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Morbi tincidunt augue interdum velit euismod. Feugiat nibh sed pulvinar proin. Faucibus pulvinar elementum integer enim neque volutpat. Blandit massa enim nec dui nunc mattis enim ut tellus. Mauris nunc congue nisi vitae suscipit tellus mauris a diam. Neque egestas congue quisque egestas diam in arcu cursus. Scelerisque purus semper eget duis at tellus at urna condimentum. Sed odio morbi quis commodo. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Varius morbi enim nunc faucibus a pellentesque. Fermentum dui faucibus in ornare quam viverra orci sagittis Fermentum et sollicitudin ac orci phasellus egestas. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Morbi leo urna molestie at. Quam adipiscing vitae proin sagittis. Nisl purus in mollis nunc sed id. Et egestas quis ipsum suspendisse. Sollicitudin tempor id eu nisl. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Consequat nisl vel pretium lectus quam id. Consequat id porta nibh venenatis cras. Amet purus gravida quis blandit. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Dolor magna eget est lorem. Ipsum consequat nisl vel pretium lectus quam id leo in. Volutpat sed cras ornare arcu. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit.';
  }

  toggleExpand() {
    this.expandMessage = !this.expandMessage;
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    this.inputValue = this.formGroup.controls['inputValue'].value;
    this.setRtaParameter.emit(this.inputValue);
    this.visible = false;
  }
}

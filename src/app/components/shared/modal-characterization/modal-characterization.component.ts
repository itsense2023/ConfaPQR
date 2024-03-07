import {
  AfterContentChecked,
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
  ApplicantTypeList,
  CategoryList,
  CharacterizationCreate,
  ModalityList,
  QualityDimensionList,
  RequestTypeList,
  RequestsDetails,
  TipologiesCauses,
} from '../../../models/users.interface';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-characterization',
  templateUrl: './modal-characterization.component.html',
  styleUrl: './modal-characterization.component.scss',
})
export class ModalCharacterizationComponent implements OnInit, AfterContentChecked {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() visible: boolean = false;
  @Input() read_only: boolean = false;
  @Input() request_details?: RequestsDetails;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<CharacterizationCreate>();
  inputValue: string[] = [''];
  modalityList!: ModalityList[];
  //formGroup: FormGroup;
  applicantTypeList: ApplicantTypeList[] = [];
  requestTypeList: RequestTypeList[] = [];
  categoryList: CategoryList[] = [];
  qualityList: QualityDimensionList[] = [];
  TipologyList: TipologiesCauses[] = [];
  CauseList: TipologiesCauses[] = [];
  modalBoolean!: boolean;
  categoryBoolean!: boolean;

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
      modality_id: new FormControl(null),
      category_id: new FormControl(null),
      tipology_id: new FormControl(null),
      cause_id: new FormControl(null),
    });
  }
  ngOnInit(): void {
    //console.log(this.read_only);
    this.getApplicantTypesList();
    this.getQualityDimensionsTable();
    this.getModalityTable();
    this.formGroup.get('applicant_type_id')?.setValue(this.request_details?.applicant_type_id);
    this.getRequestsTypeByApplicantType(this.request_details!.applicant_type_id);
    this.formGroup.get('request_type_id')?.setValue(this.request_details?.request_type_id);
  }
  ngAfterContentChecked(): void {
    this.enableQualityandModality();
  }

  formGroup: FormGroup<any> = new FormGroup<any>({});
  showDialog() {
    this.visible = true;
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
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

  getRequestType() {
    this.getRequestsTypeByApplicantType(this.formGroup.get('applicant_type_id')?.value);
  }

  getRequestsTypeByApplicantType(applicant_type_id: number) {
    this.userService.getRequestsTypeByApplicantType(applicant_type_id).subscribe({
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

  enableQualityandModality() {
    if (this.formGroup.get('is_pqr')?.value === 'si') {
      this.modalBoolean = true;
      this.formGroup.get('quality_dimension_id')?.addValidators(Validators.required);
      this.formGroup.get('modality_id')?.addValidators(Validators.required);
    } else {
      this.modalBoolean = false;
      this.formGroup.get('quality_dimension_id')?.clearValidators;
      this.formGroup.get('modality_id')?.clearValidators;
    }
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
          // console.log(this.modalityList);
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

  enableCategoryandTipology(): boolean {
    if (this.formGroup.get('modality_id')?.value === 2) {
      this.formGroup.get('category_id')?.addValidators(Validators.required);
      this.formGroup.get('tipology_id')?.addValidators(Validators.required);
      this.formGroup.get('cause_id')?.addValidators(Validators.required);
      return true;
    } else {
      this.formGroup.get('tipology_id')?.removeValidators;
      this.formGroup.get('cause_id')?.removeValidators;
      this.formGroup.get('category_id')?.removeValidators;
      return false;
    }
  }

  getCategory() {
    console.log(this.formGroup.get('modality_id'));
    this.getCategoryTableByModality(this.formGroup.get('modality_id')?.value);
  }

  getCategoryTableByModality(modality_id: number) {
    this.userService.getCategoryListByModality(modality_id).subscribe({
      next: (response: BodyResponse<CategoryList[]>) => {
        if (response.code === 200) {
          this.categoryList = response.data.filter(obj => obj.is_active !== 0);
          //console.log(this.categoryList);
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
  getTipology() {
    this.getTipologiesListByCategory(this.formGroup.get('category_id')?.value.category_name);
  }
  getTipologiesListByCategory(category_name_string: string) {
    const payload: TipologiesCauses = {
      category_name: category_name_string,
    };
    this.userService.getTipologiesListByCategory(payload).subscribe({
      next: (response: BodyResponse<TipologiesCauses[]>) => {
        if (response.code === 200) {
          this.TipologyList = response.data;
          //console.log(this.TipologyList);
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

  getCauses() {
    //console.log(this.formGroup.get('tipology_id'), 'causa');
    this.getCausesListByTipology(this.formGroup.get('tipology_id')?.value);
  }
  getCausesListByTipology(tipology_name_string: string) {
    const payload: TipologiesCauses = {
      tipology_name: tipology_name_string,
    };
    this.userService.getCausesListByTipology(payload).subscribe({
      next: (response: BodyResponse<TipologiesCauses[]>) => {
        if (response.code === 200) {
          this.CauseList = response.data;
          //console.log(this.CauseList);
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
    // console.log(this.formGroup);
    const payload: CharacterizationCreate = {
      request_id: +this.formGroup.controls['request_id'].value,
      applicant_type_id: this.formGroup.controls['applicant_type_id'].value,
      request_type_id: this.formGroup.controls['request_type_id'].value,
      is_pqr: this.formGroup.controls['is_pqr'].value,
      quality_dimension_id: this.formGroup.controls['quality_dimension_id'].value,
      modality_id: this.formGroup.controls['modality_id'].value,
      category_id: this.formGroup.controls['category_id'].value,
    };
    // console.log(payload);
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
}

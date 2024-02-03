import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Confa';
  isSpinnerVisible = false;
  constructor(private spinner: NgxSpinnerService) {
    console.log(environment.version);
  }

  ngOnInit() {
    this.spinner?.spinnerObservable.subscribe(response => {
      this.isSpinnerVisible = response?.show;
    });
  }
}

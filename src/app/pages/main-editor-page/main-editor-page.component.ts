import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

declare var require: any;
const Elapsed = require('elapsed');

@Component({
  selector: 'app-main-editor-page',
  templateUrl: './main-editor-page.component.html',
  styleUrls: ['./main-editor-page.component.css']
})
export class MainEditorPageComponent implements OnInit {

  events: string[] = [];
  opened: boolean;
  n: number = <any>setTimeout(function () { /* snip */ console.warn('init');  }, 2000);

  isSaving = false;
  isSaved = false;
  saveTime: Date;
  elapsedTime: string;

  constructor(public _snackBar: MatSnackBar) {
    this.saveTime = new Date(2021, 1, 2, 2, 45, 55);
    console.log(this.saveTime);
    console.log(new Date());
  }

  ngOnInit() {
  }

  textChange(text) {
    console.log('any: ', text);
    this.isSaved = false;
    this.isSaving = true;
    clearTimeout(this.n);
    this.n = <any>setTimeout(() => {
      console.error('CHANGE');
      this.isSaving = false;
      this.isSaved = true;
      const elapsedTime = new Elapsed(this.saveTime, new Date())
      this.elapsedTime = elapsedTime.optimal;
      console.error('TIME PASSED: ', elapsedTime.optimal);
    }, 2000);

  }

}

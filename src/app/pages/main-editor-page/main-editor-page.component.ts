import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-editor-page',
  templateUrl: './main-editor-page.component.html',
  styleUrls: ['./main-editor-page.component.css']
})
export class MainEditorPageComponent implements OnInit {

  events: string[] = [];
  opened: boolean;

  constructor() { }

  ngOnInit() {
  }

  textChange(text) {
    console.log('any: ', text);
  }

}

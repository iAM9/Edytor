import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-script-previewer',
  templateUrl: './script-previewer.component.html',
  styleUrls: ['./script-previewer.component.css']
})
export class ScriptPreviewerComponent implements OnInit {

  /** The text preview of the current screenplay */
  @Input() currentTextPreview: string;

  constructor() { }

  ngOnInit() {
  }

}

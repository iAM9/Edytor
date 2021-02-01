import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as indentation from 'indent-textarea';
import { isNumber } from 'util';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})



export class TextEditorComponent {

  @Output() textChange = new EventEmitter<string>();

  constructor() { }

  /**
   * Event handler for detecting changes in the text
   * @param text 
   */
  textChangeEvent(text: any) {
    console.log('Text: ', text);
    this.textChange.emit(text.data);
    console.log('Textarea: ', (<HTMLInputElement>document.getElementById("editor")).value);
  }

  /**
   * Handles formatting of the contentEditable div
   * @param command The format command
   * @param value The value for the command
   */
  format(command, value?) {
    console.log('command: ', command);
    console.log('value: ', value);
    document.execCommand(command, false, value);
  }

  selectFont(e) {
    console.log('Select: ', e);
    const selection = (<HTMLInputElement>document.getElementById("font-style-select")).value;
    this.format('fontname', selection);
  }

  selectSize(e) {
    console.log('Select: ', e);
    const selection = (<HTMLInputElement>document.getElementById("font-size-select")).value;
    this.format('fontsize', selection);
  }

  /**
   * Handle tabbing of text in the editor
   * @param e 
   */
  textTab(e) {
    const editor = document.querySelector('textarea');
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        indentation.unindent(editor);
      } else {
        indentation.indent(editor);
      }
      e.preventDefault();
    }
  }

}

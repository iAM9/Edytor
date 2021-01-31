import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as indentation from 'indent-textarea';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})



export class TextEditorComponent {

  @Output() textChange = new EventEmitter<string>();

  constructor() {
    // const editor = document.querySelector('textarea');
    // indentation.watch(editor);
  }


  textChangeEvent(text: any) {
    console.log('Text: ', text);
    this.textChange.emit(text.data);
    console.log('Textarea: ', (<HTMLInputElement>document.getElementById("editor")).value);
  
  }

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

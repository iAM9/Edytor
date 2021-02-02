import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as indentation from 'indent-textarea';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})



export class TextEditorComponent {

  @Output() textChange = new EventEmitter<string>();

  constructor(private _dialog: MatDialog) { }

  /**
   * Event handler for detecting changes in the text
   * @param text 
   */
  textChangeEvent(text: any) {
    console.log('Text: ', text);
    this.textChange.emit(text.data);
    console.log('Textarea: ', (document.getElementById("editor")).innerHTML);

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

  createLink(event) {
    let link = window.prompt('Target Url');
    // const dialogRef = this._dialog.open(HyperlinkDialogComponent, {
    //   width: '250px',
    //   height: '280px',
    //   data: {
    //     string: window.getSelection().toString()
    //   }
    // });
    // // console.log('Event: ', event);
    // dialogRef.afterClosed().subscribe(link => {
      // console.log('LINK: ', link);
      if (!link.startsWith('http')) {
        link = 'https://'+ link;
      }
    this.format('createlink', link)
    // })
  }

  /**
   * Handle tabbing of text in the editor
   * @param e The keydown event
   */
  textTab(e) {
      if(e.key === 'Tab') {
        // e.preventDefault();
        document.execCommand('insertHTML', false, '&#009');
        //prevent focusing on next element
        e.preventDefault() 
      }
    
    // e.preventDefault();

    // const editor = document.querySelector('textarea');
    // if (e.key === 'Tab') {
    //   console.log('key pressed: ', e.key);
    //   if (e.shiftKey) {
    //     indentation.unindent(editor);
    //   } else {
    //     indentation.indent(editor);
    //   }
    //   e.preventDefault();
    // }
  }

}


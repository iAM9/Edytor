import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as indentation from 'indent-textarea';
import { TextDocument } from 'src/app/interfaces/document';
import { TitleDialogComponent } from '../title-dialog/title-dialog.component';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})

export class TextEditorComponent {

  /** The current text document */
  @Input() currentTextDocument: TextDocument;

  /** The title of the current text doc */
  @Input() currentTitle: string;

  /** The text contents of the current text doc */
  @Input() currentText: string;

  /** Emit event whenever text contents are updated */
  @Output() textChange = new EventEmitter<string>();

  /** Emit event whenever title is updated */
  @Output() titleChange = new EventEmitter<string>();

  /**
   * Constructor
   * @param _dialog 
   */
  constructor(private _dialog: MatDialog) { }

  /**
   * Event handler for detecting changes in the text
   * @param text 
   */
  textChangeEvent(text: any) {
    // this.textChange.emit(text.data);
    this.textChange.emit(document.getElementById("editor").innerHTML);
  }

  /**
   * Edit title of the document
   * @param docTitle The current title of the current doc
   */
  editName(docTitle) {
    const dialogRef = this._dialog.open(TitleDialogComponent, {
      data: {
        title: docTitle
      }
    });

    dialogRef.afterClosed().subscribe(newTitle => {
      if (!newTitle) {
        return;
      }
      this.titleChange.emit(newTitle);
    })
  }

  /**
   * Handles formatting of the contentEditable div
   * @param command The format command
   * @param value The value for the command
   */
  format(command, value?) {
    // console.log('command: ', command);
    // console.log('value: ', value);
    document.execCommand(command, false, value);
  }

  /**
   * Handle font style selection
   * @param e New font selection
   */
  selectFont(e) {
    const selection = (<HTMLInputElement>document.getElementById("font-style-select")).value;
    this.format('fontname', selection);
  }

  /**
 * Handle font size selection
 * @param e New font size selection
 */
  selectSize(e) {
    const selection = (<HTMLInputElement>document.getElementById("font-size-select")).value;
    this.format('fontsize', selection);
  }

  /**
   * Handle creating a hyperlink
   * @param event 
   */
  createLink(event) {
    let link = window.prompt('Target Url');
    if (!link.startsWith('http')) {
      link = 'https://' + link;
    }
    this.format('createlink', link)
  }

  /**
   * Handle tabbing of text in the editor
   * @param e The keydown event
   */
  textTab(e) {
    if (e.key === 'Tab') {
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


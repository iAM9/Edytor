import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { TextDocument } from 'src/app/interfaces/document';
import { ScriptDocument } from 'src/app/interfaces/script';
import { TitleDialogComponent } from '../title-dialog/title-dialog.component';

@Component({
  selector: 'app-script-editor',
  templateUrl: './script-editor.component.html',
  styleUrls: ['./script-editor.component.css']
})
export class ScriptEditorComponent {

  /** Flag to set preview */
  preview = false; 

  /** Currently selected script */
  @Input() currentScriptDocument: ScriptDocument;

  /** Title of currently selected script*/
  @Input() currentScriptTitle: string;

  /** Contents of currently selected script*/
  @Input() currentScriptText: string;

  /** Emit save event */
  @Output() saveScript = new EventEmitter<string>();

  /** Emit title update event */
  @Output() titleChange = new EventEmitter<string>();

  /** Emit script contents change */
  @Output() scriptChange = new EventEmitter<string>();

  constructor(private _dialog: MatDialog) { }

  /**
   * Event handler for detecting changes in the text
   * @param text 
   */
  textChangeEvent(text: any) {
    // console.log('Text: ', text);
    // this.textChange.emit(text.data);
    // console.log('Textarea: ', (document.getElementById("editor3")).innerHTML);
    // this.scriptChange.emit(document.getElementById("editor3").innerHTML);
    this.saveScript.emit(this.currentScriptText);
  }

  /**
   * Toggle preview of screenplay
   */
  togglePreview(){
    this.preview = !this.preview;
    if (this.preview) {
      this.scriptChange.emit((<HTMLInputElement>document.getElementById("editor3")).value);
    }
  }

 /**
   * Edit title of the screenplay
   * @param docTitle The current title of the current screenplay
   */
  editName(docTitle) {
    const dialogRef = this._dialog.open(TitleDialogComponent, {
      data: {
        title: docTitle
      }
    });

    dialogRef.afterClosed().subscribe(newTitle => {
      if(!newTitle) {
        return;
      }
      this.titleChange.emit(newTitle);
    })
  }

  /**
   * TODO: print pdf of the current screenplay
   */
  printPdf() {
    window.print();
  }

}


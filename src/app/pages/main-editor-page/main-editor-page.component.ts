import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LocalStorage, StorageMap } from '@ngx-pwa/local-storage';
import { TextDocument } from 'src/app/interfaces/document';
import { ScriptDocument } from 'src/app/interfaces/script';
import { DocumentsService } from 'src/app/services/documents.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

declare var require: any;
const Elapsed = require('elapsed');

/** Enum for switching between views */
enum ActiveView {
  TextEditor = 1,
  ScriptEditor = 2
};

@Component({
  selector: 'app-main-editor-page',
  templateUrl: './main-editor-page.component.html',
  styleUrls: ['./main-editor-page.component.css']
})
export class MainEditorPageComponent {

  /** Helper functions to start timer */
  events: string[] = [];
  n: number = <any>setTimeout(function () { /* snip */ }, 2000);

  /** Declare enum constant and set initial view */
  ActiveView = ActiveView;
  activeView = ActiveView.TextEditor;

  /** Flags for saving/opening and showing the loaders/progress bars */
  opened: boolean;
  isSaving = false;
  isSaved = false;
  isOpening = false;
  saveTime: Date;
  elapsedTime: string;

  /** Set intial values for script and doc */
  currentTitle = '';
  currentText = '';
  currentScriptTitle = '';
  currentScriptText = '';
  textDocumentList: TextDocument[];
  currentTextDocument: TextDocument = null;
  scriptDocumentList: ScriptDocument[];
  currentScriptDocument: ScriptDocument = null;

  /** Placeholder value for newly created text files */
  placeHolderTextDoc = `
    <div style="font-style:italic;">
      <div style="color:orange">Welcome to Editron!</div>
      <br>
      <div style="color:darkcyan;text-align:end">A simple to use rich-text editor</div>
      <br>
      <div style="color:darkcyan;text-align:center">Just click here and start typing!</div>
      <br>
      <div style="text-align:left"><span style="color:dodgerblue">For optimal experience,</span>you can go fullscreen by pressing the F11 key on your keyboard</div>
    </div>
    `;

  /** Placeholder values for newly created screenplay files */
  placeHolderTextSCript = `INT. WORKSPACE - DAY/NIGHT
EDITRON
(smiling)
Welcome to Editron's Screenwriting area! Write your text in simple Fountain format.

You can also toggle the final preview of your script from the toolbar!

For optimal experience,you can go fullscreen by pressing the F11 key on your keyboard!`;

  /** Placeholder preview values for newly created screenplay files */
  placeHolderpreviewText =
    `<div _ngcontent-jmh-c8="">INT. WORKSPACE - DAY/NIGHT<br></div><div _ngcontent-jmh-c8=""><br></div><div _ngcontent-jmh-c8="">EDITRON</div><div _ngcontent-jmh-c8="">(smiling)</div><div _ngcontent-jmh-c8="">Welcome to Editron's Screenwriting area! Write your text in plain Fountain format!</div><div _ngcontent-jmh-c8=""><br></div><div _ngcontent-jmh-c8="">You can also toggle the final preview of your script from the toolbar.</div><div _ngcontent-jmh-c8=""><br></div><div _ngcontent-jmh-c8="">Go fullscreen by pressing the F11 key on your keyboard!</div><span _ngcontent-jmh-c8=""></span>`


    /**
     * Init component
     * @param _snackBar 
     * @param _documentService 
     * @param _storageService 
     */
  constructor(
    public _snackBar: MatSnackBar,
    private _documentService: DocumentsService,
    private _dialog: MatDialog
  ) {

    // Retrieve all text documents
    this.textDocumentList = [];
    this.textDocumentList = this._documentService.getDocuments();
    this.currentTextDocument = this._documentService.loadCurrentDoc();

    // Check if there is one present in localstorage, otherwise create a new one
    if (!this.currentTextDocument) {
      let id = uuidv4();
      let textDocument: TextDocument = {
        id: id,
        title: 'doc-' + id.substring(0, 6),
        text: this.placeHolderTextDoc,
        updatedAt: new Date().toString()
      }
      this.currentText = textDocument.text;
      this.currentTitle = textDocument.title;
      this.currentTextDocument = textDocument;
    } else {
      this.currentText = this.currentTextDocument.text;
      this.currentTitle = this.currentTextDocument.title;
    }
    this._documentService.setCurrentDoc(this.currentTextDocument);

    // Create list of text documents
    if (!this.textDocumentList) {
      this.textDocumentList = [];
      this.textDocumentList.push(this.currentTextDocument);
      localStorage.setItem('textDocumentList', JSON.stringify(this.textDocumentList));
    }

    // Retrieve all script documents
    this.scriptDocumentList = [];
    this.scriptDocumentList = this._documentService.getScripts();
    this.currentScriptDocument = this._documentService.loadCurrentScript();

    // Check if there is one present in localstorage, otherwise create a new one
    if (!this.currentScriptDocument) {
      let id = uuidv4();
      let scriptDocument: ScriptDocument = {
        id: id,
        title: 'scr-' + id.substring(0, 6),
        text: this.placeHolderTextSCript,
        updatedAt: new Date().toString(),
        previewText: 'this.placeHolderpreviewText'
      }
      this.currentScriptText = scriptDocument.text;
      this.currentScriptTitle = scriptDocument.title;
      this.currentScriptDocument = scriptDocument;
    } else {
      this.currentScriptText = this.currentScriptDocument.text;
      this.currentScriptTitle = this.currentScriptDocument.title;
    }
    this._documentService.setCurrentScript(this.currentScriptDocument);

    // Create list of script documents
    if (!this.scriptDocumentList) {
      this.scriptDocumentList = [];
      this.scriptDocumentList.push(this.currentScriptDocument);
      localStorage.setItem('scriptDocumentList', JSON.stringify(this.scriptDocumentList));
    }
  }

  /**
   * Event handler to detect changes to the screenplay text
   * @param text The updated text
   */
  scriptChange(text: string) {
    const scriptLines = text.split('\n');

    for (let j = 0; j < scriptLines.length; j++) {
      if (scriptLines.length === 1) {
        scriptLines[j] = formatLine(scriptLines[j], '');
      } else {
        scriptLines[j] = formatLine(scriptLines[j], scriptLines[j - 1]);
      }
    }

    this.currentScriptDocument.updatedAt = new Date().toString();
    this.currentScriptDocument.text = text;

    this.currentScriptDocument.previewText = scriptLines.join('');
    this._documentService.updateScript(this.currentScriptDocument);
  }

  /**
   * Event handler for changing the text of a Text document
   * @param text 
   */
  textChange(text) {
    this.isSaved = false;
    this.isSaving = true;
    clearTimeout(this.n);
    this.n = <any>setTimeout(() => {
      this.isSaving = false;
      this.isSaved = true;

      this.currentTextDocument.text = text;
      this.currentTextDocument.updatedAt = new Date().toString();
      const elapsedTime = new Elapsed(this.currentTextDocument.updatedAt, new Date());
      this.elapsedTime = elapsedTime.optimal;
      this._documentService.updateDoc(this.currentTextDocument);
    }, 2000);
  }

  /**
   * Event handler for saving a script document
   * @param text 
   */
  saveScript(text) {
    this.isSaved = false;
    this.isSaving = true;
    clearTimeout(this.n);
    this.n = <any>setTimeout(() => {
      this.isSaving = false;
      this.isSaved = true;

      this.currentScriptDocument.text = text;
      this.currentScriptDocument.updatedAt = new Date().toString();
      const elapsedTime = new Elapsed(this.currentTextDocument.updatedAt, new Date());
      this.elapsedTime = elapsedTime.optimal;
      this._documentService.updateScript(this.currentScriptDocument);
    }, 2000);
  }

  /**
   * Event handler for changing the title of the document
   * @param title 
   */
  titleChange(title: string) {
    this.currentTextDocument.title = title;
    this.currentTitle = title;
    this.currentTextDocument.updatedAt = new Date().toString();
    const elapsedTime = new Elapsed(this.currentTextDocument.updatedAt, new Date());
    this.elapsedTime = elapsedTime.optimal;
    this._documentService.updateDoc(this.currentTextDocument);
    this.textDocumentList = this._documentService.getDocuments();
  }

  /**
   * Event handler for creating a new document
   */
  createDoc() {
    let id = uuidv4();
    let newTextDocument: TextDocument = {
      id: id,
      title: 'doc-' + id.substring(0, 6),
      text: this.placeHolderTextDoc,
      updatedAt: new Date().toString()
    }
    this.textDocumentList.push(newTextDocument);
    localStorage.setItem('textDocumentList', JSON.stringify(this.textDocumentList));
  }

  /**
   * Event handler for creating a new Screenplay
   */
  createScript() {
    let id = uuidv4();
    let newScrDocument: ScriptDocument = {
      id: id,
      title: 'scr-' + id.substring(0, 6),
      text: this.placeHolderTextSCript,
      updatedAt: new Date().toString(),
      previewText: ''
    }
    this.scriptDocumentList.push(newScrDocument);
    localStorage.setItem('scriptDocumentList', JSON.stringify(this.scriptDocumentList));
  }

  /**
   * Event handler for changing the current document
   * @param doc The doc to be openend
   */
  openDoc(doc: TextDocument) {
    this.currentTextDocument = null;
    this.currentText = null;
    this.currentTitle = null;
    this.isOpening = true;
    this.isSaved = false;
    this.isSaving = true;
    clearTimeout(this.n);
    this.n = <any>setTimeout(() => {
      this.isSaved = true;
      this.isSaving = false;
      this.isOpening = false;
      this.currentTextDocument = doc;
      this.currentText = doc.text;
      this.currentTitle = doc.title;
      localStorage.setItem('currentTextDocument', JSON.stringify(doc));
    }, 500);
  }

  /**
   * Event handler for editing the title of a screenplay
   * @param title 
   */
  scrTitleChange(title: string) {
    this.currentScriptDocument.title = title;
    this.currentScriptTitle = title;
    this.currentScriptDocument.updatedAt = new Date().toString();
    const elapsedTime = new Elapsed(this.currentScriptDocument.updatedAt, new Date());
    this.elapsedTime = elapsedTime.optimal;
    this._documentService.updateScript(this.currentScriptDocument);
    this.scriptDocumentList = null;
    this.scriptDocumentList = this._documentService.getScripts();
  }

  /**
   * Event handler for opening another screenplay
   * @param scr 
   */
  openScr(scr: ScriptDocument) {
    this.currentScriptDocument = null;
    this.currentScriptText = null;
    this.currentScriptTitle = null;
    this.isOpening = true;
    this.isSaved = false;
    this.isSaving = true;
    clearTimeout(this.n);
    this.n = <any>setTimeout(() => {
      this.isSaved = true;
      this.isSaving = false;
      this.isOpening = false;
      this.currentScriptDocument = scr;
      this.currentScriptText = scr.text;
      this.currentScriptTitle = scr.title;
      localStorage.setItem('currentScriptDocument', JSON.stringify(this.currentScriptDocument));
    }, 500);
  }

  /**
   * Toggle switching between TextEditor or ScriptEditor
   */
  toggleEditor() {
    if (this.activeView === ActiveView.ScriptEditor) {
      this.activeView = ActiveView.TextEditor
    } else {
      this.activeView = ActiveView.ScriptEditor;
    }
  }

  /**
   * Handle doc deletion
   * @param doc to be deleted
   */
  delDoc(doc: TextDocument) {
    if (doc.id === this.currentTextDocument.id) {
      this._snackBar.open('Cannot delete an opened file', 'Close');
      return;
    }

    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: doc.title
      }
    });

    dialogRef.afterClosed().subscribe(selection => {
      if(!selection) {
        return;
      }
      this._snackBar.open('File deleted', 'Close');
      const index = this.textDocumentList.findIndex(textDoc => textDoc.id === doc.id);
      this.textDocumentList.splice(index, 1);
      localStorage.setItem('textDocumentList', JSON.stringify(this.textDocumentList));

    })
  }

  /**
   * Handle script deletion
   * @param doc to be deleted
   */
  delScr(doc: ScriptDocument) {
    if (doc.id === this.currentScriptDocument.id) {
      this._snackBar.open('Cannot delete an opened file', 'Close');
      return;
    }

    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: doc.title
      }
    });

    dialogRef.afterClosed().subscribe(selection => {
      if(!selection) {
        return;
      }
      this._snackBar.open('File deleted', 'Close');
      const index = this.scriptDocumentList.findIndex(textDoc => textDoc.id === doc.id);
      this.scriptDocumentList.splice(index, 1);
      localStorage.setItem('scriptDocumentList', JSON.stringify(this.scriptDocumentList));

    })
  }

}

/**
 * HELPER FUNCTION TO PARSE A SCREENPLAY TEXT
 * @param currentLine The current line being parsed
 * @param prevLine The previous line parsed
 */
function formatLine(currentLine: string, prevLine?: string): string {
  // console.error('PREVI LINE: ', prevLine);
  // console.warn('CURRENT LINE: ', currentLine);
  if (currentLine.startsWith('INT.') || currentLine.startsWith('int.') || currentLine.startsWith('EXT.') || currentLine.startsWith('ext.')) {
    console.info('SCENE');
    currentLine = '<div id="scene" style="font-weight: 600;">' + currentLine + '</div>'
  }
  else if (currentLine && currentLine === currentLine.toLocaleUpperCase() && !currentLine.includes('scene')) {
    console.info('CHARACTER');
    currentLine = '<div id="character"style="margin-left: 3.7in">' + currentLine + '</div>';
  }
  else if ((prevLine && prevLine.includes('character')) && currentLine.startsWith('(')) {
    console.info('PARENTHETICAL');
    currentLine = '<div id="paranthetical" style="margin-left: 3.1in;width:170px;display:inline-block;overflow-wrap:anywhere;">' + currentLine + '</div>';
  }
  else if ((prevLine && prevLine.includes('paranthetical')) || (prevLine && prevLine.includes('character'))) {
    console.info('DIALOG');
    currentLine = '<div id="dialogue" style="margin-left: 2.5in;width:320px;display:inline-block;overflow-wrap:anywhere;">' + currentLine + '</div>';
  }
  else if (currentLine.endsWith('TO:')) {
    console.info('TRANSITION');
    currentLine = '<div id="transition" style="text-align:right;">' + currentLine + '</div>';
  } else if (prevLine && (!prevLine.includes('scene') || !prevLine.includes('character') || !prevLine.includes('parenthetical') || !prevLine.includes('dialog')) || !prevLine.includes('transition')) {
    console.info('ACTION');
    currentLine = '<div id="action" style="padding-top: 10px;">' + currentLine + '</div>';
  } else if (currentLine === '' || !currentLine) {
    console.info('blank');
    currentLine = '<div>' + currentLine + '</div>';
  }
  return currentLine;
}

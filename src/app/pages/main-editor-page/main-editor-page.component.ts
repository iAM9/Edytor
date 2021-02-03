import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LocalStorage, StorageMap } from '@ngx-pwa/local-storage';
import { TextDocument } from 'src/app/interfaces/document';
import { DocumentsService } from 'src/app/services/documents.service';
import { v4 as uuidv4 } from 'uuid';

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
  n: number = <any>setTimeout(function () { /* snip */ console.warn('init'); }, 2000);

  isSaving = false;
  isSaved = false;
  saveTime: Date;
  elapsedTime: string;

  currentTitle = '';
  currentText = '';

  placeHolderText = `
    <div style="opacity:0.5;font-style:italic;">
      <div>Welcome to Editron!</div>
      <br>
      <div>A simple to use rich-text editor</div>
      <br>
      <div>For optimal experience, you can go fullscreen by pressing the F11 key on your keyboard</div>
    </div>
    `;

  textDocumentList: TextDocument[];
  currentTextDocument: TextDocument;

  constructor(
    public _snackBar: MatSnackBar,
    private _documentService: DocumentsService,
    private _storageService: LocalStorage
  ) {

    this.textDocumentList = [];
    this.textDocumentList = this._documentService.getDocuments();
    this.currentTextDocument = this._documentService.loadCurrentDoc();

    if (!this.currentTextDocument) {
      let id = uuidv4();
      let textDocument: TextDocument = {
        id: id,
        title: 'doc-' + id.substring(0,6),
        text: this.placeHolderText,
        updatedAt: ''
      }
      this.currentText = '';
      this.currentTitle = textDocument.title;
      this.currentTextDocument = textDocument;
      this._documentService.setCurrentDoc(this.currentTextDocument);
    } else {
      this.currentText = this.currentTextDocument.text;
      this.currentTitle = this.currentTextDocument.title;
    }

    if (!this.textDocumentList) {
      this.textDocumentList = [];
      console.log('EMPY:', this.textDocumentList);
      this.textDocumentList.push(this.currentTextDocument);
      localStorage.setItem('textDocumentList', JSON.stringify(this.textDocumentList));
    }
    console.log('CUrrenttextdoc: ', this.currentTextDocument);
  }

  ngOnInit() { }

  /**
   * Event handler for changing the text of the document
   * @param text 
   */
  textChange(text) {
    console.log('any: ', text);
    this.isSaved = false;
    this.isSaving = true;
    clearTimeout(this.n);
    this.n = <any>setTimeout(() => {
      console.error('CHANGE');
      this.isSaving = false;
      this.isSaved = true;

      this.currentTextDocument.text = text;
      this.currentTextDocument.updatedAt = new Date().toString();
      // this.currentText = text;
      const elapsedTime = new Elapsed(this.currentTextDocument.updatedAt, new Date());
      console.log
      this.elapsedTime = elapsedTime.optimal;
      console.error('TIME PASSED: ', elapsedTime.optimal);
      console.log('This.currentTextDoc: ', this.currentTextDocument);
      this._documentService.updateDoc(this.currentTextDocument);
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
    console.error('TIME PASSED: ', elapsedTime.optimal);
    console.log('This.currentTextDoc: ', this.currentTextDocument);
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
      title: 'doc-' + id.substring(0,6),
      text: this.placeHolderText,
      updatedAt: new Date().toString()
    }
    this.textDocumentList.push(newTextDocument);
    localStorage.setItem('textDocumentList', JSON.stringify(this.textDocumentList));
  }

  /**
   * Event handler for changing the current document
   * @param doc The doc to be openend
   */
  openDoc(doc: TextDocument) {
    console.log('Opening doc: ', doc);
    localStorage.setItem('currentTextDocument', JSON.stringify(doc));
    this.currentTextDocument = doc;
    this.currentText = doc.text;
    this.currentTitle = doc.title;
  }

}

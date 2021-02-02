import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LocalStorage, StorageMap } from '@ngx-pwa/local-storage';
import { TextDocument } from 'src/app/interfaces/document';
import { DocumentsService } from 'src/app/services/documents.service';
import { v4 as uuidv4 } from 'uuid';

declare var require: any;
const Elapsed = require('elapsed');

export interface Section {
  name: string;
  updated: Date;
}

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

  textDocumentList: TextDocument[];
  currentTextDocument: TextDocument;

  constructor(
    public _snackBar: MatSnackBar,
    private _documentService: DocumentsService,
    private _storageService: LocalStorage
  ) {
    // this.textDocumentList = {
    //   documents: []
    // };
    this.textDocumentList = [];
    this.textDocumentList = this._documentService.getDocuments();
    this.currentTextDocument = this._documentService.loadCurrentDoc();

    if (!this.currentTextDocument) {
      let id = uuidv4();
      let textDocument: TextDocument = {
        id: id,
        title: 'Untitled-' + id.substring(0,),
        text: '',
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
   * 
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
      const elapsedTime = new Elapsed(this.currentTextDocument.updatedAt, new Date()).optimal;
      this.elapsedTime = elapsedTime.optimal;
      console.error('TIME PASSED: ', elapsedTime.optimal);
      console.log('This.currentTextDoc: ', this.currentTextDocument);
      this._documentService.updateDoc(this.currentTextDocument);
    }, 2000);
  }

  titleChange(title: string) {
    this.currentTextDocument.title = title;
    this.currentTitle = title;
    this.currentTextDocument.updatedAt = new Date().toString();
    const elapsedTime = new Elapsed(this.currentTextDocument.updatedAt, new Date()).optimal;
    this.elapsedTime = elapsedTime.optimal;
    console.error('TIME PASSED: ', elapsedTime.optimal);
    console.log('This.currentTextDoc: ', this.currentTextDocument);
    this._documentService.updateDoc(this.currentTextDocument);
  }

}

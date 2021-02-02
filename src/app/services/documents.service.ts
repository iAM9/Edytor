import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TextDocument } from '../interfaces/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor() { }

  loadCurrentDoc(): TextDocument {
    return JSON.parse(localStorage.getItem('currentTextDocument'));
  }

  getDocuments(): TextDocument[] {
    return JSON.parse(localStorage.getItem('textDocumentList'));
  }

  setCurrentDoc(currentTextDocument) {
    localStorage.setItem('currentTextDocument', JSON.stringify(currentTextDocument));
  }

  updateDoc(currentTextDocument) {
    let textDocumentList = this.getDocuments();
    textDocumentList.find(doc => {
      if (doc.id === currentTextDocument.id) {
        console.log('doc: ', doc);
        console.log('currentTextDoc: ', currentTextDocument);
        doc.title = currentTextDocument.title;
        doc.text = currentTextDocument.text;
        doc.updatedAt = currentTextDocument.updatedAt;
      }
    });
    localStorage.setItem('textDocumentList', JSON.stringify(textDocumentList));
    localStorage.setItem('currentTextDocument', JSON.stringify(currentTextDocument));
  }
}

import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TextDocument } from '../interfaces/document';
import { ScriptDocument } from '../interfaces/script';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor() { }

  /**
   * Load RTF doc
   */
  loadCurrentDoc(): TextDocument {
    return JSON.parse(localStorage.getItem('currentTextDocument'));
  }

  /**
   * Load screenplay script
   */
  loadCurrentScript(): ScriptDocument {
    return JSON.parse(localStorage.getItem('currentScriptDocument'));
  }

  /**
   * Retrieve all RTF docs
   */
  getDocuments(): TextDocument[] {
    return JSON.parse(localStorage.getItem('textDocumentList'));
  }

  /**
   * Retrieve all screenplay scripts
   */
  getScripts(): ScriptDocument[] {
    return JSON.parse(localStorage.getItem('scriptDocumentList'));
  }

  /**
   * Set the current doc
   * @param currentTextDocument The doc to be set as current
   */
  setCurrentDoc(currentTextDocument) {
    localStorage.setItem('currentTextDocument', JSON.stringify(currentTextDocument));
  }

  /**
   * Set the current script
   * @param currentScriptDocument The script to be set as current
   */
  setCurrentScript(currentScriptDocument) {
    localStorage.setItem('currentScriptDocument', JSON.stringify(currentScriptDocument));
  }

  /**
   * Update the doc
   * @param currentTextDocument The updated doc
   */
  updateDoc(currentTextDocument) {
    let textDocumentList = this.getDocuments();
    textDocumentList.find(doc => {
      if (doc.id === currentTextDocument.id) {
        doc.title = currentTextDocument.title;
        doc.text = currentTextDocument.text;
        doc.updatedAt = currentTextDocument.updatedAt;
      }
    });
    localStorage.setItem('textDocumentList', JSON.stringify(textDocumentList));
    localStorage.setItem('currentTextDocument', JSON.stringify(currentTextDocument));
  }

  /**
   * Update the script
   * @param currentScriptDocument The updated script
   */
  updateScript(currentScriptDocument) {
    let scriptDocumentList = this.getScripts();
    scriptDocumentList.find(doc => {
      if (doc.id === currentScriptDocument.id) {
        doc.title = currentScriptDocument.title;
        doc.text = currentScriptDocument.text;
        doc.updatedAt = currentScriptDocument.updatedAt;
      }
    });
    localStorage.setItem('scriptDocumentList', JSON.stringify(scriptDocumentList));
    localStorage.setItem('currentScriptDocument', JSON.stringify(currentScriptDocument));
  }
}

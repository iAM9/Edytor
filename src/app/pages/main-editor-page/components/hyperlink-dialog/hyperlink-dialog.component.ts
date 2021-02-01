import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-hyperlink-dialog',
  templateUrl: './hyperlink-dialog.component.html',
  styleUrls: ['./hyperlink-dialog.component.css']
})
export class HyperlinkDialogComponent {

  public value = '';

  constructor(
    public dialogRef: MatDialogRef<HyperlinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      string: string
    }) {}

    cancel() {
      this.dialogRef.close();
    }

}

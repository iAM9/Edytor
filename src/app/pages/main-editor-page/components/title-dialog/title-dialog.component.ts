import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-title-dialog',
  templateUrl: './title-dialog.component.html',
  styleUrls: ['./title-dialog.component.css']
})
export class TitleDialogComponent {

  public value = '';

  constructor(
    public dialogRef: MatDialogRef<TitleDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string
    }) {}

    cancel() {
      this.dialogRef.close();
    }

}



import { NgModule } from '@angular/core';
import { MainEditorPageComponent } from './main-editor-page/main-editor-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TextEditorComponent } from './main-editor-page/components/text-editor/text-editor.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatListModule, MatMenuModule, MatSelectModule, MatSnackBarModule, MatTabsModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TitleDialogComponent } from './main-editor-page/components/title-dialog/title-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { SafePipe } from '../pipes/safe.pipe';


@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatListModule,
  ],
  declarations: [
    MainEditorPageComponent,
    TextEditorComponent,
    TitleDialogComponent,
    SafePipe
  ],
  entryComponents: [TitleDialogComponent],
})
export class PagesModule { }

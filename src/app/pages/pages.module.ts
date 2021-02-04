

import { NgModule } from '@angular/core';
import { MainEditorPageComponent } from './main-editor-page/main-editor-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TextEditorComponent } from './main-editor-page/components/text-editor/text-editor.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatSelectModule, MatSnackBarModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TitleDialogComponent } from './main-editor-page/components/title-dialog/title-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { SafePipe } from '../pipes/safe.pipe';
import { ScriptPreviewerComponent } from './main-editor-page/components/script-previewer/script-previewer.component';
import { ScriptEditorComponent } from './main-editor-page/components/script-editor/script-editor.component';
import { ConfirmDialogComponent } from './main-editor-page/components/confirm-dialog/confirm-dialog.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


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
    MatTooltipModule,
    MatProgressBarModule
  ],
  declarations: [
    MainEditorPageComponent,
    TextEditorComponent,
    TitleDialogComponent,
    SafePipe,
    ScriptPreviewerComponent,
    ScriptEditorComponent,
    ConfirmDialogComponent,
    LandingPageComponent
  ],
  entryComponents: [
    TitleDialogComponent,
    ConfirmDialogComponent
  ],
})
export class PagesModule { }

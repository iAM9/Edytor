

import { NgModule } from '@angular/core';
import { MainEditorPageComponent } from './main-editor-page/main-editor-page.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TextEditorComponent } from './main-editor-page/components/text-editor/text-editor.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatSnackBarModule, MatTabsModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HyperlinkDialogComponent } from './main-editor-page/components/hyperlink-dialog/hyperlink-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
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
      CommonModule
  ],
  declarations: [
    MainEditorPageComponent,
    TextEditorComponent,
    HyperlinkDialogComponent
  ],
  entryComponents: [HyperlinkDialogComponent],
})
export class PagesModule { }

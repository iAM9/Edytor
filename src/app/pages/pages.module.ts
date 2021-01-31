

import { NgModule } from '@angular/core';
import { MainEditorPageComponent } from './main-editor-page/main-editor-page.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TextEditorComponent } from './main-editor-page/components/text-editor/text-editor.component';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material';


@NgModule({
  declarations: [
    MainEditorPageComponent,
    TextEditorComponent
  ],
  imports: [
      MatSidenavModule,
      MatInputModule,
      MatTabsModule
  ],
})
export class PagesModule { }

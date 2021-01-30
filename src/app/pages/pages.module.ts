

import { NgModule } from '@angular/core';
import { MainEditorPageComponent } from './main-editor-page/main-editor-page.component';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    MainEditorPageComponent
  ],
  imports: [
      MatSidenavModule
  ],
})
export class PagesModule { }

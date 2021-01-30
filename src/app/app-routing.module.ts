import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainEditorPageComponent } from './pages/main-editor-page/main-editor-page.component';



const routes: Routes = [
  {
    path: 'editor',
    component: MainEditorPageComponent
  },
  {
    path: '',
    redirectTo: 'editor',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

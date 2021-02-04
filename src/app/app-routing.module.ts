import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MainEditorPageComponent } from './pages/main-editor-page/main-editor-page.component';



const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: 'editor',
    component: MainEditorPageComponent
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

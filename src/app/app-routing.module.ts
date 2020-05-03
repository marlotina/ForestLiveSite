import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'login', loadChildren: () => import('./account/login/login.module').then(m => m.LoginModule) },
  { path: 'forgotpassword', loadChildren: () => import('./account/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordModule) },
  { path: 'signup', loadChildren: () => import('./account/signup/signup.module').then(m => m.SignupModule) },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

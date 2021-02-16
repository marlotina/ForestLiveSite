import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helper/auth.guard';


const routes: Routes = [
  { path: 'about', loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule) },
  { path: 'login', loadChildren: () => import('./components/account/login/login.module').then(m => m.LoginModule) },
  { path: 'forgotpassword', loadChildren: () => import('./components/account/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordModule) },
  { path: 'signup', loadChildren: () => import('./components/account/signup/signup.module').then(m => m.SignupModule) },
  { path: 'confirmemail', loadChildren: () => import('./components/account/confirmemail/confirmemail.module').then(m => m.ConfirmemailModule) },
  { path: 'resetpassword', loadChildren: () => import('./components/account/resetpassword/resetpassword.module').then(m => m.ResetpasswordModule) },
  { path: 'userProfile', loadChildren: () => import('./components/user/user-profile/user-profile.module').then(m => m.UserProfileModule), 
      canActivate: [AuthGuard]  },
  { path: 'userpage/:id', loadChildren: () => import('./components/userpage/landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'post/:id', loadChildren: () => import('./components/postpage/post-page/post-page.module').then(m => m.PostPageModule) },
  { path: 'withoutspecie', loadChildren: () => import('./components/pendings/without-specie-page/without-specie-page.module').then(m => m.WithoutSpeciePageModule) },
  { path: 'confirmspecie', loadChildren: () => import('./components/pendings/confirm-page/confirm-page.module').then(m => m.ConfirmPageModule) },
  { path: '**', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
  { path: 'createPost/:type', loadChildren: () => import('./components/user/create-post/create-post.module').then(m => m.CreatePostModule), 
      canActivate: [AuthGuard]  },
  { path: 'userpage/:userId', loadChildren: () => import('./components/userpage/landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'userpage/:userId/:labelId', loadChildren: () => import('./components/userpage/landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'birdpage/:specieId', loadChildren: () => import('./components/search/birdpage/bird-landing-page.module').then(m => m.BirdLandingPageModule) },
  { path: 'birdpage', loadChildren: () => import('./components/search/birdpage/bird-landing-page.module').then(m => m.BirdLandingPageModule) },
  { path: 'usermappage/:userId', loadChildren: () => import('./components/userpage/user-map-page/user-map-page.module').then(m => m.UserMapPageModule) },
  { path: ':userId/:postId', loadChildren: () => import('./components/postpage/post-page/post-page.module').then(m => m.PostPageModule) },
  { path: 'usercomments', loadChildren: () => import('./components/user/user-comments/user-comments.module').then(m => m.UserCommentsModule), 
      canActivate: [AuthGuard]  },
  { path: 'uservotes', loadChildren: () => import('./components/user/user-votes/user-votes.module').then(m => m.UserVotesModule), 
      canActivate: [AuthGuard]  },
  { path: 'withoutspecie', loadChildren: () => import('./components/search/without-specie-page/without-specie-page.module').then(m => m.WithoutSpeciePageModule) },
  { path: 'searchpage', loadChildren: () => import('./components/search/search-page/search-page.module').then(m => m.SearchPageModule) },
  { path: 'userlabel', loadChildren: () => import('./components/user/user-labels/user-labels.module').then(m => m.UserLabelsModule), 
    canActivate: [AuthGuard]  },
  { path: 'landingusers', loadChildren: () => import('./components/landing-users/landing-users.module').then(m => m.LandingUsersModule), 
    canActivate: [AuthGuard]  },
  { path: 'lastposts', loadChildren: () => import('./components/lastposts/last-posts.module').then(m => m.LastPostsModule) },
  { path: 'userfollower', loadChildren: () => import('./components/user/follower/follower.module').then(m => m.FollowerModule) },
  { path: 'userfollow', loadChildren: () => import('./components/user/follow/follow.module').then(m => m.FollowModule) },
  { path: '**', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

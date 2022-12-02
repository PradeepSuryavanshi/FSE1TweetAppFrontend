import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './body/user/forgotpassword/forgotpassword.component';
import { HomeComponent } from './body/tweet/home/home.component';
import { LoginComponent } from './body/user/login/login.component';
import { RegisterComponent } from './body/user/register/register.component';
import { ResetpasswordComponent } from './body/user/resetpassword/resetpassword.component';
import{
  AuthGuardService as AuthGuard
} from './shared/services/authguard/auth-guard.service'
import { PeoplesComponent } from './body/user/peoples/peoples.component';
import { SearchuserComponent } from './body/user/searchuser/searchuser.component';
import { ListtweetsComponent } from './body/tweet/listtweets/listtweets.component';
import { AddtweetComponent } from './body/tweet/addtweet/addtweet.component';
import { GettweetsofComponent } from './body/tweet/gettweetsof/gettweetsof.component';
import { MytweetsComponent } from './body/tweet/mytweets/mytweets.component';
import { ViewcommentsComponent } from './body/tweet/viewcomments/viewcomments.component';
import { EdittweetComponent } from './body/tweet/mytweets/edittweet/edittweet.component';

const routes: Routes = [
  { path:'',redirectTo:'/home',pathMatch:'full'},

  { path:'register', component: RegisterComponent},
  { path:'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'forgotpassword', component: ForgotpasswordComponent},
  { path: 'community', component: PeoplesComponent},
  { path: 'searchuser', component: SearchuserComponent},
  { path: 'tweets', component: ListtweetsComponent},
  { path: 'addtweet/:username', component: AddtweetComponent,canActivate:[AuthGuard]},
  { path: 'tweetsof', component: GettweetsofComponent},
  { path: 'mytweets', component: MytweetsComponent,canActivate:[AuthGuard]},
  { path: 'comments/:id', component: ViewcommentsComponent,canActivate:[AuthGuard]},
  { path: 'edittweet/:id', component: EdittweetComponent,canActivate:[AuthGuard]},
  { path: 'resetpassword/:username', component: ResetpasswordComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

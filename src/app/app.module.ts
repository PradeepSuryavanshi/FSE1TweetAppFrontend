import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Navigators/header/header.component';
import { LoginComponent } from './body/user/login/login.component';
import { RegisterComponent } from './body/user/register/register.component';
import { HomeComponent } from './body/tweet/home/home.component';
import { ForgotpasswordComponent } from './body/user/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './body/user/resetpassword/resetpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthserviceService } from './shared/services/authservice/authservice.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ListtweetsComponent } from './body/tweet/listtweets/listtweets.component';
import { AuthinterceptorInterceptor } from './shared/interceptors/authinterceptor/authinterceptor.interceptor';
import { PeoplesComponent } from './body/user/peoples/peoples.component';
import { SearchuserComponent } from './body/user/searchuser/searchuser.component';
import { AddtweetComponent } from './body/tweet/addtweet/addtweet.component';
import { GettweetsofComponent } from './body/tweet/gettweetsof/gettweetsof.component';
import { TweetmenuheaderComponent } from './Navigators/tweetmenuheader/tweetmenuheader.component';
import { MytweetsComponent } from './body/tweet/mytweets/mytweets.component';
import { ViewcommentsComponent } from './body/tweet/viewcomments/viewcomments.component';
import { EdittweetComponent } from './body/tweet/mytweets/edittweet/edittweet.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ListtweetsComponent,
    PeoplesComponent,
    SearchuserComponent,
    AddtweetComponent,
    GettweetsofComponent,
    TweetmenuheaderComponent,
    MytweetsComponent,
    ViewcommentsComponent,
    EdittweetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthserviceService,
    { provide:HTTP_INTERCEPTORS, useClass: AuthinterceptorInterceptor, multi:true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

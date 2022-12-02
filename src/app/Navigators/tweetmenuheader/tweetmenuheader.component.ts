import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/appModels/user.Model';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-tweetmenuheader',
  templateUrl: './tweetmenuheader.component.html',
  styleUrls: ['./tweetmenuheader.component.css']
})
export class TweetmenuheaderComponent implements OnInit {

  loggedIn!:user;
  username:string = "";
  constructor(private authService:AuthserviceService,private router:Router) { }

  ngOnInit(): void {
    
  }

  isLoggedIn() {
    if(localStorage.getItem('user') != null){
      this.loggedIn= JSON.parse(localStorage.getItem('user')!);
      this.username= this.loggedIn.email;
    }
    return this.authService.isAuthenticated();
  }

  PostTweet(){
    this.router.navigate(['/addtweet',this.username]);
  }

}

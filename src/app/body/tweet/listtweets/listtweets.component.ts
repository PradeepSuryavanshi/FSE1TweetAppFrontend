import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { tweet } from 'src/app/appModels/tweet.Model';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-listtweets',
  templateUrl: './listtweets.component.html',
  styleUrls: ['./listtweets.component.css']
})
export class ListtweetsComponent implements OnInit {

  error: string = "";
  tweets: Array<tweet> = [];
  constructor(private authservice:AuthserviceService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllTweets();
  }

  isLoggedIn() {
    return this.authservice.isAuthenticated();
  }

  GetAllTweets(){
    this.authservice.GetAllTweets().subscribe(
      (res:any)=>{
        console.log(res)
        this.tweets=res;
        console.log(this.tweets);
      },
      (errorRes)=>{
        this.error = errorRes.error.message;
        alert(this.error);
      }
    );
  }

  Liked(username : string, tweetId : number){
 
    this.authservice.LikeTweet(username,tweetId).subscribe(
      (res)=>{
        console.log(res);
this.GetAllTweets();
      },
      (errorRes)=>{
        this.error = errorRes.error.message;
        alert(this.error);
        console.log(errorRes);
      });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
}

}

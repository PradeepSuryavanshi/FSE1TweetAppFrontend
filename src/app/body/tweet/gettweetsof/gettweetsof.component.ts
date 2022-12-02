import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tweet } from 'src/app/appModels/tweet.Model';
import { user } from 'src/app/appModels/user.Model';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-gettweetsof',
  templateUrl: './gettweetsof.component.html',
  styleUrls: ['./gettweetsof.component.css']
})
export class GettweetsofComponent implements OnInit {
  error: string = "";
  tweets: Array<tweet> = [];
  loggedinuser!: user;
  input: string = "";
  constructor(private authservice: AuthserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.authservice.isAuthenticated();
  }

  GetAllTweetsof(username: string) {
    this.authservice.GetAllTweetsof(username).subscribe(
      (res: any) => {
        console.log(res)
        this.tweets = res;
        console.log(this.tweets);
      },
      (errorRes) => {
        this.error = errorRes.error.message;
        this.tweets = [];
        alert(this.error);
      }
    );
  }

  Liked(username: string, tweetId: number) {

    this.authservice.LikeTweet(username, tweetId).subscribe(
      (res) => {
        console.log(res);
        this.GetAllTweetsof(username);
      },
      (errorRes) => {
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


import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { tweet } from 'src/app/appModels/tweet.Model';
import { user } from 'src/app/appModels/user.Model';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-mytweets',
  templateUrl: './mytweets.component.html',
  styleUrls: ['./mytweets.component.css']
})
export class MytweetsComponent implements OnInit {

  error: string = "";
  reply:boolean = false;
  tweets: Array<tweet> = [];
  passtweet!: tweet;
  editselected: boolean = false;
  loggedinuser: user = JSON.parse(localStorage.getItem('user')!);
  constructor(private authservice: AuthserviceService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllTweetsof(this.loggedinuser.email);
  }

  isLoggedIn() {
    return this.authservice.isAuthenticated();
  }

  GetAllTweetsof(username: string) {
    this.authservice.GetAllTweetsof(username).subscribe(
      (res: any) => {
        console.log(res)
        this.tweets = res;
        //this.reloadCurrentRoute();
        console.log(this.tweets);
      },
      (errorRes) => {
        this.error = errorRes.error.message;
        this.tweets = [];
        alert(this.error);
      }
    );
  }

  EditTweet(tweettobeedited: tweet) {
    console.log(tweettobeedited);
    this.editselected = true;
    this.passtweet = tweettobeedited;
  }

  IsEdited($event: any) {
    console.log("event");
    this.editselected = false;
    this.GetAllTweetsof(this.loggedinuser.email);
  }

  IsReply(result:boolean){
    this.reply = result;
    console.log(result);
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

  DeleteTweet(id: number) {
    this.authservice.DeleteTweet(id, this.loggedinuser.email).subscribe(
      (res) => {
        console.log(res);
        this.GetAllTweetsof(this.loggedinuser.email);
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


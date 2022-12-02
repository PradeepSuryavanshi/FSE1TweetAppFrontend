import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tweet } from 'src/app/appModels/tweet.Model';
import { user } from 'src/app/appModels/user.Model';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-viewcomments',
  templateUrl: './viewcomments.component.html',
  styleUrls: ['./viewcomments.component.css']
})
export class ViewcommentsComponent implements OnInit {

  commentForm!: FormGroup;
  submitted = false;
  successbox = false;
  errorbox = false;
  error: string = "";
  email: string = "";
  loggedIn!: user;
  id!: number;
  tweets: Array<tweet> = [];
  clicked: boolean = false;
  constructor(private authservice: AuthserviceService, private rout: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.rout.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')!;
    });

    this.isLoggedIn();
    console.log(this.email);

    this.commentForm = new FormGroup({
      'email': new FormControl({ value: this.email, disabled: true }, [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      'message': new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      'tag': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'repliedto': new FormControl(this.id),
      'postedon': new FormControl(new Date())
    });

    console.log(this.id);
    this.isLoggedIn();
    console.log(this.email);
    this.GetComments(this.id);

  }

  get commentFormcontrol() {
    return this.commentForm.controls;
  }

  isLoggedIn() {
    if (localStorage.getItem('user') != null) {
      this.loggedIn = JSON.parse(localStorage.getItem('user')!);
      this.email = this.loggedIn.email;
    }
    return this.authservice.isAuthenticated();
  }

  OpenForm() {
    this.clicked = true;
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.authservice.PostComment(form.getRawValue()).subscribe(
      (res) => {
        console.log(res);
        alert("Posted successfully!!!");
        this.GetComments(this.id);
        this.reloadCurrentRoute();
      },
      (errorRes) => {
        console.log(errorRes);
        this.error = errorRes.error.message;
        console.log(this.error);
        alert(this.error);
      }
    )
  }

  GetComments(id: number) {
    this.authservice.GetReplies(id).subscribe(
      (res: any) => {
        console.log(res);
        this.tweets = res;
      },
      (errorRes) => {
        this.error = errorRes.error.message;
        console.log(errorRes);
        alert(this.error);
      }
    );
  }


  Liked(username: string, tweetId: number) {

    this.authservice.LikeTweet(username, tweetId).subscribe(
      (res) => {
        console.log(res);
        this.GetComments(this.id);
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

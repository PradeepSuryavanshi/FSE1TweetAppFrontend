import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-addtweet',
  templateUrl: './addtweet.component.html',
  styleUrls: ['./addtweet.component.css']
})
export class AddtweetComponent implements OnInit {

  tweetForm!: FormGroup;
  submitted = false;
  successbox = false;
  errorbox = false;
  error: string = "";
  email: string = "";
  constructor(private authservice: AuthserviceService, private rout: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.rout.paramMap.subscribe((params: ParamMap) => {
      this.email = params.get('username')!;
    });

    this.tweetForm = new FormGroup({
      'email': new FormControl({ value: this.email, disabled: true }, [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      'message': new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      'tag': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'postedon': new FormControl(new Date())
    });
  }

  get tweetFormcontrol() {
    return this.tweetForm.controls;
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.authservice.PostTweet(form.getRawValue()).subscribe(
      (res) => {
        console.log(res);
        alert("Posted successfully!!!");
        this.ngOnInit();
        this.router.navigateByUrl("/mytweets");
      },
      (errorRes) => {
        console.log(errorRes);
        this.error = errorRes.error.message;
        console.log(this.error);
        alert(this.error);
      }
    )
  }

  closeAlert() {
    this.errorbox = false;
    this.successbox = false;
  }
}


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tweet } from 'src/app/appModels/tweet.Model';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-edittweet',
  templateUrl: './edittweet.component.html',
  styleUrls: ['./edittweet.component.css']
})
export class EdittweetComponent implements OnInit {

  @Input() tweettobeedited!: tweet;
  editTweetForm!: FormGroup;
  error: string = "";
  edited: boolean = false;
  constructor(private authservice: AuthserviceService, private router: Router) { }
  @Output() event = new EventEmitter<any>();
  ngOnInit(): void {
    console.log(this.tweettobeedited);
    this.editTweetForm = new FormGroup({
      'tweetId': new FormControl(this.tweettobeedited.tweetId),
      'email': new FormControl({ value: this.tweettobeedited.username, disabled: true }, [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      'message': new FormControl(this.tweettobeedited.message, [Validators.required, Validators.maxLength(150)]),
      'tag': new FormControl(this.tweettobeedited.tag, [Validators.required, Validators.maxLength(50)])
    });
  }

  onSubmit(form: FormGroup) {
    this.authservice.EditTweet(form.getRawValue()).subscribe(
      (res) => {
        console.log(res);
        alert("Posted successfully!!!");
        this.editTweetForm.reset({});
        this.edited = true;
        this.event.emit(this.edited);
      },
      (errorRes) => {
        console.log(errorRes);
      }
    );

  }

}

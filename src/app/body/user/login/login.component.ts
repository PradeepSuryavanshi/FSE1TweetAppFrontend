import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  error: string = "";


  constructor(private router: Router, private authService: AuthserviceService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.authService.Authentication(form.controls['email'].value, form.controls['password'].value).subscribe(
      (data: any) => {
        if (data["token"] != null && data["user"] != null) {
          console.log(data);
          localStorage.setItem("access-token", data["token"]);
          this.router.navigateByUrl("/home");
        } else {
          console.log("check your credentials !!!");
        }
      },
      (errorRes) => {
        console.log(errorRes);
        this.error = errorRes.error.message;
        alert(this.error);
      }
    );
  }
}
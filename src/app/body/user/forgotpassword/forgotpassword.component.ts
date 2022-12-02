import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  submitted = false;
  error: string = "";
  errorbox = false;
  success = false;
  constructor(private authservice: AuthserviceService, private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'dateOfBirth': new FormControl(null, [Validators.required])
    })
  }

  get forgotPasswordFormControl() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.authservice.ForgotPassword(form.controls['email'].value, form.controls['dateOfBirth'].value).subscribe(
      (data: any) => {
        if (data["token"] != null) {
          this.success = true;
          localStorage.setItem("access-token", data["token"]);
          this.router.navigate(['/resetpassword', form.controls['email'].value]);

        }
      },
      (errorRes) => {
        this.errorbox = true;
        console.log(errorRes);
        this.error = errorRes.error.message;
        this.forgotPasswordForm.reset({});
      }
    )
  }

  closeAlert() {
    this.errorbox = false;
  }

}

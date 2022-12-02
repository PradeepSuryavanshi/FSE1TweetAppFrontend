import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { parseTemplate } from '@angular/compiler';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
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
    this.resetPasswordForm = new FormGroup({
      'email': new FormControl({ value: this.email, disabled: true }, [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      'password': new FormControl(null, [Validators.required]),
      'confirmpassword': new FormControl(null, [Validators.required])
    });

  }

  get resetPasswordFormcontrol() {
    return this.resetPasswordForm.controls;
  }

  onSubmit(form: FormGroup) {
    if (form.controls['password'].value == form.controls['confirmpassword'].value) {
      this.submitted = true;
      this.authservice.ResetPassword(this.email, form.controls['password'].value, form.controls['confirmpassword'].value).subscribe(
        (data) => {
          console.log(data);
          this.router.navigateByUrl("/home");
        },
        (errorRes) => {
          console.log(errorRes);
          this.error = errorRes.error.message;
          console.log(this.error);
          alert(this.error);
          this.resetPasswordForm.controls['confirmpassword'].reset();;
        })
    } else {
      this.error = "Password Mismartch : new password should match with confirm password."
      this.errorbox = true;
      this.resetPasswordForm.controls['confirmpassword'].reset();
    }

  }

  closeAlert() {
    this.errorbox = false;
    this.successbox = false;
  }
}

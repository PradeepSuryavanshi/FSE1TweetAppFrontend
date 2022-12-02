import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted = false;
  error: string = "";


  constructor(private authservice: AuthserviceService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, Validators.required),
      'dateOfBirth': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      'contactNumber': new FormControl(null, [Validators.required, Validators.pattern("^[1-9][0-9]{9}$")]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  get registrationFormcontrol() {
    return this.registrationForm.controls;
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.authservice.Registration(form.getRawValue()).subscribe(
      (res) => {
        console.log(res);
        console.log("Registered!!!");
        this.router.navigateByUrl("/login");
      },
      (errorRes) => {
        console.log(errorRes);
        this.error = errorRes.error.message;
        console.log(this.error);
        alert(this.error);
      }
    )
  }

}

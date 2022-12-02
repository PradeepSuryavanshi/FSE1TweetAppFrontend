import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
    var user = {
      "firstName": "",
      "lastName": "",
      "gender": "",
      "dateOfBirth": "",
      "email": "",
      "password": "",
      "contactNumber": "",
      "tweets": null
    };
    user = JSON.parse(localStorage.getItem('user')!);
    console.log(user);
  }

  ngOnInit(): void {

  }




}

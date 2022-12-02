import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/appModels/user.Model';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrls: ['./peoples.component.css']
})
export class PeoplesComponent implements OnInit {

  error: string = "";
  users: Array<user> = [];
  constructor(private authservice: AuthserviceService) {
  }

  ngOnInit(): void {
    this.authservice.GetAllUsers().subscribe(
      (res: any) => {
        console.log(res)
        this.users = res;
        console.log(this.users);
      },
      (errorRes) => {
        this.error = errorRes.error.message;
        alert(this.error);
      }
    )
  }




}

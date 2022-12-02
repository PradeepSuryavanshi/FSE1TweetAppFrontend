import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/appModels/user.Model';
import { AuthserviceService } from 'src/app/shared/services/authservice/authservice.service';

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css']
})
export class SearchuserComponent implements OnInit {

  error: string = "";
  input: string = "";
  users: Array<user> = [];
  constructor(private authservice: AuthserviceService) { }

  ngOnInit(): void {
  }

  GetByUsername() {
    console.log(this.input);
    if (this.input != "") {
      this.authservice.SearchUser(this.input).subscribe(
        (res: any) => {
          console.log(res)
          this.users = res;
          console.log(this.users);
        },
        (errorRes) => {
          this.error = errorRes.error.text;
          console.log(errorRes);
          alert(this.error);
        }
      )
    }
  }

}

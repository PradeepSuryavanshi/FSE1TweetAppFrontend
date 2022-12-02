import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/appModels/user.Model';
import { AuthserviceService } from '../../shared/services/authservice/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn!:user ;
  username:string = "";
  constructor(private authService:AuthserviceService,private router:Router) { }

  ngOnInit(): void {
    
  }

  isLoggedIn() {
    if(localStorage.getItem('user') != null){
      this.loggedIn= JSON.parse(localStorage.getItem('user')!);
      this.username= this.loggedIn.email;
    }
    
    return this.authService.isAuthenticated();
  }
  
  PostTweet(){
    this.router.navigate(['/addtweet',this.username]);
  }
  
  onLogout(){
    this.authService.Logout();
  }

  ResetPassword(){
    this.router.navigate(['/resetpassword',this.username]);
  }
}

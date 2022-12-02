import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthserviceService, private route: Router) { }

  canActivate(): boolean {

    if (!this.authService.isAuthenticated) {
      this.route.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}

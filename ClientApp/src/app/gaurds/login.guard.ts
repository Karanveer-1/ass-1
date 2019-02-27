import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
    private service: UserService,
    private jwtHelper: JwtHelperService) {
  }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var token = localStorage.getItem("userToken");
    console.log("Login auth")
    
    if (!(token && !this.jwtHelper.isTokenExpired(token))) {
      return true;
    }

    this.router.navigate(['/']);  
    return true;
    
  }
  
}

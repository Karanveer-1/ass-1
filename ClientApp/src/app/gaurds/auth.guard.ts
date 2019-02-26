import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private service: UserService) {
  }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var token = localStorage.getItem("userToken");

    if (token){
      console.log("Auth guard passed, token not there")
      this.router.navigate(['/']);  
      return true;
    }
    
    console.log("Auth guard failed, token not there")
    this.router.navigate(['/login']);
    return false;
  }

  
}

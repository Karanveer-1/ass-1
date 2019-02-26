import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';

  constructor(
    private router: Router,
    private service: UserService) {}

  isLoggedIn(): boolean {
    let token: string = localStorage.getItem("jwt");
    return localStorage.getItem('userToken') !==  null;
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

}

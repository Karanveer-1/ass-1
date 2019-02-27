import { Component, OnInit } from '@angular/core';
import { Boat } from '../model/boat';
import { BoatService } from '../services/boat.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  boats:Boat[] = [];
  isAdmin : Boolean;

  constructor(private service: BoatService, private auth: UserService) {}

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
    this.service.getBoats().subscribe((data: []) => {
      this.boats = data;
    });
  }


  deleteBoat(id: number) {
    this.service.deleteBoat(id).subscribe((res => {
      this.boats.splice(this.boats.indexOf(this.boats.find(b => b.boatId === id)), 1);
    }));
  }

}

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

  

  constructor( 
    private boatService:BoatService
  ) {
    
  }

  ngOnInit() {
    console.log("Getting Boats");
    var boats = this.boatService.getBoats()
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    

  }

}

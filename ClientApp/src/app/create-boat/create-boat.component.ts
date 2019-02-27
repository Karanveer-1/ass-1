import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BoatService } from '../services/boat.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Boat } from '../model/boat';



@Component({
  selector: 'app-create-boat',
  templateUrl: './create-boat.component.html',
  styleUrls: ['./create-boat.component.css']
})




export class CreateBoatComponent implements OnInit {
  boatForm: FormGroup;
  loading = false;
  submitted = false;
  boat:Boat;
  response:Object;

  constructor(
    private formBuilder: FormBuilder,
    private boatService: BoatService,
    private router: Router
  ) { }

  ngOnInit() {
    this.boat = new Boat();
    var boatlist:Boat[];
    var boats = this.boatService.getBoats()
    .pipe()
    .subscribe(
      data => { 
        console.log("Boats retrieved");
        console.log(data);
        for (let d in data[0][0]) {
          console.log(Object.values(d));
        }
        
              },
      error => {
        console.log(error);
      });

  }

  get f() { return this.boatForm.controls; }

  

}

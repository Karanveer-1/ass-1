import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BoatService } from '../services/boat.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Boat } from '../model/boat';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Location} from '@angular/common';


@Component({
  selector: 'app-create-boat',
  templateUrl: './create-boat.component.html',
  styleUrls: ['./create-boat.component.css']
})




export class CreateBoatComponent implements OnInit {
  boats:Boat[] = [];
  newBoatId:number = 0;
  public newBoat:Boat;
  public editor = ClassicEditor;

  constructor(
    private _location: Location,
    private formBuilder: FormBuilder,
    private service: BoatService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newBoat = new Boat();
    this.newBoat.description = "";
    this.service.getBoats().subscribe((data: []) => {
      this.boats = data;
    });
  }

  // onSubmit() {
  //   this.service.addBoat(this.newBoat);
  //   this._location.back;
  // }

}

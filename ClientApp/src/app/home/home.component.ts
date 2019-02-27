import { Component, OnInit } from '@angular/core';
import { Boat } from '../model/boat';
import { BoatService } from '../services/boat.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  boats:Boat[] = [];
  isAdmin : Boolean;
  viewBoat: Boat = new Boat();
  editBoat: Boat = new Boat();
  showTable: Boolean = true;
  showView : Boolean = false;
  showEdit : Boolean = false;
  public editor = ClassicEditor;

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

  viewClickedBoat(boat: Boat) {
    this.showView = true;
    this.showTable = false;
    this.viewBoat = boat;
  }

  editClickedBoat(boat : Boat) {
    this.showEdit = true;
    this.showTable = false;
    this.editBoat = boat;
  }

  cancelEdit() {
    this.showEdit = false;
    this.showTable = true;
    this.editBoat = null;
  }

  saveEditBoat() {
    this.service.updateBoat(this.editBoat.boatId, this.editBoat)
      .pipe(first())
      .subscribe((r: any) => {
        this.boats[this.boats.indexOf(this.boats.find(b => b.boatId === this.editBoat.boatId))] = this.editBoat;
        this.showEdit = false;
        this.showTable = true;
        this.editBoat = null;
      });
  }

  back() {
    this.showView = false;
    this.showTable = true;
    this.viewBoat = null;
  }

}

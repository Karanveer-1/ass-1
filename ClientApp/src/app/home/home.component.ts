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

  //isAdmin: boolean = localStorage.getItem('role').toLowerCase() === "admin";

  boats: Boat[] = [];

  viewBoat: Boat;
  addBoat: Boat;
  editBoat: Boat;

  constructor(
    private restService: BoatService,
    private authService: UserService,
    private router: Router
  ) {
    this.addBoat = new Boat();
    this.editBoat = new Boat();
  }

  ngOnInit() {
    this.getBoats();
  }

  getBoats() {
    this.restService.getBoats().subscribe((data: []) => {
      this.boats = data;
    });
  }

  deleteBoat(id: number) {
    this.boats.splice(this.boats.indexOf(this.boats.find(b => b.boatId === id)), 1);
    this.restService.deleteBoat(id).subscribe();
  }

  setViewBoat(boat: Boat) {
    this.viewBoat = boat;
  }

  setEditBoat(boat: Boat) {
    this.editBoat = JSON.parse(JSON.stringify(boat));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addNewBoat() {
    delete this.addBoat.boatId;
    this.restService.addBoat(this.addBoat)
      .pipe(first())
      .subscribe((r: any) => {
        this.boats.push(r);
        this.addBoat = new Boat();
      });
  }

  saveBoat() {
    this.restService.updateBoat(this.editBoat.boatId, this.editBoat)
      .pipe(first())
      .subscribe((r: any) => {
        this.boats[this.boats.indexOf(this.boats.find(b => b.boatId === this.editBoat.boatId))] = this.editBoat;
        console.log(r);
      })
  }

  cancelAdd() {
    this.addBoat = new Boat();
  }

  cancelEdit() {
    this.editBoat = new Boat();
  }

  onFileChangedAdd(event) {
    this.onFileChanged(event, this.addBoat);
  }

  onFileChangedEdit(event) {
    this.onFileChanged(event, this.editBoat);
  }

  private onFileChanged(event, boat: Boat) {
    let image = event.target.files[0];
    this.toBase64(image)
      .then(
        (data: string) => {
          // console.log(boat.picture);
          // boat.picture = data;
          // console.log(boat.picture)
        }
      );
  }

  private toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}

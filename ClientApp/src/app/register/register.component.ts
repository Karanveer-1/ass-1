import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Register } from '../model/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    model:Register;

    constructor(private formBuilder: FormBuilder,
        private service:UserService,
        private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            country: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.[!@#\$%\^&])(?=.{8,})/)]]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        this.model = new Register(this.f.username.value, this.f.email.value, this.f.password.value,
        this.f.firstName.value, this.f.lastName.value, this.f.country.value, this.f.phoneNumber.value);

        this.service.register(this.model)
          .pipe(first())
          .subscribe(
            data => {
                console.log(data);
                this.router.navigate(['/login']);
            },
            error => {
                console.log(error);
            });
        
    }


}

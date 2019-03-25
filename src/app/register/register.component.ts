import { Component, OnInit } from '@angular/core';
import { ApiService } from '.././api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private api: ApiService) {}
  registered = false;
  ngOnInit() {}
  onFormSubmit(e) {
    if (e.controls.password.value !== e.controls.rpassword.value) {
      console.log('Password Doesn\'t Match!');
      return false;
    }
    const user = {
      name: e.controls.name.value,
      password: e.controls.password.value,
      email: e.controls.email.value,
    };
    this.api.registerUser(user).subscribe(
      (x: any) => {
        console.log(x);
        if (x.access_token) {
          this.registered = true;
        }
      },
      error => {
        window.alert('Email Already Exists');
        this.registered = false;
      },
    );
  }
}

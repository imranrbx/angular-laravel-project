import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any = { name: '', email: '' };
  updated = false;
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.user = this.route.snapshot.data.userInfo;
  }
  onFormSubmit(e) {
    const user = {
      name: e.controls.name.value,
      email: e.controls.email.value,
    };
    this.api.updateUser(user).subscribe(
      (x: any) => {
        console.log(x);
        if (x.message) {
          this.updated = true;
          localStorage.setItem('user', JSON.stringify(x.user));
          this.api.checkLogin();
        }
      },
      error => {
        window.alert('Email Already Exists');
        this.updated = false;
      },
    );
  }
}

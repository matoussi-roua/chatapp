import { Component, OnInit } from '@angular/core';

interface User {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  username: string='';
  password: string='';
  constructor() { }

  ngOnInit(): void {

  }

  getData(): void {
    console.warn('Username:', this.username, 'Password:', this.password);

    const user: User = {
      username: this.username,
      password: this.password
    };

    console.log('User Object:', user);
  }

}

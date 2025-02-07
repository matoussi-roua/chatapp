import { Component, OnInit } from '@angular/core';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string='';
  lastName: string='';
  email: string='';
  password: string='';
  constructor() { }

  ngOnInit(): void {

  }

  getData(): void {
    console.warn('firstName:', this.firstName, ' lastName:', this.lastName , ' email:', this.email , ' password:', this.password);

    const user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,

    };

    console.log('User Object:', user);
  }

}

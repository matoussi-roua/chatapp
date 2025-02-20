import { Component, OnInit } from '@angular/core';
import { RegisterCredential } from "../../models/auth/register-credential";  // Make sure this matches your backend DTO
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string = ''; // Store error message
  registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {}
  register() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log("Sending Registration Data:", this.registerForm.value);  // Add this to check the sent data
    this.authService.register(this.registerForm.value) .subscribe({
      next: (response) => {
        console.log("Registration Successful!", response); // Log full response
        this.router.navigate(['/login']); // Navigate to login on success
      },
      error: (error) => {
        if (error.status === 400 && error.error.errors) {
          this.errorMessage = error.error.errors[0]; // Extract the validation error message
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }
  goToLogin() {
    this.router.navigate(['/login']); // Navigates to the Register page
  }
}

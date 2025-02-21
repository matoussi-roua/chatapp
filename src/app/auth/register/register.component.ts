import { Component, OnInit } from '@angular/core';
import { RegisterCredential } from "../../models/auth/register-credential";  // Import the class
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
    // Create an instance of RegisterCredential
    const registerData = new RegisterCredential(
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      this.registerForm.value.phoneNumber,
      this.registerForm.value.password
    );

    console.log("Sending Registration Data:", registerData);  // Check the registered data before sending

    // Send the instance of RegisterCredential to the AuthService
    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log("Registration Successful!", response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 400 && error.error.errors) {
          this.errorMessage = error.error.errors[0];  // Show validation error message
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);  // Navigate to login page
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginCredential } from '../../models/auth/login-credential';  // Import the LoginCredential class

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    // Create an instance of LoginCredential
    const loginCredentials = new LoginCredential(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    // Pass the loginCredentials instance to the service method
    this.authService.login(loginCredentials).subscribe({
      next: (response) => {
        console.log('Login Successful!', response);
        localStorage.setItem('accessToken', response.token); // Assuming accessToken is in the response
        this.router.navigate(['']);
      },
      error: (error) => {
        if (error.status === 400 && error.error.errors) {
          this.errorMessage = error.error.errors[0];
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

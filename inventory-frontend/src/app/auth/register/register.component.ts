import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';  // Assuming you have an AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    location: '',
    mobileNumber: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    // Call AuthService to register the user
    this.authService.register(this.user).subscribe(
      response => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);  // Redirect to login page on successful registration
      },
      error => {
        console.error('Error registering user', error);
      }
    );
  }
}

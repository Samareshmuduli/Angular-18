import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
user: SocialUser;
  loggedIn: boolean;
isButtonLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private toastr: ToastrService,
    private authService: SocialAuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/),
        Validators.email
      ]],
      password: ['', [Validators.required]]
    });
  }

  // ngOnInit(): void {
  //   // Call signInWithGoogle on component initialization
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     this.loggedIn = (user != null);
  //     if (this.loggedIn) {
  //       this.handleGoogleLogin(user);
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.renderGoogleSignInButton();
  }

  renderGoogleSignInButton(): void {
    const clientId = '982133624088-prs1839p8svnl5kgi837vr2eqjoj6md4.apps.googleusercontent.com';  // Replace with your Google Client ID

    // Initialize Google Sign-In
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: any) => this.handleGoogleResponse(response)
    });

    // Render the button in the element with ID 'google-button'
    google.accounts.id.renderButton(
      document.getElementById('google-button'),
      {
        theme: 'outline',
        size: 'large',
        width: '100%'
      }
    );
  }

  handleGoogleResponse(response: any): void {
    const idToken = response.credential;

    // Send the ID token to your backend for verification and authentication
    this.dataService.loginWithGoogle({ token: idToken }).subscribe(
      (res) => {
        // Handle success, save tokens, and redirect
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('user_name', res.username);
        this.toastr.success('Login Successful', 'Success');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.toastr.error('Google login failed. Please try again.');
      }
    );
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  googleSetStructure() {
    let googleDoc = document.getElementsByClassName("gloginbtn");
    let iframe = googleDoc[0].getElementsByTagName('iframe');
    iframe[0].style.marginLeft = '20px';
  }
  // Form submission method
  onSubmit() {
    if (this.loginForm.valid) {
      this.dataService.loginUser(this.loginForm.value).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('user_name', response.username);
          localStorage.setItem('email', response.email);
          localStorage.setItem('status', response.status);
          this.toastr.success('Login Successful', 'Success');
          
          if (response.status === true) {
            this.router.navigate(['dashboard']);1000
          } else {
            this.router.navigate(['PersonalDetails']);
          }
        },
        (error: any) => {
          this.toastr.error(error.error.message);
          this.errorMessage = 'Login failed. Please try again.';
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Please enter input details.';
    }
  }

  // Google login method
  handleGoogleLogin(user: SocialUser): void {
    // this.authService.authState.subscribe((user) => {
    //   console.log('user from login:', user);})
    this.dataService.loginWithGoogle(user).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user_id', response.id);
        localStorage.setItem('user_name', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('status', response.status);
        this.toastr.success('Google Login Successful', 'Success');

        if (response.status === true) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['PersonalDetails']);
        }
      },
      (error: any) => {
        this.toastr.error('Google login failed. Please try again.');
        console.error('Error during Google login:', error);
      }
    );
  }
}

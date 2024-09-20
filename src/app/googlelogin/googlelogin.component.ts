import { Component } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider ,GoogleSigninButtonModule} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';  // Assuming you have a service for handling backend requests

@Component({
  selector: 'app-googlelogin',
  standalone: true,
  imports: [GoogleSigninButtonModule],
  templateUrl: './googlelogin.component.html',
  styleUrl: './googlelogin.component.css'
})
export class GoogleloginComponent {

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private toastr: ToastrService,
    private dataService: DataService
  ) {}

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log('Google login response:', user);

      // Send Google user data to your backend for further processing
      this.dataService.loginWithGoogle(user).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('user_name', response.username);
          localStorage.setItem('email', response.email);
          localStorage.setItem('status', response.status);
          this.toastr.success('Google Login Successful', 'Success');
          this.router.navigate(['dashboard']);
        },
        (error: any) => {
          this.toastr.error('Google login failed. Please try again.');
        }
      );
    }).catch(error => {
      console.error('Error during Google sign-in:', error);
      this.toastr.error('Google login failed. Please try again.');
    });
  }
}

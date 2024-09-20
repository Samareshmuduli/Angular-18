import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userName: string |null =localStorage.getItem('user_name');
user: SocialUser;
constructor(private router:Router, private authService: SocialAuthService){}
logout() {
  console.log('logout func called :', );
    // Clear the user session and redirect to login page
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('status');
    localStorage.removeItem('email');
    this.router.navigateByUrl('/login')
    this.authService.signOut().then(() => {
      console.log('User signed out from Google');
      this.user = null; // Reset the user
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error signing out from Google:', error);
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
// import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-show-user-form-id',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './show-user-form-id.component.html',
  styleUrl: './show-user-form-id.component.css'
})
export class ShowUserFormIdComponent {

  formData: any = [];
  userName: string |null =localStorage.getItem('user_name');
  


  constructor( private dataService: DataService,private router: Router) {}

  ngOnInit(): void {
    // Fetch user and exam data from the backend here if necessary
     const userId = localStorage.getItem('user_id');
     console.log('id',userId)
     if (userId) {
      this.fetchUserData(userId); // Call the method with userId
    } else {
      console.error('No user ID found in localStorage');
    }
  }
  fetchUserData(userId: string): void {
    this.dataService.getUserData(userId).subscribe(
      (data) => {
        console.log('------========',data);
        // Patch the form with the fetched data
        // for(let i of data.payload.length ){
        // console.log( '====================',data.payload[i].FirstName );
        // }
        this.formData= data.payload;
        console.log(this.formData[0]._id)
        // console.log("Array length : "+String(data.payload.length))
        // const  formid=data.Blogs._id;
        // console.log('formid=',formid)

      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  // logout() {
  // console.log('logout func called :', );
  //   // Clear the user session and redirect to login page
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user_id');
  //   localStorage.removeItem('user_name');
  //   localStorage.removeItem('status');
  //   localStorage.removeItem('email');
  //   this.router.navigateByUrl('/login')
  //   this.authService.signOut().then(() => {
  //     console.log('User signed out from Google');
  //     this.user = null; // Reset the user
  //     this.router.navigate(['/login']);
  //   }).catch(error => {
  //     console.error('Error signing out from Google:', error);
  //   });
  // }

  addExam() {
    // Handle the "Add" button logic
    
    this.router.navigate(['/PersonalDetails']);
  }

  showExam(exam:any,index:number) {
    // Handle showing exam details
    localStorage.setItem('formId',this.formData[index]._id)
    console.log('===',this.formData[index]._id)
    this.router.navigate([`/showDetails/${this.formData[index]._id}`]);
  }
}

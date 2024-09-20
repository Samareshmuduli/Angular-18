import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  currentStep = 1;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      LastName: ['', [Validators.required, Validators.minLength(3)]],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      currentAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      dob: ['', Validators.required],
      sex: ['', Validators.required],
      aadhaarNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],

      // Educational Details
      schoolName: ['', Validators.required],
      matricPercentage: ['', Validators.required],
      matricPassingYear: ['', Validators.required],
      collegeNameSec: ['', Validators.required],
      secPercentage: ['', Validators.required],
      secPassingYear: ['', Validators.required],
      collegeNameHigh: ['', Validators.required],
      highPercentage: ['', Validators.required],
      highPassingYear: ['', Validators.required],

      // Company Details
      companyName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      experienceYears: ['', Validators.required],
      jobStartDate: ['', Validators.required],
      jobEndDate: [''],
      skills: ['', Validators.required]
    });
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}






import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  formPostUrl='http://localhost:2000/users/userspost'
 Url='http://localhost:2000/users/login'
 usersUrl='http://localhost:2000/users/register'
  constructor(private http:HttpClient) { }
  loginUser(user:any): Observable<any> {
    console.log('user------ :', user.value);
      return this.http.post(this.Url, user);
    }
  
    saveUser(user:any): Observable<any> {
      
      console.log('user------ :', user);
        return this.http.post(this.usersUrl, user.value);
      }
   formSubmit(user:any): Observable<any> {

        console.log('user------ :', user.value.value);
          return this.http.post(this.formPostUrl,user);
        }

}




import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService, GoogleLoginProvider, SocialLoginModule,SocialUser } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule,SocialLoginModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loggedIn: boolean =false;
  user: SocialUser =new SocialUser;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private toastr: ToastrService,
    private authService: SocialAuthService // Inject SocialAuthService
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

  onSubmit() {
    console.log(this.loginForm.get('email')?.errors);
    console.log(this.loginForm.get('email')?.touched);

    if (this.loginForm.valid) {
      this.dataService.loginUser(this.loginForm.value).subscribe(
        (response: any) => {
          console.log("------------------------",response)
          // Store tokens and navigate
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('user_name', response.username);
          localStorage.setItem('email', response.email);
          localStorage.setItem('status', response.status);
          // Show success toastr

          this.toastr.success('Login Successfull', 'Success');
          // this.router.navigate(['dashboard']);
          // Navigate to personal details page
          console.log(response.status)
          if(response.status==true){
            this.router.navigate(['dashboard']);
          }else{
            this.router.navigate(['PersonalDetails']);
          }
        },
        (error: any) => {
          // Handle login error
          this.toastr.error(error.error.message);
          console.error('Error submitting form:', error);
          this.errorMessage = 'Login failed. Please try again.';
        }
      );
    } else {
      // Mark form controls as touched to show validation errors
      this.loginForm.markAllAsTouched();
      
      // Show error toastr if form is invalid
      // this.toastr.error('Please enter email and password details');
      this.errorMessage = 'Please enter input details.';
    }
  }
  // Google login method
  signInWithGoogle(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log('Google login response:', user);
      // Send Google user data to your backend for further processing
      this.dataService.loginWithGoogle(user).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('user_name', response.username);
          localStorage.setItem('email', response.email);
          localStorage.setItem('status', response.status);
          this.toastr.success('Google Login Successfull', 'Success');
          if (response.status == true) {
            this.router.navigate(['dashboard']);
          } else {
            this.router.navigate(['PersonalDetails']);
          }
        },
        (error: any) => {
          this.toastr.error('Google login failed. Please try again.');
        }
      );
    });
  }
}
